const airportService = require("../../../services/airportService")

module.exports={
    async AddAirportList(req,res){
        try{
            if(req.body.Airport_Code && req.body.Airport_Name && req.body.City && req.body.Description){
                const add = await airportService.CreateAirport(req)
                res.status(200).json({
                    status:"Berhasil",
                    message: "Data Berhasil Ditambahkan",
                    data : add
                })
            }else{
                res.status(400).json({
                    status: "FAIL",
                    message: "Terdapat Form Yang Kosong!"
                })
            }
        }catch(err){
            throw err
        }
    },
    async ShowAirportList(req,res){
        try{
            await airportService.ListAirport()
            .then((data)=>{
                res.status(200).json({
                    status: "OK",
                    data: data
                })
            })
        }catch(err){
            throw err
        }
    },
}