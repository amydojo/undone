import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import ArtifactCard from '../ui/ArtifactCard'
import cx from '../../utils/cx'

export default function ProofRail({ mode, record, activeReceipt, onSelectReceipt }) {
  const receipts = record.receipts
  const selectedReceipt = activeReceipt ?? receipts[0]
  const previewArtifact = selectedReceipt?.artifacts?.[0] ?? {}
  const receiptContents = selectedReceipt?.contents ?? []

  return (
    <aside className='border-l border-[#11100d]/10 bg-[#f7f1e7] p-4 lg:p-5'>
      <div className='mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#11100d]/44'>
        <span>receipt inspector</span>
        <span>{mode}</span>
      </div>

      <div className='grid gap-2'>
        {receipts.map((receipt, i) => {
          const active = selectedReceipt?.id === receipt.id
          return (
            <button
              key={receipt.id}
              onClick={() => onSelectReceipt(receipt.id)}
              className={cx(
                'w-full rounded-[18px] border p-3 text-left transition',
                active ? 'border-[#11100d]/20 bg-[#fffaf1]' : 'border-[#11100d]/10 bg-[#fffaf1]/40 hover:border-[#11100d]/16'
              )}
            >
              <div className='mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-[#11100d]/40'>
                <span>receipt {String(i + 1).padStart(2, '0')}</span>
                <ChevronRight className={cx('h-3.5 w-3.5 transition', active && 'translate-x-[1px]')} />
              </div>
              <p className='text-sm text-[#11100d]'>{receipt.name}</p>
              <div className='mt-1 flex items-center justify-between gap-2'>
                <p className='text-[12px] text-[#11100d]/55'>{receipt.format}</p>
                <span className='rounded-full border border-[#11100d]/12 bg-[#f7f1e7] px-2 py-1 text-[9px] tracking-[0.04em] text-[#11100d]/58'>
                  {receipt.status || 'needs screenshot'}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={selectedReceipt?.id || record.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className='mt-4 rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1] p-4'
        >
          <div className='mb-2 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/40'>selected receipt</div>
          <h4 className='text-sm leading-6 text-[#11100d]'>{selectedReceipt?.name}</h4>
          <p className='mt-2 text-[13px] leading-6 text-[#11100d]/78'>{mode === 'proof' ? selectedReceipt?.proof : selectedReceipt?.claim}</p>
          <div className='mt-3 flex flex-wrap gap-2'>
            {(mode === 'proof' ? receiptContents : receiptContents.slice(0, 3)).map((item) => (
              <span key={item} className='rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/48'>
                {item}
              </span>
            ))}
          </div>

          <ArtifactCard artifact={previewArtifact} className='mt-3' compact={mode !== 'proof'} />
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}
