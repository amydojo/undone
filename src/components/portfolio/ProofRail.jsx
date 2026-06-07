import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import cx from '../../utils/cx'
import ReceiptVisualGallery from './ReceiptVisualGallery'

function displayStatus(raw) {
  if (!raw) return null
  if (raw === 'needs screenshot' || raw === 'needs visual' || raw === 'needs metric' || raw === 'needs polish' || raw === 'needs link') return 'queued'
  return raw
}

function shouldShowStatus(raw) {
  const status = displayStatus(raw)
  return Boolean(status && status !== 'ready')
}

function hasComponentVisual(receipt) {
  return (receipt?.visualAssets ?? []).some((asset) => asset?.kind === 'component' || asset?.componentKey)
}

function getReceiptTestId(receipt) {
  return receipt?.testId ?? receipt?.id
}

export default function ProofRail({ record, activeReceipt, onSelectReceipt, resetSignal }) {
  const receipts = record.receipts
  const selectedReceipt = activeReceipt ?? receipts[0]
  const receiptContents = selectedReceipt?.contents ?? []
  const componentVisual = hasComponentVisual(selectedReceipt)

  return (
    <aside className='scrollbar-portfolio flex h-full flex-col overflow-y-auto border-l border-[#11100d]/10 bg-[#f7f1e7]'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-[#11100d]/8 px-4 py-4 lg:px-5'>
        <span className='text-[9px] uppercase tracking-[0.2em] text-[#11100d]/44'>Receipt Inspector</span>
        <span className='border-l border-[#11100d]/12 pl-2 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34'>
          {receipts.length} {receipts.length === 1 ? 'receipt' : 'receipts'}
        </span>
      </div>

      {/* Compact receipt list */}
      <div className='divide-y divide-[#11100d]/7 border-b border-[#11100d]/8'>
        {receipts.map((receipt, i) => {
          const active = selectedReceipt?.id === receipt.id
          return (
            <button
              key={receipt.id}
              type='button'
              data-testid={`receipt-selector-${getReceiptTestId(receipt)}`}
              aria-label={`Select receipt: ${receipt.name}`}
              aria-pressed={active}
              onClick={() => onSelectReceipt(receipt.id)}
              className={cx(
                'group grid w-full grid-cols-[34px_1fr_12px] items-center gap-3 px-4 py-3 text-left transition lg:px-5',
                active ? 'bg-[#fffaf1]' : 'hover:bg-[#fffaf1]/45'
              )}
            >
              <span
                className={cx(
                  'relative font-mono text-[10px] tabular-nums text-[#11100d]/28',
                  active && 'text-[#11100d]/62'
                )}
              >
                <span
                  className={cx(
                    'absolute -left-4 top-1/2 h-7 w-px -translate-y-1/2 bg-transparent',
                    active && 'bg-[#11100d]/42'
                  )}
                  aria-hidden='true'
                />
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className='min-w-0 flex-1'>
                <p className={cx('truncate text-[12px] leading-5', active ? 'text-[#11100d]' : 'text-[#11100d]/70')}>
                  {receipt.name}
                </p>
                <p className='truncate text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34'>{receipt.format}</p>
              </div>
              <ChevronRight className={cx('h-3 w-3 shrink-0 text-[#11100d]/14 transition group-hover:text-[#11100d]/28', active && 'text-[#11100d]/36')} />
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
          className={cx(
            componentVisual
              ? 'm-4 border-y border-[#11100d]/10 py-4 lg:m-5 lg:py-5'
              : 'm-4 rounded-[8px] border border-[#11100d]/10 bg-[#fffaf1] p-4 lg:m-5 lg:p-5'
          )}
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
                  <span key={item} className='border-l border-[#11100d]/12 pl-2 text-[10px] text-[#11100d]/48'>
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
            resetSignal={resetSignal}
          />

          {shouldShowStatus(selectedReceipt?.status) && (
            <div className='mt-4 flex items-center gap-2'>
              <span className='text-[9px] uppercase tracking-[0.13em] text-[#11100d]/26'>Status</span>
              <span className='border-l border-[#11100d]/12 pl-2 text-[9px] uppercase tracking-[0.1em] text-[#11100d]/42'>
                {displayStatus(selectedReceipt?.status)}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}
