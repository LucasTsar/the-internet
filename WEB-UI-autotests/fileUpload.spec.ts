import { test, expect } from '@playwright/test';
import path from 'path';

test('File Upload - Verify Successful Upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');

  // Define the path to the file to upload
  const filePath = path.join(__dirname, '..', 'WEB-UI-autotests/test-data', 'test.txt');

  // Click choose file and select file
  await page.locator('#file-upload').click();
  await page.locator('#file-upload').setInputFiles(filePath);
  
  // Click Upload the file
  await page.getByRole('button', { name: 'Upload' }).click();

  // Wait for the upload confirmation message to appear
  await page.waitForSelector('#content', { state: 'visible' });

  // Verify that the file was uploaded successfully
  await expect(page.locator('#content')).toHaveText(/File Uploaded!/);

  // Verify the uploaded file name
  await expect(page.locator('#content')).toHaveText(/test.txt/);
});

