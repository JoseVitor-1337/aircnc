const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.API_PORT || 3333,
  mongodb_local_url: process.env.MONGO_URL || "mongodb://localhost/aircnc",
};
