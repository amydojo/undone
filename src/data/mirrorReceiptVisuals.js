export const mirrorReceiptVisuals = {
  'signal-interpretation-map': {
    receiptNumber: '01',
    title: 'Signal Interpretation Engine',
    type: 'Logic diagram',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves Mirror turns mood, sleep, clarity, and tension/context into readable product states before any suggestion is shown.',
    receiptBodyType: 'logicMap',
    preview: {
      flow: ['inputs', 'normalize', 'detect', 'respond'],
      inputs: ['mood', 'sleep', 'clarity', 'context']
    },
    body: {
      inputs: [
        { label: 'Mood', value: 'flat / tender / bright' },
        { label: 'Sleep', value: 'short / broken / restored' },
        { label: 'Clarity', value: 'foggy / usable / sharp' },
        { label: 'Tension + context', value: 'quiet / dense / overstimulating' }
      ],
      ranges: [
        { label: 'Mood', value: 'low to lifted' },
        { label: 'Sleep', value: 'depleted to restored' },
        { label: 'Clarity', value: 'foggy to sharp' },
        { label: 'Tension/context', value: 'settled to overloaded' }
      ],
      resolver: [
        { state: 'Frayed', rule: 'high tension + low clarity', nextMove: 'lower input load' },
        { state: 'Compressed', rule: 'high tension + usable energy', nextMove: 'simplify choices' },
        { state: 'Fog Forming', rule: 'poor sleep or dropping clarity', nextMove: 'protect attention' },
        { state: 'Drifting', rule: 'low mood + low clarity', nextMove: 'choose one anchor' },
        { state: 'Restoring', rule: 'restorative context or better sleep', nextMove: 'preserve calm' },
        { state: 'Settled', rule: 'low tension + stable clarity', nextMove: 'keep rhythm' }
      ],
      outputs: [
        { label: 'Readable state', value: 'Settled, Frayed, Drifting, Restoring' },
        { label: 'Confidence', value: 'clear / mixed / light read' },
        { label: 'Why this reading', value: 'plain-language signal explanation' },
        { label: 'Gentle next move', value: 'one low-friction suggestion' }
      ],
      foldedLogic: [
        { label: 'Check-in record', value: 'mood, sleep, clarity, tension/context, note' },
        { label: 'Similar-day context', value: 'used as background evidence, not a score' },
        { label: 'Feedback signal', value: 'helpful / not now adjusts future suggestion order' }
      ]
    },
    footerNote:
      'The engine is product logic, not diagnosis: it turns messy self-reporting into a state, a reason, and one next step.'
  },
  'body-weather-state-system': {
    receiptNumber: '02',
    title: 'Body Weather State System',
    type: 'Product mental model',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the product has a human-readable mental model instead of random mood labels.',
    receiptBodyType: 'stateMatrix',
    preview: {
      featuredState: 'Frayed',
      states: ['Settled', 'Frayed', 'Drifting', 'Restoring']
    },
    body: {
      weatherField: {
        label: 'Weather Field',
        state: 'Frayed',
        texture: 'static edge, dense day',
        confidence: 'medium confidence',
        interpretation:
          'Your check-in points to overload: sleep is thin, clarity is low, and the day looks dense.',
        nextMove: 'Reduce one input before choosing the next task.'
      },
      states: [
        {
          name: 'Settled',
          texture: 'clear baseline',
          confidence: 'high when sleep and clarity are stable',
          copy: 'You seem steady enough to keep your normal rhythm.',
          nextMove: 'Maintain the plan.'
        },
        {
          name: 'Frayed',
          texture: 'static edge',
          confidence: 'medium to high with high tension',
          copy: 'The system reads overload and lowers the pressure of the next step.',
          nextMove: 'Reduce input load.'
        },
        {
          name: 'Drifting',
          texture: 'low traction',
          confidence: 'medium with low mood and low clarity',
          copy: 'The day may need an anchor before it needs ambition.',
          nextMove: 'Pick one small anchor.'
        },
        {
          name: 'Restoring',
          texture: 'soft return',
          confidence: 'medium when context or sleep improves',
          copy: 'There are signs of recovery, so the interface protects calm.',
          nextMove: 'Do not overfill the day.'
        },
        {
          name: 'Compressed',
          texture: 'pressure band',
          confidence: 'medium with high tension and usable energy',
          copy: 'You may be functional but pressed, so choices need to narrow.',
          nextMove: 'Make the next choice smaller.'
        },
        {
          name: 'Fog Forming',
          texture: 'blur rising',
          confidence: 'light to medium with poor sleep or dropping clarity',
          copy: 'The product catches early cognitive drag before it becomes a hard label.',
          nextMove: 'Protect attention.'
        },
        {
          name: 'Sparked',
          texture: 'bright lift',
          confidence: 'medium with high energy and sharp clarity',
          copy: 'There is usable momentum, so the system helps capture direction.',
          nextMove: 'Write the next idea down.'
        },
        {
          name: 'Clear',
          texture: 'open line',
          confidence: 'high when clarity is sharp and tension is low',
          copy: 'Focus looks available, so the product supports execution.',
          nextMove: 'Move one meaningful task forward.'
        }
      ]
    },
    footerNote:
      'The weather model gives the user readable language while keeping the copy careful: it describes the check-in, not the person.'
  },
  'debug-overlay-test-bench': {
    receiptNumber: '03',
    title: 'Debug Overlay + Test Bench',
    type: 'QA artifact',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the system was testable and inspectable during development.',
    receiptBodyType: 'qaConsole',
    preview: {
      rows: ['scenario', 'expected', 'actual', 'pass']
    },
    body: {
      header: 'Debug Overlay + Test Bench',
      trigger: 'triple click current patterns header',
      close: 'Esc',
      sections: ['Current signals', 'State detection', 'Similar-day context', 'Suggestion ranking', 'Feedback store', 'Copy guardrails'],
      testCases: [
        {
          scenario: 'Frayed overload day',
          inputs: 'sleep short, clarity foggy, context dense',
          expected: 'Frayed',
          actual: 'Frayed',
          confidence: '0.86',
          status: 'pass'
        },
        {
          scenario: 'Settled quiet morning',
          inputs: 'mood steady, sleep restored, tension low',
          expected: 'Settled',
          actual: 'Settled',
          confidence: '0.91',
          status: 'pass'
        },
        {
          scenario: 'Drifting low traction',
          inputs: 'mood flat, clarity foggy, context quiet',
          expected: 'Drifting',
          actual: 'Drifting',
          confidence: '0.78',
          status: 'pass'
        },
        {
          scenario: 'Mixed signals fallback',
          inputs: 'mood bright, sleep broken, tension medium',
          expected: 'Mixed read',
          actual: 'Mixed read',
          confidence: '0.62',
          status: 'pass'
        },
        {
          scenario: 'No diagnosis copy',
          inputs: 'any state output',
          expected: 'descriptive copy',
          actual: 'descriptive copy',
          confidence: '1.00',
          status: 'pass'
        }
      ],
      assertions: [
        { label: 'State is explainable', result: 'pass' },
        { label: 'One suggestion only', result: 'pass' },
        { label: 'Feedback can rerank later', result: 'pass' }
      ]
    },
    footerNote:
      'The debug bench keeps hidden logic visible: state detection, similar-day context, suggestion ranking, and feedback are inspectable during QA.'
  },
  'storybook-component-environment': {
    receiptNumber: '04',
    title: 'Storybook Component Environment',
    type: 'Component catalog',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the interface was broken into reusable components with visible variants and interaction states.',
    receiptBodyType: 'coverageMatrix',
    preview: {
      rows: ['input stories', 'state surfaces', 'interaction states']
    },
    body: {
      metadata: [
        { label: 'Build type', value: 'static Storybook' },
        { label: 'Coverage mode', value: 'states, variants, interactions' },
        { label: 'QA handoff', value: 'Storybook, Vitest, Playwright prepared' }
      ],
      rows: [
        {
          component: 'CheckInForm',
          category: 'Input',
          variants: 'empty, partial, complete',
          storyCoverage: '3 stories',
          interactions: 'keyboard, validation, submit',
          status: 'ready'
        },
        {
          component: 'SignalControls',
          category: 'Input',
          variants: 'mood, sleep, clarity, context',
          storyCoverage: '4 stories',
          interactions: 'range input, selected, disabled',
          status: 'ready'
        },
        {
          component: 'BodyWeatherHero',
          category: 'State surface',
          variants: 'settled, frayed, drifting, restoring',
          storyCoverage: '4 stories',
          interactions: 'loading, mixed confidence',
          status: 'ready'
        },
        {
          component: 'InterpretationCopy',
          category: 'State surface',
          variants: 'clear read, mixed read, fallback',
          storyCoverage: '3 stories',
          interactions: 'long copy, short copy',
          status: 'ready'
        },
        {
          component: 'SimilarDays',
          category: 'Memory',
          variants: 'none, partial, strong match',
          storyCoverage: '3 stories',
          interactions: 'privacy copy, empty state',
          status: 'ready'
        },
        {
          component: 'GentleNextMove',
          category: 'Action',
          variants: 'suggested, dismissed, completed',
          storyCoverage: '3 stories',
          interactions: 'helpful, not now, complete',
          status: 'ready'
        },
        {
          component: 'DebugPanel',
          category: 'QA',
          variants: 'closed, open, failed scenario',
          storyCoverage: '3 stories',
          interactions: 'toggle, inspect, reset',
          status: 'ready'
        },
        {
          component: 'Dashboard',
          category: 'Page',
          variants: 'no history, active history',
          storyCoverage: '2 stories',
          interactions: 'responsive, empty state',
          status: 'ready'
        }
      ]
    },
    footerNote:
      'The Storybook environment proves implementation workflow: product states can be reviewed outside the main app before they ship.'
  }
};

export function getMirrorReceiptVisual(componentKey) {
  return mirrorReceiptVisuals[componentKey] ?? null;
}
