import { Given, When, Then } from "@cucumber/cucumber";
import {chromium, Page, Browser, expect} from "@playwright/test";

let browser: Browser;
let page: Page;
Given('user navigates to the application', async function () {
  browser = await chromium.launch({
      headless: false,

  });
  page = await browser.newPage();
  await page.goto("https://bookcart.azurewebsites.net/");
});

Given('user clicks on the login link', async function () {
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForSelector("input[placeholder='Search books or authors']",{
      state: "visible"
  });
  });

  Given('user enter the username as {string}', async function (username) {
   await page.fill("input[formcontrolname='username']",username);
  });

  Given('user enter the password as {string}', async function (password) {
   await page.fill("input[formcontrolname='password']",password);
  });

  When('user click on the login button', async function () {
    await page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();
  });

  Then('login should be success',{timeout:20000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    const username = await page.getByRole('button', { name: 'ortoni' }).textContent();
    await (expect(username).toContain('ortoni'));
    await browser.close();
  });

  Then('login should be fail',{timeout: 100000}, async function () {
   const errormessage = await page.locator('mat-error[role="alert"]');
   await (expect(errormessage).toBeVisible());
   await browser.close();
  });
