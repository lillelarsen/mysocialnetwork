const dotenv = require("dotenv");

dotenv.config();

module.exports = function() {
  global.PORT = process.env.PORT || 3000;
  global.DOMAIN = process.env.DOMAIN || "localhost";
  global.SESSION_SECRET = process.env.SESSION_SECRET || "blowfish secret";
  global.DB_HOST = process.env.DB_HOST || "localhost";
  global.DB_NAME = process.env.DB_NAME || "msn";
};
