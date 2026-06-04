import React from "react";
import MirrorReceiptVisual from "./MirrorReceiptVisual";

const ACCENT = "#c8ff62";

function resolvePublicSrc(src) {
  if (!src || !src.startsWith("/")) return src;

  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return src;

  return `${base.replace(/\/$/, "")}${src}`;
}

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
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-0.5 text-[9px] uppercase tracking-[0.08em] text-[#11100d]/52">
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
    <div className="grid grid-cols-[34px_1fr] gap-2">
      <div className="flex min-h-[126px] flex-col justify-between border border-[#11100d]/10 bg-[#151410] p-1.5 text-[#fffaf1]">
        <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#fffaf1]/50 [writing-mode:vertical-rl]">
          operating map
        </span>
        <Dot className="h-2 w-2" />
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
      <div className="border border-[#11100d]/10 bg-[#151410] px-2 py-1 text-[7px] uppercase tracking-[0.1em] text-[#fffaf1]/56">
        patient / lead lifecycle
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
        <div key={label} className="min-h-[98px] border border-[#11100d]/8 bg-[#151410] p-1.5 text-[#fffaf1]">
          <div className="h-8 border border-[#fffaf1]/12 bg-[#fffaf1]/8" />
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-10 bg-[#fffaf1]/50" />
            <div className="h-1.5 w-8 bg-[#fffaf1]/24" />
            <div className="grid grid-cols-3 gap-1 pt-1">
              <span className="h-4 bg-[#fffaf1]/8" />
              <span className="h-4 bg-[#fffaf1]/8" />
              <span className="h-4 bg-[#fffaf1]/8" />
            </div>
          </div>
          <div className="mt-2 text-[7px] uppercase tracking-[0.08em] text-[#fffaf1]/48">{label} profile</div>
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
      <div className="border border-[#11100d]/10 bg-[#151410] px-2 py-1 text-[7px] uppercase tracking-[0.09em] text-[#fffaf1]/58">
        launch kit / performance read
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

function ModuleList({ items = [], dark = false }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className={`grid grid-cols-[6px_1fr] gap-2 border px-2 py-1.5 ${
          dark
            ? "border-[#fffaf1]/12 bg-[#fffaf1]/5 text-[#fffaf1]/64"
            : "border-[#11100d]/8 bg-[#fffaf1] text-[#11100d]/60"
        }`}>
          <span className="mt-1 h-3 rounded-full bg-[#c8ff62]" aria-hidden="true" />
          <span className="text-[11px] leading-4">{item}</span>
        </div>
      ))}
    </div>
  );
}

function BrandSystemMapBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 border-b border-[#11100d]/10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-[#151410] p-3 text-[#fffaf1]">
          <Label className="text-[#fffaf1]/42">Positioning spine</Label>
          <div className="mt-3 grid grid-cols-[56px_1fr] gap-2">
            <span className="text-[9px] uppercase tracking-[0.12em] text-[#fffaf1]/36">From</span>
            <div className="border border-[#fffaf1]/12 bg-[#fffaf1]/5 px-2 py-2 text-[12px] leading-5 text-[#fffaf1]/68">{body.positioning.from}</div>
            <span className="text-[9px] uppercase tracking-[0.12em] text-[#fffaf1]/36">To</span>
            <div className="border border-[#fffaf1]/12 bg-[#fffaf1]/5 px-2 py-2 text-[12px] leading-5 text-[#fffaf1]/78">{body.positioning.to}</div>
            <span className="text-[9px] uppercase tracking-[0.12em] text-[#fffaf1]/36">Role</span>
            <div className="border border-[#fffaf1]/12 bg-[#fffaf1]/5 px-2 py-2 text-[12px] leading-5 text-[#fffaf1]/62">{body.positioning.role}</div>
          </div>
        </div>

        <div className="p-3">
          <Label className="mb-2">Service hierarchy</Label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {body.serviceHierarchy.map((service, index) => (
              <div key={service} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-2">
                <div className="font-mono text-[10px] tabular-nums text-[#11100d]/30">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-1 text-[12px] leading-4 text-[#11100d]/68">{service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-0 border-b border-[#11100d]/10 lg:grid-cols-3">
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Trust language</Label>
          <ModuleList items={body.trustLanguage} />
        </div>
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Offer architecture</Label>
          <ModuleList items={body.offerArchitecture} />
        </div>
        <div className="p-3">
          <Label className="mb-2">Visual rules</Label>
          <ModuleList items={body.visualRules} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-0 bg-[#f7f1e7] lg:grid-cols-[1fr_0.9fr]">
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Proof pillars</Label>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-5">
            {body.proofPillars.map((pillar) => (
              <div key={pillar} className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-2 text-[11px] leading-4 text-[#11100d]/62">
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
        <Label className="text-[#fffaf1]/42">Patient / lead lifecycle</Label>
        <div className="mt-2 text-[13px] leading-5 text-[#fffaf1]/72">
          Acquisition to retention, with timing and handoff points visible.
        </div>
      </div>

      <section className="grid grid-cols-1 gap-2 p-3 md:grid-cols-2 xl:grid-cols-7">
        {body.stages.map((stage, index) => (
          <div key={stage.name} className="relative border border-[#11100d]/10 bg-[#fffaf1]">
            {index < body.stages.length - 1 && <span className="hidden xl:block absolute -right-2 top-8 z-10 h-px w-4 bg-[#11100d]/18" aria-hidden="true" />}
            <div className="border-b border-[#11100d]/8 bg-[#f7f1e7] px-2 py-2">
              <div className="font-mono text-[10px] tabular-nums text-[#11100d]/30">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[#11100d]/58">{stage.name}</div>
            </div>
            <div className="space-y-1.5 p-2">
              {stage.items.map((item) => (
                <div key={item} className="border-b border-[#11100d]/7 pb-1 text-[10px] leading-4 text-[#11100d]/58 last:border-b-0">
                  {item}
                </div>
              ))}
            </div>
            <div className="border-t border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5">
              <div className="text-[8px] uppercase tracking-[0.12em] text-[#11100d]/32">trigger</div>
              <div className="mt-0.5 text-[10px] leading-4 text-[#11100d]/56">{stage.trigger}</div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/32">handoff</div>
              <div className="mt-0.5 text-[10px] leading-4 text-[#11100d]/60">{stage.handoff}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-[#11100d]/10 bg-[#f7f1e7] p-3">
        <Label className="mb-2">Handoff points</Label>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-4">
          {body.handoffs.map((handoff) => (
            <div key={handoff} className="border border-[#11100d]/8 bg-[#fffaf1] px-2 py-2 text-[11px] leading-4 text-[#11100d]/62">
              {handoff}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CrmStatusFlowBody({ body }) {
  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="border-b border-[#11100d]/10 bg-[#151410] p-3 text-[#fffaf1]">
        <Label className="mb-2 text-[#fffaf1]/42">Tracked fields</Label>
        <div className="flex flex-wrap gap-1.5">
          {body.fields.map((field) => (
            <Tag key={field} dark>{field}</Tag>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-2 p-3 md:grid-cols-4">
        {body.coreStates.map((state, index) => (
          <div key={state} className="relative border border-[#11100d]/10 bg-[#fffaf1] px-2 py-2">
            {index < body.coreStates.length - 1 && <span className="hidden md:block absolute -right-2 top-1/2 z-10 h-px w-4 bg-[#11100d]/18" aria-hidden="true" />}
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] leading-4 text-[#11100d]/70">{state}</span>
              <span className="font-mono text-[9px] tabular-nums text-[#11100d]/28">{String(index + 1).padStart(2, "0")}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 border-t border-[#11100d]/10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="border-b border-[#11100d]/10 bg-[#f7f1e7] p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Side branches</Label>
          <div className="space-y-1.5">
            {body.sideStates.map((state) => (
              <div key={state} className="grid grid-cols-[8px_1fr] border border-[#11100d]/8 bg-[#fffaf1]">
                <span className="h-full min-h-10 bg-[#c8ff62]" aria-hidden="true" />
                <span className="px-2 py-2 text-[11px] leading-4 text-[#11100d]/62">{state}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3">
          <Label className="mb-2">Follow-up rules</Label>
          <div className="space-y-1.5">
            {body.rules.map((rule, index) => (
              <div key={`${rule.from}-${rule.action}`} className="grid grid-cols-1 border border-[#11100d]/8 bg-[#fffaf1] sm:grid-cols-[34px_1fr_1fr_1fr]">
                <span className="border-b border-[#11100d]/8 bg-[#f7f1e7] px-2 py-2 font-mono text-[10px] tabular-nums text-[#11100d]/32 sm:border-b-0 sm:border-r">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="border-b border-[#11100d]/8 px-2 py-2 text-[11px] leading-4 text-[#11100d]/64 sm:border-b-0 sm:border-r">{rule.from}</span>
                <span className="border-b border-[#11100d]/8 px-2 py-2 text-[11px] leading-4 text-[#11100d]/52 sm:border-b-0 sm:border-r">{rule.condition}</span>
                <span className="px-2 py-2 text-[11px] font-medium leading-4 text-[#11100d]/70">{rule.action}</span>
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
                <ProofImage key={image.src} src={image.src} label={image.label} className="aspect-[4/3]" />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-1 gap-1.5">
              {block.points.map((point) => (
                <div key={point} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-1.5 text-[11px] leading-4 text-[#11100d]/60">
                  {point}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 border-b border-[#11100d]/10 lg:grid-cols-[1fr_0.8fr]">
        <div className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r">
          <Label className="mb-2">Content system</Label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {body.contentSystem.map((item) => (
              <div key={item} className="border border-[#11100d]/8 bg-[#f7f1e7] px-2 py-2 text-[11px] leading-4 text-[#11100d]/62">
                {item}
              </div>
            ))}
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
  const zones = [
    ["Offer module", body.offerModule],
    ["Audience angle", body.audienceAngles],
    ["Creative modules", body.creativeModules],
    ["Capture path", body.capturePath],
    ["Follow-up path", body.followUpPath],
    ["Performance read", body.performanceRead]
  ];

  return (
    <div className="overflow-hidden border border-[#11100d]/12 bg-[#fffaf1]">
      <section className="grid grid-cols-1 gap-0 border-b border-[#11100d]/10 lg:grid-cols-3">
        {zones.map(([label, items]) => (
          <div key={label} className="border-b border-[#11100d]/10 p-3 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <Label className="mb-2">{label}</Label>
            <ModuleList items={items} />
          </div>
        ))}
      </section>

      <section className="bg-[#f7f1e7] p-3">
        <Label className="mb-2">Campaign proof tiles</Label>
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
          <span className="mt-1 block">{footerNote.replace(/^What this proves:\s*/i, "")}</span>
        </div>
      )}
    </article>
  );
}
