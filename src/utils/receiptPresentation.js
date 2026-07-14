const PRESENTATION_BY_COMPONENT_KEY = {
  'body-weather-state-system': {
    name: 'Check-In Experience',
    format: 'product flow',
    order: 1
  },
  'storybook-component-environment': {
    name: 'Body Weather States',
    format: 'product state model',
    order: 2
  },
  'signal-interpretation-map': {
    name: 'Interpretation Trace',
    format: 'logic diagram',
    order: 3
  },
  'debug-overlay-test-bench': {
    name: 'Edge Case Tests',
    format: 'QA and safety artifact',
    order: 4
  }
};

function getComponentKey(receipt) {
  return (receipt?.visualAssets ?? []).find((asset) => asset?.kind === 'component')?.componentKey ?? null;
}

export function getReceiptPresentation(receipt) {
  const override = PRESENTATION_BY_COMPONENT_KEY[getComponentKey(receipt)];
  return {
    name: override?.name ?? receipt?.name ?? 'Receipt',
    format: override?.format ?? receipt?.format ?? 'visual proof',
    order: override?.order ?? Number.POSITIVE_INFINITY
  };
}

export function getPresentedReceipts(receipts = []) {
  return receipts
    .map((receipt, index) => ({ receipt, index, presentation: getReceiptPresentation(receipt) }))
    .sort((a, b) => a.presentation.order - b.presentation.order || a.index - b.index)
    .map(({ receipt }) => receipt);
}
