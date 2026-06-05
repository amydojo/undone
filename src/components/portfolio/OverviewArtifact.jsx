import React from 'react'

const SYSTEM_OBJECTS = {
  mirror: {
    title: 'Signal Inspector',
    purpose: 'Turns mood, sleep, clarity, and context inputs into readable states and gentle next moves.',
    flow: ['Input', 'Normalize', 'Match', 'Explain', 'Respond'],
    contrast: {
      leftLabel: 'Input',
      left: ['Energy', 'Tension', 'Clarity', 'Sleep'],
      rightLabel: 'Output',
      right: ['State', 'Confidence', 'Next move'],
    },
  },
  'smooth-md-growth-os': {
    title: 'Clinic Growth System',
    purpose: 'Connects service hierarchy, offers, Instagram proof, consult path, CRM state, follow-up, and campaign reads.',
    flow: ['Service', 'Offer', 'Proof', 'Consult', 'CRM', 'Follow-up', 'Read'],
    contrast: {
      leftLabel: 'Before',
      left: ['Scattered service promos', 'Consult and follow-up disconnected'],
      rightLabel: 'After',
      right: ['Shared service hierarchy', 'CRM/lifecycle routing', 'Campaign performance read'],
    },
  },
  'meta-airtable-dashboard': {
    title: 'Booking + Revenue Reporting',
    purpose: 'Connects Meta spend, Airtable lead records, CRM status, booking behavior, and revenue confidence.',
    flow: ['Meta', 'Leads_Master', 'CRM State', 'Booking', 'Revenue', 'Action'],
    contrast: {
      leftLabel: 'Before',
      left: ['Spend and leads in Meta', 'CRM and revenue downstream'],
      rightLabel: 'After',
      right: ['Booking behavior in campaign reads', 'Confidence-based revenue context'],
    },
  },
  'snip-provider-pipeline': {
    title: 'Provider Profile Workflow',
    purpose: 'Turns manual provider research into structured profile folders with validation gates.',
    flow: ['Source', 'Enrich', 'Validate', 'Organize', 'Publish'],
    contrast: {
      leftLabel: 'Before',
      left: ['Repeated search', 'Manual asset cleanup'],
      rightLabel: 'After',
      right: ['Structured profiles', 'Validated assets'],
    },
  },
  'guardrail-hr': {
    title: 'Assessment Engine',
    purpose: 'Turns employee policy uncertainty into structured compliance triage.',
    flow: ['Question', 'Risk Driver', 'Score', 'Result', 'Resource', 'Action'],
    contrast: {
      leftLabel: 'Before',
      left: ['Unclear HR risk', 'Manual policy interpretation', 'No guided next step'],
      rightLabel: 'After',
      right: ['22-question assessment', 'Risk score output', 'Traceable answer logic', 'Structured resource path'],
    },
  },
  'multi-brand-retention': {
    title: 'Follow-Up Router',
    purpose: 'Routes follow-up by brand, service interest, source, CRM status, and timing.',
    flow: ['Source', 'Intent', 'Service', 'Timing', 'Message', 'Booking'],
    contrast: {
      leftLabel: 'Before',
      left: ['Generic email rhythm', 'Same follow-up for every lead'],
      rightLabel: 'After',
      right: ['Relevant timing', 'Service-specific follow-up'],
    },
  },
}

export default function OverviewArtifact({ record }) {
  const obj = SYSTEM_OBJECTS[record.slug]
  if (!obj) return null

  return (
    <div className='overflow-hidden rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] lg:rounded-[20px]'>
      {/* Header */}
      <div className='flex items-start justify-between gap-3 px-3.5 py-3.5 sm:px-4 sm:py-4 lg:px-5 lg:py-5'>
        <div className='flex min-w-0 items-center gap-3'>
          <span
            className='h-2.5 w-2.5 shrink-0 rounded-full'
            style={{ background: record.accent }}
            aria-hidden='true'
          />
          <span className='text-[17px] font-medium tracking-[-0.022em] text-[#11100d] lg:text-[19px]'>
            {obj.title}
          </span>
        </div>
        <span className='text-[9px] uppercase tracking-[0.11em] text-[#11100d]/26'>system object</span>
      </div>

      {/* Purpose */}
      <div className='border-t border-[#11100d]/8 px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4 sm:pt-3.5 lg:px-5'>
        <p className='min-w-0 text-[13px] leading-[1.6] text-[#11100d]/54 lg:text-[14px]'>{obj.purpose}</p>
      </div>

      {/* Flow */}
      <div className='border-t border-[#11100d]/8 px-3.5 py-3 sm:px-4 lg:px-5'>
        <div className='flex flex-wrap items-center gap-x-1.5 gap-y-1 min-w-0'>
          <span className='mr-1.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/26'>Flow</span>
          {obj.flow.map((step, i) => (
            <React.Fragment key={step}>
              <span className='text-[12px] text-[#11100d]/62'>{step}</span>
              {i < obj.flow.length - 1 && (
                <span className='text-[11px] text-[#11100d]/18' aria-hidden='true'>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Before / After or Input / Output */}
      <div className='grid grid-cols-1 border-t border-[#11100d]/8 sm:grid-cols-2'>
        <div className='min-w-0 px-3.5 py-3.5 sm:px-4 sm:py-4 lg:px-5 lg:py-5'>
          <div className='mb-2.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/28'>
            {obj.contrast.leftLabel}
          </div>
          {obj.contrast.left.map((line) => (
            <div key={line} className='mt-1 text-[12px] leading-[1.55] text-[#11100d]/52'>{line}</div>
          ))}
        </div>
        <div className='min-w-0 px-3.5 py-3.5 sm:px-4 sm:py-4 lg:px-5 lg:py-5 border-t border-[#11100d]/8 sm:border-t-0 sm:border-l sm:border-l-[#11100d]/8'>
          <div className='mb-2.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/28'>
            {obj.contrast.rightLabel}
          </div>
          {obj.contrast.right.map((line) => (
            <div key={line} className='mt-1 text-[12px] leading-[1.55] text-[#11100d]/52'>{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
