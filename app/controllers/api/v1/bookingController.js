const bookingService = require("../../../services/bookingService")
const ticketService = require("../../../services/ticketService")

module.exports = {
    async addBooking(req,res){
        try{
            if(req.body.user_id && req.body.Total_Passenger && req.body.Plane_Class && req.body.Origin_Airport && req.body.Destination_Airport && req.body.Ticket_Date && req.body.schedule_id){
            const booking = await bookingService.CreateBooking(req.body)
                res.status(200).json({
                    status: "SUCCESS",
                    message: "Berhasil Menambahkan Data",
                    data: booking
                    // user_id: booking.user_id,
                    // Total_Passenger: booking.Total_Passenger,
                    // Plane_Class: booking.Plane_Class,
                    // Origin_Airport: booking.Origin_Airport,
                    // Destination_Airport: booking.Destination_Airport,
                    // Ticket_Date: booking.Ticket_Date,
                    // schedule_id: booking.schedule_id
                })
            }else{
                res.status(400).json({
                    status: "FAIL",
                    message: "Terdapat Form Yang Kosong!"
                })
            }
        }catch(err){
            res.status(400).json({
                error: err
            })
        }
    },
    async DisplayBooking(req,res){
        try{
            await bookingService.showBooking()
            .then((data)=>{
                res.status(201).json({
                    data: data
                })
            })
        }catch(err){
            throw err
        }
    },

}