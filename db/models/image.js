"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.event);
    }
  }
  Image.init(
    {
      link: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "events",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "image",
      underscored: true,
      timestamps: true,
    }
  );
  return Image;
};
