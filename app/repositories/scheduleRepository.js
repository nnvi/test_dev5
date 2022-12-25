const {Schedule} = require("../models")

module.exports={
    createSchedule(reqArgs){
        return Schedule.create(reqArgs)
    },
    findSchedule(reqArgs){
        return Schedule.findAll({where: {
            origin_name : reqArgs.origin_name,
            destination_name : reqArgs.destination_name,
            plane_class : reqArgs.plane_class,
            flight_date : reqArgs.flight_date
        }})
    },
    findAllData(){
        return Schedule.findAll()
    },
    findByPK(id){
        return Schedule.findByPk(id)
    },
    UpdateSchedule(id,reqArgs){
        return Schedule.update(reqArgs,{where:{id}})
    },
    Delete_Schedule(id){
        return Schedule.destroy({where:{id}})
    },
    async updateCapacity(id,capacity){
        const selisih = await findByPK(id)
        
    }
}