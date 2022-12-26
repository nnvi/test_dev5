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
    schedule_id : DataTypes.INTEGER,
    origin_code : DataTypes.STRING,
    origin_name : DataTypes.STRING,
    origin_city : DataTypes.STRING,
    destination_code: DataTypes.STRING,
    destination_name : DataTypes.STRING,
    destination_city : DataTypes.STRING,
    plane_class : DataTypes.STRING,
    total_passenger : DataTypes.INTEGER,
    flight_date : DataTypes.DATE,
    airline_name : DataTypes.STRING,
    departure_hour : DataTypes.TIME,
    arrival_hour : DataTypes.TIME,
    price : DataTypes.INTEGER,
    passenger_name : DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};