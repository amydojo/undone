from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def replace(path, old, new, count=-1):
    p = ROOT / path
    text = p.read_text()
    if old not in text:
        raise RuntimeError(f'Missing expected text in {path}: {old[:100]!r}')
    text = text.replace(old, new, count)
    p.write_text(text)


def regex_replace(path, pattern, replacement, count=0):
    p = ROOT / path
    text = p.read_text()
    updated, matches = re.subn(pattern, replacement, text, count=count, flags=re.S)
    if matches == 0:
        raise RuntimeError(f'Pattern not found in {path}: {pattern[:100]!r}')
    p.write_text(updated)

records = 'src/data/records.js'

# Editorial metadata and broad hiring-relevant filters.
replace(records, "  title: 'Interface Behavior Lab',\n", "  title: 'Interface Behavior Lab',\n  displayTitle: 'Interface Behavior Lab',\n  featured: true,\n  filters: ['interaction', 'product'],\n", 1)
replace(records, "    title: 'Smooth MD Clinic Growth System',\n", "    title: 'Smooth MD Clinic Growth System',\n    displayTitle: 'Clinic Growth OS',\n    featured: true,\n    filters: ['growth'],\n", 1)
replace(records, "    title: 'Mirror',\n", "    title: 'Mirror',\n    displayTitle: 'Mirror',\n    featured: true,\n    filters: ['product', 'interaction'],\n", 1)
replace(records, "    title: 'Meta + Airtable Campaign Reporting System',\n", "    title: 'Meta + Airtable Campaign Reporting System',\n    displayTitle: 'Campaign Intelligence',\n    featured: false,\n    filters: ['automation', 'growth'],\n", 1)
replace(records, "    title: 'Snip Snip Provider Profile Workflow',\n", "    title: 'Snip Snip Provider Profile Workflow',\n    displayTitle: 'Provider Profile Pipeline',\n    featured: true,\n    filters: ['automation', 'product'],\n", 1)
replace(records, "    title: 'Multi-Brand Email Follow-Up System',\n", "    title: 'Multi-Brand Email Follow-Up System',\n    displayTitle: 'Retention Router',\n    featured: false,\n    archiveGroup: 'more-work',\n    filters: ['growth', 'automation'],\n", 1)

# Mirror: show input and response in the overview and lead with product experience.
old_mirror_visual = """    overviewVisual: {
      label: 'PRODUCT SURFACE',
      caption: 'Check-in signals translated into a readable weather field.',
      layout: 'single',
      display: 'productSingle',
      images: [
        {
          src: '/overview/mirror-weather-field.png',
          alt: \"Mirror Weather Field interface showing a dark texture field used to describe the user's current state.\",
          role: 'primary'
        }
      ]
    },"""
new_mirror_visual = """    overviewVisual: {
      label: 'PRODUCT EXPERIENCE',
      caption: 'A lightweight check-in becomes a readable state, a plain-language explanation, and one gentle next move.',
      layout: 'split',
      display: 'productSplit',
      images: [
        {
          src: '/overview/mirror-checkin-flow.svg',
          alt: 'Mirror check-in interface showing mood, sleep, clarity, and context inputs before interpretation.',
          role: 'primary',
          position: 'center center'
        },
        {
          src: '/overview/mirror-weather-field.png',
          alt: \"Mirror Weather Field interface showing a dark texture field used to describe the user's current state.\",
          role: 'secondary',
          position: 'center center'
        }
      ]
    },"""
replace(records, old_mirror_visual, new_mirror_visual, 1)

# Mirror receipt hierarchy: surface -> model -> engine -> QA.
replace(records, "id: 'signal-interpretation-map',\n        testId: 'mirror-signal-interpretation-map',\n        name: 'Signal Interpretation Engine',\n        format: 'logic diagram',", "id: 'check-in-experience',\n        testId: 'mirror-check-in-experience',\n        name: 'The Check-In Experience',\n        format: 'product flow',", 1)
replace(records, "claim: 'Proves Mirror turns mood, sleep, clarity, and tension/context into readable product states before any suggestion is shown.',\n        proof: 'Input model, normalization, state detection order, confidence language, similar-day context, and one gentle next move in one logic diagram.',\n        contents: ['mood', 'sleep', 'clarity', 'tension/context', 'normalization', 'state detection', 'confidence', 'gentle next move'],", "claim: 'Proves the user can move from a lightweight self-report to a readable result and one gentle next move.',\n        proof: 'Mood, sleep, clarity, and context inputs resolve into a named Body Weather state, a plain-language explanation, and one low-friction suggestion.',\n        contents: ['mood', 'sleep', 'clarity', 'context', 'submit state', 'Body Weather result', 'why this reading', 'gentle next move'],", 1)
replace(records, "componentKey: 'signal-interpretation-map'", "componentKey: 'body-weather-state-system'", 1)
replace(records, "id: 'body-weather-state-system',\n        testId: 'mirror-body-weather-state-system',\n        name: 'Body Weather State System',", "id: 'body-weather-state-system',\n        testId: 'mirror-body-weather-state-system',\n        name: 'Body Weather State System',", 1)
replace(records, "componentKey: 'body-weather-state-system'", "componentKey: 'signal-interpretation-map'", 1)
replace(records, "name: 'Debug Overlay + Test Bench',\n        format: 'QA artifact',", "name: 'Testing Emotional Edge Cases',\n        format: 'QA and safety artifact',", 1)
replace(records, "claim: 'Proves the system was testable and inspectable during development.',", "claim: 'Proves conflicting signals, uncertainty language, sensitive copy, and component behavior were tested as product states rather than left to intuition.',", 1)
replace(records, "name: 'Storybook Component Environment',\n        format: 'component catalog',", "name: 'Storybook Component Environment',\n        format: 'component catalog',", 1)

