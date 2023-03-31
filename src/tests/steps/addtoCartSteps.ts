import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60*1000*2);

Given("user searches for a new {string}", async function (book) {

await pageFixture.page.getByPlaceholder('Search books or authors').fill(book);
 await pageFixture.page.locator("mat-option[role='option']").click();
});

When("user adds the book to the cart", async function () {
  
 await pageFixture.page.getByRole('button', { name: 'Add to Cart' }).click();
 await pageFixture.page.waitForTimeout(2000);
});

Then("the cart badge should get updated", async function () {
  
  const cart_text = await pageFixture.page.locator('#mat-badge-content-0').textContent();
  await (expect(Number(cart_text)).toBeGreaterThan(0));
});
