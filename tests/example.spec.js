// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Form Submit Demo', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo');


  await page.locator("#title").fill('Praveen');
  await page.locator("#description").fill('Description to be filled');
  await page.getByRole("button",{name :"submit"}).click();
  await page.waitForTimeout(1000);

});

test.only('Bootstrap Dual List Demo', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-dual-list-box-demo');
  const input = 'Danville';
  await page.locator(`[type = "text"]`).nth(3).pressSequentially(input, {delay:150});
  await page.waitForTimeout(1000);
  await page.locator(".dual-list li").nth(2).click();
  await page.locator(".list-arrows .btn-default").nth(2).click();
  await expect (page.locator(".list-right .list-group-item")).toContainText(input);
  await page.waitForTimeout(1000);

});
