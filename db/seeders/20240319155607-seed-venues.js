"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("venues", [
      {
        address: "6 Palm Road",
        postal_code: "456441",
        lat: 1.3133061244821134,
        lng: 103.93066699939865,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "101 Cantonment Road",
        postal_code: "089774",
        lat: 1.2762438143931685,
        lng: 103.84161373371323,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "36 Holland Drive",
        postal_code: "270036",
        lat: 1.3095026563903378,
        lng: 103.79270991074236,
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "500 Bukit Merah View",
        postal_code: "159682",
        lat: "1.2857349767816093",
        lng: "103.82322767021527",
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "28A Kreta Ayer Road",
        postal_code: "088995",
        lat: "1.2809445074072483",
        lng: "103.84284814197645",
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: "1 Engku Aman Turn",
        postal_code: "408528",
        lat: "1.316506881902658",
        lng: "103.8964838094283",
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
