import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { formatMetadataLabel } from '../../utils/caseMetadata'
import { useOverlayBehavior } from './useOverlayBehavior'

const SECTIONS = [
  { id: 'brief', label: 'brief' },
  { id: 'problem', label: 'problem' },
  { id: 'system', label: 'system' },
  { id: 'design-move', label: 'design move' },
  { id: 'decisions', label: 'decisions' },
  { id: 'outcome', label: 'outcome' }
]

const SIDEBAR_CONTEXT_BY_SLUG = {
  'smooth-md-growth-os': {
    type: 'Clinic Growth System',
    scope: 'Brand, follow-up, and campaign systems'
  },
  mirror: {
    type: 'Product Prototype',
    scope: 'State logic and QA system design'
  },
  'meta-airtable-dashboard': {
    type: 'Campaign Reporting System',
    scope: 'Ads, CRM, booking, and revenue reporting'
  },
  'snip-provider-pipeline': {
    type: 'Provider Profile Workflow',
    scope: 'Research, validation, and handoff system'
  },
  'multi-brand-retention': {
    type: 'Email Follow-Up System',
    scope: 'Mailchimp routing and production'
  }
}

const CASE_COPY_BY_SLUG = {
  'smooth-md-growth-os': {
    problem:
      'Smooth MD had strong services, offers, Instagram proof, ads, CRM follow-up, and patient touchpoints, but those pieces were scattered across channels and using different rules.',
    systemIntro: 'I connected the clinic service hierarchy, consult path, offer rules, Instagram proof, CRM status logic, booking behavior, and campaign reads so marketing and follow-up could work from the same plan.',
    designMove:
      'Every touchpoint had to clarify the service, the offer, the consult path, the follow-up state, and the campaign read behind the work.',
    outcomeIntro:
      'The clinic became easier to understand, campaigns became easier to launch, leads became easier to route, and performance signals became easier to read.'
  },
  mirror: {
    problem:
      'People do not always know what they feel. A check-in may include mood, poor sleep, low clarity, and stressful context all at once, and many wellness tools flatten that into vague labels or pressure-heavy scores.',
    systemIntro: 'Mirror turns those inputs into readable states, explains why a state appeared, and suggests one gentle next step without pretending to diagnose the user.',
    designMove:
      'I shaped the check-in around mood, sleep, clarity, context, readable states, plain explanations, and QA scenarios so the experience stayed calm and testable.',
    outcomeIntro: 'The product became easier to understand quickly because the state rules, explanation copy, suggestions, and test scenarios were visible.'
  },
  'meta-airtable-dashboard': {
    problem:
      'Meta Ads showed spend, lead volume, and CPL. Airtable held lead records, CRM status, booking behavior, and revenue context, so campaign quality was hard to judge from platform metrics alone.',
    systemIntro: 'I organized Meta Ads data, Airtable lead records, CRM status updates, booking behavior, revenue evidence, confidence notes, and action categories into one campaign reporting system.',
    designMove:
      'I modeled the lead record first, then connected downstream behavior so the reporting could separate scale, maintain, review, and repair decisions.',
    outcomeIntro: 'Campaign conversations moved beyond isolated CPL and toward what actually happened after a lead entered the business.'
  },
  'snip-provider-pipeline': {
    problem:
      'Snip Snip needed provider profiles that were accurate, image-ready, and easy to hand off. Repeated searching, checking, downloading, renaming, and organizing created slow handoffs and uneven quality.',
    systemIntro: 'I built a repeatable workflow around provider records, normalized fields, image sourcing, OpenCV validation, source notes, human review, and publishing handoff folders.',
    designMove:
      'I treated automation as a quality-controlled workflow, not a shortcut. The process removed repetitive sourcing work while preserving human review where trust mattered.',
    outcomeIntro: 'Profile production became faster and more reliable because provider records, image sourcing, validation, and handoff were handled together.'
  },
  'guardrail-hr': {
    headline: 'A compliance product that turned HR risk into a guided assessment system',
    summary:
      'A compliance product that turned HR risk into a guided assessment system.',
    problem:
      'Small teams often do not know whether an HR issue is minor, urgent, or legally risky. The product needed to translate ambiguous workplace situations into a structured assessment flow without pretending to replace legal judgment.',
    systemIntro: 'Question intake, risk drivers, score calculation, result tiers, resource recommendations, and action paths formed one guided assessment flow.',
    designMove:
      'I treated HR compliance as a triage experience, not a static information library. The interface needed to help users understand what kind of risk they were dealing with, why the score appeared, and what next step made sense.',
    outcomeIntro: 'The concept defined a clearer self-serve compliance triage experience.'
  },
  'multi-brand-retention': {
    problem:
      'Leads came from different brands, services, and campaigns, but too many were receiving the same generic email follow-up.',
    systemIntro: 'I organized Mailchimp tags, service interest, source, booking status, send rules, suppression rules, follow-up timing, and reactivation emails so each lead could enter a more relevant email path.',
    designMove:
      'The right email depended on what someone asked for, where they came from, and whether they had already booked.',
    outcomeIntro: 'Email follow-up became easier to manage and more relevant across brands, services, booking states, and timing rules.'
  }
}

