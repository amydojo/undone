import React from 'react'

const ACCENT = '#ff6a3d'

const conclusions = {
  'type-dna': 'This proves that the recommendation is produced by a documented, role-specific model with visible positive and negative evidence.',
  'type-compare': 'This proves that candidates can be compared while the specimen text, size, measure, line height, and context remain consistent.',
  'type-substitution': 'This proves that replacement is framed as a documented tradeoff rather than an unsupported exact-dupe claim.',
  'type-receipt': 'This proves that the final decision preserves its rationale, licensing, rejected options, sources, CSS, and evidence limits.'
}

const compactThemes = {
  'type-dna': {
    shell: 'border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]',
    meta: 'text-[#11100d]/42',
    body: 'text-[#11100d]/58',
    footer: 'border-[#11100d]/10 bg-[#f2eadf] text-[#11100d]/54'
  },
  'type-compare': {
    shell: 'border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]',
    meta: 'text-[#11100d]/42',
    body: 'text-[#11100d]/58',
    footer: 'border-[#11100d]/10 bg-[#f2eadf] text-[#11100d]/54'
  },
  'type-substitution': {
    shell: 'border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]',
    meta: 'text-[#11100d]/42',
    body: 'text-[#11100d]/58',
    footer: 'border-[#11100d]/10 bg-[#f2eadf] text-[#11100d]/54'
  },
  'type-receipt': {
    shell: 'border-[#f7f1e7]/12 bg-[#090a08] text-[#f7f1e7]',
    meta: 'text-[#f7f1e7]/42',
    body: 'text-[#f7f1e7]/58',
    footer: 'border-[#f7f1e7]/10 bg-[#11120f] text-[#f7f1e7]/54'
  }
}

function CompactCue({ receiptBodyType }) {
  const rows = {
    'type-dna': ['14 signals', '3 roles', 'visible penalties'],
    'type-compare': ['4 contexts', 'synced variables', '3 candidates'],
    'type-substitution': ['preserved', 'changed', 'failure cases'],
    'type-receipt': ['reasoning', 'license', 'CSS']
  }
  const items = rows[receiptBodyType] ?? []
  return (
    <div className='mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px]' aria-hidden='true'>
      {items.map((item, index) => (
        <React.Fragment key={item}>
          {index > 0 && <span className='h-[3px] w-[3px] rounded-full bg-current opacity-25' />}
          <span className='opacity-48'>{item}</span>
        </React.Fragment>
      ))}
    </div>
  )
}

