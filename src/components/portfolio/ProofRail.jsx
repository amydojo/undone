import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import cx from '../../utils/cx'
import ReceiptVisualGallery from './ReceiptVisualGallery'

function displayStatus(raw) {
  if (!raw || raw === 'needs screenshot' || raw === 'needs visual') return 'visual pending'
  if (raw === 'needs metric') return 'metric pending'
  if (raw === 'needs polish') return 'polish pending'
  if (raw === 'needs link') return 'link pending'
  return raw
}

function hasComponentVisual(receipt) {
  return (receipt?.visualAssets ?? []).some((asset) => asset?.kind === 'component' || asset?.componentKey)
}

function getReceiptTestId(receipt) {
  return receipt?.testId ?? receipt?.id
}

export default function ProofRail({ record, activeReceipt, onSelectReceipt }) {
  const receipts = record.receipts
  const selectedReceipt = activeReceipt ?? receipts[0]
  const receiptContents = selectedReceipt?.contents ?? []
  const componentVisual = hasComponentVisual(selectedReceipt)

  return (
    <aside className='flex flex-col border-l border-[#11100d]/10 bg-[#f7f1e7]'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-[#11100d]/8 px-4 py-4 lg:px-5'>
        <span className='text-[9px] uppercase tracking-[0.2em] text-[#11100d]/44'>Receipt Inspector</span>
        <span className='rounded-full border border-[#11100d]/8 px-2 py-0.5 text-[9px] text-[#11100d]/36'>
          {receipts.length} proof {receipts.length === 1 ? 'object' : 'objects'}
        </span>
      </div>

      {/* Compact receipt list */}
      <div className='divide-y divide-[#11100d]/6'>
        {receipts.map((receipt, i) => {
          const active = selectedReceipt?.id === receipt.id
          const status = displayStatus(receipt.status)
          return (
            <button
              key={receipt.id}
              type='button'
              data-testid={`receipt-selector-${getReceiptTestId(receipt)}`}
              aria-label={`Select receipt: ${receipt.name}`}
              aria-pressed={active}
              onClick={() => onSelectReceipt(receipt.id)}
              className={cx(
                'flex w-full items-center gap-3 px-4 py-3 text-left transition lg:px-5',
                active ? 'bg-[#fffaf1]' : 'hover:bg-[#fffaf1]/50'
              )}
            >
              <span className='w-5 shrink-0 text-[10px] tabular-nums text-[#11100d]/24'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className='min-w-0 flex-1'>
                <p className={cx('truncate text-[12px] leading-5', active ? 'text-[#11100d]' : 'text-[#11100d]/68')}>
                  {receipt.name}
                </p>
                <p className='truncate text-[10px] text-[#11100d]/36'>{receipt.format}</p>
              </div>
              <span className={cx(
                'shrink-0 rounded-full px-2 py-0.5 text-[9px]',
                active ? 'bg-[#11100d]/[0.05] text-[#11100d]/48' : 'text-[#11100d]/28'
              )}>
                {status}
              </span>
              <ChevronRight className={cx('h-3 w-3 shrink-0 text-[#11100d]/16 transition', active && 'text-[#11100d]/36')} />
            </button>
          )
        })}
      </div>

      {/* Selected receipt detail */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={selectedReceipt?.id || record.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className='m-4 rounded-[18px] border border-[#11100d]/8 bg-[#fffaf1] p-4 lg:m-5 lg:p-5'
        >
          {!componentVisual && (
            <>
              <div className='mb-3 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/28'>
                For: {record.title}
              </div>

              <div className='mb-1 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34'>Selected receipt</div>
              <h4 className='text-[13px] font-medium leading-5 text-[#11100d]'>{selectedReceipt?.name}</h4>
            </>
          )}

          {!componentVisual && (
            <p className='mt-2.5 text-[12px] leading-[1.65] text-[#11100d]/56'>
              {selectedReceipt?.claim}
            </p>
          )}

          {!componentVisual && receiptContents.length > 0 && (
            <div className='mt-3.5'>
              <div className='mb-1.5 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/28'>Contents</div>
              <div className='flex flex-wrap gap-1.5'>
                {receiptContents.map((item) => (
                  <span key={item} className='rounded-full border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-0.5 text-[10px] text-[#11100d]/48'>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <ReceiptVisualGallery
            visualAssets={selectedReceipt?.visualAssets}
            receiptName={selectedReceipt?.name}
            receiptFormat={selectedReceipt?.format}
            receiptTestId={getReceiptTestId(selectedReceipt)}
          />

          <div className='mt-4 flex items-center gap-2'>
            <span className='text-[9px] uppercase tracking-[0.13em] text-[#11100d]/26'>Status</span>
            <span className='rounded-full border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-0.5 text-[9px] text-[#11100d]/42'>
              {displayStatus(selectedReceipt?.status)}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}
