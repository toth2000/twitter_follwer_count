const puppeteer = require("puppeteer");

const getFollwer = async (username) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Intercept requests to disable redirects
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    const allowList = ["document", "script", "xhr", "fetch"];
    if (!allowList.includes(request.resourceType())) {
      return request.abort();
    }
    request.continue();
  });

  page.on("response", (response) => {
    if (
      [301, 302, 303, 307, 308].includes(response.status()) &&
      response.headers()["location"]
    ) {
      console.log(`Redirected to: ${response.headers()["location"]}`);
    }
  });

  // Navigate to Twitter
  await page.goto("https://twitter.com/");

  // Click on "Log in" button
  //   await page.click('a[data-testid="loginButton"]');

  await page.evaluate(() => {
    // Find the span containing "Phone, email, or username" and click it

    const signInButton = [...document.querySelectorAll("span")].find((span) =>
      span.textContent.includes("Sign in")
    );

    signInButton.click();

    // const targetSpan = [...document.querySelectorAll("span")].find((span) =>
    //   span.textContent.includes("Phone, email, or username")
    // );

    // targetSpan.click();

    const inputField = document.querySelector('input[name="text"]');

    // Check if the input field exists
    inputField.value = "Influenxin_dev";

    const nextButton = [...document.querySelectorAll("span")].find((span) =>
      span.textContent.includes("Next")
    );

    nextButton.click();

    const passwordField = document.querySelector('input[name="password"]');

    passwordField.value = "*_7PQ@V%!JwyV?S";

    const loginButton = [...document.querySelectorAll("span")].find((span) =>
      span.textContent.includes("Next")
    );

    loginButton.click();
  });

  // Fill out the login form and submit
  //   await page.type('input[autocomplete="username"]', "Influenxin_dev");
  //   await page.click('span:contains("Next")');
  //   await page.type('input[placeholder="Password"]', "*_7PQ@V%!JwyV?S");
  //   await page.click('span:contains("Log in")');

  // Wait for login success or failure (you may need to adjust this)
  await page.waitForNavigation();

  //   // Navigate to a user's profile (replace with the desired username)
  //   await page.goto(`https://twitter.com/${username}`);

  //   // Extract follower count
  //   const followerCount = await page.$eval(
  //     `a[href="/${username}/verified_followers"] > span > span`,
  //     (element) => {
  //       return parseInt(element.textContent.trim(), 10) || 0;
  //     }
  //   );
  //   console.log(`Follower Count: ${followerCount}`);

  //   // Close the browser
  //   await browser.close();
};

getFollwer("tothbh");
