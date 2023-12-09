'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passHash = await bcrypt.hash('12345678', 10);
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Granite Bagas',
          email: 'granitebagas28@gmail.com',
          password: passHash,
          image: 'avatar.jpg',
          position: 'Full Stack Engineer',
          phone: '081319144618',
          role: 'user',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
