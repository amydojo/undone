import React from 'react'

const ACCENT = '#1aa8cc'

const lifecycle = [
  { number: '01', stage: 'Approach', family: 'Magnetic', verb: 'Assist', signal: 'A local field reduces motor effort.' },
  { number: '02', stage: 'Clarify', family: 'Intent', verb: 'Name', signal: 'The exact consequence becomes visible.' },
  { number: '03', stage: 'Weigh', family: 'Ethical', verb: 'Inform', signal: 'Human impact is stated before action.' },
  { number: '04', stage: 'Commit', family: 'Pressure', verb: 'Act', signal: 'A named threshold confirms intent.' },
  { number: '05', stage: 'Resolve', family: 'Breathing', verb: 'Confirm', signal: 'Ambient state communicates completion.' },
  { number: '06', stage: 'Recover', family: 'Reversible', verb: 'Undo', signal: 'Recovery stays attached to the action.' },
]

const familyRows = [
  ['Intent', 'Rest, Revealed, Confirmed', 'Specificity'],
  ['Pressure', 'Preview, Act, Commit, Recover', 'Intentionality'],
  ['Breathing', 'Ready, Listening, Processing, Complete', 'Ambient state'],
  ['Magnetic', 'Far, Near, Aligned, Released', 'Reduced effort'],
  ['Ethical', 'Notice, Resist, Hold, Confirmed', 'Informed agency'],
  ['Reversible', 'Ready, Window, Expiring, Closed', 'Recovery'],
]

const substitutions = [
  ['Pressure sensing', 'Named Preview, Act, and Commit controls'],
  ['Deliberate hold', 'Explicit confirmation without holding'],
  ['Breathing motion', 'Text label, contrast change, and static state symbol'],
  ['Magnetic assistance', 'Stable conventional target'],
  ['Recovery countdown', 'Numeric time and destination copy'],
]

const conclusions = {
  lifecycle: 'This proves that the six controls are moments in one action language, not unrelated visual effects.',
  library: 'This proves that the concept was formalized as reusable component infrastructure rather than a visual mockup.',
  accessibility: 'This proves that every enhanced behavior has an equivalent path that preserves meaning and agency.',
  playground: 'This proves that all six behaviors were implemented, instrumented, and shipped with explicit simulation boundaries.',
}

const compactThemes = {
  lifecycle: {
    shell: 'border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]',
    meta: 'text-[#11100d]/42',
    body: 'text-[#11100d]/58',
    footer: 'border-[#11100d]/10 bg-[#f2eadf] text-[#11100d]/54',
  },
  library: {
    shell: 'border-[#15202d]/12 bg-[#eef3f5] text-[#111820]',
    meta: 'text-[#315467]/52',
    body: 'text-[#233542]/60',
    footer: 'border-[#15202d]/10 bg-[#e2eaed] text-[#233542]/56',
  },
  accessibility: {
    shell: 'border-[#11100d]/12 bg-[#fcf8ef] text-[#11100d]',
    meta: 'text-[#11100d]/42',
    body: 'text-[#11100d]/58',
    footer: 'border-[#11100d]/10 bg-[#f6efe3] text-[#11100d]/54',
  },
  playground: {
    shell: 'border-[#f7f1e7]/12 bg-[#090a0d] text-[#f7f1e7]',
    meta: 'text-[#69dcff]',
    body: 'text-[#f7f1e7]/58',
    footer: 'border-[#f7f1e7]/10 bg-[#111318] text-[#f7f1e7]/54',
  },
}

