"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Education",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Arts & Culture",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Celebration",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Exhibition & Fair",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sports & Fitness",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Outings & Tour",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Charity & Volunteerism",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Leisure",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
