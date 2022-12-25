const bycript = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userService = require("../../../services/userService");
const salt =10
const cloudinary = require('../../../../config/cloudinary')

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bycript.hash(password, salt, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bycript.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia", {expiresIn: '1h'});
}

module.exports = {
    async login(req, res) {
        if(req.body.email && req.body.password){
            const Email = req.body.email.toLowerCase();
            const password = req.body.password;
    
            const user = await userService.findByEmail(Email)
    
            if(!user) {
                res.status(404).json({
                    message: "Akun Tidak Ditemukan"
                })
                return;
            }
    
            const isPasswordCorrect = await checkPassword(
                user.Encrypted_Password, password
            );
    
            if(!isPasswordCorrect) {
                res.status(401).json({ message: "Password Salah!" });
                return;
            }
    
            const token = createToken({
                id: user.id,
                Email: user.Email,
                Name: user.Name,
                Foto: user.Foto,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
    
            res.status(201).json({
                id: user.id,
                Name: user.Name,
                Email: user.Email,
                Role: user.Role,
                Token : "Bearer " + token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            })
        }else{
            res.status(400).json({
                status: "FAIL",
                message: "Terdapat Form Yang Kosong!"
            })
        }
    },

    async whoAmI(req, res){
        res.status(200).json({
            status: "OK",
            data: req.user
        });
    },

    async authorize(req, res, next){
        try{
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_SIGNATURE_KEY || "Rahasia"
            );

            const user = await userService.findByPk(tokenPayload.id);
            req.user = user;

            next();
        }catch(err){
            console.log(err.message)
            res.status(401).json({
                status: "FAIL",
                message: "Unauthorized",
            })
        }
    },

    async CheckAvailableEmail(req, res, next){
        try{
            const user = await userService.findByEmail(req.body.email)
            if(user != null){
                res.status(400).json({
                    status: "FAIL",
                    message: "Email Telah Terdaftar!"
                })
            }else{
                next()
            }

        }catch(err){
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async RegisterUser(req, res){
        try{
            if(req.body.email && req.body.name && req.body.password){
                const Name = req.body.name;
                const Email = req.body.email;
                const Role = "Member";
                const Encrypted_Password = await encryptPassword(req.body.password);
                const Foto = 'http://res.cloudinary.com/dsx8iumjv/image/upload/v1671979323/fd74vuebdwive0danoe0.png';
                const Address = '';
                const Phone_Number = '';
                const user = await userService.create({Name, Encrypted_Password, Role, Email, Foto, Address, Phone_Number});
                res.status(201).json({
                    status: "SUCCESS",
                    message: "Akun Berhasil Ditambahkan",
                    data: {
                        id: user.id,
                        Name: user.Name,
                        Email: user.Email,
                        Role: user.Role,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                });
            }else{
                res.status(400).json({
                    status: "FAIL",
                    message: "Terdapat Form Yang Kosong!"
                })
            }
        }catch(err){
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async validationAdmin(req, res, next){
        try{
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_SIGNATURE_KEY || "Rahasia"
            );

            const user = await userService.findByPk(tokenPayload.id);
            console.log(user)
            if(user.Role !== 'Admin'){
                res.status(401).json({
                    status: "FAIL",
                    message: "Forbidden! Only Admin can access this route"
                })
            }else{
                req.user = user

                next()
            }
        }catch(err){
            res.status(422).json({
                status: "FAIL",
                message: "Unauthorized"
            })
        }
    },

    async showUsers(req, res){
        try{
            await userService.findAll()
            .then(({data, count}) => {
                res.status(200).json({
                    status: "OK",
                    data: data,
                    meta: count
                });
            })
        }catch(err){
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async uploadProfilePhoto(req, res, next){
        if(req.file != undefined){
            const fileBase64 = req.file.buffer.toString("base64")
            const file = `data:${req.file.mimetype};base64,${fileBase64}`
    
            cloudinary.uploader.upload(file, (err, result) => {
                if(!!err){
                    console.log(err)
                    return res.status(400).json({
                        status: "ERROR",
                        message: 'Gagal Upload File!'
                    })
                }
    
                foto = result.url
                next()
            })
        }else{
            foto = req.user.Foto
            next()
        }
    },

    async getUserById(req, res, next){
        try{
            const user = await userService.findByPk(req.params.id);
            if(!user){
                res.status(404).json({
                    status: "FAIL",
                    message: "User Tidak Ditemukan"
                });
                return;
            }

            req.user = user;
            next()
            
        }catch(err){
            res.status(401).json({
                status: "ERROR",
                message: err.message
            })
        }
    },

    async updateUser(req, res){
        try{
            req.body.Foto = foto
            const isPasswordCorrect = await checkPassword(
                req.user.Encrypted_Password, req.body.Encrypted_Password
            );
            if(!isPasswordCorrect) {
                req.body.Encrypted_Password = await encryptPassword(req.body.Encrypted_Password)
            }else{
                req.body.Encrypted_Password = req.user.Encrypted_Password
            }
            const user = await userService.update(req.params.id, req.body);
            if(user != 0){
                const userUpdated = await userService.findByPk(req.params.id)
                res.status(201).json({
                    status: "SUCCESS",
                    message: "Data Berhasil Diubah",
                    data: [{
                        Name: userUpdated.Name,
                        Email: userUpdated.Email,
                        Encrypted_Password: userUpdated.Encrypted_Password,
                        Foto: userUpdated.Foto,
                        Address: userUpdated.Address,
                        Phone_Number: userUpdated.Phone_Number
                    }]
                })
            }
        }catch(err){
            res.status(422).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async show(req, res){
        try{
            const user = await userService.findByPk(req.params.id);
            if(user != null){
                res.status(200).json({
                    status: "OK",
                    messsage: "Data Berhasil Ditemukan",
                    data : user
                })
            }else{
                res.status(404).json({
                    status: "FAIL",
                    messsage: "Data Tidak Ditemukan"
                })
            }
        }catch(err){
            res.status(422).json({
                status: "ERROR",
                message: err.message
            })
        }
    }
}