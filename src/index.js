const puppeteer = require('puppeteer');
const addRecord = require('./db/db');
const URL = 'https://weather.com/es-MX/tiempo/hoy/l/20.53,-97.46';

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    await page.screenshot({
      path: 'src/images/image.png'
    });

    const temperature = await page.evaluate(() => document.getElementsByClassName('today_nowcard-temp')[0].children[0].innerText
    );

    addRecord(temperature)
    console.log('Puppeteer End');
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

getDataFromPuppeteer();