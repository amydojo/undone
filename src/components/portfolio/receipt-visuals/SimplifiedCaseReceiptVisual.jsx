import React from "react";
import { resolvePublicSrc } from "../../../utils/resolvePublicSrc";

const CASE_STYLES = {
  mirror: { accent: "#c7b2ff", wash: "#eee8ff", dark: "#17151c" },
  smooth: { accent: "#c8ff62", wash: "#eff7df", dark: "#171913" },
  meta: { accent: "#b6f3d4", wash: "#e8f7f0", dark: "#14201a" },
  snip: { accent: "#8be2ff", wash: "#e5f7fb", dark: "#142027" },
  multi: { accent: "#ffd1a1", wash: "#fbefe1", dark: "#241c16" }
};

const COPY = {
  logicMap: {
    title: "Interpretation Trace",
    summary: "Signals become confidence, explanation, and one gentle suggestion.",
    flow: ["signals", "confidence", "explanation", "next move"],
    proof: "Suggestions come from visible product logic, not generic wellness copy."
  },
  stateMatrix: {
    title: "Check-In Experience",
    summary: "Four quiet signals become one readable Body Weather state.",
    flow: ["4 signals", "Body Weather", "plain language"],
    proof: "Self-report becomes useful reflection without diagnosing the user."
  },
  coverageMatrix: {
    title: "Body Weather States",
    summary: "A consistent state language replaces random mood labels.",
    flow: ["signals", "named condition", "readable language"],
    proof: "Mirror uses one coherent emotional model across product states."
  },
  qaConsole: {
    title: "Edge Case Tests",
    summary: "Uncertainty, conflict, and sensitive copy are tested explicitly.",
    flow: ["input", "expected response", "pass"],
    proof: "Sensitive states were tested as product behavior, not left to intuition."
  },
  brandSystemMap: {
    title: "Clinic Growth OS",
    summary: "Brand, campaigns, lead handling, and retention work as one system.",
    flow: ["brand", "demand", "follow-up", "revenue"],
    proof: "Marketing, CRM, and retention were designed as one operating system."
  },
  lifecycleJourneyMap: {
    title: "Patient Routing",
    summary: "Patient state determines the next useful clinic action.",
    flow: ["lead intent", "next action", "clinic outcome"],
    proof: "Follow-up was driven by patient state instead of ad hoc outreach."
  },
  instagramRebuildProof: {
    title: "Public Brand Rebuild",
    summary: "A generic medspa presence became clear skin and laser authority.",
    flow: ["before", "rebuild", "contact"],
    proof: "Service clarity and visual proof changed how the clinic was perceived."
  },
  campaignToolkitSystem: {
    title: "Campaign Kit",
    summary: "Reusable launch parts connect offer, creative, capture, and follow-up.",
    flow: ["offer", "creative", "capture", "follow-up"],
    proof: "Campaigns became reusable systems rather than isolated graphics."
  },
  airtableSchemaMap: {
    title: "Shared Lead Record",
    summary: "Campaign context and patient outcome live on one record.",
    flow: ["source", "booking", "revenue", "confidence"],
    proof: "Acquisition and revenue evidence lived on the same record."
  },
  campaignFormulaSheet: {
    title: "Campaign Read",
    summary: "Platform metrics are interpreted through downstream patient behavior.",
    flow: ["platform metric", "downstream behavior", "decision"],
    proof: "Performance was judged beyond lead volume and CPL."
  },
  attributionTrace: {
    title: "Campaign to Revenue",
    summary: "Source, outcome, and confidence stay connected through the trace.",
    flow: ["source", "outcome", "confidence"],
    proof: "Attribution uncertainty was labeled instead of hidden."
  },
  decisionQueueConsole: {
    title: "Decision Case",
    summary: "One campaign read ends with one operational next move.",
    flow: ["evidence", "diagnosis", "action"],
    proof: "The system produced action rather than stopping at reporting."
  },
  providerPullTrace: {
    title: "Provider Source Record",
    summary: "Public provider data becomes one normalized publishing record.",
    flow: ["NPPES", "normalize", "profile"],
    proof: "Provider data entered the system in a consistent publishing structure."
  },
  imageSourcingPipeline: {
    title: "Image Source Check",
    summary: "Source confidence determines crop, review, or fallback.",
    flow: ["source", "crop", "review"],
    proof: "Profile imagery was selected through a repeatable quality process."
  },
  faceValidationGate: {
    title: "Face Validation",
    summary: "Five visible checks gate imagery before publication.",
    flow: ["5 checks", "decision", "approved"],
    proof: "Images passed measurable quality gates before publication."
  },
  assetHandoffMap: {
    title: "Publish-Ready Package",
    summary: "Data, imagery, and validation resolve into one final folder.",
    flow: ["data", "image", "validation", "handoff"],
    proof: "The pipeline produced a usable publishing artifact, not only scraped data."
  },
  lifecycleFlowMap: {
    title: "Multi Brand Lifecycle",
    summary: "Patient state, brand, and service determine the message path.",
    flow: ["patient state", "brand", "service"],
    proof: "Follow-up adapted to relationship stage instead of one generic sequence."
  },
  mailchimpRoutingMap: {
    title: "Message Router",
    summary: "Who they are and what they need determine what they receive.",
    flow: ["brand", "service", "state", "message"],
    proof: "Segmentation rules determined the follow-up path."
  },
  followUpTimingRules: {
    title: "Follow-Up Timing",
    summary: "The message changes as time and patient status change.",
    flow: ["Day 0", "Day 2", "Day 7", "Day 21"],
    proof: "Timing was designed as part of the patient experience."
  },
  emailProductionSystem: {
    title: "Email Production Kit",
    summary: "Shared structure supports distinct brand voices and reliable inbox behavior.",
    flow: ["shared frame", "brand voice", "send"],
    proof: "Multiple brands could ship consistently without becoming identical."
  }
};

