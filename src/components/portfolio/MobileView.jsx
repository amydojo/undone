import React from "react";
import { ArrowUpRight } from "lucide-react";
import ArtifactCard from "../ui/ArtifactCard";
import MetricPill from "../ui/MetricPill";
import { CheckCircle2, ChevronRight } from "lucide-react";
import ProfileStrip from "./ProfileStrip";
import OverviewArtifact from "./OverviewArtifact";
import { cx } from "../../utils/cx";

const DECODER_LINES = {
  mirror: 'emotional inputs → usable product logic.',
  'smooth-md-growth-os': '6 service lines. one operating layer.',
  'meta-airtable-dashboard': 'from lead volume to revenue decisions.',
  'snip-provider-pipeline': '200+ profiles. one repeatable sourcing system.',
  'multi-brand-retention': 'lead intent routed into the right next message.',
};

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "proof", label: "Proof" },
  { id: "artifacts", label: "Artifacts" },
];

// ─── Overview Tab ────────────────────────────────────────────────────────────

function OverviewTab({ record, mode, openWorkspace }) {
  return (
    <div className="space-y-8 px-4 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-[9px] uppercase tracking-[0.18em] text-[#11100d]/42">active case file</div>
        <button
          type="button"
          aria-label={`Open ${record.title} case file`}
          onClick={() => openWorkspace(record)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#11100d] px-4 text-[10px] uppercase tracking-[0.16em] text-[#f7f1e7] transition active:scale-[0.98]"
        >
          Open case file <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Hero */}
      <div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/42">
          {[record.category, record.timeline, record.status].map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 ? <span className="h-1 w-1 rounded-full bg-[#11100d]/18" aria-hidden="true" /> : null}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="mt-4 text-[clamp(30px,9vw,38px)] font-normal leading-[1.02] tracking-[-0.035em] text-[#11100d] [text-wrap:balance]">
          {mode === "proof" ? record.title : record.thesis}
        </h1>
        {DECODER_LINES[record.slug] && (
          <p className="mt-3 text-[18px] leading-[1.3] tracking-[-0.018em] text-[#11100d]/76">
            {DECODER_LINES[record.slug]}
          </p>
        )}
        <p className="mt-2 text-[14px] leading-[1.6] text-[#11100d]/40">{record.oneLine}</p>
      </div>

      {/* Proof ledger */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">Proof signals</div>
        <div className="mt-4 grid grid-cols-1 divide-y divide-[#11100d]/10">
          {record.metrics.map((metric) => (
            <MetricPill key={metric.label} metric={metric} />
          ))}
        </div>
      </div>

      {/* System object */}
      <OverviewArtifact record={record} />

      <ProfileStrip />
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
