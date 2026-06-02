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

function getPreviewRows(sections) {
  return sections.flatMap((section) => {
    if (section.previewItems) return section.previewItems;

    if (section.kind === "metric") {
      return section.items.map((item) => `${item.value} ${item.label}`);
    }

    if (section.kind === "schema") {
      return [`${section.items.length} schema fields`];
    }

    if (section.kind === "steps") {
      return [`${section.items.length} ${section.title.toLowerCase()}`];
    }

    return section.items.slice(0, 2).map((item) => item.value ? `${item.label}: ${item.value}` : item.label ?? item);
  }).slice(0, 3);
}

function Section({ section, accentColor }) {
  if (section.kind === "steps") {
    return (
      <section className="border-t border-[#f7f1e7]/12 pt-3 first:border-t-0 first:pt-0">
        <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/42">{section.title}</div>
        <div className="flex flex-wrap items-center gap-1.5">
          {section.items.map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 && <span className="text-[10px] text-[#f7f1e7]/22">/</span>}
              <span className="rounded-full border border-[#f7f1e7]/12 bg-[#211f1a] px-2 py-1 text-[10px] leading-none text-[#f7f1e7]/68">
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
      <section className="border-t border-[#f7f1e7]/12 pt-3 first:border-t-0 first:pt-0">
        <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/42">{section.title}</div>
        <div className="grid grid-cols-3 divide-x divide-[#f7f1e7]/12 overflow-hidden rounded-[10px] border border-[#f7f1e7]/12 bg-[#211f1a]">
          {section.items.map((item) => (
            <div key={item.label} className="px-2 py-2 text-center">
              <div className="text-[16px] leading-none text-[#f7f1e7]">{item.value}</div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#f7f1e7]/44">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "schema") {
    return (
      <section className="border-t border-[#f7f1e7]/12 pt-3 first:border-t-0 first:pt-0">
        <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/42">{section.title}</div>
        <div className="grid grid-cols-2 gap-1.5">
          {section.items.map((item) => (
            <div key={item} className="rounded-[9px] border border-[#f7f1e7]/12 bg-[#211f1a] px-2 py-1.5 text-[10px] text-[#f7f1e7]/68">
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-[#f7f1e7]/12 pt-3 first:border-t-0 first:pt-0">
      <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/42">{section.title}</div>
      <div className="space-y-1.5">
        {section.items.map((item) => (
          <div key={item.label ?? item} className="flex items-start justify-between gap-3 border-t border-[#f7f1e7]/10 pt-1.5 first:border-t-0 first:pt-0">
            <div className="flex min-w-0 items-start gap-2">
              <AccentDot color={accentColor} />
              <span className="text-[10px] leading-4 text-[#f7f1e7]/68">{item.label ?? item}</span>
            </div>
            {item.value && <span className="shrink-0 text-right text-[10px] leading-4 text-[#f7f1e7]/46">{item.value}</span>}
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
  accentColor = "#c7b2ff",
  displayMode = "full",
  ctaLabel = "Inspect receipt",
  previewRows
}) {
  if (displayMode === "compact") {
    const rows = previewRows ?? getPreviewRows(sections);

    return (
      <article className="w-full overflow-hidden rounded-[14px] border border-[#f7f1e7]/12 bg-[#151410] text-[#f7f1e7]">
        <div className="bg-[#1d1b17] px-3.5 py-3">
          <div className="flex items-center gap-2">
            <AccentDot color={accentColor} />
            <span className="truncate text-[9px] uppercase tracking-[0.15em] text-[#f7f1e7]/48">{type}</span>
          </div>
          <h3 className="mt-2.5 text-[15px] font-medium leading-5 text-[#f7f1e7]">{title}</h3>
        </div>

        {rows.length > 0 && (
          <div className="divide-y divide-[#f7f1e7]/10 border-t border-[#f7f1e7]/12">
            {rows.map((row) => (
              <div key={row} className="flex items-center gap-2 px-3.5 py-2 text-[11px] leading-4 text-[#f7f1e7]/66">
                <AccentDot color={accentColor} />
                <span>{row}</span>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-[#f7f1e7]/12 bg-[#1d1b17] px-3.5 py-2.5">
          <span className="text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/52">{ctaLabel}</span>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full overflow-hidden rounded-[16px] border border-[#f7f1e7]/12 bg-[#151410] text-[#f7f1e7]">
      <div className="border-b border-[#f7f1e7]/12 bg-[#1d1b17] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <AccentDot color={accentColor} />
            <span className="truncate text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/48">{eyebrow}</span>
          </div>
          <span className="shrink-0 rounded-full border border-[#f7f1e7]/12 bg-[#211f1a] px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-[#f7f1e7]/48">
            {status}
          </span>
        </div>
        <h3 className="mt-3 text-[17px] font-medium leading-5 text-[#f7f1e7]">{title}</h3>
        <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/42">{type}</div>
        <p className="mt-2 text-[12px] leading-5 text-[#f7f1e7]/62">{claim}</p>
      </div>

      <div className="space-y-3 bg-[#151410] p-3">
        {sections.map((section) => (
          <Section key={section.title} section={section} accentColor={accentColor} />
        ))}
      </div>

      {footerNote && (
        <div className="border-t border-[#f7f1e7]/12 bg-[#1d1b17] px-4 py-3 text-[11px] leading-5 text-[#f7f1e7]/56">
          {footerNote}
        </div>
      )}
    </article>
  );
}
