const puppeteer = require('puppeteer');

const getDataFromPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://platzi.com');
    await page.screenshot({
      path: 'src/images/image.png'
    });
    await page.pdf({
      path: 'src/pdfs/website.pdf'
    });
    const platziCourseTitle = await page.evaluate(() => document.getElementsByClassName('RecentCourseVideo-content')[0].children[0].innerText
    );
    console.log(platziCourseTitle);
    console.log('Puppeteer End');
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

getDataFromPuppeteer();