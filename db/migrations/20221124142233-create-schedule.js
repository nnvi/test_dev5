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
      origin_code :{
        allowNull: false,
        type: Sequelize.STRING
      },
      origin_name :{
        allowNull: false,
        type: Sequelize.STRING
      },
      origin_city :{
        allowNull: false,
        type: Sequelize.STRING
      },
      destination_code:{
        allowNull: false,
        type: Sequelize.STRING
      },
      destination_name :{
        allowNull: false,
        type: Sequelize.STRING
      },
      destination_city :{
        allowNull: false,
        type: Sequelize.STRING
      },
      plane_class :{
        allowNull: false,
        type: Sequelize.STRING
      },
      flight_date :{
        allowNull: false,
        type: Sequelize.DATE
      },
      airline_name :{
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_hour :{
        allowNull: false,
        type: Sequelize.TIME
      },
      arrival_hour : {
        allowNull: false,
        type: Sequelize.TIME
      },
      price :{
        allowNull: false,
        type: Sequelize.INTEGER
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