function CompactCue({ receiptBodyType }) {
  if (receiptBodyType === 'lifecycle') {
    return <div className='mt-3 flex items-center gap-1.5' aria-hidden='true'>{lifecycle.map((item, index) => <React.Fragment key={item.stage}><span className='h-2 w-2 rounded-full border border-[#1aa8cc]/70 bg-[#fffaf1]' />{index < lifecycle.length - 1 && <span className='h-px flex-1 bg-[#1aa8cc]/35' />}</React.Fragment>)}</div>
  }
  if (receiptBodyType === 'library') {
    return <div className='mt-3 grid grid-cols-4 gap-1.5' aria-hidden='true'>{['95', '46', '6', '3'].map((value) => <span key={value} className='border-t border-[#1aa8cc]/55 pt-1 text-[10px] text-[#223642]/68'>{value}</span>)}</div>
  }
  if (receiptBodyType === 'accessibility') {
    return <div className='mt-3 flex items-center gap-2 text-[11px] text-[#11100d]/48' aria-hidden='true'><span>Enhanced behavior</span><span className='text-[#1aa8cc]'>→</span><span>Equivalent path</span></div>
  }
  return <div className='mt-3 flex items-center gap-2 text-[10px] text-[#f7f1e7]/46' aria-hidden='true'><span className='h-2 w-2 rounded-full bg-[#38db91] shadow-[0_0_12px_rgba(56,219,145,0.65)]' /><span>Live state instrumentation</span></div>
}

function ReceiptShell({ title, type, claim, receiptBodyType, displayMode, children, ctaLabel }) {
  if (displayMode === 'compact') {
    const theme = compactThemes[receiptBodyType] ?? compactThemes.playground
    return (
      <article className={`overflow-hidden rounded-[14px] border shadow-[0_14px_30px_rgba(17,16,13,0.08)] ${theme.shell}`}>
        <div className='px-3.5 py-3.5'>
          <div className={`text-[10px] tracking-[0.08em] ${theme.meta}`}>{type}</div>
          <h3 className='mt-2 text-[15px] font-medium leading-5'>{title}</h3>
          <p className={`mt-2 line-clamp-2 text-[11px] leading-[1.5] ${theme.body}`}>{claim}</p>
          <CompactCue receiptBodyType={receiptBodyType} />
        </div>
        <div className={`border-t px-3.5 py-2.5 text-[10px] tracking-[0.06em] ${theme.footer}`}>{ctaLabel}</div>
      </article>
    )
  }

  const isDark = receiptBodyType === 'playground'
  return (
    <article className={isDark ? 'w-full overflow-hidden bg-[#090a0d] text-[#f7f1e7]' : 'w-full overflow-hidden bg-[#fffaf1] text-[#11100d]'}>
      <header className={isDark ? 'border-b border-[#f7f1e7]/10 px-5 py-5 sm:px-7 sm:py-6' : 'border-b border-[#11100d]/10 px-5 py-5 sm:px-7 sm:py-6'}>
        <div className={isDark ? 'text-[11px] tracking-[0.08em] text-[#69dcff]' : 'text-[11px] tracking-[0.08em] text-[#11100d]/48'}>{type}</div>
        <h3 className='mt-3 max-w-[760px] text-[28px] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[34px]'>{title}</h3>
        <p className={isDark ? 'mt-3 max-w-[760px] text-[14px] leading-[1.6] text-[#f7f1e7]/66' : 'mt-3 max-w-[760px] text-[14px] leading-[1.6] text-[#11100d]/62'}>{claim}</p>
      </header>
      <div className='p-4 sm:p-6'>{children}</div>
      <footer className={isDark ? 'border-t border-[#f7f1e7]/10 bg-[#101217] px-5 py-4 sm:px-7' : 'border-t border-[#11100d]/10 bg-[#f4ede2] px-5 py-4 sm:px-7'}>
        <div className={isDark ? 'text-[10px] tracking-[0.06em] text-[#69dcff]' : 'text-[10px] tracking-[0.06em] text-[#1a7894]'}>Evidence conclusion</div>
        <p className={isDark ? 'mt-1.5 max-w-[820px] text-[14px] leading-[1.55] text-[#f7f1e7]/72' : 'mt-1.5 max-w-[820px] text-[14px] leading-[1.55] text-[#11100d]/72'}>{conclusions[receiptBodyType]}</p>
      </footer>
    </article>
  )
}

