const puppeteer = require('puppeteer');
const path = require('path');
const postToSlack = require('./postToSlack');

async function getDataFromPlatzi(email, password, user) {

  //Open browser
  const browser = await puppeteer.launch({ headless: true });

  //Open a page in the browser
  const page = await browser.newPage();

  //Configure the size of the viewport
  await page.setViewport({ width: 1200, height: 720 });

  //Go to platzi login
  await page.goto('https://platzi.com/login/', { waitUntil: 'networkidle0' }); // wait until page load

  //Enter login parameters
  await page.type('[name="email"]', email);

  await page.type('[name="password"]', password);

  //Click to login
  await Promise.all([
    page.click('[class="btn-Green btn--md"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  //Go to user profile
  await page.goto(`https://platzi.com/${user}/`, { waitUntil: 'networkidle0' });

  //Click on see more to see all courses
  await page.click('[class="SeeMore"]');

  //Retrieve all courses
  const coursesFinished = await page.evaluate(() => Object.values(document.getElementsByClassName('Course is-notPrincipal'))
    .map((course) => {
      const courseName = course.children[0].children[1].children[0].innerText;
      const courseBadge = course.children[0].children[0].children[0].children[0].src;
      return { courseName, courseBadge };
    }).filter((courseInfo) => courseInfo.courseName.indexOf('%') === -1));

  //Retrieve user avatar
  const platziAvatar = await page.evaluate(() => document.getElementsByClassName('Layout--radius')[0].src);

  //Retrieve your finished courses count
  const coursesFinishedCount = coursesFinished.length;

  //See results
  let results = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    <title>Document</title>
    <style>
      body {
        font-family: 'Montserrat', sans-serif;
      }
      img {
        width: 40px;
      }
      .course {
        margin: 10px;
        display: flex;
      }
    </style>
  </head>
  <body>
  <h1>Hola ${user}, tienes ${coursesFinishedCount} cursos terminados:</h1>
  `;

  Object.entries(coursesFinished).forEach(([key, course]) => {

    results += `
    <div class="course">
    <figure>
      <img src="${course.courseBadge}" alt="">
    </figure>
    <h2>${course.courseName}</h2>
  </div>`;

  });

  results += '</body></html>';
  await page.goto(`file:${path.resolve('./results/index.html')}`);

  await page.setContent(results);

  await page.pdf({
    path: path.resolve('./results/results.pdf'),
    printBackground: true,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  });

  //Close browser
  await browser.close();

  process.stdout.write(`El PDF de tus cursos ha sido generado, revisalo aquí: ${path.resolve('./results/results.pdf')}`);

  //Posting in Slack
  postToSlack(user, platziAvatar, coursesFinishedCount);
}

module.exports = getDataFromPlatzi;
