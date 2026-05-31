import React from "react";
import { ArrowRight, Eye } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import { cx } from "../../utils/cx";

export default function ProofRail({ record, activeReceiptId, setActiveReceiptId, mode }) {
  const selectedReceipt = record.receipts.find((receipt) => receipt.id === activeReceiptId) || record.receipts[0];

  return (
    <aside className="border-l border-[#11100d]/10 bg-[#f0eadf]/68 p-4 lg:h-[calc(100vh-73px)] lg:overflow-y-auto" aria-label="Receipt inspector">
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
          const active = selectedReceipt.id === receipt.id;
          return (
            <button
              key={receipt.id}
              type="button"
              aria-label={`Inspect receipt ${receipt.name}`}
              aria-pressed={active}
              onClick={() => setActiveReceiptId(receipt.id)}
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
