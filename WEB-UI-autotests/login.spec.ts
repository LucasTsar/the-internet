import { test, expect } from '@playwright/test';

test('SuccessfulLogin', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.locator('#flash-messages')).toHaveText(/You logged into a secure area/);
  await expect(page).toHaveURL(/secure/)
});

test('FailedLoginInvalidPassword', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').fill('WrongPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.locator('#flash-messages')).toHaveText(/Your password is invalid!/);
  await expect(page).toHaveURL(/login/)
});

test('FailedLoginInvalidUsername', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('WrongUsername');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.locator('#flash-messages')).toHaveText(/Your username is invalid!/);
  await expect(page).toHaveURL(/login/)
});