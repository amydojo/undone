import React from "react";

const ACCENT = "#c7b2ff";

function AccentDot({ color = ACCENT, className = "h-1.5 w-1.5" }) {
  return (
    <span
      className={`${className} shrink-0 rounded-full`}
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

function LegacySection({ section, accentColor }) {
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

function LegacyReceiptVisual({
  title,
  eyebrow,
  type,
  status = "ready",
  claim,
  sections = [],
  footerNote,
  accentColor = ACCENT,
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
          <LegacySection key={section.title} section={section} accentColor={accentColor} />
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

function Label({ children, className = "" }) {
  return (
    <div className={`text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38 ${className}`}>
      {children}
    </div>
  );
}

function StatusPill({ children }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-0.5 text-[9px] uppercase tracking-[0.08em] text-[#11100d]/52">
      <AccentDot />
      {children}
    </span>
  );
}

function TypeTag({ children, className = "" }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-[6px] border border-[#11100d]/10 bg-[#f7f1e7] px-1.5 py-0.5 text-[9px] leading-4 text-[#11100d]/54 ${className}`}>
      {children}
    </span>
  );
}

function Panel({ label, children, className = "" }) {
  return (
    <section className={`rounded-[12px] border border-[#11100d]/10 bg-[#fffaf1] p-3 ${className}`}>
      {label && <Label className="mb-2">{label}</Label>}
      {children}
    </section>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center text-[11px] leading-none text-[#11100d]/26 md:px-0 md:py-8">
      -&gt;
    </div>
  );
}

function StrengthDots({ strength = 1, dark = false }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${
            index < strength
              ? dark ? "bg-[#c7b2ff]" : "bg-[#11100d]/48"
              : dark ? "bg-[#f7f1e7]/18" : "bg-[#11100d]/14"
          }`}
        />
      ))}
    </span>
  );
}

function MiniLogicMap({ preview = {} }) {
  const nodes = preview.flow ?? ["inputs", "normalize", "resolver", "output"];

  return (
    <div className="space-y-2 py-0.5">
      <div className="grid grid-cols-[1fr_10px_1fr_10px_1.15fr_10px_1fr] items-center gap-1">
        {nodes.map((node, index) => (
          <React.Fragment key={node}>
            {index > 0 && <span className="h-px bg-[#11100d]/18" aria-hidden="true" />}
            {node === "resolver" ? (
              <div className="min-w-0 rounded-[8px] border border-[#11100d]/12 bg-[#fffaf1] px-1.5 py-1.5 text-center">
                <div className="text-[8px] leading-3 text-[#11100d]/60">resolver</div>
                <div className="mt-1 grid grid-cols-3 gap-0.5">
                  {[1, 2, 3].map((rank) => (
                    <span key={rank} className="rounded-[4px] border border-[#11100d]/10 bg-[#f7f1e7] py-0.5 font-mono text-[7px] tabular-nums text-[#11100d]/38">
                      {rank}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <span className="min-w-0 rounded-[7px] border border-[#11100d]/10 bg-[#f7f1e7] px-1.5 py-1.5 text-center text-[8px] leading-3 text-[#11100d]/58">
                {node}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-1.5">
        <div className="rounded-[6px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1 text-[8px] text-[#11100d]/42">confidence</div>
        <div className="rounded-[6px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1 text-[8px] text-[#11100d]/42">next move</div>
      </div>
    </div>
  );
}

function MiniSchemaPreview({ rows = [], groups = [] }) {
  const derivedRows = rows.length > 0
    ? rows
    : groups.flatMap((group) => group.fields.map((field) => ({ group: group.group, field, type: "field", usedBy: "used" })));

  return (
    <div className="space-y-1.5">
      {derivedRows.slice(0, 4).map((row) => (
        <div key={`${row.group}-${row.field}`} className="grid grid-cols-[4px_44px_1fr_36px_8px] items-center gap-1.5 rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1.5">
          <span className="h-full min-h-5 rounded-full bg-[#c7b2ff]/70" aria-hidden="true" />
          <span className="truncate text-[7px] uppercase tracking-[0.09em] text-[#11100d]/34">{row.group}</span>
          <span className="truncate font-mono text-[9px] leading-3 text-[#11100d]/64">{row.field}</span>
          <span className="rounded-[5px] border border-[#11100d]/8 bg-[#f7f1e7] px-1 py-0.5 text-center text-[7px] leading-3 text-[#11100d]/42">
            {row.type}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#11100d]/26" title={row.usedBy} aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

function MiniRankingPreview({ preview = {} }) {
  return (
    <div className="space-y-1.5">
      <div className="rounded-[7px] border border-[#11100d]/8 bg-[#11100d]/[0.03] px-2 py-1.5 font-mono text-[8px] leading-3 text-[#11100d]/44">
        {preview.formula}
      </div>
      {(preview.rows ?? []).map((row) => {
        const [rank, ...rest] = row.split(" ");
        return (
          <div key={row} className="grid grid-cols-[30px_1fr] gap-2 rounded-[8px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5">
            <span className="flex min-h-[30px] items-center justify-center rounded-[6px] border border-[#11100d]/10 bg-[#f7f1e7] font-mono text-[11px] tabular-nums text-[#11100d]/58">
              {rank}
            </span>
            <div className="min-w-0">
              <div className="truncate text-[9px] leading-3 text-[#11100d]/62">{rest.join(" ")}</div>
              <div className="mt-1 grid grid-cols-3 gap-1">
                {["state", "friction", "feedback"].map((factor) => (
                  <span key={factor} className="rounded-[4px] bg-[#f7f1e7] px-1 py-0.5 text-center text-[7px] leading-3 text-[#11100d]/36">
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MiniCoveragePreview({ rows = [] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#11100d]/8 bg-[#fffaf1]">
      <div className="grid grid-cols-[1fr_48px_28px] border-b border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1 text-[8px] uppercase tracking-[0.1em] text-[#11100d]/34">
        <span>Component</span>
        <span>Variants</span>
        <span>Status</span>
      </div>
      {rows.slice(0, 3).map((row) => (
        <div key={row.component} className="grid grid-cols-[1fr_48px_28px] items-center gap-2 border-b border-[#11100d]/6 px-2 py-1.5 text-[9px] last:border-b-0">
          <span className="truncate text-[#11100d]/62">{row.component}</span>
          <span className="truncate text-[#11100d]/36">{row.variants.split(",")[0]}</span>
          <AccentDot />
        </div>
      ))}
    </div>
  );
}

function MiniMatcherTrace({ matches = [] }) {
  return (
    <div className="space-y-2">
      <div className="rounded-[8px] border border-[#11100d]/8 bg-[#fffaf1] p-1.5">
        <div className="mb-1 text-[7px] uppercase tracking-[0.12em] text-[#11100d]/32">today fingerprint</div>
        <div className="grid grid-cols-3 gap-1">
          {["low", "elevated", "foggy"].map((signal) => (
            <span key={signal} className="rounded-[5px] bg-[#f7f1e7] px-1 py-0.5 text-center text-[8px] leading-3 text-[#11100d]/50">
              {signal}
            </span>
          ))}
        </div>
      </div>
      {matches.map((match) => (
        <div key={match.rank} className="grid grid-cols-[24px_1fr_34px] items-center gap-2 rounded-[7px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
          <span className="font-mono text-[9px] tabular-nums text-[#11100d]/48">{match.rank}</span>
          <span className="truncate text-[10px] text-[#11100d]/62">{match.similarity}</span>
          <span className="grid grid-cols-3 gap-0.5" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <span key={index} className={`h-1 rounded-full ${index < match.strength ? "bg-[#11100d]/42" : "bg-[#11100d]/12"}`} />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function MiniFeedbackStepper({ nodes = [] }) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-[1fr_8px_1fr_8px_1fr_8px_1fr] items-center gap-1">
        {nodes.map((node, index) => (
          <React.Fragment key={node}>
            {index > 0 && <span className="h-px bg-[#11100d]/16" aria-hidden="true" />}
            <span className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-1.5 py-2 text-center text-[8px] leading-3 text-[#11100d]/58">
              {node}
            </span>
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <span className="h-px bg-[#11100d]/10" aria-hidden="true" />
        <span className="rounded-[7px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1 font-mono text-[8px] leading-3 text-[#11100d]/44">
          mirror_feedback
        </span>
        <span className="h-px bg-[#11100d]/10" aria-hidden="true" />
      </div>
      <div className="flex items-center justify-center gap-1 text-[8px] leading-3 text-[#11100d]/34">
        <span className="w-8 border-t border-[#11100d]/12" aria-hidden="true" />
        return to ranking
        <span className="w-8 border-t border-[#11100d]/12" aria-hidden="true" />
      </div>
    </div>
  );
}

function MiniRows({ rows = [] }) {
  return (
    <div className="space-y-1.5">
      {rows.slice(0, 4).map((row, index) => (
        <div key={`${row}-${index}`} className="flex items-center gap-2 rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5">
          <span className="w-5 shrink-0 text-[9px] tabular-nums text-[#11100d]/34">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7b2ff]" />
          <span className="truncate text-[10px] leading-4 text-[#11100d]/60">{row}</span>
        </div>
      ))}
    </div>
  );
}

function MiniStateMatrix({ states = [] }) {
  const abbreviations = {
    "Fog Forming": "Fog",
    Restoring: "Restore"
  };

  return (
    <div className="grid grid-cols-4 gap-1.5">
      {states.slice(0, 8).map((state) => (
        <div key={state} className="flex h-[34px] items-center justify-center rounded-[7px] border border-[#11100d]/9 bg-[#fffaf1] px-1 text-center">
          <span className="truncate text-[8px] leading-3 text-[#11100d]/62">{abbreviations[state] ?? state}</span>
        </div>
      ))}
    </div>
  );
}

function MiniFeedbackLoop({ nodes = [] }) {
  return <MiniFeedbackStepper nodes={nodes} />;
}

function MiniQaConsole({ rows = [] }) {
  const labels = rows.length > 0 ? rows : ["trigger", "pipeline", "tests", "pass"];

  return (
    <div className="rounded-[10px] border border-[#11100d]/15 bg-[#151410] p-2.5 font-mono text-[#f7f1e7]">
      <div className="flex items-center justify-between border-b border-[#f7f1e7]/12 pb-1.5">
        <span className="text-[9px] text-[#f7f1e7]/68">QA test bench</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#c7b2ff]" />
      </div>
      <div className="mt-2 space-y-1">
        {labels.slice(0, 4).map((row, index) => (
          <div key={row} className="grid grid-cols-[1fr_22px] items-center gap-2 rounded-[5px] border border-[#f7f1e7]/8 bg-[#211f1a] px-1.5 py-1 text-[8px] leading-3 text-[#f7f1e7]/58">
            <span>{row}</span>
            <span className="inline-flex items-center justify-end gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c7b2ff]" aria-hidden="true" />
              {index === 3 ? "ok" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactPreview({ receiptBodyType, preview, body }) {
  if (receiptBodyType === "logicMap") return <MiniLogicMap preview={preview} />;
  if (receiptBodyType === "schemaTable") return <MiniSchemaPreview rows={preview?.rows} groups={preview?.groups} />;
  if (receiptBodyType === "stateMatrix") return <MiniStateMatrix states={preview?.states} />;
  if (receiptBodyType === "feedbackLoop") return <MiniFeedbackLoop nodes={preview?.nodes} />;
  if (receiptBodyType === "qaConsole") return <MiniQaConsole rows={preview?.rows} />;

  if (receiptBodyType === "matcherTrace") {
    return <MiniMatcherTrace matches={body?.matches ?? []} />;
  }

  if (receiptBodyType === "rankingLedger") {
    return <MiniRankingPreview preview={preview} />;
  }

  if (receiptBodyType === "coverageMatrix") {
    return <MiniCoveragePreview rows={body?.rows ?? []} />;
  }

  return <MiniRows rows={preview?.rows} />;
}

function LogicMapBody({ body }) {
  return (
    <div className="space-y-3">
      <section className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[0.72fr_16px_0.9fr_16px_1.12fr] md:items-stretch">
          <div className="rounded-[10px] border border-[#11100d]/8 bg-[#f7f1e7] p-3">
            <Label className="mb-2">Raw inputs</Label>
            <div className="grid grid-cols-2 gap-1.5">
              {body.inputs.map((input) => (
                <div key={input} className="min-h-9 rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-2 text-[11px] leading-4 text-[#11100d]/66">
                  {input}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center text-[11px] text-[#11100d]/26 md:py-0" aria-hidden="true">
            -&gt;
          </div>

          <div className="rounded-[10px] border border-[#11100d]/8 bg-[#f7f1e7] p-3">
            <Label className="mb-2">Normalized ranges</Label>
            <div className="space-y-1.5">
              {body.ranges.map((range) => (
                <div key={range.label} className="grid grid-cols-[70px_1fr] gap-2 border-b border-[#11100d]/8 pb-1.5 last:border-b-0 last:pb-0">
                  <span className="text-[10px] leading-4 text-[#11100d]/68">{range.label}</span>
                  <span className="min-w-0 text-[10px] leading-4 text-[#11100d]/48">{range.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center text-[11px] text-[#11100d]/26 md:py-0" aria-hidden="true">
            -&gt;
          </div>

          <div className="relative rounded-[10px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label>Priority resolver</Label>
              <span className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34">deterministic</span>
            </div>
            <div className="relative">
              <span className="absolute bottom-2 left-[15px] top-2 w-px bg-[#c7b2ff]/70" aria-hidden="true" />
              <ol className="space-y-1.5">
                {body.resolver.map((state, index) => (
                  <li key={state} className="relative grid grid-cols-[32px_1fr] items-center gap-2">
                    <span className="z-[1] flex h-7 w-7 items-center justify-center rounded-full border border-[#11100d]/10 bg-[#f7f1e7] font-mono text-[10px] tabular-nums text-[#11100d]/58">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-[7px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/66">
                      {state}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7] p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <Label>Output strip</Label>
          <span className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34">state -&gt; confidence -&gt; next move</span>
        </div>
        <div className="grid grid-cols-1 overflow-hidden rounded-[10px] border border-[#11100d]/10 bg-[#fffaf1] md:grid-cols-4">
          {body.outputs.map((output) => (
            <div key={output.label} className="border-b border-[#11100d]/8 p-3 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/36">{output.label}</div>
              <div className="mt-1 text-[12px] leading-5 text-[#11100d]/68">{output.value}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] leading-4 text-[#11100d]/48">
          Normalized signals pass through priority order before a confidence label is shown.
        </p>
      </section>
    </div>
  );
}

function SchemaTableBody({ body }) {
  const sample = JSON.stringify(body.sampleRecord, null, 2);
  const groupOrder = ["Signal", "Context", "Reflection", "Storage"];
  const groupedRows = groupOrder
    .map((group) => ({ group, rows: body.rows.filter((row) => row.group === group) }))
    .filter(({ rows }) => rows.length > 0);
  const columns = ["Group", "Field", "Type", "Allowed values", "Used by"];

  return (
    <div className="space-y-3">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[620px] w-full border-collapse overflow-hidden rounded-[13px] border border-[#11100d]/10 bg-[#fffaf1] text-left">
          <thead className="bg-[#f7f1e7]">
            <tr>
              {columns.map((column) => (
                <th key={column} className="border-b border-[#11100d]/10 px-3 py-2 text-[9px] font-normal uppercase tracking-[0.13em] text-[#11100d]/40">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#11100d]/8">
            {groupedRows.map(({ group, rows }) => (
              <React.Fragment key={group}>
                {rows.map((row, rowIndex) => (
                  <tr key={`${row.group}-${row.name}`}>
                    {rowIndex === 0 && (
                      <td rowSpan={rows.length} className="w-[90px] border-r border-[#11100d]/8 bg-[#f7f1e7]/70 px-3 py-2.5 align-top">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 h-8 w-1 rounded-full bg-[#c7b2ff]/70" aria-hidden="true" />
                          <span className="text-[10px] uppercase tracking-[0.12em] text-[#11100d]/48">{group}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-3 py-2.5 font-mono text-[11px] text-[#11100d]/76">{row.name}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex rounded-[6px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1 text-[10px] text-[#11100d]/52">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] leading-4 text-[#11100d]/58">{row.allowed}</td>
                    <td className="px-3 py-2.5 text-[11px] leading-4 text-[#11100d]/58">{row.usedBy}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 md:hidden">
        {body.rows.map((row) => (
          <article key={`${row.group}-${row.name}`} className="grid grid-cols-[5px_1fr] overflow-hidden rounded-[11px] border border-[#11100d]/10 bg-[#fffaf1]">
            <span className="bg-[#c7b2ff]/70" aria-hidden="true" />
            <div className="min-w-0 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/38">{row.group}</span>
                <span className="rounded-[6px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-0.5 text-[9px] leading-4 text-[#11100d]/48">
                  {row.type}
                </span>
              </div>
              <div className="mt-1 font-mono text-[12px] leading-5 text-[#11100d]/76">{row.name}</div>
              <div className="mt-2 grid grid-cols-1 gap-2 text-[10px] leading-4 text-[#11100d]/54">
                <div>
                  <Label>Allowed values</Label>
                  <p className="mt-1">{row.allowed}</p>
                </div>
                <div>
                  <Label>Used by</Label>
                  <p className="mt-1">{row.usedBy}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="overflow-hidden rounded-[13px] border border-[#11100d]/10 bg-[#fffaf1]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#11100d]/8 bg-[#f7f1e7] px-3 py-2">
          <Label>Anonymized sample record</Label>
          <span className="font-mono text-[10px] text-[#11100d]/42">localStorage / mirror_checkins</span>
        </div>
        <pre className="max-h-[240px] overflow-auto p-3 font-mono text-[10px] leading-5 text-[#11100d]/62">
          {sample}
        </pre>
      </section>
    </div>
  );
}

function StateMatrixBody({ body }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {body.states.map((state, index) => (
        <section key={state.name} className="rounded-[12px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 w-7 shrink-0 font-mono text-[10px] tabular-nums text-[#11100d]/34">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h4 className="text-[14px] font-medium leading-5 text-[#11100d]">{state.name}</h4>
              <div className="mt-2 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/38">Input signature</div>
              <p className="mt-1 text-[11px] leading-5 text-[#11100d]/64">{state.trigger}</p>
            </div>
          </div>
          <div className="mt-3 space-y-2 border-t border-[#11100d]/8 pt-3">
            <div>
              <div className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/38">Meaning</div>
              <p className="mt-1 text-[11px] leading-5 text-[#11100d]/62">{state.meaning}</p>
            </div>
            <div className="grid grid-cols-[54px_1fr] gap-2 rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
              <span className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/36">Tone</span>
              <span className="text-[11px] leading-4 text-[#11100d]/66">{state.tone}</span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function MatcherTraceBody({ body }) {
  return (
    <div className="space-y-3">
      <section className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <Label>Today's fingerprint</Label>
          <span className="font-mono text-[10px] text-[#11100d]/42">source: {body.storageKey}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
          {body.fingerprint.map((signal) => (
            <div key={signal.label} className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
              <div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34">{signal.label}</div>
              <div className="mt-1 text-[12px] leading-4 text-[#11100d]/70">{signal.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-[164px_1fr]">
        <aside className="rounded-[13px] border border-[#11100d]/10 bg-[#f7f1e7] p-3">
          <Label className="mb-2">Match criteria rail</Label>
          <ol className="space-y-2">
            {body.criteria.map((criterion, index) => (
              <li key={criterion} className="grid grid-cols-[24px_1fr] gap-2 text-[10px] leading-4 text-[#11100d]/58">
                <span className="font-mono tabular-nums text-[#11100d]/34">{String(index + 1).padStart(2, "0")}</span>
                <span>{criterion}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="rounded-[13px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
          <Label className="mb-2">Ranked similar days</Label>
          <div className="space-y-2">
            {body.matches.map((match) => (
              <article key={match.rank} className="grid grid-cols-[42px_1fr] gap-3 rounded-[10px] border border-[#11100d]/10 bg-[#f7f1e7] p-2.5">
                <div className="flex min-h-[72px] flex-col items-center justify-center rounded-[8px] border border-[#11100d]/8 bg-[#fffaf1]">
                  <span className="font-mono text-[14px] tabular-nums text-[#11100d]/70">{match.rank}</span>
                  <span className="mt-0.5 text-[8px] uppercase tracking-[0.1em] text-[#11100d]/34">rank</span>
                </div>
                <div className="min-w-0">
                  <div className="grid grid-cols-[72px_1fr] items-center gap-2">
                    <span className="text-[11px] font-medium leading-4 text-[#11100d]/70">{match.similarity}</span>
                    <span className="grid grid-cols-3 gap-1" aria-label={`${match.similarity} similarity`}>
                      {[0, 1, 2].map((index) => (
                        <span key={index} className={`h-1.5 rounded-full ${index < match.strength ? "bg-[#11100d]/50" : "bg-[#11100d]/12"}`} />
                      ))}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-1.5 text-[10px] leading-4 text-[#11100d]/56 sm:grid-cols-[1fr_0.9fr]">
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/34">Shared signals</span>
                      {match.sharedSignals.join(", ")}
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/34">Past helpful move</span>
                      {match.helpfulMove}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function RankingLedgerBody({ body }) {
  return (
    <div className="space-y-3">
      <section className="rounded-[13px] border border-[#11100d]/10 bg-[#f7f1e7] px-3 py-2.5">
        <Label className="mb-1">Recommendation formula</Label>
        <div className="font-mono text-[11px] leading-5 text-[#11100d]/62">{body.formula}</div>
      </section>

      <div className="space-y-2">
        {body.rows.map((row) => (
          <article key={row.rank} className="grid grid-cols-[54px_1fr] gap-3 rounded-[13px] border border-[#11100d]/10 bg-[#fffaf1] p-3 sm:grid-cols-[64px_1fr]">
            <div className="flex min-h-[92px] flex-col items-center justify-center rounded-[10px] border border-[#11100d]/10 bg-[#f7f1e7]">
              <span className="font-mono text-[20px] leading-none tabular-nums text-[#11100d]/72">{row.rank}</span>
              <span className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/34">final</span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className="text-[13px] font-medium leading-5 text-[#11100d]/76">{row.candidate}</h4>
                <span className="font-mono text-[10px] text-[#11100d]/38">rank {row.rank}</span>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-1.5 text-[10px] leading-4 text-[#11100d]/56 md:grid-cols-4">
                <div className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 sm:col-span-2">
                  <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/34">Triggered by</span>
                  {row.triggeredBy}
                </div>
                <div className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
                  <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/34">Friction</span>
                  {row.friction}
                </div>
                <div className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
                  <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/34">Feedback weight</span>
                  {row.feedback}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FeedbackLoopBody({ body }) {
  const eventFields = body.example.map((item) => {
    if (item.label === "User response") return { ...item, label: "Response" };
    return item;
  });

  return (
    <div className="space-y-3">
      <section className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <Label>Adaptive product loop</Label>
          <span className="font-mono text-[10px] text-[#11100d]/42">storage: {body.storageKey}</span>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          {body.loop.map((step, index) => (
            <div key={step} className="relative rounded-[11px] border border-[#11100d]/10 bg-[#f7f1e7] p-3">
              {index > 0 && (
                <span className="absolute -left-2 top-1/2 hidden -translate-y-1/2 text-[11px] text-[#11100d]/26 md:block" aria-hidden="true">
                  -&gt;
                </span>
              )}
              <span className="font-mono text-[10px] tabular-nums text-[#11100d]/38">{String(index + 1).padStart(2, "0")}</span>
              <div className="mt-2 text-[12px] leading-5 text-[#11100d]/68">{step}</div>
              {index === 2 && (
                <div className="mt-2 rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1 font-mono text-[10px] text-[#11100d]/46">
                  mirror_feedback
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-end gap-2 text-[10px] leading-4 text-[#11100d]/42">
          <span className="hidden h-px w-16 bg-[#11100d]/12 sm:block" aria-hidden="true" />
          stored response returns to suggestion order
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[0.72fr_1.28fr]">
        <section className="rounded-[13px] border border-[#11100d]/10 bg-[#f7f1e7] p-3">
          <Label className="mb-2">Response options</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {body.responseOptions.map((option) => (
              <div key={option} className="rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/56">
                {option}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[13px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
          <Label className="mb-2">Event log</Label>
          <div className="grid grid-cols-1 gap-1.5 md:grid-cols-4">
            {eventFields.map((item) => (
              <div key={item.label} className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
                <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/34">{item.label}</span>
                <span className="mt-1 block text-[10px] leading-4 text-[#11100d]/60">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {body.eventLog.map((event) => (
              <div key={event.event} className="grid grid-cols-1 gap-1 border-t border-[#11100d]/8 pt-1.5 font-mono text-[10px] leading-4 sm:grid-cols-[1fr_1fr]">
                <span className="text-[#11100d]/52">{event.event}</span>
                <span className="text-[#11100d]/40">{event.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function QaConsoleBody({ body }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#11100d]/15 bg-[#151410] font-mono text-[#f7f1e7]">
      <div className="grid grid-cols-1 gap-2 border-b border-[#f7f1e7]/12 px-3 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <div className="min-w-0">
          <div className="text-[12px] leading-5 text-[#f7f1e7]/86">{body.header}</div>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#f7f1e7]/36">inspection bench</div>
        </div>
        <div className="rounded-[8px] border border-[#f7f1e7]/10 bg-[#211f1a] px-2 py-1.5">
          <span className="block text-[8px] uppercase tracking-[0.12em] text-[#f7f1e7]/30">Trigger</span>
          <span className="text-[10px] leading-4 text-[#f7f1e7]/62">{body.trigger}</span>
        </div>
        <div className="rounded-[8px] border border-[#f7f1e7]/10 bg-[#211f1a] px-2 py-1.5">
          <span className="block text-[8px] uppercase tracking-[0.12em] text-[#f7f1e7]/30">Close</span>
          <span className="text-[10px] leading-4 text-[#f7f1e7]/62">{body.close}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-[0.86fr_1.14fr]">
        <section>
          <div className="mb-2 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/36">Pipeline visibility modules</div>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-1">
            {body.sections.map((section, index) => (
              <div key={section} className="grid grid-cols-[24px_1fr_42px] items-center gap-2 rounded-[8px] border border-[#f7f1e7]/10 bg-[#211f1a] px-2 py-1.5">
                <span className="font-mono text-[9px] tabular-nums text-[#f7f1e7]/32">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 text-[10px] leading-4 text-[#f7f1e7]/62">{section}</span>
                <span className="text-right text-[9px] text-[#f7f1e7]/38">visible</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-2 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/36">Compact test cases</div>
          <div className="overflow-hidden rounded-[10px] border border-[#f7f1e7]/10">
            {body.testCases.map((test, index) => (
              <div key={test} className="grid grid-cols-[28px_1fr_54px] items-center gap-2 border-b border-[#f7f1e7]/10 px-2 py-1.5 last:border-b-0">
                <span className="font-mono text-[9px] tabular-nums text-[#f7f1e7]/30">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 text-[10px] leading-4 text-[#f7f1e7]/62">{test}</span>
                <span className="inline-flex items-center justify-end gap-1.5 text-[9px] text-[#f7f1e7]/48">
                  <AccentDot className="h-1.5 w-1.5" />
                  pass
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CoverageMatrixBody({ body }) {
  const categoryOrder = ["Primitive", "Data display", "Product pattern", "QA", "Page"];
  const groupedRows = categoryOrder
    .map((category) => ({ category, rows: body.rows.filter((row) => row.category === category) }))
    .filter(({ rows }) => rows.length > 0);

  return (
    <div className="space-y-3">
      <section className="grid grid-cols-1 overflow-hidden rounded-[13px] border border-[#11100d]/10 bg-[#fffaf1] md:grid-cols-3">
        {body.metadata.map((item) => (
          <div key={item.label} className="border-b border-[#11100d]/8 px-3 py-2 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <div className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36">{item.label}</div>
            <div className="mt-1 text-[11px] leading-5 text-[#11100d]/62">{item.value}</div>
          </div>
        ))}
      </section>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[640px] w-full border-collapse overflow-hidden rounded-[13px] border border-[#11100d]/10 bg-[#fffaf1] text-left">
          <thead className="bg-[#f7f1e7]">
            <tr>
              {["Component", "Category", "Variants", "States covered", "Status"].map((column) => (
                <th key={column} className="border-b border-[#11100d]/10 px-3 py-2 text-[9px] font-normal uppercase tracking-[0.13em] text-[#11100d]/40">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#11100d]/8">
            {groupedRows.map(({ category, rows }) => (
              <React.Fragment key={category}>
                {rows.map((row, rowIndex) => (
                  <tr key={row.component}>
                    <td className="px-3 py-2.5 text-[12px] text-[#11100d]/72">{row.component}</td>
                    {rowIndex === 0 && (
                      <td rowSpan={rows.length} className="w-[108px] border-l border-r border-[#11100d]/8 bg-[#f7f1e7]/70 px-3 py-2.5 align-top">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 h-8 w-1 rounded-full bg-[#c7b2ff]/70" aria-hidden="true" />
                          <span className="text-[10px] leading-4 text-[#11100d]/50">{category}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-3 py-2.5 text-[11px] leading-4 text-[#11100d]/58">{row.variants}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-[#11100d]/56">{row.statesCovered}</td>
                    <td className="px-3 py-2.5 text-[10px] text-[#11100d]/52">
                      <span className="inline-flex items-center gap-1.5">
                        <AccentDot />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 md:hidden">
        {body.rows.map((row) => (
          <article key={row.component} className="grid grid-cols-[5px_1fr] overflow-hidden rounded-[11px] border border-[#11100d]/10 bg-[#fffaf1]">
            <span className="bg-[#c7b2ff]/70" aria-hidden="true" />
            <div className="min-w-0 p-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[13px] leading-5 text-[#11100d]/74">{row.component}</div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/36">{row.category}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-[#11100d]/52">
                  <AccentDot />
                  {row.status}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-[10px] leading-4 text-[#11100d]/56">
                <div>
                  <Label>Variants</Label>
                  <p className="mt-1">{row.variants}</p>
                </div>
                <div>
                  <Label>States covered</Label>
                  <p className="mt-1 font-mono">{row.statesCovered}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ArtifactBody({ receiptBodyType, body }) {
  if (receiptBodyType === "logicMap") return <LogicMapBody body={body} />;
  if (receiptBodyType === "schemaTable") return <SchemaTableBody body={body} />;
  if (receiptBodyType === "stateMatrix") return <StateMatrixBody body={body} />;
  if (receiptBodyType === "matcherTrace") return <MatcherTraceBody body={body} />;
  if (receiptBodyType === "rankingLedger") return <RankingLedgerBody body={body} />;
  if (receiptBodyType === "feedbackLoop") return <FeedbackLoopBody body={body} />;
  if (receiptBodyType === "qaConsole") return <QaConsoleBody body={body} />;
  if (receiptBodyType === "coverageMatrix") return <CoverageMatrixBody body={body} />;
  return null;
}

function TypedReceiptVisual({
  receiptNumber,
  title,
  type,
  status = "ready",
  privacyLabel = "sanitized reconstruction",
  claim,
  receiptBodyType,
  preview,
  body,
  footerNote,
  displayMode = "full",
  ctaLabel = "Inspect receipt"
}) {
  if (displayMode === "compact") {
    return (
      <article className="w-full overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]">
        <div className="border-b border-[#11100d]/8 px-3.5 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/36">Receipt {receiptNumber}</span>
            <StatusPill>{status}</StatusPill>
          </div>
          <h3 className="mt-2.5 text-[15px] font-medium leading-5 text-[#11100d]">{title}</h3>
          <div className="mt-1 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/42">{type}</div>
        </div>

        <div className="border-b border-[#11100d]/8 bg-[#f7f1e7]/58 px-3.5 py-3">
          <CompactPreview receiptBodyType={receiptBodyType} preview={preview} body={body} />
        </div>

        <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
          <span className="truncate text-[9px] uppercase tracking-[0.13em] text-[#11100d]/38">{privacyLabel}</span>
          <span className="shrink-0 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/48">{ctaLabel}</span>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]">
      <div className="border-b border-[#11100d]/8 px-4 py-3 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#11100d]/38">Receipt {receiptNumber}</span>
              <span className="h-1 w-1 rounded-full bg-[#11100d]/18" aria-hidden="true" />
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#11100d]/38">{privacyLabel}</span>
            </div>
            <h3 className="mt-2.5 text-[18px] font-medium leading-6 text-[#11100d]">{title}</h3>
            <div className="mt-1 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/42">{type}</div>
          </div>
          <StatusPill>{status}</StatusPill>
        </div>
        {claim && <p className="mt-3 text-[12px] leading-5 text-[#11100d]/62">{claim}</p>}
      </div>

      <div className="bg-[#f7f1e7]/38 p-3 sm:p-4">
        <ArtifactBody receiptBodyType={receiptBodyType} body={body} />
      </div>

      {footerNote && (
        <div className="border-t border-[#11100d]/8 px-4 py-3 text-[11px] leading-5 text-[#11100d]/54 sm:px-5">
          {footerNote}
        </div>
      )}
    </article>
  );
}

export default function MirrorReceiptVisual(props) {
  if (!props.receiptBodyType) {
    return <LegacyReceiptVisual {...props} />;
  }

  return <TypedReceiptVisual {...props} />;
}
