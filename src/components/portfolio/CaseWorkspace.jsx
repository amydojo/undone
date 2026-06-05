import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const SECTIONS = [
  { id: 'brief', label: 'brief' },
  { id: 'problem', label: 'problem' },
  { id: 'system', label: 'system' },
  { id: 'design-move', label: 'design move' },
  { id: 'decisions', label: 'decisions' },
  { id: 'outcome', label: 'outcome' }
]

const CASE_COPY_BY_SLUG = {
  'smooth-md-growth-os': {
    headline: 'From scattered service promos to a repeatable growth system',
    summary:
      "I organized Smooth MD's services, offers, follow-up, Instagram proof, and campaign logic into one system the clinic could reuse.",
    problem:
      'Before, services and promos were scattered across social content, ads, and follow-up. Service hierarchy, consult language, promotional logic, Instagram proof, lead follow-up, booking behavior, and performance reads were not tied to one shared model.',
    systemIntro: 'I clarified the service hierarchy, offer logic, content system, CRM states, lifecycle journey, and campaign toolkit so marketing and follow-up worked together.',
    designMove:
      'Every public-facing touchpoint had to clarify the service, the offer, the consult path, the follow-up state, and the performance read behind the campaign.',
    outcomeIntro:
      'The brand became easier to understand, campaigns became easier to launch, leads became easier to route, and performance signals became easier to interpret.',
    outcomes: [
      'Six-plus service lines were unified into a clearer hierarchy for content, ads, consult language, and offers.',
      'Lifecycle routing connected lead source, service intent, consult path, follow-up timing, booking behavior, retention, and reactivation.',
      'CRM status logic made follow-up, booking state, arrival, conversion, and revenue handoff easier to coordinate.',
      'Instagram proof and campaign assets carried service clarity, local trust, CTA logic, and performance interpretation.'
    ]
  },
  mirror: {
    headline: 'Turning emotional check-ins into product logic',
    summary:
      'I designed a prototype that turns mood, sleep, clarity, and context inputs into readable states and gentle next steps.',
    problem:
      "People's emotional check-ins are messy. Many wellness tools either return vague mood labels or add pressure through streaks and scores.",
    systemIntro: 'Mirror turns those inputs into states, explains why a state was detected, compares similar days, and ranks helpful next moves based on feedback.',
    designMove:
      'I treated emotional UX as product logic, not mood decoration. The interface needed to translate messy self-reporting into something calm, explainable, and useful without turning self-awareness into another performance loop.',
    outcomeIntro: 'The product became clearer, calmer, and easier to trust when the user needed support most.'
  },
  'meta-airtable-dashboard': {
    headline: 'Connecting ad spend to booking and revenue signals',
    summary:
      'I connected Meta Ads, Airtable lead records, CRM status, booking behavior, and revenue signals so campaign decisions were based on more than CPL.',
    problem:
      'Meta Ads showed spend and leads. Airtable held lead records. Booking and revenue lived downstream. Without a shared reporting layer, the team could see activity but not clearly judge campaign quality.',
    systemIntro: 'I organized Meta campaign data, Airtable Leads_Master records, CRM status updates, booking behavior, arrival and conversion state, revenue value, attribution confidence, and recommended actions.',
    designMove:
      'I modeled the lead record first, then connected downstream behavior so the dashboard could separate scale, maintain, review, and tracking-repair actions.',
    outcomeIntro: 'The work made campaign conversations less about isolated platform metrics and more about what moved through the business.'
  },
  'snip-provider-pipeline': {
    headline: 'Turning provider research into publish-ready profiles',
    summary:
      'I built a repeatable process to pull provider records, source images, validate assets, and hand off structured profile folders.',
    problem:
      'Provider research was messy and manual. Repeated searching, checking, downloading, renaming, and organizing created slow handoffs and uneven quality.',
    systemIntro: 'I structured the process around NPPES records, normalized fields, image sourcing, OpenCV validation, source notes, and publishing handoff folders.',
    designMove:
      'I treated automation as a quality-controlled workflow, not a shortcut. The process removed repetitive sourcing work while preserving human review where trust mattered.',
    outcomeIntro: 'Operations became faster and more reliable because automation was paired with structured QA.'
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
    headline: 'Routing follow-up by brand, service, and lead status',
    summary:
      'I designed email and follow-up paths that changed based on brand, service interest, source, CRM status, and timing.',
    problem:
      'Leads came from different brands, services, sources, and levels of intent, but too many were moving through the same follow-up rhythm.',
    systemIntro: 'I organized Mailchimp tags, CRM status, follow-up timing, and email production rules so each lead could receive a more relevant message path.',
    designMove:
      'I treated timing as part of the message. The routing separated intent, service interest, and lead readiness so follow-up could feel relevant instead of generic.',
    outcomeIntro: 'Follow-up became easier to coordinate and more useful to leads across the full lifecycle.'
  }
}

