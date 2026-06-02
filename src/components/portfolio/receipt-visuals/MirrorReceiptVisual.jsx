import React from "react";

function AccentDot({ color }) {
  return (
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

function Section({ section, accentColor }) {
  if (section.kind === "steps") {
    return (
      <section className="rounded-[12px] border border-[#11100d]/8 bg-[#fffaf1] p-3">
        <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">{section.title}</div>
        <div className="flex flex-wrap items-center gap-1.5">
          {section.items.map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 && <span className="text-[10px] text-[#11100d]/24">/</span>}
              <span className="rounded-full border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1 text-[10px] leading-none text-[#11100d]/62">
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "metric") {
    return (
      <section className="rounded-[12px] border border-[#11100d]/8 bg-[#fffaf1] p-3">
        <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">{section.title}</div>
        <div className="grid grid-cols-3 divide-x divide-[#11100d]/8 overflow-hidden rounded-[10px] border border-[#11100d]/8 bg-[#f7f1e7]">
          {section.items.map((item) => (
            <div key={item.label} className="px-2 py-2 text-center">
              <div className="text-[16px] leading-none text-[#11100d]">{item.value}</div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/38">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "schema") {
    return (
      <section className="rounded-[12px] border border-[#11100d]/8 bg-[#fffaf1] p-3">
        <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">{section.title}</div>
        <div className="grid grid-cols-2 gap-1.5">
          {section.items.map((item) => (
            <div key={item} className="rounded-[9px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] text-[#11100d]/62">
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[12px] border border-[#11100d]/8 bg-[#fffaf1] p-3">
      <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">{section.title}</div>
      <div className="space-y-1.5">
        {section.items.map((item) => (
          <div key={item.label ?? item} className="flex items-start justify-between gap-3 border-t border-[#11100d]/6 pt-1.5 first:border-t-0 first:pt-0">
            <div className="flex min-w-0 items-start gap-2">
              <AccentDot color={accentColor} />
              <span className="text-[10px] leading-4 text-[#11100d]/62">{item.label ?? item}</span>
            </div>
            {item.value && <span className="shrink-0 text-right text-[10px] leading-4 text-[#11100d]/42">{item.value}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MirrorReceiptVisual({
  title,
  eyebrow,
  type,
  status = "ready",
  claim,
  sections = [],
  footerNote,
  accentColor = "#c7b2ff"
}) {
  return (
    <article className="w-full overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#f7f1e7] text-[#11100d]">
      <div className="border-b border-[#11100d]/8 bg-[#fffaf1] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <AccentDot color={accentColor} />
            <span className="truncate text-[9px] uppercase tracking-[0.16em] text-[#11100d]/42">{eyebrow}</span>
          </div>
          <span className="shrink-0 rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-[#11100d]/42">
            {status}
          </span>
        </div>
        <h3 className="mt-3 text-[17px] font-medium leading-5 text-[#11100d]">{title}</h3>
        <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/36">{type}</div>
        <p className="mt-2 text-[12px] leading-5 text-[#11100d]/64">{claim}</p>
      </div>

      <div className="space-y-2.5 p-3">
        {sections.map((section) => (
          <Section key={section.title} section={section} accentColor={accentColor} />
        ))}
      </div>

      {footerNote && (
        <div className="border-t border-[#11100d]/8 bg-[#fffaf1] px-4 py-3 text-[11px] leading-5 text-[#11100d]/52">
          {footerNote}
        </div>
      )}
    </article>
  );
}
