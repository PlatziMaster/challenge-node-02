const puppeteer = require('puppeteer');

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://weather.com/es-MX/tiempo/hoy/l/20.53,-97.46');
    await page.screenshot({
      path: 'src/images/image.png'
    });

    const platziCourseTitle = await page.evaluate(() => document.getElementsByClassName('today_nowcard-temp')[0].children[0].innerText
    );

    console.log(platziCourseTitle);
    console.log('Puppeteer End');
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

getDataFromPuppeteer();