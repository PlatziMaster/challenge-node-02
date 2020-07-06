/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-console */
const fs = require('fs').promises;
const puppeteer = require('puppeteer');
const cron = require('node-cron');

const rutaArchivo = 'src/dummy/';
const nombreArchivo = 'ValorDolar.txt';

async function leerArchivo(archivo, vlrDolar) {
  //console.log('entro a la funcion leer archivo');
  const data = await fs.readFile(archivo, 'utf8');
  //console.log(data, vlrDolar);
  if (!(vlrDolar === data)) {
    return data;
  }
  return 0;
}

async function escribirArchivo(archivo, vlrDolar) {
  //console.log('entro a la funcion escribir archivo');
  console.log(archivo, vlrDolar);
  await fs.writeFile(archivo, vlrDolar);
  console.log('Archivo actualizado Satisfactoriamente');
  return vlrDolar;
}

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.grupoaval.com/wps/portal/grupo-aval/aval/portal-financiero/monedas/dolar/cotizaciones-dia', { waitUntil: 'load', timeout: 0 });

    await page.screenshot({
      path: 'src/images/image.png',
    });

    await page.pdf({
      path: 'src/pdfs/website.pdf',
    });

    const valorDollar = await page.evaluate(() => document.getElementsByClassName('resumen-dolar-dia-tabla')[0].children[0].children[2].children[5].getElementsByTagName('span')[0].innerText);
    //valorDollar = '4,000';
    console.log(valorDollar);
    if (!valorDollar) {
      console.error('No viene valor del dollar');
    } else {
      const esIgual = await leerArchivo(rutaArchivo + nombreArchivo, valorDollar);
      if (esIgual === 0) {
        console.log('El valor del dollar no ha cambiado');
      } else {
        const newDollar = await escribirArchivo(rutaArchivo + nombreArchivo, valorDollar);
        console.log('El nuevo valor del dolar es: ', newDollar);
      }
    }
    console.log('Puppeteer End');
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};
cron.schedule('*/1 * * * *', async () => {
  await getDataFromPuppeteer();
})
