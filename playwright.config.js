// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:5173/undone/',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium'
      }
    }
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173/undone/',
    reuseExistingServer: true,
    timeout: 120000
  }
});
