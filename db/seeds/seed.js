'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Insert
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      Name: 'admin',
      Encrypted_Password: "$2a$10$X7V.FfeIM09h57xISUivxuyaQ3UmjXQcUL.Y6QcgL3icAar5PF4jm",
      Role : "Admin",
      Foto: "../../uploads/user.png",
      Address: "Jalan Timbul Tenggelam",
      Phone_Number: "081234567890",
      Email: "admin@tripie.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  // Delete
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
