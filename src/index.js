/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const db = require('./db');

const getDataFromPuppeteer = async () => {
  try {
    const currentDate = new Date().toLocaleString('en-US', {
      timeZone: 'America/Mexico_City',
    });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.ssn.unam.mx/sismicidad/ultimos/');
    const lastEarthquake = await page.evaluate(() => {
      const object = {
        intensity: document.getElementById('2day_1').children[0].innerText,
        date: document.getElementById('2day_1').children[1].innerText,
        location: document.getElementById('2day_1').children[2].innerText,
        depth: document.getElementById('2day_1').children[3].innerText,
      };
      return object;
    });
    console.log(currentDate);
    if (db.values.last.date !== lastEarthquake.date) {
      db.changeValue(lastEarthquake);
      console.log('¡¡¡NUEVO SISMO!!!');
      console.log(`Magnitud: ${db.values.last.intensity}`);
      console.log(`Fecha y hora: ${db.values.last.date}`);
      console.log(`Epicentro: ${db.values.last.location}`);
      console.log(`Profundidad: ${db.values.last.depth}`);
    } else {
      console.log('No se han registrado nuevos sismos.');
    }
    console.log('');
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

setInterval(() => {
  getDataFromPuppeteer();
}, 5000);
