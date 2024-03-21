"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("fav_events", [
      {
        user_id: 1,
        event_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        event_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("fav_events", null, {});
  },
};