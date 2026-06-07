import React from "react";

const ACCENT = "#8be2ff";

function Dot({ className = "h-1.5 w-1.5", color = ACCENT }) {
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
    <span className="inline-flex shrink-0 items-center gap-1.5 border-l border-[#11100d]/10 pl-2 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/30">
      <Dot className="h-1 w-1" />
      {children}
    </span>
  );
}

function Connector({ dark = false, className = "" }) {
  return (
    <span className={`shrink-0 font-mono text-[10px] ${dark ? "text-[#f7f1e7]/26" : "text-[#11100d]/26"} ${className}`}>
      {"->"}
    </span>
  );
}

function SectionFrame({ label, children, dark = false, className = "" }) {
  return (
    <section className={`min-w-0 border ${dark ? "border-[#f7f1e7]/12 bg-[#151410] text-[#f7f1e7]" : "border-[#11100d]/8 bg-[#fffaf1] text-[#11100d]"} ${className}`}>
      {label && (
        <div className={`border-b px-3 py-2 ${dark ? "border-[#f7f1e7]/12" : "border-[#11100d]/7"}`}>
          <Label className={dark ? "text-[#f7f1e7]/42" : ""}>{label}</Label>
        </div>
      )}
      {children}
    </section>
  );
}

function MetaRail({ items = [], dark = false }) {
  if (items.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 border-y ${dark ? "border-[#f7f1e7]/12" : "border-[#11100d]/8"} sm:grid-cols-2 lg:grid-cols-4`}>
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={`border-b px-3 py-2 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0 ${
            dark
              ? "border-[#f7f1e7]/10 text-[#f7f1e7]/62"
              : "border-[#11100d]/8 text-[#11100d]/62"
          }`}
        >
          <div className={`text-[8px] uppercase tracking-[0.13em] ${dark ? "text-[#f7f1e7]/34" : "text-[#11100d]/34"}`}>
            {item.label}
          </div>
          <div className="mt-1 text-[10px] leading-4">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function LogLines({ lines = [], label }) {
  return (
    <div className="min-w-0 border-l border-[#f7f1e7]/18 pl-3 font-mono">
      <div className="mb-1.5 text-[8px] uppercase tracking-[0.12em] text-[#f7f1e7]/32">{label}</div>
      <div className="space-y-1">
        {lines.map((line) => (
          <div key={line} className="break-words text-[10px] leading-4 text-[#f7f1e7]/64">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineSteps({ steps = [], dark = false }) {
  return (
    <div className={`flex flex-col gap-1.5 sm:flex-row sm:items-center ${dark ? "text-[#f7f1e7]" : "text-[#11100d]"}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {index > 0 && <Connector dark={dark} className="hidden self-center sm:block" />}
          <div className={`min-w-0 flex-1 border-b px-1 py-1.5 font-mono text-[9px] leading-4 ${
            dark
              ? "border-[#f7f1e7]/18 text-[#f7f1e7]/62"
              : "border-[#11100d]/10 text-[#11100d]/58"
          }`}>
            <span className={dark ? "text-[#f7f1e7]/32" : "text-[#11100d]/32"}>{String(index + 1).padStart(2, "0")} / </span>
            {step}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function DecisionIndicator({ decision }) {
  const normalized = String(decision).toLowerCase();
  const color =
    normalized.includes("approved") || normalized === "route"
      ? ACCENT
      : normalized.includes("reject")
        ? "#ff9f9f"
        : normalized.includes("review") || normalized.includes("hold")
          ? "#ffd1a1"
          : "#c7b2ff";
  const label = normalized === "approved" ? "approved" : decision;

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] leading-4 text-[#11100d]/58">
      <Dot color={color} className="h-1.5 w-1.5" />
      {label}
    </span>
  );
}

function LedgerTable({ columns, rows, minWidth = 680 }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full border-collapse text-left" style={{ minWidth }}>
        <thead>
          <tr className="border-y border-[#11100d]/10 bg-[#f7f1e7]">
            {columns.map((column) => (
              <th key={column.key} className="px-2 py-2 text-[9px] font-normal uppercase tracking-[0.13em] text-[#11100d]/38">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#11100d]/8">
          {rows.map((row, index) => (
            <tr key={row.id ?? row.candidate ?? row.imageId ?? row.providerId ?? index}>
              {columns.map((column) => (
                <td
                  key={`${row.id ?? row.candidate ?? row.imageId ?? row.providerId ?? index}-${column.key}`}
                  className={`${column.mono ? "font-mono" : ""} px-2 py-2.5 align-top text-[11px] leading-4 ${column.strong ? "text-[#11100d]/74" : "text-[#11100d]/56"}`}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileLedger({ rows, titleKey, fields, decisionKey }) {
  return (
    <div className="space-y-2 md:hidden">
      {rows.map((row, index) => (
        <article key={row.id ?? row.candidate ?? row.imageId ?? row.providerId ?? index} className="border border-[#11100d]/8 bg-[#f7f1e7] p-2">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-[11px] leading-4 text-[#11100d]/68">{row[titleKey]}</span>
            {decisionKey && <DecisionIndicator decision={row[decisionKey]} />}
          </div>
          <div className="mt-2 grid grid-cols-1 gap-1.5">
            {fields.map((field) => (
              <div key={field.key} className="grid grid-cols-[94px_1fr] gap-2 text-[10px] leading-4 text-[#11100d]/54">
                <span className="uppercase tracking-[0.1em] text-[#11100d]/34">{field.label}</span>
                <span>{row[field.key]}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function MiniRows({ rows = [] }) {
  return (
    <div className="space-y-1">
      {rows.slice(0, 2).map((row, index) => (
        <div key={`${row}-${index}`} className="grid grid-cols-[22px_1fr] items-center gap-2 border-b border-[#11100d]/8 px-1 py-1.5">
          <span className="font-mono text-[8px] tabular-nums text-[#11100d]/34">{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate font-mono text-[9px] leading-3 text-[#11100d]/58">{row}</span>
        </div>
      ))}
    </div>
  );
}

function MiniTrace({ preview = {} }) {
  const steps = preview.steps ?? [];

  return (
    <div className="space-y-2">
      <div className="border border-[#11100d]/15 bg-[#151410] p-2 font-mono">
        <div className="grid grid-cols-[52px_1fr] gap-2 border-b border-[#f7f1e7]/12 pb-1.5 text-[8px] leading-3">
          <span className="uppercase tracking-[0.12em] text-[#f7f1e7]/60">request</span>
          <span className="truncate text-[#f7f1e7]">{preview.request ?? "GET /nppes/providers"}</span>
          <span className="uppercase tracking-[0.12em] text-[#f7f1e7]/60">response</span>
          <span className="truncate text-[#f7f1e7]/86">{preview.response ?? "candidate set"}</span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          {steps.slice(0, 4).map((step, index) => (
            <React.Fragment key={step}>
              {index > 0 && <span className="font-mono text-[8px] text-[#f7f1e7]/24">{"->"}</span>}
              <span className="truncate border-b border-[#f7f1e7]/12 px-0.5 py-1 text-[7px] uppercase tracking-[0.06em] text-[#f7f1e7]/62">
              {step}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <MiniRows rows={preview.rows} />
    </div>
  );
}

function MiniDecisionTree({ preview = {} }) {
  const branches = preview.branches ?? [];

  return (
    <div className="space-y-2">
      <div className="border border-[#11100d]/10 bg-[#fffaf1] px-2 py-1.5 font-mono text-[#11100d]">
        <div className="flex items-center justify-between gap-2 text-[7px] uppercase tracking-[0.1em] text-[#11100d]/34">
          <span>validation root</span>
          <span>r00</span>
        </div>
        <div className="mt-1 truncate text-center text-[9px] leading-3 text-[#11100d]/66">
          {preview.root ?? "provider candidate"}
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-1" aria-hidden="true">
          {[0, 1, 2].map((cue) => (
            <span key={cue} className={`h-px ${cue < branches.length ? "bg-[#11100d]/22" : "bg-[#11100d]/8"}`} />
          ))}
        </div>
      </div>
      <div className="space-y-1 border-l border-[#11100d]/12 pl-2">
        {branches.slice(0, 3).map((branch, index) => (
          <div key={branch} className="grid grid-cols-[32px_1fr] gap-1.5 text-[8px] leading-3">
            <span className="font-mono text-[#11100d]/30">r{String(index + 1).padStart(2, "0")}</span>
            <span className="truncate text-[#11100d]/58">{branch}</span>
          </div>
        ))}
      </div>
      <MiniRows rows={preview.rows} />
    </div>
  );
}

function MiniGate({ preview = {} }) {
  return (
    <div className="space-y-2">
      <div className="border border-[#11100d]/10 bg-[#151410] px-2 py-1.5 font-mono text-[9px] text-[#f7f1e7]/60">
        OpenCV detection {"->"} decision lane
      </div>
      <div className="grid grid-cols-4 border-y border-[#11100d]/8">
        {(preview.gates ?? []).slice(0, 4).map((gate) => (
          <div key={gate} className="border-r border-[#11100d]/8 px-1 py-1.5 text-center last:border-r-0">
            <Dot className="mx-auto h-1.5 w-1.5" color={gate === "Rejected" ? "#ff9f9f" : gate === "Manual Review" ? "#ffd1a1" : ACCENT} />
            <div className="mt-1 text-[8px] leading-3 text-[#11100d]/56">{gate}</div>
          </div>
        ))}
      </div>
      <MiniRows rows={preview.rows} />
    </div>
  );
}

function MiniFileTree({ preview = {} }) {
  return (
    <div className="grid grid-cols-[1fr_0.9fr] gap-2">
      <div className="border border-[#11100d]/10 bg-[#151410] p-2 font-mono text-[8px] leading-4 text-[#f7f1e7]">
        {(preview.tree ?? []).slice(0, 4).map((item, index) => (
          <div key={`${item}-${index}`} className={index > 0 ? "pl-3" : ""}>
            {index > 1 ? "- " : ""}{item}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {(preview.manifest ?? []).slice(0, 2).map((item, index) => (
          <div key={item} className="grid grid-cols-[18px_1fr] gap-1 border-b border-[#11100d]/8 px-1 py-1.5 text-[8px] leading-3 text-[#11100d]/52">
            <span className="font-mono text-[#11100d]/30">{String(index + 1).padStart(2, "0")}</span>
            <span className="truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactPreview({ receiptBodyType, preview }) {
  if (receiptBodyType === "providerPullTrace") return <MiniTrace preview={preview} />;
  if (receiptBodyType === "imageSourcingPipeline") return <MiniDecisionTree preview={preview} />;
  if (receiptBodyType === "faceValidationGate") return <MiniGate preview={preview} />;
  if (receiptBodyType === "assetHandoffMap") return <MiniFileTree preview={preview} />;
  return null;
}

function ProviderPullTraceBody({ body }) {
  return (
    <div className="space-y-3">
      <SectionFrame dark>
        <div className="border-b border-[#f7f1e7]/12 px-3 py-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-mono text-[12px] leading-4 text-[#f7f1e7]/78">provider_pull.trace</div>
              <div className="mt-1 font-mono text-[9px] leading-4 text-[#f7f1e7]/38">sanitized API extraction packet</div>
            </div>
            <span className="border border-[#f7f1e7]/12 px-2 py-1 font-mono text-[9px] text-[#f7f1e7]/48">queued</span>
          </div>
        </div>
        <div className="p-3">
          <MetaRail items={body.provenance} dark />
          <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">
            <LogLines label="request" lines={body.requestLog} />
            <LogLines label="response" lines={body.responseLog} />
          </div>
          <div className="mt-3">
            <PipelineSteps steps={body.flow} dark />
          </div>
        </div>
      </SectionFrame>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[0.86fr_1.14fr]">
        <SectionFrame label="Normalized field ledger">
          <div className="hidden md:block">
            <div className="grid grid-cols-[0.7fr_1fr_1fr] gap-2 border-b border-[#11100d]/8 bg-[#f7f1e7] px-3 py-2 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/36">
              <span>field</span>
              <span>captured as</span>
              <span>source note</span>
            </div>
            <div className="divide-y divide-[#11100d]/8 px-3">
              {body.normalizedLedger.map((field) => (
                <div key={field.field} className="grid grid-cols-[0.7fr_1fr_1fr] gap-2 py-1.5">
                  <div className="font-mono text-[9px] leading-4 text-[#11100d]/68">{field.field}</div>
                  <div className="text-[9px] leading-4 text-[#11100d]/54">{field.capturedAs}</div>
                  <div className="text-[8px] leading-4 text-[#11100d]/38">{field.sourceNote}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1.5 p-3 md:hidden">
            {body.normalizedLedger.map((field) => (
              <div key={field.field} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
                <div className="font-mono text-[10px] text-[#11100d]/68">{field.field}</div>
                <div className="mt-1 text-[10px] leading-4 text-[#11100d]/54">{field.capturedAs}</div>
              </div>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame label="Profile candidate queue">
          <div className="p-3">
            <div className="hidden divide-y divide-[#11100d]/8 border-y border-[#11100d]/8 md:block">
              {body.queue.map((row) => (
                <div key={row.candidate} className="grid grid-cols-[0.8fr_0.65fr_1fr_0.85fr_1.25fr] gap-2 px-2 py-2 text-[10px] leading-4">
                  <span className="font-mono text-[#11100d]/72">{row.candidate}</span>
                  <span className="text-[#11100d]/54">{row.npiStatus}</span>
                  <span className="text-[#11100d]/54">{row.taxonomyMatch}</span>
                  <span className="text-[#11100d]/48">{row.provenance}</span>
                  <span className="text-[#11100d]/66">{row.profileStatus}</span>
                </div>
              ))}
            </div>
            <MobileLedger
              rows={body.queue}
              titleKey="candidate"
              fields={[
                { key: "npiStatus", label: "NPI" },
                { key: "taxonomyMatch", label: "Taxonomy" },
                { key: "provenance", label: "Source" },
                { key: "profileStatus", label: "Status" }
              ]}
            />
          </div>
        </SectionFrame>
      </section>
    </div>
  );
}

function RouteBranch({ branch, index }) {
  return (
    <article className="relative border-l border-[#11100d]/14 pl-3">
      <div className="flex items-start justify-between gap-3">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#11100d]/34">route {String(index + 1).padStart(2, "0")}</div>
        <DecisionIndicator decision={branch.decision} />
      </div>
      <h4 className="mt-1.5 text-[11px] font-medium leading-4 text-[#11100d]/76">{branch.label}</h4>
      <p className="mt-1.5 text-[10px] leading-4 text-[#11100d]/58">{branch.result}</p>
      <div className="mt-1.5 font-mono text-[9px] leading-4 text-[#11100d]/42">
        next: {branch.next}
      </div>
    </article>
  );
}

function ImageSourcingPipelineBody({ body }) {
  const queueColumns = [
    { key: "assetId", label: "Asset ID", mono: true, strong: true },
    { key: "sourceType", label: "Source type" },
    { key: "confidence", label: "Confidence" },
    { key: "decision", label: "Decision", render: (row) => <DecisionIndicator decision={row.decision} /> },
    { key: "nextStep", label: "Next step", strong: true }
  ];

  return (
    <div className="space-y-3">
      <SectionFrame label="Asset sourcing branch map">
        <div className="p-3">
          <div className="border border-[#11100d]/10 bg-[#151410] px-3 py-2 text-[#f7f1e7]">
            <div className="font-mono text-[12px] leading-5 text-[#f7f1e7]/74">{body.root}</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/34">sanitized source candidate</div>
          </div>
          <div className="mt-2">
            <PipelineSteps steps={body.flow} />
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {body.branches.map((branch, index) => (
              <RouteBranch key={branch.label} branch={branch} index={index} />
            ))}
          </div>
        </div>
      </SectionFrame>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[0.64fr_1.36fr]">
        <SectionFrame label="Decision criteria rail">
          <div className="grid grid-cols-1 divide-y divide-[#11100d]/8 p-3 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
            {body.sourcingSignals.map((signal) => (
              <div key={signal} className="grid grid-cols-[8px_1fr] gap-2 py-1.5 first:pt-0 last:pb-0">
                <span className="mt-1 h-3 bg-[#8be2ff]" aria-hidden="true" />
                <span className="text-[11px] leading-4 text-[#11100d]/58">{signal}</span>
              </div>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame label="Asset decision queue">
          <div className="p-3">
            <LedgerTable columns={queueColumns} rows={body.queue} minWidth={660} />
            <MobileLedger
              rows={body.queue}
              titleKey="assetId"
              decisionKey="decision"
              fields={[
                { key: "sourceType", label: "Source" },
                { key: "confidence", label: "Confidence" },
                { key: "nextStep", label: "Next" }
              ]}
            />
          </div>
        </SectionFrame>
      </section>
    </div>
  );
}

function FaceValidationGateBody({ body }) {
  const validationColumns = [
    { key: "imageId", label: "Image ID", mono: true, strong: true },
    { key: "faceDetected", label: "Face" },
    { key: "quality", label: "Quality" },
    { key: "decision", label: "Decision", render: (row) => <DecisionIndicator decision={row.decision} /> },
    { key: "reason", label: "Evidence field", strong: true }
  ];

  return (
    <div className="space-y-3">
      <SectionFrame dark>
        <div className="grid grid-cols-1 border-b border-[#f7f1e7]/12 md:grid-cols-[1fr_1.1fr]">
          <div className="border-b border-[#f7f1e7]/12 p-3 md:border-b-0 md:border-r">
            <div className="font-mono text-[12px] leading-5 text-[#f7f1e7]/76">{body.inspection.check}</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]/34">computer vision quality gate</div>
          </div>
          <MetaRail items={body.inspection.rail} dark />
        </div>
        <div className="p-3">
          <PipelineSteps steps={body.flow} dark />
        </div>
      </SectionFrame>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[0.74fr_1.26fr]">
        <SectionFrame label="QC checks">
          <div className="grid grid-cols-1 divide-y divide-[#11100d]/8 p-3 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
            {body.checks.map((check) => (
              <div key={check} className="grid grid-cols-[8px_1fr] gap-2 py-2 first:pt-0 last:pb-0">
                <span className="mt-1 h-3 bg-[#8be2ff]" aria-hidden="true" />
                <span className="text-[11px] leading-4 text-[#11100d]/58">{check}</span>
              </div>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame label="Decision lanes">
          <div className="grid grid-cols-1 border-y border-[#11100d]/8 sm:grid-cols-2 xl:grid-cols-4">
            {body.destinations.map((destination) => (
              <article key={destination.label} className="border-b border-[#11100d]/8 px-3 py-3 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0">
                <div className="flex items-center justify-between gap-2 border-b border-[#11100d]/8 pb-2">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#11100d]/44">{destination.label}</div>
                  <Dot color={destination.label === "Rejected" ? "#ff9f9f" : destination.label === "Manual Review" ? "#ffd1a1" : ACCENT} />
                </div>
                <div className="mt-2 space-y-1">
                  {destination.items.map((item) => (
                    <div key={item} className="font-mono text-[10px] leading-4 text-[#11100d]/58">
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionFrame>
      </section>

      <SectionFrame label="Validation ledger">
        <div className="p-3">
          <LedgerTable columns={validationColumns} rows={body.table} minWidth={720} />
          <MobileLedger
            rows={body.table}
            titleKey="imageId"
            decisionKey="decision"
            fields={[
              { key: "faceDetected", label: "Face" },
              { key: "quality", label: "Quality" },
              { key: "reason", label: "Evidence" }
            ]}
          />
        </div>
      </SectionFrame>
    </div>
  );
}

function TreeNode({ node, depth = 0 }) {
  if (typeof node === "string") {
    return (
      <div className="whitespace-nowrap font-mono text-[9px] leading-4 text-[#f7f1e7]/58" style={{ paddingLeft: `${depth * 12}px` }}>
        {depth > 0 ? "- " : ""}{node}
      </div>
    );
  }

  return (
    <div>
      <div className="whitespace-nowrap font-mono text-[9px] leading-4 text-[#f7f1e7]/76" style={{ paddingLeft: `${depth * 12}px` }}>
        {node.name}
      </div>
      {(node.children ?? []).map((child) => (
        <TreeNode key={typeof child === "string" ? child : child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function AssetHandoffMapBody({ body }) {
  const manifestColumns = [
    { key: "providerId", label: "Provider ID", mono: true, strong: true },
    { key: "profileData", label: "Profile data" },
    { key: "imageStatus", label: "Image status" },
    { key: "sourceNotes", label: "Source notes" },
    { key: "validationStatus", label: "Validation" },
    { key: "publishState", label: "Publish state", strong: true }
  ];

  return (
    <div className="space-y-3">
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionFrame dark label="Export file tree">
          <div className="p-3">
            <div className="overflow-x-auto border border-[#f7f1e7]/12 bg-[#211f1a] p-3">
              {body.folderTree.map((node) => (
                <TreeNode key={node.name} node={node} />
              ))}
            </div>
          </div>
        </SectionFrame>

        <SectionFrame label="Publishing manifest">
          <div className="p-3">
            <div className="hidden md:block">
              <div className="grid grid-cols-[0.9fr_0.72fr_1fr_0.72fr_0.75fr_0.95fr] gap-2 border-y border-[#11100d]/10 bg-[#f7f1e7] px-2 py-2 text-[8px] uppercase tracking-[0.11em] text-[#11100d]/38">
                {manifestColumns.map((column) => (
                  <span key={column.key}>{column.label}</span>
                ))}
              </div>
              <div className="divide-y divide-[#11100d]/8">
                {body.manifestRows.map((row) => (
                  <div key={row.providerId} className="grid grid-cols-[0.9fr_0.72fr_1fr_0.72fr_0.75fr_0.95fr] gap-2 px-2 py-2 text-[10px] leading-4">
                    <span className="font-mono text-[#11100d]/72">{row.providerId}</span>
                    <span className="text-[#11100d]/58">{row.profileData}</span>
                    <span className="text-[#11100d]/58">{row.imageStatus}</span>
                    <span className="text-[#11100d]/52">{row.sourceNotes}</span>
                    <span className="text-[#11100d]/58">{row.validationStatus}</span>
                    <span className="text-[#11100d]/66">{row.publishState}</span>
                  </div>
                ))}
              </div>
            </div>
            <MobileLedger
              rows={body.manifestRows}
              titleKey="providerId"
              fields={[
                { key: "profileData", label: "Profile" },
                { key: "imageStatus", label: "Image" },
                { key: "sourceNotes", label: "Notes" },
                { key: "validationStatus", label: "Validation" },
                { key: "publishState", label: "Publish" }
              ]}
            />
            <div className="mt-3 border-t border-[#11100d]/8 pt-3">
              <Label className="mb-2">Publishing states</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-y border-[#11100d]/8 py-2">
                {body.publishingStates.map((state, index) => (
                  <span key={state} className="inline-flex items-center gap-2 text-[10px] leading-4 text-[#11100d]/58">
                    <span className="font-mono text-[9px] tabular-nums text-[#11100d]/34">{String(index + 1).padStart(2, "0")}</span>
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionFrame>
      </section>
    </div>
  );
}

function ArtifactBody({ receiptBodyType, body }) {
  if (receiptBodyType === "providerPullTrace") return <ProviderPullTraceBody body={body} />;
  if (receiptBodyType === "imageSourcingPipeline") return <ImageSourcingPipelineBody body={body} />;
  if (receiptBodyType === "faceValidationGate") return <FaceValidationGateBody body={body} />;
  if (receiptBodyType === "assetHandoffMap") return <AssetHandoffMapBody body={body} />;
  return null;
}

export default function SnipReceiptVisual({
  receiptNumber,
  title,
  type,
  status = "ready",
  privacyLabel = "sanitized reconstruction",
  whatItProves,
  operationalSignal,
  receiptBodyType,
  preview,
  body,
  footerNote,
  displayMode = "full",
  ctaLabel = "Inspect receipt"
}) {
  if (displayMode === "compact") {
    return (
      <article className="w-full overflow-hidden rounded-[8px] border border-l-2 border-[#11100d]/10 border-l-[#8be2ff]/80 bg-[#fffaf1] text-[#11100d]">
        <div className="border-b border-[#11100d]/8 px-3.5 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/36">Receipt {receiptNumber}</span>
            <StatusPill>{status}</StatusPill>
          </div>
          <h3 className="mt-2 text-[14px] font-medium leading-5 text-[#11100d]">{title}</h3>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/42">{type}</div>
        </div>

        <div className="border-b border-[#11100d]/8 bg-[#fffaf1] px-3.5 py-3">
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
    <article className="w-full text-[#11100d]">
      <div className="border-b border-[#11100d]/10 px-4 py-3.5 sm:px-5">
        <p className="text-[13px] leading-6 text-[#11100d]/68">{whatItProves}</p>
      </div>

      <div className="bg-[#f7f1e7]/30 p-2.5 sm:p-3">
        <ArtifactBody receiptBodyType={receiptBodyType} body={body} />
      </div>

      <div className="border-t border-[#11100d]/10 px-4 py-3 text-[11px] leading-5 text-[#11100d]/54 sm:px-5">
        {footerNote && (
          <>
          <span className="block text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">Evidence note</span>
          <span className="mt-1 block">{footerNote}</span>
          </>
        )}
        <div className={`${footerNote ? "mt-3 " : ""}flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/34`}>
          <span>{privacyLabel}</span>
        </div>
      </div>
    </article>
  );
}
