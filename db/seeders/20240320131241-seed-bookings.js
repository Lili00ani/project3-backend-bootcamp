"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("bookings", [
      {
        id: uuidv4(),
        user_id: "0a750c6d-758e-4113-806d-4061f49edd13",
        event_id: 1,
        payment_id: "21ff90bb-854c-4cc3-a27e-20e621fcac8c",
        booking_status: "complete",
        quantity_bought: 1,
        quantity_left: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: "29241ac2-2d21-4406-a8e6-6ea3b7256eb9",
        event_id: 4,
        payment_id: "6406288c-8e7f-4281-afa0-f4c6c1d2f29d",
        booking_status: "complete",
        quantity_bought: 1,
        quantity_left: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: "428289a0-d773-4414-b429-2b79ea5145b8",
        event_id: 2,
        payment_id: "56a0d0eb-18a8-4e3b-841f-f5534d48a38b",
        booking_status: "complete",
        quantity_bought: 1,
        quantity_left: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};
