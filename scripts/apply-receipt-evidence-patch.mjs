import { readFile, writeFile } from 'node:fs/promises';

function replaceOnce(source, search, replacement, label) {
  if (!source.includes(search)) throw new Error(`Missing patch target: ${label}`);
  return source.replace(search, replacement);
}

async function patchGallery() {
  const path = 'src/components/portfolio/ReceiptVisualGallery.jsx';
  let source = await readFile(path, 'utf8');

  source = replaceOnce(
    source,
    'import InterfaceBehaviorLabReceiptVisual from "./receipt-visuals/InterfaceBehaviorLabReceiptVisual";\n',
    'import InterfaceBehaviorLabReceiptVisual from "./receipt-visuals/InterfaceBehaviorLabReceiptVisual";\nimport { getSimplifiedReceiptCopy } from "./receipt-visuals/SimplifiedCaseReceiptVisual";\n',
    'gallery simplified copy import'
  );

  source = replaceOnce(
    source,
    'function getCompactPrivacyLabel(label) {',
    `function getRendererLabel(renderer) {
  if (renderer === "behavior") return "INTERACTION LAB";
  if (renderer === "smooth") return "SMOOTH MD";
  if (renderer === "multi") return "RETENTION";
  if (renderer === "snip") return "SNIP";
  if (renderer === "meta") return "CAMPAIGN INTELLIGENCE";
  if (renderer === "mirror") return "MIRROR";
  return "RECEIPT";
}

function getCompactPrivacyLabel(label) {`,
    'gallery renderer label helper'
  );

  const referencePattern = /  const activeReceiptReference = activeComponentAsset\?\.definition\?\.receiptNumber[\s\S]*?      : "Receipt";\n  const activeCaption/;
  if (!referencePattern.test(source)) throw new Error('Missing patch target: active receipt reference');
  source = source.replace(
    referencePattern,
    `  const activeReceiptReference = activeComponentAsset?.definition?.receiptNumber
    ? \`Receipt \${activeComponentAsset.definition.receiptNumber}\`
    : visibleAssets.length > 1 && activeLabel
      ? activeLabel
      : "Receipt";
  const activeVisibleTitle = activeComponentAsset
    ? activeComponentAsset.renderer === "behavior"
      ? activeComponentAsset.definition.title
      : getSimplifiedReceiptCopy(activeComponentAsset.definition.receiptBodyType).title
    : receiptName;
  const activeContextLabel = activeComponentAsset?.definition?.receiptNumber
    ? \`\${activeComponentAsset.definition.receiptNumber} / \${getRendererLabel(activeComponentAsset.renderer)}\`
    : activeReceiptReference;
  const activeCaption`
  );

  source = replaceOnce(source, '      aria-label={`${receiptName} proof set viewer`}', '      aria-label={`${activeVisibleTitle} receipt viewer`}', 'dialog accessible title');

  const oldHeader = `        <header className="flex shrink-0 items-start justify-between gap-3 bg-[#fffaf1] px-3.5 py-3 sm:px-5 sm:py-3.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">
              <span className="tabular-nums">{activeReceiptReference}</span>
            </div>
            <div className="mt-1.5 truncate text-[13px] font-medium leading-5 text-[#11100d] sm:text-[14px]">
              {receiptName}
            </div>
            <div className="mt-0.5 truncate text-[9px] uppercase tracking-[0.13em] text-[#11100d]/40">
              {receiptFormat}
            </div>
          </div>`;
  const newHeader = `        <header className="flex shrink-0 items-start justify-between gap-3 bg-[#fffaf1] px-3.5 py-2.5 sm:px-5 sm:py-3">
          <div className="min-w-0 pr-1">
            <div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">
              <span className="tabular-nums">{activeContextLabel}</span>
            </div>
            <div data-testid="receipt-modal-title" className="mt-1 line-clamp-2 text-[15px] font-medium leading-5 text-[#11100d] sm:text-[16px]">
              {activeVisibleTitle}
            </div>
          </div>`;
  source = replaceOnce(source, oldHeader, newHeader, 'modal header');
  source = replaceOnce(source, '            aria-label="Close proof set viewer"', '            aria-label={`Close ${activeVisibleTitle}`}', 'close accessible label');

  await writeFile(path, source);
}

