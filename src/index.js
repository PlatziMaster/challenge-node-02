/* eslint-disable no-console */
const { CronJob } = require('cron');
const { bold } = require('kleur');

const getDatFromPuppeteer = require('./utils/scrapper');
const api = require('./utils/api');
const handleFatalError = require('./utils/handleFatalError');

async function startScrapper() {
  // Get last released course from Platzi
  const lastReleasedCourse = await getDatFromPuppeteer();

  // Get stored course
  const storedCourse = api.getCourse();

  // If stored course is the same that fetched
  // Makes nothing
  if (lastReleasedCourse === storedCourse) {
    console.log(bold('Nothing to save. I will search later!'));
    return;
  }

  // Update the db with fetched course
  api.updateCourse(lastReleasedCourse);
  console.log(bold().green('There is a new release:'));
  console.log(bold().cyan(`${lastReleasedCourse}`));
}

// After run start schedule a job to run the process again
const task = new CronJob(
  // Scheduled to run every minute
  // You can adjust the time taken into account parameters
  // seg min hour day weekDay monthDay
  // For example '0 0 17 * * */4' runs every Thursday at 5:00pm
  '0 */1 * * * *',
  // Function to run
  startScrapper,
  null,
  false,
  'America/Bogota',
);

// Run the schedule task
task.start();

// Handle errors
process.on('unhandledRejection', handleFatalError);
process.on('uncaughtException', handleFatalError);
