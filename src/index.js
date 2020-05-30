const puppeteer = require('puppeteer');

const { CronJob } = require('cron');

let change = 0;

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.worldometers.info/world-population/mexico-population/');

    mexicoPopulation = await page.evaluate(() => document.getElementsByClassName('rts-counter')[0].innerText);

    if (change !== mexicoPopulation) {
      console.log(mexicoPopulation); // eslint-disable-line
    }

    change = mexicoPopulation;

    await browser.close();

  } catch (error) {
    throw new Error(error);
  }
};

const job = new CronJob('*/10 * * * * *', async function () { // eslint-disable-line
  await getDataFromPuppeteer();
});
job.start();