async function patchRecords() {
  const path = 'src/data/records.js';
  let source = await readFile(path, 'utf8');
  const mirrorIndex = source.indexOf("    slug: 'mirror'");
  const start = source.indexOf('    receipts: [', mirrorIndex);
  const marker = "\n    ]\n  },\n  {\n    id: '03'";
  const endMarker = source.indexOf(marker, start);
  if (mirrorIndex < 0 || start < 0 || endMarker < 0) throw new Error('Could not locate Mirror receipts');
  const end = endMarker + '\n    ]'.length;

  const replacement = `    receipts: [
      {
        id: 'check-in-experience', testId: 'mirror-check-in-experience', name: 'Check-In Experience', format: 'product flow', status: 'ready',
        claim: 'Proves a lightweight self-report becomes a readable result and one gentle next move.',
        proof: 'Mood, sleep, clarity, and context resolve into a named state, explanation, and low-friction suggestion.',
        contents: ['mood', 'sleep', 'clarity', 'context', 'Body Weather result', 'explanation', 'gentle next move'],
        visualAssets: [{ kind: 'component', componentKey: 'body-weather-state-system' }], artifacts: []
      },
      {
        id: 'body-weather-states', testId: 'mirror-body-weather-state-system', name: 'Body Weather States', format: 'product state model', status: 'ready',
        claim: 'Proves each named state connects a signal pattern to a different product response.',
        proof: 'Settled, Frayed, Drifting, Restoring, Compressed, and Clear each change the interface response.',
        contents: ['state', 'signal pattern', 'interface response', 'non-diagnostic language'],
        visualAssets: [{ kind: 'component', componentKey: 'storybook-component-environment' }], artifacts: []
      },
      {
        id: 'interpretation-trace', testId: 'mirror-interpretation-trace', name: 'Interpretation Trace', format: 'logic diagram', status: 'ready',
        claim: 'Proves Mirror makes confidence and reasoning visible before it suggests an action.',
        proof: 'One worked trace connects signals, state, confidence, explanation, and next move.',
        contents: ['signals', 'state', 'confidence', 'explanation', 'next move'],
        visualAssets: [{ kind: 'component', componentKey: 'signal-interpretation-map' }], artifacts: []
      },
      {
        id: 'debug-overlay-test-bench', testId: 'mirror-debug-overlay-test-bench', name: 'Edge Case Tests', format: 'QA and safety artifact', status: 'ready',
        claim: 'Proves conflicting, uncertain, first-use, and sensitive states use explicit guardrails.',
        proof: 'Risk scenarios verify mixed reads, uncertainty language, no invented history, and no clinical claims.',
        contents: ['conflicting signals', 'low confidence', 'no history', 'sensitive language', 'guardrails'],
        visualAssets: [{ kind: 'component', componentKey: 'debug-overlay-test-bench' }], artifacts: []
      }
    ]`;

  source = source.slice(0, start) + replacement + source.slice(end);
  await writeFile(path, source);
}

