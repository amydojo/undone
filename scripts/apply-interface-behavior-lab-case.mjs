import fs from 'node:fs'
import path from 'node:path'

const read = (file) => fs.readFileSync(file, 'utf8')
const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}
const replaceOnce = (content, needle, replacement, file) => {
  if (!content.includes(needle)) throw new Error(`Missing patch anchor in ${file}: ${needle.slice(0, 90)}`)
  return content.replace(needle, replacement)
}

const record = `const interfaceBehaviorLabRecord = {
  id: '01',
  slug: 'interface-behavior-lab',
  title: 'Interface Behavior Lab',
  headline: 'A button should explain what happens next.',
  category: 'interaction systems',
  type: 'coded design system',
  status: 'live',
  timeline: '2026',
  accent: '#69dcff',
  oneLine: 'I designed a speculative control language, formalized it as a Figma system, and built a live React laboratory to test intention, pressure, attention, consequence, and recovery.',
  overviewVisual: {
    label: 'LIVE INTERACTION SYSTEM',
    caption: 'Six behavioral control families translated from speculative interaction research into reusable Figma components and a coded laboratory.',
    layout: 'split',
    display: 'behaviorSplit',
    images: [
      { src: '/overview/interface-behavior-spatial.svg', alt: 'Spatial mode of the Interface Behavior Lab showing an adaptive control and interaction field.', role: 'primary', position: 'center center' },
      { src: '/overview/interface-behavior-families.svg', alt: 'Six adaptive control families displayed in the coded laboratory.', role: 'secondary', position: 'center center' }
    ]
  },
  role: 'Interaction systems designer and design technologist',
  tools: ['Figma', 'React', 'TypeScript', 'Vite', 'CSS', 'GitHub Actions', 'Vercel'],
  hiringTranslation: 'This case demonstrates interaction systems thinking, accessible component architecture, Figma design-system construction, React and TypeScript prototyping, honest simulation boundaries, and production deployment.',
  links: [
    { label: 'Launch live lab', href: 'https://interface-behavior-lab.vercel.app', primary: true },
    { label: 'View GitHub', href: 'https://github.com/amydojo/interface-behavior-lab' },
    { label: 'Inspect Figma system', href: 'https://www.figma.com/design/4jIfeqwhalMPugSAuVtvSi' }
  ],
  metrics: [
    { value: '6', label: 'live control families' },
    { value: '46', label: 'Figma variants' },
    { value: '95', label: 'design variables' }
  ],
  path: ['question', 'behavior model', 'tokens', 'components', 'prototype', 'instrument'],
  signal: 'Conventional buttons make reversible, destructive, ambient, uncertain, and high consequence actions feel almost identical.',
  system: 'I created six behavioral control families connected by one action lifecycle, then translated the model into variables, accessible Figma components, written specifications, and a coded interaction laboratory.',
  owned: ['interaction model', 'design system architecture', 'component design', 'motion language', 'accessibility contract', 'React implementation', 'prototype instrumentation'],
  nextProof: ['Action Lifecycle Model', 'Adaptive Control Library', 'Accessibility Contract', 'Coded Playground and Instrumentation'],
  decisions: [
    { label: 'constraint', body: 'The browser cannot honestly reproduce physical pressure, validated gaze input, or platform haptics, and novel behavior could easily become misleading.' },
    { label: 'move', body: 'Represent every interaction as named states with stable targets, exact consequence language, and equivalent conventional input paths.' },
    { label: 'tradeoff', body: 'Simulate only the parts the browser can communicate honestly instead of creating theatrical effects that imply unsupported sensing.' },
    { label: 'principle', body: 'Adaptive behavior is optional. Understanding, accessibility, and user agency are required.' }
  ],
  receipts: [
    {
      id: 'action-lifecycle-model', testId: 'interface-behavior-action-lifecycle', name: 'Action Lifecycle Model', format: 'interaction model', status: 'ready',
      claim: 'Proves the six control families are connected moments in one action language rather than unrelated visual effects.',
      proof: 'Approach, Clarify, Weigh, Commit, Resolve, and Recover connect Magnetic, Intent, Ethical, Pressure, Breathing, and Reversible controls.',
      contents: ['Approach', 'Clarify', 'Weigh', 'Commit', 'Resolve', 'Recover', 'Magnetic', 'Intent', 'Ethical', 'Pressure', 'Breathing', 'Reversible'],
      visualAssets: [{ kind: 'component', componentKey: 'interface-behavior-action-lifecycle' }], artifacts: []
    },
    {
      id: 'adaptive-control-library', testId: 'interface-behavior-control-library', name: 'Adaptive Control Library', format: 'component system', status: 'ready',
      claim: 'Proves the speculative model was formalized as reusable components, variables, states, sizes, properties, and semantic materials.',
      proof: '95 variables, 46 variants, six families, three modes, M and L sizes, text properties, boolean properties, and semantic materials.',
      contents: ['95 variables', '46 variants', '6 families', '3 modes', 'M and L sizes', 'text properties', 'boolean properties', 'semantic materials'],
      visualAssets: [{ kind: 'component', componentKey: 'interface-behavior-control-library' }], artifacts: []
    },
    {
      id: 'accessibility-contract', testId: 'interface-behavior-accessibility', name: 'Accessibility Contract', format: 'interaction specification', status: 'ready',
      claim: 'Proves every novel behavior retains a stable target, named state, equivalent input path, reduced-motion substitute, and explicit consequence information.',
      proof: 'Touch, pointer, gaze, voice, and switch paths are paired with stable targets, named states, reduced motion, and recovery parity.',
      contents: ['touch', 'pointer', 'gaze', 'voice', 'switch', 'stable target', 'named state', 'equivalent path', 'reduced motion', 'recovery parity'],
      visualAssets: [{ kind: 'component', componentKey: 'interface-behavior-accessibility' }], artifacts: []
    },
    {
      id: 'coded-playground-instrumentation', testId: 'interface-behavior-playground', name: 'Coded Playground and Instrumentation', format: 'live prototype', status: 'ready',
      claim: 'Proves all six families were implemented in React and TypeScript with environment controls, responsive behavior, event logging, and honest browser simulation boundaries.',
      proof: 'Light, Dark, and Spatial modes, Reduce Motion, input modality, assistance strength, state logging, React, TypeScript, and Vercel deployment.',
      contents: ['Light mode', 'Dark mode', 'Spatial mode', 'Reduce Motion', 'input modality', 'assistance strength', 'state event log', 'React', 'TypeScript', 'Vercel'],
      visualAssets: [{ kind: 'component', componentKey: 'interface-behavior-playground' }], artifacts: []
    }
  ]
}
`

