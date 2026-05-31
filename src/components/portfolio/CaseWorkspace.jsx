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
    thesis: 'A clinic brand rebuilt as operating infrastructure.',
    summary:
      'Smooth MD did not need more isolated campaign assets. It needed one operating layer connecting positioning, offer logic, lifecycle messaging, CRM states, and measurement.',
    problem:
      'The clinic had strong services, but the customer experience was fragmented across ads, service pages, intake, follow up, and reporting. Each touchpoint created slightly different expectations, which made the brand harder to trust and the team harder to coordinate.',
    systemIntro: 'The system turned scattered campaign work into reusable brand and growth infrastructure.',
    designMove:
      'I treated the clinic brand like a product system. The goal was not just to make the brand look consistent. It was to make every touchpoint clarify what the lead wanted, what they needed next, and how the campaign was performing.',
    outcomeIntro:
      'The work created a cleaner handoff between brand, acquisition, CRM, lifecycle messaging, and reporting.',
    outcomes: [
      'Service lines and offer language were aligned into one repeatable operating structure.',
      'Lifecycle and CRM behavior became easier to coordinate across acquisition and follow up.',
      'Campaign decisions used clearer downstream signals instead of isolated creative performance.'
    ]
  },
  mirror: {
    summary:
      'Mirror translated low-effort self reporting into calm state logic so emotional context could be readable under cognitive load.',
    problem:
      'Emotional check-ins are often either vague or gamified. Both patterns create pressure and reduce trust in the interface.',
    systemIntro: 'The system converted fuzzy input into explainable state output without pretending to diagnose mood.',
    designMove:
      'I treated emotional UX as signal interpretation, not mood tracking. The interface needed to translate messy self reporting into something calm, explainable, and useful without turning self awareness into another performance loop.',
    outcomeIntro: 'The product became clearer, calmer, and easier to trust when the user needed support most.'
  },
  'meta-airtable-dashboard': {
    summary:
      'This project connected paid media performance with CRM movement, booking behavior, and revenue confidence in one decision layer.',
    problem:
      'Marketing teams had data, but not enough structure to decide what to do next with confidence.',
    systemIntro: 'The system reframed reporting from dashboard output into action-ready operational logic.',
    designMove:
      'I treated reporting as a decision interface, not a dashboard. The goal was to help the team understand which campaigns deserved action, not just which campaigns produced leads.',
    outcomeIntro: 'Weekly optimization became easier because campaign performance was connected to business movement.'
  },
  'snip-provider-pipeline': {
    summary:
      'The workflow turned repetitive provider sourcing into a quality-controlled production pipeline for profile publishing.',
    problem:
      'Manual provider research and media handling consumed team time and introduced avoidable quality inconsistencies.',
    systemIntro: 'The system removed sourcing drag while preserving quality gates and human judgment where needed.',
    designMove:
      'I treated automation as a quality controlled workflow, not a shortcut. The system removed repetitive sourcing drag while preserving human review where trust mattered.',
    outcomeIntro: 'Operations became faster and more reliable because automation was paired with structured QA.'
  },
  'multi-brand-retention': {
    summary:
      'The retention model separated intent and service context so follow-up timing felt relevant instead of generic.',
    problem:
      'Leads with very different readiness levels were receiving nearly identical communication rhythms.',
    systemIntro: 'The system turned lifecycle messaging into a timing-aware operating model across brands.',
    designMove:
      'I treated timing as part of the message. The system separated intent, service interest, and lead readiness so follow up could feel relevant instead of generic.',
    outcomeIntro: 'Follow-up became easier to coordinate and more useful to leads across the full lifecycle.'
  }
}

