import React from "react";

const ACCENT = "#9fe7ff";

function Dot({ className = "h-1.5 w-1.5" }) {
  return <span className={`${className} shrink-0 rounded-full bg-[#9fe7ff]`} aria-hidden="true" />;
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

function Tag({ children, className = "" }) {
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

function Arrow() {
  return <span className="text-[10px] leading-none text-[#11100d]/26">-&gt;</span>;
}

function DetailStrip({ details = [], dark = false }) {
  if (details.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4 ${dark ? "text-[#f7f1e7]" : "text-[#11100d]"}`}>
      {details.map((detail) => (
        <div
          key={`${detail.label}-${detail.value}`}
          className={`rounded-[8px] border px-2 py-1.5 ${
            dark
              ? "border-[#f7f1e7]/12 bg-[#211f1a] text-[#f7f1e7]/60"
              : "border-[#11100d]/8 bg-[#f7f1e7] text-[#11100d]/58"
          }`}
        >
          <div className={`text-[8px] uppercase tracking-[0.12em] ${dark ? "text-[#f7f1e7]/34" : "text-[#11100d]/34"}`}>
            {detail.label}
          </div>
          <div className="mt-0.5 text-[10px] leading-4">{detail.value}</div>
        </div>
      ))}
    </div>
  );
}

function MiniRows({ rows = [] }) {
  return (
    <div className="space-y-1.5">
      {rows.slice(0, 4).map((row, index) => (
        <div key={`${row}-${index}`} className="grid grid-cols-[22px_1fr] items-center gap-2 rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5">
          <span className="text-[9px] tabular-nums text-[#11100d]/34">{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate text-[10px] leading-4 text-[#11100d]/60">{row}</span>
        </div>
      ))}
    </div>
  );
}

function MiniTrace({ preview }) {
  return (
    <div className="space-y-2">
      <div className="rounded-[9px] border border-[#11100d]/15 bg-[#151410] p-2 font-mono">
        <div className="flex items-center justify-between gap-2 border-b border-[#f7f1e7]/12 pb-1.5">
          <span className="text-[9px] text-[#f7f1e7]/64">GET /nppes/providers</span>
          <Dot />
        </div>
        <div className="mt-2 flex items-center gap-1 overflow-hidden">
          {preview.steps.map((step, index) => (
            <React.Fragment key={step}>
              {index > 0 && <span className="shrink-0 text-[9px] text-[#f7f1e7]/24">-&gt;</span>}
              <span className="min-w-0 rounded-[6px] border border-[#f7f1e7]/10 bg-[#211f1a] px-1.5 py-1 text-[8px] leading-3 text-[#f7f1e7]/56">
                {step}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {(preview.meta ?? []).map((item) => (
          <div key={item} className="rounded-[6px] border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1 text-[8px] leading-3 text-[#11100d]/46">
            {item}
          </div>
        ))}
      </div>
      <MiniRows rows={preview.rows} />
    </div>
  );
}

function MiniDecisionTree({ preview }) {
  return (
    <div className="space-y-2">
      <div className="mx-auto w-[70%] rounded-[8px] border border-[#11100d]/10 bg-[#fffaf1] px-2 py-1.5 text-center text-[10px] text-[#11100d]/62">
        {preview.root}
      </div>
      <div className="mx-auto h-3 w-px bg-[#11100d]/12" />
      <div className="grid grid-cols-3 gap-1.5">
        {preview.branches.map((branch, index) => (
          <div key={branch} className="relative rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-2 text-center text-[9px] leading-3 text-[#11100d]/54">
            <span className="absolute left-1/2 top-[-7px] h-[7px] w-px -translate-x-1/2 bg-[#11100d]/12" aria-hidden="true" />
            <span className="block font-mono text-[8px] text-[#11100d]/30">{String(index + 1).padStart(2, "0")}</span>
            {branch}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {(preview.meta ?? []).map((item) => (
          <div key={item} className="rounded-[6px] border border-[#11100d]/8 bg-[#11100d]/[0.025] px-1.5 py-1 text-[8px] leading-3 text-[#11100d]/42">
            {item}
          </div>
        ))}
      </div>
      <MiniRows rows={preview.rows} />
    </div>
  );
}

function MiniGate({ preview }) {
  return (
    <div className="space-y-2">
      <div className="rounded-[8px] border border-[#11100d]/10 bg-[#fffaf1] px-2 py-1.5 text-center font-mono text-[9px] text-[#11100d]/50">
        OpenCV quality gate
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {preview.gates.map((gate) => (
          <div key={gate} className="min-h-[52px] rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-2 text-center">
            <Dot className="mx-auto h-1.5 w-1.5" />
            <div className="mt-1 text-[9px] leading-3 text-[#11100d]/56">{gate}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {(preview.meta ?? []).map((item) => (
          <div key={item} className="rounded-[6px] border border-[#11100d]/8 bg-[#11100d]/[0.025] px-1.5 py-1 text-[8px] leading-3 text-[#11100d]/42">
            {item}
          </div>
        ))}
      </div>
      <MiniRows rows={preview.rows} />
    </div>
  );
}

function MiniFileTree({ preview }) {
  return (
    <div className="grid grid-cols-[1fr_0.8fr] gap-2">
      <div className="rounded-[9px] border border-[#11100d]/10 bg-[#fffaf1] p-2 font-mono text-[9px] leading-4 text-[#11100d]/58">
        {preview.tree.map((item, index) => (
          <div key={item} className={index > 0 ? "pl-3" : ""}>
            {index > 1 ? "- " : ""}{item}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {(preview.meta ?? []).map((item) => (
          <div key={item} className="rounded-[6px] border border-[#11100d]/8 bg-[#11100d]/[0.025] px-1.5 py-1 text-[8px] leading-3 text-[#11100d]/42">
            {item}
          </div>
        ))}
        {preview.states.map((state) => (
          <div key={state} className="rounded-[6px] border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1 text-[9px] leading-3 text-[#11100d]/52">
            {state}
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

function FlowStrip({ steps, dark = false }) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-[12px] border p-2 sm:flex-row sm:items-center ${
      dark ? "border-[#f7f1e7]/12 bg-[#151410] text-[#f7f1e7]" : "border-[#11100d]/10 bg-[#f7f1e7] text-[#11100d]"
    }`}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {index > 0 && (
            <span className={`hidden text-[10px] sm:inline ${dark ? "text-[#f7f1e7]/28" : "text-[#11100d]/26"}`}>-&gt;</span>
          )}
          <div className={`rounded-[8px] border px-2 py-1.5 text-[10px] leading-4 ${
            dark ? "border-[#f7f1e7]/12 bg-[#211f1a] text-[#f7f1e7]/64" : "border-[#11100d]/8 bg-[#fffaf1] text-[#11100d]/62"
          }`}>
            <span className="sm:hidden">{String(index + 1).padStart(2, "0")} / </span>
            {step}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function ProviderPullTraceBody({ body }) {
  return (
    <div className="space-y-3">
      <section className="rounded-[14px] border border-[#11100d]/15 bg-[#151410] p-3 text-[#f7f1e7]">
        <div className="mb-2 flex items-center justify-between gap-3 border-b border-[#f7f1e7]/12 pb-2">
          <div>
            <div className="font-mono text-[11px] leading-4 text-[#f7f1e7]/76">API extraction trace</div>
            <div className="mt-0.5 font-mono text-[9px] leading-4 text-[#f7f1e7]/38">GET /nppes/providers?taxonomy=urology</div>
          </div>
          <span className="rounded-full border border-[#f7f1e7]/12 px-2 py-0.5 font-mono text-[9px] text-[#f7f1e7]/46">
            queued
          </span>
        </div>
        <FlowStrip steps={body.flow} dark />
        <div className="mt-2">
          <DetailStrip details={body.operationalDetails} dark />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-[0.85fr_1.15fr]">
        <Panel label="Query inputs">
          <div className="space-y-1.5">
            {body.queryInputs.map((input) => (
              <div key={input.label} className="grid grid-cols-[82px_1fr] gap-2 rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 font-mono text-[10px] leading-4">
                <span className="text-[#11100d]/38">{input.label}</span>
                <span className="text-[#11100d]/62">{input.value}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel label="Normalized provider fields">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {body.normalizedFields.map((field) => (
              <div key={field} className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/58">
                {field}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel label="Profile candidate queue">
        <div className="hidden overflow-x-auto sm:block">
          <table className="min-w-[620px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#11100d]/10">
                {['Candidate', 'NPI status', 'Taxonomy match', 'Location', 'Profile status'].map((heading) => (
                  <th key={heading} className="px-2 py-2 text-[9px] font-normal uppercase tracking-[0.13em] text-[#11100d]/38">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#11100d]/8">
              {body.queue.map((row) => (
                <tr key={row.candidate}>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/70">{row.candidate}</td>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/54">{row.npiStatus}</td>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/54">{row.taxonomyMatch}</td>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/54">{row.location}</td>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/58">{row.profileStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 sm:hidden">
          {body.queue.map((row) => (
            <div key={row.candidate} className="rounded-[9px] border border-[#11100d]/8 bg-[#f7f1e7] p-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-[#11100d]/70">{row.candidate}</span>
                <Tag>{row.npiStatus}</Tag>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] leading-4 text-[#11100d]/52">
                <span>{row.taxonomyMatch}</span>
                <span>{row.location}</span>
                <span className="col-span-2">{row.profileStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function AbstractImageBox({ label }) {
  return (
    <div className="rounded-[10px] border border-[#11100d]/10 bg-[#f7f1e7] p-2">
      <div className="aspect-[4/3] rounded-[8px] border border-[#11100d]/10 bg-[#fffaf1] p-2">
        <div className="h-2 w-1/2 rounded-full bg-[#11100d]/10" />
        <div className="mt-8 h-10 rounded-[7px] border border-[#11100d]/8 bg-[#11100d]/[0.025]" />
      </div>
      <div className="mt-2 text-center text-[10px] leading-4 text-[#11100d]/50">{label}</div>
    </div>
  );
}

function ImageSourcingPipelineBody({ body }) {
  return (
    <div className="space-y-3">
      <section className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <Label>Sourcing decision tree</Label>
          <Tag>validation pending</Tag>
        </div>
        <div className="mx-auto w-full max-w-[360px] rounded-[10px] border border-[#11100d]/10 bg-[#f7f1e7] px-3 py-2 text-center text-[12px] text-[#11100d]/68">
          Provider candidate
        </div>
        <div className="mx-auto h-5 w-px bg-[#11100d]/12" aria-hidden="true" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {body.branches.map((branch, index) => (
            <div key={branch.label} className="relative rounded-[11px] border border-[#11100d]/10 bg-[#f7f1e7] p-3">
              <span className="absolute left-1/2 top-[-9px] hidden h-[9px] w-px -translate-x-1/2 bg-[#11100d]/12 sm:block" aria-hidden="true" />
              <div className="font-mono text-[9px] tabular-nums text-[#11100d]/34">branch {String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#11100d]/40">{branch.label}</div>
              <p className="mt-2 text-[12px] leading-5 text-[#11100d]/64">{branch.result}</p>
              <div className="mt-3 flex items-center gap-2 border-t border-[#11100d]/8 pt-2 text-[10px] leading-4 text-[#11100d]/46">
                <Dot />
                {branch.next}
              </div>
            </div>
          ))}
        </div>
      </section>

      <DetailStrip details={body.operationalDetails} />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-[0.8fr_1.2fr]">
        <Panel label="Sanitized image candidates">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <AbstractImageBox label="headshot candidate" />
            <AbstractImageBox label="clinic fallback" />
            <AbstractImageBox label="validation pending" />
          </div>
        </Panel>

        <Panel label="Flow checkpoints">
          <FlowStrip steps={body.flow} />
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-[0.85fr_1.15fr]">
        <Panel label="Sourcing signals">
          <div className="grid grid-cols-2 gap-1.5">
            {body.sourcingSignals.map((signal) => (
              <div key={signal} className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/58">
                {signal}
              </div>
            ))}
          </div>
        </Panel>

        <Panel label="Mini asset queue">
          <div className="space-y-1.5">
            {body.queue.map((row) => (
              <div key={row.asset} className="grid grid-cols-2 items-center gap-2 rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/56 sm:grid-cols-[1fr_0.9fr_0.65fr_1fr]">
                <span className="text-[#11100d]/70">{row.asset}</span>
                <span>{row.sourceType}</span>
                <span>{row.confidence}</span>
                <span>{row.nextStep}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function DecisionIndicator({ decision }) {
  const label = decision === "approved" ? "pass" : decision === "manual review" ? "review" : decision;
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-[#11100d]/52">
      <Dot />
      {label}
    </span>
  );
}

function FaceValidationGateBody({ body }) {
  return (
    <div className="space-y-3">
      <section className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <Label>Quality gate lanes</Label>
          <Tag>OpenCV checkpoint</Tag>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {body.destinations.map((destination) => (
            <div key={destination.label} className="min-h-[132px] rounded-[11px] border border-[#11100d]/10 bg-[#f7f1e7] p-3">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/42">
                <Dot />
                {destination.label}
              </div>
              <div className="mt-3 space-y-1.5">
                {destination.items.map((item) => (
                  <div key={item} className="rounded-[7px] border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5 font-mono text-[10px] text-[#11100d]/58">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <DetailStrip details={body.operationalDetails} />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-[0.8fr_1.2fr]">
        <Panel label="Validation checks">
          <div className="space-y-1.5">
            {body.checks.map((check) => (
              <div key={check} className="flex items-center gap-2 rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/58">
                <Dot />
                {check}
              </div>
            ))}
          </div>
        </Panel>

        <Panel label="Detection flow">
          <FlowStrip steps={body.flow} />
        </Panel>
      </div>

      <Panel label="Validation table">
        <div className="hidden overflow-x-auto sm:block">
          <table className="min-w-[640px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#11100d]/10">
                {['Image ID', 'Face detected', 'Quality', 'Decision', 'Reason'].map((heading) => (
                  <th key={heading} className="px-2 py-2 text-[9px] font-normal uppercase tracking-[0.13em] text-[#11100d]/38">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#11100d]/8">
              {body.table.map((row) => (
                <tr key={row.imageId}>
                  <td className="px-2 py-2.5 font-mono text-[11px] text-[#11100d]/66">{row.imageId}</td>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/54">{row.faceDetected}</td>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/54">{row.quality}</td>
                  <td className="px-2 py-2.5"><DecisionIndicator decision={row.decision} /></td>
                  <td className="px-2 py-2.5 text-[11px] text-[#11100d]/58">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 sm:hidden">
          {body.table.map((row) => (
            <div key={row.imageId} className="rounded-[9px] border border-[#11100d]/8 bg-[#f7f1e7] p-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-[#11100d]/66">{row.imageId}</span>
                <DecisionIndicator decision={row.decision} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] leading-4 text-[#11100d]/52">
                <span>face: {row.faceDetected}</span>
                <span>quality: {row.quality}</span>
                <span className="col-span-2">{row.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function TreeNode({ node, depth = 0 }) {
  if (typeof node === "string") {
    return (
      <div className="break-words font-mono text-[10px] leading-5 text-[#11100d]/56" style={{ paddingLeft: `${depth * 14}px` }}>
        - {node}
      </div>
    );
  }

  return (
    <div>
      <div className="break-words font-mono text-[10px] leading-5 text-[#11100d]/70" style={{ paddingLeft: `${depth * 14}px` }}>
        {node.name}
      </div>
      {(node.children ?? []).map((child) => (
        <TreeNode key={typeof child === "string" ? child : child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function AssetHandoffMapBody({ body }) {
  return (
    <div className="space-y-3">
      <section className="grid grid-cols-1 gap-2 rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Label className="mb-2">Folder tree</Label>
          <div className="rounded-[10px] border border-[#11100d]/8 bg-[#f7f1e7] p-3">
            {body.folderTree.map((node) => (
              <TreeNode key={node.name} node={node} />
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2">Publishing handoff map</Label>
          <div className="space-y-2">
            {body.publishingStates.map((state, index) => (
              <div key={state} className="flex items-center justify-between gap-3 rounded-[9px] border border-[#11100d]/8 bg-[#f7f1e7] px-2.5 py-2">
                <span className="text-[11px] leading-4 text-[#11100d]/62">{state}</span>
                <span className="font-mono text-[10px] tabular-nums text-[#11100d]/34">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailStrip details={body.operationalDetails} />

      <Panel label="Handoff fields">
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-4">
          {body.handoffFields.map((field) => (
            <div key={field} className="rounded-[8px] border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] leading-4 text-[#11100d]/58">
              {field}
            </div>
          ))}
        </div>
      </Panel>
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
  description,
  contents = [],
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
          <CompactPreview receiptBodyType={receiptBodyType} preview={preview} />
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

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-[10px] border border-[#11100d]/8 bg-[#f7f1e7] p-2.5">
            <Label>What it proves</Label>
            <p className="mt-1 text-[12px] leading-5 text-[#11100d]/64">{whatItProves}</p>
          </div>
          <div className="rounded-[10px] border border-[#11100d]/8 bg-[#f7f1e7] p-2.5">
            <Label>Key operational signal</Label>
            <p className="mt-1 text-[12px] leading-5 text-[#11100d]/64">{operationalSignal}</p>
          </div>
        </div>

        {description && <p className="mt-3 text-[12px] leading-5 text-[#11100d]/58">{description}</p>}

        {contents.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {contents.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        )}
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
