"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.payment);
      this.belongsTo(models.user);
      this.belongsTo(models.event);
    }
  }
  Booking.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      event_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "events",
          key: "id",
        },
      },
      payment_id: {
        type: DataTypes.UUID,
        references: {
          model: "payments",
          key: "id",
        },
      },
      quantity_bought: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity_left: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "booking",
      underscored: true,
    }
  );
  return Booking;
};
