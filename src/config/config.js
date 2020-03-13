require('dotenv').config();

const config = {
  webhookURL: process.env.HOOK + process.env.TOKEN,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};

module.exports = config;