const SYSTEM_MODEL_BY_SLUG = {
  'smooth-md-growth-os': [
    { label: 'service hierarchy', meaning: 'Unify skin health, laser, injectables, body, membership, and wellness add-ons so every offer and content path starts from the same clinic model.' },
    { label: 'positioning language', meaning: 'Move from generic medspa promotion to skin + laser trust language with clearer consult expectations and local credibility.' },
    { label: 'offer architecture', meaning: 'Turn service lines into first-time offers, member pricing, seasonal campaigns, lead magnets, and follow-up paths.' },
    { label: 'Instagram proof', meaning: 'Use profile, grid, treatment proof, education, and contact signals to make the public brand easier to understand before a lead enters the CRM.' },
    { label: 'CRM status logic', meaning: 'Model follow-up, booked, arrived, converted, no-show, lost, reactivation, and revenue handoff as repeatable clinic operations.' },
    { label: 'performance read', meaning: 'Read campaign results through lead conversion lift, offer-test ROAS, booking behavior, and follow-up state instead of isolated creative output.' }
  ],
  mirror: [
    { label: 'input signals', meaning: 'Capture energy, tension, clarity, and sleep with low-effort check-ins.' },
    { label: 'normalization', meaning: 'Translate self-reports into comparable ranges without fake medical precision.' },
    { label: 'state detection', meaning: 'Map recurring signal combinations to calm, human-readable states.' },
    { label: 'plain explanation', meaning: 'Explain why the reading appeared and which signals contributed most.' },
    { label: 'next move ranking', meaning: 'Rank one grounded action using state fit, signal fit, and past feedback.' }
  ],
  'meta-airtable-dashboard': [
    { label: 'Meta campaign data', meaning: 'Preserve spend, lead volume, campaign, ad set, ad name, and form context from the acquisition source.' },
    { label: 'Leads_Master record', meaning: 'Hold identity, source, service interest, CRM state, booking behavior, outcome, and attribution fields in one shared record.' },
    { label: 'CRM status updates', meaning: 'Track owner, follow-up timing, booked status, appointment state, arrival, and conversion readiness.' },
    { label: 'Revenue attribution', meaning: 'Attach revenue value with confidence rules instead of pretending every outcome maps perfectly.' },
    { label: 'Recommended action', meaning: 'Turn campaign evidence into scale, maintain, review, fix tracking, refresh creative, or nurture actions.' }
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
    { label: 'source', meaning: 'Capture lead origin to preserve intent context from first touch.' },
    { label: 'intent', meaning: 'Classify readiness so low and high intent do not share the same cadence.' },
    { label: 'service', meaning: 'Route people into the right service pathway and offer language.' },
    { label: 'timing', meaning: 'Trigger follow-up at behavior-based intervals, not fixed blasts.' },
    { label: 'message', meaning: 'Deliver explanation and proof matched to where they are in the journey.' },
    { label: 'booking', meaning: 'Drive toward conversion while preserving trust and brand consistency.' }
  ]
}

const PROBLEM_CONTEXT_BY_SLUG = {
  'smooth-md-growth-os': {
    before: ['scattered service promos', 'service hierarchy unclear across channels', 'consult language and offers handled case by case', 'Instagram proof disconnected from lead follow-up', 'CRM and campaign logic operating separately'],
    after: ['shared service hierarchy and consult path', 'repeatable offer logic and campaign launch kit', 'Instagram proof connected to lead follow-up', 'lifecycle routing from source to retention', 'CRM status logic connected to performance reads']
  },
  mirror: {
    before: ['messy emotional inputs', 'vague mood labels', 'pressure loops from streak-oriented UX'],
    after: ['state detection from mood, sleep, clarity, and context', 'plain explanation for why a state appeared', 'similar days and next moves ranked by feedback']
  },
  'meta-airtable-dashboard': {
    before: ['spend and lead volume isolated in Meta Ads', 'lead and CRM state split across Airtable updates', 'booking, conversion, and revenue signals downstream without a decision path'],
    after: ['shared Leads_Master reporting model', 'campaign logic tied to booked, arrived, converted, and revenue state', 'decision categories for scale, maintain, review, and tracking repair']
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
    before: ['generic email rhythm', 'brand, service, and intent mixed together', 'timing disconnected from CRM status'],
    after: ['Mailchimp tags organized by brand, service, source, and status', 'service-specific follow-up paths', '2-day follow-up and Day 21 reactivation tied to booking behavior']
  }
}

