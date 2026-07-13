import React from 'react'

const ACCENT = '#69dcff'
const lifecycle = [
  { number: '01', stage: 'APPROACH', family: 'Magnetic', verb: 'assist', signal: 'proximity field' },
  { number: '02', stage: 'CLARIFY', family: 'Intent', verb: 'name', signal: 'exact consequence' },
  { number: '03', stage: 'WEIGH', family: 'Ethical', verb: 'inform', signal: 'human impact' },
  { number: '04', stage: 'COMMIT', family: 'Pressure', verb: 'act', signal: 'named threshold' },
  { number: '05', stage: 'RESOLVE', family: 'Breathing', verb: 'confirm', signal: 'ambient state' },
  { number: '06', stage: 'RECOVER', family: 'Reversible', verb: 'undo', signal: 'attached window' },
]
const substitutions = [
  ['Pressure', 'Named Preview, Act, and Commit stages'],
  ['Deliberate hold', 'Equivalent confirm action without holding'],
  ['Breathing motion', 'Text label, contrast, and static state symbol'],
  ['Magnetic assistance', 'Stable conventional target remains operable'],
  ['Recovery countdown', 'Numeric time remaining and destination copy'],
]

function Dot({ color = ACCENT }) {
  return <span className='h-1.5 w-1.5 shrink-0 rounded-full' style={{ backgroundColor: color }} aria-hidden='true' />
}

function ReceiptShell({ title, type, claim, proof, displayMode, children, ctaLabel }) {
  if (displayMode === 'compact') {
    return (
      <article className='overflow-hidden rounded-[14px] border border-[#f7f1e7]/12 bg-[#090a0d] text-[#f7f1e7] shadow-[0_16px_36px_rgba(0,0,0,0.14)]'>
        <div className='relative overflow-hidden px-3.5 py-3.5'>
          <div className='absolute right-[-24px] top-[-34px] h-28 w-28 rounded-full bg-[#69dcff]/10 blur-2xl' aria-hidden='true' />
          <div className='relative flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] text-[#69dcff]'><Dot />{type}</div>
          <h3 className='relative mt-2.5 text-[15px] font-medium leading-5'>{title}</h3>
          <p className='relative mt-2 line-clamp-2 text-[10px] leading-4 text-[#f7f1e7]/54'>{claim}</p>
        </div>
        <div className='border-t border-[#f7f1e7]/10 bg-[#111318] px-3.5 py-2.5 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/52'>{ctaLabel}</div>
      </article>
    )
  }

  return (
    <article className='w-full overflow-hidden bg-[#08090b] text-[#f7f1e7]'>
      <header className='relative overflow-hidden border-b border-[#f7f1e7]/10 px-5 py-5 sm:px-7 sm:py-6'>
        <div className='absolute right-[-80px] top-[-120px] h-80 w-80 rounded-full bg-[#1d67ff]/16 blur-[90px]' aria-hidden='true' />
        <div className='relative flex flex-wrap items-center justify-between gap-3'>
          <div className='flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-[#69dcff]'><Dot />{type}</div>
          <div className='text-[8px] uppercase tracking-[0.15em] text-[#f7f1e7]/30'>IBL / Evidence object</div>
        </div>
        <h3 className='relative mt-4 max-w-[760px] text-[27px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[34px]'>{title}</h3>
        <p className='relative mt-3 max-w-[760px] text-[12px] leading-5 text-[#f7f1e7]/58 sm:text-[13px]'>{claim}</p>
      </header>
      <div className='relative p-4 sm:p-6'>{children}</div>
      <footer className='grid gap-3 border-t border-[#f7f1e7]/10 bg-[#0c0e12] px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7'>
        <div>
          <div className='text-[8px] uppercase tracking-[0.15em] text-[#f7f1e7]/28'>Evidence statement</div>
          <p className='mt-1 max-w-[760px] text-[10px] leading-4 text-[#f7f1e7]/48'>{proof}</p>
        </div>
        <div className='text-[8px] uppercase tracking-[0.15em] text-[#69dcff]/70'>Implemented research artifact</div>
      </footer>
    </article>
  )
}

