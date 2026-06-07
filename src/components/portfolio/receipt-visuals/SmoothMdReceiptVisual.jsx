import React from "react";
import MirrorReceiptVisual from "./MirrorReceiptVisual";
import { resolvePublicSrc } from "../../../utils/resolvePublicSrc";

function Dot({ className = "h-1.5 w-1.5" }) {
  return <span className={`${className} shrink-0 rounded-full bg-[#c8ff62]`} aria-hidden="true" />;
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

function Tag({ children, dark = false }) {
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-[6px] border px-1.5 py-0.5 text-[9px] leading-4 ${
      dark
        ? "border-[#fffaf1]/12 bg-[#fffaf1]/5 text-[#fffaf1]/64"
        : "border-[#11100d]/10 bg-[#f7f1e7] text-[#11100d]/54"
    }`}>
      <Dot className="h-1 w-1" />
      {children}
    </span>
  );
}

function ProofImage({ src, label, className = "aspect-[4/3]" }) {
  return (
    <figure className={`overflow-hidden border border-[#11100d]/10 bg-[#f7f1e7] ${className}`}>
      <img
        src={resolvePublicSrc(src)}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
      <figcaption className="border-t border-[#11100d]/8 bg-[#fffaf1] px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-[#11100d]/44">
        {label}
      </figcaption>
    </figure>
  );
}

function MiniBrandMap({ preview = {} }) {
  const nodes = preview.nodes ?? [];

  return (
    <div className="grid grid-cols-[54px_1fr] gap-2">
      <div className="min-h-[126px] border border-[#11100d]/10 bg-[#151410] p-1.5 text-[#fffaf1]">
        <div className="text-[7px] uppercase tracking-[0.12em] text-[#fffaf1]/50">spine</div>
        <div className="mt-2 space-y-1.5">
          {["svc", "offer", "trust", "proof"].map((step, index) => (
            <div key={step} className="border-l border-[#c8ff62]/45 pl-1.5">
              <div className="font-mono text-[7px] tabular-nums text-[#c8ff62]/58">{String(index + 1).padStart(2, "0")}</div>
              <div className="truncate text-[7px] uppercase tracking-[0.06em] text-[#fffaf1]/54">{step}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {nodes.slice(0, 6).map((node, index) => (
          <div key={node} className="border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1.5">
            <div className="font-mono text-[8px] tabular-nums text-[#11100d]/26">{String(index + 1).padStart(2, "0")}</div>
            <div className="mt-1 truncate text-[8px] uppercase tracking-[0.08em] text-[#11100d]/54">{node}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniLifecycle({ preview = {} }) {
  const steps = preview.steps ?? [];

  return (
    <div className="space-y-1.5">
      <div className="border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-1">
        <div className="flex items-center justify-between text-[7px] uppercase tracking-[0.1em] text-[#11100d]/40">
          <span>patient route</span>
          <span>handoff map</span>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-1.5">
        {steps.slice(0, 6).map((step, index) => (
          <div key={step} className="relative min-h-[38px] border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1.5">
            {index < 5 && <span className="absolute -right-1 top-1/2 z-10 h-px w-2 bg-[#11100d]/18" aria-hidden="true" />}
            <span className="font-mono text-[7px] tabular-nums text-[#11100d]/28">{String(index + 1).padStart(2, "0")}</span>
            <div className="mt-0.5 line-clamp-2 text-[8px] leading-3 text-[#11100d]/56">{step}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {["Airtable", "Mailchimp", "front desk", "retargeting"].map((item) => (
          <span key={item} className="truncate border border-[#11100d]/8 bg-[#f7f1e7] px-1 py-0.5 text-[7px] text-[#11100d]/38">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniCrmFlow({ preview = {} }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 gap-1">
        {(preview.core ?? []).slice(0, 5).map((state, index) => (
          <div key={state} className="relative border border-[#11100d]/8 bg-[#fffaf1] px-1 py-1.5 text-center">
            {index < 4 && <span className="absolute -right-1 top-1/2 h-px w-2 bg-[#11100d]/20" aria-hidden="true" />}
            <div className="font-mono text-[7px] text-[#11100d]/28">{String(index + 1).padStart(2, "0")}</div>
            <div className="mt-1 truncate text-[8px] text-[#11100d]/56">{state}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {(preview.branches ?? []).map((branch) => (
          <div key={branch} className="border border-[#11100d]/8 bg-[#f7f1e7] px-1 py-1 text-center text-[7px] uppercase tracking-[0.06em] text-[#11100d]/42">
            {branch}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniInstagramProof({ preview = {} }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_0.8fr] gap-1.5">
      {["before", "after"].map((label) => (
        <div key={label} className="min-h-[98px] border border-[#11100d]/8 bg-[#fffaf1] p-1.5">
          <div className="flex items-center gap-1 border-b border-[#11100d]/8 pb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff62]" aria-hidden="true" />
            <span className="text-[7px] uppercase tracking-[0.08em] text-[#11100d]/40">{label}</span>
          </div>
          <div className="mt-1.5 border border-[#11100d]/8 bg-[#f7f1e7] p-1">
            <div className="h-5 border border-[#11100d]/8 bg-[#fffaf1]" />
            <div className="mt-1 grid grid-cols-3 gap-0.5">
              <span className="h-3 border border-[#11100d]/6 bg-[#fffaf1]" />
              <span className="h-3 border border-[#11100d]/6 bg-[#fffaf1]" />
              <span className="h-3 border border-[#11100d]/6 bg-[#fffaf1]" />
            </div>
          </div>
          <div className="mt-1.5 h-px bg-[#11100d]/10" />
          <div className="mt-1 text-[7px] uppercase tracking-[0.08em] text-[#11100d]/38">{label} profile</div>
        </div>
      ))}
      <div className="space-y-1">
        {(preview.labels ?? []).slice(2, 5).map((label) => (
          <div key={label} className="border border-[#11100d]/8 bg-[#fffaf1] px-1 py-1 text-[7px] leading-3 text-[#11100d]/46">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniCampaignKit({ preview = {} }) {
  const steps = preview.steps ?? [];

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-1.5">
        {steps.slice(0, 6).map((step, index) => (
          <div key={step} className="border border-[#11100d]/8 bg-[#fffaf1] px-1.5 py-1.5">
            <div className="h-1.5 w-5 bg-[#c8ff62]" />
            <div className="mt-1 truncate text-[8px] uppercase tracking-[0.06em] text-[#11100d]/54">{step}</div>
            <div className="mt-1 h-px bg-[#11100d]/10" />
          </div>
        ))}
      </div>
      <div className="border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-1">
        <div className="flex items-center gap-1">
          {steps.slice(0, 6).map((step, index) => (
            <span key={`${step}-rail`} className="h-1 flex-1 bg-[#11100d]/12" style={index === 0 || index === 3 ? { backgroundColor: "#ffd1a1" } : undefined} aria-hidden="true" />
          ))}
        </div>
        <div className="mt-1 text-[7px] uppercase tracking-[0.09em] text-[#11100d]/42">launch recipe rail</div>
      </div>
    </div>
  );
}

function CompactPreview({ receiptBodyType, preview }) {
  if (receiptBodyType === "brandSystemMap") return <MiniBrandMap preview={preview} />;
  if (receiptBodyType === "lifecycleJourneyMap") return <MiniLifecycle preview={preview} />;
  if (receiptBodyType === "crmStatusFlow") return <MiniCrmFlow preview={preview} />;
  if (receiptBodyType === "instagramRebuildProof") return <MiniInstagramProof preview={preview} />;
  if (receiptBodyType === "campaignToolkitSystem") return <MiniCampaignKit preview={preview} />;
  return null;
}

function BrandSystemMapBody({ body }) {
  const spine = [
    ["Service hierarchy", body.serviceHierarchy.slice(0, 4).join(" / ")],
    ["Offer logic", body.offerArchitecture.slice(0, 3).join(" / ")],
    ["Trust language", body.trustLanguage.slice(0, 3).join(" / ")],
    ["Visual proof", body.visualRules.slice(0, 3).join(" / ")],
    ["Campaign read", body.proofPillars.slice(2, 5).join(" / ")]
  ];

  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="border-b border-[#11100d]/10 bg-[#151410] p-3 text-[#fffaf1] sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label className="text-[#fffaf1]/42">Operating spine</Label>
          <span className="border-l border-[#c8ff62]/40 pl-2 text-[9px] uppercase tracking-[0.13em] text-[#fffaf1]/48">skin + laser system</span>
        </div>

        <div className="mt-4 max-w-[760px] text-[19px] leading-[1.2] tracking-[-0.02em] text-[#fffaf1] sm:text-[23px]">
          <span className="text-[#fffaf1]/46">{body.positioning.from}</span>
          <span className="mx-2 text-[#c8ff62]/78">{"->"}</span>
          <span>{body.positioning.to}</span>
        </div>
        <p className="mt-3 max-w-[690px] text-[12px] leading-5 text-[#fffaf1]/58">
          {body.positioning.role}
        </p>

        <div className="mt-5 grid grid-cols-1 border-y border-[#fffaf1]/10 sm:grid-cols-5">
          {spine.map(([label, value], index) => (
            <div key={label} className="border-b border-[#fffaf1]/10 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:px-3 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tabular-nums text-[#c8ff62]/56">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-[0.12em] text-[#fffaf1]/42">{label}</span>
              </div>
              <div className="mt-2 text-[11px] leading-4 text-[#fffaf1]/62">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Service families</Label>
          <div className="flex flex-wrap gap-1.5">
            {body.serviceHierarchy.map((service) => (
              <span key={service} className="border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/62">
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="p-3">
          <Label className="mb-2">Rules carried across work</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              ["Trust", body.trustLanguage.slice(0, 3)],
              ["Offer", body.offerArchitecture.slice(0, 3)],
              ["Visual", body.visualRules.slice(0, 3)]
            ].map(([label, items]) => (
              <div key={label} className="border border-[#11100d]/8 bg-[#fffaf1] p-2">
                <div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/36">{label}</div>
                <div className="mt-1.5 space-y-1">
                  {items.map((item) => (
                    <div key={item} className="text-[11px] leading-4 text-[#11100d]/60">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 bg-[#f7f1e7] lg:grid-cols-[0.7fr_1fr]">
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Proof pillars</Label>
          <div className="space-y-1.5">
            {body.proofPillars.map((pillar) => (
              <div key={pillar} className="border-l border-[#11100d]/18 bg-[#fffaf1] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/62">
                {pillar}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2">
          {body.proofTiles.map((tile) => (
            <ProofImage key={tile.src} src={tile.src} label={tile.label} className="aspect-[3/2]" />
          ))}
        </div>
      </section>
    </div>
  );
}

function LifecycleJourneyMapBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <div className="border-b border-[#11100d]/10 bg-[#151410] p-3 text-[#fffaf1]">
        <Label className="text-[#fffaf1]/42">Patient journey route</Label>
        <div className="mt-2 text-[13px] leading-5 text-[#fffaf1]/72">Acquisition to reactivation, with each handoff kept visible.</div>
      </div>

      <section className="p-3">
        <div className="space-y-2">
          {body.stages.map((stage, index) => (
            <div key={stage.name} className="grid grid-cols-[38px_1fr] gap-2">
              <div className="relative flex flex-col items-center pt-2">
                <span className="font-mono text-[10px] tabular-nums text-[#11100d]/32">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < body.stages.length - 1 && <span className="mt-2 h-full min-h-10 w-px bg-[#11100d]/14" aria-hidden="true" />}
              </div>
              <div className="grid grid-cols-1 border border-[#11100d]/8 bg-[#f7f1e7] sm:grid-cols-[0.8fr_1.2fr_0.72fr]">
                <div className="border-b border-[#11100d]/8 px-2.5 py-2 sm:border-b-0 sm:border-r">
                  <div className="text-[12px] font-medium leading-4 text-[#11100d]/76">{stage.name}</div>
                  <div className="mt-1 text-[10px] leading-4 text-[#11100d]/50">{stage.trigger}</div>
                </div>
                <div className="border-b border-[#11100d]/8 px-2.5 py-2 text-[11px] leading-4 text-[#11100d]/62 sm:border-b-0 sm:border-r">
                  {stage.items.slice(0, 2).join(" / ")}
                </div>
                <div className="bg-[#fffaf1] px-2.5 py-2">
                  <div className="text-[8px] uppercase tracking-[0.12em] text-[#11100d]/32">handoff</div>
                  <div className="mt-1 text-[10px] leading-4 text-[#11100d]/58">{stage.handoff}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#11100d]/10 bg-[#f7f1e7] p-3">
        <Label className="mb-2">Handoff checkpoints</Label>
        <div className="flex flex-wrap gap-1.5">
          {body.handoffs.map((handoff) => (
            <div key={handoff} className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/58">
              {handoff}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CrmStatusFlowBody({ body }) {
  const branchRules = body.rules.filter((rule) => /No-show|lost|review|2 days/i.test(`${rule.from} ${rule.condition} ${rule.action}`));
  const coreRules = body.rules.filter((rule) => !branchRules.includes(rule));

  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="bg-[#151410] p-3 text-[#fffaf1] sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label className="text-[#fffaf1]/42">CRM state machine</Label>
          <span className="border-l border-[#fffaf1]/14 pl-2 text-[9px] uppercase tracking-[0.13em] text-[#fffaf1]/42">lead to revenue handoff</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 md:grid-cols-4">
          {body.coreStates.map((state, index) => (
            <div key={state} className="relative border-t border-[#fffaf1]/14 pt-2">
              {index < body.coreStates.length - 1 && <span className="hidden md:block absolute -right-3 top-2.5 h-px w-3 bg-[#fffaf1]/16" aria-hidden="true" />}
              <div className="font-mono text-[9px] tabular-nums text-[#c8ff62]/48">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-[12px] font-medium leading-4 text-[#fffaf1]/74">{state}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#11100d]/10 p-3">
        <Label className="mb-2">Tracked record fields</Label>
        <div className="text-[11px] leading-5 text-[#11100d]/58">
          {body.fields.join(" / ")}
        </div>
      </section>

      <section className="grid grid-cols-1 border-t border-[#11100d]/10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="border-b border-[#11100d]/10 bg-[#f7f1e7] p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Branch exits</Label>
          <div className="space-y-1.5">
            {body.sideStates.map((state) => (
              <div key={state} className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-2 text-[11px] leading-4 text-[#11100d]/62">
                {state}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3">
          <Label className="mb-2">Routing rules</Label>
          <div className="grid grid-cols-1 gap-2">
            {[...coreRules, ...branchRules].map((rule) => (
              <div key={`${rule.from}-${rule.action}`} className="grid grid-cols-1 border border-[#11100d]/8 bg-[#fffaf1] sm:grid-cols-[0.82fr_1fr_0.72fr]">
                <span className="border-b border-[#11100d]/8 px-2 py-2 text-[11px] leading-4 text-[#11100d]/64 sm:border-b-0 sm:border-r">{rule.from}</span>
                <span className="border-b border-[#11100d]/8 px-2 py-2 text-[11px] leading-4 text-[#11100d]/52 sm:border-b-0 sm:border-r">{rule.condition}</span>
                <span className="bg-[#f7f1e7] px-2 py-2 text-[11px] font-medium leading-4 text-[#11100d]/70">{rule.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function InstagramRebuildProofBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-2">
        {[body.before, body.after].map((block) => (
          <div key={block.title} className="border-b border-[#11100d]/10 p-3 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <Label className="mb-2">{block.title}</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {block.images.map((image) => (
                <ProofImage key={image.src} src={image.src} label={image.label} className="aspect-[4/3] sm:aspect-[3/4]" />
              ))}
            </div>
            <div className="mt-2 border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-2 text-[11px] leading-5 text-[#11100d]/60">
              {block.points.slice(0, 3).join(" / ")}
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-[1fr_0.8fr]">
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Content system</Label>
          <div className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-2 text-[11px] leading-5 text-[#11100d]/62">
            {body.contentSystem.join(" / ")}
          </div>
        </div>
        <div className="p-3">
          <Label className="mb-2">Performance signal</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_132px]">
            <div className="grid grid-cols-2 gap-1.5">
              {body.performanceSignals.map((signal) => (
                <div key={signal.label} className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-2">
                  <div className="text-[15px] leading-none tracking-[-0.02em] text-[#11100d]/82">{signal.value}</div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.1em] text-[#11100d]/42">{signal.label}</div>
                  <div className="mt-1 text-[9px] leading-3 text-[#11100d]/36">{signal.source}</div>
                </div>
              ))}
            </div>
            <ProofImage src={body.insightImage} label="Instagram insights evidence" className="aspect-[4/3] sm:aspect-[3/4]" />
          </div>
        </div>
      </section>
    </div>
  );
}

function CampaignToolkitSystemBody({ body }) {
  const recipe = [
    ["Offer", body.offerModule.slice(0, 3).join(" / ")],
    ["Audience", body.audienceAngles.slice(0, 3).join(" / ")],
    ["Creative", body.creativeModules.slice(0, 3).join(" / ")],
    ["Capture", body.capturePath.slice(0, 3).join(" / ")],
    ["Follow-up", body.followUpPath.slice(0, 3).join(" / ")],
    ["Read", body.performanceRead.slice(0, 3).join(" / ")]
  ];

  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-[#151410] p-3 text-[#fffaf1] sm:p-4">
          <Label className="text-[#fffaf1]/42">Launch assembly kit</Label>
          <div className="mt-3 text-[18px] leading-[1.25] tracking-[-0.02em] text-[#fffaf1]/86">
            Offer logic, audience angle, creative proof, capture path, follow-up, and performance read.
          </div>
          <div className="mt-4 border-y border-[#fffaf1]/10 py-3">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3">
              {recipe.map(([label], index) => (
                <div key={label} className="border-l border-[#fffaf1]/14 pl-2">
                  <div className="font-mono text-[9px] tabular-nums text-[#c8ff62]/48">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#fffaf1]/54">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-3">
          <Label className="mb-2">Campaign recipe</Label>
          <div className="space-y-2">
            {recipe.map(([label, value], index) => (
              <div key={label} className="grid grid-cols-[74px_1fr] border border-[#11100d]/8 bg-[#f7f1e7]">
                <span className="border-r border-[#11100d]/8 px-2 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#11100d]/38">
                  {String(index + 1).padStart(2, "0")} {label}
                </span>
                <span className="px-2 py-2 text-[11px] leading-5 text-[#11100d]/62">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-3">
        {[
          ["Inputs", [...body.offerModule.slice(0, 2), ...body.audienceAngles.slice(0, 2)]],
          ["Production", [...body.creativeModules.slice(0, 2), ...body.capturePath.slice(0, 2)]],
          ["Outcome", [...body.followUpPath.slice(0, 2), ...body.performanceRead.slice(0, 2)]]
        ].map(([label, items]) => (
          <div key={label} className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <Label className="mb-2">{label}</Label>
            <div className="space-y-1.5">
              {items.map((item) => (
                <div key={item} className="border-l border-[#11100d]/16 bg-[#f7f1e7] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/60">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[#f7f1e7] p-3">
        <Label className="mb-2">Proof assets tied to launch system</Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {body.proofTiles.map((tile) => (
            <ProofImage key={tile.src} src={tile.src} label={tile.label} className="aspect-square" />
          ))}
        </div>
      </section>
    </div>
  );
}

function ArtifactBody({ receiptBodyType, body }) {
  if (receiptBodyType === "brandSystemMap") return <BrandSystemMapBody body={body} />;
  if (receiptBodyType === "lifecycleJourneyMap") return <LifecycleJourneyMapBody body={body} />;
  if (receiptBodyType === "crmStatusFlow") return <CrmStatusFlowBody body={body} />;
  if (receiptBodyType === "instagramRebuildProof") return <InstagramRebuildProofBody body={body} />;
  if (receiptBodyType === "campaignToolkitSystem") return <CampaignToolkitSystemBody body={body} />;
  return null;
}

export default function SmoothMdReceiptVisual({
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
      <article className="w-full overflow-hidden rounded-[8px] border border-l-2 border-[#11100d]/10 border-l-[#c8ff62]/80 bg-[#fffaf1] text-[#11100d]">
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
          <span className="mt-1 block">{footerNote.replace(/^What this proves:\s*/i, "")}</span>
          </>
        )}
        <div className={`${footerNote ? "mt-3 " : ""}flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/34`}>
          <span>{privacyLabel}</span>
        </div>
      </div>
    </article>
  );
}
