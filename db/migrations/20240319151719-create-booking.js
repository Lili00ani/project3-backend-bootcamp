"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "events",
          key: "id",
        },
      },
      payment_id: {
        type: Sequelize.UUID,
        references: {
          model: "payments",
          key: "id",
        },
      },
      booking_status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quantity_bought: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quantity_left: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookings");
  },
};