function LifecycleReceipt() {
  return (
    <div>
      <div className='relative rounded-[22px] border border-[#f7f1e7]/10 bg-[#0d1015] p-4 sm:p-5'>
        <div className='absolute left-[8%] right-[8%] top-[78px] hidden h-px bg-gradient-to-r from-transparent via-[#69dcff]/45 to-transparent md:block' aria-hidden='true' />
        <div className='grid gap-2.5 md:grid-cols-6'>
          {lifecycle.map((item, index) => (
            <div key={item.stage} className='relative min-h-[190px] overflow-hidden rounded-[17px] border border-[#f7f1e7]/12 bg-[#13161c] p-3.5'>
              <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#69dcff]/8 to-transparent' aria-hidden='true' />
              <div className='relative flex items-center justify-between font-mono text-[8px] text-[#f7f1e7]/30'>
                <span>{item.number}</span><span>{index < 5 ? '→' : '↺'}</span>
              </div>
              <div className='relative mt-8 text-[8px] uppercase tracking-[0.15em] text-[#f7f1e7]/38'>{item.stage}</div>
              <div className='relative mt-2 text-[16px] font-medium'>{item.family}</div>
              <div className='relative mt-6 border-t border-[#f7f1e7]/8 pt-3'>
                <div className='text-[8px] uppercase tracking-[0.13em] text-[#69dcff]'>{item.verb}</div>
                <div className='mt-1.5 text-[9px] leading-4 text-[#f7f1e7]/42'>{item.signal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-4 grid gap-3 sm:grid-cols-3'>
        {[['Input promise', 'The target stays stable.'], ['System promise', 'Every state is named.'], ['Recovery promise', 'Undo remains attached.']].map(([label, value]) => (
          <div key={label} className='rounded-[14px] border border-[#f7f1e7]/10 bg-[#111318] px-4 py-3'>
            <div className='text-[8px] uppercase tracking-[0.14em] text-[#f7f1e7]/30'>{label}</div>
            <div className='mt-2 text-[11px] text-[#f7f1e7]/68'>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LibraryReceipt() {
  const families = [
    ['Intent', 'Rest · Revealed · Confirmed'],
    ['Pressure', 'Preview · Act · Commit · Recover'],
    ['Breathing', 'Ready · Listening · Processing · Complete'],
    ['Magnetic', 'Far · Near · Aligned · Released'],
    ['Ethical', 'Notice · Resist · Hold · Confirmed'],
    ['Reversible', 'Ready · Window · Expiring · Closed'],
  ]
  return (
    <div className='grid gap-4 lg:grid-cols-[0.86fr_1.14fr]'>
      <div className='rounded-[20px] border border-[#f7f1e7]/10 bg-[#0e1116] p-4 sm:p-5'>
        <div className='text-[8px] uppercase tracking-[0.15em] text-[#f7f1e7]/30'>System inventory</div>
        <div className='mt-4 grid grid-cols-2 gap-2'>
          {[['95','variables'],['46','variants'],['6','families'],['3','modes']].map(([value,label]) => (
            <div key={label} className='rounded-[16px] border border-[#f7f1e7]/10 bg-[#151920] p-4'>
              <div className='text-[34px] leading-none tracking-[-0.06em] text-[#69dcff]'>{value}</div>
              <div className='mt-3 text-[8px] uppercase tracking-[0.14em] text-[#f7f1e7]/38'>{label}</div>
            </div>
          ))}
        </div>
        <div className='mt-4 space-y-2'>
          {['M + L component sizes','semantic text properties','boolean behavior switches','Light · Dark · Spatial materials'].map((item) => (
            <div key={item} className='flex items-center gap-3 rounded-[12px] border border-[#f7f1e7]/8 px-3 py-2.5 text-[10px] text-[#f7f1e7]/54'><Dot />{item}</div>
          ))}
        </div>
      </div>
      <div className='overflow-hidden rounded-[20px] border border-[#f7f1e7]/10 bg-[#0e1116]'>
        <div className='grid grid-cols-[0.8fr_1.2fr] border-b border-[#f7f1e7]/10 px-4 py-3 text-[8px] uppercase tracking-[0.14em] text-[#f7f1e7]/28'><span>Family</span><span>Named states</span></div>
        <div className='divide-y divide-[#f7f1e7]/8'>
          {families.map(([family, states], index) => (
            <div key={family} className='grid grid-cols-[0.8fr_1.2fr] items-center px-4 py-3.5'>
              <div className='flex items-center gap-2 text-[11px] font-medium'><span className='font-mono text-[8px] text-[#f7f1e7]/24'>{String(index + 1).padStart(2,'0')}</span>{family}</div>
              <div className='text-[9px] leading-4 text-[#f7f1e7]/44'>{states}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AccessibilityReceipt() {
  return (
    <div className='grid gap-4 lg:grid-cols-[0.9fr_1.1fr]'>
      <div className='rounded-[20px] border border-[#f7f1e7]/10 bg-[#0e1116] p-4 sm:p-5'>
        <div className='text-[8px] uppercase tracking-[0.15em] text-[#f7f1e7]/30'>Input equivalence matrix</div>
        <div className='mt-4 grid grid-cols-5 gap-1.5'>
          {['touch','pointer','gaze','voice','switch'].map((input, index) => (
            <div key={input} className='rounded-[13px] border border-[#f7f1e7]/10 bg-[#151920] px-1 py-4 text-center'>
              <div className='mx-auto grid h-7 w-7 place-items-center rounded-full border border-[#69dcff]/35 text-[9px] text-[#69dcff]'>{index + 1}</div>
              <div className='mt-3 text-[7px] uppercase tracking-[0.11em] text-[#f7f1e7]/44'>{input}</div>
            </div>
          ))}
        </div>
        <div className='mt-4 rounded-[15px] border border-[#69dcff]/22 bg-[#69dcff]/7 p-4'>
          <div className='text-[9px] font-medium text-[#f7f1e7]/76'>The conventional path is never removed.</div>
          <p className='mt-2 text-[9px] leading-4 text-[#f7f1e7]/42'>Novel behavior may assist comprehension or motor effort, but the semantic button, focus order, and explicit action remain available.</p>
        </div>
      </div>
      <div className='overflow-hidden rounded-[20px] border border-[#f7f1e7]/10 bg-[#0e1116]'>
        <div className='grid grid-cols-[0.85fr_1.15fr] border-b border-[#f7f1e7]/10 px-4 py-3 text-[8px] uppercase tracking-[0.14em] text-[#f7f1e7]/28'><span>Enhanced signal</span><span>Required substitute</span></div>
        <div className='divide-y divide-[#f7f1e7]/8'>
          {substitutions.map(([signal, substitute]) => (
            <div key={signal} className='grid grid-cols-[0.85fr_1.15fr] gap-3 px-4 py-3.5'>
              <div className='text-[10px] text-[#f7f1e7]/70'>{signal}</div>
              <div className='flex gap-2 text-[9px] leading-4 text-[#f7f1e7]/42'><span className='text-[#69dcff]'>→</span>{substitute}</div>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-2 gap-px bg-[#f7f1e7]/8'>
          {['44px minimum target','visible focus treatment','motion never carries state alone','recovery parity'].map((item) => (
            <div key={item} className='bg-[#111318] px-4 py-3 text-[8px] uppercase tracking-[0.11em] text-[#f7f1e7]/40'>{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlaygroundReceipt() {
  return (
    <div className='grid gap-4 lg:grid-cols-[1.18fr_0.82fr]'>
      <div className='overflow-hidden rounded-[20px] border border-[#f7f1e7]/10 bg-[#0d1015]'>
        <div className='flex flex-wrap items-center justify-between gap-3 border-b border-[#f7f1e7]/9 px-4 py-3'>
          <div className='flex flex-wrap gap-1.5'>
            {['Light','Dark','Spatial'].map((item, index) => <span key={item} className={index === 2 ? 'rounded-full border border-[#69dcff]/50 bg-[#69dcff]/10 px-2.5 py-1 text-[7px] uppercase tracking-[0.1em] text-[#69dcff]' : 'rounded-full border border-[#f7f1e7]/12 px-2.5 py-1 text-[7px] uppercase tracking-[0.1em] text-[#f7f1e7]/42'}>{item}</span>)}
          </div>
          <div className='text-[7px] uppercase tracking-[0.13em] text-[#38db91]'>Production · Ready</div>
        </div>
        <div className='relative min-h-[260px] overflow-hidden p-5 sm:p-7'>
          <div className='absolute inset-0 opacity-30' style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '54px 54px' }} aria-hidden='true' />
          <div className='absolute left-1/2 top-1/2 h-56 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#3d7fff]/20' aria-hidden='true' />
          <div className='absolute left-1/2 top-1/2 h-40 w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#3d7fff]/28' aria-hidden='true' />
          <div className='relative mx-auto mt-16 flex min-h-[76px] max-w-[520px] items-center justify-between rounded-full border border-[#9ccaff]/38 bg-gradient-to-br from-[#ffffff]/16 to-[#3d7fff]/10 px-6 shadow-[0_20px_70px_rgba(61,127,255,0.22)] backdrop-blur-xl'>
            <div><div className='text-[14px] font-medium'>Continue with intent</div><div className='mt-1.5 text-[8px] uppercase tracking-[0.15em] text-[#f7f1e7]/40'>State · Revealed · consequence named</div></div>
            <div className='grid h-11 w-11 place-items-center rounded-full bg-[#69dcff] text-[18px] text-[#061018]'>→</div>
          </div>
          <div className='relative mt-8 flex flex-wrap justify-center gap-2'>
            {['Reduce Motion','Pointer','Touch','Voice','Switch','Assistance 62%'].map((item) => <span key={item} className='rounded-full border border-[#f7f1e7]/10 bg-[#111318]/80 px-3 py-1.5 text-[7px] uppercase tracking-[0.1em] text-[#f7f1e7]/40'>{item}</span>)}
          </div>
        </div>
      </div>
      <div className='overflow-hidden rounded-[20px] border border-[#f7f1e7]/10 bg-[#0e1116]'>
        <div className='flex items-center justify-between border-b border-[#f7f1e7]/10 px-4 py-3'><span className='text-[8px] uppercase tracking-[0.14em] text-[#f7f1e7]/30'>Live instrumentation</span><span className='text-[8px] text-[#69dcff]'>12 events</span></div>
        <div className='divide-y divide-[#f7f1e7]/8'>
          {[['13:04:08','Intent','state entered','Revealed exact consequence'],['13:04:11','Pressure','threshold selected','Commit via explicit stage'],['13:04:15','Ethical','consequence revealed','384 people · location included'],['13:04:19','Reversible','action reversed','Archive undone']].map(([time,family,event,detail]) => (
            <div key={time} className='px-4 py-3.5'>
              <div className='grid grid-cols-[54px_72px_1fr] gap-2 text-[8px]'><span className='font-mono text-[#f7f1e7]/24'>{time}</span><span className='text-[#69dcff]'>{family}</span><span className='text-[#f7f1e7]/62'>{event}</span></div>
              <div className='mt-1.5 pl-[134px] text-[8px] leading-4 text-[#f7f1e7]/32'>{detail}</div>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-3 gap-px bg-[#f7f1e7]/8'>
          {['React','TypeScript','Vercel'].map((item) => <div key={item} className='bg-[#111318] px-2 py-3 text-center text-[8px] uppercase tracking-[0.12em] text-[#f7f1e7]/40'>{item}</div>)}
        </div>
      </div>
    </div>
  )
}

export default function InterfaceBehaviorLabReceiptVisual(props) {
  const { title, type, claim, proof, receiptBodyType, displayMode = 'full', ctaLabel = 'Inspect receipt' } = props
  let body = <PlaygroundReceipt />
  if (receiptBodyType === 'lifecycle') body = <LifecycleReceipt />
  if (receiptBodyType === 'library') body = <LibraryReceipt />
  if (receiptBodyType === 'accessibility') body = <AccessibilityReceipt />
  return <ReceiptShell title={title} type={type} claim={claim} proof={proof} displayMode={displayMode} ctaLabel={ctaLabel}>{body}</ReceiptShell>
}
