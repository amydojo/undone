import React from "react";
import { ArrowUpRight } from "lucide-react";
import MetricPill from "../ui/MetricPill";
import ProfileStrip from "./ProfileStrip";
import OverviewArtifact from "./OverviewArtifact";
import { cx } from "../../utils/cx";
import ReceiptVisualGallery from "./ReceiptVisualGallery";

const DECODER_LINES = {
  mirror: 'mood, sleep, clarity, and context → readable product states.',
  'smooth-md-growth-os': 'scattered clinic marketing → reusable service, CRM, and campaign logic.',
  'meta-airtable-dashboard': 'ad spend → booking behavior → revenue-informed decisions.',
  'snip-provider-pipeline': 'provider records → validated profiles → handoff folders.',
  'guardrail-hr': '22 questions. one risk score. clearer next steps.',
  'multi-brand-retention': 'brand, service, and status → the right follow-up path.',
};

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "proof", label: "Receipts" },
];

function displayStatus(raw) {
  if (!raw) return null
  if (raw === 'needs screenshot' || raw === 'needs visual' || raw === 'needs metric' || raw === 'needs polish' || raw === 'needs link') return 'queued'
  return raw
}

function hasComponentVisual(receipt) {
  return (receipt?.visualAssets ?? []).some((asset) => asset?.kind === 'component' || asset?.componentKey)
}

