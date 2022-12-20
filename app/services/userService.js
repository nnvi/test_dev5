const userRepository = require("../repositories/userRepository");

module.exports = {
    create(requestBody){
        return userRepository.create(requestBody)
    },

    findByEmail(requestFind){
        return userRepository.findByEmail(requestFind)
    },

    findByPk(id){
        return userRepository.findByPk(id)
    },

    async findAll(){
        try{
            const user = await userRepository.findAll();
            const userCount = await userRepository.getTotalUser();

            return {
                data: user,
                count: userCount
            }
        }catch(err){
            throw err;
        }
    },

    update(id, requestBody){
        return userRepository.update(id, requestBody)
    }
}