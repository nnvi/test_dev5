const airportRepository = require("../repositories/airportRepository")

module.exports={
    async CreateAirport(reqBody){
        const airport = airportRepository.createAirport()
        return{airport}
    },
    async   ListAirport(){
        try{
            const airport = await airportRepository.listAirport();
            return airport
        }catch(err){
            throw err;
        }
    },
    async findAirport(name){
        try{
            const check = await airportRepository.findAirportbyName(name);
            return {check}
        }catch(err){
            throw err
        }
    }
}