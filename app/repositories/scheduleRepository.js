const {Schedule} = require("../models")

module.exports={
    createSchedule(reqArgs){
        return Schedule.create(reqArgs)
    },
    findSchedule(reqArgs){
        return Schedule.findAll({where: {
            Origin_Airport : reqArgs.Origin_Airport,
            Destination_Airport : reqArgs.Destination_Airport,
            Plane_class : reqArgs.Plane_class,
            flight_Date : reqArgs.flight_Date
        }})
    },
    findAllData(){
        return Schedule.findAll()
    },
    UpdateSchedule(id,reqArgs){
        return Schedule.update(reqArgs,{where:{id}})
    },
    Delete_Schedule(id){
        return Schedule.destroy({where:{id}})
    }
}