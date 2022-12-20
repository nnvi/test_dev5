const ticketService = require("../../../services/ticketService")

module.exports={
    async CreateTicket(req,res){
        try{
            if(req.body.Passanger_Name && req.body.booking_id && req.body.Origin_Airport && req.body.Destination_Airport && req.body.Plane_class && req.body.flight_Hours && req.body.Airline_Name){
                const ticket = await ticketService.createTicket(req.body)
                return res.status(200).json({
                    status: "SUCCESS",
                    message: "Berhasil Menambahkan Data",
                    data: ticket
                    // Passanger_Name: ticket.Passanger_Name,
                    // booking_id: ticket.booking_id,
                    // Origin_Airport: ticket.Origin_Airport,
                    // Destination_Airport: ticket.Destination_Airport,
                    // Plane_class: ticket.Plane_class,
                    // flight_Hours: ticket.flight_Hours,
                    // Airline_Name: ticket.Airline_name
                })
            }else{
                res.status(400).json({
                    status: "FAIL",
                    message: "Terdapat Form Yang Kosong!"
                })
            }
        }catch(err){
            res.status(401).json({
                message: err.message
            })
        }
    },
    async DisplayTicket(req,res){
        try{
            await ticketService.FindAllTicket()
            .then((data)=>{
                res.status(201).json({
                    data: data
                })
            })
        }catch(err){
            throw err
        }
    },
    async deleteTicket(req,res){
        try{
            await ticketService.DeleteTicket(req.params.id)
            .then((data)=>{
                res.status(200).json({
                    status: "Delete Data Berhasil"
                });
            })

        }catch(err){
            res.status(403).json({
                message : err.message
            })
        }
    },
}