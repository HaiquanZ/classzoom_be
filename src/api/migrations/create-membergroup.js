'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('membergroups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      groupid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      userid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['member', 'moderator'],
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
    await queryInterface.dropTable('membergroups');
  }
};