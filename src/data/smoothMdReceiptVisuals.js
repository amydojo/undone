const imageBase = '/receipts/smooth-md';

export const smoothMdReceiptVisuals = {
  'smooth-md-brand-framework': {
    receiptNumber: '01',
    title: 'Smooth MD brand framework',
    type: 'Strategy system',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves the brand work covered positioning, service hierarchy, offer logic, trust language, and visual rules in one reusable framework.',
    operationalSignal: 'Service hierarchy, consult language, visual rules, offer logic, and campaign decisions were connected to the same clinic model.',
    receiptBodyType: 'brandSystemMap',
    preview: {
      nodes: ['positioning', 'service hierarchy', 'offer logic', 'trust signals', 'visual rules', 'proof pillars']
    },
    body: {
      positioning: {
        from: 'generic medspa service promos',
        to: 'skin + laser operating brand',
        role: 'brand rules that could guide ads, consult language, service pages, Instagram proof, and follow-up expectations'
      },
      serviceHierarchy: ['Skin health', 'Laser', 'Injectables', 'Body', 'Membership', 'Wellness add-ons'],
      trustLanguage: ['expert care', 'transparent pricing', 'real treatment proof', 'local clinic credibility', 'complimentary consult path'],
      offerArchitecture: ['first-time offer', 'member pricing', 'seasonal campaign', 'service-specific lead magnet', 'follow-up path'],
      visualRules: ['clinical minimal', 'high contrast typography', 'macro treatment proof', 'real patient/provider context', 'no generic beauty-stock language'],
      proofPillars: ['service clarity', 'local trust', 'treatment education', 'conversion path', 'retention logic'],
      proofTiles: [
        {
          src: `${imageBase}/brand-framework/grid-color-concept.jpeg`,
          label: 'grid rules',
          caption: 'Content categories for product, lifestyle, motivational, detail, community, and proof-led posts.'
        },
        {
          src: `${imageBase}/brand-framework/ambassador-claudia.jpeg`,
          label: 'patient context',
          caption: 'Ambassador asset tying treatment, concern, location, and service context into one proof card.'
        }
      ]
    },
    footerNote:
      "Smooth MD's identity became reusable brand and offer rules, not a one-off campaign look."
  },
  'smooth-md-lifecycle-map': {
    receiptNumber: '02',
    title: 'Lifecycle map',
    type: 'Journey flow',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves lead source, service intent, consult path, follow-up timing, treatment state, retention, and reactivation were mapped as one patient journey.',
    operationalSignal: 'Lead source, service intent, consult CTA, follow-up timing, booking behavior, and retention logic were treated as one connected route.',
    receiptBodyType: 'lifecycleJourneyMap',
    preview: {
      steps: ['Meta/Website lead', 'service interest', 'consult', 'follow-up', 'booked', 'treated', 'retained']
    },
    body: {
      stages: [
        {
          name: 'Acquisition',
          items: ['Meta lead', 'website lead', 'Instagram inquiry', 'promo interest'],
          trigger: 'source captured',
          handoff: 'Airtable'
        },
        {
          name: 'Qualification',
          items: ['brand', 'service interest', 'location', 'concern', 'offer claimed'],
          trigger: 'intent tagged',
          handoff: 'CRM state'
        },
        {
          name: 'Consult path',
          items: ['complimentary consult CTA', 'front desk follow-up', 'provider context', 'booking prompt'],
          trigger: 'consult interest',
          handoff: 'front desk follow-up'
        },
        {
          name: 'Follow-up timing',
          items: ['new lead follow-up', '2-day follow-up', 'provider-name follow-up', 'Day 21 reactivation'],
          trigger: 'time window',
          handoff: 'Mailchimp tag'
        },
        {
          name: 'Treatment state',
          items: ['booked', 'arrived', 'treated', 'converted', 'package/membership opportunity'],
          trigger: 'appointment movement',
          handoff: 'CRM update'
        },
        {
          name: 'Retention',
          items: ['membership', 'birthday Hydrafacial', 'service sequence', 'seasonal promo'],
          trigger: 'relationship stage',
          handoff: 'service tag'
        },
        {
          name: 'Reactivation',
          items: ['still interested offer', 'service education', 'new promo', 'follow-up list'],
          trigger: 'inactive or incomplete path',
          handoff: 'campaign retargeting'
        }
      ],
      handoffs: ['Airtable', 'Mailchimp tag', 'front desk follow-up', 'campaign retargeting']
    },
    footerNote:
      'Lead source, service intent, consult path, follow-up timing, booking behavior, retention, and reactivation were connected in one route.'
  },
  'smooth-md-crm-status-logic': {
    receiptNumber: '03',
    title: 'CRM status logic',
    type: 'Ops map',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves follow-up, booking state, arrival, conversion, and revenue handoff were defined as repeatable clinic operations.',
    operationalSignal: 'Follow-up and booking work moved through named states with clear side paths for no-show, lost, reactivation, manual review, and revenue handoff.',
    receiptBodyType: 'crmStatusFlow',
    preview: {
      core: ['new', 'contacted', 'booked', 'arrived', 'converted'],
      branches: ['no-show', 'lost', 'reactivation', 'review']
    },
    body: {
      fields: ['lead source', 'service interest', 'follow-up date', 'owner/front desk', 'booked date', 'arrived', 'converted', 'revenue value', 'attribution confidence or review'],
      coreStates: ['New lead', 'Contacted', 'Interested', 'Booked', 'Confirmed', 'Arrived', 'Converted', 'Revenue handoff'],
      sideStates: ['No-show', 'Lost', 'Reactivation', 'Manual review'],
      rules: [
        { from: 'New lead', condition: 'new source or inquiry', action: 'follow up' },
        { from: 'Not closed after 2 days', condition: 'no booking state', action: 'second follow-up' },
        { from: 'Booked but not arrived', condition: 'appointment pending', action: 'appointment status' },
        { from: 'No-show or lost', condition: 'incomplete journey', action: 'reactivation path' },
        { from: 'Converted', condition: 'treatment outcome recorded', action: 'revenue handoff' }
      ]
    },
    footerNote:
      "Smooth MD's follow-up and booking work became named CRM states instead of ad hoc lead handling."
  },
  'smooth-md-instagram-identity-rebuild': {
    receiptNumber: '04',
    title: 'Instagram identity rebuild',
    type: 'Visual system',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves Instagram moved from generic medspa promotion to clearer service proof, local trust signals, and inquiry behavior.',
    operationalSignal: 'Profile, grid, content proof, service clarity, local trust, and contact signals were rebuilt as one public-facing proof system.',
    receiptBodyType: 'instagramRebuildProof',
    preview: {
      labels: ['before profile', 'after profile', 'grid evolution', 'message/contact proof', 'follower movement']
    },
    body: {
      before: {
        title: 'Before state',
        points: ['generic medspa positioning', 'low content depth', 'limited service clarity', 'weak local trust signals'],
        images: [
          { src: `${imageBase}/instagram-identity-rebuild/instagram-before-profile.jpeg`, label: 'before profile' },
          { src: `${imageBase}/instagram-identity-rebuild/instagram-before-grid.jpeg`, label: 'before grid' }
        ]
      },
      after: {
        title: 'After state',
        points: ['skin + laser positioning', 'clearer service hierarchy', 'location/trust signals', 'bookable consult path', 'treatment proof'],
        images: [
          { src: `${imageBase}/instagram-identity-rebuild/instagram-after-profile.jpeg`, label: 'after profile' },
          { src: `${imageBase}/instagram-identity-rebuild/instagram-after-grid.jpeg`, label: 'after grid' }
        ]
      },
      contentSystem: ['service proof', 'education', 'before/after', 'provider credibility', 'offer clarity', 'community proof'],
      performanceSignals: [
        { label: 'Follower movement', value: '57 -> 2,043', source: 'profile screenshot evidence' },
        { label: 'Views', value: '124.6K', source: 'insights screenshot evidence' },
        { label: 'Messaging contacts', value: '93', source: 'insights screenshot evidence' },
        { label: 'Follows', value: '145', source: 'insights screenshot evidence' }
      ],
      insightImage: `${imageBase}/instagram-identity-rebuild/messaging-metric-insight.jpeg`
    },
    footerNote:
      'The Instagram rebuild connected identity clarity, service proof, local trust, and inquiry behavior instead of only changing aesthetics.'
  },
  'smooth-md-campaign-toolkit': {
    receiptNumber: '05',
    title: 'Campaign toolkit',
    type: 'Creative system',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    claim: 'Proves campaigns were built from reusable offer logic, creative modules, CTA paths, lead capture, follow-up, and performance reads.',
    operationalSignal: 'Campaign assets were organized as a launch kit with offer logic, audience angle, capture path, follow-up path, and performance read.',
    receiptBodyType: 'campaignToolkitSystem',
    preview: {
      steps: ['offer', 'angle', 'creative', 'CTA', 'lead capture', 'follow-up', 'performance read']
    },
    body: {
      offerModule: ['service', 'price or promo', 'audience pain point', 'urgency/constraint', 'membership angle if relevant'],
      audienceAngles: ['first-time patient', 'acne scars', 'laser hair removal', 'skin health', 'body contouring', 'maintenance/retention'],
      creativeModules: ['headline', 'visual proof', 'treatment context', 'CTA', 'testimonial/proof if available'],
      capturePath: ['Meta form', 'website landing page', 'Instagram DM', 'Airtable lead record'],
      followUpPath: ['front desk text/call', 'Mailchimp service tag', 'welcome email', 'Day 21 promo/reactivation'],
      performanceRead: ['lead quality', 'booking rate', '3.2x ROAS on offer test', '+40% lead conversion lift', 'creative iteration'],
      proofTiles: [
        { src: `${imageBase}/campaign-toolkit/stretch-mark-meta-ad-preview.jpeg`, label: 'Stretch mark Meta ad' },
        { src: `${imageBase}/campaign-toolkit/hydrafacial-meta-ad-preview.jpeg`, label: 'Hydrafacial offer' },
        { src: `${imageBase}/campaign-toolkit/brazilian-laser-hair-removal-ad-preview.jpeg`, label: 'Laser hair removal ad' },
        { src: `${imageBase}/campaign-toolkit/hydrafacial-reset-tan-model.jpeg`, label: 'Hydrafacial reset asset' }
      ]
    },
    footerNote:
      'Campaigns became reusable launch kits with offer logic, creative structure, lead capture, follow-up paths, and performance reads.'
  }
};

export function getSmoothMdReceiptVisual(componentKey) {
  return smoothMdReceiptVisuals[componentKey] ?? null;
}
