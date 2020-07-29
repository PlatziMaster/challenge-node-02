const puppeteer = require('puppeteer');
const cron = require('node-cron');

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://bing.com/covid');
    await page.screenshot({
      path: 'src/images/image.png',
    });
    const bingCOVID19 = await page.evaluate(() => document.getElementsByClassName('infoTileConfirmed')[0].children[0].innerHTML);
    // eslint-disable-next-line no-console
    console.log(`Total confirmated cases of COVID-19 ${bingCOVID19}`);
    await browser.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

cron.schedule('*/1 * * * *', () => {
  getDataFromPuppeteer();
});

