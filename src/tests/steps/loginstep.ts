import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60*1000*2);

Given('user navigates to the application', async function () {
  await pageFixture.page.goto(process.env.BASEURL);
});

Given('user clicks on the login link', async function () {
    await pageFixture.page.getByRole('button', { name: 'Login' }).click();
    await pageFixture.page.waitForSelector("input[placeholder='Search books or authors']",{
      state: "visible"
  });
  });

  Given('user enter the username as {string}', async function (username) {
   await pageFixture.page.fill("input[formcontrolname='username']",username);
  });

  Given('user enter the password as {string}', async function (password) {
   await pageFixture.page.fill("input[formcontrolname='password']",password);
  });

  When('user click on the login button', async function () {
    await pageFixture.page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();
    await pageFixture.page.waitForLoadState();
    

  });

  Then('login should be success',{timeout:20000}, async function () {
  
    const username = await pageFixture.page.getByRole('button', { name: 'ortoni' }).textContent();
    await (expect(username).toContain('ortoni'));
    
  });

  Then('login should be fail',{timeout: 100000}, async function () {
   const errormessage = await pageFixture.page.locator('mat-error[role="alert"]');
   await (expect(errormessage).toBeVisible());
   
  });
