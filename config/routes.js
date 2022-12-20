const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const multer = require('multer');
const path = require('path');
const cors = require('cors');

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


apiRouter.use(express.json());
apiRouter.use(cors());

//Umum access
apiRouter.post('/register', controllers.api.v1.authController.CheckAvailableEmail, controllers.api.v1.authController.RegisterUser)
apiRouter.post('/login', controllers.api.v1.authController.login)
apiRouter.put('/user/:id/update', multer({storage:storage}).single("photo_profile"), controllers.api.v1.authController.updateUser)
apiRouter.get("/api/v1/whoami",
    controllers.api.v1.authController.authorize,
    controllers.api.v1.authController.whoAmI
)
apiRouter.get('/user/:id', controllers.api.v1.authController.show)

//yang bisa diakses user//
apiRouter.post('/search-ticket', controllers.api.v1.schedController.filterSchedule),
apiRouter.post('/booking-ticket', controllers.api.v1.bookingController.addBooking)
apiRouter.post('/add-ticket', controllers.api.v1.ticketController.CreateTicket)
apiRouter.get('/ticket', controllers.api.v1.ticketController.DisplayTicket)
apiRouter.get('/history', controllers.api.v1.bookingController.DisplayBooking)
apiRouter.post('/airport', controllers.api.v1.airportController.AddAirportList)
apiRouter.get('/get-airport', controllers.api.v1.airportController.ShowAirportList)


//yang bisa diakses Admin//
apiRouter.get('/user', controllers.api.v1.authController.validationAdmin, controllers.api.v1.authController.showUsers)
apiRouter.get('/schedule', controllers.api.v1.authController.validationAdmin, controllers.api.v1.schedController.ShowSchedule)
apiRouter.post('/add-schedule', controllers.api.v1.authController.validationAdmin, controllers.api.v1.schedController.AddSchedule)
apiRouter.put('/edit-schedule/:id', controllers.api.v1.authController.validationAdmin, controllers.api.v1.schedController.updateSchedules)
apiRouter.delete('/delete-schedule/:id',controllers.api.v1.authController.validationAdmin, controllers.api.v1.schedController.deleteSchedule)


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