let records = read('src/data/records.js')
records = replaceOnce(records, 'export const records = [', `${record}\nconst existingRecords = [`, 'records.js')
records = replaceOnce(records, `]\n\nexport const filters = ['all',`, `]\n\nexport const records = [interfaceBehaviorLabRecord, ...existingRecords].map((item, index) => ({\n  ...item,\n  id: String(index + 1).padStart(2, '0')\n}))\n\nexport const filters = ['all', 'interaction systems',`, 'records.js')
write('src/data/records.js', records)

write('src/components/portfolio/CaseLinks.jsx', `import React from 'react'\nimport { ArrowUpRight } from 'lucide-react'\n\nexport default function CaseLinks({ links = [], compact = false }) {\n  if (!links.length) return null\n  return (\n    <div className={compact ? 'mt-4 flex flex-wrap gap-2' : 'mt-5 flex flex-wrap items-center gap-2.5'}>\n      {links.map((link) => (\n        <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer' aria-label={\`Open \${link.label} in a new tab\`}\n          className={link.primary\n            ? 'inline-flex min-h-11 items-center gap-2 rounded-full bg-[#11100d] px-4 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7] transition hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/24 focus-visible:ring-offset-2'\n            : 'inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#11100d]/12 bg-[#fffaf1]/64 px-3.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/58 transition hover:border-[#11100d]/24 hover:text-[#11100d]/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/18 focus-visible:ring-offset-2'}>\n          {link.label}<ArrowUpRight className='h-3 w-3' aria-hidden='true' />\n        </a>\n      ))}\n    </div>\n  )\n}\n`)

