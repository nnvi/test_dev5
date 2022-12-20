const scheduleRepository = require("../repositories/scheduleRepository")

module.exports={
    CreateSchedule(requestBody){
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
    async findschedule(requestBody){
        try{
            const filter = await scheduleRepository.findSchedule(requestBody)
            if (filter ==""|| filter == null || filter== undefined ){
                return{
                    data : "Tidak ada Schedule yang cocok"
                }
            }else{
                return{
                    data : filter
                }
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