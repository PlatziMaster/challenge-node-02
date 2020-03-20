const puppeteer = require('puppeteer');

const URL = 'https://www.coindesk.com/price/bitcoin';

const getDataFromPuppeteer = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const price = await page.evaluate(() => document.getElementsByClassName('price-large')[0].innerText.substr(2,) )
      console.log(price);
    await browser.close();
    return price;
  } catch (error) {
    process.stdout.error(error);
  }
};

getDataFromPuppeteer(URL);
