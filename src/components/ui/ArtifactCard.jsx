import React from 'react'
import cx from '../../utils/cx'

const TYPE_LABELS = {
  image: 'image',
  dashboard: 'dashboard',
  email: 'email',
  prototype: 'prototype',
  document: 'document',
  flow: 'flow',
  code: 'code',
  external: 'external'
}

const PLACEHOLDER_LABEL = 'artifact slot ready'
const PLACEHOLDER_CAPTION = 'add screenshot, dashboard, email, prototype, document, or production proof'

function statusTone(status) {
  if (status === 'ready') {
    return 'text-[#11100d]/42'
  }

  return 'text-[#11100d]/54'
}

function displayStatus(status) {
  if (!status) return 'queued'
  if (status === 'needs screenshot' || status === 'needs visual' || status === 'needs metric' || status === 'needs polish' || status === 'needs link') return 'queued'
  return status
}

export default function ArtifactCard({ artifact = {}, className, compact = false }) {
  const type = TYPE_LABELS[artifact.type] ?? 'image'
  const label = artifact.label || PLACEHOLDER_LABEL
  const caption = artifact.caption || PLACEHOLDER_CAPTION
  const status = displayStatus(artifact.status)
  const hasSource = typeof artifact.src === 'string' && artifact.src.trim().length > 0

  return (
    <article
      className={cx('overflow-hidden rounded-[8px] border border-[#11100d]/10 bg-[#f7f1e7]', compact ? 'p-2.5' : 'p-3', className)}
      aria-label={label}
    >
      <div className={cx('overflow-hidden border border-[#11100d]/10', compact ? 'h-20' : 'h-28')}>
        {hasSource ? (
          <img src={artifact.src} alt={label} className='h-full w-full object-cover' loading='lazy' />
        ) : (
          <div className='flex h-full w-full flex-col justify-center bg-[#fffaf1] px-3 text-left'>
            <div className='mb-2 h-px w-10 bg-[#11100d]/18' aria-hidden='true' />
            <p className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/44'>{label}</p>
            {!compact ? <p className='mt-1 text-[11px] leading-relaxed text-[#11100d]/55'>{caption}</p> : null}
          </div>
        )}
      </div>

      <div className='mt-2.5 space-y-1.5'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-[9px] uppercase tracking-[0.14em] text-[#11100d]/42'>{type}</span>
          <span className={cx('border-l border-[#11100d]/12 pl-2 text-[9px] uppercase tracking-[0.1em]', statusTone(status))}>{status}</span>
        </div>

        <p className='text-xs leading-5 text-[#11100d]'>{label}</p>

        {!compact ? <p className='text-[12px] leading-5 text-[#11100d]/62'>{caption}</p> : null}
      </div>
    </article>
  )
}
