// @ts-check
import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const screenshotDir = 'tests/screenshots';
const modalScreenshotDir = `${screenshotDir}/modals`;
const cardScreenshotDir = `${screenshotDir}/cards`;

const priorityEvidence = [
  ['mirror', 'mirror-storybook-component-environment', 'Body Weather States', 'mirror-body-weather'],
  ['mirror', 'mirror-body-weather-state-system', 'Interpretation Trace', 'mirror-interpretation'],
  ['mirror', 'mirror-debug-overlay-test-bench', 'Edge Case Tests', 'mirror-edge-cases'],
  ['smooth-md-growth-os', 'smooth-md-brand-framework', 'Clinic Growth System', 'smooth-growth-system'],
  ['smooth-md-growth-os', 'smooth-md-lifecycle-map', 'Patient Routing', 'smooth-patient-routing'],
  ['snip-provider-pipeline', 'snip-image-sourcing', 'Image Source Check', 'snip-image-source'],
  ['snip-provider-pipeline', 'snip-opencv-face-validation', 'Face Validation', 'snip-face-validation']
];

async function preparePage(page, viewport) {
  await page.setViewportSize(viewport);
  await page.goto('./');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
}

function visibleTestId(page, testId) {
  return page.locator(`[data-testid="${testId}"]:visible`);
}

async function openCase(page, caseSlug) {
  let caseCard = visibleTestId(page, `case-record-${caseSlug}`);
  if (await caseCard.count() > 0) {
    await caseCard.click();
    return;
  }

  const mobileSelector = page.getByRole('button', { name: 'Open record selector' });
  if (await mobileSelector.isVisible().catch(() => false)) {
    await mobileSelector.click();
    caseCard = visibleTestId(page, `case-record-${caseSlug}`);
    if (await caseCard.count() === 0) {
      await page.getByRole('button', { name: 'Filter by All' }).click();
      caseCard = visibleTestId(page, `case-record-${caseSlug}`);
    }
    await expect(caseCard).toHaveCount(1);
    await caseCard.click();
    return;
  }

  await page.getByRole('button', { name: /filter cases by all/i }).click();
  caseCard = visibleTestId(page, `case-record-${caseSlug}`);
  await expect(caseCard).toHaveCount(1);
  await caseCard.click();
}

async function openReceiptCard(page, receiptTestId) {
  let selector = visibleTestId(page, `receipt-selector-${receiptTestId}`);
  if (await selector.count() === 0) {
    const receiptsTab = page.getByRole('button', { name: 'Show Receipts tab' });
    if (await receiptsTab.isVisible().catch(() => false)) await receiptsTab.click();
    selector = visibleTestId(page, `receipt-selector-${receiptTestId}`);
  }
  await expect(selector).toHaveCount(1);
  await selector.click();
  const card = visibleTestId(page, `receipt-card-${receiptTestId}`);
  await expect(card).toHaveCount(1);
  return card;
}

async function openReceiptModal(page, receiptTestId) {
  const card = await openReceiptCard(page, receiptTestId);
  await card.click();
  const modal = visibleTestId(page, 'receipt-modal');
  await expect(modal).toHaveCount(1);
  return modal;
}

async function closeReceiptModal(page) {
  await page.getByTestId('receipt-modal-close').click();
  await expect(visibleTestId(page, 'receipt-modal')).toHaveCount(0);
}

async function saveScreenshot(locator, directory, name) {
  await mkdir(directory, { recursive: true });
  await locator.screenshot({ path: `${directory}/${name}` });
}

test.describe('receipt evidence QA', () => {
  test('captures portfolio layout at desktop, tablet, and mobile widths', async ({ page }) => {
    test.setTimeout(120000);
    await mkdir(screenshotDir, { recursive: true });
    for (const [width, height, name] of [
      [1440, 1200, 'receipts-desktop.png'],
      [768, 1100, 'receipts-tablet.png'],
      [390, 900, 'receipts-mobile.png']
    ]) {
      await preparePage(page, { width, height });
      await page.screenshot({ path: `${screenshotDir}/${name}`, fullPage: true });
    }
  });

  test('captures all seven changed receipts at desktop', async ({ page }) => {
    test.setTimeout(180000);
    await preparePage(page, { width: 1440, height: 1200 });
    for (const [caseSlug, receiptTestId, title, filename] of priorityEvidence) {
      await openCase(page, caseSlug);
      const card = await openReceiptCard(page, receiptTestId);
      await saveScreenshot(card, cardScreenshotDir, `${filename}-card.png`);
      await card.click();
      const modal = visibleTestId(page, 'receipt-modal');
      await expect(modal).toHaveCount(1);
      await expect(page.getByTestId('receipt-modal-title')).toHaveText(title);
      await saveScreenshot(modal, modalScreenshotDir, `${filename}-desktop.png`);
      await closeReceiptModal(page);
    }
  });

  test('validates all seven changed receipts at 390px', async ({ page }) => {
    test.setTimeout(180000);
    await preparePage(page, { width: 390, height: 900 });
    for (const [caseSlug, receiptTestId, title, filename] of priorityEvidence) {
      await openCase(page, caseSlug);
      const modal = await openReceiptModal(page, receiptTestId);
      await expect(page.getByTestId('receipt-modal-title')).toHaveText(title);
      await expect(page.getByTestId('receipt-modal-close')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      await saveScreenshot(modal, modalScreenshotDir, `${filename}-mobile.png`);
      await closeReceiptModal(page);
    }
  });

  test('preserves Escape, backdrop close, and short-viewport proof reachability', async ({ page }) => {
    test.setTimeout(120000);
    await preparePage(page, { width: 390, height: 650 });
    await openCase(page, 'mirror');
    await openReceiptModal(page, 'mirror-storybook-component-environment');
    await expect(page.getByTestId('receipt-modal-title')).toHaveText('Body Weather States');
    await page.keyboard.press('Escape');
    await expect(visibleTestId(page, 'receipt-modal')).toHaveCount(0);

    await openReceiptModal(page, 'mirror-storybook-component-environment');
    await page.getByRole('dialog').click({ position: { x: 4, y: 4 } });
    await expect(visibleTestId(page, 'receipt-modal')).toHaveCount(0);

    await openCase(page, 'smooth-md-growth-os');
    await openReceiptModal(page, 'smooth-md-lifecycle-map');
    const proof = page.getByTestId('receipt-proof');
    await proof.scrollIntoViewIfNeeded();
    await expect(proof).toBeVisible();
    await expect(page.getByTestId('receipt-modal-close')).toBeVisible();
  });
});
