const ticketRepository = require("../repositories/ticketRepository")

module.exports={
    createTicket(requestBody){
        return ticketRepository.createTicket(requestBody)
    },
    async FindAllTicket(){
        try{
            const ticket = await ticketRepository.findAll()
            return{
                tiket : ticket
            }
        }catch(err){
            throw err
        }
    },
    DeleteTicket(id){
        return ticketRepository.Deleteticket(id)
    }
}

