const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const handleGoogleLoginOrRegister = require("../app/controllers/api/v1/handleGoogleLoginOrRegister")
const cloudinary = require('./cloudinary')
const uploadOnMemory = require('./uploadOnMemory')

const uploadDirectory = path.join(__dirname, "../uploads")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadDirectory)
    },

    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
})

const handleUploadImageCloudinary = (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64")
    const file = `data:${req.file.mimetype};base64,${fileBase64}`

    cloudinary.uploader.upload(file, (err, result) => {
        if(!!err){
            console.log(err)
            return res.status(400).json({
                message: 'Gagal Upload File!'
            })
        }

        res.status(201).json({
            message: 'Upload Image Berhasil',
            url: result.url
        })
    })
}


apiRouter.use(express.json());
apiRouter.use(cors());

//Umum access
apiRouter.post('/register', controllers.api.v1.authController.CheckAvailableEmail, controllers.api.v1.authController.RegisterUser)
apiRouter.post('/login', controllers.api.v1.authController.login)
// apiRouter.put('/user/:id/update', multer({storage:storage}).single("photo_profile"), controllers.api.v1.authController.updateUser)
apiRouter.put('/user/:id/update', controllers.api.v1.authController.getUserById, uploadOnMemory.single("picture"), controllers.api.v1.authController.uploadProfilePhoto, controllers.api.v1.authController.updateUser)
apiRouter.post('/upload-gambar', uploadOnMemory.single("picture"), handleUploadImageCloudinary)

apiRouter.get("/api/v1/whoami",
    controllers.api.v1.authController.authorize,
    controllers.api.v1.authController.whoAmI
)
apiRouter.get('/user/:id', controllers.api.v1.authController.show)
apiRouter.post("/api/v1/google", handleGoogleLoginOrRegister);

//yang bisa diakses user//
apiRouter.post('/search-ticket', controllers.api.v1.schedController.filterSchedule),
apiRouter.post('/booking-ticket', controllers.api.v1.bookingController.addBooking)
apiRouter.get('/history', controllers.api.v1.bookingController.DisplayBooking)
apiRouter.post('/airport', controllers.api.v1.airportController.AddAirportList) //ga jadi pake
apiRouter.get('/get-airport', controllers.api.v1.airportController.ShowAirportList)


//yang bisa diakses Admin//
apiRouter.get('/user', controllers.api.v1.authController.validationAdmin, controllers.api.v1.authController.showUsers)
apiRouter.get('/schedule', controllers.api.v1.schedController.ShowSchedule)
apiRouter.get('/schedule/:id', controllers.api.v1.schedController.DetailSchedule)
apiRouter.post('/add-schedule', controllers.api.v1.authController.validationAdmin, controllers.api.v1.schedController.AddSchedule)
apiRouter.put('/edit-schedule/:id', controllers.api.v1.authController.validationAdmin, controllers.api.v1.schedController.updateSchedules)
apiRouter.delete('/delete-schedule/:id',controllers.api.v1.authController.validationAdmin, controllers.api.v1.schedController.deleteSchedule)


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