const OUTCOME_BY_SLUG = {
  'smooth-md-growth-os': [
    'Six-plus service lines moved into one hierarchy that could guide brand language, Instagram proof, campaign offers, and consult paths.',
    'Lead source, service intent, follow-up timing, booking state, retention, and reactivation were connected into one lifecycle route.',
    'CRM status logic made follow-up, arrival, conversion, revenue handoff, and review states easier to operate.',
    'Campaign reads tied creative and offer performance to lead conversion lift, 3.2x offer-test ROAS, booking behavior, and follow-up context.'
  ],
  mirror: [
    'State detection made emotional check-ins readable without turning reflection into a performance loop.',
    'Component behavior and state logic were production-oriented, not just conceptual screens.',
    'The product could explain why a reading appeared, compare similar days, and suggest one grounded next action.'
  ],
  'meta-airtable-dashboard': [
    'The shared lead model gave campaign reports source, intent, CRM state, booking behavior, outcome, and attribution context.',
    'Campaign performance reads used downstream behavior instead of stopping at spend, lead volume, or CPL.',
    'Revenue attribution used confidence and manual review states where source evidence was incomplete.',
    'The dashboard turned scattered signals into scale, maintain, review, and fix-tracking queues.'
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
    'Follow-up timing reflected brand, service interest, source, CRM status, and readiness instead of batch email cadence.',
    'Communication became easier to coordinate across multi-brand operations.',
    'Email production used reusable Mailchimp modules, a 600px wrapper, dark mode meta, VML Outlook support, and clear CTA paths.'
  ]
}

const OUTCOME_INTRO_BY_SLUG = {
  mirror: 'The product logic made emotional signal feedback calmer, clearer, and more actionable.',
  'meta-airtable-dashboard': 'The reporting layer created a tighter bridge between marketing signals, CRM movement, and business decisions.',
  'snip-provider-pipeline': 'The workflow reduced manual overhead and improved quality consistency in production handoff.',
  'multi-brand-retention': 'Follow-up became easier to coordinate across services, brands, and intent levels.'
}

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

function scrollToSection(workspace, sectionId) {
  const node = document.getElementById(sectionDomId(workspace.slug, sectionId))
  if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─────────────────────────── Section components ─────────────────────────── */

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
      <div className='text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>System</div>
      <p className='mt-4 max-w-[680px] text-base leading-[1.65] text-[#11100d]/66'>{copy.systemIntro}</p>

      {/* Operating model panel */}
      <div className='mt-8 rounded-[18px] bg-[#171512] text-[#f7f1e7]'>
        {/* Panel header */}
        <div className='flex items-center justify-between border-b border-[#f7f1e7]/8 px-6 py-5 lg:px-8'>
          <span className='text-[10px] uppercase tracking-[0.15em] text-[#f7f1e7]/42'>Operating model</span>
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
        Related proof lives in the archive inspector.
      </p>
    </section>
  )
}

/* ─────────────────────────── Main component ─────────────────────────────── */

export default function CaseWorkspace({ workspace, closeWorkspace }) {
  return (
    <AnimatePresence>
      {workspace ? (
        <motion.div
          key='case-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className='fixed inset-0 z-50 bg-[#11100d]/48 p-3 lg:p-8'
        >
          <motion.div
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className='mx-auto flex h-full w-full max-w-[1160px] flex-col overflow-hidden rounded-[28px] border border-[#11100d]/12 bg-[#f7f1e7] shadow-[0_48px_130px_rgba(17,16,13,0.28)]'
            role='dialog'
            aria-modal='true'
            aria-label={`${workspace.title} case file workspace`}
          >
            {/* ── Header ── */}
            <header className='flex shrink-0 items-start justify-between gap-4 border-b border-[#11100d]/10 px-6 py-5 lg:px-8 lg:py-6'>
              <div>
                <div className='text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38'>case file workspace</div>
                <h2 className='mt-1.5 text-[18px] font-medium leading-tight tracking-[-0.022em] text-[#11100d] lg:text-[20px]'>
                  {workspace.title}
                </h2>
                <div className='mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/40'>
                  {[workspace.category, workspace.timeline, workspace.status, workspace.role]
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
                type='button'
                aria-label='Close case file'
                onClick={closeWorkspace}
                className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]/54 transition-colors hover:bg-[#f0eadf] hover:text-[#11100d]'
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
                  <div className='mt-7 border-t border-[#11100d]/10 pt-6 text-[11px] leading-[1.6] text-[#11100d]/40'>
                    <p className='font-medium tracking-[0.08em] text-[#11100d]/50'>{workspace.type}</p>
                    <p className='mt-1'>{workspace.role}</p>
                  </div>
                </nav>
              </aside>

              {/* Main scrollable area */}
              <main className='flex-1 overflow-y-auto'>
                <div className='mx-auto max-w-[940px] px-6 py-10 lg:px-10 lg:py-12'>
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
