import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const ARTIFACT_NEEDS = {
  'smooth-md-growth-os': {
    title: 'Brand operating system board',
    note: 'Capture the board that connects positioning, offer structure, lifecycle messaging, CRM states, and measurement.'
  },
  mirror: {
    title: 'Signal interpretation map',
    note: 'Show the product logic that translates energy, tension, clarity, and sleep into calm state output.'
  },
  'meta-airtable-dashboard': {
    title: 'Attribution architecture diagram',
    note: 'Document how campaign inputs, CRM state, revenue attribution, and decision output connect.'
  },
  'snip-provider-pipeline': {
    title: 'API to asset pipeline map',
    note: 'Show provider sourcing, enrichment, validation, scoring, and handoff in one operating view.'
  },
  'multi-brand-retention': {
    title: 'Lifecycle flow map',
    note: 'Visualize the timing, routing, and message logic behind the retention engine.'
  }
}

function actionLabel(status, hasSource) {
  if (hasSource) return 'View receipt'
  if (status === 'needs link') return 'Add link'
  if (status === 'needs metric') return 'Add metric'
  if (status === 'needs visual') return 'Add visual'
  return 'Add screenshot'
}

export default function OverviewArtifact({ record, onOpenWorkspace, compact = false }) {
  const receipt = record.receipts?.[0] ?? null
  const artifact = receipt?.artifacts?.[0] ?? null
  const fallback = ARTIFACT_NEEDS[record.slug] ?? {
    title: receipt?.name || 'Primary system artifact',
    note: 'Add the strongest proof asset for this project overview.'
  }
  const hasSource = Boolean(artifact?.src?.trim())
  const title = artifact?.label || fallback.title
  const status = artifact?.status || receipt?.status || 'needs screenshot'
  const detail = artifact?.caption || receipt?.claim || fallback.note
  const tags = (receipt?.contents ?? record.path ?? []).slice(0, compact ? 3 : 4)

  return (
    <section className='rounded-[24px] border border-[#11100d]/10 bg-[#fffaf1] p-4 lg:p-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <div className='text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38'>Primary artifact</div>
          <h3 className='mt-1 text-sm tracking-[-0.01em] text-[#11100d]'>{title}</h3>
        </div>
        <div className='flex items-center gap-2'>
          <span className='rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/56'>
            {status}
          </span>
          {onOpenWorkspace ? (
            <button
              type='button'
              onClick={() => onOpenWorkspace(record)}
              className='inline-flex h-9 items-center gap-1.5 rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/72 transition hover:border-[#11100d]/18 hover:text-[#11100d]'
            >
              {actionLabel(status, hasSource)}
              <ArrowUpRight className='h-3.5 w-3.5' />
            </button>
          ) : null}
        </div>
      </div>

      <div
        className='mt-4 overflow-hidden rounded-[20px] border border-[#11100d]/8'
        style={{ background: `linear-gradient(140deg, ${record.accent}26 0%, #fffaf1 45%, #f2eadf 100%)` }}
      >
        {hasSource ? (
          <img src={artifact.src} alt={title} className={`w-full object-cover ${compact ? 'h-48' : 'h-64 lg:h-[320px]'}`} loading='lazy' />
        ) : (
          <div className={`flex flex-col justify-between ${compact ? 'min-h-48 p-4' : 'min-h-64 p-5 lg:min-h-[320px] lg:p-6'}`}>
            <div className='flex items-center justify-between gap-3'>
              <span className='rounded-full border border-[#11100d]/10 bg-[#fffaf1]/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/48'>
                {receipt?.format || 'visual proof'}
              </span>
              <span className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>{record.timeline}</span>
            </div>

            <div className='max-w-[32rem]'>
              <div className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40'>Needed asset</div>
              <p className={`mt-3 tracking-[-0.03em] text-[#11100d] ${compact ? 'text-[28px] leading-[1.06]' : 'text-[34px] leading-[1.02] lg:text-[42px]'}`}>
                {fallback.title}
              </p>
              <p className='mt-3 max-w-[34rem] text-[14px] leading-6 text-[#11100d]/62'>{fallback.note}</p>
            </div>

            <div className='mt-6 flex flex-wrap gap-1.5'>
              {tags.map((item) => (
                <span key={item} className='rounded-full border border-[#11100d]/10 bg-[#fffaf1]/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/50'>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className='mt-4 max-w-[42rem] text-[14px] leading-6 text-[#11100d]/64'>{detail}</p>
    </section>
  )
}