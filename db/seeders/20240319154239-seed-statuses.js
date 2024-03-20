"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("statuses", [
      {
        name: "Draft",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Open to registration",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Closed for registration",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Ongoing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Past",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cancelled",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
