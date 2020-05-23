const puppeteer = require('puppeteer');

const db = {
  'coin': [],
};

function initialCharge(info) {
  for (let i = 0; i < 10; i++) {
    db.coin.push(info[i]);
  }
  // eslint-disable-next-line no-console
  console.log('Intial');
  // eslint-disable-next-line no-console
  console.table(db.coin);
}

function checkValues(info) {
  for (let i = 0; i < 10; i++) {

    const com = db.coin.filter((item) => item.coin === info[i].coin)[0];

    if (com && com.value !== info[i].value) {
      const ind = db.coin.indexOf(com);
      db.coin[ind] = info[i];
    }

  }

  // eslint-disable-next-line no-console
  console.log('new');
  // eslint-disable-next-line no-console
  console.table(db.coin);
}

const getDataFromPuppeteer = async (initialData) => {
  try {
    const info = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://es.investing.com/crypto/', { waitUntil: 'load', timeout: 0 });

    const texts = await page.evaluate(() => {
      const data = [];
      const elements = document.getElementsByClassName('cryptoName');

      // eslint-disable-next-line no-restricted-syntax
      for (const element of elements) data.push(element.innerText);

      return data;
    });

    const values = await page.evaluate(() => {
      const data = [];
      const elements = document.getElementsByClassName('price');
      // eslint-disable-next-line no-restricted-syntax
      for (const element of elements) data.push(element.innerText);
      return data;
    });

    const d = new Date();

    for (let i = 0; i < 10; i++) {
      info.push({
        coin: texts[i],
        value: values[i],
        date: d,
      });
    }

    (initialData) ? initialCharge(info) : checkValues(info);
    await browser.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  }
};

module.exports = getDataFromPuppeteer;
