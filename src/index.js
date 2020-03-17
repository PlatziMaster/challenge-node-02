const puppeteer = require('puppeteer');

let urls = [
  'https://platzi.com/@gndx/', 
  'https://platzi.com/@cosmosoftroot/',
  'https://platzi.com/@gollum23/',
  'https://platzi.com/@juandc/'

];

const platziMasters = [];

const validateProfile = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const validate = await page.evaluate(() =>
      document.getElementsByTagName('title')[0].innerText.trim()
    );

    await browser.close();
    return validate;
  } catch (err) {
    console.log(err);
  }
};

const getMaster = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(() => {
      return {
        name: document.getElementsByClassName('ProfileHeader-name')[0].innerText,
        score: document.getElementsByClassName('ProfileScore-number')[0].innerText,
      };
    });
    await browser.close();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const initializeMasters = async (urls) => {
  

  await urls.forEach(async (url) => {
    const isPrivate = await validateProfile(url);
    if (isPrivate !== 'Cuenta Privada') {
      const platziMaster = await getMaster(url);
      platziMasters.push(platziMaster);
    }
  });

  
};

initializeMasters(urls);
setTimeout(()=>{
  console.log(platziMasters)
},25000);