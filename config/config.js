import dotenv from "dotenv";
dotenv.config();

module.exports = {
    development:{
      username : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : "gongmo",
      host : process.env.MYSQL_HOST,
      dialect : "mysql",
      operatorsAliases : false,
    },

    production:{
      username : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : "gongmo",
      host : process.env.MYSQL_HOST,
      dialect : "mysql",
      operatorsAliases : false,
      logging : false
    },
}