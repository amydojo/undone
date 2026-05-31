import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import ArtifactCard from '../ui/ArtifactCard'
import cx from '../../utils/cx'

const MIRROR_PIPELINE_STEPS = [
  {
    id: '01',
    chip: 'input',
    title: 'Input capture',
    body: 'Energy, tension, clarity, and sleep are collected as lightweight self-report signals.'
  },
  {
    id: '02',
    chip: 'range',
    title: 'Signal normalization',
    body: 'Each input is translated into a readable range so the system can compare patterns without pretending to be medically precise.'
  },
  {
    id: '03',
    chip: 'state',
    title: 'State matching',
    body: 'The system checks recurring combinations and maps them to calm, human-readable states like frayed, compressed, drifting, or settled.'
  },
  {
    id: '04',
    chip: 'reason',
    title: 'Explanation layer',
    body: 'Mirror shows why the reading appeared, what signals contributed, and what kind of support may fit the moment.'
  },
  {
    id: '05',
    chip: 'response',
    title: 'Next move',
    body: 'The output is intentionally small. No streaks. No pressure loop. Just one grounded action.'
  }
]

const MIRROR_SAMPLE_SIGNALS = [
  ['sleep', 'fragmented'],
  ['tension', 'high'],
  ['clarity', 'low'],
  ['energy', 'low']
]

function WorkspaceSection({ title, children, right }) {
  return (
    <section className={cx('rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1] p-5', right && 'h-full')}>
      <div className='mb-3 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/40'>{title}</div>
      {children}
    </section>
  )
}

function WorkspaceReadinessSummary({ workspace }) {
  const all = workspace.receipts.flatMap((r) => r.artifacts ?? [])
  const acc = all.reduce(
    (a, art) => {
      if (art.status === 'ready') a.ready += 1
      else if (art.status === 'needs screenshot') a.screenshot += 1
      else if (art.status === 'needs metric') a.metric += 1
      else if (art.status === 'needs polish') a.polish += 1
      return a
    },
    { ready: 0, screenshot: 0, metric: 0, polish: 0 }
  )
  const counts = [
    { label: 'Ready', count: acc.ready, dot: 'bg-emerald-500/60' },
    { label: 'Screenshot', count: acc.screenshot, dot: 'bg-amber-400/70' },
    { label: 'Metric', count: acc.metric, dot: 'bg-sky-400/70' },
    { label: 'Polish', count: acc.polish, dot: 'bg-violet-400/60' },
  ].filter((item) => item.count > 0)

  if (counts.length === 0) return null

  return (
    <div className='flex flex-wrap gap-2 rounded-[14px] border border-[#11100d]/8 bg-[#fffaf1]/70 px-3 py-2.5'>
      {counts.map(({ label, count, dot }) => (
        <span key={label} className='flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/52'>
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {count} {label}
        </span>
      ))}
    </div>
  )
}

