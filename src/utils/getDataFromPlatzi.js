const puppeteer = require('puppeteer');
const postToSlack = require('./postToSlack');

async function getDataFromPlatzi(email, password, user) {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto('https://platzi.com/login/', { waitUntil: 'networkidle0' }); // wait until page load
  await page.type('[name="email"]', email);
  await page.type('[name="password"]', password);
  await Promise.all([
    page.click('[class="btn-Green btn--md"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  await page.goto(`https://platzi.com/${user}/`, { waitUntil: 'networkidle0' });
  await page.click('[class="SeeMore"]');
  const coursesFinished = await page.evaluate(() => Object.values(document.getElementsByClassName('Course is-notPrincipal')).map((course) => course.children[0].children[1].children[0].innerText).filter((courseTitle) => courseTitle.indexOf('%') === -1).length);
  const platziAvatar = await page.evaluate(() => document.getElementsByClassName('Layout--radius')[0].src);
  console.log(platziAvatar);
  console.log(coursesFinished);
  console.log('Puppeteer End');
  await browser.close();

  postToSlack(user, platziAvatar, coursesFinished);
}

module.exports = getDataFromPlatzi;