const SYSTEM_MODEL_BY_SLUG = {
  'smooth-md-growth-os': [
    { label: 'service hierarchy', meaning: 'Unify skin health, laser, injectables, body, membership, and wellness add-ons so every offer and content path starts from the same clinic model.' },
    { label: 'positioning language', meaning: 'Move from generic medspa promotion to skin + laser trust language with clearer consult expectations and local credibility.' },
    { label: 'offer rules', meaning: 'Turn service lines into first-time offers, member pricing, seasonal campaigns, lead magnets, and follow-up paths.' },
    { label: 'Instagram proof', meaning: 'Use profile, grid, treatment proof, education, and contact signals to make the public brand easier to understand before a lead enters the CRM.' },
    { label: 'CRM status logic', meaning: 'Model follow-up, booked, arrived, converted, no-show, lost, reactivation, and revenue handoff as repeatable clinic operations.' },
    { label: 'campaign read', meaning: 'Read campaign results through lead conversion lift, offer-test ROAS, booking behavior, and follow-up state instead of isolated creative output.' }
  ],
  mirror: [
    { label: 'check-in signals', meaning: 'Capture mood, sleep, clarity, and tension or context with low-effort inputs.' },
    { label: 'normalization', meaning: 'Translate self-reports into comparable ranges without fake medical precision.' },
    { label: 'state reading', meaning: 'Map recurring signal combinations to readable states like Settled, Frayed, Drifting, and Restoring.' },
    { label: 'gentle next move', meaning: 'Offer one low-friction action using state fit, signal fit, and lightweight feedback.' },
    { label: 'test surface', meaning: 'Expose scenarios, expected states, component variants, and interaction states through debug logic and Storybook.' }
  ],
  'meta-airtable-dashboard': [
    { label: 'Meta Ads data', meaning: 'Preserve spend, lead cost, campaign, ad set, ad name, and form context from the acquisition source.' },
    { label: 'Airtable lead record', meaning: 'Hold identity, source, service interest, CRM status, booking behavior, outcome, and revenue fields in one shared record.' },
    { label: 'CRM status updates', meaning: 'Track owner, follow-up timing, booked status, appointment state, arrival, and conversion readiness.' },
    { label: 'Revenue context', meaning: 'Attach revenue evidence with confidence notes instead of pretending every outcome maps perfectly.' },
    { label: 'Action category', meaning: 'Turn campaign evidence into scale, maintain, review, repair tracking, refresh creative, or nurture actions.' }
  ],
  'snip-provider-pipeline': [
    { label: 'source', meaning: 'Pull provider data from reliable public records and source references.' },
    { label: 'enrich', meaning: 'Add metadata and media candidates required for publish-ready profiles.' },
    { label: 'validate', meaning: 'Run quality gates to flag weak, missing, or incorrect assets.' },
    { label: 'organize', meaning: 'Standardize files, naming, and review states for handoff.' },
    { label: 'publish', meaning: 'Deliver clean, structured assets for production deployment.' }
  ],
  'guardrail-hr': [
    { label: 'question', meaning: 'Capture the workplace situation through a structured assessment prompt.' },
    { label: 'risk driver', meaning: 'Map answers to the compliance factors that influence severity.' },
    { label: 'score', meaning: 'Translate answer values into a readable risk range.' },
    { label: 'result', meaning: 'Return a tiered outcome without claiming legal certainty.' },
    { label: 'resource', meaning: 'Point the user toward relevant guidance for the situation.' },
    { label: 'action', meaning: 'Make the next step clear enough to reduce ambiguity.' }
  ],
  'multi-brand-retention': [
    { label: 'brand', meaning: 'Separate leads by the brand they entered through so each email path starts with the right context.' },
    { label: 'service interest', meaning: 'Route people into service-specific Mailchimp paths and offer language.' },
    { label: 'booking status', meaning: 'Use booking state to avoid sending the wrong follow-up to someone who already moved forward.' },
    { label: 'send rules', meaning: 'Control when messages should send, pause, or suppress instead of relying on generic blasts.' },
    { label: 'follow-up timing', meaning: 'Trigger emails around useful intervals, including short follow-up and reactivation timing.' },
    { label: 'email path', meaning: 'Move each lead toward a more relevant Mailchimp journey based on brand, service, status, and timing.' }
  ]
}

