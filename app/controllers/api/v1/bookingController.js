const airportService = require("../../../services/airportService")
const bookingService = require("../../../services/bookingService")

module.exports = {
    async addBooking(req,res){
        try{
            if(req.body.user_id && req.body.schedule_id && req.body.origin_name && req.body.destination_name && req.body.plane_class && req.body.total_passenger && req.body.price && req.body.flight_date && req.body.departure_hour && req.body.arrival_hour && req.body.passenger_name && req.body.phone_number){
                const origin_airport = await airportService.findAirport(req.body.origin_name)
                const destination_airport = await airportService.findAirport(req.body.destination_name)
                const data ={
                    user_id: req.body.user_id,
                    schedule_id : req.body.schedule_id,
                    origin_code : origin_airport.check[0].Airport_Code,
                    origin_name : origin_airport.check[0].Airport_Name,
                    origin_city : origin_airport.check[0].City,
                    destination_code: destination_airport.check[0].Airport_Code,
                    destination_name : destination_airport.check[0].Airport_Name,
                    destination_city : destination_airport.check[0].City,
                    plane_class : req.body.plane_class,
                    total_passenger : req.body.total_passenger,
                    flight_date : req.body.flight_date,
                    airline_name : "Tripie Airline",
                    departure_hour : req.body.departure_hour,
                    arrival_hour : req.body.arrival_hour,
                    price : req.body.price,
                    passenger_name : req.body.passenger_name,
                    phone_number : req.body.phone_number
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
    async addBookingAndro(req,res){
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
                    data: booking,
                    kode_asal : airport_origin.check[0].Airport_Code,
                    kode_tujuan : airport_dest.check[0].Airport_Code
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

}