import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, X } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import MetricPill from "../ui/MetricPill";
import SystemPath from "./SystemPath";
import { cx } from "../../utils/cx";

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

          <nav className="mt-8 grid gap-2" aria-label="Case workspace sections">
            {["system", "decisions", "receipts"].map((item) => (
              <button
                key={item}
                type="button"
                aria-label={`Open ${item} section`}
                aria-pressed={section === item}
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
                    key={receipt.id}
                    type="button"
                    aria-label={`Inspect receipt ${receipt.name}`}
                    aria-pressed={activeReceipt.id === receipt.id}
                    onClick={() => setActiveReceiptId(receipt.id)}
                    className={cx("rounded-[28px] border p-5 text-left transition", activeReceipt.id === receipt.id ? "border-[#11100d] bg-[#fffaf1]" : "border-[#11100d]/10 bg-[#fffaf1]/52 hover:border-[#11100d]/24")}
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
