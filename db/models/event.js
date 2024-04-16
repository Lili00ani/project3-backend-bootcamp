"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.language);
      this.belongsTo(models.category);
      this.belongsTo(models.venue);
      this.belongsTo(models.admin);
      this.belongsTo(models.status);
      this.belongsToMany(models.user, {
        as: "booked_by_users",
        through: "booking",
      });
      this.hasMany(models.booking);
    }
  }
  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      // language_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "languages",
      //     key: "id",
      //   },
      // },
      // category_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "categories",
      //     key: "id",
      //   },
      // },
      // venue_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "venues",
      //     key: "id",
      //   },
      // },
      // admin_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "admins",
      //     key: "id",
      //   },
      // },
      price: DataTypes.INTEGER,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      // status_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "statuses",
      //     key: "id",
      //   },
      // },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_link: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "event",
      underscored: true,
      timestamps: true,
    }
  );
  return Event;
};
