const { Ticket } = require("../models");

module.exports={
    createTicket(reqArgs){
        return Ticket.create(reqArgs)
    },
    findAll(){
        return Ticket.findAll()
    },
    DeleteSchedule(id){
        return Ticket.destroy(id)
    }
}   