function ReceiptShell({ title, type, claim, receiptBodyType, displayMode, children, ctaLabel }) {
  if (displayMode === 'compact') {
    const theme = compactThemes[receiptBodyType] ?? compactThemes['type-dna']
    return (
      <article className={`overflow-hidden rounded-[14px] border shadow-[0_14px_30px_rgba(17,16,13,0.08)] ${theme.shell}`}>
        <div className='px-3.5 py-3.5'>
          <div className='flex items-center justify-between gap-3'>
            <div className={`text-[10px] tracking-[0.08em] ${theme.meta}`}>{type}</div>
            <span className='h-1.5 w-1.5 rounded-full bg-[#ff6a3d]' aria-hidden='true' />
          </div>
          <h3 className='mt-2 text-[15px] font-medium leading-5'>{title}</h3>
          <p className={`mt-2 line-clamp-2 text-[11px] leading-[1.5] ${theme.body}`}>{claim}</p>
          <CompactCue receiptBodyType={receiptBodyType} />
        </div>
        <div className={`flex items-center justify-between border-t px-3.5 py-2.5 text-[10px] tracking-[0.06em] ${theme.footer}`}>
          <span>{ctaLabel}</span>
          <span className='text-[#ff6a3d]'>↗</span>
        </div>
      </article>
    )
  }

  const isDark = receiptBodyType === 'type-receipt'
  return (
    <article className={isDark ? 'w-full overflow-hidden bg-[#090a08] text-[#f7f1e7]' : 'w-full overflow-hidden bg-[#fffaf1] text-[#11100d]'}>
      <header className={isDark ? 'border-b border-[#f7f1e7]/10 px-5 py-5 sm:px-7 sm:py-6' : 'border-b border-[#11100d]/10 px-5 py-5 sm:px-7 sm:py-6'}>
        <div className='flex items-center justify-between gap-4'>
          <div className={isDark ? 'text-[11px] tracking-[0.08em] text-[#f7f1e7]/46' : 'text-[11px] tracking-[0.08em] text-[#11100d]/48'}>{type}</div>
          <span className='h-2 w-2 rounded-full bg-[#ff6a3d]' aria-hidden='true' />
        </div>
        <h3 className='mt-3 max-w-[760px] text-[28px] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[34px]'>{title}</h3>
        <p className={isDark ? 'mt-3 max-w-[760px] text-[14px] leading-[1.6] text-[#f7f1e7]/66' : 'mt-3 max-w-[760px] text-[14px] leading-[1.6] text-[#11100d]/62'}>{claim}</p>
      </header>
      <div className='p-4 sm:p-6'>{children}</div>
      <footer className={isDark ? 'border-t border-[#f7f1e7]/10 bg-[#11120f] px-5 py-4 sm:px-7' : 'border-t border-[#11100d]/10 bg-[#f4ede2] px-5 py-4 sm:px-7'}>
        <div className='text-[10px] tracking-[0.06em] text-[#ff6a3d]'>Evidence conclusion</div>
        <p className={isDark ? 'mt-1.5 max-w-[820px] text-[14px] leading-[1.55] text-[#f7f1e7]/72' : 'mt-1.5 max-w-[820px] text-[14px] leading-[1.55] text-[#11100d]/72'}>{conclusions[receiptBodyType]}</p>
      </footer>
    </article>
  )
}

