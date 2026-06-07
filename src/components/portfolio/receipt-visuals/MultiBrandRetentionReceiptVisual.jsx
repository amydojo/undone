import React from "react";
import MirrorReceiptVisual from "./MirrorReceiptVisual";

const ACCENT = "#ffd1a1";
const MINT = "#b6f3d4";

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
    <span className="inline-flex shrink-0 items-center gap-1.5 border-l border-[#11100d]/12 pl-2 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/42">
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
        : "border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]/54"
    }`}>
      <Dot color={color} className="h-1 w-1" />
      {children}
    </span>
  );
}

function MiniLifecycleRouter({ preview = {} }) {
  const routes = preview.routes ?? [];
  const stages = preview.stages ?? [];

  return (
    <div className="overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
      <div className="grid grid-cols-[54px_repeat(6,minmax(0,1fr))] border-b border-[#11100d]/8 bg-[#f7f1e7] text-[7px] uppercase tracking-[0.06em] text-[#11100d]/38">
        <span className="px-1 py-1">flow</span>
        {stages.slice(0, 6).map((stage) => (
          <span key={stage} className="truncate border-l border-[#11100d]/8 px-1 py-1 text-center">{stage}</span>
        ))}
      </div>
      {routes.slice(0, 4).map((route, rowIndex) => (
        <div key={route} className="grid grid-cols-[54px_repeat(6,minmax(0,1fr))] items-center border-b border-[#11100d]/6 last:border-b-0">
          <span className="truncate bg-[#f7f1e7] px-1 py-1.5 text-[7px] uppercase tracking-[0.06em] text-[#11100d]/42">{route}</span>
          {stages.slice(0, 6).map((stage, index) => (
            <span key={`${route}-${stage}`} className="relative border-l border-[#11100d]/6 px-1 py-2">
              {index < 5 && <span className="absolute right-[-3px] top-1/2 z-10 h-px w-2 bg-[#11100d]/18" aria-hidden="true" />}
              <span
                className={`mx-auto block h-2 w-2 rounded-full ${rowIndex % 2 === 0 ? "bg-[#ffd1a1]" : "bg-[#b6f3d4]"}`}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function MiniRoutingMap({ preview = {} }) {
  const brands = preview.brands ?? [];
  const fields = preview.fields ?? [];

  return (
    <div className="grid grid-cols-[68px_1fr] gap-1.5">
      <div className="space-y-1">
        {brands.slice(0, 6).map((brand) => (
          <div key={brand} className="truncate border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1 text-[7px] uppercase tracking-[0.06em] text-[#11100d]/46">
            {brand}
          </div>
        ))}
      </div>
      <div className="overflow-hidden border border-[#11100d]/10 bg-[#fffaf1]">
        <div className="grid grid-cols-3 border-b border-[#11100d]/8 bg-[#f7f1e7] text-[7px] uppercase tracking-[0.06em] text-[#11100d]/36">
          {fields.slice(0, 3).map((field) => (
            <span key={field} className="truncate border-r border-[#11100d]/6 px-1 py-1 last:border-r-0">{field}</span>
          ))}
        </div>
        <div className="grid grid-cols-3">
          {fields.slice(0, 6).map((field, index) => (
            <div key={field} className="min-h-[38px] border-b border-r border-[#11100d]/6 px-1 py-1 last:border-r-0">
              <Dot color={index % 2 === 0 ? ACCENT : MINT} className="h-1.5 w-1.5" />
              <div className="mt-1 truncate font-mono text-[7px] text-[#11100d]/44">{field}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#11100d]/8 px-1.5 py-1 text-[7px] uppercase tracking-[0.08em] text-[#11100d]/36">
          send / suppress / route
        </div>
      </div>
    </div>
  );
}

function MiniTimingProtocol({ preview = {} }) {
  const rules = preview.rules ?? [];

  return (
    <div className="grid grid-cols-[1fr_54px] gap-1.5">
      <div className="space-y-1">
        {rules.slice(0, 4).map((rule, index) => (
          <div key={rule} className="grid grid-cols-[24px_1fr_24px] items-center border border-[#11100d]/8 bg-[#fffaf1]">
            <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full border border-[#11100d]/10 bg-[#f7f1e7] font-mono text-[8px] text-[#11100d]/40">{String(index + 1).padStart(2, "0")}</span>
            <span className="truncate px-1.5 py-1.5 text-[8px] uppercase tracking-[0.06em] text-[#11100d]/48">{rule}</span>
            <Dot color={index === 3 ? MINT : ACCENT} className="mx-auto h-1.5 w-1.5" />
          </div>
        ))}
      </div>
      <div className="border border-[#11100d]/10 bg-[#f7f1e7] p-1">
        <div className="mb-1 text-center text-[7px] uppercase tracking-[0.08em] text-[#11100d]/34">exclude</div>
        {(preview.exclusions ?? []).slice(0, 3).map((item) => (
          <div key={item} className="mb-1 truncate border border-[#11100d]/8 bg-[#fffaf1] px-1 py-1 text-[7px] text-[#11100d]/42 last:mb-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniEmailBlueprint({ preview = {} }) {
  return (
    <div className="grid grid-cols-[1fr_62px] gap-1.5">
      <div className="border border-[#11100d]/10 bg-[#fffaf1] p-1.5">
        <div className="mb-1 flex items-center justify-between border-b border-[#11100d]/8 pb-1 text-[7px] uppercase tracking-[0.08em] text-[#11100d]/36">
          <span>600px frame</span>
          <span>email</span>
        </div>
        {(preview.modules ?? []).slice(0, 5).map((module, index) => (
          <div
            key={module}
            className={`mb-1 border border-[#11100d]/8 px-1 py-1 text-[7px] uppercase tracking-[0.06em] text-[#11100d]/46 last:mb-0 ${
              index === 0 || index === 3 ? "bg-[#ffd1a1]/35" : "bg-[#f7f1e7]"
            }`}
          >
            {module}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {(preview.frame ?? []).slice(0, 4).map((item) => (
          <div key={item} className="truncate border border-[#11100d]/8 bg-[#f7f1e7] px-1 py-1.5 text-[7px] uppercase tracking-[0.06em] text-[#11100d]/46">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactPreview({ receiptBodyType, preview }) {
  if (receiptBodyType === "lifecycleFlowMap") return <MiniLifecycleRouter preview={preview} />;
  if (receiptBodyType === "mailchimpRoutingMap") return <MiniRoutingMap preview={preview} />;
  if (receiptBodyType === "followUpTimingRules") return <MiniTimingProtocol preview={preview} />;
  if (receiptBodyType === "emailProductionSystem") return <MiniEmailBlueprint preview={preview} />;
  return null;
}

function LifecycleFlowMapBody({ body }) {
  const flows = body.flows ?? [];
  const stages = body.stages ?? ["source", "intent", "service", "timing", "message", "booking"];

  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-[230px_1fr]">
        <aside className="border-b border-[#11100d]/10 bg-[#f7f1e7] p-3 lg:border-b-0 lg:border-r">
          <Label>Lifecycle router</Label>
          <div className="mt-2 text-[12px] leading-5 text-[#11100d]/58">
            Source, intent, service, timing, message, and booking readiness determine the next lifecycle route.
          </div>
          <div className="mt-3 space-y-3 border-t border-[#11100d]/10 pt-3">
            <div>
              <div className="mb-1.5 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/34">Inputs</div>
              <div className="flex flex-wrap gap-1">
                {stages.map((stage) => (
                  <span key={stage} className="border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1 text-[9px] uppercase tracking-[0.08em] text-[#11100d]/46">
                    {stage}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/34">Outputs</div>
              <div className="space-y-1">
                {flows.map((flow) => (
                  <div key={flow.name} className="border-l border-[#11100d]/16 pl-2 text-[10px] leading-4 text-[#11100d]/56">
                    {flow.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="grid grid-cols-1 gap-2 p-3 md:grid-cols-2">
          {flows.map((flow, flowIndex) => (
            <section key={flow.name} className="border border-[#11100d]/8 bg-[#f7f1e7]">
              <div className="flex items-center justify-between gap-3 border-b border-[#11100d]/8 bg-[#fffaf1] px-2.5 py-2">
                <h4 className="text-[13px] font-medium leading-5 text-[#11100d]/76">{flow.name}</h4>
                <span className="font-mono text-[10px] tabular-nums text-[#11100d]/30">{String(flowIndex + 1).padStart(2, "0")}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[0.9fr_1fr_0.9fr]">
                <div className="border-b border-[#11100d]/8 px-2.5 py-2 sm:border-b-0 sm:border-r">
                  <Label>Input</Label>
                  <div className="mt-1 text-[11px] leading-5 text-[#11100d]/62">{flow.source}</div>
                  <div className="text-[11px] leading-5 text-[#11100d]/62">{flow.intent}</div>
                </div>
                <div className="border-b border-[#11100d]/8 px-2.5 py-2 sm:border-b-0 sm:border-r">
                  <Label>Route decision</Label>
                  <div className="mt-1 text-[11px] leading-5 text-[#11100d]/62">{flow.service}</div>
                  <div className="text-[11px] leading-5 text-[#11100d]/62">{flow.timing}</div>
                </div>
                <div className="px-2.5 py-2">
                  <Label>Message / booking</Label>
                  <div className="mt-1 text-[11px] leading-5 text-[#11100d]/62">{flow.message}</div>
                  <div className="text-[11px] leading-5 text-[#11100d]/62">{flow.booking}</div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f1e7] p-3">
        <Label className="mb-2">Guardrails</Label>
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
          {(body.operatingRules ?? []).map((rule) => (
            <div key={rule} className="border-l border-[#11100d]/16 bg-[#fffaf1] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/62">
              {rule}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MailchimpRoutingMapBody({ body }) {
  const inputs = body.routingFields ?? [];
  const outputs = body.routeLanes ?? [];

  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-[0.85fr_190px_1fr]">
        <div className="p-3">
          <Label className="mb-2">Routing inputs</Label>
          <div className="space-y-1.5">
            {inputs.map((field) => (
              <div key={field.field} className="grid grid-cols-[82px_1fr] border border-[#11100d]/8 bg-[#f7f1e7]">
                <span className="border-r border-[#11100d]/8 px-2 py-2 text-[10px] uppercase tracking-[0.1em] text-[#11100d]/40">{field.field}</span>
                <span className="px-2 py-2 text-[11px] leading-4 text-[#11100d]/62">{field.example}{" -> "}{field.usedFor}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-[#11100d]/10 bg-[#f7f1e7] p-3 lg:border-x lg:border-y-0">
          <Label>Suppression gate</Label>
          <div className="mt-1 text-[12px] font-medium leading-4 text-[#11100d]/72">Block send if</div>
          <div className="mt-3 space-y-1.5">
            {(body.exclusionLogic ?? []).map((item) => (
              <div key={item} className="border-l border-[#11100d]/16 bg-[#fffaf1] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/58">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3">
          <Label className="mb-2">Send routes</Label>
          <div className="space-y-2">
            {outputs.map((lane, index) => (
              <div key={lane.lane} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2.5 py-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[12px] font-medium leading-4 text-[#11100d]/74">{lane.lane}</div>
                  <span className="font-mono text-[10px] tabular-nums text-[#11100d]/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-1 text-[11px] leading-5 text-[#11100d]/58">{lane.input}{" -> "}{lane.output}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1e7] p-3">
        <Label className="mb-2">Brand list separation</Label>
        <div className="flex flex-wrap gap-1.5">
          {(body.brands ?? []).map((brand) => (
            <span key={brand} className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/58">
              {brand}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function FollowUpTimingRulesBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_230px]">
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-3">Timing protocol rail</Label>
          <div className="space-y-2">
            {(body.timeline ?? []).map((rule, index) => (
              <div key={rule.window} className="grid grid-cols-[42px_1fr] gap-2">
                <div className="relative flex flex-col items-center pt-1">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] font-mono text-[10px] tabular-nums text-[#11100d]/38">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < body.timeline.length - 1 && <span className="mt-1.5 h-full min-h-12 w-px bg-[#11100d]/14" aria-hidden="true" />}
                </div>
                <div className="border border-[#11100d]/8 bg-[#f7f1e7] px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-[13px] font-medium leading-5 text-[#11100d]/76">{rule.window}</h4>
                    <Tag color={index === 3 ? MINT : ACCENT}>{rule.action}</Tag>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    <div className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5">
                      <Label>Trigger</Label>
                      <div className="mt-1 text-[11px] leading-4 text-[#11100d]/62">{rule.trigger}</div>
                    </div>
                    <div className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5">
                      <Label>Guardrail</Label>
                      <div className="mt-1 text-[11px] leading-4 text-[#11100d]/62">{rule.guardrail}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="p-3">
          <Label className="mb-2">State + exclusion logic</Label>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {(body.states ?? []).map((state) => (
              <span key={state} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[10px] uppercase tracking-[0.08em] text-[#11100d]/46">
                {state}
              </span>
            ))}
          </div>
          <div className="border border-[#11100d]/8 bg-[#fffaf1] p-2.5">
            <Label>Do not send when</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(body.statusExclusions ?? []).map((item) => (
                <span key={item} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1 text-[10px] leading-4 text-[#11100d]/52">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <Label className="mb-2">Handoffs</Label>
            <div className="flex flex-wrap gap-1.5">
              {(body.handoffs ?? []).map((handoff) => (
                <Tag key={handoff} color={MINT}>{handoff}</Tag>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function EmailProductionSystemBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 lg:grid-cols-[210px_1fr_190px]">
        <aside className="border-b border-[#11100d]/10 bg-[#f7f1e7] p-3 lg:border-b-0 lg:border-r">
          <Label>Inbox constraints</Label>
          <div className="mt-3 space-y-1.5">
            {(body.frameRules ?? []).map((rule) => (
              <div key={rule.rule} className="border-l border-[#11100d]/16 bg-[#fffaf1] px-2 py-1.5">
                <div className="text-[11px] font-medium leading-4 text-[#11100d]/68">{rule.rule}</div>
                <div className="mt-0.5 text-[10px] leading-4 text-[#11100d]/42">{rule.reason}</div>
              </div>
            ))}
          </div>
        </aside>

        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <div className="mx-auto max-w-[420px] border border-[#11100d]/12 bg-[#f7f1e7] p-2">
            <div className="mb-2 flex items-center justify-between border-b border-[#11100d]/10 pb-2">
              <Label>600px production frame</Label>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#11100d]/36">Mailchimp</span>
            </div>
            {(body.modules ?? []).map((module, index) => (
              <section key={module.module} className="mb-2 border border-[#11100d]/8 bg-[#fffaf1] p-2 last:mb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] tabular-nums text-[#11100d]/30">{String(index + 1).padStart(2, "0")}</span>
                    <h4 className="text-[12px] font-medium leading-4 text-[#11100d]/74">{module.module}</h4>
                  </div>
                  <Tag>{module.content}</Tag>
                </div>
                <div className="mt-1 text-[11px] leading-4 text-[#11100d]/56">{module.purpose}</div>
              </section>
            ))}
          </div>
        </div>

        <aside className="p-3">
          <Label className="mb-2">Production checks</Label>
          <div className="space-y-1.5">
            {(body.productionChecks ?? []).map((check) => (
              <div key={check} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
                <span className="text-[11px] leading-4 text-[#11100d]/58">{check}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border border-[#11100d]/8 bg-[#fffaf1] p-2">
            <Label>Reusable for</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(body.reusableFor ?? []).map((item) => (
                <Tag key={item} color={MINT}>{item}</Tag>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ArtifactBody({ receiptBodyType, body }) {
  if (receiptBodyType === "lifecycleFlowMap") return <LifecycleFlowMapBody body={body} />;
  if (receiptBodyType === "mailchimpRoutingMap") return <MailchimpRoutingMapBody body={body} />;
  if (receiptBodyType === "followUpTimingRules") return <FollowUpTimingRulesBody body={body} />;
  if (receiptBodyType === "emailProductionSystem") return <EmailProductionSystemBody body={body} />;
  return null;
}

export default function MultiBrandRetentionReceiptVisual({
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
      <article className="w-full overflow-hidden rounded-[8px] border border-l-2 border-[#11100d]/10 border-l-[#ffd1a1]/85 bg-[#fffaf1] text-[#11100d]">
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
        {claim && <p className="text-[13px] leading-6 text-[#11100d]/68">{claim}</p>}
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
