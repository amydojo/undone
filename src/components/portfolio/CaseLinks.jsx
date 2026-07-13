import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function CaseLinks({ links = [], compact = false }) {
  if (!links.length) return null
  return (
    <div className={compact ? 'mt-4 flex flex-wrap gap-2' : 'mt-5 flex flex-wrap items-center gap-2.5'}>
      {links.map((link) => (
        <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer' aria-label={`Open ${link.label} in a new tab`}
          className={link.primary
            ? 'inline-flex min-h-11 items-center gap-2 rounded-full bg-[#11100d] px-4 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7] transition hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/24 focus-visible:ring-offset-2'
            : 'inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#11100d]/12 bg-[#fffaf1]/64 px-3.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/58 transition hover:border-[#11100d]/24 hover:text-[#11100d]/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/18 focus-visible:ring-offset-2'}>
          {link.label}<ArrowUpRight className='h-3 w-3' aria-hidden='true' />
        </a>
      ))}
    </div>
  )
}
