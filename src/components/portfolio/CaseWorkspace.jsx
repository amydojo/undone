import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import ArtifactCard from '../ui/ArtifactCard'
import cx from '../../utils/cx'

function WorkspaceSection({ title, children, right }) {
  return (
    <section className={cx('rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1] p-5', right && 'h-full')}>
      <div className='mb-3 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/40'>{title}</div>
      {children}
    </section>
  )
}

export default function CaseWorkspace({ workspace, closeWorkspace, mode, activeReceipt, onSelectReceipt }) {
  const selectedReceipt = activeReceipt ?? workspace?.receipts?.[0] ?? null
  const selectedArtifacts = selectedReceipt?.artifacts?.length ? selectedReceipt.artifacts : [{}]
  const selectedContents = selectedReceipt?.contents ?? []
  const owned = workspace?.owned ?? []
  const nextProof = workspace?.nextProof ?? []

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

                  <WorkspaceSection title='artifacts'>
                    <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-1'>
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