function TypeDnaReceipt() {
  const roles = [
    ['Display', 'Instrument Serif', '86', '+ editorial structure', '− restrained contrast'],
    ['Interface', 'Instrument Sans', '91', '+ human precision', '− low expressive range'],
    ['Metadata', 'IBM Plex Mono', '88', '+ useful mono contrast', '− category repetition risk']
  ]
  return (
    <div className='grid gap-5 lg:grid-cols-[0.72fr_1.28fr]'>
      <div className='rounded-[18px] bg-[#f4ede2] p-5'>
        <div className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/38'>Brief</div>
        <p className='mt-4 text-[24px] leading-[1.2] tracking-[-0.025em] text-[#11100d]/88'>Quiet precision. Clinical trust. Human restraint.</p>
        <div className='mt-6 border-t border-[#11100d]/10 pt-5'>
          <div className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/38'>Interpreted signals</div>
          <div className='mt-3 flex flex-wrap gap-2'>
            {['precise 92', 'human 84', 'clinical 79', 'quiet 71'].map((signal, index) => (
              <span key={signal} className={index === 0 ? 'rounded-full bg-[#11100d] px-3 py-2 text-[11px] text-[#fffaf1]' : 'rounded-full border border-[#11100d]/10 px-3 py-2 text-[11px] text-[#11100d]/58'}>{signal}</span>
            ))}
          </div>
        </div>
        <p className='mt-6 text-[12px] leading-5 text-[#11100d]/46'>Alignment describes fit to this brief and role. It is not statistical confidence or a universal quality score.</p>
      </div>
      <div className='overflow-hidden rounded-[18px] bg-[#11100d] text-[#f7f1e7]'>
        <div className='border-b border-[#f7f1e7]/10 px-5 py-4 text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/38'>Role-specific evidence</div>
        {roles.map(([role, family, score, positive, penalty]) => (
          <div key={role} className='border-b border-[#f7f1e7]/10 px-5 py-4 last:border-b-0'>
            <div className='flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.13em]'><span className='text-[#ff6a3d]'>{role}</span><span className='text-[#f7f1e7]/38'>fit {score}</span></div>
            <div className='mt-2 text-[20px] font-medium tracking-[-0.02em]'>{family}</div>
            <div className='mt-3 grid gap-1 text-[12px] leading-5 text-[#f7f1e7]/56 sm:grid-cols-2'><span>{positive}</span><span className='text-[#ffb098]'>{penalty}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComparisonReceipt() {
  const candidates = [
    ['Instrument Serif', 'Quiet contrast · editorial structure'],
    ['Newsreader', 'More literary · softer authority'],
    ['Source Serif 4', 'More robust · less distinctive']
  ]
  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-3 border-y border-[#11100d]/10 py-3'>
        <div className='flex flex-wrap gap-2'>{['Display', 'Interface', 'Body', 'Metadata'].map((context, index) => <span key={context} className={index === 0 ? 'rounded-full bg-[#11100d] px-3 py-1.5 text-[10px] text-[#fffaf1]' : 'rounded-full bg-[#f2eadf] px-3 py-1.5 text-[10px] text-[#11100d]/52'}>{context}</span>)}</div>
        <div className='text-[10px] text-[#11100d]/42'>Text · 64px · 28ch · 1.08 · Light</div>
      </div>
      <div className='mt-5 grid gap-4 lg:grid-cols-3'>
        {candidates.map(([name, read], index) => (
          <div key={name} className={index === 1 ? 'overflow-hidden rounded-[18px] bg-[#11100d] text-[#f7f1e7]' : 'overflow-hidden rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1]'}>
            <div className={index === 1 ? 'border-b border-[#f7f1e7]/10 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#f7f1e7]/38' : 'border-b border-[#11100d]/10 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/38'}>{String(index + 1).padStart(2, '0')} · {name}</div>
            <div className='px-4 py-7'>
              <div className={index === 1 ? 'font-serif text-[38px] leading-[1.05] tracking-[-0.03em] text-[#f7f1e7]' : 'font-serif text-[38px] leading-[1.05] tracking-[-0.03em] text-[#11100d]'}>Objects remember what people forget.</div>
              <p className={index === 1 ? 'mt-6 text-[12px] leading-5 text-[#f7f1e7]/52' : 'mt-6 text-[12px] leading-5 text-[#11100d]/52'}>{read}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SubstitutionReceipt() {
  return (
    <div className='grid gap-4 lg:grid-cols-[0.78fr_auto_1.22fr] lg:items-stretch'>
      <div className='rounded-[18px] bg-[#11100d] p-5 text-[#f7f1e7]'>
        <div className='text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/38'>Premium reference</div>
        <div className='mt-5 text-[34px] font-medium tracking-[-0.03em]'>Söhne</div>
        <div className='mt-2 text-[12px] text-[#f7f1e7]/46'>Commercial license · official source required</div>
        <div className='mt-8 space-y-2 text-[14px] text-[#f7f1e7]/62'><p>Compact proportions</p><p>Neutral authority</p><p>Dense interface rhythm</p></div>
      </div>
      <div className='flex items-center justify-center'><span className='grid h-14 w-14 place-items-center rounded-full bg-[#ff6a3d] text-[11px] uppercase tracking-[0.08em] text-[#11100d]'>traits</span></div>
      <div className='rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-5'>
        <div className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/38'>Accessible alternative</div>
        <div className='mt-5 text-[34px] font-medium tracking-[-0.03em]'>Inter</div>
        <div className='mt-2 text-[12px] text-[#11100d]/48'>Open source · SIL Open Font License 1.1</div>
        <div className='mt-7 grid gap-5 sm:grid-cols-2'>
          <div><div className='text-[10px] uppercase tracking-[0.12em] text-[#11100d]/34'>Preserved</div><ul className='mt-3 space-y-2 text-[13px] leading-5 text-[#11100d]/62'><li>High interface legibility</li><li>Neutral working tone</li><li>Broad weight range</li></ul></div>
          <div><div className='text-[10px] uppercase tracking-[0.12em] text-[#11100d]/34'>Changed</div><ul className='mt-3 space-y-2 text-[13px] leading-5 text-[#11100d]/62'><li>Wider, more open rhythm</li><li>Less proprietary character</li><li>Softer compactness</li></ul></div>
        </div>
        <div className='mt-6 border-t border-[#11100d]/10 pt-4'><div className='text-[10px] uppercase tracking-[0.12em] text-[#11100d]/34'>May fail when</div><p className='mt-2 text-[13px] leading-5 text-[#11100d]/58'>The brand depends on Söhne’s exact proportions and proprietary tone.</p></div>
      </div>
    </div>
  )
}

function DecisionReceipt() {
  const checks = [
    ['Data and schema', 'canonical records · migration · validation'],
    ['Model behavior', 'determinism · penalties · recovery'],
    ['Product quality', 'browser · accessibility · performance'],
    ['Privacy', 'event allowlists · free-text briefs excluded']
  ]
  return (
    <div className='grid gap-5 lg:grid-cols-[1.25fr_0.75fr]'>
      <div className='overflow-hidden rounded-[18px] bg-[#fffaf1] text-[#11100d]'>
        <div className='h-1.5 bg-[#ff6a3d]' />
        <div className='p-5 sm:p-6'>
          <div className='text-[10px] uppercase tracking-[0.14em] text-[#11100d]/38'>Type Archive · Decision 0048</div>
          <div className='mt-5 text-[25px] font-medium leading-[1.2] tracking-[-0.025em]'>Instrument Serif · Instrument Sans · IBM Plex Mono</div>
          <div className='mt-2 text-[13px] text-[#11100d]/48'>Quiet precision · clinical trust · human restraint</div>
          <div className='mt-6 grid gap-px overflow-hidden rounded-[12px] bg-[#11100d]/10 sm:grid-cols-3'>
            {[['Display', 'Instrument Serif'], ['Interface', 'Instrument Sans'], ['Metadata', 'IBM Plex Mono']].map(([role, family]) => <div key={role} className='bg-[#f4ede2] p-4'><div className='text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34'>{role}</div><div className='mt-2 text-[14px] font-medium'>{family}</div></div>)}
          </div>
          <div className='mt-6 space-y-3 border-t border-[#11100d]/10 pt-5 text-[13px] leading-5 text-[#11100d]/58'>
            <p><span className='text-[#11100d]/34'>Tradeoff · </span>Display character is restrained to protect interface clarity.</p>
            <p><span className='text-[#11100d]/34'>Rejected · </span>Bodoni Moda — role contrast too severe for this brief.</p>
            <p className='font-mono text-[12px]'><span className='font-sans text-[#11100d]/34'>CSS · </span>font-family: "Instrument Sans", sans-serif;</p>
          </div>
        </div>
      </div>
      <div className='rounded-[18px] border border-[#f7f1e7]/12 p-5'>
        <div className='text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/38'>Verification contract</div>
        <div className='mt-4 divide-y divide-[#f7f1e7]/10 border-y border-[#f7f1e7]/10'>
          {checks.map(([label, detail]) => <div key={label} className='py-4'><div className='flex items-center gap-2 text-[13px] text-[#f7f1e7]/76'><span className='h-1.5 w-1.5 rounded-full bg-[#ff6a3d]' />{label}</div><div className='mt-1.5 text-[11px] leading-5 text-[#f7f1e7]/42'>{detail}</div></div>)}
        </div>
        <div className='mt-5 text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/38'>Evidence boundary</div>
        <p className='mt-3 text-[12px] leading-5 text-[#f7f1e7]/56'>Implemented proof is visible. Human usability and market outcomes remain unearned. The latest browser suite is not described as green while GitHub Actions fails before runner startup.</p>
      </div>
    </div>
  )
}

export default function TypeArchiveReceiptVisual(props) {
  const { title, type, claim, receiptBodyType, displayMode = 'full', ctaLabel = 'Inspect receipt' } = props
  let body = <TypeDnaReceipt />
  if (receiptBodyType === 'type-compare') body = <ComparisonReceipt />
  if (receiptBodyType === 'type-substitution') body = <SubstitutionReceipt />
  if (receiptBodyType === 'type-receipt') body = <DecisionReceipt />
  return <ReceiptShell title={title} type={type} claim={claim} receiptBodyType={receiptBodyType} displayMode={displayMode} ctaLabel={ctaLabel}>{body}</ReceiptShell>
}