const PROBLEM_CONTEXT_BY_SLUG = {
  'smooth-md-growth-os': {
    before: ['scattered service promos', 'service hierarchy unclear across channels', 'consult language and offers handled case by case', 'Instagram proof disconnected from lead follow-up', 'CRM and campaign logic operating separately'],
    after: ['shared service hierarchy and consult path', 'repeatable offer rules and campaign launch kit', 'Instagram proof connected to CRM follow-up', 'booking behavior connected to follow-up state', 'CRM status logic connected to campaign reads']
  },
  mirror: {
    before: ['messy check-in inputs', 'unclear mood labels', 'pressure loops from streak-oriented UX', 'state rules that were hard to test'],
    after: ['mood, sleep, clarity, and context translated into readable states', 'plain explanation for why a state appeared', 'one gentle next step without diagnosis', 'QA scenarios and Storybook coverage for state behavior']
  },
  'meta-airtable-dashboard': {
    before: ['spend and lead volume isolated in Meta Ads', 'lead and CRM state split across Airtable updates', 'booking, conversion, and revenue signals downstream without a decision path'],
    after: ['shared Airtable lead record for campaign reporting', 'campaign reads tied to booked, arrived, converted, and revenue context', 'action categories for scale, maintain, review, and repair']
  },
  'snip-provider-pipeline': {
    before: ['manual provider research', 'uneven image quality and metadata', 'fragile handoff folders'],
    after: ['NPPES records normalized into profile fields', 'image sourcing with OpenCV validation gates', 'structured profile folders with source notes and publish status']
  },
  'guardrail-hr': {
    before: ['unclear HR risk', 'manual policy interpretation', 'no guided next step'],
    after: ['22-question assessment', 'risk score output', 'traceable answer logic', 'structured resource path']
  },
  'multi-brand-retention': {
    before: ['generic email follow-up', 'brand, service, and booking status mixed together', 'timing disconnected from send and suppression rules'],
    after: ['Mailchimp tags organized by brand, service, source, and booking status', 'service-specific email follow-up paths', 'short follow-up and reactivation emails tied to booking behavior']
  }
}

