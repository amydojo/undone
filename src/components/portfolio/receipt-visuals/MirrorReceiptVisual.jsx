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

function StatusPill({ children, dark = false }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 border-l pl-2 text-[9px] uppercase tracking-[0.12em] ${dark ? "border-[#f7f1e7]/14 text-[#f7f1e7]/48" : "border-[#11100d]/12 text-[#11100d]/42"}`}>
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
  const inputs = preview.inputs ?? ["mood", "sleep", "clarity", "context"];

  return (
    <div className="py-0.5">
      <div className="relative grid min-h-[116px] grid-cols-[46px_18px_24px_18px_1fr] items-center gap-1.5">
        <span className="absolute left-[48px] right-[76px] top-1/2 h-px bg-[#11100d]/14" aria-hidden="true" />
        <span className="absolute right-[71px] top-1/2 -mt-[3px] h-1.5 w-1.5 rotate-45 border-r border-t border-[#11100d]/18" aria-hidden="true" />
        <div className="space-y-1">
          {inputs.slice(0, 4).map((input, index) => (
            <div key={input} className="grid grid-cols-[6px_1fr] items-center gap-1">
              <span className={index === 1 || index === 3 ? "h-1.5 w-1.5 rounded-full bg-[#c7b2ff]" : "h-1.5 w-1.5 rounded-full bg-[#11100d]/26"} aria-hidden="true" />
              <span className="truncate text-[8px] leading-3 text-[#11100d]/52">{input}</span>
            </div>
          ))}
        </div>

        <span className="h-px bg-[#11100d]/18" aria-hidden="true" />

        <div className="relative z-[1] flex h-[88px] items-center justify-center border-x border-[#11100d]/12 bg-[#f7f1e7]">
          <span className="rotate-180 font-mono text-[7px] uppercase tracking-[0.12em] text-[#11100d]/34 [writing-mode:vertical-rl]">
            normalize
          </span>
        </div>

        <span className="h-px bg-[#11100d]/18" aria-hidden="true" />

        <div className="relative z-[1] border border-[#11100d]/12 bg-[#151410] p-2 text-[#f7f1e7]">
          <div className="text-[7px] uppercase tracking-[0.14em] text-[#f7f1e7]/36">readable state</div>
          <div className="mt-2 text-[17px] leading-none tracking-[-0.02em] text-[#f7f1e7]">Frayed</div>
          <div className="mt-2 h-px w-full bg-[#f7f1e7]/12" />
          <div className="mt-2 text-[8px] leading-3 text-[#f7f1e7]/52">tension + low clarity</div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_16px_1fr] items-center border-t border-[#11100d]/8 pt-2 text-[8px] uppercase tracking-[0.1em] text-[#11100d]/42">
        <span className="truncate">explain</span>
        <span className="text-center text-[#11100d]/22">-&gt;</span>
        <span className="truncate text-right">next move</span>
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
    <div className="grid min-h-[118px] grid-cols-[52px_1fr] overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
      <div className="border-r border-[#11100d]/8 bg-[#151410] p-1.5 text-[#f7f1e7]">
        <div className="mb-2 text-[7px] uppercase tracking-[0.14em] text-[#f7f1e7]/36">stories</div>
        {["Input", "State", "QA"].map((category) => (
          <div key={category} className="border-t border-[#f7f1e7]/10 py-1 text-[7px] leading-3 text-[#f7f1e7]/58 first:border-t-0">
            {category}
          </div>
        ))}
      </div>
      <div className="bg-[#fffaf1] p-1.5">
        <div className="border-b border-[#11100d]/8 pb-1 text-[7px] uppercase tracking-[0.1em] text-[#11100d]/34">component coverage</div>
        <div className="mt-1.5 space-y-1.5">
          {rows.slice(0, 3).map((row) => (
            <div key={row.component} className="grid grid-cols-[1fr_34px] items-center gap-2 border-l border-[#11100d]/10 pl-2">
              <div className="min-w-0">
                <div className="truncate text-[8px] leading-3 text-[#11100d]/66">{row.component}</div>
                <div className="mt-1 flex items-center gap-0.5" aria-hidden="true">
                  {[0, 1, 2].map((index) => (
                    <span key={index} className={`h-1 w-4 ${index === 0 ? "bg-[#c7b2ff]" : "bg-[#11100d]/14"}`} />
                  ))}
                </div>
              </div>
              <div className="font-mono text-[7px] leading-3 text-[#11100d]/34">{row.storyCoverage ?? row.statesCovered}</div>
            </div>
          ))}
        </div>
      </div>
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

function MiniStateMatrix({ states = [], featuredState }) {
  const visibleStates = states.slice(0, 4);

  return (
    <div className="overflow-hidden border border-[#11100d]/10 bg-[#151410] p-2 text-[#f7f1e7]">
      <div className="relative flex min-h-[72px] flex-col justify-between overflow-hidden border border-[#f7f1e7]/10 bg-[#211f1a] p-2">
        <span className="absolute left-1/2 top-2 bottom-2 w-px bg-[#f7f1e7]/6" aria-hidden="true" />
        <span className="absolute left-3 right-3 top-1/2 h-px bg-[#f7f1e7]/6" aria-hidden="true" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c7b2ff]/70" aria-hidden="true" />
        <span className="text-[7px] uppercase tracking-[0.14em] text-[#f7f1e7]/34">Weather Field</span>
        <div>
          <div className="text-[18px] leading-none tracking-[-0.02em] text-[#f7f1e7]">{featuredState ?? visibleStates[0]}</div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-px flex-1 bg-[#f7f1e7]/12" />
            <span className="h-1.5 w-8 bg-[#c7b2ff]" />
            <span className="h-px flex-1 bg-[#f7f1e7]/12" />
          </div>
        </div>
      </div>
      <div className="mt-1.5 grid grid-cols-4 gap-1">
        {visibleStates.map((state) => (
          <span key={state} className="truncate border-t border-[#f7f1e7]/10 px-1 py-1 text-center text-[7px] leading-3 text-[#f7f1e7]/52">
            {state}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniFeedbackLoop({ nodes = [] }) {
  return <MiniFeedbackStepper nodes={nodes} />;
}

function MiniQaConsole({ body }) {
  const tests = body?.testCases?.slice(0, 3) ?? [];

  return (
    <div className="border border-[#11100d]/15 bg-[#151410] p-2.5 font-mono text-[#f7f1e7]">
      <div className="flex items-center justify-between border-b border-[#f7f1e7]/12 pb-1.5">
        <span className="text-[9px] text-[#f7f1e7]/68">QA test bench</span>
        <span className="text-[8px] uppercase tracking-[0.12em] text-[#c7b2ff]">pass</span>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-[1fr_0.66fr_0.66fr_24px] gap-1 border-b border-[#f7f1e7]/10 pb-1 text-[7px] uppercase tracking-[0.09em] text-[#f7f1e7]/30">
          <span>scenario</span>
          <span>exp</span>
          <span>act</span>
          <span className="text-right">ok</span>
        </div>
        {tests.map((test) => (
          <div key={test.scenario} className="grid grid-cols-[1fr_0.66fr_0.66fr_24px] gap-1 border-b border-[#f7f1e7]/8 py-1.5 text-[8px] leading-3 last:border-b-0">
            <span className="truncate text-[#f7f1e7]/58">{test.inputs.split(",")[0]}</span>
            <span className="truncate text-[#f7f1e7]/50">{test.expected}</span>
            <span className="truncate text-[#f7f1e7]/70">{test.actual}</span>
            <span className="flex items-center justify-end gap-1 text-[7px] uppercase tracking-[0.08em] text-[#c7b2ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c7b2ff]" aria-hidden="true" />
              pass
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
  if (receiptBodyType === "stateMatrix") return <MiniStateMatrix states={preview?.states} featuredState={preview?.featuredState} />;
  if (receiptBodyType === "feedbackLoop") return <MiniFeedbackLoop nodes={preview?.nodes} />;
  if (receiptBodyType === "qaConsole") return <MiniQaConsole body={body} />;

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
  const stages = [
    { id: "01", label: "raw signals", value: "mood / sleep / clarity / context" },
    { id: "02", label: "normalize", value: "compare ranges without medical certainty" },
    { id: "03", label: "detect state", value: "Frayed" },
    { id: "04", label: "explain", value: "show why this reading appeared" },
    { id: "05", label: "next move", value: "offer one low-friction suggestion" }
  ];

  return (
    <div className="space-y-3">
      <section className="overflow-hidden border border-[#11100d]/12 bg-[#151410] text-[#f7f1e7]">
        <div className="grid grid-cols-1 border-b border-[#f7f1e7]/12 lg:grid-cols-[1fr_210px]">
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/38">Pipeline trace</div>
                <div className="mt-2 text-[18px] leading-6 text-[#f7f1e7]">Raw check-in to readable state</div>
              </div>
              <span className="border-l border-[#f7f1e7]/14 pl-2 text-[9px] uppercase tracking-[0.12em] text-[#f7f1e7]/42">
                product logic / no diagnosis
              </span>
            </div>

            <ol className="mt-4 border-y border-[#f7f1e7]/10">
              {stages.map((stage) => (
                <li key={stage.id} className="grid grid-cols-[36px_116px_1fr] items-center gap-3 border-b border-[#f7f1e7]/10 py-2 last:border-b-0">
                  <span className="font-mono text-[9px] tabular-nums text-[#f7f1e7]/30">{stage.id}</span>
                  <span className="text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/40">{stage.label}</span>
                  <span className={`text-[12px] leading-5 ${stage.label === "detect state" ? "text-[#f7f1e7]" : "text-[#f7f1e7]/62"}`}>
                    {stage.value}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="border-t border-[#f7f1e7]/12 bg-[#211f1a] p-4 lg:border-l lg:border-t-0">
            <div className="text-[9px] uppercase tracking-[0.15em] text-[#f7f1e7]/36">State output</div>
            <div className="mt-4 text-[36px] leading-none tracking-[-0.03em] text-[#f7f1e7]">Frayed</div>
            <div className="mt-4 h-px bg-[#f7f1e7]/12" />
            <div className="mt-4 grid grid-cols-[78px_1fr] gap-y-2 text-[10px] leading-4">
              <span className="uppercase tracking-[0.12em] text-[#f7f1e7]/30">Reason</span>
              <span className="text-[#f7f1e7]/62">high tension + low clarity</span>
              <span className="uppercase tracking-[0.12em] text-[#f7f1e7]/30">Output</span>
              <span className="text-[#f7f1e7]/62">explain, then suggest</span>
            </div>
          </aside>
        </div>

        <div className="grid grid-cols-1 bg-[#fffaf1] text-[#11100d] lg:grid-cols-[0.86fr_1.14fr]">
          <section className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
            <Label className="mb-2">Signal notes</Label>
            <div className="space-y-1.5">
              {body.inputs.map((input) => (
                <div key={input.label} className="grid grid-cols-[84px_1fr] gap-2 border-t border-[#11100d]/8 pt-1.5 first:border-t-0 first:pt-0">
                  <span className="text-[11px] leading-5 text-[#11100d]/66">{input.label}</span>
                  <span className="text-[11px] leading-5 text-[#11100d]/46">{input.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label>Rule trace</Label>
              <span className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34">plain rule trace</span>
            </div>
            <ol className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
              {body.resolver.slice(0, 4).map((entry, index) => (
                <li key={entry.state} className="grid grid-cols-[28px_1fr] border-t border-[#11100d]/8 pt-1.5 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0">
                  <span className="font-mono text-[10px] tabular-nums text-[#11100d]/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="text-[12px] leading-4 text-[#11100d]/72">{entry.state}</div>
                    <div className="mt-1 text-[10px] leading-4 text-[#11100d]/48">{entry.rule}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>

      <section className="overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
        <div className="grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr]">
          <div className="border-b border-[#11100d]/10 p-3 md:border-b-0 md:border-r">
            <Label className="mb-2">Product response</Label>
            <div className="space-y-1.5">
              {body.outputs.map((output) => (
                <div key={output.label} className="grid grid-cols-[106px_1fr] gap-2 border-t border-[#11100d]/8 pt-1.5 first:border-t-0 first:pt-0">
                  <span className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/36">{output.label}</span>
                  <span className="text-[11px] leading-4 text-[#11100d]/62">{output.value}</span>
                </div>
              ))}
            </div>
          </div>

          {body.foldedLogic && (
            <div className="p-3">
              <Label className="mb-2">Supporting proof</Label>
              <div className="space-y-2">
                {body.foldedLogic.map((item) => (
                  <div key={item.label} className="border-t border-[#11100d]/8 pt-2 first:border-t-0 first:pt-0">
                    <div className="text-[11px] leading-4 text-[#11100d]/70">{item.label}</div>
                    <p className="mt-0.5 text-[10px] leading-4 text-[#11100d]/50">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
  const featured = body.weatherField;

  return (
    <div className="space-y-3">
      {featured && (
        <section className="grid grid-cols-1 overflow-hidden border border-[#11100d]/12 bg-[#151410] text-[#f7f1e7] md:grid-cols-[0.82fr_1.18fr]">
          <div className="min-h-[230px] border-b border-[#f7f1e7]/10 bg-[#211f1a] p-4 md:border-b-0 md:border-r">
            <div className="flex h-full min-h-[198px] flex-col justify-between">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/42">{featured.label}</span>
                <span className="border-l border-[#f7f1e7]/14 pl-2 text-[9px] uppercase tracking-[0.12em] text-[#f7f1e7]/48">live state</span>
              </div>
              <div>
                <div className="text-[34px] leading-none tracking-[-0.03em] text-[#f7f1e7]">{featured.state}</div>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-px flex-1 bg-[#f7f1e7]/12" aria-hidden="true" />
                  <span className="h-1.5 w-24 bg-[#c7b2ff]" aria-hidden="true" />
                  <span className="h-px flex-1 bg-[#f7f1e7]/12" aria-hidden="true" />
                </div>
                <div className="mt-5 grid grid-cols-[92px_1fr] gap-x-3 gap-y-2 border-t border-[#f7f1e7]/10 pt-3 text-[10px] leading-4">
                  <span className="uppercase tracking-[0.12em] text-[#f7f1e7]/30">Texture</span>
                  <span className="text-[#f7f1e7]/62">{featured.texture}</span>
                  <span className="uppercase tracking-[0.12em] text-[#f7f1e7]/30">Confidence</span>
                  <span className="text-[#f7f1e7]/62">{featured.confidence}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <Label className="text-[#f7f1e7]/38">Interpretation copy</Label>
            <p className="mt-2 text-[14px] leading-6 text-[#f7f1e7]/74">{featured.interpretation}</p>
            <div className="mt-5 border-t border-[#f7f1e7]/10 pt-4">
              <div className="text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/36">Gentle next step</div>
              <p className="mt-1 text-[12px] leading-5 text-[#f7f1e7]/68">{featured.nextMove}</p>
            </div>
          </div>
        </section>
      )}

      <section className="overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
        <div className="border-b border-[#11100d]/8 bg-[#f7f1e7] px-3 py-2">
          <Label>State language set</Label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {body.states.map((state) => (
            <article key={state.name} className="border-b border-[#11100d]/8 px-3 py-2.5 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-[13px] font-medium leading-5 text-[#11100d]">{state.name}</h4>
                  <p className="mt-0.5 text-[10px] leading-4 text-[#11100d]/44">{state.texture}</p>
                </div>
                <span className="mt-1 h-px w-8 shrink-0 bg-[#11100d]/18" aria-hidden="true" />
              </div>
              <p className="mt-2 text-[11px] leading-5 text-[#11100d]/60">{state.copy}</p>
              <p className="mt-1.5 border-t border-[#11100d]/8 pt-1.5 text-[10px] leading-4 text-[#11100d]/46">{state.nextMove}</p>
            </article>
          ))}
        </div>
      </section>
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
    <div className="space-y-3">
      <section className="overflow-hidden border border-[#11100d]/15 bg-[#151410] font-mono text-[#f7f1e7]">
      <div className="grid grid-cols-1 gap-2 border-b border-[#f7f1e7]/12 px-3 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="min-w-0">
          <div className="text-[12px] leading-5 text-[#f7f1e7]/86">{body.header}</div>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#f7f1e7]/36">scenario / expected / actual / result</div>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-3 text-[9px] leading-4 text-[#f7f1e7]/42">
          <span>open: {body.trigger}</span>
          <span className="text-right">close: {body.close}</span>
        </div>
      </div>

      <div className="p-3">
          <div className="overflow-hidden border border-[#f7f1e7]/10">
            <div className="hidden grid-cols-[1.2fr_0.72fr_0.72fr_58px_46px] gap-2 border-b border-[#f7f1e7]/10 bg-[#211f1a] px-2 py-2 text-[8px] uppercase tracking-[0.12em] text-[#f7f1e7]/32 md:grid">
              <span>Scenario</span>
              <span>Expected</span>
              <span>Actual</span>
              <span>Conf.</span>
              <span className="text-right">Result</span>
            </div>
            {body.testCases.map((test, index) => (
              <div key={test.scenario} className={`grid grid-cols-1 gap-1 border-b border-[#f7f1e7]/10 px-2 py-2 last:border-b-0 md:grid-cols-[1.2fr_0.72fr_0.72fr_58px_46px] md:items-center md:gap-2 ${index === 0 ? "bg-[#211f1a]" : ""}`}>
                <div className="min-w-0">
                  <div className="flex items-start gap-2">
                    <span className="w-5 shrink-0 text-[9px] tabular-nums text-[#f7f1e7]/30">{String(index + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] leading-4 text-[#f7f1e7]/68">{test.scenario}</div>
                      <div className="mt-0.5 text-[8px] leading-3 text-[#f7f1e7]/34">{test.inputs}</div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] leading-4 text-[#f7f1e7]/58">
                  <span className="mr-1 text-[8px] uppercase tracking-[0.1em] text-[#f7f1e7]/28 md:hidden">Expected</span>
                  {test.expected}
                </div>
                <div className="text-[10px] leading-4 text-[#f7f1e7]/58">
                  <span className="mr-1 text-[8px] uppercase tracking-[0.1em] text-[#f7f1e7]/28 md:hidden">Actual</span>
                  {test.actual}
                </div>
                <div className="text-[10px] leading-4 text-[#f7f1e7]/46">{test.confidence}</div>
                <div className="inline-flex items-center gap-1.5 text-[9px] text-[#c7b2ff] md:justify-end">
                  <AccentDot className="h-1.5 w-1.5" />
                  {test.status}
                </div>
              </div>
            ))}
          </div>
      </div>
      </section>

      <section className="grid grid-cols-1 gap-2 border border-[#11100d]/10 bg-[#fffaf1] p-3 md:grid-cols-[1fr_1fr]">
        <div>
          <Label className="mb-2">Inspectable modules</Label>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {body.sections.map((section) => (
              <span key={section} className="border-l border-[#11100d]/12 pl-2 text-[10px] leading-4 text-[#11100d]/52">{section}</span>
            ))}
          </div>
        </div>

        {body.assertions && (
          <div className="border-t border-[#11100d]/10 pt-3 md:border-l md:border-t-0 md:pl-3 md:pt-0">
            <Label className="mb-2">Guard checks</Label>
            <div className="space-y-1">
              {body.assertions.map((assertion) => (
                <div key={assertion.label} className="grid grid-cols-[1fr_42px] gap-2 text-[10px] leading-4 text-[#11100d]/56">
                  <span>{assertion.label}</span>
                  <span className="text-right text-[#11100d]/40">{assertion.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      </div>
  );
}

function CoverageMatrixBody({ body }) {
  const categoryOrder = ["Input", "State surface", "Memory", "Action", "QA", "Page"];
  const extraCategories = body.rows
    .map((row) => row.category)
    .filter((category) => !categoryOrder.includes(category));
  const orderedCategories = [...categoryOrder, ...Array.from(new Set(extraCategories))];
  const groupedRows = orderedCategories
    .map((category) => ({ category, rows: body.rows.filter((row) => row.category === category) }))
    .filter(({ rows }) => rows.length > 0);
  const visibleRows = body.rows.slice(0, 6);

  return (
    <section className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
        <aside className="border-b border-[#11100d]/10 bg-[#151410] p-3 text-[#f7f1e7] md:border-b-0 md:border-r">
          <div className="text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/36">Storybook</div>
          <div className="mt-2 text-[16px] leading-5 text-[#f7f1e7]">Component environment</div>

          <div className="mt-4 space-y-2">
            {groupedRows.map(({ category, rows }) => (
              <div key={category} className="grid grid-cols-[1fr_24px] border-t border-[#f7f1e7]/10 pt-2 text-[10px] leading-4 first:border-t-0 first:pt-0">
                <span className="text-[#f7f1e7]/58">{category}</span>
                <span className="text-right font-mono text-[#f7f1e7]/34">{rows.length}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="grid grid-cols-1 border-b border-[#11100d]/10 bg-[#f7f1e7] md:grid-cols-3">
            {body.metadata.map((item) => (
              <div key={item.label} className="border-b border-[#11100d]/8 px-3 py-2 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36">{item.label}</div>
                <div className="mt-1 text-[11px] leading-5 text-[#11100d]/62">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {visibleRows.map((row) => (
              <article key={row.component} className="border-b border-[#11100d]/8 px-3 py-3.5 sm:border-r sm:[&:nth-child(2n)]:border-r-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="truncate text-[13px] font-medium leading-5 text-[#11100d]/78">{row.component}</h4>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/36">{row.category}</div>
                  </div>
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7b2ff]" aria-label={row.status} />
                </div>

                <p className="mt-2.5 border-t border-[#11100d]/8 pt-2.5 text-[10px] leading-4 text-[#11100d]/58">{row.variants}</p>
                <div className="mt-2.5 grid grid-cols-2 gap-3 text-[10px] leading-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/32">Coverage</span>
                    <span className="mt-0.5 block font-mono text-[#11100d]/58">{row.storyCoverage ?? row.statesCovered}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.11em] text-[#11100d]/32">Interactions</span>
                    <span className="mt-0.5 block text-[#11100d]/58">{row.interactions ?? 'states covered'}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
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

function getCompactFrameClass(receiptBodyType) {
  const base = "w-full overflow-hidden rounded-[8px] border text-[#11100d]";

  if (receiptBodyType === "stateMatrix") {
    return `${base} border-[#11100d]/12 bg-[#151410]`;
  }

  if (receiptBodyType === "qaConsole") {
    return `${base} border-[#11100d]/16 bg-[#11100d]`;
  }

  if (receiptBodyType === "coverageMatrix") {
    return `${base} border-[#11100d]/10 bg-[#f7f1e7]`;
  }

  return `${base} border-l-2 border-[#11100d]/10 border-l-[#c7b2ff]/70 bg-[#fffaf1]`;
}

function getCompactHeaderClass(receiptBodyType) {
  if (receiptBodyType === "stateMatrix" || receiptBodyType === "qaConsole") {
    return "border-b border-[#f7f1e7]/10 px-3.5 py-3 text-[#f7f1e7]";
  }

  if (receiptBodyType === "coverageMatrix") {
    return "border-b border-[#11100d]/8 bg-[#fffaf1] px-3.5 py-3";
  }

  return "border-b border-[#11100d]/8 px-3.5 py-3";
}

function getCompactPreviewClass(receiptBodyType) {
  if (receiptBodyType === "stateMatrix" || receiptBodyType === "qaConsole") {
    return "border-b border-[#f7f1e7]/10 bg-[#151410] px-3.5 py-3";
  }

  if (receiptBodyType === "coverageMatrix") {
    return "border-b border-[#11100d]/8 bg-[#fffaf1] px-3.5 py-3";
  }

  return "border-b border-[#11100d]/8 bg-[#fffaf1] px-3.5 py-3";
}

function getCompactFooterClass(receiptBodyType) {
  if (receiptBodyType === "stateMatrix" || receiptBodyType === "qaConsole") {
    return "flex items-center justify-between gap-3 px-3.5 py-2.5 text-[#f7f1e7]";
  }

  return "flex items-center justify-between gap-3 px-3.5 py-2.5";
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
    const darkCompact = receiptBodyType === "stateMatrix" || receiptBodyType === "qaConsole";

    return (
      <article className={getCompactFrameClass(receiptBodyType)}>
        <div className={getCompactHeaderClass(receiptBodyType)}>
          <div className="flex items-center justify-between gap-3">
            <span className={`text-[9px] uppercase tracking-[0.14em] ${darkCompact ? "text-[#f7f1e7]/38" : "text-[#11100d]/36"}`}>Receipt {receiptNumber}</span>
            <StatusPill dark={darkCompact}>{status}</StatusPill>
          </div>
          <h3 className={`mt-2.5 text-[15px] font-medium leading-5 ${darkCompact ? "text-[#f7f1e7]" : "text-[#11100d]"}`}>{title}</h3>
          <div className={`mt-1 text-[9px] uppercase tracking-[0.13em] ${darkCompact ? "text-[#f7f1e7]/42" : "text-[#11100d]/42"}`}>{type}</div>
        </div>

        <div className={getCompactPreviewClass(receiptBodyType)}>
          <CompactPreview receiptBodyType={receiptBodyType} preview={preview} body={body} />
        </div>

        <div className={getCompactFooterClass(receiptBodyType)}>
          <span className={`truncate text-[9px] uppercase tracking-[0.13em] ${darkCompact ? "text-[#f7f1e7]/34" : "text-[#11100d]/38"}`}>{privacyLabel}</span>
          <span className={`shrink-0 text-[9px] uppercase tracking-[0.13em] ${darkCompact ? "text-[#f7f1e7]/48" : "text-[#11100d]/48"}`}>{ctaLabel}</span>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full overflow-hidden rounded-[8px] border border-t-2 border-[#11100d]/10 border-t-[#c7b2ff]/70 bg-[#fffaf1] text-[#11100d]">
      <div className="border-b border-[#11100d]/10 px-4 py-4 sm:px-5">
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

      <div className="bg-[#f7f1e7]/30 p-3 sm:p-4">
        <ArtifactBody receiptBodyType={receiptBodyType} body={body} />
      </div>

      {footerNote && (
        <div className="border-t border-[#11100d]/10 px-4 py-3 text-[11px] leading-5 text-[#11100d]/54 sm:px-5">
          <span className="block text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">Evidence note</span>
          <span className="mt-1 block">{footerNote.replace(/^What this proves:\s*/i, "")}</span>
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
