const scheduleService = require("../../../services/scheduleService")

module.exports={
    async AddSchedule(req,res){
        try{
            if(req.body.Origin_Airport && req.body.Destination_Airport && req.body.Plane_Class && req.body.Airline_Name && req.body.Price && req.body.flight_Date && req.body.Departure_Hour && req.body.Arrival_Hour){
                const schedule = await scheduleService.CreateSchedule(req.body)
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
            const schedule = await scheduleService.updateSchedule(req.params.id, req.body)
            res.status(200).json({
                data : schedule
            })  
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
                message : err.message
            })
        }
    },
    async ShowSchedule(req,res){
        try{
            await scheduleService.FindAllSchedule()
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
    async filterSchedule(req,res){
        try{
            await scheduleService.findschedule(req.body)
            .then((data)=>{
                res.status(203).json({
                    data : data
                })
            })
        }catch(err){
            throw err
        }
    }
}
