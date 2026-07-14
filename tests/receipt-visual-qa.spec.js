// @ts-check
import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const screenshotDir = 'tests/screenshots';
const modalScreenshotDir = `${screenshotDir}/modals`;
const cardScreenshotDir = `${screenshotDir}/cards`;

const priorityCards = [
  ['mirror', 'mirror-storybook-component-environment', 'mirror-body-weather-card.png'],
  ['mirror', 'mirror-body-weather-state-system', 'mirror-interpretation-card.png'],
  ['smooth-md-growth-os', 'smooth-md-brand-framework', 'smooth-growth-system-card.png'],
  ['smooth-md-growth-os', 'smooth-md-lifecycle-map', 'smooth-patient-routing-card.png'],
  ['snip-provider-pipeline', 'snip-image-sourcing', 'snip-image-sourcing-card.png'],
  ['snip-provider-pipeline', 'snip-opencv-face-validation', 'snip-face-validation-card.png']
];

const desktopModals = [
  ['smooth-md-growth-os', 'smooth-md-brand-framework', 'smooth-brand-framework-modal.png'],
  ['smooth-md-growth-os', 'smooth-md-lifecycle-map', 'smooth-patient-lifecycle-modal.png'],
  ['smooth-md-growth-os', 'smooth-md-instagram-identity-rebuild', 'smooth-instagram-rebuild-modal.png'],
  ['smooth-md-growth-os', 'smooth-md-campaign-toolkit', 'smooth-campaign-toolkit-modal.png'],
  ['mirror', 'mirror-check-in-experience', 'mirror-check-in-experience-modal.png'],
  ['mirror', 'mirror-storybook-component-environment', 'mirror-body-weather-states-modal.png'],
  ['mirror', 'mirror-body-weather-state-system', 'mirror-interpretation-trace-modal.png'],
  ['mirror', 'mirror-debug-overlay-test-bench', 'mirror-edge-cases-modal.png'],
  ['meta-airtable-dashboard', 'meta-leads-master', 'meta-leads-master-modal.png'],
  ['meta-airtable-dashboard', 'meta-campaign-performance', 'meta-campaign-performance-modal.png'],
  ['meta-airtable-dashboard', 'meta-revenue-attribution', 'meta-revenue-attribution-modal.png'],
  ['meta-airtable-dashboard', 'meta-decision-console', 'meta-decision-console-modal.png'],
  ['snip-provider-pipeline', 'snip-nppes-provider-pull', 'snip-nppes-provider-pull-modal.png'],
  ['snip-provider-pipeline', 'snip-image-sourcing', 'snip-image-sourcing-modal.png'],
  ['snip-provider-pipeline', 'snip-opencv-face-validation', 'snip-face-validation-modal.png'],
  ['snip-provider-pipeline', 'snip-structured-asset-folders', 'snip-asset-folders-modal.png'],
  ['multi-brand-retention', 'multi-brand-lifecycle-flow-model', 'multi-brand-lifecycle-flow-modal.png'],
  ['multi-brand-retention', 'multi-brand-mailchimp-routing-map', 'multi-brand-routing-map-modal.png'],
  ['multi-brand-retention', 'multi-brand-follow-up-timing-protocol', 'multi-brand-follow-up-timing-modal.png'],
  ['multi-brand-retention', 'multi-brand-email-production-system', 'multi-brand-email-production-modal.png']
];

const mobileEvidence = [
  ['mirror', 'mirror-storybook-component-environment', 'Body Weather States', 'mobile-mirror-body-weather.png'],
  ['mirror', 'mirror-body-weather-state-system', 'Interpretation Trace', 'mobile-mirror-interpretation.png'],
  ['mirror', 'mirror-debug-overlay-test-bench', 'Edge Case Tests', 'mobile-mirror-edge-cases.png'],
  ['smooth-md-growth-os', 'smooth-md-brand-framework', 'Clinic Growth System', 'mobile-smooth-growth-system.png'],
  ['smooth-md-growth-os', 'smooth-md-lifecycle-map', 'Patient Routing', 'mobile-smooth-patient-routing.png'],
  ['snip-provider-pipeline', 'snip-image-sourcing', 'Image Source Check', 'mobile-snip-image-source.png'],
  ['snip-provider-pipeline', 'snip-opencv-face-validation', 'Face Validation', 'mobile-snip-face-validation.png']
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
  if (await caseCard.count() === 0) {
    await page.getByRole('button', { name: /filter cases by all/i }).click();
    caseCard = visibleTestId(page, `case-record-${caseSlug}`);
  }
  await expect(caseCard).toHaveCount(1);
  await caseCard.click();
}

async function openReceiptCard(page, receiptTestId) {
  const selector = visibleTestId(page, `receipt-selector-${receiptTestId}`);
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

  test('captures priority compact cards', async ({ page }) => {
    test.setTimeout(180000);
    await preparePage(page, { width: 1440, height: 1200 });
    for (const [caseSlug, receiptTestId, filename] of priorityCards) {
      await openCase(page, caseSlug);
      const card = await openReceiptCard(page, receiptTestId);
      await saveScreenshot(card, cardScreenshotDir, filename);
    }
  });

  test('captures the complete desktop modal set', async ({ page }) => {
    test.setTimeout(360000);
    await preparePage(page, { width: 1440, height: 1200 });
    for (const [caseSlug, receiptTestId, filename] of desktopModals) {
      await openCase(page, caseSlug);
      const modal = await openReceiptModal(page, receiptTestId);
      await saveScreenshot(modal, modalScreenshotDir, filename);
      await closeReceiptModal(page);
    }
  });

  test('validates priority evidence at 390px', async ({ page }) => {
    test.setTimeout(240000);
    await preparePage(page, { width: 390, height: 900 });
    for (const [caseSlug, receiptTestId, title, filename] of mobileEvidence) {
      await openCase(page, caseSlug);
      const modal = await openReceiptModal(page, receiptTestId);
      await expect(page.getByTestId('receipt-modal-title')).toHaveText(title);
      await expect(page.getByTestId('receipt-modal-close')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      await saveScreenshot(modal, modalScreenshotDir, filename);
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
