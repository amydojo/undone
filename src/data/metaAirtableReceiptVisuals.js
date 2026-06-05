const leadsMasterFields = [
  { group: 'Identity', field: 'Lead ID', type: 'key', example: 'lead_001', usedFor: 'record identity' },
  { group: 'Identity', field: 'Name', type: 'redacted text', example: 'Name redacted', usedFor: 'CRM lookup' },
  { group: 'Identity', field: 'Phone', type: 'redacted contact', example: 'Phone redacted', usedFor: 'contact match' },
  { group: 'Identity', field: 'Email', type: 'redacted contact', example: 'Email redacted', usedFor: 'contact match' },
  { group: 'Identity', field: 'Created Date', type: 'date', example: 'sample date', usedFor: 'lead age and follow up timing' },
  { group: 'Source', field: 'Lead Source', type: 'single select', example: 'Meta Lead Form', usedFor: 'source lineage' },
  { group: 'Source', field: 'Meta Campaign', type: 'text/ref', example: 'MN Acne Scars', usedFor: 'campaign join' },
  { group: 'Source', field: 'Ad Set', type: 'text reference', example: 'ad set reference', usedFor: 'audience context' },
  { group: 'Source', field: 'Ad Name', type: 'text reference', example: 'ad reference', usedFor: 'creative context' },
  { group: 'Source', field: 'Form Name', type: 'text reference', example: 'lead form reference', usedFor: 'offer context' },
  { group: 'Source', field: 'Platform', type: 'single select', example: 'Meta', usedFor: 'channel filter' },
  { group: 'Intent', field: 'Brand', type: 'single select', example: 'brand reference', usedFor: 'clinic or service grouping' },
  { group: 'Intent', field: 'Service Interest', type: 'single select', example: 'Microneedling', usedFor: 'segmentation' },
  { group: 'Intent', field: 'Location', type: 'single select', example: 'market reference', usedFor: 'routing and reporting' },
  { group: 'Intent', field: 'Concern', type: 'long text', example: 'sanitized concern', usedFor: 'intent qualifier' },
  { group: 'Intent', field: 'Offer Claimed', type: 'single select', example: 'offer reference', usedFor: 'offer performance' },
  { group: 'CRM State', field: 'Status', type: 'single select', example: 'Booked', usedFor: 'CRM state' },
  { group: 'CRM State', field: 'Owner', type: 'collaborator', example: 'team member', usedFor: 'follow up owner' },
  { group: 'CRM State', field: 'Follow Up Date', type: 'date', example: 'sample date', usedFor: 'operations queue' },
  { group: 'CRM State', field: 'Last Contacted', type: 'date', example: 'sample date', usedFor: 'overdue follow up check' },
  { group: 'Booking', field: 'Booked', type: 'boolean', example: 'true or false', usedFor: 'booked rate' },
  { group: 'Booking', field: 'Booked Date', type: 'date', example: 'sanitized', usedFor: 'show rate' },
  { group: 'Booking', field: 'Appointment Date', type: 'date', example: 'sample date', usedFor: 'show tracking' },
  { group: 'Outcome', field: 'Arrived', type: 'boolean', example: 'yes/no', usedFor: 'show rate' },
  { group: 'Outcome', field: 'Converted', type: 'boolean', example: 'yes/no', usedFor: 'conversion' },
  { group: 'Outcome', field: 'Revenue Value', type: 'currency', example: 'hidden', usedFor: 'ROAS' },
  { group: 'Outcome', field: 'Package Type', type: 'single select', example: 'package reference', usedFor: 'revenue category' },
  { group: 'Outcome', field: 'Close Date', type: 'date', example: 'sample date', usedFor: 'conversion timing' },
  { group: 'Attribution', field: 'Attribution Confidence', type: 'select', example: 'medium', usedFor: 'reporting trust' },
  { group: 'Attribution', field: 'Manual Review Flag', type: 'boolean', example: 'false', usedFor: 'QA' }
];

