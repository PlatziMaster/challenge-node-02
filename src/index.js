/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const cron = require('node-cron');

const getStatsFromTweets = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.internetlivestats.com/');
    const tweets = await page.evaluate(() => document.getElementsByClassName('counter')[5].innerText);

    console.log(`Hasta el momento se han enviado ${tweets} Tweets 🐦`);

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

cron.schedule('*/1 * * * *', async () => {
  await getStatsFromTweets();
});