const OUTCOME_BY_SLUG = {
  'smooth-md-growth-os': [
    'Six-plus service lines moved into one hierarchy that could guide brand language, Instagram proof, campaign offers, and consult paths.',
    'Lead source, service intent, follow-up timing, booking behavior, and reactivation were connected into one clinic follow-up path.',
    'CRM status logic made follow-up, arrival, conversion, revenue handoff, and review states easier to operate.',
    'Campaign reads tied creative and offer performance to lead conversion lift, 3.2x offer-test ROAS, booking behavior, and follow-up context.'
  ],
  mirror: [
    'State detection made messy check-ins readable without turning reflection into a performance loop.',
    'The product could explain why a reading appeared and suggest one grounded next action without claiming diagnosis.',
    'Debug logic and Storybook components made the state behavior testable instead of purely conceptual.'
  ],
  'meta-airtable-dashboard': [
    'The shared lead model gave campaign reports source, intent, CRM state, booking behavior, outcome, and attribution context.',
    'Campaign performance reads used downstream behavior instead of stopping at spend, lead volume, or CPL.',
    'Revenue context used confidence and manual review states where source evidence was incomplete.',
    'The dashboard turned scattered signals into scale, maintain, review, and repair queues.'
  ],
  'snip-provider-pipeline': [
    'Manual sourcing overhead dropped because provider records, image candidates, validation, and handoff were handled in one repeatable process.',
    'Quality checks improved consistency before assets reached publication workflows.',
    'Handoff moved from ad hoc file dumps to structured profile folders with profile.json, source notes, and publish status.'
  ],
  'guardrail-hr': [
    'Defined a 22-question assessment model.',
    'Mapped answers to risk drivers and score tiers.',
    'Created a structured result UX for self-serve compliance triage.'
  ],
  'multi-brand-retention': [
    'Email follow-up reflected brand, service interest, source, booking status, and timing instead of batch email cadence.',
    'Communication became easier to coordinate across multi-brand operations.',
    'Email production used reusable Mailchimp modules, a 600px wrapper, dark mode meta, VML Outlook support, and clear CTA paths.'
  ]
}

const OUTCOME_INTRO_BY_SLUG = {
  mirror: 'The state rules made check-in feedback calmer, clearer, and easier to test.',
  'meta-airtable-dashboard': 'The campaign reporting system created a tighter bridge between Meta Ads, CRM movement, booking behavior, and revenue context.',
  'snip-provider-pipeline': 'The workflow reduced manual overhead and improved quality consistency in production handoff.',
  'multi-brand-retention': 'Email follow-up became easier to coordinate across services, brands, booking status, and timing rules.'
}

const MIRROR_SUPPORT_LINKS = [
  { label: 'Prototype ↗', href: 'https://mirror-v0.vercel.app/' },
  { label: 'Storybook ↗', href: 'https://mirror-storybook.vercel.app/?path=/docs/mirror-design-system--docs' }
]

function sectionDomId(slug, sectionId) {
  return `${slug}-case-${sectionId}`
}

function getCaseCopy(workspace) {
  const mapped = CASE_COPY_BY_SLUG[workspace.slug] ?? {}
  return {
    headline: mapped.headline ?? workspace.headline ?? workspace.title,
    summary: mapped.summary ?? workspace.oneLine,
    problem: mapped.problem ?? workspace.signal,
    systemIntro: mapped.systemIntro ?? workspace.system,
    designMove:
      mapped.designMove ??
      'I connected the moving parts into a repeatable workflow so each touchpoint could drive clearer decisions and cleaner handoff.',
    outcomeIntro: mapped.outcomeIntro ?? OUTCOME_INTRO_BY_SLUG[workspace.slug] ?? workspace.hiringTranslation
  }
}

function getSystemModel(workspace) {
  return SYSTEM_MODEL_BY_SLUG[workspace.slug] ?? workspace.path.map((step) => ({ label: step, meaning: workspace.system }))
}

function getProblemContext(workspace) {
  return PROBLEM_CONTEXT_BY_SLUG[workspace.slug] ?? { before: [workspace.signal], after: [workspace.system] }
}

function getOutcomeItems(workspace) {
  if (OUTCOME_BY_SLUG[workspace.slug]) return OUTCOME_BY_SLUG[workspace.slug]
  return workspace.metrics.map((metric) => `${metric.value} ${metric.label}`)
}

