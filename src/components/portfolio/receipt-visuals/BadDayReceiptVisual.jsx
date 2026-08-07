import React from 'react'
import { resolvePublicSrc } from '../../../utils/resolvePublicSrc'

const COLORS = {
  ink: '#171713',
  secondary: '#6e6b63',
  coral: '#ff5b4d',
  paper: '#f4efd9',
  green: '#295c45',
  canvas: '#d7d3ca',
  subtle: '#e3e0d8',
  cream: '#fffaf1',
}

function Dot({ color = COLORS.coral }) {
  return <span className='h-1.5 w-1.5 rounded-full' style={{ backgroundColor: color }} aria-hidden='true' />
}

function Flow({ items, compact = false }) {
  return (
    <div className={`flex min-w-0 items-center ${compact ? 'gap-1.5' : 'gap-2.5'}`}>
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          {index > 0 && <span className='text-[#171713]/22'>→</span>}
          <span className={`${compact ? 'text-[8px]' : 'text-[10px] sm:text-[11px]'} truncate uppercase tracking-[0.1em] text-[#171713]/52`}>
            {item}
          </span>
        </React.Fragment>
      ))}
      <Dot />
    </div>
  )
}

function ScreenProof({ src, alt }) {
  if (!src) return null
  return (
    <div className='mt-3 overflow-hidden rounded-[14px] border border-[#171713]/10 bg-white'>
      <img src={resolvePublicSrc(src)} alt={alt} className='aspect-[16/8.5] w-full object-cover object-top' />
    </div>
  )
}

