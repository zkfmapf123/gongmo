const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./User")(sequelize,Sequelize);
db.Poster = require("./Poster")(sequelize,Sequelize);
db.Comment = require("./Comment")(sequelize,Sequelize);
db.University = require("./Unitversity")(sequelize,Sequelize);
db.UserPoster = require("./UserPoster")(sequelize,Sequelize);
db.Seeboard = require("./Seeboard")(sequelize,Sequelize);
db.SeeboardComments = require("./SeeboardComments")(sequelize,Sequelize);

module.exports = db;