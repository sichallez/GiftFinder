// config.js
const dotenv = require("dotenv");
// loads environment variables from a .env file into process.env
dotenv.config();

module.exports = {
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: process.env.REDIRECT_URL,
  COMET_API_KEY: process.env.COMET_API_KEY,
  COMET_APP_ID: process.env.COMET_APP_ID,
  COMET_WIDGET_ID: process.env.COMET_WIDGET_ID,
  COMET_REGION: process.env.COMET_REGION,
};