function ReceiptMachineFace({ body, compact }) {
  if (compact) {
    return (
      <div className='grid grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[10px] border border-[#171713]/10 bg-[#fffaf1]'>
        <div className='bg-[#20221f] p-2.5 text-[#b8f3c6]'>
          <div className='text-[7px] uppercase tracking-[0.12em] text-[#b8f3c6]/55'>Human Condition POS</div>
          <div className='mt-4 flex items-end justify-between gap-2'>
            <span className='text-[8px] uppercase tracking-[0.1em]'>items {body.itemCount}</span>
            <span className='text-[18px] leading-none'>{body.total}</span>
          </div>
        </div>
        <div className='relative bg-[#f4efd9] px-3 py-2.5'>
          <div className='text-[7px] uppercase tracking-[0.12em] text-[#171713]/40'>Bad Day Receipt</div>
          <div className='mt-3 border-y border-[#171713]/18 py-2 text-[9px] font-medium'>TOTAL DAMAGE <span className='float-right'>{body.total}</span></div>
          <div className='mt-2 inline-block -rotate-2 border border-[#ff5b4d] px-1.5 py-0.5 text-[7px] font-medium text-[#d94b3d]'>{body.verdict}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='grid gap-3 md:grid-cols-[0.8fr_1.2fr]'>
        <div className='rounded-[16px] bg-[#20221f] p-4 text-[#b8f3c6]'>
          <div className='flex items-center justify-between text-[8px] uppercase tracking-[0.14em] text-[#b8f3c6]/52'>
            <span>Human Condition POS</span><span>Register 03</span>
          </div>
          <div className='mt-8 flex items-end justify-between'>
            <span className='text-[10px] uppercase tracking-[0.12em]'>items {body.itemCount}</span>
            <span className='text-[32px] leading-none'>{body.total}</span>
          </div>
          <div className='mt-3 border-t border-[#b8f3c6]/15 pt-3 text-[9px] uppercase tracking-[0.12em] text-[#b8f3c6]/55'>paper: {body.paper}</div>
        </div>
        <div className='rounded-[16px] border border-[#171713]/10 bg-[#f4efd9] p-4'>
          <div className='text-[8px] uppercase tracking-[0.14em] text-[#171713]/38'>Bad Day Receipt</div>
          <div className='mt-4 space-y-2'>
            {body.rows.map(([label, value]) => (
              <div key={label} className='flex items-center justify-between gap-4 text-[10px] text-[#171713]/68'>
                <span className='truncate'>{label}</span><span className='shrink-0'>{value}</span>
              </div>
            ))}
          </div>
          <div className='mt-4 border-y border-[#171713]/18 py-2.5 text-[12px] font-medium'>TOTAL DAMAGE <span className='float-right'>{body.total}</span></div>
          <div className='mt-3 inline-block -rotate-2 border-2 border-[#ff5b4d] px-2 py-1 text-[9px] font-medium text-[#d94b3d]'>{body.verdict}</div>
        </div>
      </div>
      <ScreenProof src={body.screen} alt='Bad Day Receipt live product with the completed thermal-style receipt.' />
    </div>
  )
}

function ThreeEndingsFace({ body, compact }) {
  return (
    <div>
      <div className={`${compact ? 'p-2.5' : 'p-4'} rounded-[12px] border border-[#171713]/10 bg-[#f4efd9]`}>
        <div className='flex items-center justify-between border-b border-[#171713]/12 pb-2 text-[7px] uppercase tracking-[0.13em] text-[#171713]/42'>
          <span>Day documented</span><Dot color={COLORS.green} />
        </div>
        <div className={`grid grid-cols-3 ${compact ? 'gap-1.5 pt-2.5' : 'gap-2.5 pt-4'}`}>
          {body.endings.map((ending) => (
            <div key={ending.label} className={`${compact ? 'min-h-[52px] p-2' : 'min-h-[92px] p-3'} flex flex-col justify-between border border-[#171713]/12 bg-[#fffaf1]`}>
              <span className={`${compact ? 'text-[9px]' : 'text-[13px]'} font-medium tracking-[-0.01em]`}>{ending.label}</span>
              <span className={`${compact ? 'text-[6px]' : 'text-[8px]'} uppercase tracking-[0.1em] text-[#171713]/36`}>{ending.detail}</span>
            </div>
          ))}
        </div>
      </div>
      {!compact && <ScreenProof src={body.screen} alt='Bad Day Receipt production ending decision.' />}
    </div>
  )
}

function CarryForwardFace({ body, compact }) {
  return (
    <div>
      <div className={`grid ${compact ? 'grid-cols-[0.9fr_1.1fr] gap-2' : 'gap-3 md:grid-cols-[0.85fr_1.15fr]'}`}>
        <div className={`${compact ? 'p-2.5' : 'p-4'} rounded-[12px] bg-[#171713] text-[#fffaf1]`}>
          <div className='text-[7px] uppercase tracking-[0.14em] text-[#fffaf1]/38'>One thing</div>
          <div className={`${compact ? 'mt-5 text-[11px] leading-4' : 'mt-8 text-[20px] leading-7'} tracking-[-0.02em]`}>{body.obligation}</div>
          <div className={`${compact ? 'mt-3' : 'mt-6'} flex items-center gap-2 text-[7px] uppercase tracking-[0.11em] text-[#fffaf1]/46`}><Dot />user designated</div>
        </div>
        <div className={`${compact ? 'p-2.5' : 'p-4'} rounded-[12px] border border-[#171713]/10 bg-[#fffaf1]`}>
          <div className='text-[7px] uppercase tracking-[0.14em] text-[#171713]/38'>Support requested</div>
          <div className={`${compact ? 'mt-2 grid-cols-2 gap-1.5' : 'mt-4 grid-cols-2 gap-2'} grid`}>
            {body.supports.map((support) => (
              <div key={support} className={`${compact ? 'px-2 py-2 text-[7px]' : 'px-3 py-3 text-[9px]'} border-l-2 border-[#ff5b4d] bg-[#f4efd9] uppercase tracking-[0.08em] text-[#171713]/62`}>{support}</div>
            ))}
          </div>
        </div>
      </div>
      {!compact && <ScreenProof src={body.screen} alt='Bad Day Receipt Carry Forward designation state.' />}
    </div>
  )
}

function OneThingFace({ body, compact }) {
  return (
    <div className={`${compact ? 'p-2.5' : 'p-4'} rounded-[12px] bg-[#171713] text-[#fffaf1]`}>
      <div className='flex items-center justify-between text-[7px] uppercase tracking-[0.14em] text-[#fffaf1]/38'>
        <span>Validated runtime</span><span className='flex items-center gap-1.5 text-[#b8f3c6]'><Dot color='#70c98d' />schema pass</span>
      </div>
      <div className={`${compact ? 'mt-4 gap-1' : 'mt-7 gap-2'} grid grid-cols-5`}>
        {body.steps.map((step, index) => (
          <div key={step} className={`${compact ? 'min-h-[48px] px-1 py-2' : 'min-h-[82px] px-2 py-3'} border border-[#fffaf1]/12 bg-[#fffaf1]/[0.04]`}>
            <div className='text-[6px] tabular-nums text-[#fffaf1]/28'>{String(index + 1).padStart(2, '0')}</div>
            <div className={`${compact ? 'mt-3 text-[6px]' : 'mt-6 text-[8px]'} uppercase tracking-[0.08em] text-[#fffaf1]/72`}>{step}</div>
          </div>
        ))}
      </div>
      <div className={`${compact ? 'mt-2 gap-1' : 'mt-4 gap-2'} grid grid-cols-3`}>
        {body.boundary.map((item) => (
          <div key={item} className={`${compact ? 'py-1.5 text-[6px]' : 'py-2 text-[8px]'} border-t border-[#ff5b4d]/55 text-center uppercase tracking-[0.08em] text-[#fffaf1]/48`}>{item}</div>
        ))}
      </div>
    </div>
  )
}

function Face({ receiptBodyType, body, compact }) {
  if (receiptBodyType === 'receiptMachine') return <ReceiptMachineFace body={body} compact={compact} />
  if (receiptBodyType === 'threeEndings') return <ThreeEndingsFace body={body} compact={compact} />
  if (receiptBodyType === 'carryForward') return <CarryForwardFace body={body} compact={compact} />
  return <OneThingFace body={body} compact={compact} />
}

export default function BadDayReceiptVisual({
  receiptNumber,
  title,
  type,
  receiptBodyType,
  summary,
  flow = [],
  proof,
  body = {},
  displayMode = 'full',
  ctaLabel = 'Inspect receipt',
  privacyLabel = 'production proof',
}) {
  const compact = displayMode === 'compact'

  if (compact) {
    return (
      <article className='w-full overflow-hidden rounded-[14px] border border-[#171713]/10 bg-[#fffaf1] text-[#171713]'>
        <div className='flex items-center justify-between gap-2 bg-[#f4efd9] px-3.5 py-2.5 text-[7px] uppercase tracking-[0.14em] text-[#171713]/38'>
          <span>Receipt {receiptNumber}</span><span>{type}</span>
        </div>
        <div className='px-3.5 pt-3'>
          <h3 className='text-[16px] font-medium leading-5 tracking-[-0.025em]'>{title}</h3>
          <div className='mt-3'><Face receiptBodyType={receiptBodyType} body={body} compact /></div>
        </div>
        <div className='mt-3 border-t border-[#171713]/8 px-3.5 py-2.5'><Flow items={flow} compact /></div>
        <div className='border-t border-[#171713]/8 px-3.5 py-2 text-[8px] uppercase tracking-[0.12em] text-[#171713]/38'>{ctaLabel}</div>
      </article>
    )
  }

  return (
    <article className='w-full bg-[#f7f1e7] text-[#171713]'>
      <header className='bg-[#f4efd9] px-4 py-5 sm:px-6'>
        <div className='flex items-center justify-between gap-3 text-[8px] uppercase tracking-[0.14em] text-[#171713]/38'>
          <span>Receipt {receiptNumber}</span><span>{type}</span>
        </div>
        <h2 className='mt-4 text-[28px] font-medium leading-none tracking-[-0.04em] sm:text-[34px]'>{title}</h2>
        <p className='mt-2 max-w-xl text-[13px] leading-5 text-[#171713]/56'>{summary}</p>
      </header>
      <div className='p-4 sm:p-6'><Face receiptBodyType={receiptBodyType} body={body} compact={false} /></div>
      <footer className='border-t border-[#171713]/8 bg-[#fffaf1] px-4 py-4 sm:px-6'>
        <Flow items={flow} />
        <div className='mt-3 border-t border-[#171713]/8 pt-3 text-[11px] leading-5 text-[#171713]/64'><span className='mr-2 text-[8px] uppercase tracking-[0.12em] text-[#171713]/34'>Proves</span>{proof}</div>
        <div className='mt-2 text-[7px] uppercase tracking-[0.12em] text-[#171713]/26'>{privacyLabel}</div>
      </footer>
    </article>
  )
}
