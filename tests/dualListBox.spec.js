const { test, expect } = require('@playwright/test');

test.describe('Bootstrap Dual List Box Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the LambdaTest Selenium Playground
    await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-dual-list-box-demo', {
      waitUntil: 'domcontentloaded'
    });
    // Wait for the dual list container to be visible
    await page.locator('ul.sp_list_group').first().waitFor({ state: 'visible', timeout: 5000 });
  });

  test('Should move Danville from left list to right list', async ({ page }) => {
    // Step 1: Fill the search box on the left side with "Danville"
    const leftSearchInput = page.locator('input[name="SearchDualList"]').first();
    await leftSearchInput.fill('Danville');
    
    // Wait for the filtered list to appear
    await page.waitForTimeout(300);
    
    // Step 1: Click on the Danville item in the left list
    const danvilleItem = page.locator('ul.sp_list_group').first().locator('li:has-text("Danville")');
    await danvilleItem.click();
    
    // Step 2: Click the right arrow button to move the selected item to the right list
    const moveRightButton = page.locator('button.move-right');
    await moveRightButton.click();
    
    // Wait for the item to be moved
    await page.waitForTimeout(500);
    
    // Step 3: Verify that Danville is now present in the right list
    const rightListItems = page.locator('ul.sp_list_group').last();
    const danvilleInRightList = rightListItems.locator('li:has-text("Danville")');
    
    await expect(danvilleInRightList).toBeVisible();
  });

  test('Should verify Danville exists in right list after successful move', async ({ page }) => {
    // Get the initial count of items in the right list
    const rightListBefore = page.locator('ul.sp_list_group').last().locator('li.list-group-item');
    const initialCountRight = await rightListBefore.count();
    
    // Perform the move operation
    const leftSearchInput = page.locator('input[name="SearchDualList"]').first();
    await leftSearchInput.fill('Danville');
    await page.waitForTimeout(300);
    
    const danvilleItem = page.locator('ul.sp_list_group').first().locator('li:has-text("Danville")');
    await danvilleItem.click();
    
    const moveRightButton = page.locator('button.move-right');
    await moveRightButton.click();
    await page.waitForTimeout(300);
    
    // Verify the count increased by 1
    const rightListAfter = page.locator('ul.sp_list_group').last().locator('li.list-group-item');
    const finalCountRight = await rightListAfter.count();
    
    expect(finalCountRight).toBe(initialCountRight + 1);
    
    // Verify Danville is in the list with exact text match
    const allRightItems = await rightListAfter.allTextContents();
    expect(allRightItems).toContain('Danville');
  });
});
