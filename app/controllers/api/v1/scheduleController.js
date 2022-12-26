const airportService = require("../../../services/airportService")
const scheduleService = require("../../../services/scheduleService")

module.exports={
    async AddSchedule(req,res){
        try{
            if(req.body.origin_name && req.body.destination_name && req.body.plane_class && req.body.price && req.body.flight_date && req.body.departure_hour && req.body.arrival_hour){
                const origin_airport = await airportService.findAirport(req.body.origin_name)
                const destination_airport = await airportService.findAirport(req.body.destination_name)
                const tambah ={
                    origin_code : origin_airport.check[0].Airport_Code,
                    origin_name : origin_airport.check[0].Airport_Name,
                    origin_city : origin_airport.check[0].City,
                    destination_code: destination_airport.check[0].Airport_Code,
                    destination_name : destination_airport.check[0].Airport_Name,
                    destination_city : destination_airport.check[0].City,
                    plane_class : req.body.plane_class,
                    flight_date : req.body.flight_date,
                    airline_name : "Tripie Airline",
                    departure_hour : req.body.departure_hour,
                    arrival_hour : req.body.arrival_hour,
                    price : req.body.price
                }
                const schedule = await scheduleService.CreateSchedule(tambah)
                return res.status(200).json({
                    status: "SUCCESS",
                    message: "Berhasil Menambahkan Data",
                    data: schedule
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
    async updateSchedules(req,res){
        try{
            if(req.body.origin_name && req.body.destination_name && req.body.plane_class && req.body.price && req.body.flight_date && req.body.departure_hour && req.body.arrival_hour && req.body.capacity){
                const origin_airport = await airportService.findAirport(req.body.origin_name)
                const destination_airport = await airportService.findAirport(req.body.destination_name)
                const tambah ={
                    origin_code : origin_airport.check[0].Airport_Code,
                    origin_name : origin_airport.check[0].Airport_Name,
                    origin_city : origin_airport.check[0].City,
                    destination_code: destination_airport.check[0].Airport_Code,
                    destination_name : destination_airport.check[0].Airport_Name,
                    destination_city : destination_airport.check[0].City,
                    plane_class : req.body.plane_class,
                    flight_date : req.body.flight_date,
                    airline_name : "Tripie Airline",
                    departure_hour : req.body.departure_hour,
                    arrival_hour : req.body.arrival_hour,
                    price : req.body.price,
                    capacity : req.body.capacity
                }
                const schedule = await scheduleService.updateSchedule(req.params.id, tambah)
                res.status(200).json({
                    data : schedule
                })
            }else{
                res.status(400).json({
                    status: "FAIL",
                    message: "Terdapat Form Yang Kosong!"
                })
            }
        }catch(err){
            res.status(402).json({
                message: err.message
            })
        }
    },
    async deleteSchedule(req,res){
        try{
            await scheduleService.DeleteSchedule(req.params.id)
            .then((data)=>{
                res.status(200).json({
                    status: "Delete Data Berhasil",
                    data : data
                });
            })

        }catch(err){
            res.status(403).json({
                status: "ERROR",
                message : err.message
            })
        }
    },
    async ShowSchedule(req,res){
        try{
            await scheduleService.FindAllSchedule()
            .then((data)=>{
                if(data.Jadwal != ''){
                    res.status(200).json({
                        status: "OK",
                        data: data
                    })
                }else{
                    res.status(404).json({
                        status: "FAIL",
                        message: "Data Tidak Ditemukan!"
                    })
                }
            })
        }catch(err){
            res.status(401).json({
                status: "ERROR",
                message: err.message
            })
        }
    },
    async DetailSchedule(req,res){
        try{
            const schedule = await scheduleService.findByPK(req.params.id);
            if(schedule){
                res.status(200).json({
                    status: "OK",
                    message: "Berhasil Mengambil Data!",
                    data : schedule
                })
            }else{
                res.status(404).json({
                status: "FAIL",
                message: "Data Tidak Ditemukan!"
            })
            }
        }catch(err){
            res.status(422).json({
                status: "ERROR",
                message: err.message
            })
        }
    },
    async filterSchedule(req,res){
        try{
            if(req.body.origin_name && req.body.destination_name && req.body.flight_date && req.body.total_passenger && req.body.plane_class){
                await scheduleService.findschedule(req.body)
                .then((data)=>{
                    if(data == '' || data == null || data == undefined){
                        res.status(404).json({
                            status: "FAIL",
                            message: "Data Tidak Ditemukan!"
                        }) 
                    }else{
                        res.status(203).json({
                            data : data
                        })
                    }
                })
            }
        }catch(err){
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    }
}
