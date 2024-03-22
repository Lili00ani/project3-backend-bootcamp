"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Benjamin Lee",
        email: "benjamin.lee@gmail.com",
        reminder: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kevin Chang",
        email: "kevin.chang@gmail.com",
        reminder: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Chloes Lim",
        email: "chloes.lim@gmail.com",
        reminder: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Xin Yi",
        email: "xinyi@gmail.com",
        reminder: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Wei Jie",
        email: "weijie@gmail.com",
        reminder: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Aloysius Tan",
        email: "aloysius.tan@gmail.com",
        reminder: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
