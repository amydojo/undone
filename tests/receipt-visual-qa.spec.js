// @ts-check
import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const screenshotDir = 'tests/screenshots';
const modalScreenshotDir = `${screenshotDir}/modals`;
const cardScreenshotDir = `${screenshotDir}/cards`;

const metaCardTargets = [
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-leads-master',
    filename: 'meta-leads-master-card.png'
  },
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-campaign-performance',
    filename: 'meta-campaign-performance-card.png'
  },
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-revenue-attribution',
    filename: 'meta-revenue-attribution-card.png'
  },
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-decision-console',
    filename: 'meta-decision-console-card.png'
  }
];

const modalTargets = [
  {
    caseSlug: 'mirror',
    receiptTestId: 'mirror-signal-interpretation-map',
    filename: 'mirror-signal-interpretation-modal.png'
  },
  {
    caseSlug: 'mirror',
    receiptTestId: 'mirror-storybook-component-environment',
    filename: 'mirror-storybook-modal.png'
  },
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-leads-master',
    filename: 'meta-leads-master-modal.png'
  },
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-campaign-performance',
    filename: 'meta-campaign-performance-modal.png'
  },
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-revenue-attribution',
    filename: 'meta-revenue-attribution-modal.png'
  },
  {
    caseSlug: 'meta-airtable-dashboard',
    receiptTestId: 'meta-decision-console',
    filename: 'meta-decision-console-modal.png'
  },
  {
    caseSlug: 'snip-provider-pipeline',
    receiptTestId: 'snip-nppes-provider-pull',
    filename: 'snip-nppes-provider-pull-modal.png'
  },
  {
    caseSlug: 'snip-provider-pipeline',
    receiptTestId: 'snip-structured-asset-folders',
    filename: 'snip-asset-folders-modal.png'
  }
];

async function preparePage(page, viewport) {
  await page.setViewportSize(viewport);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
}

function visibleTestId(page, testId) {
  return page.locator(`[data-testid="${testId}"]:visible`);
}

async function expectSingleVisibleTestId(page, testId) {
  const locator = visibleTestId(page, testId);
  await expect(locator, `Expected one visible element with data-testid="${testId}"`).toHaveCount(1);
  await expect(locator, `Expected data-testid="${testId}" to be visible`).toBeVisible();
  return locator;
}

async function saveFullPageScreenshot(page, name) {
  await mkdir(screenshotDir, { recursive: true });
  await page.screenshot({
    path: `${screenshotDir}/${name}`,
    fullPage: true
  });
}

async function openCase(page, caseSlug) {
  const caseCard = await expectSingleVisibleTestId(page, `case-record-${caseSlug}`);
  await caseCard.click();
}

async function openReceiptCard(page, receiptTestId) {
  const receiptSelector = await expectSingleVisibleTestId(page, `receipt-selector-${receiptTestId}`);
  await receiptSelector.click();

  return expectSingleVisibleTestId(page, `receipt-card-${receiptTestId}`);
}

async function openReceiptModal(page, receiptTestId) {
  const receiptCard = await openReceiptCard(page, receiptTestId);
  await receiptCard.click();

  return expectSingleVisibleTestId(page, 'receipt-modal');
}

async function saveCardScreenshot(card, name) {
  await mkdir(cardScreenshotDir, { recursive: true });
  await card.screenshot({
    path: `${cardScreenshotDir}/${name}`
  });
}

async function saveModalScreenshot(modal, name) {
  await mkdir(modalScreenshotDir, { recursive: true });
  await modal.screenshot({
    path: `${modalScreenshotDir}/${name}`
  });
}

test.describe('receipt visual QA screenshots', () => {
  test('captures receipt layouts at desktop, tablet, and mobile widths', async ({ page }) => {
    await preparePage(page, { width: 1440, height: 1200 });
    await saveFullPageScreenshot(page, 'receipts-desktop.png');

    await preparePage(page, { width: 768, height: 1100 });
    await saveFullPageScreenshot(page, 'receipts-tablet.png');

    await preparePage(page, { width: 390, height: 900 });
    await saveFullPageScreenshot(page, 'receipts-mobile.png');
  });

  for (const target of metaCardTargets) {
    test(`captures ${target.receiptTestId} compact card`, async ({ page }) => {
      await preparePage(page, { width: 1440, height: 1200 });
      await openCase(page, target.caseSlug);
      const card = await openReceiptCard(page, target.receiptTestId);
      await saveCardScreenshot(card, target.filename);
    });
  }

  for (const target of modalTargets) {
    test(`captures ${target.receiptTestId} modal`, async ({ page }) => {
      await preparePage(page, { width: 1440, height: 1200 });
      await openCase(page, target.caseSlug);
      const modal = await openReceiptModal(page, target.receiptTestId);
      await saveModalScreenshot(modal, target.filename);
    });
  }
});
