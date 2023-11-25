const puppeteer = require("puppeteer");
const htmlContent = require("./htmlContent");

const getUserFollower = async (username) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  //   await page.goto(`https://twitter.com/${username}`, {
  //     waitUntil: "domcontentloaded",
  //   });

  await page.setContent(htmlContent);

  const followerCount = await page.$eval(
    'a[href="/tothbh/verified_followers"] > span > span',
    (element) => {
      return parseInt(element.textContent.trim(), 10) || 0;
    }
  );

  console.log("Follower Count", followerCount);
};

getUserFollower("tothbh");
