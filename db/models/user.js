"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.admin, { through: "fav_admin" });
      this.belongsToMany(models.event, { through: "fav_event" });
      this.belongsToMany(models.event, { through: "waitlist" });
      this.belongsToMany(models.event, { through: "booking" });
      this.hasMany(models.booking);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reminder: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
