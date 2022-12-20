const { User } = require("../models");

module.exports = {
    create(createArgs){
        return User.create(createArgs)
    },

    findByEmail(findArgs){
        return User.findOne({where: {Email: findArgs}});
    },

    findByPk(id){
        return User.findByPk(id)
    },

    findAll(){
        return User.findAll()
    },
    
    getTotalUser(){
        return User.count()
    },

    update(id, updateArgs){
        return User.update(updateArgs, {
            where: {
                id
            }
        })
    }
}