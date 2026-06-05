export const multiBrandRetentionReceiptVisuals = {
  'multi-brand-lifecycle-flow-model': {
    receiptNumber: '01',
    title: 'Lifecycle Flow Model',
    type: 'Lifecycle router',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves welcome, service interest, abandonment-style, and weekly educational promo paths were routed by source, intent, service, timing, and booking readiness.',
    operationalSignal: 'Website leads, Meta leads, consult inquiries, and abandoned interest signals were separated by source, intent, service, timing, message, and booking readiness.',
    receiptBodyType: 'lifecycleFlowMap',
    preview: {
      routes: ['welcome', 'service interest', 'abandonment', 'weekly promo'],
      stages: ['source', 'intent', 'service', 'timing', 'message', 'booking']
    },
    body: {
      stages: ['source', 'intent', 'service', 'timing', 'message', 'booking'],
      flows: [
        {
          name: 'Welcome flow',
          source: 'website or Meta lead',
          intent: 'new inquiry',
          service: 'brand or service tagged',
          timing: 'entry sequence',
          message: 'trust + consult path',
          booking: 'front desk handoff'
        },
        {
          name: 'Service interest flow',
          source: 'service form or promo',
          intent: 'specific treatment interest',
          service: 'service tag',
          timing: 'interest window',
          message: 'education + offer context',
          booking: 'consult prompt'
        },
        {
          name: 'Abandonment-style flow',
          source: 'incomplete booking path',
          intent: 'interest without close',
          service: 'last known service',
          timing: 'follow-up window',
          message: 'still interested reminder',
          booking: 'return to consult'
        },
        {
          name: 'Weekly educational promo',
          source: 'active audience list',
          intent: 'retention or reactivation',
          service: 'brand campaign topic',
          timing: 'weekly cadence',
          message: 'education + promo',
          booking: 'bookable offer'
        }
      ],
      operatingRules: [
        'Passive Meta leads and higher-intent website leads do not receive the same first message.',
        'Service interest changes the copy, CTA, and follow-up expectation.',
        'Booking state controls whether the route nurtures, reminds, or excludes.',
        'Weekly promos reuse the same routing logic instead of restarting from blank campaigns.'
      ]
    },
    footerNote:
      'Lifecycle messaging was organized around source, intent, service, timing, message, and booking readiness.'
  },
  'multi-brand-mailchimp-routing-map': {
    receiptNumber: '02',
    title: 'Mailchimp Tag + Routing Map',
    type: 'CRM routing map',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves brand, service, source, CRM status, lead intent, and follow-up state were usable routing inputs.',
    operationalSignal: 'Smooth MD, Dr. Vigor, Dr. Neo, Dr. Food, Dr. Freeze, and Dr. Sculpt leads were kept readable through brand tags, service tags, source labels, CRM status, and follow-up state.',
    receiptBodyType: 'mailchimpRoutingMap',
    preview: {
      brands: ['Smooth MD', 'Dr. Vigor', 'Dr. Neo', 'Dr. Food', 'Dr. Freeze', 'Dr. Sculpt'],
      fields: ['brand', 'service', 'source', 'status', 'intent', 'follow-up']
    },
    body: {
      brands: ['Smooth MD', 'Dr. Vigor', 'Dr. Neo', 'Dr. Food', 'Dr. Freeze', 'Dr. Sculpt'],
      routingFields: [
        { field: 'Brand', type: 'brand tag', example: 'Smooth MD', usedFor: 'list separation' },
        { field: 'Service', type: 'service tag', example: 'laser or wellness', usedFor: 'message relevance' },
        { field: 'Source', type: 'source label', example: 'Meta or website', usedFor: 'intent split' },
        { field: 'Status', type: 'CRM state', example: 'new, booked, closed', usedFor: 'send eligibility' },
        { field: 'Lead intent', type: 'intent marker', example: 'consult or promo', usedFor: 'CTA path' },
        { field: 'Follow-up state', type: 'timing state', example: '2-day or Day 21', usedFor: 'sequence timing' }
      ],
      routeLanes: [
        { lane: 'Brand route', input: 'brand tag', output: 'brand-specific sender, offer context, and tone' },
        { lane: 'Service route', input: 'service interest', output: 'education module, proof module, and consult CTA' },
        { lane: 'Source route', input: 'Meta, website, or Instagram', output: 'intent calibration and first follow-up depth' },
        { lane: 'Status route', input: 'booked, lost, no response, closed', output: 'send, suppress, or reactivation path' }
      ],
      exclusionLogic: ['already booked', 'converted or closed', 'wrong brand tag', 'missing service intent']
    },
    footerNote:
      'Multi-brand nurture became sortable routing logic instead of one shared email list with loose labels.'
  },
  'multi-brand-follow-up-timing-protocol': {
    receiptNumber: '03',
    title: 'Follow-Up Timing Protocol',
    type: 'Timing rules',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves timing was handled with clear rules: 2-day follow-up, provider-named reminder, Day 21 reactivation, and status exclusions.',
    operationalSignal: 'Follow-up timing used status-based exclusions so booked or closed leads did not receive the wrong prompt.',
    receiptBodyType: 'followUpTimingRules',
    preview: {
      rules: ['new lead', '2-day', 'provider name', 'Day 21'],
      exclusions: ['booked', 'closed', 'wrong status']
    },
    body: {
      timeline: [
        {
          window: 'New lead',
          trigger: 'lead enters with brand/source/service context',
          action: 'welcome or consult path',
          guardrail: 'requires brand and service tag'
        },
        {
          window: '2-day follow-up',
          trigger: 'not closed after 2 days',
          action: 'second follow-up',
          guardrail: 'exclude booked or converted'
        },
        {
          window: 'Provider-named reminder',
          trigger: 'consult context present',
          action: 'personalized reminder path',
          guardrail: 'use provider context only when known'
        },
        {
          window: 'Day 21 reactivation',
          trigger: 'incomplete or dormant interest',
          action: 'promo or education reactivation',
          guardrail: 'exclude wrong brand, closed, or already booked'
        }
      ],
      states: ['new', 'not closed', 'booked', 'no response', 'converted', 'reactivation'],
      statusExclusions: ['booked', 'converted', 'closed', 'wrong brand tag', 'missing service interest'],
      handoffs: ['Mailchimp tag', 'Airtable status', 'front desk follow-up', 'campaign retargeting']
    },
    footerNote:
      'Timing became part of the routing rules, not just a calendar note inside campaign copy.'
  },
  'multi-brand-email-production-system': {
    receiptNumber: '04',
    title: 'Email Production System',
    type: 'Production template',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves email production used reusable Mailchimp modules and inbox-aware constraints instead of one-off campaign markup.',
    operationalSignal: 'Campaign emails were structured around a 600px wrapper, hybrid responsive layout, dark mode meta, VML Outlook support, and reusable Mailchimp modules.',
    receiptBodyType: 'emailProductionSystem',
    preview: {
      frame: ['600px', 'hybrid', 'dark mode', 'VML'],
      modules: ['hero', 'service proof', 'offer', 'CTA', 'footer']
    },
    body: {
      frameRules: [
        { rule: '600px wrapper', reason: 'predictable inbox width' },
        { rule: 'hybrid responsive layout', reason: 'mobile readability without fragile CSS' },
        { rule: 'dark mode meta', reason: 'protect brand contrast in dark clients' },
        { rule: 'VML Outlook support', reason: 'fallback behavior for Outlook rendering' },
        { rule: 'Mailchimp modules', reason: 'repeatable production blocks' }
      ],
      modules: [
        { module: 'Preheader', purpose: 'sets context before open', content: 'service or promo cue' },
        { module: 'Hero', purpose: 'anchors offer or education topic', content: 'brand-safe headline + visual slot' },
        { module: 'Service proof', purpose: 'ties message to treatment trust', content: 'benefit, concern, or proof note' },
        { module: 'CTA block', purpose: 'drives consult or booking path', content: 'book, reply, or learn more' },
        { module: 'Footer', purpose: 'keeps compliance and contact info stable', content: 'clinic details + unsubscribe' }
      ],
      productionChecks: ['mobile stack', 'dark mode contrast', 'Outlook fallback', 'Mailchimp editable fields', 'CTA path present'],
      reusableFor: ['welcome flow', 'service interest flow', 'weekly promo', 'reactivation message']
    },
    footerNote:
      'Email work used reusable lifecycle modules with production constraints, not one-off promotional HTML.'
  }
};

export function getMultiBrandRetentionReceiptVisual(componentKey) {
  return multiBrandRetentionReceiptVisuals[componentKey] ?? null;
}