function getReceiptTestId(receipt) {
  return receipt?.testId ?? receipt?.id
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ record, openWorkspace }) {
  return (
    <div className="mx-auto max-w-[780px] space-y-6 px-4 py-4 sm:space-y-7 sm:py-5">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-[9px] uppercase tracking-[0.18em] text-[#11100d]/42">active case file</div>
        <button
          type="button"
          aria-label={`Open ${record.title} case file`}
          onClick={() => openWorkspace(record)}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#11100d]/14 bg-[#fffaf1]/70 px-3 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/58 transition active:scale-[0.98]"
        >
          Open case file <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-[700px]">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/42">
          {[record.category, record.timeline, record.status].map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 ? <span className="h-1 w-1 rounded-full bg-[#11100d]/18" aria-hidden="true" /> : null}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="mt-3 text-[clamp(30px,9vw,38px)] font-normal leading-[1.02] tracking-[-0.035em] text-[#11100d] [text-wrap:balance]">
          {record.headline ?? record.title}
        </h1>
        {DECODER_LINES[record.slug] && (
          <p className="mt-2.5 max-w-[620px] text-[18px] leading-[1.3] tracking-[-0.018em] text-[#11100d]/76">
            {DECODER_LINES[record.slug]}
          </p>
        )}
        <p className="mt-2 max-w-[620px] text-[14px] leading-[1.55] text-[#11100d]/40">{record.oneLine}</p>
      </div>

      {/* Proof ledger */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">Proof signals</div>
        <div className="mt-3 grid grid-cols-1 divide-y divide-[#11100d]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {record.metrics.map((metric) => (
            <MetricPill key={metric.label} metric={metric} compact />
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
  const receiptContents = selectedReceipt?.contents ?? [];
  const componentVisual = hasComponentVisual(selectedReceipt);
  const selectedStatus = displayStatus(selectedReceipt?.status);
  const showSelectedStatus = Boolean(selectedReceipt && selectedStatus && selectedStatus !== 'ready');

  return (
    <div className="space-y-4 px-4 py-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Receipts</div>
          <div className="mt-1 text-[18px] leading-none tracking-[-0.02em] text-[#11100d]">
            {receipts.length} proof {receipts.length === 1 ? "object" : "objects"}
          </div>
        </div>
      </header>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none]">
        <div className="flex snap-x snap-mandatory gap-2 border-y border-[#11100d]/8 bg-[#fffaf1]/30 py-2">
          {receipts.map((receipt, i) => {
            const active = selectedReceipt?.id === receipt.id;
            const status = displayStatus(receipt.status);
            const showStatus = Boolean(status && status !== 'ready');

            return (
              <button
                key={receipt.id}
                type="button"
                data-testid={`receipt-selector-${getReceiptTestId(receipt)}`}
                aria-label={`Select receipt: ${receipt.name}`}
                aria-pressed={active}
                onClick={() => onSelectReceipt(receipt.id)}
                className={cx(
                  "relative min-h-[84px] min-w-[188px] snap-start overflow-hidden border px-3 py-2.5 text-left transition active:scale-[0.99]",
                  active
                    ? "border-[#11100d]/30 bg-[#fffaf1]"
                    : "border-[#11100d]/8 bg-[#f7f1e7]/68"
                )}
              >
                <span
                  className={cx(
                    "absolute bottom-0 left-3 top-0 w-px",
                    active ? "bg-[#11100d]/42" : "bg-transparent"
                  )}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cx(
                      "shrink-0 font-mono text-[10px] tabular-nums tracking-[0.06em]",
                      active
                        ? "text-[#11100d]/62"
                        : "text-[#11100d]/32"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {showStatus && (
                    <span
                      className={cx(
                        "shrink-0 border-l border-[#11100d]/12 pl-2 text-[9px] uppercase tracking-[0.1em]",
                        active
                          ? "text-[#11100d]/44"
                          : "text-[#11100d]/42"
                      )}
                    >
                      {status}
                    </span>
                  )}
                </div>
                <div
                  className={cx(
                    "mt-2 line-clamp-2 text-[12px] leading-4",
                    active ? "text-[#11100d]" : "text-[#11100d]/72"
                  )}
                >
                  {receipt.name}
                </div>
                <div
                  className={cx(
                    "mt-1.5 truncate text-[9px] uppercase tracking-[0.14em]",
                    active ? "text-[#11100d]/46" : "text-[#11100d]/34"
                  )}
                >
                  {receipt.format}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedReceipt && componentVisual && (
        <div>
          <ReceiptVisualGallery
            visualAssets={selectedReceipt.visualAssets}
            receiptName={selectedReceipt.name}
            receiptFormat={selectedReceipt.format}
            receiptTestId={getReceiptTestId(selectedReceipt)}
            variant="mobile"
          />
          {showSelectedStatus && (
            <div className="mt-3">
              <span className="border-l border-[#11100d]/12 pl-2 text-[9px] uppercase tracking-[0.1em] text-[#11100d]/42">
                {selectedStatus}
              </span>
            </div>
          )}
        </div>
      )}

      {selectedReceipt && !componentVisual && (
        <div className="rounded-[8px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
          <h3 className="text-[14px] leading-5 text-[#11100d]">
            {selectedReceipt.name}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-[#11100d]/70">
            {selectedReceipt.claim}
          </p>

          {receiptContents.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {receiptContents.map((item) => (
                <span
                  key={item}
                  className="border-l border-[#11100d]/12 pl-2 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/48"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          <ReceiptVisualGallery
            visualAssets={selectedReceipt.visualAssets}
            receiptName={selectedReceipt.name}
            receiptFormat={selectedReceipt.format}
            receiptTestId={getReceiptTestId(selectedReceipt)}
            variant="mobile"
          />

          {showSelectedStatus && (
            <div className="mt-3">
              <span className="border-l border-[#11100d]/12 pl-2 text-[9px] uppercase tracking-[0.1em] text-[#11100d]/42">
                {selectedStatus}
              </span>
            </div>
          )}
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
  const activeMobileTab = TABS.some(({ id }) => id === mobileTab) ? mobileTab : "overview";

  React.useEffect(() => {
    if (activeMobileTab !== mobileTab) {
      setMobileTab(activeMobileTab);
    }
  }, [activeMobileTab, mobileTab, setMobileTab]);

  return (
    <div className="lg:hidden">
      {/* Sticky tab bar — positioned below the sticky case selector (~80 px) */}
      <div className="sticky top-20 z-20 border-b border-[#11100d]/10 bg-[#f7f1e7]/92 px-4 py-2.5 backdrop-blur-xl">
        <div
          className="grid grid-cols-2 gap-1 rounded-full border border-[#11100d]/10 bg-[#fffaf1]/70 p-1"
          role="group"
          aria-label="Mobile section tabs"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-label={`Show ${label} tab`}
              aria-pressed={activeMobileTab === id}
              onClick={() => setMobileTab(id)}
              className={cx(
                "rounded-full py-2.5 text-[10px] uppercase tracking-[0.14em] transition",
                activeMobileTab === id
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
      {activeMobileTab === "overview" && (
        <OverviewTab record={record} mode={mode} openWorkspace={openWorkspace} />
      )}
      {activeMobileTab === "proof" && (
        <ProofTab
          record={record}
          activeReceipt={activeReceipt}
          onSelectReceipt={onSelectReceipt}
        />
      )}
    </div>
  );
}
