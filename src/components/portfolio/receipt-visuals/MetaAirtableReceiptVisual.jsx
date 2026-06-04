import React from "react";
import MirrorReceiptVisual from "./MirrorReceiptVisual";

const ACCENT = "#b6f3d4";
const LAVENDER = "#c7b2ff";
function Dot({ color = ACCENT, className = "h-1.5 w-1.5" }) {
  return <span className={`${className} shrink-0 rounded-full`} style={{ backgroundColor: color }} aria-hidden="true" />;
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
      <Dot />
      {children}
    </span>
  );
}

function Tag({ children, color = ACCENT, dark = false }) {
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-[6px] border px-1.5 py-0.5 text-[9px] leading-4 ${
      dark
        ? "border-[#fffaf1]/12 bg-[#fffaf1]/5 text-[#fffaf1]/62"
        : "border-[#11100d]/10 bg-[#f7f1e7] text-[#11100d]/54"
    }`}>
      <Dot color={color} className="h-1 w-1" />
      {children}
    </span>
  );
}

function Connector({ vertical = false, dark = false }) {
  return (
    <span className={`${vertical ? "py-1 text-center" : "px-1"} shrink-0 text-[10px] leading-none ${dark ? "text-[#fffaf1]/24" : "text-[#11100d]/24"}`}>
      {"->"}
    </span>
  );
}

function groupCounts(fields = []) {
  return fields.reduce((counts, field) => {
    counts[field.group] = (counts[field.group] ?? 0) + 1;
    return counts;
  }, {});
}

function groupOrder(fields = []) {
  return fields.reduce((groups, field) => {
    if (!groups.includes(field.group)) groups.push(field.group);
    return groups;
  }, []);
}

function groupFields(fields = []) {
  return fields.reduce((groups, field) => {
    if (!groups[field.group]) groups[field.group] = [];
    groups[field.group].push(field);
    return groups;
  }, {});
}

function MiniSchemaInspector({ preview = {} }) {
  const rows = preview.rows ?? [];

  return (
    <div className="grid grid-cols-[46px_1fr] gap-2">
      <div className="flex min-h-[118px] flex-col justify-between border border-[#11100d]/10 bg-[#151410] p-1.5 text-[#fffaf1]">
        <span className="vertical-rl font-mono text-[7px] uppercase tracking-[0.12em] text-[#fffaf1]/58 [writing-mode:vertical-rl]">
          Leads_Master
        </span>
        <span className="font-mono text-[8px] text-[#fffaf1]/38">{rows.length} fields</span>
      </div>
      <div className="min-w-0 overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
        <div className="grid grid-cols-[1fr_34px_14px] border-b border-[#11100d]/8 bg-[#f7f1e7] px-1.5 py-1 text-[7px] uppercase tracking-[0.08em] text-[#11100d]/34">
          <span>field</span>
          <span>type</span>
          <span>rel</span>
        </div>
        {rows.slice(0, 10).map((row) => (
          <div key={`${row.group}-${row.field}`} className="grid grid-cols-[5px_1fr_34px_14px] items-center gap-1 border-b border-[#11100d]/6 px-1.5 py-[3px] last:border-b-0">
            <span className={`h-3 rounded-full ${row.group === "Attribution" ? "bg-[#c7b2ff]" : "bg-[#b6f3d4]"}`} aria-hidden="true" />
            <span className="truncate font-mono text-[8px] leading-3 text-[#11100d]/64">{row.field}</span>
            <span className="truncate text-[7px] leading-3 text-[#11100d]/36">{row.type}</span>
            <Dot color={row.group === "Attribution" ? LAVENDER : ACCENT} className="h-1.5 w-1.5" />
          </div>
        ))}
        <div className="grid grid-cols-[1fr_8px_1fr_8px_1fr] items-center gap-1 border-t border-[#11100d]/8 bg-[#f7f1e7] px-1.5 py-1 text-[7px] text-[#11100d]/38">
          <span className="truncate">Meta Form</span>
          <span>-&gt;</span>
          <span className="truncate">CRM</span>
          <span>-&gt;</span>
          <span className="truncate">Revenue</span>
        </div>
      </div>
    </div>
  );
}

function MiniFormulaWorksheet({ preview = {} }) {
  return (
    <div className="grid grid-cols-[1fr_46px] gap-1.5">
      <div className="min-w-0 space-y-1.5">
        <div className="grid grid-cols-[20px_1fr] overflow-hidden border border-[#11100d]/10 bg-[#fffaf1] font-mono">
          <div className="border-r border-[#11100d]/8 bg-[#151410] px-1 py-1 text-center text-[7px] text-[#fffaf1]/54">fx</div>
          <div className="truncate px-1.5 py-1 text-[8px] text-[#11100d]/58">Spend / Leads</div>
        </div>
        <div className="overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
          <div className="grid grid-cols-[18px_repeat(5,minmax(0,1fr))] border-b border-[#11100d]/8 bg-[#f7f1e7] text-center font-mono text-[7px] text-[#11100d]/34">
            <span className="border-r border-[#11100d]/8 py-1" />
            {(preview.formulas ?? []).slice(0, 5).map((formula) => (
              <span key={formula} className="border-r border-[#11100d]/8 py-1 last:border-r-0">{formula}</span>
            ))}
          </div>
          {(preview.rows ?? []).slice(0, 3).map((row, index) => (
            <div key={`${row.input}-${row.output}`} className="grid grid-cols-[18px_0.8fr_1fr_0.8fr] border-b border-[#11100d]/6 font-mono text-[7px] leading-3 last:border-b-0">
              <span className="border-r border-[#11100d]/8 bg-[#f7f1e7] py-1 text-center text-[#11100d]/30">{index + 1}</span>
              <span className="truncate border-r border-[#11100d]/6 px-1 py-1 text-[#11100d]/42">{row.input}</span>
              <span className="truncate border-r border-[#11100d]/6 px-1 py-1 text-[#11100d]/60">{row.logic}</span>
              <span className="truncate px-1 py-1 text-[#11100d]/42">{row.output}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        {["calc", "review", "scale", "repair"].map((flag, index) => (
          <div key={flag} className="grid grid-cols-[5px_1fr] items-center gap-1 border border-[#11100d]/8 bg-[#fffaf1] px-1 py-1">
            <span className={`h-3 rounded-full ${index === 0 || index === 2 ? "bg-[#b6f3d4]" : "bg-[#c7b2ff]"}`} aria-hidden="true" />
            <span className="truncate text-[7px] uppercase tracking-[0.07em] text-[#11100d]/42">{flag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniAttributionBoard({ preview = {} }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#11100d]/10 bg-[#fffaf1]">
      <div className="grid grid-cols-[1fr_44px] border-b border-[#11100d]/8 bg-[#151410] px-2 py-1 text-[7px] uppercase tracking-[0.08em] text-[#fffaf1]/54">
        <span>trace board</span>
        <span>conf</span>
      </div>
      <div className="grid grid-cols-[42px_1fr_34px] gap-1 border-b border-[#11100d]/6 p-1.5">
        <span className="rounded-[6px] border border-[#11100d]/8 bg-[#f7f1e7] px-1 py-1 text-center text-[7px] uppercase tracking-[0.08em] text-[#11100d]/34">clean</span>
        <div className="grid grid-cols-[1fr_6px_1fr_6px_1fr] items-center gap-1">
          {["source", "lead", "revenue"].map((node, index) => (
            <React.Fragment key={node}>
              {index > 0 && <span className="h-px bg-[#11100d]/18" aria-hidden="true" />}
              <span className="truncate rounded-[5px] border border-[#11100d]/8 bg-[#fffaf1] px-1 py-1 text-center text-[7px] leading-3 text-[#11100d]/58">{node}</span>
            </React.Fragment>
          ))}
        </div>
        <Dot className="mx-auto mt-1.5 h-1.5 w-1.5" />
      </div>
      <div className="grid grid-cols-[42px_1fr_34px] gap-1 p-1.5">
        <span className="rounded-[6px] border border-[#11100d]/8 bg-[#f7f1e7] px-1 py-1 text-center text-[7px] uppercase tracking-[0.08em] text-[#11100d]/34">review</span>
        <div className="grid grid-cols-[1fr_6px_1fr] items-center gap-1">
          <span className="truncate rounded-[5px] border border-[#11100d]/8 bg-[#fffaf1] px-1 py-1 text-center text-[7px] leading-3 text-[#11100d]/58">missing campaign</span>
          <span className="h-px bg-[#11100d]/18" aria-hidden="true" />
          <span className="truncate rounded-[5px] border border-[#11100d]/8 bg-[#fffaf1] px-1 py-1 text-center text-[7px] leading-3 text-[#11100d]/58">{preview.branch}</span>
        </div>
        <Dot color={LAVENDER} className="mx-auto mt-1.5 h-1.5 w-1.5" />
      </div>
    </div>
  );
}

function MiniCommandCenter({ preview = {} }) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-4 overflow-hidden border border-[#11100d]/10 bg-[#151410]">
        {(preview.sections ?? []).map((section) => (
          <span key={section.label} className="truncate border-r border-[#fffaf1]/12 px-1 py-1 text-center text-[7px] uppercase tracking-[0.07em] text-[#fffaf1]/54 last:border-r-0">
            {section.label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[0.72fr_1fr] gap-2">
        <div className="space-y-1">
          {(preview.sections ?? []).map((section) => (
            <div key={section.label} className="grid grid-cols-[5px_1fr] items-center gap-1 border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1">
              <span className="h-full min-h-4 rounded-full" style={{ backgroundColor: section.color ?? ACCENT }} aria-hidden="true" />
              <span className="truncate text-[7px] uppercase tracking-[0.08em] text-[#11100d]/42">{section.label}</span>
            </div>
          ))}
        </div>
        <div className="overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
          <div className="grid grid-cols-[1fr_34px] border-b border-[#11100d]/8 bg-[#f7f1e7] px-1.5 py-1 text-[7px] uppercase tracking-[0.08em] text-[#11100d]/34">
            <span>queue</span>
            <span>action</span>
          </div>
          {(preview.sections ?? []).slice(0, 4).map((section, index) => (
            <div key={`${section.label}-${index}`} className="grid grid-cols-[1fr_34px] border-b border-[#11100d]/6 px-1.5 py-1 last:border-b-0">
              <span className="truncate text-[8px] leading-3 text-[#11100d]/56">{section.detail}</span>
              <span className="truncate text-[7px] uppercase tracking-[0.06em] text-[#11100d]/34">{section.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompactPreview({ receiptBodyType, preview }) {
  if (receiptBodyType === "airtableSchemaMap") return <MiniSchemaInspector preview={preview} />;
  if (receiptBodyType === "campaignFormulaSheet") return <MiniFormulaWorksheet preview={preview} />;
  if (receiptBodyType === "attributionTrace") return <MiniAttributionBoard preview={preview} />;
  if (receiptBodyType === "decisionQueueConsole") return <MiniCommandCenter preview={preview} />;
  return null;
}

function LineageBar({ steps = [], dark = false }) {
  return (
    <div className={`flex flex-col gap-1.5 md:flex-row md:items-center ${dark ? "text-[#fffaf1]" : "text-[#11100d]"}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {index > 0 && <Connector vertical dark={dark} />}
          <div className={`min-w-0 border px-2 py-1.5 text-[10px] leading-4 ${
            dark
              ? "border-[#fffaf1]/12 bg-[#fffaf1]/5 text-[#fffaf1]/58"
              : "border-[#11100d]/8 bg-[#f7f1e7] text-[#11100d]/58"
          }`}>
            {step}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function SchemaInspectorBody({ body }) {
  const groups = groupOrder(body.fields);
  const fieldsByGroup = groupFields(body.fields);
  const sampleEntries = Object.entries(body.sampleRecord ?? {});

  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <div className="grid grid-cols-2 border-b border-[#11100d]/10 bg-[#151410] text-[#fffaf1] md:grid-cols-4">
        {[
          ["BASE", "Marketing Intelligence Layer"],
          ["TABLE", "Leads_Master"],
          ["ROLE", "shared lead record"],
          ["STATUS", "attribution-ready"]
        ].map(([label, value]) => (
          <div key={label} className="border-b border-r border-[#fffaf1]/12 px-2.5 py-1.5 last:border-r-0 md:border-b-0">
            <div className="text-[8px] uppercase tracking-[0.15em] text-[#fffaf1]/36">{label}</div>
            <div className="mt-1 break-words font-mono text-[11px] leading-4 text-[#fffaf1]/76">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="min-w-0 border-b border-[#11100d]/10 p-2.5 lg:border-b-0 lg:border-r">
          <div className="mb-2 flex items-center justify-between gap-3">
            <Label>Grouped field inventory</Label>
            <span className="font-mono text-[10px] tabular-nums text-[#11100d]/34">{body.fields.length} fields inspected</span>
          </div>

          <div className="space-y-1.5">
            {groups.map((group) => (
              <div key={group} className="grid grid-cols-[7px_1fr] border border-[#11100d]/10 bg-[#fffaf1]">
                <span className={`h-full min-h-16 ${group === "Attribution" ? "bg-[#c7b2ff]" : "bg-[#b6f3d4]"}`} aria-hidden="true" />
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3 border-b border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[#11100d]/48">{group}</span>
                    <span className="font-mono text-[10px] text-[#11100d]/30">{fieldsByGroup[group].length} fields</span>
                  </div>

                  <div className="hidden md:block">
                    <div className="grid grid-cols-[1.1fr_0.8fr_0.9fr_1.1fr] border-b border-[#11100d]/8 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/34">
                      <span>field</span>
                      <span>type</span>
                      <span>example</span>
                      <span>used by</span>
                    </div>
                    {fieldsByGroup[group].slice(0, 5).map((field) => (
                      <div key={`${field.group}-${field.field}`} className="grid grid-cols-[1.1fr_0.8fr_0.9fr_1.1fr] border-b border-[#11100d]/6 px-2 py-1 text-[10px] leading-4 last:border-b-0">
                        <span className="break-words font-mono text-[#11100d]/70">{field.field}</span>
                        <span className="break-words text-[#11100d]/48">{field.type}</span>
                        <span className="break-words text-[#11100d]/46">{field.example}</span>
                        <span className="break-words text-[#11100d]/56">{field.usedFor}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 p-2 md:hidden">
                    {fieldsByGroup[group].slice(0, 5).map((field) => (
                      <div key={`${field.group}-${field.field}`} className="border border-[#11100d]/8 bg-[#f7f1e7] p-2">
                        <div className="break-words font-mono text-[11px] text-[#11100d]/70">{field.field}</div>
                        <div className="mt-1 text-[10px] leading-4 text-[#11100d]/52">type: {field.type}</div>
                        <div className="text-[10px] leading-4 text-[#11100d]/52">example: {field.example}</div>
                        <div className="text-[10px] leading-4 text-[#11100d]/52">used by: {field.usedFor}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-2 bg-[#f7f1e7] p-2.5">
          <section className="border border-[#11100d]/10 bg-[#fffaf1] p-2.5">
            <Label className="mb-2">Data lineage map</Label>
            <div className="space-y-1.5">
              {(body.lineage ?? []).map((step, index) => (
                <React.Fragment key={step}>
                  {index > 0 && <div className="ml-3 h-3 w-px bg-[#11100d]/16" aria-hidden="true" />}
                  <div className="grid grid-cols-[26px_1fr] items-center gap-2">
                    <span className="font-mono text-[10px] tabular-nums text-[#11100d]/30">{String(index + 1).padStart(2, "0")}</span>
                    <span className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1 text-[11px] leading-4 text-[#11100d]/62">{step}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>

          <section className="border border-[#11100d]/10 bg-[#151410] p-2.5 text-[#fffaf1]">
            <Label className="mb-2 text-[#fffaf1]/42">Sample sanitized record</Label>
            <div className="font-mono text-[10px] leading-4 text-[#fffaf1]/66">
              <div>{"{"}</div>
              {sampleEntries.map(([key, value]) => (
                <div key={key} className="break-words pl-3">
                  {key}: "{value}",
                </div>
              ))}
              <div>{"}"}</div>
            </div>
          </section>

          <section className="border border-[#11100d]/10 bg-[#fffaf1] p-2.5">
            <Label className="mb-2">Downstream usage</Label>
            <div className="space-y-1.5">
              {(body.downstreamUsage ?? []).map((usage) => (
                <div key={usage} className="grid grid-cols-[5px_1fr] items-center gap-2 border-b border-[#11100d]/8 pb-1 last:border-b-0">
                  <span className="h-4 rounded-full bg-[#b6f3d4]" aria-hidden="true" />
                  <span className="text-[11px] leading-4 text-[#11100d]/60">{usage}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function FormulaWorksheetBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <div className="grid grid-cols-[46px_1fr_92px] border-b border-[#11100d]/10 bg-[#151410] font-mono text-[#fffaf1]">
        <div className="border-r border-[#fffaf1]/12 px-3 py-2 text-[10px] text-[#fffaf1]/44">fx</div>
        <div className="px-3 py-2 text-[10px] leading-4 text-[#fffaf1]/68">Campaign_Performance worksheet / normalized marketing ops model</div>
        <div className="border-l border-[#fffaf1]/12 px-3 py-2 text-[10px] text-[#fffaf1]/44">calculated</div>
      </div>

      <section className="border-b border-[#11100d]/10 p-3">
        <Label className="mb-2">Zone 1 / Formula strip</Label>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-5">
          {body.formulas.map((formula, index) => (
            <div key={formula.name} className="border border-[#11100d]/10 bg-[#f7f1e7]">
              <div className="grid grid-cols-[42px_1fr] border-b border-[#11100d]/8 font-mono text-[9px]">
                <span className="border-r border-[#11100d]/8 px-2 py-1 text-[#11100d]/30">COL {String.fromCharCode(65 + index)}</span>
                <span className="px-2 py-1 text-[#11100d]/42">calculation cell</span>
              </div>
              <div className="px-2 py-2">
                <div className="font-mono text-[12px] leading-4 text-[#11100d]/72">{formula.name}</div>
                <div className="mt-1 break-words font-mono text-[10px] leading-4 text-[#11100d]/50">{formula.expression}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 border-b border-[#11100d]/10 xl:grid-cols-[1fr_300px]">
        <section className="min-w-0 p-3">
          <Label className="mb-2">Zone 2 / Model mapping table</Label>
          <div className="hidden md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-y border-[#11100d]/10 bg-[#f7f1e7]">
                  {["Input Source", "Raw Metric", "Normalized Field", "Formula / Logic", "Decision Output"].map((heading) => (
                    <th key={heading} className="px-2 py-2 text-[9px] font-normal uppercase tracking-[0.13em] text-[#11100d]/38">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.modelRows.map((row) => (
                  <tr key={`${row.inputSource}-${row.normalizedField}`} className="border-b border-[#11100d]/7">
                    <td className="w-[16%] break-words px-2 py-2 align-top text-[11px] text-[#11100d]/62">{row.inputSource}</td>
                    <td className="w-[15%] break-words px-2 py-2 align-top text-[11px] text-[#11100d]/52">{row.sourceMetric}</td>
                    <td className="w-[20%] break-words px-2 py-2 align-top font-mono text-[11px] text-[#11100d]/68">{row.normalizedField}</td>
                    <td className="w-[25%] break-words px-2 py-2 align-top text-[11px] text-[#11100d]/54">{row.logic}</td>
                    <td className="w-[22%] break-words px-2 py-2 align-top text-[11px] text-[#11100d]/58">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5 md:hidden">
            {body.modelRows.map((row) => (
              <div key={`${row.inputSource}-${row.normalizedField}`} className="border border-[#11100d]/8 bg-[#f7f1e7] p-2">
                <div className="font-mono text-[12px] text-[#11100d]/70">{row.normalizedField}</div>
                <div className="mt-1 text-[10px] leading-4 text-[#11100d]/54">input: {row.inputSource} / {row.sourceMetric}</div>
                <div className="text-[10px] leading-4 text-[#11100d]/54">logic: {row.logic}</div>
                <div className="text-[10px] leading-4 text-[#11100d]/54">output: {row.output}</div>
              </div>
            ))}
          </div>
        </section>

        <aside className="border-t border-[#11100d]/10 bg-[#f7f1e7] p-3 xl:border-l xl:border-t-0">
          <Label className="mb-2">Zone 3 / Decision rule block</Label>
          <div className="space-y-2">
            {body.decisionRules.map((rule, index) => (
              <div key={rule} className="grid grid-cols-[36px_1fr] border border-[#11100d]/8 bg-[#fffaf1]">
                <span className="border-r border-[#11100d]/8 px-2 py-2 font-mono text-[10px] tabular-nums text-[#11100d]/32">{String(index + 1).padStart(2, "0")}</span>
                <span className="break-words px-2 py-2 font-mono text-[10px] leading-4 text-[#11100d]/60">{rule}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="bg-[#f7f1e7] p-3">
        <Label className="mb-2">Campaign review ledger</Label>
        <div className="hidden md:block">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="border-y border-[#11100d]/10 bg-[#fffaf1]">
                {["Campaign", "Service", "CPL", "Booked", "Arrived", "Converted", "Decision"].map((heading) => (
                  <th key={heading} className="px-2 py-2 text-[9px] font-normal uppercase tracking-[0.13em] text-[#11100d]/38">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(body.ledgerRows ?? []).map((row) => (
                <tr key={row.campaign} className="border-b border-[#11100d]/7 bg-[#fffaf1]">
                  <td className="break-words px-2 py-2 align-top text-[11px] text-[#11100d]/68">{row.campaign}</td>
                  <td className="break-words px-2 py-2 align-top text-[11px] text-[#11100d]/54">{row.service}</td>
                  <td className="px-2 py-2 align-top font-mono text-[10px] text-[#11100d]/48">{row.cpl}</td>
                  <td className="px-2 py-2 align-top font-mono text-[10px] text-[#11100d]/48">{row.booked}</td>
                  <td className="px-2 py-2 align-top font-mono text-[10px] text-[#11100d]/48">{row.arrived}</td>
                  <td className="px-2 py-2 align-top font-mono text-[10px] text-[#11100d]/48">{row.converted}</td>
                  <td className="break-words px-2 py-2 align-top text-[11px] text-[#11100d]/62">{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-1.5 md:hidden">
          {(body.ledgerRows ?? []).map((row) => (
            <div key={row.campaign} className="border border-[#11100d]/8 bg-[#fffaf1] p-2">
              <div className="break-words text-[12px] text-[#11100d]/70">{row.campaign}</div>
              <div className="mt-1 text-[10px] leading-4 text-[#11100d]/54">{row.service} / CPL {row.cpl} / booked {row.booked}</div>
              <div className="text-[10px] leading-4 text-[#11100d]/54">arrived {row.arrived} / converted {row.converted}</div>
              <div className="text-[10px] leading-4 text-[#11100d]/58">decision: {row.decision}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function EvidenceNode({ node, dark = false, index = 0 }) {
  return (
    <div className={`min-w-0 border px-1.5 py-1.5 ${
      dark
        ? "border-[#fffaf1]/14 bg-[#fffaf1]/5 text-[#fffaf1]"
        : "border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]"
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div className={`break-words text-[9px] font-medium leading-3 ${dark ? "text-[#fffaf1]/82" : "text-[#11100d]/76"}`}>{node.title}</div>
        <span className={`shrink-0 font-mono text-[9px] tabular-nums ${dark ? "text-[#fffaf1]/28" : "text-[#11100d]/28"}`}>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className={`mt-1 text-[8px] uppercase tracking-[0.12em] ${dark ? "text-[#fffaf1]/34" : "text-[#11100d]/34"}`}>match</div>
      <div className={`text-[9px] leading-3 ${dark ? "text-[#fffaf1]/58" : "text-[#11100d]/54"}`}>{node.match}</div>
      <div className={`mt-1 break-words font-mono text-[8px] leading-3 ${dark ? "text-[#fffaf1]/46" : "text-[#11100d]/44"}`}>{node.field}</div>
    </div>
  );
}

function EvidenceChain({ nodes = [], dark = false, columns = "sm:grid-cols-2 lg:grid-cols-4" }) {
  return (
    <div className={`grid grid-cols-1 gap-1.5 ${columns}`}>
      {nodes.map((node, index) => (
        <EvidenceNode key={`${node.title}-${node.field}`} node={node} dark={dark} index={index} />
      ))}
    </div>
  );
}

function ConfidenceRulePanel({ rules = [] }) {
  return (
    <aside className="bg-[#f7f1e7] p-2.5 sm:p-3">
      <Label className="mb-2">Tiered confidence lanes</Label>
      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div key={rule.level} className="grid grid-cols-[8px_1fr] border border-[#11100d]/8 bg-[#fffaf1]">
            <span className={`h-full min-h-16 ${rule.level === "Review" ? "bg-[#c7b2ff]" : "bg-[#b6f3d4]"}`} aria-hidden="true" />
            <div className="p-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#11100d]/48">{rule.level}</span>
                <span className="font-mono text-[10px] text-[#11100d]/28">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-1 text-[11px] leading-5 text-[#11100d]/60">{rule.rule}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function AttributionInvestigationBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <div className="border-b border-[#11100d]/10 bg-[#151410] p-2.5 text-[#fffaf1] sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[9px] uppercase tracking-[0.16em] text-[#fffaf1]/42">Attribution investigation board</div>
            <div className="mt-1 font-mono text-[13px] text-[#fffaf1]/78">campaign source / lead record / outcome evidence</div>
          </div>
          <Tag dark color={LAVENDER}>manual review branch preserved</Tag>
        </div>
        <div className="mt-2 overflow-x-auto pb-1">
          <EvidenceChain nodes={body.evidenceChain} dark columns="sm:grid-cols-4 xl:grid-cols-8" />
        </div>
      </div>

      <section className="grid grid-cols-1 border-b border-[#11100d]/10 md:grid-cols-4">
        {body.matchChecks.map((check) => (
          <div key={check.label} className="border-b border-[#11100d]/10 p-2.5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <Label>{check.label}</Label>
            <div className="mt-1.5 text-[12px] leading-5 text-[#11100d]/64">{check.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3 border-b border-[#11100d]/10 p-2.5 sm:p-3 lg:border-b-0 lg:border-r">
          <section className="border border-[#11100d]/10 bg-[#fffaf1]">
            <div className="flex items-center justify-between gap-3 border-b border-[#11100d]/10 bg-[#f7f1e7] px-3 py-2">
              <Label>Clean path</Label>
              <Tag>confidence high</Tag>
            </div>
            <div className="overflow-x-auto p-2.5 sm:p-3">
              <EvidenceChain nodes={body.evidenceChain.slice(0, 6)} columns="sm:grid-cols-3 xl:grid-cols-6" />
            </div>
          </section>

          <section className="relative border border-[#11100d]/10 bg-[#fffaf1]">
            <div className="flex items-center justify-between gap-3 border-b border-[#11100d]/10 bg-[#f7f1e7] px-3 py-2">
              <Label>Unresolved branch</Label>
              <Tag color={LAVENDER}>confidence review</Tag>
            </div>
            <div className="hidden h-6 w-px bg-[#11100d]/16 md:absolute md:left-10 md:top-[-24px] md:block" aria-hidden="true" />
            <div className="overflow-x-auto p-2.5 sm:p-3">
              <EvidenceChain nodes={body.reviewBranch} columns="sm:grid-cols-4" />
            </div>
          </section>
        </div>

        <ConfidenceRulePanel rules={body.confidenceRules} />
      </section>
    </div>
  );
}

function DecisionCommandCenterBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <div className="border-b border-[#11100d]/10 bg-[#151410] p-3 text-[#fffaf1]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[9px] uppercase tracking-[0.16em] text-[#fffaf1]/42">Growth ops command center</div>
            <div className="mt-1 font-mono text-[13px] text-[#fffaf1]/78">campaign decisions / revenue evidence / repair queue</div>
          </div>
          <div className="flex flex-wrap gap-1">
            {(body.decisionLegend ?? []).slice(0, 4).map((item) => (
              <Tag key={item} dark color={item === "scale" || item === "maintain" ? ACCENT : LAVENDER}>{item}</Tag>
            ))}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 border-b border-[#11100d]/10 sm:grid-cols-2 xl:grid-cols-4">
        {body.signalStrip.map((signal) => (
          <div key={signal.label} className="border-b border-[#11100d]/10 p-3 last:border-b-0 sm:border-r xl:border-b-0 xl:last:border-r-0">
            <div className="flex items-center gap-2">
              <Dot color={signal.label === "Can Scale" ? ACCENT : LAVENDER} />
              <div className="text-[10px] uppercase tracking-[0.13em] text-[#11100d]/42">{signal.label}</div>
            </div>
            <div className="mt-2 text-[12px] leading-5 text-[#11100d]/68">{signal.phrase}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[1fr_250px]">
        <div className="min-w-0 border-b border-[#11100d]/10 p-3 md:border-b-0 md:border-r">
          <div className="mb-2 flex items-center justify-between gap-3">
            <Label>Campaign decision queue</Label>
            <span className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/34">actions prioritized</span>
          </div>
          <div className="hidden md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[22%]" />
                <col className="w-[18%]" />
                <col className="w-[20%]" />
                <col className="w-[28%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead>
                <tr className="border-y border-[#11100d]/10 bg-[#f7f1e7]">
                  {["Campaign", "Issue", "Evidence", "Action", "Confidence"].map((heading) => (
                    <th key={heading} className={`px-2 py-2 text-[9px] font-normal uppercase tracking-[0.13em] ${
                      heading === "Action" ? "text-[#11100d]/64" : "text-[#11100d]/38"
                    }`}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.queue.map((row) => {
                  const lane = row.confidence === "High" ? "Maintain" : row.recommendedAction.toLowerCase().includes("scale") ? "Scale" : "Review";
                  return (
                    <tr key={row.campaign} className="border-b border-[#11100d]/7">
                      <td className="break-words px-2 py-2.5 align-top">
                        <span className="block text-[11px] text-[#11100d]/70">{row.campaign}</span>
                        <span className="mt-1 inline-flex items-center gap-1.5 border border-[#11100d]/8 bg-[#f7f1e7] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.08em] text-[#11100d]/46">
                          <Dot color={lane === "Maintain" ? ACCENT : LAVENDER} className="h-1 w-1" />{lane}
                        </span>
                      </td>
                      <td className="break-words px-2 py-2.5 align-top text-[11px] text-[#11100d]/58">{row.primaryIssue}</td>
                      <td className="break-words px-2 py-2.5 align-top text-[11px] text-[#11100d]/48">{row.evidence}</td>
                      <td className="break-words px-2 py-2.5 align-top">
                        <div className="border-l-2 border-[#b6f3d4] bg-[#f7f1e7] px-2 py-1.5 text-[11px] font-medium leading-4 text-[#11100d]/78">
                          {row.recommendedAction}
                        </div>
                      </td>
                      <td className="px-2 py-2.5 align-top"><Tag color={row.confidence === "High" ? ACCENT : LAVENDER}>{row.confidence}</Tag></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5 md:hidden">
            {body.queue.map((row) => (
              <div key={row.campaign} className="border border-[#11100d]/8 bg-[#f7f1e7] p-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="break-words text-[12px] leading-5 text-[#11100d]/70">{row.campaign}</span>
                  <Tag color={row.confidence === "High" ? ACCENT : LAVENDER}>{row.confidence}</Tag>
                </div>
                <div className="mt-1 text-[10px] leading-4 text-[#11100d]/54">issue: {row.primaryIssue}</div>
                <div className="text-[10px] leading-4 text-[#11100d]/54">evidence: {row.evidence}</div>
                <div className="mt-2 border-l-2 border-[#b6f3d4] bg-[#fffaf1] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/66">
                  <span className="uppercase tracking-[0.11em] text-[#11100d]/38">action:</span> {row.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-3 bg-[#f7f1e7] p-3">
          <section>
            <Label className="mb-2">Operations backlog</Label>
            <div className="space-y-1.5">
              {body.operationsQueue.map((item, index) => (
                <div key={item} className="grid grid-cols-[28px_1fr] gap-2 border border-[#11100d]/8 bg-[#fffaf1] px-2 py-2">
                  <span className="font-mono text-[10px] tabular-nums text-[#11100d]/32">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[11px] leading-4 text-[#11100d]/60">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Label className="mb-2">Decision legend</Label>
            <div className="grid grid-cols-1 gap-1.5">
              {(body.decisionLegend ?? []).map((item) => (
                <div key={item} className="grid grid-cols-[5px_1fr] items-center gap-2 border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5">
                  <span className={`h-4 rounded-full ${item === "scale" || item === "maintain" ? "bg-[#b6f3d4]" : "bg-[#c7b2ff]"}`} aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#11100d]/48">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function ArtifactBody({ receiptBodyType, body }) {
  if (receiptBodyType === "airtableSchemaMap") return <SchemaInspectorBody body={body} />;
  if (receiptBodyType === "campaignFormulaSheet") return <FormulaWorksheetBody body={body} />;
  if (receiptBodyType === "attributionTrace") return <AttributionInvestigationBody body={body} />;
  if (receiptBodyType === "decisionQueueConsole") return <DecisionCommandCenterBody body={body} />;
  return null;
}

export default function MetaAirtableReceiptVisual({
  receiptNumber,
  title,
  type,
  status = "ready",
  privacyLabel = "sanitized reconstruction",
  claim,
  operationalSignal,
  receiptBodyType,
  preview,
  body,
  footerNote,
  displayMode = "full",
  ctaLabel = "Inspect receipt",
  ...legacyProps
}) {
  if (!receiptBodyType) {
    return (
      <MirrorReceiptVisual
        title={title}
        type={type}
        status={status}
        claim={claim}
        footerNote={footerNote}
        displayMode={displayMode}
        ctaLabel={ctaLabel}
        {...legacyProps}
      />
    );
  }

  if (displayMode === "compact") {
    return (
      <article className="w-full overflow-hidden rounded-[12px] border border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]">
        <div className="border-b border-[#11100d]/8 px-3.5 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/36">Receipt {receiptNumber}</span>
            <StatusPill>{status}</StatusPill>
          </div>
          <h3 className="mt-2 text-[14px] font-medium leading-5 text-[#11100d]">{title}</h3>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/42">{type}</div>
        </div>

        <div className="border-b border-[#11100d]/8 bg-[#f7f1e7]/58 px-3.5 py-3">
          <CompactPreview receiptBodyType={receiptBodyType} preview={preview} />
        </div>

        <div className="flex items-center justify-between gap-3 px-3.5 py-2">
          <span className="truncate text-[9px] uppercase tracking-[0.13em] text-[#11100d]/38">{privacyLabel}</span>
          <span className="shrink-0 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/48">{ctaLabel}</span>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]">
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
        {operationalSignal && (
          <div className="mt-3 border border-[#11100d]/8 bg-[#f7f1e7] px-3 py-2">
            <Label>Operational signal</Label>
            <div className="mt-1 text-[12px] leading-5 text-[#11100d]/64">{operationalSignal}</div>
          </div>
        )}
      </div>

      <div className="bg-[#f7f1e7]/38 p-2.5 sm:p-3">
        <ArtifactBody receiptBodyType={receiptBodyType} body={body} />
      </div>

      {footerNote && (
        <div className="border-t border-[#11100d]/8 px-4 py-3 text-[11px] leading-5 text-[#11100d]/54 sm:px-5">
          <span className="block text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">What this proves</span>
          <span className="mt-1 block">{footerNote}</span>
        </div>
      )}
    </article>
  );
}
