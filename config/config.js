require("dotenv").config();

module.exports = {
  development: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE + "_dev",
    host: 'localhost',
    dialect: "postgres",
    logging: false
  },
  "production": {
    "username": "neondb_owner",
    "password": "npg_H7XnpOArYkt0",
    "database": "neondb",
    "host": "ep-wispy-mud-a1o0zzj4-pooler.ap-southeast-1.aws.neon.tech",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
};