const SYSTEM_MODEL_BY_SLUG = {
  'smooth-md-growth-os': [
    { label: 'brand position', meaning: 'Define the promise and trust language.' },
    { label: 'offer architecture', meaning: 'Turn services into clear decision paths.' },
    { label: 'lead context', meaning: 'Separate passive ad leads from high intent web leads.' },
    { label: 'CRM state', meaning: 'Track where each person is in the booking journey.' },
    { label: 'lifecycle message', meaning: 'Send the right explanation and CTA based on stage.' },
    { label: 'measurement', meaning: 'Connect campaign performance to booking and revenue signals.' }
  ],
  mirror: [
    { label: 'input signals', meaning: 'Capture energy, tension, clarity, and sleep with low-effort check-ins.' },
    { label: 'normalization', meaning: 'Translate self-reports into comparable ranges without fake medical precision.' },
    { label: 'state matching', meaning: 'Map recurring signal combinations to calm, human-readable states.' },
    { label: 'explanation layer', meaning: 'Explain why the reading appeared and which signals contributed most.' },
    { label: 'next move', meaning: 'Return one grounded action with no streak pressure or productivity loop.' }
  ],
  'meta-airtable-dashboard': [
    { label: 'ad spend', meaning: 'Collect paid-media investment and campaign-level performance context.' },
    { label: 'lead', meaning: 'Capture volume and quality signals from each source and service line.' },
    { label: 'CRM state', meaning: 'Track movement through booking status and conversion readiness.' },
    { label: 'booking', meaning: 'Connect scheduling behavior to marketing inputs and timing windows.' },
    { label: 'revenue', meaning: 'Associate outcomes with attribution confidence instead of false certainty.' },
    { label: 'decision', meaning: 'Surface weekly optimization moves that teams can execute immediately.' }
  ],
  'snip-provider-pipeline': [
    { label: 'source', meaning: 'Pull provider data from reliable public records and source systems.' },
    { label: 'enrich', meaning: 'Add metadata and media candidates required for publish-ready profiles.' },
    { label: 'validate', meaning: 'Run quality gates to flag weak, missing, or incorrect assets.' },
    { label: 'organize', meaning: 'Standardize files, naming, and review states for handoff.' },
    { label: 'publish', meaning: 'Deliver clean, structured assets for production deployment.' }
  ],
  'multi-brand-retention': [
    { label: 'source', meaning: 'Capture lead origin to preserve intent context from first touch.' },
    { label: 'intent', meaning: 'Classify readiness so low and high intent do not share the same cadence.' },
    { label: 'service', meaning: 'Route people into the right service pathway and offer language.' },
    { label: 'timing', meaning: 'Trigger lifecycle moments at behavior-based intervals, not fixed blasts.' },
    { label: 'message', meaning: 'Deliver explanation and proof matched to where they are in the journey.' },
    { label: 'booking', meaning: 'Drive toward conversion while preserving trust and brand consistency.' }
  ]
}

const PROBLEM_CONTEXT_BY_SLUG = {
  'smooth-md-growth-os': {
    before: ['fragmented campaign assets', 'inconsistent CRM logic', 'uneven follow up timing'],
    after: ['one operating layer', 'clear offer architecture', 'connected lifecycle and measurement']
  },
  mirror: {
    before: ['vague emotional check-in output', 'pressure loops from streak-oriented UX', 'low trust in interpretation logic'],
    after: ['readable signal model', 'clear explanation layer', 'one calm next move']
  },
  'meta-airtable-dashboard': {
    before: ['dashboard-heavy reporting', 'unclear action priority', 'CRM and revenue disconnected from media'],
    after: ['decision-ready reporting layer', 'shared performance language', 'connected spend to booking and revenue']
  },
  'snip-provider-pipeline': {
    before: ['manual provider sourcing drag', 'uneven image quality and metadata', 'fragile handoff structure'],
    after: ['repeatable sourcing workflow', 'quality gates before publish', 'structured handoff system']
  },
  'multi-brand-retention': {
    before: ['generic lifecycle blasts', 'intent and service mixed together', 'timing disconnected from readiness'],
    after: ['intent-aware routing', 'service-specific cadence', 'timing aligned to booking behavior']
  }
}

const OUTCOME_BY_SLUG = {
  'smooth-md-growth-os': [
    'Service lines and offer language were aligned into one repeatable operating structure.',
    'Lifecycle and CRM behavior became easier to coordinate across acquisition and follow-up.',
    'Campaign decisions used clearer downstream signals instead of isolated creative performance.'
  ],
  mirror: [
    'Signal states became readable without turning reflection into a performance loop.',
    'Component behavior and state logic were production-oriented, not just conceptual screens.',
    'The product could explain why a reading appeared and suggest one grounded next action.'
  ],
  'meta-airtable-dashboard': [
    'Ad and CRM inputs were unified into one decision-ready performance view.',
    'Teams could review campaign health with attribution confidence instead of guesswork.',
    'Optimization choices were tied to booking and revenue movement, not vanity metrics.'
  ],
  'snip-provider-pipeline': [
    'Manual sourcing overhead dropped through automation and validation gates.',
    'Quality checks improved consistency before assets reached publication workflows.',
    'Handoff moved from ad hoc file dumps to a reliable, structured pipeline.'
  ],
  'multi-brand-retention': [
    'Follow-up timing reflected intent and service context instead of batch email cadence.',
    'Lifecycle communication became more consistent across multi-brand operations.',
    'Retention flows emphasized trust and booking progress over promotional noise.'
  ]
}

