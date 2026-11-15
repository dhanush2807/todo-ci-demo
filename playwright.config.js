import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  retries: process.env.CI ? 1 : 0,          // one retry in CI, to surface flaky tests
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',             // step-by-step replay when a test fails
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm start',                   // Playwright starts the app for you
    url: 'http://localhost:3000/api/health',
    reuseExistingServer: !process.env.CI,
  },
});