export const metaAirtableReceiptVisuals = {
  'meta-leads-master-table-logic': {
    receiptNumber: '01',
    title: 'Leads_Master Table Logic',
    type: 'Airtable schema map',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the shared lead record carried source, intent, CRM state, booking behavior, outcome, and attribution fields together.',
    operationalSignal: 'Meta Lead Form context and CRM status updates were normalized into one Leads_Master record for downstream attribution.',
    receiptBodyType: 'airtableSchemaMap',
    preview: {
      rows: [
        { group: 'Identity', field: 'Lead ID', type: 'key' },
        { group: 'Identity', field: 'Name', type: 'text' },
        { group: 'Identity', field: 'Phone', type: 'contact' },
        { group: 'Source', field: 'Lead Source', type: 'select' },
        { group: 'Source', field: 'Meta Campaign', type: 'ref' },
        { group: 'Intent', field: 'Service Interest', type: 'select' },
        { group: 'CRM State', field: 'Status', type: 'select' },
        { group: 'Booking', field: 'Booked', type: 'bool' },
        { group: 'Booking', field: 'Booked Date', type: 'date' },
        { group: 'Outcome', field: 'Arrived', type: 'bool' },
        { group: 'Outcome', field: 'Revenue Value', type: 'currency' },
        { group: 'Attribution', field: 'Manual Review Flag', type: 'bool' }
      ]
    },
    body: {
      lineage: ['Meta Lead Form', 'Airtable Leads_Master', 'CRM Status Updates', 'Revenue Attribution', 'Decision Console'],
      fields: leadsMasterFields,
      sampleRecord: {
        source: 'Meta Lead Form',
        service_interest: 'Microneedling',
        status: 'Booked',
        arrived: 'Yes',
        converted: 'Pending',
        attribution_confidence: 'Medium'
      },
      downstreamUsage: ['Campaign_Performance', 'Revenue_Attribution', 'Decision Dashboard UI', 'Manual Review Queue']
    },
    footerNote:
      'One lead record carried source, booking, outcome, and attribution context together instead of scattering acquisition and revenue evidence across separate tools.'
  },
  'meta-campaign-performance-logic': {
    receiptNumber: '02',
    title: 'Campaign_Performance Logic',
    type: 'Formula model sheet',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves campaign performance was evaluated through downstream behavior, not just spend, leads, or CPL.',
    operationalSignal: 'Campaign reads combined Meta inputs with booked, arrived, converted, and revenue signals so decisions did not stop at lead volume or CPL.',
    receiptBodyType: 'campaignFormulaSheet',
    preview: {
      formulas: ['CPL', 'Booked', 'Show', 'Convert', 'ROAS'],
      rows: [
        { input: 'Meta', logic: 'Spend / Leads', output: 'calculated' },
        { input: 'CRM', logic: 'Booked / Leads', output: 'sample' },
        { input: 'Revenue', logic: 'Revenue / Spend', output: 'review' }
      ]
    },
    body: {
      formulas: [
        { name: 'CPL', expression: 'Spend / Leads' },
        { name: 'Booked Rate', expression: 'Booked Leads / Total Leads' },
        { name: 'Show Rate', expression: 'Arrived / Booked' },
        { name: 'Conversion Rate', expression: 'Converted / Arrived' },
        { name: 'ROAS', expression: 'Revenue / Spend' }
      ],
      modelRows: [
        {
          inputSource: 'Meta Ads',
          sourceMetric: 'Spend',
          normalizedField: 'spend',
          logic: 'source value',
          output: 'CPL + ROAS base'
        },
        {
          inputSource: 'Meta Ads',
          sourceMetric: 'Leads',
          normalizedField: 'lead_count',
          logic: 'source value',
          output: 'lead volume'
        },
        {
          inputSource: 'Airtable',
          sourceMetric: 'Booked',
          normalizedField: 'booked_leads',
          logic: 'booked = yes',
          output: 'booked rate'
        },
        {
          inputSource: 'Airtable',
          sourceMetric: 'Arrived',
          normalizedField: 'arrivals',
          logic: 'arrived = yes',
          output: 'show rate'
        },
        {
          inputSource: 'Airtable',
          sourceMetric: 'Converted',
          normalizedField: 'conversions',
          logic: 'converted = yes',
          output: 'conversion rate'
        },
        {
          inputSource: 'Airtable',
          sourceMetric: 'Revenue Value',
          normalizedField: 'revenue',
          logic: 'sum revenue value',
          output: 'ROAS'
        }
      ],
      decisionRules: [
        'IF high CPL + low booked rate -> creative or offer mismatch',
        'IF low CPL + low show rate -> lead quality issue',
        'IF high booked rate + high conversion -> scale candidate',
        'IF high spend + unclear revenue -> attribution review'
      ],
      campaignRows: [
        { row: 'Campaign 001', signal: 'front end volume present, booking signal mixed', status: 'sample', decision: 'review follow up' },
        { row: 'Campaign 002', signal: 'booking and conversion signal aligned', status: 'calculated', decision: 'scale candidate' },
        { row: 'Campaign 003', signal: 'revenue context incomplete', status: 'review', decision: 'attribution check' }
      ],
      ledgerRows: [
        { campaign: 'Microneedling Acne Scars', service: 'Microneedling', cpl: 'calculated', booked: 'sample', arrived: 'review', converted: 'pending', decision: 'improve nurture' },
        { campaign: 'Hydrafacial First Time Offer', service: 'Hydrafacial', cpl: 'calculated', booked: 'sample', arrived: 'sample', converted: 'sample', decision: 'maintain' },
        { campaign: 'Dr. Vigor Lab Panel', service: 'Lab Panel', cpl: 'review', booked: 'sample', arrived: 'sample', converted: 'review', decision: 'scale candidate' }
      ]
    },
    footerNote:
      'Campaign performance was read through lead quality, booking movement, and revenue context, not only a platform metric screenshot.'
  },
  'meta-revenue-attribution-model': {
    receiptNumber: '03',
    title: 'Revenue_Attribution Model',
    type: 'Attribution trace',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves revenue was mapped back to campaigns with confidence levels instead of fake certainty.',
    operationalSignal: 'Revenue was linked through source match, lead match, and outcome evidence, then labeled by attribution confidence.',
    receiptBodyType: 'attributionTrace',
    preview: {
      nodes: ['Meta Campaign', 'Lead Record', 'Booked', 'Arrived', 'Converted', 'Revenue', 'Confidence'],
      branch: 'manual review'
    },
    body: {
      path: ['Meta Campaign', 'Lead Record', 'CRM Status', 'Booked', 'Arrived', 'Converted', 'Revenue Value', 'Attribution Confidence'],
      evidenceChain: [
        { title: 'Meta Campaign', match: 'present', field: 'campaign_id' },
        { title: 'Lead Record', match: 'contact match', field: 'phone/email' },
        { title: 'CRM Status', match: 'synced', field: 'status' },
        { title: 'Booked', match: 'yes', field: 'booked' },
        { title: 'Arrived', match: 'checked', field: 'arrived' },
        { title: 'Converted', match: 'checked', field: 'converted' },
        { title: 'Revenue Value', match: 'attached', field: 'revenue_value' },
        { title: 'Attribution Confidence', match: 'assigned', field: 'confidence' }
      ],
      reviewBranch: [
        { title: 'Manual Lead', match: 'manual source', field: 'lead_source' },
        { title: 'Missing Campaign', match: 'not found', field: 'campaign_id' },
        { title: 'Revenue Present', match: 'attached', field: 'revenue_value' },
        { title: 'Confidence: Review', match: 'review', field: 'manual_review_flag' }
      ],
      matchChecks: [
        { label: 'Source match', value: 'campaign source present' },
        { label: 'Lead match', value: 'lead record matched' },
        { label: 'Outcome match', value: 'conversion status checked' },
        { label: 'Confidence result', value: 'high, medium, low, or manual review' }
      ],
      confidenceRules: [
        {
          level: 'High',
          rule: 'source present + lead matched + converted + revenue value'
        },
        {
          level: 'Medium',
          rule: 'source present + lead matched + booking/arrival + revenue pending'
        },
        {
          level: 'Low',
          rule: 'manual source or missing campaign'
        },
        {
          level: 'Review',
          rule: 'duplicate lead or revenue without source'
        }
      ],
      traceExamples: [
        {
          label: 'Clean path',
          steps: ['Meta Lead Form', 'Leads_Master', 'booked', 'arrived', 'converted', 'revenue attached'],
          result: 'confidence high'
        },
        {
          label: 'Review path',
          steps: ['Manual lead', 'missing campaign', 'revenue present'],
          result: 'confidence review'
        }
      ]
    },
    footerNote:
      'Attribution used confidence levels and review conditions instead of pretending every revenue event mapped perfectly.'
  },
  'meta-decision-dashboard-ui': {
    receiptNumber: '04',
    title: 'Decision Dashboard UI',
    type: 'Decision queue console',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves scattered campaign, CRM, and revenue signals became action categories like scale, maintain, review, and fix tracking.',
    operationalSignal: 'The interface grouped scale, maintain, review, and tracking-repair actions from the same campaign evidence.',
    receiptBodyType: 'decisionQueueConsole',
    preview: {
      sections: [
        { label: 'Scale', detail: 'strong conversion signal', color: '#b6f3d4' },
        { label: 'Maintain', detail: 'front end offer stable', color: '#b6f3d4' },
        { label: 'Review', detail: 'booking signal mixed', color: '#c7b2ff' },
        { label: 'Fix Tracking', detail: 'revenue missing', color: '#c7b2ff' }
      ]
    },
    body: {
      signalStrip: [
        { label: 'Can Scale', phrase: 'strong conversion signal' },
        { label: 'Needs Review', phrase: 'booking signal mixed' },
        { label: 'Tracking Repair', phrase: 'revenue missing' },
        { label: 'Follow Up Risk', phrase: 'follow up overdue' }
      ],
      queue: [
        {
          campaign: 'Microneedling Acne Scars',
          primaryIssue: 'booking review needed',
          evidence: 'CPL healthy, booked rate mixed',
          recommendedAction: 'audit follow-up sequence',
          confidence: 'Medium'
        },
        {
          campaign: 'Hydrafacial First Time Offer',
          primaryIssue: 'front-end offer stable',
          evidence: 'Strong inquiry volume',
          recommendedAction: 'maintain + refresh creative',
          confidence: 'High'
        },
        {
          campaign: 'Dr. Vigor Lab Panel',
          primaryIssue: 'high-intent offer',
          evidence: 'Bookings clustered',
          recommendedAction: 'scale carefully',
          confidence: 'Medium'
        },
        {
          campaign: 'Dr. Neo Hair Consult',
          primaryIssue: 'higher consideration service',
          evidence: 'education gap',
          recommendedAction: 'improve nurture content',
          confidence: 'Medium'
        }
      ],
      operationsQueue: [
        'Follow up overdue',
        'Revenue missing',
        'Manual attribution review',
        'Creative refresh needed'
      ],
      decisionLegend: [
        'scale',
        'maintain',
        'review',
        'fix tracking',
        'refresh creative',
        'improve nurture'
      ]
    },
    footerNote:
      'The dashboard translated Meta, Airtable, CRM, and revenue context into next actions instead of passive reporting.'
  }
};

export function getMetaAirtableReceiptVisual(componentKey) {
  return metaAirtableReceiptVisuals[componentKey] ?? null;
}
