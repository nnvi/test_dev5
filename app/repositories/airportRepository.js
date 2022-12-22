const{Airport_List}= require('../models')

module.exports={
    createAirport(reqArgs){
        return Airport_List.create(reqArgs)
    },
    listAirport(){
        return Airport_List.findAll()
    },
    findAirportbyId(Code){
        return Airport_List.findAll({where: {Airport_Code : Code}})
    }
}