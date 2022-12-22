const airportService = require("../../../services/airportService")
const bookingService = require("../../../services/bookingService")
const ticketService = require("../../../services/ticketService")

module.exports = {
    async addBooking(req,res){
        try{
            if(req.body.user_id && req.body.Total_Passenger && req.body.Plane_Class && req.body.Origin_Airport && req.body.Destination_Airport && req.body.Ticket_Date && req.body.schedule_id){
                const airport_origin = await airportService.findAirport(req.body.Origin_Airport)
                const airport_dest = await airportService.findAirport(req.body.Destination_Airport)
                const data={
                    user_id : req.body.user_id,
                    Total_Passenger : req.body.Total_Passenger,
                    Plane_Class : req.body.Plane_Class,
                    Origin_Airport : airport_origin.check[0].Airport_Name,
                    Destination_Airport : airport_dest.check[0].Airport_Name,
                    Ticket_Date : req.body.Ticket_Date, 
                    schedule_id : req.body.schedule_id
                }
                const booking = await bookingService.CreateBooking(data)
                res.status(200).json({
                    status: "SUCCESS",
                    message: "Berhasil Menambahkan Data",
                    data: booking
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