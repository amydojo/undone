import React from "react";
import { ArrowRight, Eye, ImageOff } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import { cx } from "../../utils/cx";

export default function ProofRail({ record, activeReceiptId, setActiveReceiptId, mode }) {
  const selectedReceipt = record.receipts.find((receipt) => receipt.id === activeReceiptId) || record.receipts[0];

  if (!selectedReceipt) {
    return null;
  }

  const isProof = mode === "proof";

  return (
    <aside className="border-l border-[#11100d]/10 bg-[#f0eadf]/68 p-4 lg:h-[calc(100vh-73px)] lg:overflow-y-auto" aria-label="Receipt inspector">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-[0.22em] text-[#11100d]/42">Receipt inspector</div>
        <Eye className="h-3.5 w-3.5 text-[#11100d]/34" />
      </div>

      {/* Selected receipt hero */}
      <div className="rounded-[22px] bg-[#11100d] p-5 text-[#f7f1e7]">
        <div className="mb-6 flex items-center justify-between">
          <AccentDot record={record} size="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#f7f1e7]/36">{selectedReceipt.format}</span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-[#f7f1e7]/38">Selected receipt</div>
        <h2 className="mt-2 text-[26px] leading-[1.02] tracking-[-0.04em]">{selectedReceipt.name}</h2>
        <p className="mt-3 text-sm leading-6 text-[#f7f1e7]/66">{selectedReceipt.claim}</p>
      </div>

      {/* Receipt list */}
      <div className="mt-3 grid gap-1.5">
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
              <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#11100d]/34">
                <span>{receipt.format}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
              <div className="text-[15px] leading-[1.1] tracking-[-0.02em] text-[#11100d]">{receipt.name}</div>
            </button>
          );
        })}
      </div>

      {/* Proof point — always visible, more prominent in proof mode */}
      <div className={cx("mt-3 rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1]/62 p-5", isProof && "ring-1 ring-[#11100d]/20")}>
        <div className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/38">Proof point</div>
        <p className={cx("leading-[1.2] tracking-[-0.03em] text-[#11100d]", isProof ? "text-[20px]" : "text-[18px]")}>{selectedReceipt.proof}</p>

        {/* Contents — always visible in proof mode, hidden in overview */}
        {isProof ? (
          <div className="mt-4 grid gap-1.5">
            {selectedReceipt.contents.map((item) => (
              <div key={item} className="rounded-full border border-[#11100d]/10 px-3 py-2 text-xs text-[#11100d]/62">{item}</div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Artifact slot — shown in proof mode */}
      {isProof ? (
        <div className="mt-3">
          <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Artifacts</div>
          {selectedReceipt.artifacts.length > 0 ? (
            <div className="grid gap-2">
              {selectedReceipt.artifacts.map((artifact) => (
                <div key={artifact.id} className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1]/62 p-4">
                  <div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">{artifact.type}</div>
                  <div className="mt-1 text-sm text-[#11100d]/68">{artifact.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-[16px] border border-dashed border-[#11100d]/14 px-4 py-6 text-center">
              <ImageOff className="h-4 w-4 text-[#11100d]/22" />
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#11100d]/30">Artifact slot ready</div>
              <p className="text-[10px] leading-4 text-[#11100d]/36">Add screenshot, dashboard, email, or prototype.</p>
            </div>
          )}
        </div>
      ) : null}
    </aside>
  );
}