# Smooth MD: consolidate lifecycle and CRM into one receipt and retain four distinct evidence types.
replace(records, "name: 'Smooth MD brand framework',", "name: 'Clinic Growth Operating System',", 1)
replace(records, "name: 'Lifecycle map',\n        format: 'journey flow',", "name: 'Patient Lifecycle and CRM Routing',\n        format: 'journey and operations flow',", 1)
replace(records, "claim: 'Proves lead source, service intent, consult path, follow-up timing, treatment state, retention, and reactivation were mapped as one patient journey.',", "claim: 'Proves lead source, service intent, consult path, follow-up timing, CRM state, booking behavior, revenue handoff, retention, and reactivation were mapped as one operating route.',", 1)
replace(records, "proof: 'Welcome, service interest, consult CTA, two-day follow-up, provider-name follow-up, and Day 21 reactivation paths connected to CRM and lifecycle routing.',", "proof: 'Acquisition, qualification, consult, follow-up, booked, no-show, arrived, converted, revenue handoff, retention, and reactivation states share one patient route.',", 1)
replace(records, "contents: ['Meta lead', 'website lead', 'Instagram inquiry', 'consult CTA', '2-day follow-up', 'Day 21 reactivation', 'retention logic'],", "contents: ['lead source', 'service intent', 'consult CTA', 'follow-up timing', 'booked', 'no-show', 'arrived', 'converted', 'revenue handoff', 'reactivation'],", 1)
regex_replace(records, r"\n      \{\n        id: 'crm-status-logic'.*?\n      \},(?=\n      \{\n        id: 'instagram-identity-rebuild')", "", 1)
replace(records, "name: 'Campaign toolkit',", "name: 'Campaign Toolkit and Performance',", 1)

# Meta + Airtable: replace platform labels with defensible system scale and decision proof.
replace(records, "      { value: 'Meta', label: 'AD PLATFORM' },\n      { value: 'CRM', label: 'BOOKING STATUS' },\n      { value: 'ROAS', label: 'CAMPAIGN READ' }", "      { value: '31', label: 'shared lead fields' },\n      { value: '4', label: 'decision queues' },\n      { value: '1', label: 'linked record model' }", 1)
replace(records, "nextProof: ['Add campaign dashboard screenshot', 'Add Meta ads performance view', 'Add revenue attribution table snapshot'],", "nextProof: ['Shared Lead Record', 'Campaign Performance Logic', 'Campaign-to-Revenue Trace', 'Decision Case: Scale, Review, or Repair'],", 1)
replace(records, "name: 'Revenue_Attribution model',", "name: 'Campaign-to-Revenue Trace',", 1)
replace(records, "name: 'Decision dashboard UI',", "name: 'Decision Case: Scale, Review, or Repair',", 1)
replace(records, "claim: 'Proves scattered campaign, CRM, and revenue signals became action categories like scale, maintain, review, and fix tracking.',", "claim: 'Proves a campaign decision can be traced from front-end metrics through booking behavior, attribution confidence, and the next operational action.',", 1)
replace(records, "proof: 'The dashboard grouped evidence into operational queues so campaign conversations could move from reporting to next action.',", "proof: 'Sanitized campaign evidence resolves into Scale, Maintain, Review, or Repair Tracking instead of ending with a dashboard metric.',", 1)

# Export a deliberate order without moving the source objects around.
old_export = """export const records = [interfaceBehaviorLabRecord, ...existingRecords].map((item, index) => ({
  ...item,
  id: String(index + 1).padStart(2, '0')
}))

export const filters = ['all', 'interaction systems', 'brand systems', 'product ux', 'campaign reporting', 'email follow-up', 'provider systems']"""
new_export = """const editorialOrder = [
  'mirror',
  'snip-provider-pipeline',
  'smooth-md-growth-os',
  'meta-airtable-dashboard',
  'multi-brand-retention',
  'guardrail-hr'
]

const orderedExistingRecords = editorialOrder
  .map((slug) => existingRecords.find((record) => record.slug === slug))
  .filter(Boolean)

export const records = [interfaceBehaviorLabRecord, ...orderedExistingRecords].map((item, index) => ({
  ...item,
  id: String(index + 1).padStart(2, '0')
}))

export const filters = ['featured', 'product', 'interaction', 'automation', 'growth', 'all']"""
replace(records, old_export, new_export, 1)

