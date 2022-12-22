'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airport_Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Airport_Code: {
        type: Sequelize.STRING
      },
      Airport_Name: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      Foto:{
        type : Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Airport_Lists');
  }
};