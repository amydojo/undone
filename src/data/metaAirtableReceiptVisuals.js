export const metaAirtableReceiptVisuals = {
  'meta-leads-master-table-logic': {
    title: 'Leads Master Table Logic',
    eyebrow: 'Meta + Airtable / lead spine',
    type: 'data model',
    status: 'ready',
    accentColor: '#b6f3d4',
    claim: 'Shows the shared lead record that connected acquisition source, service interest, CRM state, booking behavior, and conversion value.',
    previewRows: ['shared lead record', '5 signal groups', 'attribution-ready fields'],
    sections: [
      {
        title: 'Identity',
        kind: 'steps',
        items: ['name', 'phone', 'email']
      },
      {
        title: 'Source',
        kind: 'steps',
        items: ['lead source', 'campaign', 'ad set', 'form']
      },
      {
        title: 'Intent',
        kind: 'steps',
        items: ['service interest', 'promo interest', 'concern']
      },
      {
        title: 'CRM State',
        kind: 'steps',
        items: ['new', 'contacted', 'booked', 'arrived', 'converted', 'lost']
      },
      {
        title: 'Outcome',
        kind: 'steps',
        items: ['revenue value', 'conversion status', 'attribution confidence', 'follow up date']
      }
    ],
    footerNote: 'Proves the system had a shared lead record that could support reporting, lifecycle follow up, and downstream attribution.'
  },
  'meta-campaign-performance-logic': {
    title: 'Campaign Performance Logic',
    eyebrow: 'Meta + Airtable / paid media signal',
    type: 'analytics table',
    status: 'ready',
    accentColor: '#b6f3d4',
    claim: 'Shows how ad performance was translated from platform metrics into business signals.',
    previewRows: ['Meta signals', 'CRM signals', 'decision signals'],
    sections: [
      {
        title: 'Meta Signals',
        kind: 'steps',
        items: ['spend', 'impressions', 'clicks', 'leads', 'CPL', 'CTR']
      },
      {
        title: 'CRM Signals',
        kind: 'steps',
        items: ['booked', 'arrived', 'converted', 'revenue']
      },
      {
        title: 'Decision Signals',
        kind: 'steps',
        items: ['cost per booked lead', 'lead quality', 'ROAS', 'attribution confidence']
      }
    ],
    footerNote: 'Proves campaign decisions were based on more than platform level lead volume.'
  },
  'meta-revenue-attribution-model': {
    title: 'Revenue Attribution Model',
    eyebrow: 'Meta + Airtable / confidence layer',
    type: 'logic layer',
    status: 'ready',
    accentColor: '#b6f3d4',
    claim: 'Shows how revenue was matched back to campaign and lead context using confidence based attribution logic.',
    previewRows: ['confidence model', 'revenue match path', 'ROAS context'],
    sections: [
      {
        title: 'Input',
        kind: 'steps',
        items: ['lead record', 'campaign context', 'service interest']
      },
      {
        title: 'Match',
        kind: 'steps',
        items: ['booking behavior', 'arrival status', 'service purchased', 'revenue value']
      },
      {
        title: 'Confidence',
        kind: 'steps',
        items: ['high', 'medium', 'low', 'unmatched']
      },
      {
        title: 'Output',
        kind: 'steps',
        items: ['estimated revenue impact', 'ROAS context', 'optimization signal']
      }
    ],
    footerNote: 'Proves attribution was handled as a confidence model, not a fake certainty machine.'
  },
  'meta-decision-dashboard-ui': {
    title: 'Decision Dashboard UI',
    eyebrow: 'Meta + Airtable / decision layer',
    type: 'interface system',
    status: 'ready',
    accentColor: '#b6f3d4',
    claim: 'Shows the final decision layer where campaign, CRM, and revenue signals became optimization guidance.',
    previewRows: ['top signal strip', 'campaign health', 'next move guidance'],
    sections: [
      {
        title: 'Top Signals',
        kind: 'steps',
        items: ['spend', 'leads', 'booked', 'revenue', 'ROAS']
      },
      {
        title: 'Campaign Health',
        kind: 'steps',
        items: ['efficient', 'watch', 'needs action']
      },
      {
        title: 'Service Demand',
        kind: 'steps',
        items: ['microneedling', 'hydrafacial', 'laser hair removal', "men's wellness"]
      },
      {
        title: 'Next Move',
        kind: 'steps',
        items: ['scale', 'pause', 'revise offer', 'change audience', 'improve follow up']
      }
    ],
    footerNote: 'Proves the system translated analytics into action, not just reporting.'
  }
};

export function getMetaAirtableReceiptVisual(componentKey) {
  return metaAirtableReceiptVisuals[componentKey] ?? null;
}