let active = read('src/components/portfolio/ActiveCanvas.jsx')
active = replaceOnce(active, 'import OverviewVisualPlate from "./OverviewVisualPlate";', 'import OverviewVisualPlate from "./OverviewVisualPlate";\nimport CaseLinks from "./CaseLinks";', 'ActiveCanvas.jsx')
active = replaceOnce(active, "const DECODER_LINES = {\n", "const DECODER_LINES = {\n  'interface-behavior-lab': 'Binary buttons → readable intent, consequence, state, assistance, and recovery.',\n", 'ActiveCanvas.jsx')
active = replaceOnce(active, '            <p className="mt-3 max-w-[500px] text-[14px] leading-[1.6] text-[#11100d]/38">\n              {record.oneLine}\n            </p>', '            <p className="mt-3 max-w-[500px] text-[14px] leading-[1.6] text-[#11100d]/38">\n              {record.oneLine}\n            </p>\n            <CaseLinks links={record.links} />', 'ActiveCanvas.jsx')
write('src/components/portfolio/ActiveCanvas.jsx', active)

let mobile = read('src/components/portfolio/MobileView.jsx')
mobile = replaceOnce(mobile, 'import OverviewVisualPlate from "./OverviewVisualPlate";', 'import OverviewVisualPlate from "./OverviewVisualPlate";\nimport CaseLinks from "./CaseLinks";', 'MobileView.jsx')
mobile = replaceOnce(mobile, "const DECODER_LINES = {\n", "const DECODER_LINES = {\n  'interface-behavior-lab': 'Binary buttons → readable intent, consequence, state, assistance, and recovery.',\n", 'MobileView.jsx')
mobile = replaceOnce(mobile, '        <p className="mt-2 max-w-[620px] text-[14px] leading-[1.55] text-[#11100d]/40">{record.oneLine}</p>', '        <p className="mt-2 max-w-[620px] text-[14px] leading-[1.55] text-[#11100d]/40">{record.oneLine}</p>\n        <CaseLinks links={record.links} compact />', 'MobileView.jsx')
write('src/components/portfolio/MobileView.jsx', mobile)

let overview = read('src/components/portfolio/OverviewVisualPlate.jsx')
overview = replaceOnce(overview, 'function getSplitGridClass(slug) {\n', 'function getSplitGridClass(slug) {\n  if (slug === "interface-behavior-lab") return "grid-cols-[minmax(0,1.45fr)_minmax(0,0.9fr)]";\n', 'OverviewVisualPlate.jsx')
overview = replaceOnce(overview, 'function getSplitThreshold(display) {\n', 'function getSplitThreshold(display) {\n  if (display === "behaviorSplit") return 820;\n', 'OverviewVisualPlate.jsx')
overview = replaceOnce(overview, 'function getSideBySideHeight(display, width) {\n  if (!width) return undefined;\n', 'function getSideBySideHeight(display, width) {\n  if (!width) return undefined;\n  if (display === "behaviorSplit") return Math.round(Math.min(520, Math.max(400, width * 0.52)));\n', 'OverviewVisualPlate.jsx')
overview = replaceOnce(overview, 'function getImageFrameClass({ layout, role, isSideBySide, display }) {\n', 'function getImageFrameClass({ layout, role, isSideBySide, display }) {\n  if (display === "behaviorSplit" && !isSideBySide) return role === "primary" ? "aspect-[1.8/1]" : "aspect-[1.45/1]";\n', 'OverviewVisualPlate.jsx')
write('src/components/portfolio/OverviewVisualPlate.jsx', overview)

