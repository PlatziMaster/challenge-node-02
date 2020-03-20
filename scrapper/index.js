/* eslint-disable space-in-parens */
const puppeteer = require('puppeteer');

const URL = 'https://www.coindesk.com/price/bitcoin';

const getData = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    const price = await page.evaluate(() => document.getElementsByClassName('price-large')[0].innerText.substr(2,));
    console.log(price);
    await browser.close();
    return price;
  } catch (error) {
    process.stdout.error(error);
  }
};

module.exports = getData;
