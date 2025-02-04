import { test, expect } from '@playwright/test';
import path from 'path';

test('File Upload - Verify Successful Upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  const filePath = path.join(__dirname, '..', 'WEB-UI-autotests/test-data', 'test.txt');
  await page.locator('#file-upload').click();
  await page.locator('#file-upload').setInputFiles(filePath);
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.waitForSelector('#content', { state: 'visible' });
  await expect(page.locator('#content')).toHaveText(/File Uploaded!/);
  await expect(page.locator('#content')).toHaveText(/test.txt/);
});