let workspace = read('src/components/portfolio/CaseWorkspace.jsx')
workspace = replaceOnce(workspace, "import { useOverlayBehavior } from './useOverlayBehavior'", "import { useOverlayBehavior } from './useOverlayBehavior'\nimport CaseLinks from './CaseLinks'", 'CaseWorkspace.jsx')
workspace = replaceOnce(workspace, 'const SIDEBAR_CONTEXT_BY_SLUG = {\n', "const SIDEBAR_CONTEXT_BY_SLUG = {\n  'interface-behavior-lab': { type: 'Interaction System', scope: 'Behavior models, components, accessibility, and coded prototyping' },\n", 'CaseWorkspace.jsx')
workspace = replaceOnce(workspace, 'const CASE_COPY_BY_SLUG = {\n', "const CASE_COPY_BY_SLUG = {\n  'interface-behavior-lab': {\n    problem: 'Conventional controls compress very different intentions and consequences into the same binary interaction. A reversible archive action, a public post, an ambient listening state, and an irreversible deletion can all look and feel almost identical.',\n    systemIntro: 'I created six behavioral control families connected through one action lifecycle, then translated that model into semantic variables, reusable Figma components, accessibility rules, motion and haptic specifications, and a live coded laboratory.',\n    designMove: 'I treated behavior as semantic material rather than decoration. Changes in depth, specificity, rhythm, resistance, proximity, and recovery had to communicate meaningful state without moving the target or hiding the consequence.',\n    outcomeIntro: 'The project moved from a speculative question into a documented and implemented interaction system with 95 variables, 46 Figma variants, six live component families, accessible alternate paths, and a production deployment.'\n  },\n", 'CaseWorkspace.jsx')
workspace = replaceOnce(workspace, 'const SYSTEM_MODEL_BY_SLUG = {\n', "const SYSTEM_MODEL_BY_SLUG = {\n  'interface-behavior-lab': [\n    { label: 'Intent', meaning: 'Reveals exact consequence when specificity becomes necessary.' },\n    { label: 'Pressure', meaning: 'Translates staged input into preview, action, commitment, and recovery.' },\n    { label: 'Breathing', meaning: 'Communicates readiness, listening, processing, and completion through restrained rhythm.' },\n    { label: 'Magnetic', meaning: 'Reduces motor effort through a local assistance field while keeping the target stable.' },\n    { label: 'Ethical', meaning: 'Adds proportionate consequence information and resistance before high-impact actions.' },\n    { label: 'Reversible', meaning: 'Keeps recovery attached to the exact target where the action occurred.' }\n  ],\n", 'CaseWorkspace.jsx')
workspace = replaceOnce(workspace, 'const PROBLEM_CONTEXT_BY_SLUG = {\n', "const PROBLEM_CONTEXT_BY_SLUG = {\n  'interface-behavior-lab': {\n    before: ['binary controls for meaningfully different consequences', 'system activity communicated through generic spinners', 'destructive and reversible actions sharing similar interaction weight', 'novel input behaviors without explicit alternate paths'],\n    after: ['six behavioral control families connected by one action lifecycle', 'named states and exact consequence language', 'stable targets with keyboard, voice, touch, and switch alternatives', 'documented variables, component properties, accessibility rules, and live instrumentation']\n  },\n", 'CaseWorkspace.jsx')
workspace = replaceOnce(workspace, 'const OUTCOME_BY_SLUG = {\n', "const OUTCOME_BY_SLUG = {\n  'interface-behavior-lab': [\n    'A speculative interaction concept became a structured design language rather than a collection of visual effects.',\n    'The Figma system contains 95 variables, 46 variants, three semantic modes, and six reusable component families.',\n    'The React and TypeScript playground implements all six behaviors with responsive layouts, reduced motion, stable native controls, and event instrumentation.',\n    'Unsupported browser capabilities are presented as explicit simulations instead of being mislabeled as physical pressure, gaze, or haptic sensing.'\n  ],\n", 'CaseWorkspace.jsx')
workspace = replaceOnce(workspace, "          {workspace.slug === 'mirror' && <MirrorSupportLinks />}", "          {workspace.slug === 'mirror' && <MirrorSupportLinks />}\n          <CaseLinks links={workspace.links} />", 'CaseWorkspace.jsx')
write('src/components/portfolio/CaseWorkspace.jsx', workspace)

write('src/data/interfaceBehaviorLabReceiptVisuals.js', `const definitions = {\n  'interface-behavior-action-lifecycle': { receiptNumber: '01', title: 'Action Lifecycle Model', type: 'interaction model', claim: 'Six control families form one action language.', receiptBodyType: 'lifecycle', accentColor: '#69dcff' },\n  'interface-behavior-control-library': { receiptNumber: '02', title: 'Adaptive Control Library', type: 'component system', claim: 'A speculative model formalized as reusable design-system infrastructure.', receiptBodyType: 'library', accentColor: '#69dcff' },\n  'interface-behavior-accessibility': { receiptNumber: '03', title: 'Accessibility Contract', type: 'interaction specification', claim: 'Novel behavior remains optional while understanding remains required.', receiptBodyType: 'accessibility', accentColor: '#69dcff' },\n  'interface-behavior-playground': { receiptNumber: '04', title: 'Coded Playground and Instrumentation', type: 'live prototype', claim: 'All six behaviors implemented with explicit simulation boundaries.', receiptBodyType: 'playground', accentColor: '#69dcff' }\n}\nexport function getInterfaceBehaviorLabReceiptVisual(key) { return definitions[key] ?? null }\n`)

