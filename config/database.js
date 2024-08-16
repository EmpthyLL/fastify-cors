require("dotenv").config();

module.exports = {
  port: process.env.DB_PORT || 3306,
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
  },
  pool: {
    min: process.env.DB_POOL_MIN || 2,
    max: process.env.DB_POOL_MAX || 10,
  },
};
