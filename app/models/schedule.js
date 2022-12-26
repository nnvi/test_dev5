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
    origin_code : DataTypes.STRING,
    origin_name : DataTypes.STRING,
    origin_city : DataTypes.STRING,
    destination_code: DataTypes.STRING,
    destination_name : DataTypes.STRING,
    destination_city : DataTypes.STRING,
    plane_class : DataTypes.STRING,
    flight_date : DataTypes.DATE,
    airline_name : DataTypes.STRING,
    departure_hour : DataTypes.TIME,
    arrival_hour : DataTypes.TIME,
    price : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};