async function patchTests() {
  const path = 'tests/receipt-visual-qa.spec.js';
  let source = await readFile(path, 'utf8');

  source = replaceOnce(
    source,
    'const cardTargets = [...metaCardTargets, ...snipCardTargets];',
    `const evidenceCardTargets = [
  { caseSlug: 'mirror', receiptTestId: 'mirror-body-weather-state-system', filename: 'mirror-body-weather-card.png' },
  { caseSlug: 'mirror', receiptTestId: 'mirror-interpretation-trace', filename: 'mirror-interpretation-card.png' },
  { caseSlug: 'smooth-md-growth-os', receiptTestId: 'smooth-md-brand-framework', filename: 'smooth-growth-system-card.png' },
  { caseSlug: 'smooth-md-growth-os', receiptTestId: 'smooth-md-lifecycle-map', filename: 'smooth-patient-routing-card.png' }
];

const cardTargets = [...evidenceCardTargets, ...metaCardTargets, ...snipCardTargets];`,
    'evidence card targets'
  );

  const oldMirrorTarget = `  {
    caseSlug: 'mirror',
    receiptTestId: 'mirror-storybook-component-environment',
    filename: 'mirror-storybook-modal.png'
  },`;
  const newMirrorTargets = `  {
    caseSlug: 'mirror',
    receiptTestId: 'mirror-body-weather-state-system',
    filename: 'mirror-body-weather-states-modal.png'
  },
  {
    caseSlug: 'mirror',
    receiptTestId: 'mirror-interpretation-trace',
    filename: 'mirror-interpretation-trace-modal.png'
  },
  {
    caseSlug: 'mirror',
    receiptTestId: 'mirror-debug-overlay-test-bench',
    filename: 'mirror-edge-cases-modal.png'
  },`;
  source = replaceOnce(source, oldMirrorTarget, newMirrorTargets, 'Mirror modal targets');

  const modalEnd = source.indexOf('\n];', source.indexOf('const modalTargets = ['));
  if (modalEnd < 0) throw new Error('Could not locate modal target end');
  const priorityBlock = `

const priorityMobileTargets = [
  { caseSlug: 'mirror', receiptTestId: 'mirror-body-weather-state-system', title: 'Body Weather States', filename: 'mobile-mirror-body-weather.png' },
  { caseSlug: 'mirror', receiptTestId: 'mirror-interpretation-trace', title: 'Interpretation Trace', filename: 'mobile-mirror-interpretation.png' },
  { caseSlug: 'mirror', receiptTestId: 'mirror-debug-overlay-test-bench', title: 'Edge Case Tests', filename: 'mobile-mirror-edge-cases.png' },
  { caseSlug: 'smooth-md-growth-os', receiptTestId: 'smooth-md-brand-framework', title: 'Clinic Growth System', filename: 'mobile-smooth-growth-system.png' },
  { caseSlug: 'smooth-md-growth-os', receiptTestId: 'smooth-md-lifecycle-map', title: 'Patient Routing', filename: 'mobile-smooth-patient-routing.png' },
  { caseSlug: 'snip-provider-pipeline', receiptTestId: 'snip-image-sourcing', title: 'Image Source Check', filename: 'mobile-snip-image-source.png' },
  { caseSlug: 'snip-provider-pipeline', receiptTestId: 'snip-opencv-face-validation', title: 'Face Validation', filename: 'mobile-snip-face-validation.png' }
];`;
  source = source.slice(0, modalEnd + 3) + priorityBlock + source.slice(modalEnd + 3);

  const describeEnd = source.lastIndexOf('\n});');
  if (describeEnd < 0) throw new Error('Could not locate test describe end');
  const extraTests = `

  for (const target of priorityMobileTargets) {
    test(\`captures \${target.receiptTestId} evidence at mobile width\`, async ({ page }) => {
      await preparePage(page, { width: 390, height: 900 });
      await openCase(page, target.caseSlug);
      const modal = await openReceiptModal(page, target.receiptTestId);
      await expect(page.getByTestId('receipt-modal-title')).toHaveText(target.title);
      await expect(page.getByTestId('receipt-modal-close')).toBeVisible();
      const noHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
      expect(noHorizontalOverflow).toBe(true);
      await saveModalScreenshot(modal, target.filename);
    });
  }

  test('uses the active visible title and preserves Escape and backdrop close behavior', async ({ page }) => {
    await preparePage(page, { width: 390, height: 900 });
    await openCase(page, 'mirror');
    await openReceiptModal(page, 'mirror-body-weather-state-system');
    await expect(page.getByTestId('receipt-modal-title')).toHaveText('Body Weather States');
    await page.keyboard.press('Escape');
    await expect(visibleTestId(page, 'receipt-modal')).toHaveCount(0);

    await openReceiptModal(page, 'mirror-body-weather-state-system');
    await page.getByRole('dialog').click({ position: { x: 4, y: 4 } });
    await expect(visibleTestId(page, 'receipt-modal')).toHaveCount(0);
  });

  test('keeps proof reachable in a short mobile viewport', async ({ page }) => {
    await preparePage(page, { width: 390, height: 650 });
    await openCase(page, 'smooth-md-growth-os');
    await openReceiptModal(page, 'smooth-md-lifecycle-map');
    const proof = page.getByTestId('receipt-proof');
    await proof.scrollIntoViewIfNeeded();
    await expect(proof).toBeVisible();
    await expect(page.getByTestId('receipt-modal-close')).toBeVisible();
  });`;
  source = source.slice(0, describeEnd) + extraTests + source.slice(describeEnd);

  await writeFile(path, source);
}

await patchGallery();
await patchRecords();
await patchTests();
