const airportRepository = require("../repositories/airportRepository")

module.exports={
    async CreateAirport(reqBody){
        const airport = airportRepository.createAirport()
        return{airport}
    },
    async   ListAirport(){
        try{
            const airport = await airportRepository.listAirport();
            return {
                airport : airport
            }
        }catch(err){
            throw err;
        }
    },
}