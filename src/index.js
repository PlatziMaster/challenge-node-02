const { CronJob } = require('cron');
const getData = require('./getData');

getData(true);

// eslint-disable-next-line no-console
console.log('Before job instantiation');
const job = new CronJob('0 */10 * * * *', (() => {
  getData(false);
}));
// eslint-disable-next-line no-console
console.log('After job instantiation');
job.start();
