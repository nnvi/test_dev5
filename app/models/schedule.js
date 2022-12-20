'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Booking,{
        foreignKey:'schedule_id',
        as: 'bookings'
      })
      // define association here
    }
  }
  Schedule.init({
    Origin_Airport: DataTypes.STRING,
    Destination_Airport: DataTypes.STRING,
    Plane_class: DataTypes.STRING,
    Airline_Name: DataTypes.STRING,
    Price: DataTypes.INTEGER,
    flight_Date: DataTypes.DATE,
    Departure_Hour: DataTypes.TIME,
    Arrival_Hour: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};