"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("payments", [
      {
        id: "21ff90bb-854c-4cc3-a27e-20e621fcac8c",
        total: 14000,
        currency: "SGD",
        status: "complete",
        payment_intent: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "56a0d0eb-18a8-4e3b-841f-f5534d48a38b",
        total: 2000,
        currency: "SGD",
        status: "complete",
        payment_intent: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6406288c-8e7f-4281-afa0-f4c6c1d2f29d",
        total: 4000,
        currency: "SGD",
        status: "complete",
        payment_intent: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payments", null, {});
  },
};
