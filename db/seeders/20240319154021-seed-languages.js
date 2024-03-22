"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("languages", [
      {
        name: "English",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mandarin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Malay",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tamil",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("languages", null, {});
  },
};
