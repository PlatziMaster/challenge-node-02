/* eslint-disable no-console */
const express = require('express');

const helmet = require('helmet');

const cron = require('node-cron');

const fetch = require('node-fetch');

const { config } = require('../config');

const app = express();
const sample = require('./routes/index');

const url = 'http://localhost:3000/api';

app.use(express.json());
app.use(helmet());

const callAPI = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

cron.schedule('3 * * * * * ', () => {
  console.log('⏲️ RUNNING THE CRON');
  callAPI();
});

sample(app);
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
