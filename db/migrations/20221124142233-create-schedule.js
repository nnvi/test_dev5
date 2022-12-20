'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Origin_Airport: {
        type: Sequelize.STRING
      },
      Destination_Airport: {
        type: Sequelize.STRING
      },
      Plane_class: {
        type: Sequelize.STRING
      },
      Airline_Name: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.INTEGER
      },
      flight_Date: {
        type: Sequelize.DATE
      },
      Departure_Hour: {
        type: Sequelize.TIME
      },
      Arrival_Hour: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  }
};