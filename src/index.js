/* eslint-disable no-console */
const cron = require('node-cron');

const puppeteer = require('puppeteer');

const fs = require('fs');

let mencion = '';

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    fs.readFile('./src/saveArray.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log('error: ', err);
      } else {
        mencion = data;
      }
    });

    await page.goto('https://www.youtube.com/');

    const infoYoutube = await page.evaluate(() => document.getElementsByClassName('ytd-rich-grid-video-renderer')[0].children[1].children[1].children[0].innerText);

    await browser.close();

    if (infoYoutube === mencion) {
      //console.log('No hay cambios aun');
    } else {
      console.log('!!! YA CAMBIO ¡¡¡');
    }

    fs.writeFile('./src/saveArray.txt', infoYoutube, (err) => {
      if (err) throw err;
    });

  } catch (error) {
    console.error(error);
  }
};

cron.schedule('* * * * * ', () => {
  getDataFromPuppeteer();
});

