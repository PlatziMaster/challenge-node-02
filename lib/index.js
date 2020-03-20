const puppeteer = require('puppeteer');

const URL = 'https://www.worldometers.info/coronavirus/';

const getData = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${URL}`, {
      waitUntil: 'load',
      timeout: 0,
    });
    const counterCases = await page.evaluate(
      () =>
        document.getElementsByClassName('maincounter-number')[0].children[0]
          .outerText,
    );
    await browser.close();
    return counterCases;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getData;
