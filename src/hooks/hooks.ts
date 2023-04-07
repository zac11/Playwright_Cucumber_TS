import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { pageFixture } from "./pageFixture";
import { getEnv } from "../helper/env/env";
import * as fs from 'fs'

let page: Page;
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async () => {
  context = await browser.newContext({
    recordVideo: {
      dir: "./test-results/videos"
    }
  });
  page = await context.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  // take screenshot on failure of a step
  await console.log(result?.status);
  let videoPath : string;
  let img : Buffer
  if (result?.status == Status.FAILED) {
    img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });

    videoPath = await pageFixture.page.video().path();
    
  }

  await pageFixture.page.close();
  await context.close();

  if(result?.status == Status.FAILED){
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), 'video/webm');
  }
});

AfterAll(async function () {
  await browser.close();
});