write('src/components/portfolio/receipt-visuals/InterfaceBehaviorLabReceiptVisual.jsx', `import React from 'react'\nconst accent = '#69dcff'\nconst lifecycle = [['APPROACH','Magnetic'],['CLARIFY','Intent'],['WEIGH','Ethical'],['COMMIT','Pressure'],['RESOLVE','Breathing'],['RECOVER','Reversible']]\nconst substitutions = [['Pressure','named stage controls'],['Hold','non-hold confirmation'],['Breathing motion','label and contrast'],['Magnetism','stable conventional target'],['Countdown','numeric time remaining']]\nfunction Shell({ title, type, claim, displayMode, children, ctaLabel }) {\n  if (displayMode === 'compact') return <article className='overflow-hidden rounded-[14px] border border-[#f7f1e7]/12 bg-[#0b0c0f] text-[#f7f1e7]'><div className='px-3.5 py-3'><div className='text-[8px] uppercase tracking-[0.16em] text-[#69dcff]'>{type}</div><h3 className='mt-2 text-[15px] leading-5'>{title}</h3><p className='mt-2 text-[10px] leading-4 text-[#f7f1e7]/52'>{claim}</p></div><div className='border-t border-[#f7f1e7]/12 px-3.5 py-2.5 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/52'>{ctaLabel}</div></article>\n  return <article className='w-full bg-[#090a0d] text-[#f7f1e7]'><header className='border-b border-[#f7f1e7]/12 px-5 py-4'><div className='text-[9px] uppercase tracking-[0.16em] text-[#69dcff]'>{type}</div><h3 className='mt-2 text-[24px] tracking-[-0.03em]'>{title}</h3><p className='mt-2 max-w-[720px] text-[12px] leading-5 text-[#f7f1e7]/58'>{claim}</p></header><div className='p-5'>{children}</div><footer className='border-t border-[#f7f1e7]/12 px-5 py-3 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/34'>Interface Behavior Lab · implemented research artifact</footer></article>\n}\nexport default function InterfaceBehaviorLabReceiptVisual(props) {\n  const { title, type, claim, receiptBodyType, displayMode='full', ctaLabel='Inspect receipt' } = props\n  let body\n  if (receiptBodyType === 'lifecycle') body=<div className='grid gap-2 md:grid-cols-6'>{lifecycle.map(([stage,family],i)=><div key={stage} className='relative rounded-[16px] border border-[#f7f1e7]/12 bg-[#111318] p-3'><div className='font-mono text-[8px] text-[#f7f1e7]/32'>{String(i+1).padStart(2,'0')}</div><div className='mt-5 text-[9px] tracking-[0.14em] text-[#f7f1e7]/46'>{stage}</div><div className='mt-3 text-[15px]'>{family}</div><div className='mt-4 h-px bg-[#69dcff]/50'/></div>)}</div>\n  else if (receiptBodyType === 'library') body=<div><div className='grid grid-cols-2 gap-2 md:grid-cols-4'>{[['95','variables'],['46','variants'],['6','families'],['3','modes']].map(([v,l])=><div key={l} className='rounded-[16px] border border-[#f7f1e7]/12 bg-[#111318] p-4'><div className='text-[30px] tracking-[-0.05em]' style={{color:accent}}>{v}</div><div className='mt-2 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/42'>{l}</div></div>)}</div><div className='mt-3 grid gap-2 md:grid-cols-4'>{['M + L sizes','text properties','boolean properties','semantic materials'].map(x=><div key={x} className='border-l border-[#69dcff]/55 pl-3 text-[11px] text-[#f7f1e7]/62'>{x}</div>)}</div></div>\n  else if (receiptBodyType === 'accessibility') body=<div className='grid gap-5 md:grid-cols-[.75fr_1.25fr]'><div className='grid grid-cols-5 gap-1'>{['touch','pointer','gaze','voice','switch'].map(x=><div key={x} className='rounded-[12px] border border-[#f7f1e7]/12 bg-[#111318] px-2 py-4 text-center text-[8px] uppercase tracking-[0.1em] text-[#69dcff]'>{x}</div>)}</div><div className='divide-y divide-[#f7f1e7]/10'>{substitutions.map(([a,b])=><div key={a} className='grid grid-cols-[130px_1fr] gap-4 py-2.5 text-[11px]'><span>{a}</span><span className='text-[#f7f1e7]/48'>→ {b}</span></div>)}</div></div>\n  else body=<div className='grid gap-4 md:grid-cols-[1.15fr_.85fr]'><div className='rounded-[18px] border border-[#f7f1e7]/12 bg-[#111318] p-4'><div className='flex flex-wrap gap-2'>{['Light','Dark','Spatial','Reduce Motion','Pointer','Voice','Switch'].map(x=><span key={x} className='rounded-full border border-[#f7f1e7]/12 px-2.5 py-1 text-[8px] text-[#f7f1e7]/52'>{x}</span>)}</div><div className='mt-8 rounded-full border border-[#69dcff]/45 bg-[#69dcff]/10 px-5 py-4'><div className='text-[13px]'>Continue with intent</div><div className='mt-1 text-[8px] tracking-[0.14em] text-[#f7f1e7]/42'>STATE · REVEALED</div></div></div><div className='rounded-[18px] border border-[#f7f1e7]/12 bg-[#111318] p-4'><div className='text-[8px] uppercase tracking-[0.14em] text-[#f7f1e7]/36'>Event log</div>{['Intent · revealed','Ethical · consequence shown','Reversible · undo opened'].map(x=><div key={x} className='mt-3 border-l border-[#69dcff]/45 pl-3 text-[10px] text-[#f7f1e7]/56'>{x}</div>)}</div></div>\n  return <Shell title={title} type={type} claim={claim} displayMode={displayMode} ctaLabel={ctaLabel}>{body}</Shell>\n}\n`)

