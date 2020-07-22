/* eslint-disable no-console */
const cron = require('node-cron');

cron.schedule('* * * * * *', () => {
  console.log('hello world');
});
