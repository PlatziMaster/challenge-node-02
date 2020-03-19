const puppeteer = require('puppeteer');

const URL = 'https://www.coindesk.com/price/bitcoin';

const getDataFromPuppeteer = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({
      path: 'src/images/image.png',
    });
    await page.pdf({
      path: 'src/pdfs/website.pdf',
    });
    const price = await page.evaluate(() => document
      .getElementsByClassName('price-large')[0]
      .innerText
      // eslint-disable-next-line comma-dangle
      .substr(2,));
    await browser.close();
    return price;
  } catch (error) {
    process.stdout.error(error);
  }
};

getDataFromPuppeteer(URL);
