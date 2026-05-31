import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Command, Eye, Filter, Search, X } from "lucide-react";

const profile = {
  role: "Design technologist · creative systems · product growth",
  intro:
    "I work in the messy middle between product, brand, growth, and operations. My edge is turning scattered business problems into clear systems people can actually use.",
  lookingFor: ["design technologist", "creative technologist", "product systems", "growth design"],
  currentFocus: ["AI assisted workflows", "brand systems", "lifecycle architecture", "internal tools"],
  contact: "hello@amydo.dev",
  resumeHref: "/Amy%20Do.pdf"
};

const records = [
  {
    id: "01",
    slug: "clinic-brand-system",
    title: "Clinic Brand System",
    category: "brand operations",
    type: "brand system",
    status: "shipped",
    timeline: "2023 / 2024",
    accent: "#c8ff62",
    thesis: "A clinic brand rebuilt as operating infrastructure, not campaign decoration.",
    oneLine: "Brand, lifecycle, CRM, and offer logic unified into one clinic growth system.",
    role: "Lead systems designer",
    tools: ["Figma", "Airtable", "Mailchimp", "Webflow", "Zapier", "Meta Ads"],
    metrics: [
      { value: "6+", label: "service lines unified" },
      { value: "+40%", label: "lead conversion lift" },
      { value: "3.2x", label: "ROAS on offer test" }
    ],
    path: ["positioning", "service logic", "lead source", "CRM state", "lifecycle", "measurement"],
    signal: "Ads, pages, consult language, follow up, and reporting were telling different stories.",
    system: "A unified operating layer connected positioning, offer structure, lifecycle messaging, CRM states, and measurement.",
    decisions: [
      { label: "constraint", body: "Clinical category, high competition, promo fatigue, limited team bandwidth." },
      { label: "move", body: "Replace one off promo work with reusable offer logic by service line." },
      { label: "tradeoff", body: "More upfront alignment, less downstream chaos." },
      { label: "principle", body: "Clarity over cleverness. Consistency over isolated expression." }
    ],
    receipts: [
      {
        name: "Smooth MD brand framework",
        format: "strategy system",
        claim: "Shows the shift from service promos to a unified product marketing system.",
        proof: "+40% lead conversion lift in Q1 and 3.2x ROAS on microneedling offer testing.",
        contents: ["Skin to the Future", "Progress > Perfection", "Aesthetic Advocacy", "service offer hierarchy", "clinical minimal visual rules"]
      },
      {
        name: "Lifecycle map",
        format: "journey flow",
        claim: "Shows acquisition, nurture, and booking behavior connected as one system.",
        proof: "Welcome, service interest, abandonment, and Day 21 reactivation paths.",
        contents: ["Meta lead to Airtable", "website lead to CRM", "Mailchimp service tags", "2 day follow up", "Day 21 reactivation"]
      },
      {
        name: "CRM status logic",
        format: "ops map",
        claim: "Shows the operational layer behind the creative system.",
        proof: "Lead source, service interest, booking stage, and revenue signal mapped for follow up.",
        contents: ["lead source", "brand tag", "booked", "arrived", "converted", "revenue attribution"]
      },
      {
        name: "Campaign toolkit",
        format: "creative system",
        claim: "Shows how the brand system became repeatable production infrastructure.",
        proof: "Ad hooks, landing sections, email blocks, CTA logic, and proof layouts.",
        contents: ["ad hooks", "offer modules", "landing page sections", "email blocks", "social proof layouts"]
      }
    ]
  },
  {
    id: "02",
    slug: "mirror",
    title: "Mirror",
    category: "product ux",
    type: "product system",
    status: "prototype",
    timeline: "2024",
    accent: "#c7b2ff",
    thesis: "An emotional signal system designed to stay usable under cognitive load.",
    oneLine: "Affective UX, signal logic, Storybook states, and calm product language.",
    role: "Systems designer",
    tools: ["Figma", "Storybook", "React", "Replit", "localStorage", "AI workflows"],
    metrics: [
      { value: "8", label: "signal states" },
      { value: "10", label: "test scenarios" },
      { value: "12", label: "responsive states" }
    ],
    path: ["check in", "normalize", "detect", "explain", "suggest", "learn"],
    signal: "Most wellness products turn self awareness into another performance loop.",
    system: "A signal interpretation layer translated fuzzy mood inputs into calm feedback, confidence language, and reusable UI states.",
    decisions: [
      { label: "constraint", body: "Sensitive emotional context with prototype level engineering limits." },
      { label: "move", body: "Prioritize calm feedback over gamified progress." },
      { label: "tradeoff", body: "Less novelty, more trust and legibility." },
      { label: "principle", body: "Make the system understandable before making it expressive." }
    ],
    receipts: [
      {
        name: "Signal interpretation map",
        format: "logic diagram",
        claim: "Shows fuzzy emotional inputs becoming structured product logic.",
        proof: "8 signal states using energy, tension, clarity, sleep, and confidence labels.",
        contents: ["energy range", "tension range", "clarity range", "sleep quality", "state detection", "confidence labels"]
      },
      {
        name: "Storybook component environment",
        format: "component QA",
        claim: "Shows design to development work beyond static Figma screens.",
        proof: "10 stories covering UI states, edge cases, responsive behavior, and implementation handoff.",
        contents: ["SignalSparkline", "BodyWeatherHero", "SimilarDays", "GentleNextMove", "DebugPanel", "MSW setup"]
      },
      {
        name: "Feedback store logic",
        format: "prototype logic",
        claim: "Shows lightweight product learning without a heavy backend.",
        proof: "localStorage patterns connected check ins, feedback, suggestion scoring, and similar days.",
        contents: ["mirror_checkins", "mirror_feedback", "suggestion scoring", "pattern frequency", "similar day matching"]
      },
      {
        name: "Debug and QA overlay",
        format: "testing artifact",
        claim: "Shows inspection and testing built into the product environment.",
        proof: "Triple click debug trigger, pipeline view, and 10 test cases.",
        contents: ["pipeline view", "test cases", "Esc behavior", "responsive checks", "frayed edge case"]
      }
    ]
  },
  {
    id: "03",
    slug: "meta-airtable-dashboard",
    title: "Meta + Airtable Intelligence Layer",
    category: "analytics",
    type: "analytics system",
    status: "built",
    timeline: "2025",
    accent: "#b6f3d4",
    thesis: "A reporting layer connecting ad spend to lead quality, booking behavior, and revenue signals.",
    oneLine: "Meta performance, CRM state, ROAS, and attribution confidence in one decision layer.",
    role: "Dashboard and attribution systems designer",
    tools: ["React", "Airtable", "Meta Marketing API", "Zapier", "Replit", "OpenAI"],
    metrics: [
      { value: "3", label: "core data tables" },
      { value: "live", label: "sync logic" },
      { value: "ROAS", label: "revenue view" }
    ],
    path: ["ad spend", "lead", "CRM state", "booking", "revenue", "decision"],
    signal: "Meta showed form volume, but the business needed quality, movement, and revenue context.",
    system: "A dashboard model pulled campaign performance, CRM status, revenue attribution, and fallback logic into one decision view.",
    decisions: [
      { label: "constraint", body: "Lead quality mattered more than surface volume, but CRM updates were uneven." },
      { label: "move", body: "Track funnel state instead of stopping at CPL." },
      { label: "tradeoff", body: "Use attribution confidence instead of fake precision." },
      { label: "principle", body: "Dashboards should tell teams what to do next." }
    ],
    receipts: [
      {
        name: "Leads_Master table logic",
        format: "data model",
        claim: "Shows the data spine behind the dashboard.",
        proof: "Lead source, service interest, status, booking behavior, and conversion value mapped together.",
        contents: ["lead source", "campaign", "service interest", "status", "booking behavior", "conversion value"]
      },
      {
        name: "Campaign_Performance logic",
        format: "analytics table",
        claim: "Shows paid media metrics structured for decisions, not screenshots.",
        proof: "Spend, leads, CPL, CTR, ROAS, creative angle, and fallback generation.",
        contents: ["campaign name", "spend", "leads", "CPL", "CTR", "ROAS", "creative angle"]
      },
      {
        name: "Revenue_Attribution model",
        format: "logic layer",
        claim: "Shows the bridge between marketing activity and business outcome.",
        proof: "Booking value, converted revenue, campaign source, confidence score, and LTV signal.",
        contents: ["booking value", "converted revenue", "source campaign", "confidence score", "LTV signal"]
      },
      {
        name: "Decision dashboard UI",
        format: "interface system",
        claim: "Shows analytics becoming usable for weekly optimization.",
        proof: "Campaign health, funnel breakdowns, creative insights, and next action prompts.",
        contents: ["campaign cards", "funnel metrics", "lead status", "creative insights", "next action prompts"]
      }
    ]
  },
  {
    id: "04",
    slug: "snip-provider-pipeline",
    title: "Snip Provider Pipeline",
    category: "operations",
    type: "growth system",
    status: "scaled",
    timeline: "2024",
    accent: "#9fe7ff",
    thesis: "A messy research process turned into a repeatable provider acquisition pipeline.",
    oneLine: "Provider research, image sourcing, validation, and publishing handoff automated with quality gates.",
    role: "Workflow designer",
    tools: ["Python", "NPPES API", "OpenCV", "Bing search", "Google Maps", "spreadsheets"],
    metrics: [
      { value: "200+", label: "profiles processed" },
      { value: "90%", label: "manual sourcing reduced" },
      { value: "1", label: "repeatable pipeline" }
    ],
    path: ["source", "enrich", "validate", "score", "organize", "publish"],
    signal: "Every provider profile required repeated searching, checking, downloading, renaming, and organizing.",
    system: "A repeatable workflow handled provider discovery, data enrichment, headshot sourcing, face validation, and asset organization.",
    decisions: [
      { label: "constraint", body: "Variable public data, inconsistent image quality, trust critical provider info." },
      { label: "move", body: "Automate first pass, keep human review for sensitive fields." },
      { label: "tradeoff", body: "Speed gains required strict quality gates." },
      { label: "principle", body: "Automation should remove drag, not judgment." }
    ],
    receipts: [
      {
        name: "NPPES provider pull",
        format: "Python workflow",
        claim: "Shows real automation beyond no code workflow glue.",
        proof: "Structured discovery for roughly 200 provider profiles.",
        contents: ["provider name", "taxonomy", "location", "clinic info", "profile fields", "source references"]
      },
      {
        name: "Headshot and clinic image sourcing",
        format: "asset pipeline",
        claim: "Shows data enrichment connected to publish ready assets.",
        proof: "Bing image search, Google Maps clinic photos, fallback sourcing, and local saves.",
        contents: ["provider headshots", "clinic exterior photos", "image source tracking", "local file saves"]
      },
      {
        name: "OpenCV face validation",
        format: "quality gate",
        claim: "Shows automated QA with human judgment still preserved.",
        proof: "Face detection used before accepting provider images.",
        contents: ["face presence detection", "bad image rejection", "manual review queue", "quality threshold"]
      },
      {
        name: "Structured asset folders",
        format: "handoff system",
        claim: "Shows the final mile of automation: clean handoff for humans.",
        proof: "Profile ready folders, renamed assets, spreadsheet references, and publish states.",
        contents: ["provider folders", "renamed assets", "spreadsheet references", "publish status", "review state"]
      }
    ]
  },
  {
    id: "05",
    slug: "retention-engine",
    title: "Retention Engine",
    category: "retention",
    type: "lifecycle system",
    status: "live",
    timeline: "2024",
    accent: "#ffd1a1",
    thesis: "A lifecycle system built around timing, intent, and trust instead of generic email blasts.",
    oneLine: "Service specific nurture logic for multi brand lead follow up and reactivation.",
    role: "Lifecycle systems lead",
    tools: ["Mailchimp", "Airtable", "Zapier", "Figma", "HTML email"],
    metrics: [
      { value: "4", label: "flow types" },
      { value: "21d", label: "reactivation window" },
      { value: "multi", label: "brand logic" }
    ],
    path: ["source", "intent", "service", "timing", "message", "booking"],
    signal: "Website leads, Meta leads, consult inquiries, and abandoned interest signals were collapsing into one generic rhythm.",
    system: "Welcome, interest based, abandonment style, and promotional lifecycle logic connected to brand tags and CRM status.",
    decisions: [
      { label: "constraint", body: "Mixed lead intent and uneven booking readiness across service lines." },
      { label: "move", body: "Separate passive Meta leads from higher intent website leads." },
      { label: "tradeoff", body: "More segmentation meant more setup discipline." },
      { label: "principle", body: "Timing is part of the message." }
    ],
    receipts: [
      {
        name: "Four flow lifecycle model",
        format: "journey system",
        claim: "Shows full nurture logic instead of isolated campaign emails.",
        proof: "Welcome, service interest, abandonment, and weekly educational promo paths.",
        contents: ["welcome flow", "service interest", "abandonment style email", "weekly promo"]
      },
      {
        name: "Multi brand tag map",
        format: "CRM logic",
        claim: "Shows a messy multi brand operation becoming sortable and actionable.",
        proof: "Smooth MD, Dr. Vigor, Dr. Neo, Dr. Food, Dr. Freeze, and Dr. Sculpt lead routing.",
        contents: ["brand", "service", "source", "status", "lead intent", "follow up state"]
      },
      {
        name: "Follow up timing rules",
        format: "ops protocol",
        claim: "Shows timing handled as part of the system, not just copy.",
        proof: "2 day follow up, provider named reminder, Day 21 reactivation, status based exclusions.",
        contents: ["2 day not closed", "provider name", "Day 21 promo", "status exclusions"]
      },
      {
        name: "HTML email system",
        format: "production template",
        claim: "Shows email work built for real inbox conditions.",
        proof: "600px wrapper, hybrid responsive layout, dark mode meta, VML Outlook support.",
        contents: ["600px wrapper", "hybrid responsive", "dark mode meta", "VML Outlook", "Mailchimp modules"]
      }
    ]
  }
];

