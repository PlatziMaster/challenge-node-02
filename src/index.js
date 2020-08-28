const puppeteer = require('puppeteer');
const cron = require('node-cron');

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://blogdesuperheroes.es/');
    await page.screenshot({
      path: 'src/images/image.png',
    });
    await page.pdf({
      path: 'src/pdfs/website.pdf',
    });
    const newsTitle = await page.evaluate(() => document.querySelectorAll('.mnmd-news-ticker__content ul')[0].children[0].querySelector('.post .post__title').innerText);
    process.stdout.write(`${newsTitle}\n`);
    await browser.close();
  } catch (error) {
    process.stdout.write('\n error ::', error);
  }
};

getDataFromPuppeteer();

cron.schedule('*/1 * * * *', () => {
  getDataFromPuppeteer();
});