const OUTCOME_INTRO_BY_SLUG = {
  mirror: 'The system made emotional signal feedback calmer, clearer, and more actionable.',
  'meta-airtable-dashboard': 'The dashboard model created a tighter bridge between marketing signals and business decisions.',
  'snip-provider-pipeline': 'The workflow reduced manual overhead and improved quality consistency in production handoff.',
  'multi-brand-retention': 'Lifecycle behavior became easier to orchestrate across services, brands, and intent levels.'
}

function sectionDomId(slug, sectionId) {
  return `${slug}-case-${sectionId}`
}

function getCaseCopy(workspace) {
  const mapped = CASE_COPY_BY_SLUG[workspace.slug] ?? {}
  return {
    thesis: mapped.thesis ?? workspace.thesis,
    summary: mapped.summary ?? workspace.oneLine,
    problem: mapped.problem ?? workspace.signal,
    systemIntro: mapped.systemIntro ?? workspace.system,
    designMove:
      mapped.designMove ??
      'I treated the project as an operating system, not a static deliverable, so each touchpoint could drive clearer decisions and cleaner handoff.',
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

function BriefSection({ workspace }) {
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'brief')} className='space-y-8 border-b border-[#11100d]/10 pb-12'>
      <div className='grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)] xl:items-end'>
        <h3 className='max-w-[48rem] text-[40px] leading-[1.01] tracking-[-0.03em] text-[#11100d] lg:text-[62px]'>{copy.thesis}</h3>
        <p className='max-w-[34rem] text-base leading-[1.65] text-[#11100d]/68'>{copy.summary}</p>
      </div>

      <div className='grid border-y border-[#11100d]/10 md:grid-cols-3 md:divide-x md:divide-[#11100d]/10'>
        {workspace.metrics.map((metric) => (
          <div key={metric.label} className='border-b border-[#11100d]/10 px-2 py-3 text-left last:border-b-0 md:border-b-0 md:px-4'>
            <div className='text-[22px] leading-none tracking-[-0.03em] text-[#11100d]'>{metric.value}</div>
            <div className='mt-2 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/42'>{metric.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProblemSection({ workspace }) {
  const context = getProblemContext(workspace)
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'problem')} className='space-y-7 border-b border-[#11100d]/10 pb-12'>
      <h4 className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>Problem</h4>
      <p className='max-w-3xl text-base leading-[1.65] text-[#11100d]/68'>{copy.problem}</p>
      <dl className='grid gap-6 border-t border-[#11100d]/10 pt-6 md:grid-cols-2 md:gap-8'>
        <div>
          <dt className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>Before</dt>
          <dd className='mt-3 space-y-2'>
            {context.before.map((item) => (
              <p key={item} className='text-[15px] leading-7 text-[#11100d]/70'>
                {item}
              </p>
            ))}
          </dd>
        </div>
        <div className='border-t border-[#11100d]/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0'>
          <dt className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>After</dt>
          <dd className='mt-3 space-y-2'>
            {context.after.map((item) => (
              <p key={item} className='text-[15px] leading-7 text-[#11100d]/70'>
                {item}
              </p>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  )
}

function SystemSection({ workspace }) {
  const model = getSystemModel(workspace)
  const copy = getCaseCopy(workspace)

  return (
    <section id={sectionDomId(workspace.slug, 'system')} className='space-y-7 border-b border-[#11100d]/10 pb-12'>
      <h4 className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>System</h4>
      <p className='max-w-3xl text-base leading-[1.65] text-[#11100d]/68'>{copy.systemIntro}</p>

      <div className='rounded-[22px] border border-[#11100d]/14 bg-[#171512] px-5 py-6 text-[#f7f1e7] lg:px-7 lg:py-7'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/44'>System model</div>
          <span className='h-2 w-2 rounded-full' style={{ backgroundColor: workspace.accent }} aria-hidden='true' />
        </div>

        <div className='divide-y divide-[#f7f1e7]/10'>
          {model.map((step, index) => (
            <div key={step.label} className='grid gap-3 py-4 sm:grid-cols-[58px_1fr] sm:items-start'>
              <div className='text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/50'>{String(index + 1).padStart(2, '0')}</div>
              <div>
                <div className='text-[13px] uppercase tracking-[0.12em] text-[#f7f1e7]/84'>{step.label}</div>
                <p className='mt-2 max-w-3xl text-[14px] leading-6 text-[#f7f1e7]/72'>{step.meaning}</p>
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
    <section id={sectionDomId(workspace.slug, 'design-move')} className='space-y-6 border-b border-[#11100d]/10 pb-12'>
      <h4 className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>Design move</h4>
      <p className='max-w-3xl text-base leading-[1.65] text-[#11100d]/68'>{copy.designMove}</p>
    </section>
  )
}

function DecisionsSection({ workspace }) {
  const rows = ['constraint', 'move', 'tradeoff', 'principle'].map((key) => {
    const decision = workspace.decisions.find((item) => item.label === key)
    return { key, body: decision?.body ?? 'Not captured for this case.' }
  })

  return (
    <section id={sectionDomId(workspace.slug, 'decisions')} className='space-y-6 border-b border-[#11100d]/10 pb-12'>
      <h4 className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>Decisions</h4>
      <div className='border-y border-[#11100d]/10'>
        {rows.map((row) => (
          <div key={row.key} className='grid grid-cols-1 gap-2 border-b border-[#11100d]/10 px-2 py-4 last:border-b-0 md:grid-cols-[170px_1fr] md:gap-4 md:px-4'>
            <div className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/42'>{row.key}</div>
            <p className='text-[15px] leading-7 text-[#11100d]/70'>{row.body}</p>
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
    <section id={sectionDomId(workspace.slug, 'outcome')} className='space-y-6 pb-3'>
      <h4 className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>What changed</h4>
      <p className='max-w-3xl text-base leading-[1.65] text-[#11100d]/68'>{copy.outcomeIntro}</p>
      <ul className='divide-y divide-[#11100d]/10 border-y border-[#11100d]/10'>
        {outcomeItems.map((item) => (
          <li key={item} className='py-3 text-[15px] leading-7 text-[#11100d]/70'>
            {item}
          </li>
        ))}
      </ul>
      <p className='pt-1 text-[12px] leading-6 text-[#11100d]/54'>Related proof lives in the archive inspector.</p>
    </section>
  )
}

export default function CaseWorkspace({ workspace, closeWorkspace }) {
  return (
    <AnimatePresence>
      {workspace ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 bg-[#11100d]/45 p-3 lg:p-8'
        >
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className='mx-auto h-full w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#11100d]/12 bg-[#f7f1e7] shadow-[0_40px_120px_rgba(17,16,13,0.25)]'
            role='dialog'
            aria-modal='true'
            aria-label={`${workspace.title} case file workspace`}
          >
            <div className='grid h-full grid-rows-[auto_1fr]'>
              <header className='border-b border-[#11100d]/10 px-5 py-4 lg:px-7'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <div className='text-[9px] uppercase tracking-[0.16em] text-[#11100d]/42'>case file workspace</div>
                    <h2 className='mt-1 text-lg tracking-[-0.02em] text-[#11100d]'>{workspace.title}</h2>
                  </div>
                  <button
                    aria-label='Close workspace'
                    onClick={closeWorkspace}
                    className='flex h-11 w-11 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]/60 transition hover:text-[#11100d]'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </div>
                <div className='mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/42'>
                  {[workspace.category, workspace.timeline, workspace.status, workspace.role].map((item, index) => (
                    <React.Fragment key={item}>
                      {index > 0 ? <span className='h-1 w-1 rounded-full bg-[#11100d]/18' aria-hidden='true' /> : null}
                      <span>{item}</span>
                    </React.Fragment>
                  ))}
                </div>
              </header>

              <div className='grid h-full grid-cols-1 overflow-hidden lg:grid-cols-[240px_1fr]'>
                <aside className='hidden border-r border-[#11100d]/10 px-4 py-6 lg:block'>
                  <div className='sticky top-0 space-y-6'>
                    {SECTIONS.map((section) => (
                      <button
                        key={section.id}
                        type='button'
                        onClick={() => scrollToSection(workspace, section.id)}
                        className='w-full rounded-full px-3 py-2 text-left text-[10px] uppercase tracking-[0.14em] text-[#11100d]/54 transition hover:bg-[#11100d]/6 hover:text-[#11100d]'
                      >
                        {section.label}
                      </button>
                    ))}

                    <div className='border-t border-[#11100d]/10 pt-4'>
                      <div className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>case summary</div>
                      <div className='mt-3 space-y-2 text-[12px] leading-6 text-[#11100d]/62'>
                        <p>{workspace.type}</p>
                        <p>{workspace.role}</p>
                      </div>
                    </div>
                  </div>
                </aside>

                <main className='h-full overflow-y-auto px-5 py-7 lg:px-10 lg:py-10'>
                  <div className='relative space-y-12 lg:space-y-16'>
                    <BriefSection workspace={workspace} />
                    <ProblemSection workspace={workspace} />
                    <SystemSection workspace={workspace} />
                    <DesignMoveSection workspace={workspace} />
                    <DecisionsSection workspace={workspace} />
                    <OutcomeSection workspace={workspace} />
                  </div>
                </main>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
