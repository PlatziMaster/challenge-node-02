const puppeteer = require('puppeteer');
const cron = require('node-cron');
const express = require('express');

const app = express();

let saveData = '';

app.listen(4000);

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pathofexile.gamepedia.com/Divination_card');

    await page.screenshot({
      path: 'src/images/screenshot.png',
    });

    await page.pdf({
      path: 'src/pdfs/website.pdf',
    });

    const table = await page.evaluate(() => Array.from(document.querySelectorAll('.wikitable:first-child span.c-item-hoverbox__activator a'), (element) => element.href));

    const useTable = [...table].slice(1, 2);
    try {
      await page.goto(useTable[0], { waitUntil: 'load' });
      const name = await page.evaluate(() => document.getElementById('firstHeading').innerText);

      if (saveData !== name) {
        saveData = name;
        process.stdout.write('El dato ha cambiado \n');
      } else {
        process.stdout.write('El dato NO ha cambiado \n');
      }

    } catch (error) {
      process.stdout.write('\n error ::', error);
    }

    process.stdout.write('Puppeteer ha terminado \n');
    await browser.close();

  } catch (error) {
    process.stdout.write('\n error ::', error);
  }
};

cron.schedule('* * * * *', () => {
  getDataFromPuppeteer();
  process.stdout.write('Tomando los datos cada minuto :: \n');
});
