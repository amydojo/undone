const definitions = {
  'interface-behavior-action-lifecycle': { receiptNumber: '01', title: 'Action Lifecycle Model', type: 'interaction model', claim: 'Six control families form one action language.', receiptBodyType: 'lifecycle', accentColor: '#69dcff' },
  'interface-behavior-control-library': { receiptNumber: '02', title: 'Adaptive Control Library', type: 'component system', claim: 'A speculative model formalized as reusable design-system infrastructure.', receiptBodyType: 'library', accentColor: '#69dcff' },
  'interface-behavior-accessibility': { receiptNumber: '03', title: 'Accessibility Contract', type: 'interaction specification', claim: 'Novel behavior remains optional while understanding remains required.', receiptBodyType: 'accessibility', accentColor: '#69dcff' },
  'interface-behavior-playground': { receiptNumber: '04', title: 'Coded Playground and Instrumentation', type: 'live prototype', claim: 'All six behaviors implemented with explicit simulation boundaries.', receiptBodyType: 'playground', accentColor: '#69dcff' }
}
export function getInterfaceBehaviorLabReceiptVisual(key) { return definitions[key] ?? null }
