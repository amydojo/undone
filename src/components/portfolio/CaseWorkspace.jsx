import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, ImageOff, Lightbulb, X } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import MetricPill from "../ui/MetricPill";
import SystemPath from "./SystemPath";
import { cx } from "../../utils/cx";

const NAV_SECTIONS = ["system", "decisions", "receipts", "artifacts", "why this matters"];

function ArtifactSlot() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[22px] border border-dashed border-[#11100d]/16 bg-[#fffaf1]/40 px-6 py-10 text-center">
      <ImageOff className="h-5 w-5 text-[#11100d]/24" />
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#11100d]/30">Artifact slot ready</div>
      <p className="max-w-xs text-[11px] leading-5 text-[#11100d]/36">Add screenshot, dashboard, email, prototype, or production proof here.</p>
    </div>
  );
}

export default function CaseWorkspace({ record, onClose }) {
  const [activeReceiptId, setActiveReceiptId] = useState(record.receipts[0]?.id);
  const [section, setSection] = useState("system");
  const dialogRef = useRef(null);

  useEffect(() => {
    setActiveReceiptId(record.receipts[0]?.id);
    setSection("system");
  }, [record]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const activeReceipt = useMemo(
    () => record.receipts.find((receipt) => receipt.id === activeReceiptId) || record.receipts[0],
    [activeReceiptId, record.receipts]
  );

  if (!activeReceipt) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050504]/78 p-2 backdrop-blur-2xl lg:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      aria-label="Case workspace overlay"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${record.title} case file`}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          }
        }}
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.985 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid h-full max-w-[1480px] overflow-hidden rounded-[28px] bg-[#f7f1e7] text-[#11100d] shadow-[0_50px_160px_rgba(0,0,0,0.52)] lg:grid-cols-[240px_1fr_400px]"
      >
        {/* Left sidebar */}
        <aside className="hidden border-r border-[#11100d]/10 bg-[#f0eadf]/72 p-5 lg:block">
          <div className="mb-6 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-[#11100d]/42">
            <span>Case file</span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#11100d]/10 hover:border-[#11100d]/24"
              aria-label="Close case file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <AccentDot record={record} size="h-3 w-3" />
          <h2 className="mt-4 text-[28px] leading-[1.02] tracking-[-0.04em]">{record.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#11100d]/52">{record.oneLine}</p>

          <nav className="mt-6 grid gap-1.5" aria-label="Case workspace sections">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item}
                type="button"
                aria-label={`Open ${item} section`}
                aria-pressed={section === item}
                onClick={() => setSection(item)}
                className={cx(
                  "rounded-full px-4 py-2.5 text-left text-[10px] capitalize tracking-[0.12em] transition",
                  section === item
                    ? "bg-[#11100d] text-[#f7f1e7]"
                    : "text-[#11100d]/46 hover:bg-[#fffaf1] hover:text-[#11100d]"
                )}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="overflow-y-auto p-5 lg:p-8">
          {/* Mobile header */}
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <div className="text-[9px] uppercase tracking-[0.22em] text-[#11100d]/42">Case file / {record.id}</div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#11100d]/10"
              aria-label="Close case file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile nav */}
          <div className="mb-5 flex flex-wrap gap-1.5 lg:hidden">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSection(item)}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-[9px] capitalize tracking-[0.12em] transition",
                  section === item
                    ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]"
                    : "border-[#11100d]/10 text-[#11100d]/46"
                )}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Meta pills */}
          <div className="mb-5 flex flex-wrap gap-2">
            {[record.status, record.timeline, record.category].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#11100d]/10 bg-[#fffaf1]/70 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/44"
              >
                {item}
              </span>
            ))}
          </div>

          <h1 className="max-w-4xl text-[36px] leading-[0.98] tracking-[-0.04em] sm:text-[50px] lg:text-[62px]">
            {record.thesis}
          </h1>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {record.metrics.map((metric) => (
              <MetricPill key={metric.label} metric={metric} />
            ))}
          </div>

          <div className="mt-8 grid gap-4">
            {section === "system" ? (
              <>
                <div className="rounded-[28px] bg-[#11100d] p-6 text-[#f7f1e7]">
                  <div className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#f7f1e7]/38">Signal detected</div>
                  <p className="max-w-3xl text-[24px] leading-[1.18] tracking-[-0.03em]">{record.signal}</p>
                </div>
                <div className="rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/64 p-6">
                  <div className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/38">System introduced</div>
                  <p className="max-w-3xl text-[22px] leading-[1.2] tracking-[-0.025em] text-[#11100d]">
                    {record.system}
                  </p>
                </div>
                <SystemPath record={record} />
              </>
            ) : null}

            {section === "decisions" ? (
              <div className="grid gap-3">
                {record.decisions.map((decision, index) => (
                  <div
                    key={decision.label}
                    className="grid gap-3 rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1]/66 p-5 sm:grid-cols-[130px_1fr]"
                  >
                    <div className="text-[9px] uppercase tracking-[0.18em] text-[#11100d]/36">
                      {String(index + 1).padStart(2, "0")} / {decision.label}
                    </div>
                    <p className="text-[20px] leading-[1.2] tracking-[-0.03em]">{decision.body}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {section === "receipts" ? (
              <div className="grid gap-3">
                {record.receipts.map((receipt) => (
                  <button
                    key={receipt.id}
                    type="button"
                    aria-label={`Inspect receipt ${receipt.name}`}
                    aria-pressed={activeReceipt.id === receipt.id}
                    onClick={() => setActiveReceiptId(receipt.id)}
                    className={cx(
                      "rounded-[22px] border p-5 text-left transition",
                      activeReceipt.id === receipt.id
                        ? "border-[#11100d] bg-[#fffaf1]"
                        : "border-[#11100d]/10 bg-[#fffaf1]/52 hover:border-[#11100d]/24"
                    )}
                  >
                    <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">
                      <span>{receipt.format}</span>
                      <Eye className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-[26px] leading-[1.02] tracking-[-0.04em]">{receipt.name}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#11100d]/58">{receipt.claim}</p>
                    <p className="mt-2 text-[13px] leading-5 text-[#11100d]/72">{receipt.proof}</p>
                  </button>
                ))}
              </div>
            ) : null}

            {section === "artifacts" ? (
              <div className="grid gap-3">
                <div className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">
                  {record.receipts.length} receipt{record.receipts.length !== 1 ? "s" : ""} — artifact slots
                </div>
                {record.receipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1]/52 p-5"
                  >
                    <div className="mb-2 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/38">{receipt.format}</div>
                    <div className="mb-4 text-[16px] leading-[1.1] tracking-[-0.02em]">{receipt.name}</div>
                    {receipt.artifacts.length > 0 ? (
                      <div className="grid gap-2">
                        {receipt.artifacts.map((artifact) => (
                          <div
                            key={artifact.id}
                            className="rounded-[16px] border border-[#11100d]/10 bg-[#f7f1e7] p-4"
                          >
                            <div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">{artifact.type}</div>
                            <div className="mt-1 text-sm text-[#11100d]/70">{artifact.label}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ArtifactSlot />
                    )}
                  </div>
                ))}
              </div>
            ) : null}

            {section === "why this matters" ? (
              <div className="rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/64 p-6">
                <div className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Hiring relevance</span>
                </div>
                <p className="max-w-3xl text-[20px] leading-[1.32] tracking-[-0.025em] text-[#11100d]">
                  {record.hiringTranslation}
                </p>
                <div className="mt-6 grid gap-2">
                  <div className="text-[9px] uppercase tracking-[0.16em] text-[#11100d]/36">Tools used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {record.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-3 py-1.5 text-[10px] text-[#11100d]/62"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </main>

        {/* Right inspector */}
        <aside className="border-l border-[#11100d]/10 bg-[#11100d] p-5 text-[#f7f1e7] lg:overflow-y-auto">
          <div className="mb-6 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-[#f7f1e7]/38">
            <span>Inspector</span>
            <AccentDot record={record} size="h-2.5 w-2.5" />
          </div>

          {/* Active receipt card */}
          <div className="rounded-[22px] bg-[#f7f1e7] p-5 text-[#11100d]">
            <div className="mb-4 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/38">Active receipt</div>
            <h3 className="text-[24px] leading-[1.02] tracking-[-0.04em]">{activeReceipt.name}</h3>
            <p className="mt-3 text-sm leading-6 text-[#11100d]/60">{activeReceipt.claim}</p>
          </div>

          {/* Proof point */}
          <div className="mt-4 rounded-[22px] border border-[#f7f1e7]/10 p-5">
            <div className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#f7f1e7]/38">Proof point</div>
            <p className="text-[19px] leading-[1.2] tracking-[-0.03em]">{activeReceipt.proof}</p>
          </div>

          {/* Contents */}
          <div className="mt-4">
            <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#f7f1e7]/38">Contents</div>
            <div className="grid gap-1.5">
              {activeReceipt.contents.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-[#f7f1e7]/10 px-4 py-2.5 text-sm text-[#f7f1e7]/68"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Artifact slot */}
          <div className="mt-4">
            <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#f7f1e7]/38">Artifacts</div>
            {activeReceipt.artifacts.length > 0 ? (
              <div className="grid gap-2">
                {activeReceipt.artifacts.map((artifact) => (
                  <div key={artifact.id} className="rounded-[16px] border border-[#f7f1e7]/10 p-4">
                    <div className="text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/38">{artifact.type}</div>
                    <div className="mt-1 text-sm text-[#f7f1e7]/68">{artifact.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-[16px] border border-dashed border-[#f7f1e7]/14 px-4 py-6 text-center">
                <ImageOff className="h-4 w-4 text-[#f7f1e7]/22" />
                <div className="text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/28">Artifact slot ready</div>
              </div>
            )}
          </div>
        </aside>
      </motion.div>
    </motion.div>
  );
}
