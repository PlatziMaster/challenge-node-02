const puppeteer = require('puppeteer');

const getDataFromPuppeteer = async () => {
  let lastReleasedCourse = '';
  try {
    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://platzi.com');

    lastReleasedCourse = await page.$$eval(
      '.RecentCourses-content h3',
      (nodes) => {
        return nodes.map((node) => node.textContent)[0];
      },
    );

    // Close browser
    await browser.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return lastReleasedCourse;
};

module.exports = getDataFromPuppeteer;
