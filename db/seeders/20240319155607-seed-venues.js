"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("venues", [
      {
        address: "6 Palm Road",
        postal_code: "456441",
        lat: null,
        lng: null,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "101 Cantonment Road",
        postal_code: "089774",
        lat: null,
        lng: null,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "36 Holland Drive",
        postal_code: "270036",
        lat: null,
        lng: null,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "500 Bukit Merah View",
        postal_code: "159682",
        lat: null,
        lng: null,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "28A Kreta Ayer Road",
        postal_code: "088995",
        lat: null,
        lng: null,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "1 Engku Aman Turn",
        postal_code: "408528",
        lat: null,
        lng: null,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("venues", null, {});
  },
};
