import React from 'react'
import { ImagePlus } from 'lucide-react'
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
    return 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700'
  }

  return 'border-[#11100d]/10 bg-[#11100d]/4 text-[#11100d]/62'
}

export default function ArtifactCard({ artifact = {}, className, compact = false }) {
  const type = TYPE_LABELS[artifact.type] ?? 'image'
  const label = artifact.label || PLACEHOLDER_LABEL
  const caption = artifact.caption || PLACEHOLDER_CAPTION
  const status = artifact.status || 'needs screenshot'
  const hasSource = typeof artifact.src === 'string' && artifact.src.trim().length > 0

  return (
    <article className={cx('overflow-hidden rounded-[18px] border border-[#11100d]/10 bg-[#f7f1e7]', compact ? 'p-2.5' : 'p-3', className)}>
      <div className={cx('overflow-hidden rounded-[14px] border border-[#11100d]/10', compact ? 'h-20' : 'h-28')}>
        {hasSource ? (
          <img src={artifact.src} alt={label} className='h-full w-full object-cover' loading='lazy' />
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#fffaf1] to-[#f7f1e7] px-3 text-center'>
            <ImagePlus className={cx('text-[#11100d]/40', compact ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
            <p className='mt-1 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/44'>{PLACEHOLDER_LABEL}</p>
            {!compact ? <p className='mt-1 text-[11px] leading-relaxed text-[#11100d]/55'>{caption}</p> : null}
          </div>
        )}
      </div>

      <div className='mt-2.5 space-y-1.5'>
        <div className='flex items-center justify-between gap-2'>
          <span className='rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/48'>{type}</span>
          <span className={cx('rounded-full border px-2 py-1 text-[9px] tracking-[0.03em]', statusTone(status))}>{status}</span>
        </div>

        <p className='text-xs leading-5 text-[#11100d]'>{label}</p>

        {!compact ? <p className='text-[12px] leading-5 text-[#11100d]/62'>{caption}</p> : null}
      </div>
    </article>
  )
}
