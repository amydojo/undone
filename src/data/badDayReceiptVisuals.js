export const badDayReceiptVisuals = {
  'bad-day-receipt-machine': {
    receiptNumber: '01',
    title: 'Receipt Machine',
    type: 'artifact system',
    privacyLabel: 'live product proof',
    accentColor: '#ff5b4d',
    receiptBodyType: 'receiptMachine',
    summary: 'Invisible effort becomes one bounded record.',
    flow: ['charge', 'itemize', 'print'],
    proof: 'The product turns self-reported effort into a tangible receipt without scoring or diagnosis.',
    body: {
      total: '$42.31',
      itemCount: '04',
      verdict: 'SURVIVABLE',
      paper: 'ORIGINAL',
      rows: [
        ['TRYING TO ACT NORMAL', '$14.00'],
        ['ONE UNNECESSARY WORRY', '$8.75'],
        ['TOO MANY TINY DECISIONS', '$9.25'],
      ],
      screen: '/overview/bad-day-receipt-artifact.jpg',
    },
  },
  'bad-day-three-valid-endings': {
    receiptNumber: '02',
    title: 'Three Endings',
    type: 'closure',
    privacyLabel: 'production behavior',
    accentColor: '#ff5b4d',
    receiptBodyType: 'threeEndings',
    quiet: true,
    summary: 'Completion stays complete, even when nothing comes next.',
    flow: ['documented', 'choose', 'end'],
    proof: 'Keep, Let Go, and Carry Forward are equal outcomes after the receipt is already complete.',
    body: {
      endings: ['KEEP', 'LET GO', 'CARRY'],
    },
  },
  'bad-day-carry-forward': {
    receiptNumber: '03',
    title: 'Carry Forward',
    type: 'carry path',
    privacyLabel: 'user chosen',
    accentColor: '#ff5b4d',
    receiptBodyType: 'carryForward',
    quiet: true,
    summary: 'One unfinished obligation moves forward under changed conditions.',
    flow: ['one thing', 'declare support', 'continue'],
    proof: 'The interface adapts only from support the user explicitly requests, never inferred emotion.',
    body: {
      obligation: 'CONFIRM TOMORROW’S REPAIR',
      supports: ['ONE STEP', 'FEWER', 'SAVE', 'LATER'],
      activeSupport: 0,
    },
  },
  'bad-day-one-thing-mode': {
    receiptNumber: '04',
    title: 'One Thing Mode',
    type: 'bounded runtime',
    privacyLabel: 'validated',
    accentColor: '#ff5b4d',
    receiptBodyType: 'oneThingMode',
    quiet: true,
    summary: 'The model proposes structure. The application keeps control.',
    flow: ['source', 'validate', 'render'],
    proof: 'GPT-5.6 can only propose five typed step kinds that pass application validation before rendering.',
    body: {
      task: 'CONFIRM TOMORROW’S REPAIR',
      steps: ['READ', 'CHOOSE', 'COMPOSE', 'CHECK', 'REVIEW'],
      activeStep: 0,
    },
  },
};

export function getBadDayReceiptVisual(componentKey) {
  return badDayReceiptVisuals[componentKey] ?? null;
}
