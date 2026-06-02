export const mirrorReceiptVisuals = {
  'signal-interpretation-map': {
    title: 'Signal Interpretation Map',
    eyebrow: 'Mirror / body weather',
    type: 'logic diagram',
    status: 'ready',
    claim: 'Maps raw emotional inputs into deterministic state logic.',
    sections: [
      {
        title: 'Signal normalization',
        items: [
          { label: 'Energy', value: 'low / usual / high' },
          { label: 'Tension', value: 'low / usual / elevated' },
          { label: 'Clarity', value: 'foggy / usual / sharp' },
          { label: 'Sleep', value: 'short / fragmented / usual / restored' }
        ]
      },
      {
        title: 'Context profile',
        kind: 'steps',
        items: ['overstimulating', 'dense', 'quiet', 'restorative', 'mixed']
      },
      {
        title: 'State chain',
        kind: 'steps',
        items: ['Frayed', 'Compressed', 'Sparked', 'Clear', 'Fog Forming', 'Drifting', 'Restoring', 'Settled']
      }
    ],
    footerNote: 'Priority order is intentional. More severe states are checked first.'
  },
  'feedback-store-learning-loop': {
    title: 'Feedback Store Learning Loop',
    eyebrow: 'Mirror / local learning',
    type: 'prototype logic',
    status: 'ready',
    claim: 'Every user rating changes future suggestion scoring without telemetry.',
    sections: [
      {
        title: 'Feedback loop',
        kind: 'steps',
        items: ['User rates', 'recordFeedback()', 'mirror_feedback', 'score()', 'selectNextMove()', 'next suggestion']
      },
      {
        title: 'Scoring',
        items: [
          { label: 'helped', value: '+2' },
          { label: 'helped a little', value: '+1' },
          { label: 'not sure', value: '0' },
          { label: 'did not help', value: '-1' }
        ]
      }
    ],
    footerNote: 'No analytics. No telemetry. No remote write path.'
  },
  'debug-and-qa-overlay': {
    title: 'Debug and QA Overlay',
    eyebrow: 'Mirror / regression layer',
    type: 'testing artifact',
    status: 'ready',
    claim: 'The product includes an inline debug layer for regression checks and demo control.',
    sections: [
      {
        title: 'Controls',
        items: [
          { label: 'Trigger', value: 'triple-click current patterns' },
          { label: 'Close', value: 'Escape' }
        ]
      },
      {
        title: 'Test suites',
        kind: 'steps',
        items: ['Body Weather Detection', 'Longitudinal Tests', 'Pattern Matchers', 'Seed Regression', 'Texture Memory Support', 'Continuity Archive']
      },
      {
        title: 'Metric',
        kind: 'metric',
        items: [
          { value: '6', label: 'suites' },
          { value: '48+', label: 'assertions' },
          { value: 'all', label: 'passing' }
        ]
      }
    ],
    footerNote: 'QA layer renders outside the app tree with portal behavior.'
  },
  'similar-days-pattern-logic': {
    title: 'Similar Days Pattern Logic',
    eyebrow: 'Mirror / pattern matching',
    type: 'pattern matching',
    status: 'ready',
    claim: 'Compares current check-ins to recent similar states without overstating certainty.',
    sections: [
      {
        title: 'Pipeline',
        kind: 'steps',
        items: ['current check-in', 'stored entries', 'same state', 'last 30 days', 'tag frequency', 'language calibration', 'what helped lookup']
      },
      {
        title: 'Language calibration',
        kind: 'steps',
        items: ['every time', 'often', 'possible link', 'worth noticing']
      }
    ],
    footerNote: 'Claim strength scales with evidence density.'
  },
  'storybook-component-environment': {
    title: 'Storybook Component Environment',
    eyebrow: 'Mirror / component QA',
    type: 'component QA',
    status: 'ready',
    claim: 'Static Storybook build preserved component documentation for product states.',
    sections: [
      {
        title: 'Primitives',
        kind: 'steps',
        items: ['Button', 'Card', 'Colors']
      },
      {
        title: 'Patterns',
        kind: 'steps',
        items: ['BodyWeatherHero', 'GentleNextMove', 'AmbientReflection']
      },
      {
        title: 'Pages',
        kind: 'steps',
        items: ['CheckIn', 'Dashboard']
      }
    ],
    footerNote: 'Static build is the available component evidence.'
  },
  'local-storage-data-model': {
    title: 'Local Storage Data Model',
    eyebrow: 'Mirror / data architecture',
    type: 'data architecture',
    status: 'ready',
    claim: 'Three persisted keys separate check-ins, feedback, and QA notes.',
    sections: [
      {
        title: 'Persisted keys',
        items: [
          { label: 'mirror_checkins', value: 'Check-in history' },
          { label: 'mirror_feedback', value: 'Suggestion outcome ratings' },
          { label: 'mirror_field_notes', value: 'QA field notes' }
        ]
      },
      {
        title: 'CheckInEntry schema',
        kind: 'schema',
        items: ['id', 'timestamp', 'raw signals', 'context tags', 'state', 'confidence', 'normalized signals']
      }
    ],
    footerNote: 'Cleared states use intentional sentinel behavior.'
  },
  'seed-scenario-system': {
    title: 'Seed Scenario System',
    eyebrow: 'Mirror / demo data',
    type: 'demo data',
    status: 'ready',
    claim: 'Demo entries cover all 8 states through the live engine, not hardcoded overrides.',
    sections: [
      {
        title: 'Dataset',
        kind: 'steps',
        items: ['29 entries', '8 states', 'stable IDs', 'realistic context tags', 'journal-style notes', 'regression verified']
      },
      {
        title: 'State coverage',
        kind: 'steps',
        items: ['Clear', 'Settled', 'Restoring', 'Sparked', 'Compressed', 'Fog Forming', 'Drifting', 'Frayed']
      }
    ],
    footerNote: 'Seed entries pass through detectBodyWeather live.'
  },
  'gentle-next-move-logic': {
    title: 'Gentle Next Move Logic',
    eyebrow: 'Mirror / recommendation system',
    type: 'recommendation system',
    status: 'ready',
    claim: 'Suggestions are selected through scored eligibility and safety constraints.',
    sections: [
      {
        title: 'Support library',
        kind: 'metric',
        items: [
          { value: '15', label: 'actions' },
          { value: '1', label: 'shown' },
          { value: '0', label: 'urgency' }
        ]
      },
      {
        title: 'Scoring',
        kind: 'steps',
        items: ['feedbackScore', 'contextBoost', 'basePriority']
      },
      {
        title: 'Safety constraints',
        kind: 'steps',
        items: ['one suggestion only', 'no productivity framing', 'no medical advice', 'no shame', 'no urgency']
      }
    ],
    footerNote: 'Recommendation rationale is surfaced faintly in UI.'
  }
};

export function getMirrorReceiptVisual(componentKey) {
  return mirrorReceiptVisuals[componentKey] ?? null;
}
