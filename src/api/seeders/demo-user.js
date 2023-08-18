'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        email: "duckhiem@gmail.com",
        password: await hashPassword("12345678"),
        username: "duckhiem",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        email: "duckhiem1@gmail.com",
        password: await hashPassword("12345678"),
        username: "duckhiem1",
        gender: "female",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        email: "duckhiem2@gmail.com",
        password: await hashPassword("12345678"),
        username: "duckhiem2",
        gender: "other",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
