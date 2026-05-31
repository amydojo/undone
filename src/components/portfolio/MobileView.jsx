import React from "react";
import { ArrowUpRight } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import ArtifactCard from "../ui/ArtifactCard";
import MetricPill from "../ui/MetricPill";
import { cx } from "../../utils/cx";
import { profile } from "../../data/profile";
import { CheckCircle2, ChevronRight } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "proof", label: "Proof" },
  { id: "artifacts", label: "Artifacts" },
];

// ─── Overview Tab ────────────────────────────────────────────────────────────

function OverviewTab({ record, mode, openWorkspace }) {
  return (
    <div className="space-y-4 px-4 py-4">
      {/* Identity summary */}
      <div className="rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
        <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/36">
          Amy Do
        </div>
        <p className="text-[13px] font-medium leading-5 tracking-[-0.01em] text-[#11100d]">
          {profile.positioning}
        </p>
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
  const selectedReceipt = activeReceipt ?? receipts[0] ?? null;
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

function ArtifactsTab({ record, activeReceipt }) {
  const selectedReceipt = activeReceipt ?? record.receipts[0] ?? null;
  const artifacts = selectedReceipt?.artifacts ?? [{}];
  const nextProof = record.nextProof ?? [];

  // Collect all artifacts across all receipts for gallery
  const allArtifacts = record.receipts.flatMap((r) =>
    (r.artifacts ?? [{}]).map((a) => ({ ...a, receiptName: r.name }))
  );

  return (
    <div className="space-y-4 px-4 py-4">
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
      {/* Sticky tab bar */}
      <div className="sticky top-0 z-20 border-b border-[#11100d]/10 bg-[#f7f1e7]/92 px-4 py-2.5 backdrop-blur-xl">
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