const filters = ["all", "brand operations", "product ux", "analytics", "operations", "retention"];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AccentDot({ record, size = "h-2 w-2" }) {
  return <span className={cx("rounded-full", size)} style={{ backgroundColor: record.accent }} />;
}

function MetricPill({ metric, dark = false }) {
  return (
    <div className={cx("rounded-full border px-3 py-2", dark ? "border-[#f7f1e7]/12 bg-[#f7f1e7]/5" : "border-[#11100d]/10 bg-[#fffaf1]/65")}>
      <div className={cx("text-[17px] font-medium leading-none tracking-[-0.025em]", dark ? "text-[#f7f1e7]" : "text-[#11100d]")}>{metric.value}</div>
      <div className={cx("mt-1 text-[9px] uppercase tracking-[0.14em]", dark ? "text-[#f7f1e7]/42" : "text-[#11100d]/42")}>{metric.label}</div>
    </div>
  );
}

function TopBar({ search, setSearch, mode, setMode }) {
  return (
    <header className="grid grid-cols-1 gap-3 border-b border-[#11100d]/10 bg-[#f7f1e7]/88 px-4 py-4 backdrop-blur-xl lg:grid-cols-[300px_1fr_320px] lg:px-6">
      <div className="flex items-center justify-between lg:justify-start lg:gap-4">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#11100d]">
          <span className="h-2 w-2 rounded-full bg-[#11100d]" />
          <span>Amy Do</span>
        </div>
        <span className="rounded-full border border-[#11100d]/10 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/48">v10</span>
      </div>

      <label className="flex min-w-0 items-center gap-3 rounded-full border border-[#11100d]/10 bg-[#fffaf1]/74 px-4 py-2">
        <Search className="h-4 w-4 text-[#11100d]/34" />
        <input
          data-archive-search
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="search systems, tools, receipts"
          className="w-full bg-transparent text-sm text-[#11100d] outline-none placeholder:text-[#11100d]/34"
        />
        <span className="hidden rounded-full border border-[#11100d]/10 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/36 sm:block">/</span>
      </label>

      <div className="grid grid-cols-2 gap-2 rounded-full border border-[#11100d]/10 bg-[#fffaf1]/70 p-1">
        {[
          ["overview", "overview"],
          ["proof", "proof mode"]
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={cx(
              "rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.16em] transition",
              mode === value ? "bg-[#11100d] text-[#f7f1e7]" : "text-[#11100d]/46 hover:text-[#11100d]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}

function RecordRail({ recordsList, activeRecord, setActiveRecord, openWorkspace, activeFilter, setActiveFilter }) {
  return (
    <aside className="border-r border-[#11100d]/10 bg-[#f0eadf]/68 p-4 lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#11100d]/42">records</div>
        <Filter className="h-3.5 w-3.5 text-[#11100d]/34" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cx(
              "rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] transition",
              activeFilter === filter
                ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]"
                : "border-[#11100d]/10 text-[#11100d]/44 hover:border-[#11100d]/24 hover:text-[#11100d]"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {recordsList.length > 0 ? (
          recordsList.map((record) => {
            const active = activeRecord.slug === record.slug;
            return (
              <button
                key={record.slug}
                type="button"
                onClick={() => setActiveRecord(record)}
                onDoubleClick={() => openWorkspace(record)}
                className={cx(
                  "group w-full rounded-[24px] border p-4 text-left transition",
                  active ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]" : "border-[#11100d]/10 bg-[#fffaf1]/50 text-[#11100d] hover:border-[#11100d]/24 hover:bg-[#fffaf1]"
                )}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className={cx("text-[10px] uppercase tracking-[0.2em]", active ? "text-[#f7f1e7]/46" : "text-[#11100d]/40")}>{record.id}</span>
                  <AccentDot record={record} size="h-2.5 w-2.5" />
                </div>
                <div className="text-[22px] leading-[1.02] tracking-[-0.035em]">{record.title}</div>
                <div className={cx("mt-3 text-[10px] uppercase tracking-[0.14em]", active ? "text-[#f7f1e7]/42" : "text-[#11100d]/42")}>{record.status} / {record.type}</div>
              </button>
            );
          })
        ) : (
          <div className="rounded-[24px] border border-[#11100d]/10 bg-[#fffaf1]/55 p-4 text-sm leading-6 text-[#11100d]/58">No matching records.</div>
        )}
      </div>
    </aside>
  );
}

function SystemPath({ record, dark = false }) {
  return (
    <div className={cx("rounded-[32px] border p-4", dark ? "border-[#f7f1e7]/10 bg-[#f7f1e7]/5" : "border-[#11100d]/10 bg-[#fffaf1]/64")}>
      <div className={cx("mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]", dark ? "text-[#f7f1e7]/38" : "text-[#11100d]/38")}>
        <span>system path</span>
        <span>{record.id}</span>
      </div>
      <div className="grid gap-2 md:grid-cols-6">
        {record.path.map((step, index) => (
          <div key={step} className="relative">
            <div className={cx("grid min-h-16 place-items-center rounded-[20px] border px-2 text-center text-[10px] uppercase tracking-[0.13em]", dark ? "border-[#f7f1e7]/10 bg-[#f7f1e7]/5 text-[#f7f1e7]/62" : "border-[#11100d]/10 bg-[#f7f1e7] text-[#11100d]/62")}>{step}</div>
            {index < record.path.length - 1 ? <span className={cx("absolute left-full top-1/2 z-10 hidden h-px w-2 md:block", dark ? "bg-[#f7f1e7]/20" : "bg-[#11100d]/20")} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileStrip() {
  return (
    <section className="mt-5 grid gap-3 rounded-[32px] border border-[#11100d]/10 bg-[#fffaf1]/58 p-4 lg:grid-cols-[1.15fr_0.85fr_0.85fr_180px] lg:p-5">
      <div>
        <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">who amy is</div>
        <p className="max-w-xl text-base leading-7 tracking-[-0.012em] text-[#11100d]/68">{profile.intro}</p>
      </div>

      <div>
        <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">looking for</div>
        <div className="flex flex-wrap gap-2">
          {profile.lookingFor.map((item) => (
            <span key={item} className="rounded-full border border-[#11100d]/10 px-3 py-2 text-[10px] uppercase tracking-[0.13em] text-[#11100d]/58">{item}</span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">current focus</div>
        <div className="grid gap-2">
          {profile.currentFocus.map((item) => (
            <div key={item} className="text-sm leading-5 text-[#11100d]/62">→ {item}</div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3">
        <div>
          <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">contact</div>
          <a href={`mailto:${profile.contact}`} className="text-sm text-[#11100d]/70 underline decoration-[#11100d]/20 underline-offset-4 hover:text-[#11100d]">{profile.contact}</a>
        </div>
        <a href={profile.resumeHref} className="inline-flex items-center justify-center rounded-full bg-[#11100d] px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#f7f1e7] transition hover:scale-[1.02]">
          résumé
        </a>
      </div>
    </section>
  );
}

function ActiveCanvas({ record, mode, openWorkspace }) {
  return (
    <main className="min-h-[calc(100vh-73px)] overflow-hidden bg-[#f7f1e7] p-4 lg:p-6">
      <section className="grid min-h-full grid-rows-[auto_1fr_auto] rounded-[36px] border border-[#11100d]/10 bg-[#fffaf1]/44 p-5 shadow-[0_30px_120px_rgba(17,16,13,0.06)] lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#11100d]/44">
            <Command className="h-3.5 w-3.5" />
            <span>Designed to last.</span>
            <span className="hidden h-px w-10 bg-[#11100d]/14 sm:block" />
            <span>Built by Amy Do.</span>
          </div>
          <button
            type="button"
            onClick={() => openWorkspace(record)}
            className="flex items-center gap-2 rounded-full bg-[#11100d] px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#f7f1e7] transition hover:scale-[1.02]"
          >
            open case file <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${record.slug}-${mode}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 py-12 xl:grid-cols-[1fr_360px] xl:items-end"
          >
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {[record.category, record.timeline, record.status].map((item) => (
                  <span key={item} className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7]/72 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#11100d]/44">{item}</span>
                ))}
              </div>
              <h1 className="max-w-4xl text-[44px] font-normal leading-[0.98] tracking-[-0.045em] text-[#11100d] sm:text-[62px] xl:text-[76px]">
                {mode === "proof" ? record.title : record.thesis}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 tracking-[-0.012em] text-[#11100d]/64">{mode === "proof" ? record.oneLine : record.system}</p>
            </div>

            <div className="grid gap-3">
              {record.metrics.map((metric) => <MetricPill key={metric.label} metric={metric} />)}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <SystemPath record={record} />
          <div className="rounded-[32px] bg-[#11100d] p-5 text-[#f7f1e7]">
            <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#f7f1e7]/40">
              <span>decision logic</span>
              <AccentDot record={record} size="h-2.5 w-2.5" />
            </div>
            <div className="space-y-4">
              {record.decisions.slice(0, 2).map((decision) => (
                <div key={decision.label}>
                  <div className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#f7f1e7]/32">{decision.label}</div>
                  <p className="text-sm leading-6 text-[#f7f1e7]/68">{decision.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProfileStrip />
      </section>
    </main>
  );
}

function ProofRail({ record, activeReceipt, setActiveReceipt, mode }) {
  const selectedReceipt = activeReceipt || record.receipts[0];

  useEffect(() => {
    setActiveReceipt(record.receipts[0]);
  }, [record, setActiveReceipt]);

  return (
    <aside className="border-l border-[#11100d]/10 bg-[#f0eadf]/68 p-4 lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#11100d]/42">receipt inspector</div>
        <Eye className="h-3.5 w-3.5 text-[#11100d]/34" />
      </div>

      <div className="rounded-[28px] bg-[#11100d] p-5 text-[#f7f1e7]">
        <div className="mb-9 flex items-center justify-between">
          <AccentDot record={record} size="h-3 w-3" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#f7f1e7]/36">{selectedReceipt.format}</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#f7f1e7]/38">selected receipt</div>
        <h2 className="mt-3 text-[30px] leading-[1] tracking-[-0.045em]">{selectedReceipt.name}</h2>
        <p className="mt-5 text-sm leading-6 text-[#f7f1e7]/66">{selectedReceipt.claim}</p>
      </div>

      <div className="mt-4 grid gap-2">
        {record.receipts.map((receipt) => {
          const active = selectedReceipt.name === receipt.name;
          return (
            <button
              key={receipt.name}
              type="button"
              onClick={() => setActiveReceipt(receipt)}
              className={cx(
                "rounded-[22px] border p-4 text-left transition",
                active ? "border-[#11100d] bg-[#fffaf1]" : "border-[#11100d]/10 bg-[#fffaf1]/48 hover:border-[#11100d]/24 hover:bg-[#fffaf1]"
              )}
            >
              <div className="mb-4 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#11100d]/34">
                <span>{receipt.format}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
              <div className="text-[16px] leading-[1.1] tracking-[-0.02em] text-[#11100d]">{receipt.name}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/62 p-5">
        <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#11100d]/38">proof</div>
        <p className="text-[22px] leading-[1.16] tracking-[-0.035em] text-[#11100d]">{selectedReceipt.proof}</p>
        {mode === "proof" ? (
          <div className="mt-5 grid gap-2">
            {selectedReceipt.contents.map((item) => (
              <div key={item} className="rounded-full border border-[#11100d]/10 px-3 py-2 text-xs text-[#11100d]/62">{item}</div>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}

function CaseWorkspace({ record, onClose }) {
  const [activeReceipt, setActiveReceipt] = useState(record.receipts[0]);
  const [section, setSection] = useState("system");

  useEffect(() => {
    setActiveReceipt(record.receipts[0]);
    setSection("system");
  }, [record]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050504]/78 p-2 backdrop-blur-2xl lg:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.div
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.985 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid h-full max-w-[1480px] overflow-hidden rounded-[36px] bg-[#f7f1e7] text-[#11100d] shadow-[0_50px_160px_rgba(0,0,0,0.52)] lg:grid-cols-[250px_1fr_420px]"
      >
        <aside className="hidden border-r border-[#11100d]/10 bg-[#f0eadf]/72 p-5 lg:block">
          <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#11100d]/42">
            <span>case file</span>
            <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-[#11100d]/10 hover:border-[#11100d]/24" aria-label="Close case file"><X className="h-4 w-4" /></button>
          </div>
          <AccentDot record={record} size="h-3 w-3" />
          <h2 className="mt-5 text-[34px] leading-[1] tracking-[-0.045em]">{record.title}</h2>
          <p className="mt-5 text-sm leading-6 text-[#11100d]/58">{record.oneLine}</p>

          <nav className="mt-8 grid gap-2">
            {["system", "decisions", "receipts"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSection(item)}
                className={cx("rounded-full px-4 py-3 text-left text-[10px] uppercase tracking-[0.16em] transition", section === item ? "bg-[#11100d] text-[#f7f1e7]" : "text-[#11100d]/46 hover:bg-[#fffaf1] hover:text-[#11100d]")}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="overflow-y-auto p-5 lg:p-8">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#11100d]/42">case file / {record.id}</div>
            <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-[#11100d]/10" aria-label="Close case file"><X className="h-4 w-4" /></button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {[record.status, record.timeline, record.category].map((item) => <span key={item} className="rounded-full border border-[#11100d]/10 bg-[#fffaf1]/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#11100d]/44">{item}</span>)}
          </div>

          <h1 className="max-w-4xl text-[42px] leading-[0.98] tracking-[-0.045em] sm:text-[58px] lg:text-[72px]">{record.thesis}</h1>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {record.metrics.map((metric) => <MetricPill key={metric.label} metric={metric} />)}
          </div>

          <div className="mt-10 grid gap-5">
            {section === "system" ? (
              <>
                <div className="rounded-[32px] bg-[#11100d] p-6 text-[#f7f1e7]">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#f7f1e7]/38">signal detected</div>
                  <p className="max-w-3xl text-[26px] leading-[1.16] tracking-[-0.035em]">{record.signal}</p>
                </div>
                <div className="rounded-[32px] border border-[#11100d]/10 bg-[#fffaf1]/64 p-6">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#11100d]/38">system introduced</div>
                  <p className="max-w-3xl text-[24px] leading-[1.18] tracking-[-0.03em] text-[#11100d]">{record.system}</p>
                </div>
                <SystemPath record={record} />
              </>
            ) : null}

            {section === "decisions" ? (
              <div className="grid gap-3">
                {record.decisions.map((decision, index) => (
                  <div key={decision.label} className="grid gap-4 rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/66 p-5 sm:grid-cols-[140px_1fr]">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#11100d]/36">{String(index + 1).padStart(2, "0")} / {decision.label}</div>
                    <p className="text-[22px] leading-[1.18] tracking-[-0.035em]">{decision.body}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {section === "receipts" ? (
              <div className="grid gap-3">
                {record.receipts.map((receipt) => (
                  <button
                    key={receipt.name}
                    type="button"
                    onClick={() => setActiveReceipt(receipt)}
                    className={cx("rounded-[28px] border p-5 text-left transition", activeReceipt.name === receipt.name ? "border-[#11100d] bg-[#fffaf1]" : "border-[#11100d]/10 bg-[#fffaf1]/52 hover:border-[#11100d]/24")}
                  >
                    <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">
                      <span>{receipt.format}</span>
                      <Eye className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-[30px] leading-[1] tracking-[-0.045em]">{receipt.name}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-[#11100d]/60">{receipt.claim}</p>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </main>

        <aside className="border-l border-[#11100d]/10 bg-[#11100d] p-5 text-[#f7f1e7] lg:overflow-y-auto">
          <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#f7f1e7]/38">
            <span>inspector</span>
            <AccentDot record={record} size="h-2.5 w-2.5" />
          </div>
          <div className="rounded-[28px] bg-[#f7f1e7] p-5 text-[#11100d]">
            <div className="mb-10 text-[10px] uppercase tracking-[0.2em] text-[#11100d]/38">active receipt</div>
            <h3 className="text-[30px] leading-[1] tracking-[-0.045em]">{activeReceipt.name}</h3>
            <p className="mt-5 text-sm leading-6 text-[#11100d]/64">{activeReceipt.claim}</p>
          </div>
          <div className="mt-5 rounded-[28px] border border-[#f7f1e7]/10 p-5">
            <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#f7f1e7]/38">proof point</div>
            <p className="text-[22px] leading-[1.16] tracking-[-0.035em]">{activeReceipt.proof}</p>
          </div>
          <div className="mt-5 grid gap-2">
            {activeReceipt.contents.map((item) => (
              <div key={item} className="rounded-full border border-[#f7f1e7]/10 px-4 py-3 text-sm text-[#f7f1e7]/68">{item}</div>
            ))}
          </div>
        </aside>
      </motion.div>
    </motion.div>
  );
}

export default function UndonePortfolioV10() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("overview");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeRecord, setActiveRecord] = useState(records[0]);
  const [activeReceipt, setActiveReceipt] = useState(records[0].receipts[0]);
  const [workspaceRecord, setWorkspaceRecord] = useState(null);

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return records.filter((record) => {
      const matchesFilter = activeFilter === "all" || record.category === activeFilter;
      const searchable = [
        record.title,
        record.category,
        record.type,
        record.status,
        record.thesis,
        record.oneLine,
        record.role,
        ...record.tools,
        ...record.receipts.flatMap((receipt) => [receipt.name, receipt.format, receipt.claim, receipt.proof, ...receipt.contents])
      ]
        .join(" ")
        .toLowerCase();
      return matchesFilter && (!normalized || searchable.includes(normalized));
    });
  }, [activeFilter, query]);

  useEffect(() => {
    if (!filteredRecords.some((record) => record.slug === activeRecord.slug)) {
      const next = filteredRecords[0] || records[0];
      setActiveRecord(next);
      setActiveReceipt(next.receipts[0]);
    }
  }, [activeRecord.slug, filteredRecords]);

  useEffect(() => {
    setActiveReceipt(activeRecord.receipts[0]);
  }, [activeRecord]);

  useEffect(() => {
    function handleKeyDown(event) {
      const activeTag = document.activeElement?.tagName;
      const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";

      if (event.key === "Escape") setWorkspaceRecord(null);

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        document.querySelector("[data-archive-search]")?.focus();
      }

      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && filteredRecords.length > 0 && !isTyping) {
        event.preventDefault();
        const currentIndex = filteredRecords.findIndex((record) => record.slug === activeRecord.slug);
        if (currentIndex === -1) return;
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const next = filteredRecords[(currentIndex + direction + filteredRecords.length) % filteredRecords.length];
        if (next) setActiveRecord(next);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeRecord.slug, filteredRecords]);

  return (
    <div className="min-h-screen bg-[#0b0b09] font-sans text-[#11100d]">
      <div className="mx-auto min-h-screen max-w-[1720px] bg-[#f7f1e7] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none fixed inset-0 opacity-[0.45] [background-image:radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.85),transparent_28%),linear-gradient(rgba(17,16,13,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(17,16,13,0.028)_1px,transparent_1px)] [background-size:auto,38px_38px,38px_38px]" />
        <div className="relative z-10">
          <TopBar search={query} setSearch={setQuery} mode={mode} setMode={setMode} />

          <div className="grid lg:grid-cols-[320px_1fr_360px]">
            <RecordRail
              recordsList={filteredRecords}
              activeRecord={activeRecord}
              setActiveRecord={setActiveRecord}
              openWorkspace={setWorkspaceRecord}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <ActiveCanvas record={activeRecord} mode={mode} openWorkspace={setWorkspaceRecord} />
            <ProofRail record={activeRecord} activeReceipt={activeReceipt} setActiveReceipt={setActiveReceipt} mode={mode} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {workspaceRecord ? <CaseWorkspace record={workspaceRecord} onClose={() => setWorkspaceRecord(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}