function MirrorSystemWorkspace({ workspace, selectedReceipt, mode }) {
  const accentBorder = `${workspace.accent}33`
  const accentWash = `${workspace.accent}14`
  const accentStrong = `${workspace.accent}22`
  const receiptContents = selectedReceipt?.contents ?? []
  const selectedArtifact = selectedReceipt?.artifacts?.[0] ?? {}

  return (
    <div className='grid gap-3 lg:grid-cols-[1.1fr_0.9fr]'>
      <WorkspaceSection title='signal pipeline'>
        <div className='flex items-start justify-between gap-3 border-b border-[#11100d]/8 pb-4'>
          <div>
            <h3 className='text-base tracking-[-0.02em] text-[#11100d]'>Signal pipeline</h3>
            <p className='mt-2 max-w-xl text-[13px] leading-6 text-[#11100d]/66'>Mirror turns messy self-reporting into a readable emotional signal.</p>
          </div>
          <span
            className='rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/56'
            style={{ borderColor: accentBorder, backgroundColor: accentWash }}
          >
            affective ux system
          </span>
        </div>

        <div className='mt-4 space-y-3'>
          {MIRROR_PIPELINE_STEPS.map((step, index) => (
            <div key={step.id} className='relative pl-5'>
              {index < MIRROR_PIPELINE_STEPS.length - 1 ? (
                <span className='absolute left-[7px] top-8 h-[calc(100%-1rem)] w-px bg-[#11100d]/10' aria-hidden='true' />
              ) : null}
              <span
                className='absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border border-[#11100d]/12 bg-[#fffaf1]'
                style={{ boxShadow: `0 0 0 3px ${accentWash}` }}
                aria-hidden='true'
              />
              <div className='rounded-[18px] border border-[#11100d]/10 bg-[#f7f1e7] px-3.5 py-3'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <div className='flex items-center gap-2.5'>
                    <span className='text-[10px] uppercase tracking-[0.16em] text-[#11100d]/38'>{step.id}</span>
                    <h4 className='text-sm tracking-[-0.01em] text-[#11100d]'>{step.title}</h4>
                  </div>
                  <span
                    className='rounded-full border px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/52'
                    style={{ borderColor: accentBorder, backgroundColor: accentWash }}
                  >
                    {step.chip}
                  </span>
                </div>
                <p className='mt-2 text-[13px] leading-6 text-[#11100d]/68'>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </WorkspaceSection>

      <WorkspaceSection title='sample reading' right>
        <div
          className='rounded-[22px] border px-4 py-4 shadow-[0_12px_30px_rgba(17,16,13,0.08)]'
          style={{ borderColor: accentBorder, backgroundColor: '#181614' }}
        >
          <div className='flex items-start justify-between gap-3'>
            <div>
              <div className='text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/46'>live output</div>
              <h3 className='mt-2 text-lg tracking-[-0.03em] text-[#fffaf1]'>frayed</h3>
            </div>
            <span
              className='rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#fffaf1]/78'
              style={{ borderColor: accentStrong, backgroundColor: accentWash }}
            >
              likely
            </span>
          </div>

          <div className='mt-4 rounded-[18px] border border-[#f7f1e7]/10 bg-[#201d1a] px-3 py-3'>
            <div className='text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/42'>signals</div>
            <dl className='mt-3 space-y-2'>
              {MIRROR_SAMPLE_SIGNALS.map(([label, value]) => (
                <div key={label} className='flex items-center justify-between gap-3 border-b border-[#f7f1e7]/8 pb-2 last:border-b-0 last:pb-0'>
                  <dt className='text-[11px] uppercase tracking-[0.14em] text-[#f7f1e7]/46'>{label}</dt>
                  <dd className='text-sm text-[#fffaf1]'>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className='mt-4 space-y-3'>
            <div>
              <div className='text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/42'>why this appeared</div>
              <p className='mt-2 text-[13px] leading-6 text-[#f7f1e7]/78'>Low sleep combined with high tension and low clarity suggests the system is overloaded but still trying to function.</p>
            </div>
            <div>
              <div className='text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/42'>next move</div>
              <p className='mt-2 text-[13px] leading-6 text-[#f7f1e7]/78'>Reduce incoming input. Do one task with no switching.</p>
            </div>
            <div className='rounded-[16px] border border-[#f7f1e7]/10 bg-[#201d1a] px-3 py-2.5'>
              <div className='text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/42'>what this proves</div>
              <p className='mt-1 text-sm text-[#fffaf1]'>I can design product logic, not just screens.</p>
            </div>
          </div>
        </div>

        <div className='mt-4 rounded-[18px] border border-[#11100d]/10 bg-[#f7f1e7] p-3'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <div>
              <div className='text-[9px] uppercase tracking-[0.16em] text-[#11100d]/40'>selected receipt</div>
              <h3 className='mt-1 text-sm tracking-[-0.01em] text-[#11100d]'>{selectedReceipt?.name}</h3>
            </div>
            <span className='rounded-full border border-[#11100d]/12 bg-[#fffaf1] px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/56'>
              {selectedReceipt?.status || 'needs screenshot'}
            </span>
          </div>

          <p className='mt-3 text-[13px] leading-6 text-[#11100d]/68'>{mode === 'proof' ? selectedReceipt?.proof : selectedReceipt?.claim}</p>

          <div className='mt-3 flex flex-wrap gap-1.5'>
            {receiptContents.slice(0, 4).map((item) => (
              <span key={item} className='rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/54'>
                {item}
              </span>
            ))}
          </div>

          <ArtifactCard artifact={selectedArtifact} compact className='mt-3' />
        </div>
      </WorkspaceSection>
    </div>
  )
}

export default function CaseWorkspace({ workspace, closeWorkspace, mode, activeReceipt, onSelectReceipt }) {
  const selectedReceipt = activeReceipt ?? workspace?.receipts?.[0] ?? null
  const selectedArtifacts = selectedReceipt?.artifacts?.length ? selectedReceipt.artifacts : [{}]
  const selectedContents = selectedReceipt?.contents ?? []
  const owned = workspace?.owned ?? []
  const nextProof = workspace?.nextProof ?? []
  const isMirrorWorkspace = workspace?.slug === 'mirror'

  return (
    <AnimatePresence>
      {workspace && (
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
              <header className='flex items-center justify-between border-b border-[#11100d]/10 px-5 py-4 lg:px-7'>
                <div>
                  <div className='text-[9px] uppercase tracking-[0.2em] text-[#11100d]/42'>case file workspace</div>
                  <h2 className='mt-1 text-lg tracking-[-0.02em]'>{workspace.title}</h2>
                </div>
                <button
                  aria-label='Close workspace'
                  onClick={closeWorkspace}
                  className='flex h-11 w-11 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]/60 transition hover:text-[#11100d]'
                >
                  <X className='h-4 w-4' />
                </button>
              </header>

              <div className='grid h-full grid-cols-1 gap-3 overflow-y-auto p-4 lg:grid-cols-[1.35fr_1fr] lg:gap-4 lg:p-6'>
                <div className='space-y-3'>
                  <WorkspaceSection title='overview'>
                    <p className='text-sm leading-7 text-[#11100d]/70'>{workspace.system}</p>
                    <p className='mt-3 rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7] px-3 py-2 text-[12px] leading-5 text-[#11100d]/62'>
                      Evidence archive in progress. Placeholder slots mark the exact proof assets being added.
                    </p>
                  </WorkspaceSection>

                  {isMirrorWorkspace ? (
                    <MirrorSystemWorkspace workspace={workspace} selectedReceipt={selectedReceipt} mode={mode} />
                  ) : (
                    <WorkspaceSection title='system'>
                      <div className='grid gap-2 sm:grid-cols-2'>
                        {workspace.path.map((step, i) => (
                          <div key={step} className='rounded-[18px] border border-[#11100d]/10 bg-[#f7f1e7] p-3'>
                            <div className='text-[9px] uppercase tracking-[0.15em] text-[#11100d]/36'>step {String(i + 1).padStart(2, '0')}</div>
                            <div className='mt-1 text-sm text-[#11100d]/75'>{step}</div>
                          </div>
                        ))}
                      </div>
                    </WorkspaceSection>
                  )}

                  <WorkspaceSection title='decisions'>
                    <div className='grid gap-2 sm:grid-cols-2'>
                      {workspace.decisions.map((decision) => (
                        <div key={decision.label} className='rounded-[18px] border border-[#11100d]/10 bg-[#f7f1e7] p-3'>
                          <div className='text-[9px] uppercase tracking-[0.16em] text-[#11100d]/36'>{decision.label}</div>
                          <p className='mt-1 text-[12px] leading-6 text-[#11100d]/66'>{decision.body}</p>
                        </div>
                      ))}
                    </div>
                  </WorkspaceSection>

                  <WorkspaceSection title='receipts'>
                    <div className='space-y-2'>
                      {workspace.receipts.map((receipt) => {
                        const active = selectedReceipt?.id === receipt.id
                        const compactArtifact = receipt.artifacts?.[0] ?? {}

                        return (
                          <button
                            key={receipt.id}
                            onClick={() => onSelectReceipt(receipt.id)}
                            className={cx(
                              'w-full rounded-[18px] border p-3 text-left',
                              active ? 'border-[#11100d]/20 bg-[#11100d]/5' : 'border-[#11100d]/10 bg-[#f7f1e7]'
                            )}
                          >
                            <div className='flex items-center justify-between gap-2'>
                              <div className='text-[10px] uppercase tracking-[0.16em] text-[#11100d]/36'>{receipt.format}</div>
                              <span className='rounded-full border border-[#11100d]/12 bg-[#fffaf1] px-2 py-1 text-[9px] tracking-[0.03em] text-[#11100d]/58'>
                                {receipt.status || 'needs screenshot'}
                              </span>
                            </div>
                            <div className='mt-1 text-sm text-[#11100d]'>{receipt.name}</div>
                            <div className='mt-1 text-[13px] leading-6 text-[#11100d]/62'>{mode === 'proof' ? receipt.proof : receipt.claim}</div>
                            <ArtifactCard artifact={compactArtifact} compact className='mt-2' />
                          </button>
                        )
                      })}
                    </div>
                  </WorkspaceSection>
                </div>

                <div className='space-y-3'>
                  {!isMirrorWorkspace ? (
                    <WorkspaceSection title='selected receipt' right>
                      <h3 className='text-sm tracking-[-0.01em] text-[#11100d]'>{selectedReceipt?.name}</h3>
                      <div className='mt-2 flex items-center justify-between gap-2'>
                        <p className='text-[13px] leading-6 text-[#11100d]/74'>{selectedReceipt?.proof}</p>
                        <span className='rounded-full border border-[#11100d]/12 bg-[#f7f1e7] px-2 py-1 text-[9px] tracking-[0.03em] text-[#11100d]/58'>
                          {selectedReceipt?.status || 'needs screenshot'}
                        </span>
                      </div>

                      <div className='mt-4 grid gap-2'>
                        {(mode === 'proof' ? selectedContents : selectedContents.slice(0, 3)).map((item) => (
                          <div key={item} className='rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7] px-3 py-2 text-[12px] text-[#11100d]/68'>
                            {item}
                          </div>
                        ))}
                      </div>
                    </WorkspaceSection>
                  ) : null}

                  <WorkspaceSection title='artifacts'>
                    <WorkspaceReadinessSummary workspace={workspace} />
                    <div className='mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1'>
                      {selectedArtifacts.map((artifact, index) => (
                        <ArtifactCard key={artifact.id || `${selectedReceipt?.id || 'receipt'}-artifact-${index}`} artifact={artifact} />
                      ))}
                    </div>
                  </WorkspaceSection>

                  <WorkspaceSection title='why this matters'>
                    <p className='text-[13px] leading-6 text-[#11100d]/68'>{workspace.hiringTranslation}</p>
                  </WorkspaceSection>

                  <WorkspaceSection title='what I owned'>
                    <div className='flex flex-wrap gap-1.5'>
                      {owned.map((item) => (
                        <span key={item} className='rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/52'>
                          {item}
                        </span>
                      ))}
                    </div>
                  </WorkspaceSection>

                  <WorkspaceSection title='what to add next'>
                    <ul className='space-y-1.5'>
                      {nextProof.map((item) => (
                        <li key={item} className='flex items-start gap-2 text-[12px] leading-5 text-[#11100d]/68'>
                          <CheckCircle2 className='mt-0.5 h-3.5 w-3.5 text-[#11100d]/44' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </WorkspaceSection>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