let gallery = read('src/components/portfolio/ReceiptVisualGallery.jsx')
gallery = replaceOnce(gallery, 'import SmoothMdReceiptVisual from "./receipt-visuals/SmoothMdReceiptVisual";', 'import SmoothMdReceiptVisual from "./receipt-visuals/SmoothMdReceiptVisual";\nimport InterfaceBehaviorLabReceiptVisual from "./receipt-visuals/InterfaceBehaviorLabReceiptVisual";', 'ReceiptVisualGallery.jsx')
gallery = replaceOnce(gallery, 'import { getSmoothMdReceiptVisual } from "../../data/smoothMdReceiptVisuals";', 'import { getSmoothMdReceiptVisual } from "../../data/smoothMdReceiptVisuals";\nimport { getInterfaceBehaviorLabReceiptVisual } from "../../data/interfaceBehaviorLabReceiptVisuals";', 'ReceiptVisualGallery.jsx')
gallery = replaceOnce(gallery, 'function getComponentAsset(asset) {\n  if (asset.kind !== "component") return null;\n', 'function getComponentAsset(asset) {\n  if (asset.kind !== "component") return null;\n\n  const behaviorDefinition = getInterfaceBehaviorLabReceiptVisual(asset.componentKey);\n  if (behaviorDefinition) return { definition: behaviorDefinition, renderer: "behavior" };\n', 'ReceiptVisualGallery.jsx')
gallery = replaceOnce(gallery, 'function getComponentViewerMaxWidth(renderer) {\n', 'function getComponentViewerMaxWidth(renderer) {\n  if (renderer === "behavior") return "max-w-[980px]";\n', 'ReceiptVisualGallery.jsx')
gallery = replaceOnce(gallery, 'function getComponentAccentColor(renderer) {\n', 'function getComponentAccentColor(renderer) {\n  if (renderer === "behavior") return "#69dcff";\n', 'ReceiptVisualGallery.jsx')
gallery = replaceOnce(gallery, '        componentAsset.renderer === "snip"\n          ? SnipReceiptVisual', '        componentAsset.renderer === "behavior"\n          ? InterfaceBehaviorLabReceiptVisual\n          : componentAsset.renderer === "snip"\n          ? SnipReceiptVisual', 'ReceiptVisualGallery.jsx')
write('src/components/portfolio/ReceiptVisualGallery.jsx', gallery)

