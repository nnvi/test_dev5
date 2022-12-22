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

    return queryInterface.bulkInsert('Airport_Lists', [{
      Airport_Code:'CGK',
      Airport_Name:'Soekarno-Hatta International Airport',
      City:'Jakarta',
      Foto:"../../uploads/airplane.png",
      Description:'Indonesian airport',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
        Airport_Code:'DPS',
        Airport_Name:'Ngurah Rai (Bali) International Airport',
        City:'Denpasar',
        Foto:"../../uploads/airplane1.jpg",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'SUB',
        Airport_Name:'Juanda International Airport',
        City:'Surabaya',
        Foto:"../../uploads/airplane.png",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'UPG',
        Airport_Name:'Hasanuddin International Airport',
        City:'Ujung Pandang',
        Foto:"../../uploads/airplane1.jpg",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'DJJ',
        Airport_Name:'Sentani International Airport',
        City:'Jayapura',
        Foto:"../../uploads/airplane.png",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'SOQ',
        Airport_Name:'Dominique Edward Osok Airport',
        City:'Sorong',
        Foto:"../../uploads/airplane1.jpg",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'PKU',
        Airport_Name:'Sultan Syarif Kasim Ii (Simpang Tiga) Airport',
        City:'Pekanbaru',
        Foto:"../../uploads/airplane.png",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'BDO',
        Airport_Name:'Husein Sastranegara International Airport',
        City:'Bandung',
        Foto:"../../uploads/airplane1.jpg",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'PLM',
        Airport_Name:'Sultan Mahmud Badaruddin II Airport',
        City:'Palembang',
        Foto:"../../uploads/airplane.png",
        Description:'Indonesian airport',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        Airport_Code:'LOP',
        Airport_Name:'Lombok International Airport',
        City:'Mataram',
        Foto:"../../uploads/airplane1.jpg",
        Description:'Indonesian airport',
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
