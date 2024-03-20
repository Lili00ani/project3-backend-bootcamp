"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, { through: "fav_admin" });
      this.hasMany(models.event);
    }
  }
  Admin.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_link: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "admin",
      underscored: true,
      timestamps: true,
    }
  );
  return Admin;
};
