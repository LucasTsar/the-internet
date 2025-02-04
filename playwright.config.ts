import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    fullyParallel: true,
    reporter: 'html',
  });