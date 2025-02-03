import { test, expect } from '@playwright/test';

test('SuccesfullLogin', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.locator('#flash-messages')).toHaveText(/You logged into a secure area/);
});