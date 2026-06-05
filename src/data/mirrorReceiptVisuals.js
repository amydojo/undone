export const mirrorReceiptVisuals = {
  'signal-interpretation-map': {
    receiptNumber: '01',
    title: 'Signal Interpretation Map',
    type: 'Logic diagram',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves Mirror converts raw emotional inputs into defined body weather states with a clear priority order.',
    receiptBodyType: 'logicMap',
    preview: {
      flow: ['inputs', 'normalize', 'resolver', 'output']
    },
    body: {
      inputs: ['Energy', 'Tension', 'Clarity', 'Sleep'],
      ranges: [
        { label: 'Energy', value: 'low / usual / high' },
        { label: 'Tension', value: 'low / usual / elevated' },
        { label: 'Clarity', value: 'foggy / usual / sharp' },
        { label: 'Sleep', value: 'short / fragmented / usual / restored' }
      ],
      resolver: ['Frayed', 'Compressed', 'Sparked', 'Clear', 'Fog Forming', 'Drifting', 'Restoring', 'Settled'],
      outputs: [
        { label: 'State label', value: 'body weather state' },
        { label: 'Confidence label', value: 'calibrated certainty' },
        { label: 'Why this reading', value: 'plain-language signal explanation' },
        { label: 'Gentle next move', value: 'one low-friction suggestion' }
      ]
    },
    footerNote:
      'Priority order is intentional. Higher-tension states are checked first so the product does not flatten hard days into generic wellness copy.'
  },
  'check-in-data-model': {
    receiptNumber: '02',
    title: 'Check In Data Model',
    type: 'Data schema',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the product has structured inputs rather than vague mood journaling.',
    receiptBodyType: 'schemaTable',
    preview: {
      rows: [
        { group: 'Signal', field: 'energy', type: 'range', usedBy: 'detect' },
        { group: 'Context', field: 'contextProfile', type: 'array', usedBy: 'copy' },
        { group: 'Reflection', field: 'note', type: 'string', usedBy: 'memory' },
        { group: 'Storage', field: 'mirror_checkins', type: 'key', usedBy: 'match' }
      ]
    },
    body: {
      columns: ['Field group', 'Field name', 'Type', 'Allowed values', 'Used by'],
      rows: [
        { group: 'Signal', name: 'energy', type: 'number or range', allowed: 'low, usual, high', usedBy: 'state detection' },
        { group: 'Signal', name: 'tension', type: 'number or range', allowed: 'low, usual, elevated', usedBy: 'state detection' },
        { group: 'Signal', name: 'clarity', type: 'number or range', allowed: 'foggy, usual, sharp', usedBy: 'state detection' },
        { group: 'Signal', name: 'sleep', type: 'number or range', allowed: 'short, fragmented, usual, restored', usedBy: 'state detection' },
        { group: 'Context', name: 'contextProfile', type: 'array', allowed: 'overstimulating, dense, quiet, restorative, mixed', usedBy: 'interpretation copy' },
        { group: 'Reflection', name: 'note', type: 'string', allowed: 'free text', usedBy: 'pattern memory' },
        { group: 'Storage', name: 'mirror_checkins', type: 'localStorage key', allowed: 'array of check ins', usedBy: 'history matching' }
      ],
      sampleRecord: {
        energy: 'low',
        tension: 'elevated',
        clarity: 'foggy',
        sleep: 'fragmented',
        contextProfile: ['dense'],
        note: '[sanitized free text]',
        state: 'Frayed'
      }
    },
    footerNote:
      "Mirror's emotional UX is powered by structured signals, not loose inspirational copy."
  },
  'body-weather-state-system': {
    receiptNumber: '03',
    title: 'Body Weather State System',
    type: 'State model',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the product has a defined emotional state language and not random mood labels.',
    receiptBodyType: 'stateMatrix',
    preview: {
      states: ['Frayed', 'Compressed', 'Sparked', 'Clear', 'Fog Forming', 'Drifting', 'Restoring', 'Settled']
    },
    body: {
      states: [
        {
          name: 'Frayed',
          trigger: 'high tension, low clarity, low energy',
          signature: ['tension high', 'clarity low', 'energy low'],
          meaning: 'system detects overload risk',
          tone: 'reduce friction'
        },
        {
          name: 'Compressed',
          trigger: 'high tension with functional energy',
          signature: ['tension high', 'energy usable'],
          meaning: 'user is operational but pressured',
          tone: 'simplify choices'
        },
        {
          name: 'Sparked',
          trigger: 'high energy and sharp clarity',
          signature: ['energy high', 'clarity sharp'],
          meaning: 'user has activation and momentum',
          tone: 'capture direction'
        },
        {
          name: 'Clear',
          trigger: 'stable energy, low tension, sharp clarity',
          signature: ['energy stable', 'tension low', 'clarity sharp'],
          meaning: 'user has usable focus',
          tone: 'support execution'
        },
        {
          name: 'Fog Forming',
          trigger: 'clarity dropping or sleep disruption',
          signature: ['clarity dropping', 'sleep disrupted'],
          meaning: 'early cognitive drag',
          tone: 'protect energy'
        },
        {
          name: 'Drifting',
          trigger: 'low energy and low clarity',
          signature: ['energy low', 'clarity low'],
          meaning: 'low traction day',
          tone: 'gentle anchoring'
        },
        {
          name: 'Restoring',
          trigger: 'restorative context or improved sleep',
          signature: ['context restorative', 'sleep improved'],
          meaning: 'nervous system recovery',
          tone: 'preserve calm'
        },
        {
          name: 'Settled',
          trigger: 'usual energy, low tension, stable clarity',
          signature: ['energy usual', 'tension low', 'clarity stable'],
          meaning: 'baseline stability',
          tone: 'maintain rhythm'
        }
      ]
    },
    footerNote:
      'The state model gives Mirror a consistent product language for emotional conditions without diagnosing the user.'
  },
  'similar-days-matcher': {
    receiptNumber: '04',
    title: 'Similar Days Matcher',
    type: 'Pattern matching trace',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: "Proves Mirror can compare today's signals against previous check-ins and surface useful memory.",
    receiptBodyType: 'matcherTrace',
    preview: {
      rows: ['today: low / elevated / foggy', '01 strong match', '02 likely match', '03 possible match']
    },
    body: {
      fingerprint: [
        { label: 'Energy', value: 'low' },
        { label: 'Tension', value: 'elevated' },
        { label: 'Clarity', value: 'foggy' },
        { label: 'Sleep', value: 'fragmented' },
        { label: 'Context', value: 'dense' }
      ],
      criteria: ['Signal overlap', 'Context overlap', 'Recent check ins', 'Repeated tags', 'Helpful past actions'],
      storageKey: 'mirror_checkins',
      matches: [
        { rank: '01', similarity: 'strong', strength: 3, sharedSignals: ['tension', 'clarity', 'sleep'], helpfulMove: 'reduce inputs' },
        { rank: '02', similarity: 'likely', strength: 2, sharedSignals: ['energy', 'context'], helpfulMove: 'quiet reset' },
        { rank: '03', similarity: 'possible', strength: 1, sharedSignals: ['sleep'], helpfulMove: 'short walk' }
      ]
    },
    footerNote:
      'Mirror turns repeated personal patterns into practical product memory.'
  },
  'gentle-next-move-ranking': {
    receiptNumber: '05',
    title: 'Gentle Next Move Ranking',
    type: 'Recommendation logic',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves suggestions are not random wellness advice. They are sorted by state, signal fit, and past feedback.',
    receiptBodyType: 'rankingLedger',
    preview: {
      formula: 'state fit + signal match + feedback',
      rows: ['01 Lower input load', '02 Write one sentence', '03 10 minute reset']
    },
    body: {
      formula: 'state fit + signal match + prior feedback = suggestion order',
      rows: [
        { candidate: 'Lower input load', triggeredBy: 'Frayed, Fog Forming', friction: 'low', feedback: 'helpful', rank: '01' },
        { candidate: 'Write one sentence', triggeredBy: 'Sparked, Clear', friction: 'low', feedback: 'neutral', rank: '02' },
        { candidate: 'Do a 10 minute reset', triggeredBy: 'Compressed, Drifting', friction: 'medium', feedback: 'helpful', rank: '03' },
        { candidate: 'Avoid major decisions', triggeredBy: 'Frayed, Fog Forming', friction: 'low', feedback: 'helpful', rank: '04' }
      ]
    },
    footerNote:
      'The next move logic translates emotional state into a low-friction action instead of overwhelming the user with choices.'
  },
  'feedback-memory-loop': {
    receiptNumber: '06',
    title: 'Feedback Memory Loop',
    type: 'Adaptive behavior log',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the product can learn which suggestions help without needing a heavy account system.',
    receiptBodyType: 'feedbackLoop',
    preview: {
      nodes: ['shown', 'response', 'stored', 'reranked']
    },
    body: {
      loop: ['Suggestion shown', 'user response', 'feedback stored', 'future ranking adjusted'],
      responseOptions: ['helpful', 'not now', 'dismissed', 'completed'],
      storageKey: 'mirror_feedback',
      example: [
        { label: 'State', value: 'Compressed' },
        { label: 'Suggestion', value: 'lower input load' },
        { label: 'User response', value: 'helpful' },
        { label: 'Future effect', value: 'prioritize on similar days' }
      ],
      eventLog: [
        { event: 'suggestion_shown', value: 'lower input load' },
        { event: 'feedback_recorded', value: 'helpful' },
        { event: 'ranking_adjusted', value: 'similar Compressed days' }
      ]
    },
    footerNote:
      'Mirror gets more useful over time through lightweight feedback, not surveillance-heavy tracking.'
  },
  'debug-overlay-test-bench': {
    receiptNumber: '07',
    title: 'Debug Overlay Test Bench',
    type: 'QA console',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the system was testable and inspectable during development.',
    receiptBodyType: 'qaConsole',
    preview: {
      rows: ['trigger', 'pipeline', 'tests', 'pass']
    },
    body: {
      header: 'Debug Overlay',
      trigger: 'triple click current patterns header',
      close: 'Esc',
      sections: ['Pipeline visibility', 'Current signals', 'Matched state', 'Similar days', 'Suggestion ranking', 'Feedback store'],
      testCases: [
        'Frayed overload day',
        'Compressed meeting day',
        'Sparked creative day',
        'Fog after poor sleep',
        'Settled quiet morning',
        'Restoring weekend day',
        'Drifting low energy day',
        'Clear focus day',
        'Mixed context day',
        'No data fallback'
      ]
    },
    footerNote:
      'The debug bench made the invisible product logic inspectable so state detection could be tested instead of guessed.'
  },
  'storybook-component-environment': {
    receiptNumber: '08',
    title: 'Storybook Component Environment',
    type: 'Component QA',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the product interface was broken into reusable, inspectable components and documented states.',
    receiptBodyType: 'coverageMatrix',
    preview: {
      rows: ['static Storybook', 'component coverage matrix', 'ready state docs']
    },
    body: {
      metadata: [
        { label: 'Branch', value: 'feature/storybook-component-showcase' },
        { label: 'Build type', value: 'static Storybook' },
        { label: 'Tooling', value: 'Storybook, MSW, Vitest, Playwright prepared' }
      ],
      rows: [
        { component: 'Button', category: 'Primitive', variants: 'default, disabled, loading', statesCovered: '3', status: 'ready' },
        { component: 'Card', category: 'Primitive', variants: 'default, selected, empty', statesCovered: '3', status: 'ready' },
        { component: 'SignalSparkline', category: 'Data display', variants: 'low, usual, high', statesCovered: '3', status: 'ready' },
        { component: 'BodyWeatherHero', category: 'Product pattern', variants: 'frayed, clear, settled', statesCovered: '3', status: 'ready' },
        { component: 'SimilarDays', category: 'Product pattern', variants: 'empty, partial, ranked', statesCovered: '3', status: 'ready' },
        { component: 'GentleNextMove', category: 'Product pattern', variants: 'suggested, dismissed, completed', statesCovered: '3', status: 'ready' },
        { component: 'AmbientReflection', category: 'Product pattern', variants: 'short, expanded', statesCovered: '2', status: 'ready' },
        { component: 'DebugPanel', category: 'QA', variants: 'open, closed, tests', statesCovered: '3', status: 'ready' },
        { component: 'CheckIn', category: 'Page', variants: 'empty, filled, submitted', statesCovered: '3', status: 'ready' },
        { component: 'Dashboard', category: 'Page', variants: 'no history, active history', statesCovered: '2', status: 'ready' }
      ]
    },
    footerNote:
      'The Storybook environment preserves component evidence and makes product states reviewable outside the main app.'
  }
};

export function getMirrorReceiptVisual(componentKey) {
  return mirrorReceiptVisuals[componentKey] ?? null;
}
