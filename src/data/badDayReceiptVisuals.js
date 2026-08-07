export const badDayReceiptVisuals = {
  'bad-day-receipt-machine': {
    receiptNumber: '01',
    title: 'Receipt Machine',
    type: 'live product',
    privacyLabel: 'live product',
    accentColor: '#ff5b4d',
    receiptBodyType: 'receiptMachine',
    summary: 'What the day cost, printed.',
    flow: ['pick', 'total', 'print'],
    proof: 'A vague bad day becomes something visible.',
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
    title: 'Three Ways to End',
    type: 'ending choice',
    privacyLabel: 'live behavior',
    accentColor: '#ff5b4d',
    receiptBodyType: 'threeEndings',
    quiet: true,
    summary: 'Keep it. Let it go. Carry one thing.',
    flow: ['done', 'choose', 'end'],
    proof: 'All three choices count as finished.',
    body: {
      endings: ['KEEP', 'LET GO', 'CARRY'],
    },
  },
  'bad-day-carry-forward': {
    receiptNumber: '03',
    title: 'Carry Forward',
    type: 'optional next step',
    privacyLabel: 'chosen by you',
    accentColor: '#ff5b4d',
    receiptBodyType: 'carryForward',
    quiet: true,
    summary: 'Carry one thing, not the whole day.',
    flow: ['one thing', 'choose help', 'continue'],
    proof: 'You choose the support. The product does not guess.',
    body: {
      obligation: 'CONFIRM REPAIR TIME',
      supports: ['ONE STEP', 'FEWER CHOICES', 'SAVE PROGRESS', 'SKIP EXTRA'],
      activeSupport: 0,
    },
  },
  'bad-day-one-thing-mode': {
    receiptNumber: '04',
    title: 'One Thing Mode',
    type: 'AI helper',
    privacyLabel: 'checked by app',
    accentColor: '#ff5b4d',
    receiptBodyType: 'oneThingMode',
    quiet: true,
    summary: 'One task. A small plan. You stay in control.',
    flow: ['task', 'check plan', 'show steps'],
    proof: 'AI can suggest the plan. The app decides what is allowed.',
    body: {
      task: 'CONFIRM REPAIR TIME',
      steps: ['READ', 'CHOOSE', 'WRITE', 'CHECK', 'REVIEW'],
      activeStep: 0,
    },
  },
};

export function getBadDayReceiptVisual(componentKey) {
  return badDayReceiptVisuals[componentKey] ?? null;
}
