'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Booking,{
        foreignKey:'user_id',
        as: 'bookings'
      })
    }
  }
  User.init({
    Name: DataTypes.STRING,
    Encrypted_Password: DataTypes.STRING,
    Role: DataTypes.STRING,
    Foto: DataTypes.STRING,
    Address: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone_Number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};