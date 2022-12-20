'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ticket,{
        foreignKey:'booking_id',
        as: 'tickets'
      }),
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users'
      }),
      this.belongsTo(models.Schedule, {
        foreignKey: 'schedule_id',
        as: 'schedules'
      })
    }
  }
  Booking.init({
    user_id: DataTypes.INTEGER,
    Total_Passenger: DataTypes.INTEGER,
    Plane_Class: DataTypes.STRING,
    Origin_Airport: DataTypes.STRING,
    Destination_Airport: DataTypes.STRING,
    Ticket_Date: DataTypes.DATE,
    schedule_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};