function Dot({ color }) {
  return <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />;
}

function Flow({ items, accent, compact = false }) {
  return (
    <div className={`flex min-w-0 items-center ${compact ? "gap-1.5" : "gap-2.5"}`}>
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          {index > 0 && <span className="text-[#11100d]/24">→</span>}
          <span className={`${compact ? "text-[9px]" : "text-[11px] sm:text-[12px]"} truncate leading-4 text-[#11100d]/62`}>
            {item}
          </span>
        </React.Fragment>
      ))}
      <Dot color={accent} />
    </div>
  );
}

function MirrorVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "stateMatrix") {
    const field = body?.weatherField ?? {};
    return (
      <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3 rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
          {["Mood", "Sleep", "Clarity", "Context"].map((label, index) => (
            <div key={label}>
              <div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">{label}</div>
              <div className="mt-2 h-1.5 rounded-full bg-[#11100d]/8">
                <div className="h-full rounded-full" style={{ width: `${35 + index * 11}%`, backgroundColor: accent }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[18px] p-5 text-[#fffaf1]" style={{ backgroundColor: CASE_STYLES.mirror.dark }}>
          <div className="text-[9px] uppercase tracking-[0.14em] text-[#fffaf1]/42">Body Weather</div>
          <div className="mt-8 text-[42px] leading-none tracking-[-0.04em]">{field.state ?? "Frayed"}</div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.12em]" style={{ color: accent }}>{field.confidence ?? "medium confidence"}</div>
          <p className="mt-5 max-w-md text-[14px] leading-6 text-[#fffaf1]/72">{field.interpretation ?? "Today may feel mentally dense."}</p>
          <div className="mt-6 border-t border-[#fffaf1]/12 pt-4 text-[13px] text-[#fffaf1]/82">{field.nextMove ?? "Reduce one input."}</div>
        </div>
      </div>
    );
  }

  if (receiptBodyType === "coverageMatrix") {
    const states = ["Settled", "Frayed", "Drifting", "Restoring", "Compressed", "Clear"];
    return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{states.map((state, index) => <div key={state} className="min-h-[110px] rounded-[16px] border border-[#11100d]/9 p-3" style={{ background: `linear-gradient(145deg, ${index % 2 ? "#19171f" : "#fffaf1"}, ${index % 2 ? "#2a2440" : "#eee8ff"})`, color: index % 2 ? "#fffaf1" : "#11100d" }}><div className="text-[9px] uppercase tracking-[0.13em] opacity-45">state {String(index + 1).padStart(2, "0")}</div><div className="mt-8 text-[18px] font-medium">{state}</div><div className="mt-1 text-[10px] opacity-55">named condition</div></div>)}</div>;
  }

  if (receiptBodyType === "logicMap") {
    const resolver = body?.resolver?.[0] ?? { state: "Frayed", rule: "high tension + low clarity", nextMove: "lower input load" };
    return <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center"><div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4"><div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">Signals</div><div className="mt-3 space-y-1.5 text-[13px] text-[#11100d]/70"><div>sleep low</div><div>clarity low</div><div>tension high</div></div></div><span className="text-center text-[#11100d]/28">→</span><div className="rounded-[16px] p-4 text-[#fffaf1]" style={{ backgroundColor: CASE_STYLES.mirror.dark }}><div className="text-[9px] uppercase tracking-[0.14em] text-[#fffaf1]/38">State</div><div className="mt-4 text-[28px]">{resolver.state}</div><div className="mt-2 text-[11px]" style={{ color: accent }}>{resolver.rule}</div></div><span className="text-center text-[#11100d]/28">→</span><div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4"><div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">Next move</div><div className="mt-4 text-[16px] leading-6 text-[#11100d]/78">{resolver.nextMove}</div></div></div>;
  }

  const cases = (body?.testCases ?? []).slice(0, 4);
  return <div className="grid grid-cols-2 gap-2">{cases.map((item) => <div key={item.scenario} className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3"><div className="text-[10px] font-medium text-[#11100d]">{item.scenario}</div><div className="mt-3 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/38">Expected</div><div className="mt-1 text-[12px] text-[#11100d]/68">{item.expected}</div><div className="mt-3 inline-flex items-center gap-2 text-[10px] text-[#11100d]/60"><Dot color={accent} />PASS</div></div>)}</div>;
}

function SmoothVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "instagramRebuildProof") {
    const before = body?.before?.images?.[0];
    const after = body?.after?.images?.[0];
    return <div><div className="grid grid-cols-2 gap-3">{[before, after].map((image, index) => <div key={index} className="overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1]"><div className="px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">{index ? "After" : "Before"}</div>{image?.src ? <img src={resolvePublicSrc(image.src)} alt={image.label ?? "Instagram evidence"} className="aspect-[4/3] w-full object-cover" /> : <div className="aspect-[4/3] bg-[#11100d]/5" />}</div>)}</div><div className="mt-3 grid grid-cols-3 divide-x divide-[#11100d]/10 rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1]">{(body?.performanceSignals ?? []).slice(0, 3).map((item) => <div key={item.label} className="p-3 text-center"><div className="text-[18px] font-medium">{item.value}</div><div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/42">{item.label}</div></div>)}</div></div>;
  }
  if (receiptBodyType === "campaignToolkitSystem") {
    return <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{(body?.proofTiles ?? []).slice(0, 4).map((tile) => <div key={tile.src} className="overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1]"><img src={resolvePublicSrc(tile.src)} alt={tile.label} className="aspect-square w-full object-cover" /><div className="px-2.5 py-2 text-[10px] text-[#11100d]/60">{tile.label}</div></div>)}</div>;
  }
  const stages = receiptBodyType === "lifecycleJourneyMap" ? (body?.stages ?? []).map((item) => item.name) : ["Brand", "Campaigns", "Leads", "Consults", "Treatment", "Retention"];
  return <div className="flex flex-col gap-2 sm:flex-row sm:items-center">{stages.slice(0, 7).map((stage, index) => <React.Fragment key={stage}>{index > 0 && <span className="hidden text-[#11100d]/24 sm:block">→</span>}<div className="flex min-h-[76px] flex-1 items-center justify-center rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] px-2 text-center text-[11px] text-[#11100d]/68"><span>{stage}</span></div></React.Fragment>)}</div>;
}

function MetaVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "airtableSchemaMap") {
    const record = body?.sampleRecord ?? {};
    const fields = [["Source", record.source], ["Campaign", "Microneedling"], ["Service", record.service_interest], ["Status", record.status], ["Booked", "Yes"], ["Arrived", record.arrived], ["Revenue", "Pending"], ["Confidence", record.attribution_confidence]];
    return <div className="grid grid-cols-2 divide-x divide-y divide-[#11100d]/10 overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] sm:grid-cols-4">{fields.map(([label, value]) => <div key={label} className="p-3"><div className="text-[8px] uppercase tracking-[0.12em] text-[#11100d]/38">{label}</div><div className="mt-2 text-[12px] text-[#11100d]/72">{value}</div></div>)}</div>;
  }
  if (receiptBodyType === "campaignFormulaSheet") {
    const rows = (body?.campaignRows ?? []).slice(0, 3);
    return <div className="overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1]"><div className="grid grid-cols-[1.1fr_1fr_0.8fr] border-b border-[#11100d]/10 px-3 py-2 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/38"><span>Campaign</span><span>Signal</span><span>Action</span></div>{rows.map((row) => <div key={row.row} className="grid grid-cols-[1.1fr_1fr_0.8fr] gap-2 border-b border-[#11100d]/8 px-3 py-3 text-[11px] last:border-b-0"><span>{row.row}</span><span className="text-[#11100d]/58">{row.signal}</span><span className="font-medium" style={{ color: CASE_STYLES.meta.dark }}>{row.decision}</span></div>)}</div>;
  }
  if (receiptBodyType === "attributionTrace") {
    const path = ["Meta campaign", "Lead record", "Booked", "Arrived", "Revenue", "Confidence"];
    return <div><div className="flex flex-col gap-2 sm:flex-row sm:items-center">{path.map((item, index) => <React.Fragment key={item}>{index > 0 && <span className="hidden text-[#11100d]/24 sm:block">→</span>}<div className="flex min-h-[72px] flex-1 items-center justify-center rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] px-2 text-center text-[11px]">{item}</div></React.Fragment>)}</div><div className="mt-3 rounded-[12px] border border-dashed border-[#11100d]/16 px-3 py-2 text-[11px] text-[#11100d]/54">Missing campaign → manual review</div></div>;
  }
  return <div className="grid gap-3 md:grid-cols-[1fr_0.72fr]"><div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4"><div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">Campaign</div><div className="mt-3 text-[20px]">Microneedling</div><div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-[11px]"><span>CPL</span><span>acceptable</span><span>Booked rate</span><span>weak</span><span>Show rate</span><span>stable</span><span>Confidence</span><span>medium</span></div></div><div className="rounded-[16px] p-4 text-[#fffaf1]" style={{ backgroundColor: CASE_STYLES.meta.dark }}><div className="text-[9px] uppercase tracking-[0.14em] text-[#fffaf1]/38">Next move</div><div className="mt-8 text-[24px] leading-8">Repair follow-up</div><div className="mt-4 text-[12px] leading-5 text-[#fffaf1]/60">before changing creative</div></div></div>;
}

function SnipVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "providerPullTrace") {
    const row = body?.queue?.[0] ?? {};
    const fields = [["Name", row.candidate ?? "Provider 001"], ["Specialty", "Urology"], ["NPI", "active"], ["Location", "Target area"], ["Source", "NPPES"], ["Status", row.profileStatus ?? "ready"]];
    return <div className="grid grid-cols-2 divide-x divide-y divide-[#11100d]/10 overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] sm:grid-cols-3">{fields.map(([label, value]) => <div key={label} className="p-4"><div className="text-[8px] uppercase tracking-[0.12em] text-[#11100d]/38">{label}</div><div className="mt-2 text-[13px] text-[#11100d]/72">{value}</div></div>)}</div>;
  }
  if (receiptBodyType === "imageSourcingPipeline") {
    const labels = ["source image", "cropped face", "approved", "rejected"];
    return <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{labels.map((label, index) => <div key={label} className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3"><div className="aspect-square rounded-[10px] bg-gradient-to-br from-[#dceff5] to-[#9db8c4]" /><div className="mt-2 flex items-center gap-2 text-[10px] text-[#11100d]/60"><Dot color={index === 3 ? "#d98b83" : accent} />{label}</div></div>)}</div>;
  }
  if (receiptBodyType === "faceValidationGate") {
    const checks = (body?.checks ?? []).slice(0, 5);
    return <div className="grid gap-3 md:grid-cols-[1fr_0.8fr]"><div className="flex aspect-[4/3] items-center justify-center rounded-[16px] border border-[#11100d]/10 bg-gradient-to-br from-[#dceff5] to-[#7994a0]"><div className="h-28 w-24 rounded-[48%_48%_42%_42%] border-2 border-white/70 bg-white/15" /></div><div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4">{checks.map((check) => <div key={check} className="flex items-center justify-between border-b border-[#11100d]/8 py-2 text-[12px] last:border-b-0"><span>{check}</span><span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#11100d]/48"><Dot color={accent} />pass</span></div>)}</div></div>;
  }
  const files = ["profile.json", "headshot.jpg", "source.txt", "validation.json", "publish-ready/"];
  return <div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4 font-mono text-[12px] leading-7 text-[#11100d]/68"><div className="text-[#11100d]">/provider-name</div>{files.map((file) => <div key={file} className="pl-5">├─ {file}</div>)}</div>;
}

function MultiVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "followUpTimingRules") {
    const items = ["Day 0", "Day 2", "Day 7", "Day 21"];
    return <div className="grid grid-cols-4 gap-2">{items.map((item, index) => <div key={item} className="relative rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3 text-center"><div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/38">{item}</div><div className="mt-6 text-[12px] text-[#11100d]/72">{["Welcome", "Follow-up", "Education", "Reactivate"][index]}</div></div>)}</div>;
  }
  if (receiptBodyType === "emailProductionSystem") {
    const modules = (body?.modules ?? []).slice(0, 5);
    return <div className="mx-auto max-w-[520px] overflow-hidden rounded-[16px] border border-[#11100d]/12 bg-[#fffaf1]">{modules.map((item, index) => <div key={item.module} className={`border-b border-[#11100d]/8 px-4 ${index === 1 ? "py-8" : "py-3"} last:border-b-0`}><div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/38">{item.module}</div><div className="mt-1 text-[12px] text-[#11100d]/66">{item.purpose}</div></div>)}</div>;
  }
  if (receiptBodyType === "mailchimpRoutingMap") {
    const examples = ["Smooth MD + Microneedling + New", "Dr. Vigor + Lab Panel + Interested", "Dr. Neo + Hair + Lapsed"];
    return <div><div className="flex flex-wrap items-center justify-center gap-2 text-[12px]"><span className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2">BRAND</span><span>+</span><span className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2">SERVICE</span><span>+</span><span className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2">STATE</span><span>=</span><span className="rounded-full px-3 py-2" style={{ backgroundColor: accent }}>MESSAGE</span></div><div className="mt-5 space-y-2">{examples.map((example) => <div key={example} className="rounded-[12px] border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2 text-[11px] text-[#11100d]/62">{example}</div>)}</div></div>;
  }
  const states = ["New", "Active", "Lapsed", "Returning"];
  return <div><div className="flex items-center gap-2">{states.map((state, index) => <React.Fragment key={state}>{index > 0 && <span className="text-[#11100d]/24">→</span>}<div className="flex min-h-[72px] flex-1 items-center justify-center rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] px-2 text-center text-[12px]">{state}</div></React.Fragment>)}</div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-[#11100d]/56 sm:grid-cols-6">{["Smooth MD", "Dr. Vigor", "Dr. Neo", "Dr. Food", "Dr. Freeze", "Dr. Sculpt"].map((brand) => <div key={brand} className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-2 py-1.5">{brand}</div>)}</div></div>;
}

function MainVisual(props) {
  if (props.caseKind === "mirror") return <MirrorVisual {...props} />;
  if (props.caseKind === "smooth") return <SmoothVisual {...props} />;
  if (props.caseKind === "meta") return <MetaVisual {...props} />;
  if (props.caseKind === "snip") return <SnipVisual {...props} />;
  return <MultiVisual {...props} />;
}

export default function SimplifiedCaseReceiptVisual({ caseKind, receiptNumber, receiptBodyType, body = {}, displayMode = "full", ctaLabel = "Inspect receipt", privacyLabel = "sanitized", type }) {
  const style = CASE_STYLES[caseKind] ?? CASE_STYLES.mirror;
  const copy = COPY[receiptBodyType] ?? { title: "System Proof", summary: "One artifact shows how the system works.", flow: ["input", "system", "output"], proof: "The case is supported by a concrete evidence object." };

  if (displayMode === "compact") {
    return (
      <article className="w-full overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]">
        <div className="px-3.5 py-3" style={{ backgroundColor: style.wash }}>
          <div className="flex items-center justify-between gap-2 text-[8px] uppercase tracking-[0.14em] text-[#11100d]/38"><span>Receipt {receiptNumber}</span><span>{type}</span></div>
          <h3 className="mt-3 text-[16px] font-medium leading-5 tracking-[-0.02em]">{copy.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[#11100d]/58">{copy.summary}</p>
        </div>
        <div className="px-3.5 py-3"><Flow items={copy.flow} accent={style.accent} compact /></div>
        <div className="border-t border-[#11100d]/8 px-3.5 py-2.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/42">{ctaLabel}</div>
      </article>
    );
  }

  return (
    <article className="w-full bg-[#f7f1e7] text-[#11100d]">
      <div className="px-4 py-5 sm:px-6 sm:py-6" style={{ backgroundColor: style.wash }}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38"><span>Receipt {receiptNumber}</span><span>{type}</span></div>
        <h2 className="mt-4 text-[28px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[34px]">{copy.title}</h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-6 text-[#11100d]/62 sm:text-[15px]">{copy.summary}</p>
      </div>
      <div className="p-4 sm:p-6"><MainVisual caseKind={caseKind} receiptBodyType={receiptBodyType} body={body} accent={style.accent} /></div>
      <div className="border-t border-[#11100d]/8 bg-[#fffaf1] px-4 py-4 sm:px-6">
        <Flow items={copy.flow} accent={style.accent} />
        <div className="mt-4 border-t border-[#11100d]/8 pt-4 text-[12px] leading-5 text-[#11100d]/70"><span className="mr-2 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36">Proves</span>{copy.proof}</div>
        <div className="mt-3 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/28">{privacyLabel}</div>
      </div>
    </article>
  );
}
