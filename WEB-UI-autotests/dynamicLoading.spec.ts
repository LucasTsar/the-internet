import { test, expect } from '@playwright/test';

test('Verify dynamically loaded content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.click('button'); 
    await page.waitForSelector('#loading', { state: 'visible' });
    await page.waitForSelector('#loading', { state: 'hidden' });
    await page.waitForSelector('#content', { state: 'visible' });
    await expect(page.locator('#content')).toHaveText(/Hello World!/);
});