"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.TEXT,
      },

      language_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "languages",
          key: "id",
        },
      },

      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },

      venue_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "venues",
          key: "id",
        },
      },

      admin_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "admins",
          key: "id",
        },
      },

      price: {
        type: Sequelize.INTEGER,
      },

      start: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      end: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "statuses",
          key: "id",
        },
      },

      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      image_link: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("events");
  },
};