function getSidebarContext(workspace) {
  return SIDEBAR_CONTEXT_BY_SLUG[workspace.slug] ?? {
    type: formatMetadataLabel(workspace.type),
    scope: workspace.role
  }
}

function scrollToSection(workspace, sectionId) {
  const node = document.getElementById(sectionDomId(workspace.slug, sectionId))
  if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─────────────────────────── Section components ─────────────────────────── */

function MirrorSupportLinks() {
  return (
    <div className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] leading-5'>
      {MIRROR_SUPPORT_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target='_blank'
          rel='noreferrer'
          className='border-b border-[#11100d]/16 pb-0.5 text-[#11100d]/52 transition-colors hover:border-[#11100d]/34 hover:text-[#11100d]/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/18 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e7]'
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

function BriefSection({ workspace }) {
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'brief')} className='pb-14 lg:pb-16'>
      {/* Hero — two-column on desktop */}
      <div className='grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.72fr)] lg:items-end'>
        <h3
          className='text-[40px] leading-[1.02] tracking-[-0.035em] text-[#11100d] sm:text-[50px] lg:text-[58px]'
        >
          {copy.headline}
        </h3>
        <div>
          <div className='mb-3 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>Summary</div>
          <p className='text-[15px] leading-[1.7] text-[#11100d]/66'>{copy.summary}</p>
          {workspace.slug === 'mirror' && <MirrorSupportLinks />}
        </div>
      </div>

      {/* Metric ledger — table strip */}
      {workspace.metrics && workspace.metrics.length > 0 && (
        <div className='mt-9 grid border-y border-[#11100d]/12' style={{ gridTemplateColumns: `repeat(${workspace.metrics.length}, minmax(0, 1fr))` }}>
          {workspace.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className='px-4 py-4 lg:px-6'
              style={idx > 0 ? { borderLeft: '1px solid rgba(17,16,13,0.1)' } : undefined}
            >
              <div className='text-[24px] leading-none tracking-[-0.03em] text-[#11100d] lg:text-[28px]'>
                {metric.value}
              </div>
              <div className='mt-2 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function ProblemSection({ workspace }) {
  const context = getProblemContext(workspace)
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'problem')} className='border-t border-[#11100d]/10 pt-12 pb-14 lg:pt-16 lg:pb-16'>
      <div className='text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>Problem</div>
      <p className='mt-4 max-w-[680px] text-base leading-[1.65] text-[#11100d]/66'>{copy.problem}</p>

      {/* Before / After comparison */}
      <div className='mt-8 grid overflow-hidden rounded-[14px] border border-[#11100d]/10 md:grid-cols-2'>
        <div className='px-5 py-5 lg:px-6 lg:py-6'>
          <div className='mb-4 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>Before</div>
          <div className='divide-y divide-[#11100d]/8'>
            {context.before.map((item) => (
              <p key={item} className='py-2.5 text-[14px] leading-6 text-[#11100d]/62'>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className='border-t border-[#11100d]/10 px-5 py-5 md:border-l md:border-t-0 lg:px-6 lg:py-6'>
          <div className='mb-4 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>After</div>
          <div className='divide-y divide-[#11100d]/8'>
            {context.after.map((item) => (
              <p key={item} className='py-2.5 text-[14px] leading-6 text-[#11100d]/70'>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SystemSection({ workspace }) {
  const model = getSystemModel(workspace)
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'system')} className='border-t border-[#11100d]/10 pt-12 pb-14 lg:pt-16 lg:pb-16'>
      <div className='text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>System model</div>
      <p className='mt-4 max-w-[680px] text-base leading-[1.65] text-[#11100d]/66'>{copy.systemIntro}</p>

      {/* Operating model panel */}
      <div className='mt-8 rounded-[18px] bg-[#171512] text-[#f7f1e7]'>
        {/* Panel header */}
        <div className='flex items-center justify-end border-b border-[#f7f1e7]/8 px-6 py-5 lg:px-8'>
          <span
            className='h-2.5 w-2.5 rounded-full'
            style={{ backgroundColor: workspace.accent ?? '#f7f1e7', boxShadow: `0 0 0 1px rgba(247,241,231,0.15)` }}
            aria-hidden='true'
          />
        </div>

        {/* Steps */}
        <div className='divide-y divide-[#f7f1e7]/8 px-6 lg:px-8'>
          {model.map((step, index) => (
            <div key={step.label} className='flex items-start gap-5 py-5 lg:gap-7'>
              {/* Step number */}
              <div className='w-8 shrink-0 pt-0.5 text-right'>
                <span className='text-[10px] tabular-nums leading-none tracking-[0.1em] text-[#f7f1e7]/36'>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              {/* Vertical rule */}
              <div className='w-px self-stretch shrink-0 bg-[#f7f1e7]/10' aria-hidden='true' />
              {/* Content */}
              <div className='min-w-0 flex-1'>
                <div className='text-[12px] uppercase tracking-[0.13em] text-[#f7f1e7]/78'>{step.label}</div>
                <p className='mt-2 text-[14px] leading-[1.6] text-[#f7f1e7]/60 max-w-[580px]'>{step.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DesignMoveSection({ workspace }) {
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'design-move')} className='border-t border-[#11100d]/10 pt-12 pb-14 lg:pt-16 lg:pb-16'>
      <div className='mb-6 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>Design move</div>
      <blockquote className='border-l-2 border-[#11100d]/16 pl-6 lg:pl-8'>
        <p className='max-w-[720px] text-[22px] leading-[1.52] tracking-[-0.018em] text-[#11100d]/80 lg:text-[26px]'>
          {copy.designMove}
        </p>
      </blockquote>
    </section>
  )
}

function DecisionsSection({ workspace }) {
  const rows = ['constraint', 'move', 'tradeoff', 'principle'].map((key) => {
    const decision = workspace.decisions.find((item) => item.label === key)
    return { key, body: decision?.body ?? 'Not captured for this case.' }
  })

  return (
    <section id={sectionDomId(workspace.slug, 'decisions')} className='border-t border-[#11100d]/10 pt-12 pb-14 lg:pt-16 lg:pb-16'>
      <div className='mb-6 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>Decisions</div>
      <div className='overflow-hidden rounded-[14px] border border-[#11100d]/10'>
        {rows.map((row) => (
          <div
            key={row.key}
            className='grid grid-cols-1 border-b border-[#11100d]/10 px-5 py-5 last:border-b-0 md:grid-cols-[160px_1fr] lg:px-6 lg:py-[22px]'
          >
            <div className='mb-1.5 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38 md:mb-0 md:pt-0.5'>
              {row.key}
            </div>
            <p className='text-[15px] leading-[1.65] text-[#11100d]/68'>{row.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function OutcomeSection({ workspace }) {
  const outcomeItems = getOutcomeItems(workspace)
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'outcome')} className='border-t border-[#11100d]/10 pt-12 pb-4 lg:pt-16'>
      <div className='text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>What changed</div>
      <p className='mt-4 max-w-[680px] text-base leading-[1.65] text-[#11100d]/66'>{copy.outcomeIntro}</p>

      <ol className='mt-7 divide-y divide-[#11100d]/10 border-y border-[#11100d]/10'>
        {outcomeItems.map((item, index) => (
          <li key={item} className='flex items-start gap-5 py-4 lg:py-5'>
            <span className='w-8 shrink-0 pt-0.5 text-[10px] tabular-nums leading-none tracking-[0.12em] text-[#11100d]/36'>
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className='text-[15px] leading-[1.65] text-[#11100d]/68'>{item}</p>
          </li>
        ))}
      </ol>

      <p className='mt-6 text-[12px] leading-6 text-[#11100d]/44'>
        Supporting work is shown in the receipt inspector.
      </p>
    </section>
  )
}

/* ─────────────────────────── Main component ─────────────────────────────── */

export default function CaseWorkspace({ workspace, closeWorkspace }) {
  const dialogRef = React.useRef(null)
  const closeButtonRef = React.useRef(null)
  const sidebarContext = workspace ? getSidebarContext(workspace) : null
  const headerMetadata = workspace
    ? [formatMetadataLabel(workspace.category), workspace.timeline, formatMetadataLabel(workspace.status)]
    : []
  const handleClose = React.useCallback(() => closeWorkspace(), [closeWorkspace])

  useOverlayBehavior({
    active: Boolean(workspace),
    overlayRef: dialogRef,
    initialFocusRef: closeButtonRef,
    onClose: handleClose
  })

  return (
    <AnimatePresence>
      {workspace ? (
        <motion.div
          key='case-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className='fixed inset-0 z-50 overscroll-contain bg-[#11100d]/48 p-2.5 sm:p-3 lg:p-8'
        >
          <motion.div
            ref={dialogRef}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className='mx-auto flex h-full w-full max-w-[1160px] flex-col overflow-hidden rounded-[24px] border border-[#11100d]/12 bg-[#f7f1e7] shadow-[0_48px_130px_rgba(17,16,13,0.28)] sm:rounded-[28px]'
            role='dialog'
            aria-modal='true'
            aria-label={`${workspace.title} case file`}
            tabIndex={-1}
          >
            {/* ── Header ── */}
            <header className='flex shrink-0 items-start justify-between gap-4 border-b border-[#11100d]/10 px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6'>
              <div>
                <div className='text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38'>case file</div>
                <h2 className='mt-1.5 text-[18px] font-medium leading-tight tracking-[-0.022em] text-[#11100d] lg:text-[20px]'>
                  {workspace.title}
                </h2>
                <div className='mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.01em] text-[#11100d]/44'>
                  {headerMetadata
                    .filter(Boolean)
                    .map((item, index) => (
                      <React.Fragment key={item}>
                        {index > 0 && (
                          <span className='inline-block h-[3px] w-[3px] rounded-full bg-[#11100d]/20' aria-hidden='true' />
                        )}
                        <span>{item}</span>
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type='button'
                aria-label='Close case file'
                onClick={handleClose}
                className='mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]/54 transition-colors hover:bg-[#f0eadf] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/22 lg:h-10 lg:w-10'
              >
                <X className='h-[15px] w-[15px]' />
              </button>
            </header>

            {/* ── Body: side nav + scrollable content ── */}
            <div className='flex min-h-0 flex-1 overflow-hidden'>
              {/* Side nav — desktop only */}
              <aside className='hidden w-[200px] shrink-0 flex-col border-r border-[#11100d]/10 px-5 py-7 lg:flex xl:w-[220px]'>
                <nav className='sticky top-0'>
                  <div className='space-y-0.5'>
                    {SECTIONS.map((section) => (
                      <button
                        key={section.id}
                        type='button'
                        onClick={() => scrollToSection(workspace, section.id)}
                        className='block w-full rounded-[8px] px-3 py-2 text-left text-[11px] uppercase tracking-[0.12em] text-[#11100d]/48 transition-colors hover:bg-[#11100d]/5 hover:text-[#11100d]/80'
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                  <div className='mt-7 border-t border-[#11100d]/10 pt-6 text-[11px] leading-[1.55] text-[#11100d]/44'>
                    <p className='font-medium text-[#11100d]/62'>{sidebarContext.type}</p>
                    <p className='mt-1 text-[#11100d]/42'>{sidebarContext.scope}</p>
                  </div>
                </nav>
              </aside>

              {/* Main scrollable area */}
              <main className='scrollbar-portfolio flex-1 overflow-y-auto'>
                <div className='mx-auto max-w-[940px] px-5 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12'>
                  <BriefSection workspace={workspace} />
                  <ProblemSection workspace={workspace} />
                  <SystemSection workspace={workspace} />
                  <DesignMoveSection workspace={workspace} />
                  <DecisionsSection workspace={workspace} />
                  <OutcomeSection workspace={workspace} />
                </div>
              </main>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
