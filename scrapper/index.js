/* eslint-disable space-in-parens */
const puppeteer = require('puppeteer');

const URL = 'https://www.coindesk.com/price/bitcoin';

const getData = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    // eslint-disable-next-line comma-dangle
    const price = await page.evaluate(() => document.getElementsByClassName('price-large')[0].innerText.substr(2,));
    await browser.close();
    if (price !== 0) {
      process.stdout.write(price);
      return price;
    }
    if (price === 0) {
      await getData();
    }
  } catch (error) {
    process.stdout.write(error);
  }
};

module.exports = getData;
