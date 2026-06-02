import React from 'react'

const SYSTEM_OBJECTS = {
  mirror: {
    title: 'Signal inspector',
    purpose: 'Turns low-effort self-reporting into calm product logic.',
    flow: ['input', 'normalize', 'match', 'explain', 'respond'],
    contrast: {
      leftLabel: 'Input',
      left: ['energy', 'tension', 'clarity', 'sleep'],
      rightLabel: 'Output',
      right: ['state: frayed', 'confidence: likely', 'next move: rest'],
    },
  },
  'smooth-md-growth-os': {
    title: 'Operating layer',
    purpose: 'Turns scattered campaign work into repeatable clinic growth logic.',
    flow: ['position', 'offer', 'lead', 'CRM', 'lifecycle', 'measure'],
    contrast: {
      leftLabel: 'Before',
      left: ['scattered promos', 'inconsistent follow-up'],
      rightLabel: 'After',
      right: ['unified offer logic', 'lifecycle routing', 'measurable handoff'],
    },
  },
  'meta-airtable-dashboard': {
    title: 'Decision layer',
    purpose: 'Turns ad performance into downstream campaign decisions.',
    flow: ['spend', 'lead', 'CRM', 'booking', 'revenue', 'decision'],
    contrast: {
      leftLabel: 'Before',
      left: ['CPL as main signal'],
      rightLabel: 'After',
      right: ['booking behavior', 'revenue context'],
    },
  },
  'snip-provider-pipeline': {
    title: 'Provider pipeline',
    purpose: 'Turns manual provider sourcing into a quality-checked workflow.',
    flow: ['source', 'enrich', 'validate', 'organize', 'publish'],
    contrast: {
      leftLabel: 'Before',
      left: ['repeated searching', 'manual asset cleanup'],
      rightLabel: 'After',
      right: ['structured profiles', 'review-ready assets'],
    },
  },
  'multi-brand-retention': {
    title: 'Lifecycle router',
    purpose: 'Turns mixed lead intent into service-specific follow-up.',
    flow: ['source', 'intent', 'service', 'timing', 'message', 'booking'],
    contrast: {
      leftLabel: 'Before',
      left: ['generic promo rhythm'],
      rightLabel: 'After',
      right: ['relevant timing', 'service-specific messaging'],
    },
  },
}

export default function OverviewArtifact({ record }) {
  const obj = SYSTEM_OBJECTS[record.slug]
  if (!obj) return null

  return (
    <div className='overflow-hidden rounded-[20px] border border-[#11100d]/10 bg-[#fffaf1]'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-4 lg:px-5 lg:py-5'>
        <div className='flex min-w-0 items-center gap-3'>
          <span
            className='h-2.5 w-2.5 shrink-0 rounded-full'
            style={{ background: record.accent }}
            aria-hidden='true'
          />
          <span className='text-[17px] font-medium tracking-[-0.022em] text-[#11100d] lg:text-[19px]'>
            {obj.title}
          </span>
        </div>
        <span className='text-[9px] uppercase tracking-[0.11em] text-[#11100d]/26'>system object</span>
      </div>

      {/* Purpose */}
      <div className='border-t border-[#11100d]/8 px-4 pb-4 pt-3.5 lg:px-5'>
        <p className='min-w-0 text-[13px] leading-[1.6] text-[#11100d]/54 lg:text-[14px]'>{obj.purpose}</p>
      </div>

      {/* Flow */}
      <div className='border-t border-[#11100d]/8 px-4 py-3 lg:px-5'>
        <div className='flex flex-wrap items-center gap-x-1.5 gap-y-1 min-w-0'>
          <span className='mr-1.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/26'>Flow</span>
          {obj.flow.map((step, i) => (
            <React.Fragment key={step}>
              <span className='text-[12px] text-[#11100d]/62'>{step}</span>
              {i < obj.flow.length - 1 && (
                <span className='text-[11px] text-[#11100d]/18' aria-hidden='true'>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Before / After or Input / Output */}
      <div className='grid grid-cols-1 border-t border-[#11100d]/8 sm:grid-cols-2'>
        <div className='min-w-0 px-4 py-4 lg:px-5 lg:py-5'>
          <div className='mb-2.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/28'>
            {obj.contrast.leftLabel}
          </div>
          {obj.contrast.left.map((line) => (
            <div key={line} className='mt-1 text-[12px] leading-[1.55] text-[#11100d]/52'>{line}</div>
          ))}
        </div>
        <div className='min-w-0 px-4 py-4 lg:px-5 lg:py-5 border-t border-[#11100d]/8 sm:border-t-0 sm:border-l sm:border-l-[#11100d]/8'>
          <div className='mb-2.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/28'>
            {obj.contrast.rightLabel}
          </div>
          {obj.contrast.right.map((line) => (
            <div key={line} className='mt-1 text-[12px] leading-[1.55] text-[#11100d]/52'>{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}