function LifecycleReceipt() {
  return (
    <div>
      <div className='overflow-x-auto pb-2'>
        <div className='relative min-w-[820px] px-2 pb-5 pt-3'>
          <div className='absolute left-[8%] right-[8%] top-[58px] h-[2px] bg-gradient-to-r from-[#1aa8cc]/18 via-[#1aa8cc]/80 to-[#1aa8cc]/24' aria-hidden='true' />
          <div className='grid grid-cols-6 gap-4'>
            {lifecycle.map((item, index) => (
              <div key={item.stage} className='relative pt-8'>
                <div className={`absolute left-1/2 top-[20px] h-5 w-5 -translate-x-1/2 rounded-full border-2 bg-[#fffaf1] ${index === 3 ? 'scale-125 border-[#d86545] shadow-[0_0_0_7px_rgba(216,101,69,0.1)]' : 'border-[#1aa8cc]'}`} aria-hidden='true' />
                <div className='mt-5 text-[11px] text-[#11100d]/42'>{item.number} · {item.stage}</div>
                <div className='mt-2 text-[18px] font-medium tracking-[-0.02em]'>{item.family}</div>
                <div className='mt-4 text-[12px] font-medium text-[#1a7894]'>{item.verb}</div>
                <p className='mt-1.5 text-[13px] leading-[1.5] text-[#11100d]/58'>{item.signal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-5 grid border-y border-[#11100d]/10 sm:grid-cols-3'>
        {['The target stays stable.', 'Every state is named.', 'Recovery remains attached.'].map((value, index) => (
          <div key={value} className={`px-4 py-4 text-[14px] leading-6 text-[#11100d]/68 ${index > 0 ? 'border-t border-[#11100d]/10 sm:border-l sm:border-t-0' : ''}`}>{value}</div>
        ))}
      </div>
    </div>
  )
}

function LibraryReceipt() {
  return (
    <div>
      <div className='grid gap-6 lg:grid-cols-[0.72fr_1.28fr]'>
        <div className='grid grid-cols-2 border-y border-[#111820]/12'>
          {[['95', 'variables'], ['46', 'variants'], ['6', 'families'], ['3', 'modes']].map(([value, label], index) => (
            <div key={label} className={`px-4 py-5 ${index % 2 === 1 ? 'border-l border-[#111820]/12' : ''} ${index > 1 ? 'border-t border-[#111820]/12' : ''}`}>
              <div className='text-[38px] leading-none tracking-[-0.06em] text-[#156e89]'>{value}</div>
              <div className='mt-2 text-[12px] text-[#111820]/52'>{label}</div>
            </div>
          ))}
        </div>
        <div>
          <div className='text-[12px] font-medium text-[#111820]/54'>Annotated control specimen</div>
          <div className='relative mt-4 min-h-[250px] rounded-[22px] bg-[#e6edf0] p-5 sm:p-7'>
            <div className='mx-auto mt-14 flex min-h-[72px] max-w-[470px] items-center justify-between rounded-full border border-[#315467]/22 bg-[#f9fbfb] px-5 shadow-[0_16px_40px_rgba(24,61,78,0.12)]'>
              <div><div className='text-[16px] font-medium text-[#111820]'>Continue with intent</div><div className='mt-1 text-[11px] text-[#315467]/58'>State: Revealed · consequence named</div></div>
              <div className='grid h-11 w-11 place-items-center rounded-full bg-[#69dcff] text-[18px] text-[#071018]'>→</div>
            </div>
            <div className='absolute left-5 top-5 text-[11px] text-[#315467]/66'>Family · Intent</div>
            <div className='absolute right-5 top-5 text-[11px] text-[#315467]/66'>Mode · Light</div>
            <div className='absolute bottom-5 left-5 text-[11px] text-[#315467]/66'>Size · L</div>
            <div className='absolute bottom-5 right-5 text-right text-[11px] text-[#315467]/66'>Motion substitute · static state symbol</div>
          </div>
        </div>
      </div>
      <div className='mt-6 overflow-hidden border-y border-[#111820]/12'>
        <div className='hidden grid-cols-[0.7fr_1.5fr_0.8fr] gap-4 bg-[#eef3f5] px-4 py-3 text-[11px] font-medium text-[#111820]/52 sm:grid'><span>Family</span><span>Core states</span><span>Primary purpose</span></div>
        {familyRows.map(([family, states, purpose]) => (
          <div key={family} className='grid gap-1 border-t border-[#111820]/10 px-4 py-3 first:border-t-0 sm:grid-cols-[0.7fr_1.5fr_0.8fr] sm:gap-4'>
            <div className='text-[14px] font-medium'>{family}</div>
            <div className='text-[13px] leading-5 text-[#111820]/60'>{states}</div>
            <div className='text-[13px] leading-5 text-[#156e89]'>{purpose}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AccessibilityReceipt() {
  return (
    <div>
      <blockquote className='border-l-2 border-[#1aa8cc] pl-4 text-[20px] leading-[1.45] tracking-[-0.015em] text-[#11100d]/82 sm:text-[24px]'>Novel behavior is optional. Understanding and operability are required.</blockquote>
      <div className='mt-6 overflow-hidden border-y border-[#11100d]/12'>
        <div className='hidden grid-cols-[0.82fr_1.18fr] gap-5 bg-[#f4ede2] px-4 py-3 text-[11px] font-medium text-[#11100d]/52 sm:grid'><span>Enhanced behavior</span><span>Required accessible equivalent</span></div>
        {substitutions.map(([signal, substitute]) => (
          <div key={signal} className='grid gap-1 border-t border-[#11100d]/10 px-4 py-4 first:border-t-0 sm:grid-cols-[0.82fr_1.18fr] sm:gap-5'>
            <div className='text-[14px] font-medium text-[#11100d]/76'>{signal}</div>
            <div className='flex gap-3 text-[14px] leading-6 text-[#11100d]/64'><span className='text-[#1aa8cc]'>→</span><span>{substitute}</span></div>
          </div>
        ))}
      </div>
      <div className='mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]'>
        <div>
          <div className='text-[12px] font-medium text-[#11100d]/48'>Equivalent input paths</div>
          <div className='mt-3 flex flex-wrap gap-x-5 gap-y-2'>{['Touch', 'Pointer', 'Gaze', 'Voice', 'Switch'].map((input) => <span key={input} className='border-b border-[#1aa8cc]/45 pb-1 text-[14px] text-[#11100d]/68'>{input}</span>)}</div>
        </div>
        <ul className='space-y-2 text-[14px] leading-6 text-[#11100d]/66'>
          {['44px minimum target', 'Visible focus', 'Motion never carries state alone', 'Consequence stated before commitment', 'Recovery path is equally reachable'].map((item) => <li key={item} className='flex gap-3'><span className='mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1aa8cc]' /><span>{item}</span></li>)}
        </ul>
      </div>
    </div>
  )
}

function PlaygroundReceipt() {
  return (
    <div>
      <div className='grid gap-4 lg:grid-cols-[1.7fr_0.8fr]'>
        <div className='overflow-hidden rounded-[20px] border border-[#f7f1e7]/12 bg-[#0d1015]'>
          <div className='flex flex-wrap items-center justify-between gap-3 border-b border-[#f7f1e7]/10 px-4 py-3'>
            <div className='flex gap-2 text-[10px] text-[#f7f1e7]/54'><span>Light</span><span>Dark</span><span className='text-[#69dcff]'>Spatial</span></div>
            <div className='flex items-center gap-2 text-[10px] text-[#38db91]'><span className='h-2 w-2 rounded-full bg-[#38db91]' />Live</div>
          </div>
          <div className='relative min-h-[330px] overflow-hidden p-5 sm:p-7'>
            <div className='absolute inset-0 opacity-30' style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '54px 54px' }} aria-hidden='true' />
            <div className='absolute left-1/2 top-[48%] h-60 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#3d7fff]/20' aria-hidden='true' />
            <div className='absolute left-1/2 top-[48%] h-40 w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#3d7fff]/30' aria-hidden='true' />
            <div className='relative mx-auto mt-20 flex min-h-[82px] max-w-[540px] items-center justify-between rounded-full border border-[#9ccaff]/38 bg-gradient-to-br from-[#ffffff]/16 to-[#3d7fff]/10 px-6 shadow-[0_20px_70px_rgba(61,127,255,0.22)] backdrop-blur-xl'>
              <div><div className='text-[16px] font-medium'>Continue with intent</div><div className='mt-1.5 text-[11px] text-[#f7f1e7]/48'>State: Revealed · consequence named</div></div>
              <div className='grid h-12 w-12 place-items-center rounded-full bg-[#69dcff] text-[19px] text-[#061018]'>→</div>
            </div>
            <div className='relative mt-9 flex flex-wrap justify-center gap-3 text-[10px] text-[#f7f1e7]/46'><span>Reduce Motion</span><span>Pointer</span><span>Touch</span><span>Voice</span><span>Switch</span><span className='text-[#69dcff]'>Assistance 62%</span></div>
          </div>
        </div>
        <div className='border-y border-[#f7f1e7]/12'>
          <div className='py-3 text-[11px] text-[#f7f1e7]/42'>Live instrumentation · 12 events</div>
          {[['13:04:08', 'Intent', 'Revealed exact consequence'], ['13:04:11', 'Pressure', 'Commit via explicit stage'], ['13:04:15', 'Ethical', '384 people · location included'], ['13:04:19', 'Reversible', 'Archive undone']].map(([time, family, detail]) => (
            <div key={time} className='border-t border-[#f7f1e7]/10 py-3'>
              <div className='flex items-center justify-between gap-3 text-[11px]'><span className='text-[#69dcff]'>{family}</span><span className='font-mono text-[#f7f1e7]/32'>{time}</span></div>
              <div className='mt-1.5 text-[12px] leading-5 text-[#f7f1e7]/58'>{detail}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]'>
        <dl className='grid grid-cols-[120px_1fr] gap-x-4 gap-y-2 text-[13px] leading-5'>
          {[['Runtime', 'React + TypeScript'], ['Build', 'Vite'], ['Deployment', 'Vercel'], ['Modes', 'Light, Dark, Spatial'], ['Inputs', 'Pointer, touch, voice, switch'], ['Instrumentation', 'State transitions and action events']].map(([label, value]) => <React.Fragment key={label}><dt className='text-[#f7f1e7]/38'>{label}</dt><dd className='text-[#f7f1e7]/68'>{value}</dd></React.Fragment>)}
        </dl>
        <div>
          <div className='text-[12px] font-medium text-[#f7f1e7]/44'>Simulation boundaries</div>
          <ul className='mt-2 space-y-1.5 text-[13px] leading-5 text-[#f7f1e7]/60'>{['Hold duration does not claim physical pressure', 'Pointer distance does not claim gaze sensing', 'Haptics are optional', 'Motion is never the only signal'].map((item) => <li key={item} className='flex gap-2'><span className='text-[#69dcff]'>—</span><span>{item}</span></li>)}</ul>
        </div>
      </div>
    </div>
  )
}

export default function InterfaceBehaviorLabReceiptVisual(props) {
  const { title, type, claim, receiptBodyType, displayMode = 'full', ctaLabel = 'Inspect receipt' } = props
  let body = <PlaygroundReceipt />
  if (receiptBodyType === 'lifecycle') body = <LifecycleReceipt />
  if (receiptBodyType === 'library') body = <LibraryReceipt />
  if (receiptBodyType === 'accessibility') body = <AccessibilityReceipt />
  return <ReceiptShell title={title} type={type} claim={claim} receiptBodyType={receiptBodyType} displayMode={displayMode} ctaLabel={ctaLabel}>{body}</ReceiptShell>
}
