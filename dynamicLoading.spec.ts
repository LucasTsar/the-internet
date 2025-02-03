import { test, expect } from '@playwright/test';

test('Verify dynamically loaded content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.click('button'); // Click the start button

    // wait for loading started and completed
    await page.waitForSelector('#loading', { state: 'visible' });
    await page.waitForSelector('#loading', { state: 'hidden' });

    // Wait for the element to be visible
    await page.waitForSelector('#content', { state: 'visible' });

    // Verify the final message
    await expect(page.locator('#content')).toHaveText(/Hello World!/);
});