# Filter behavior and default featured view.
undone = 'src/components/portfolio/UndonePortfolio.jsx'
replace(undone, '  const [activeFilter, setActiveFilter] = useState("all");', '  const [activeFilter, setActiveFilter] = useState("featured");', 1)
replace(undone, "      const matchesFilter = activeFilter === \"all\" || record.category === activeFilter;\n      return matchesFilter;", "      if (activeFilter === 'all') return true;\n      if (activeFilter === 'featured') return record.featured === true;\n      return record.filters?.includes(activeFilter) === true;", 1)
replace(undone, '    setActiveFilter("all");', '    setActiveFilter("featured");', 1)

# Short rail titles only. Full case titles remain in the canvas and workspace.
for path in ['src/components/portfolio/RecordRail.jsx', 'src/components/portfolio/MobileRecordSelector.jsx']:
    replace(path, 'record.title}', 'record.displayTitle ?? record.title}', -1)
    replace(path, '${record.title}', '${record.displayTitle ?? record.title}', -1)
replace('src/components/portfolio/MobileRecordSelector.jsx', '{activeRecord.title}', '{activeRecord.displayTitle ?? activeRecord.title}', -1)

# Quiet first-time orientation copy.
replace('src/components/portfolio/OrientationHint.jsx', '    title: "Choose a case file.",\n    detail: "Then open receipts on the right.",', '    title: "Select a case.",\n    detail: "Inspect the proof, or open the full system.",', 1)
replace('src/components/portfolio/OrientationHint.jsx', '    title: "Switch files here.",\n    detail: "Receipts are in the next tab.",', '    title: "Select a case here.",\n    detail: "Inspect proof in the Receipts tab.",', 1)

# Mirror visual definitions follow the new surface -> model -> engine -> QA hierarchy.
mirror_defs = 'src/data/mirrorReceiptVisuals.js'
replace(mirror_defs, "'signal-interpretation-map': {\n    receiptNumber: '01',", "'signal-interpretation-map': {\n    receiptNumber: '03',", 1)
replace(mirror_defs, "'body-weather-state-system': {\n    receiptNumber: '02',\n    title: 'Body Weather State System',", "'body-weather-state-system': {\n    receiptNumber: '01',\n    title: 'The Check-In Experience',", 1)
replace(mirror_defs, "claim: 'Proves the product has a human-readable mental model instead of random mood labels.',", "claim: 'Proves a lightweight self-report resolves into a named state, a plain explanation, and one gentle next move.',", 1)
replace(mirror_defs, "'debug-overlay-test-bench': {\n    receiptNumber: '03',\n    title: 'Debug Overlay + Test Bench',", "'debug-overlay-test-bench': {\n    receiptNumber: '04',\n    title: 'Testing Emotional Edge Cases',", 1)
replace(mirror_defs, "claim: 'Proves the system was testable and inspectable during development.',", "claim: 'Proves conflicting signals, uncertainty language, safety copy, and state behavior were tested explicitly.',", 1)
replace(mirror_defs, "'storybook-component-environment': {\n    receiptNumber: '04',", "'storybook-component-environment': {\n    receiptNumber: '02',", 1)
replace(mirror_defs, "title: 'Storybook Component Environment',", "title: 'Body Weather State System',", 1)

# Smooth receipt definitions: four integrated receipts.
smooth_defs = 'src/data/smoothMdReceiptVisuals.js'
replace(smooth_defs, "title: 'Smooth MD brand framework',", "title: 'Clinic Growth Operating System',", 1)
replace(smooth_defs, "title: 'Lifecycle map',", "title: 'Patient Lifecycle and CRM Routing',", 1)
replace(smooth_defs, "type: 'Journey flow',", "type: 'Journey and operations flow',", 1)
replace(smooth_defs, "claim: 'Proves lead source, service intent, consult path, follow-up timing, treatment state, retention, and reactivation were mapped as one patient journey.',", "claim: 'Proves acquisition, consult, follow-up, CRM movement, booking, revenue handoff, retention, and reactivation were mapped as one route.',", 1)
replace(smooth_defs, "'smooth-md-instagram-identity-rebuild': {\n    receiptNumber: '04',", "'smooth-md-instagram-identity-rebuild': {\n    receiptNumber: '03',", 1)
replace(smooth_defs, "'smooth-md-campaign-toolkit': {\n    receiptNumber: '05',\n    title: 'Campaign toolkit',", "'smooth-md-campaign-toolkit': {\n    receiptNumber: '04',\n    title: 'Campaign Toolkit and Performance',", 1)

# Meta definitions emphasize traceability and decisions.
meta_defs = 'src/data/metaAirtableReceiptVisuals.js'
replace(meta_defs, "title: 'Revenue_Attribution Model',", "title: 'Campaign-to-Revenue Trace',", 1)
replace(meta_defs, "title: 'Decision Dashboard UI',", "title: 'Decision Case: Scale, Review, or Repair',", 1)
replace(meta_defs, "claim: 'Proves scattered campaign, CRM, and revenue signals became action categories like scale, maintain, review, and fix tracking.',", "claim: 'Proves one campaign decision can be traced from front-end performance through booking behavior, attribution confidence, and the next action.',", 1)

print('Portfolio editorial refinement applied.')
