'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Booking, {
        foreignKey: 'booking_id',
        as: 'bookings'
      })
      // define association here
    }
  }
  Ticket.init({
    Passanger_Name: DataTypes.STRING,
    booking_id: DataTypes.INTEGER,
    Origin_Airport: DataTypes.STRING,
    Destination_Airport: DataTypes.STRING,
    Plane_class: DataTypes.STRING,
    flight_Hours: DataTypes.TIME,
    Airline_Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};