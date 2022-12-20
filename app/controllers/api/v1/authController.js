const bycript = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userService = require("../../../services/userService");
const salt =10

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
                const Foto = 'default.jpg';
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

    async updateUser(req, res){
        try{
            const user = await userService.update(req.params.id, req.body);
            if(req.body.password && req.file){
                const Encrypted_Password = await encryptPassword(req.body.password);
                res.status(201).json({
                    status: "SUCCESS",
                    data: user,
                    Name: req.body.name,
                    Email: req.body.email,
                    Encrypted_Password: Encrypted_Password,
                    Foto: req.file.filename,
                    Address: req.body.address,
                    Phone_Number: req.body.phone_number
                })
            }else{
                res.status(201).json({
                    status: "SUCCESS",
                    data: user,
                    Name: req.body.name,
                    Email: req.body.email,
                    Encrypted_Password: user.Encrypted_Password,
                    Foto: user.Foto,
                    Address: req.body.address,
                    Phone_Number: req.body.phone_number,
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
            res.status(200).json({
                data : user
            })
        }catch(err){
            res.status(422).json({
                status: "No Data",
                message: err.message
            })
        }
    }
}