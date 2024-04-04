// var _require = require("sequelize"),
//   DataTypes = _require.DataTypes,
//   Sequelize = _require.Sequelize;

// exports.sequelize = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   username: "postgres",
//   password: "root",
//   database: "event_link",
//   logging: true,
// });

// var User = exports.sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement:true
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     role: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     tableName: "users",
//     timestamps: false, // If your table doesn't have createdAt and updatedAt columns
//   }
// );

// exports["default"] = User;
