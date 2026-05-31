import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import ArtifactCard from "../ui/ArtifactCard";
import MetricPill from "../ui/MetricPill";
import { cx } from "../../utils/cx";
import { profile } from "../../data/profile";
import { CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "proof", label: "Proof" },
  { id: "artifacts", label: "Artifacts" },
];

// ─── Overview Tab ────────────────────────────────────────────────────────────

function OverviewTab({ record, mode, openWorkspace }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="space-y-4 px-4 py-4">
      {/* Identity summary — resume + contact visible immediately */}
      <div className="rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/36">
              Amy Do
            </div>
            <p className="text-[13px] font-medium leading-5 tracking-[-0.01em] text-[#11100d]">
              {profile.positioning}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <a
              href={profile.resumeHref}
              aria-label="Download Amy Do's resume"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#11100d] px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#f7f1e7] transition active:scale-[0.98]"
            >
              résumé
            </a>
            <a
              href={`mailto:${profile.contact}`}
              aria-label={`Email Amy Do at ${profile.contact}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#11100d]/12 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/60 transition active:scale-[0.98]"
            >
              contact
            </a>
          </div>
        </div>

        {/* Collapsible extended profile */}
        <button
          type="button"
          aria-label={showMore ? "Hide extended profile details" : "Show more about Amy"}
          aria-expanded={showMore}
          onClick={() => setShowMore((v) => !v)}
          className="mt-3 flex w-full items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/44"
        >
          more about Amy
          <ChevronDown className={cx("h-3.5 w-3.5 transition-transform", showMore && "rotate-180")} />
        </button>

        {showMore && (
          <div className="mt-3 space-y-3 border-t border-[#11100d]/10 pt-3">
            <div>
              <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Role fit</div>
              <div className="flex flex-wrap gap-1.5">
                {profile.roleFits.map((item) => (
                  <span key={item} className="rounded-full border border-[#11100d]/10 px-3 py-1.5 text-[10px] text-[#11100d]/62">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Tool fluency</div>
              <div className="flex flex-wrap gap-1.5">
                {profile.toolFluency.map((item) => (
                  <span key={item} className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7]/60 px-3 py-1.5 text-[10px] text-[#11100d]/62">{item}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Case header */}
      <div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {[record.category, record.timeline, record.status].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7]/72 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#11100d]/44"
            >
              {item}
            </span>
          ))}
        </div>
        <h1 className="text-[34px] font-normal leading-[1.0] tracking-[-0.04em] text-[#11100d]">
          {mode === "proof" ? record.title : record.thesis}
        </h1>
        <p className="mt-3 text-[14px] leading-6 tracking-[-0.01em] text-[#11100d]/64">
          {mode === "proof" ? record.oneLine : record.system}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-2">
        {record.metrics.map((metric) => (
          <MetricPill key={metric.label} metric={metric} />
        ))}
      </div>

      {/* System path - compact numbered list */}
      <div className="rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1]/64 p-4">
        <div className="mb-3 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">
          System path
        </div>
        <ol className="space-y-2">
          {record.path.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#11100d]/10 bg-[#f7f1e7] text-[9px] uppercase tracking-[0.08em] text-[#11100d]/48">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[12px] uppercase tracking-[0.12em] text-[#11100d]/70">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Decision logic preview */}
      <div className="rounded-[18px] bg-[#11100d] p-4 text-[#f7f1e7]">
        <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#f7f1e7]/40">
          <span>Decision logic</span>
          <AccentDot record={record} size="h-2.5 w-2.5" />
        </div>
        {record.decisions.slice(0, 2).map((decision) => (
          <div key={decision.label} className="mb-3 last:mb-0">
            <div className="mb-1 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/32">
              {decision.label}
            </div>
            <p className="text-[13px] leading-5 text-[#f7f1e7]/68">{decision.body}</p>
          </div>
        ))}
      </div>

      {/* Open case file CTA */}
      <button
        type="button"
        aria-label={`Open ${record.title} case file`}
        onClick={() => openWorkspace(record)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#11100d] px-4 py-4 text-[10px] uppercase tracking-[0.16em] text-[#f7f1e7] transition active:scale-[0.98]"
      >
        open case file <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Proof Tab ───────────────────────────────────────────────────────────────

function ProofTab({ record, activeReceipt, onSelectReceipt }) {
  const receipts = record.receipts;
  const selectedReceipt = activeReceipt;
  const previewArtifact = selectedReceipt?.artifacts?.[0] ?? {};
  const receiptContents = selectedReceipt?.contents ?? [];

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Selected receipt detail – shown first per mobile proof priority */}
      {selectedReceipt && (
        <div className="rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
          <div className="mb-2 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/40">
            selected receipt
          </div>
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-[14px] leading-5 text-[#11100d]">
              {selectedReceipt.name}
            </h3>
            <span className="shrink-0 rounded-full border border-[#11100d]/12 bg-[#f7f1e7] px-2 py-1 text-[9px] tracking-[0.03em] text-[#11100d]/58">
              {selectedReceipt.status || "needs screenshot"}
            </span>
          </div>
          <p className="text-[13px] leading-6 text-[#11100d]/74">
            {selectedReceipt.proof}
          </p>

          {/* Artifact preview */}
          <ArtifactCard artifact={previewArtifact} className="mt-3" />

          {/* Contents */}
          {receiptContents.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {receiptContents.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/48"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Receipt list */}
      <div>
        <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/40">
          Receipt list
        </div>
        <div className="space-y-2">
          {receipts.map((receipt, i) => {
            const active = selectedReceipt?.id === receipt.id;
            return (
              <button
                key={receipt.id}
                type="button"
                aria-label={`Select receipt: ${receipt.name}`}
                onClick={() => onSelectReceipt(receipt.id)}
                className={cx(
                  "flex w-full items-center gap-3 rounded-[16px] border p-3 text-left transition",
                  active
                    ? "border-[#11100d]/20 bg-[#fffaf1]"
                    : "border-[#11100d]/10 bg-[#fffaf1]/40"
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#11100d]/10 bg-[#f7f1e7] text-[9px] uppercase tracking-[0.1em] text-[#11100d]/48">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] text-[#11100d]">
                    {receipt.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[11px] text-[#11100d]/50">
                      {receipt.format}
                    </span>
                    <span className="shrink-0 rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2 py-0.5 text-[9px] tracking-[0.03em] text-[#11100d]/50">
                      {receipt.status || "needs screenshot"}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className={cx(
                    "h-3.5 w-3.5 shrink-0 text-[#11100d]/30 transition",
                    active && "translate-x-[1px] text-[#11100d]/60"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Artifacts Tab ───────────────────────────────────────────────────────────

// Compute readiness stats across all artifacts in all receipts (single pass)
function getReadinessStats(record) {
  const all = record.receipts.flatMap((r) => r.artifacts ?? []);
  return all.reduce(
    (acc, a) => {
      if (a.status === "ready") acc.ready += 1;
      else if (a.status === "needs screenshot") acc.needsScreenshot += 1;
      else if (a.status === "needs metric") acc.needsMetric += 1;
      else if (a.status === "needs polish") acc.needsPolish += 1;
      acc.total += 1;
      return acc;
    },
    { ready: 0, needsScreenshot: 0, needsMetric: 0, needsPolish: 0, total: 0 }
  );
}

function ReadinessSummary({ record }) {
  const stats = getReadinessStats(record);
  const items = [
    { label: "Ready", count: stats.ready, dot: "bg-emerald-500/60" },
    { label: "Screenshot", count: stats.needsScreenshot, dot: "bg-amber-400/70" },
    { label: "Metric", count: stats.needsMetric, dot: "bg-sky-400/70" },
    { label: "Polish", count: stats.needsPolish, dot: "bg-violet-400/60" },
  ].filter((item) => item.count > 0);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 rounded-[14px] border border-[#11100d]/8 bg-[#fffaf1]/70 px-3 py-2.5">
      {items.map(({ label, count, dot }) => (
        <span key={label} className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/52">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {count} {label}
        </span>
      ))}
    </div>
  );
}

function ArtifactsTab({ record, activeReceipt }) {
  const selectedReceipt = activeReceipt;
  const artifacts = selectedReceipt?.artifacts ?? [{}];
  const nextProof = record.nextProof ?? [];

  // Collect all artifacts across all receipts for gallery
  const allArtifacts = record.receipts.flatMap((r) =>
    (r.artifacts ?? [{}]).map((a) => ({ ...a, receiptName: r.name }))
  );

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Asset readiness summary */}
      <ReadinessSummary record={record} />

      {/* Featured artifact */}
      {artifacts[0] !== undefined && (
        <div>
          <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/40">
            Featured artifact
          </div>
          <ArtifactCard artifact={artifacts[0]} />
        </div>
      )}

      {/* Artifact gallery */}
      {allArtifacts.length > 1 && (
        <div>
          <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/40">
            Artifact gallery
          </div>
          <div className="grid grid-cols-2 gap-2">
            {allArtifacts.map((artifact, index) => (
              <ArtifactCard
                key={artifact.id || `gallery-artifact-${index}`}
                artifact={artifact}
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Next proof checklist */}
      {nextProof.length > 0 && (
        <div className="rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
          <div className="mb-3 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/40">
            What to add next
          </div>
          <ul className="space-y-2">
            {nextProof.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12px] leading-5 text-[#11100d]/68"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#11100d]/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-[12px] border border-[#11100d]/10 bg-[#f7f1e7] px-3 py-2 text-[11px] leading-5 text-[#11100d]/50">
            Evidence archive in progress. Placeholder slots mark the exact proof
            assets being added.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main MobileView ─────────────────────────────────────────────────────────

export default function MobileView({
  record,
  mode,
  openWorkspace,
  activeReceipt,
  onSelectReceipt,
  mobileTab,
  setMobileTab,
}) {
  return (
    <div className="lg:hidden">
      {/* Sticky tab bar — positioned below the sticky case selector (~80 px) */}
      <div className="sticky top-20 z-20 border-b border-[#11100d]/10 bg-[#f7f1e7]/92 px-4 py-2.5 backdrop-blur-xl">
        <div
          className="grid grid-cols-3 gap-1 rounded-full border border-[#11100d]/10 bg-[#fffaf1]/70 p-1"
          role="group"
          aria-label="Mobile section tabs"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-label={`Show ${label} tab`}
              aria-pressed={mobileTab === id}
              onClick={() => setMobileTab(id)}
              className={cx(
                "rounded-full py-2.5 text-[10px] uppercase tracking-[0.14em] transition",
                mobileTab === id
                  ? "bg-[#11100d] text-[#f7f1e7]"
                  : "text-[#11100d]/46"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {mobileTab === "overview" && (
        <OverviewTab record={record} mode={mode} openWorkspace={openWorkspace} />
      )}
      {mobileTab === "proof" && (
        <ProofTab
          record={record}
          activeReceipt={activeReceipt}
          onSelectReceipt={onSelectReceipt}
        />
      )}
      {mobileTab === "artifacts" && (
        <ArtifactsTab record={record} activeReceipt={activeReceipt} />
      )}
    </div>
  );
}
