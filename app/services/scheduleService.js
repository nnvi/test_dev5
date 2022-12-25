const scheduleRepository = require("../repositories/scheduleRepository")

module.exports={
    async CreateSchedule(requestBody){
        return scheduleRepository.createSchedule(requestBody)
    },
    async FindAllSchedule(){
        try{
            const sched = await scheduleRepository.findAllData();
            return {
                Jadwal : sched
            }
        }catch(err){
            throw err;
        }
    },
    async findByPK(id){
        return scheduleRepository.findByPK(id)
    },
    async findschedule(requestBody){
        try{
            const filter = await scheduleRepository.findSchedule(requestBody)
            if(filter == null || filter == undefined || filter == ""){
                return{
                    status: "Fail",
                    message : "Data tidak ditemukan"
                }
            }else{
                return filter
            }
        }catch(err){
            throw err
        }
    },
    updateSchedule(id,requestBody){
        return scheduleRepository.UpdateSchedule(id, requestBody)
    },
    DeleteSchedule(id){
        return scheduleRepository.Delete_Schedule(id)
    }
}