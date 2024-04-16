"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: "0a750c6d-758e-4113-806d-4061f49edd13",
        name: "Benjamin Lee",
        email: "benjamin.lee@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "29241ac2-2d21-4406-a8e6-6ea3b7256eb9",
        name: "Kevin Chang",
        email: "kevin.chang@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "428289a0-d773-4414-b429-2b79ea5145b8",
        name: "Chloes Lim",
        email: "chloes.lim@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "696064e6-5714-4610-9ce5-e2cffc41b3d5",
        name: "Xin Yi",
        email: "xinyi@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "7ca0e43d-1824-42a0-b214-fa4ae3ea57df",
        name: "Wei Jie",
        email: "weijie@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "e3ece211-3382-45b8-a730-0dd42207213f",
        name: "Aloysius Tan",
        email: "aloysius.tan@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