write('public/overview/interface-behavior-spatial.svg', `<svg xmlns='http://www.w3.org/2000/svg' width='1440' height='720' viewBox='0 0 1440 720'><defs><radialGradient id='g'><stop stop-color='#1647a8' stop-opacity='.55'/><stop offset='1' stop-color='#08090b' stop-opacity='0'/></radialGradient><linearGradient id='glass'><stop stop-color='#fff' stop-opacity='.24'/><stop offset='1' stop-color='#7ea7ff' stop-opacity='.1'/></linearGradient></defs><rect width='1440' height='720' fill='#08090b'/><rect width='1440' height='720' fill='url(#g)'/><g opacity='.08' stroke='#fff'><path d='M80 0v720M240 0v720M400 0v720M560 0v720M720 0v720M880 0v720M1040 0v720M1200 0v720M1360 0v720'/><path d='M0 80h1440M0 200h1440M0 320h1440M0 440h1440M0 560h1440M0 680h1440'/></g><text x='70' y='80' fill='#9aa3b1' font-family='Arial' font-size='14' letter-spacing='3'>INTERFACE BEHAVIOR LAB / SPATIAL MODE</text><text x='70' y='190' fill='#fff' font-family='Arial' font-size='72' font-weight='700'>Adaptive Controls</text><text x='74' y='242' fill='#8893a4' font-family='Arial' font-size='18'>intention · pressure · attention · consequence · recovery</text><g transform='translate(700 170)'><ellipse cx='330' cy='190' rx='330' ry='150' fill='none' stroke='#4d83ed' stroke-opacity='.18'/><ellipse cx='330' cy='190' rx='270' ry='120' fill='none' stroke='#4d83ed' stroke-opacity='.25'/><ellipse cx='330' cy='190' rx='210' ry='90' fill='none' stroke='#4d83ed' stroke-opacity='.34'/><rect x='135' y='145' width='390' height='90' rx='45' fill='url(#glass)' stroke='#b9d0ff' stroke-opacity='.72'/><text x='170' y='183' fill='#fff' font-family='Arial' font-size='18' font-weight='600'>Continue with intent</text><text x='170' y='210' fill='#aebbd2' font-family='Arial' font-size='11' letter-spacing='2'>PRESSURE 0.66</text><circle cx='480' cy='190' r='27' fill='#69dcff'/><path d='M470 190h18m-7-7 7 7-7 7' fill='none' stroke='#07101c' stroke-width='2'/><text x='15' y='197' fill='#8d96a5' font-family='Arial' font-size='11' letter-spacing='2'>APPROACH</text><text x='560' y='197' fill='#8d96a5' font-family='Arial' font-size='11' letter-spacing='2'>COMMIT</text></g><text x='74' y='630' fill='#dce2eb' font-family='Arial' font-size='24' font-weight='600'>The button is no longer a shape. It is a behavioral contract.</text></svg>`)
write('public/overview/interface-behavior-families.svg', `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='720' viewBox='0 0 1000 720'><rect width='1000' height='720' fill='#0b0c0f'/><text x='48' y='58' fill='#8791a0' font-family='Arial' font-size='13' letter-spacing='3'>SIX LIVE BEHAVIORS</text>${['INTENT','PRESSURE','BREATHING','MAGNETIC','ETHICAL','REVERSIBLE'].map((name,i)=>{const y=92+i*98;const colors=['#69dcff','#ff625d','#a489ff','#69dcff','#ff625d','#ffb84d'];return `<g transform='translate(48 ${y})'><rect width='904' height='76' rx='22' fill='#14171d' stroke='#ffffff' stroke-opacity='.12'/><text x='24' y='31' fill='#ffffff' font-family='Arial' font-size='14' font-weight='600'>${name}</text><text x='24' y='53' fill='#8993a1' font-family='Arial' font-size='10' letter-spacing='1.5'>STATE · ${['REVEALED','COMMIT','LISTENING','ALIGNED','HOLD','WINDOW'][i]}</text><circle cx='850' cy='38' r='18' fill='none' stroke='${colors[i]}' stroke-opacity='.8'/><circle cx='850' cy='38' r='5' fill='${colors[i]}'/></g>`}).join('')}</svg>`)

console.log('Interface Behavior Lab case patches applied successfully.')
