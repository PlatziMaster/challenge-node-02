const puppeteer = require("puppeteer");
const cron = require("node-cron");

cron.schedule("*/1 * * * *", () => {
	getDataFromPuppeteer();
});

const getDataFromPuppeteer = async () => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto("https://es.cointelegraph.com/bitcoin-price-index");
		await page.screenshot({
			path: "src/images/image.png",
		});
		await page.pdf({
			path: "src/pdfs/website.pdf",
		});
		const platziCourseTitle = await page.evaluate(
			() => document.getElementsByClassName("price-value")[0].innerText
		);
		console.log(platziCourseTitle);
		console.log("Puppeteer End");
		await browser.close();
	} catch (error) {
		console.log(error);
	}
};

getDataFromPuppeteer();
