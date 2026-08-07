import React from 'react'
import { resolvePublicSrc } from '../../../utils/resolvePublicSrc'

const COLORS = {
  coral: '#ff5b4d',
  paper: '#f4efd9',
  green: '#295c45',
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

function ProductImage({ src, alt, className = '' }) {
  if (!src) return null
  return (
    <div className={`overflow-hidden rounded-[14px] border border-[#171713]/10 bg-white ${className}`}>
      <img src={resolvePublicSrc(src)} alt={alt} className='h-full w-full object-cover object-top' />
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
  )
}

function ThreeEndingsFace({ body, compact }) {
  return (
    <div className={`${compact ? 'px-3 pb-2.5 pt-3' : 'px-5 pb-5 pt-5'} overflow-hidden rounded-[12px] border border-[#171713]/10 bg-[#f4efd9]`}>
      <div className='flex items-center justify-between border-b border-dashed border-[#171713]/18 pb-2.5'>
        <div>
          <div className='text-[7px] uppercase tracking-[0.14em] text-[#171713]/34'>Done</div>
          <div className={`${compact ? 'mt-1 text-[10px]' : 'mt-1.5 text-[13px]'} font-medium tracking-[-0.01em]`}>DAY DOCUMENTED</div>
        </div>
        <Dot color={COLORS.green} />
      </div>
      <div className={`${compact ? 'mt-2.5' : 'mt-4'} grid grid-cols-3 divide-x divide-dashed divide-[#171713]/18 border-y border-dashed border-[#171713]/18`}>
        {body.endings.map((ending, index) => (
          <div key={ending} className={`${compact ? 'py-3' : 'py-5'} text-center`}>
            <div className='text-[6px] tabular-nums tracking-[0.12em] text-[#171713]/28'>{String(index + 1).padStart(2, '0')}</div>
            <div className={`${compact ? 'mt-2 text-[9px]' : 'mt-3 text-[12px]'} font-medium tracking-[0.02em] text-[#171713]/78`}>{ending}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CarryForwardFace({ body, compact }) {
  return (
    <div className={`${compact ? 'grid-cols-[1.15fr_0.85fr]' : 'md:grid-cols-[1.2fr_0.8fr]'} grid overflow-hidden rounded-[12px] border border-[#171713]/10 bg-[#fffaf1]`}>
      <div className={`${compact ? 'p-3' : 'p-5'} bg-[#f4efd9]`}>
        <div className='text-[7px] uppercase tracking-[0.14em] text-[#171713]/34'>One thing</div>
        <div className={`${compact ? 'mt-4 text-[12px] leading-4' : 'mt-7 text-[22px] leading-7'} max-w-[14ch] tracking-[-0.025em] text-[#171713]`}>{body.obligation}</div>
      </div>
      <div className={`${compact ? 'p-2.5' : 'p-4'} bg-[#171713] text-[#fffaf1]`}>
        <div className='text-[7px] uppercase tracking-[0.14em] text-[#fffaf1]/30'>Support</div>
        <div className={`${compact ? 'mt-3 gap-1.5' : 'mt-5 gap-2.5'} flex flex-col`}>
          {body.supports.map((support, index) => {
            const active = index === body.activeSupport
            return (
              <div key={support} className={`${compact ? 'py-1.5 text-[7px]' : 'py-2 text-[9px]'} flex items-center gap-2 border-b border-[#fffaf1]/8 last:border-b-0 ${active ? 'text-[#fffaf1]' : 'text-[#fffaf1]/30'}`}>
                <Dot color={active ? COLORS.coral : '#4b4a45'} />
                <span className='uppercase tracking-[0.08em]'>{support}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function OneThingFace({ body, compact }) {
  return (
    <div className={`${compact ? 'p-3' : 'p-5'} rounded-[12px] bg-[#171713] text-[#fffaf1]`}>
      <div className='flex items-center justify-between text-[7px] uppercase tracking-[0.14em] text-[#fffaf1]/30'>
        <span>One Thing</span>
        <span className='flex items-center gap-1.5 text-[#b8f3c6]/72'><Dot color='#70c98d' />checked</span>
      </div>
      <div className={`${compact ? 'mt-5 text-[13px] leading-4' : 'mt-8 text-[24px] leading-7'} max-w-[16ch] tracking-[-0.025em]`}>{body.task}</div>
      <div className={`${compact ? 'mt-5' : 'mt-8'} grid grid-cols-5 gap-1`}>
        {body.steps.map((step, index) => (
          <div key={step} className='min-w-0'>
            <div className={`${index === body.activeStep ? 'bg-[#ff5b4d]' : 'bg-[#fffaf1]/14'} h-1 w-full`} />
            <div className={`${compact ? 'mt-1.5 text-[6px]' : 'mt-2 text-[7px]'} tabular-nums text-[#fffaf1]/30`}>{String(index + 1).padStart(2, '0')}</div>
            {!compact && <div className='mt-1 truncate text-[7px] uppercase tracking-[0.08em] text-[#fffaf1]/40'>{step}</div>}
          </div>
        ))}
      </div>
      <div className={`${compact ? 'mt-4 text-[6px]' : 'mt-5 text-[7px]'} flex items-center justify-between border-t border-[#fffaf1]/10 pt-2.5 uppercase tracking-[0.12em] text-[#fffaf1]/28`}>
        <span>5 allowed steps</span>
        <span>nothing automatic</span>
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

function Note({ label, children }) {
  return (
    <div className='border-t border-[#171713]/10 pt-3'>
      <div className='text-[8px] uppercase tracking-[0.14em] text-[#171713]/34'>{label}</div>
      <p className='mt-1.5 text-[12px] leading-5 text-[#171713]/68'>{children}</p>
    </div>
  )
}

function ReceiptMachineDetail({ body }) {
  return (
    <div className='grid gap-4 md:grid-cols-[1.25fr_0.75fr]'>
      <ProductImage src={body.screen} alt='Bad Day Receipt live product with a completed receipt.' className='aspect-[16/10]' />
      <div className='space-y-4'>
        <ReceiptMachineFace body={body} compact={false} />
        <Note label='Design choice'>I used a receipt because it makes small, invisible costs feel concrete without pretending they are medical facts.</Note>
        <Note label='Built'>Five paper styles, custom items, totals, print states, export, local history, offline use, and print recovery.</Note>
      </div>
    </div>
  )
}

function ThreeEndingsDetail({ body }) {
  return (
    <div className='grid gap-4 md:grid-cols-[1.15fr_0.85fr]'>
      <ProductImage src={body.screen} alt='Bad Day Receipt ending screen after the receipt is complete.' className='aspect-[16/10]' />
      <div className='space-y-4'>
        <ThreeEndingsFace body={body} compact={false} />
        <Note label='Why this matters'>The receipt is finished before this choice appears. Keep, Let Go, and Carry have equal weight so “do more” never becomes the correct answer.</Note>
        <Note label='Built'>Each ending has its own local behavior: save it, remove it with a short undo window, or carry one item into a separate flow.</Note>
      </div>
    </div>
  )
}

function CarryForwardDetail({ body }) {
  return (
    <div className='grid gap-4 md:grid-cols-[1.15fr_0.85fr]'>
      <ProductImage src={body.screen} alt='Bad Day Receipt Carry Forward screen asking what still needs attention.' className='aspect-[16/10]' />
      <div className='space-y-4'>
        <div className='rounded-[14px] border border-[#171713]/10 bg-[#fffaf1] p-4'>
          <div className='text-[8px] uppercase tracking-[0.14em] text-[#171713]/34'>The rule</div>
          <div className='mt-5 space-y-3'>
            {['Name one thing', 'Choose the help', 'Keep it temporary'].map((item, index) => (
              <div key={item} className='flex items-center gap-3 border-b border-[#171713]/8 pb-3 last:border-b-0 last:pb-0'>
                <span className='text-[9px] tabular-nums text-[#171713]/30'>0{index + 1}</span>
                <span className='text-[13px] text-[#171713]/76'>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <Note label='Design choice'>The product never guesses what support someone needs. The person chooses it, and the setting disappears when this task ends.</Note>
        <Note label='Built'>One carried item, four support options, a preview before continuing, and a clean way back out.</Note>
      </div>
    </div>
  )
}

function OneThingDetail({ body }) {
  const stages = [
    ['AI suggests', 'a small plan'],
    ['App checks', 'what is allowed'],
    ['UI shows', 'fixed components'],
  ]
  return (
    <div className='space-y-5'>
      <div className='grid gap-2 md:grid-cols-3'>
        {stages.map(([label, detail], index) => (
          <React.Fragment key={label}>
            <div className='rounded-[14px] border border-[#171713]/10 bg-[#fffaf1] p-4'>
              <div className='text-[8px] tabular-nums text-[#171713]/30'>0{index + 1}</div>
              <div className='mt-7 text-[17px] tracking-[-0.02em] text-[#171713]'>{label}</div>
              <div className='mt-1 text-[11px] text-[#171713]/48'>{detail}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <OneThingFace body={body} compact={false} />
      <div className='grid gap-4 sm:grid-cols-2'>
        <Note label='Design choice'>AI can suggest the order of the work, but it never writes the page, clicks anything, or takes an outside action.</Note>
        <Note label='Built'>A strict plan format, an app-side checker, five allowed step types, fixed React screens, and a manual fallback if the plan fails.</Note>
      </div>
    </div>
  )
}

function Detail({ receiptBodyType, body }) {
  if (receiptBodyType === 'receiptMachine') return <ReceiptMachineDetail body={body} />
  if (receiptBodyType === 'threeEndings') return <ThreeEndingsDetail body={body} />
  if (receiptBodyType === 'carryForward') return <CarryForwardDetail body={body} />
  return <OneThingDetail body={body} />
}

export default function BadDayReceiptVisual({
  receiptNumber,
  title,
  type,
  receiptBodyType,
  summary,
  flow = [],
  body = {},
  displayMode = 'full',
  ctaLabel = 'Inspect receipt',
  privacyLabel = 'live product',
  quiet = false,
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
        {!quiet && <div className='mt-3 border-t border-[#171713]/8 px-3.5 py-2.5'><Flow items={flow} compact /></div>}
        <div className={`${quiet ? 'mt-3' : ''} border-t border-[#171713]/8 px-3.5 py-2 text-[8px] uppercase tracking-[0.12em] text-[#171713]/38`}>{ctaLabel}</div>
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
      <div className='p-4 sm:p-6'><Detail receiptBodyType={receiptBodyType} body={body} /></div>
      <footer className='border-t border-[#171713]/8 bg-[#fffaf1] px-4 py-3 text-[7px] uppercase tracking-[0.12em] text-[#171713]/26 sm:px-6'>{privacyLabel}</footer>
    </article>
  )
}
