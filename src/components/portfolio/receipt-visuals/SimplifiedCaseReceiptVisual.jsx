import React from "react";
import MirrorEvidenceVisual from "./MirrorEvidenceVisual";
import SmoothEvidenceVisual from "./SmoothEvidenceVisual";
import MetaEvidenceVisual from "./MetaEvidenceVisual";
import SnipEvidenceVisual from "./SnipEvidenceVisual";
import MultiEvidenceVisual from "./MultiEvidenceVisual";
import { Flow } from "./EvidencePrimitives";
import { CASE_STYLES, getSimplifiedReceiptCopy } from "./receiptEvidenceConfig";

function MainVisual(props) {
  if (props.caseKind === "mirror") return <MirrorEvidenceVisual {...props} />;
  if (props.caseKind === "smooth") return <SmoothEvidenceVisual {...props} />;
  if (props.caseKind === "meta") return <MetaEvidenceVisual {...props} />;
  if (props.caseKind === "snip") return <SnipEvidenceVisual {...props} />;
  return <MultiEvidenceVisual {...props} />;
}

export { getSimplifiedReceiptCopy } from "./receiptEvidenceConfig";

export default function SimplifiedCaseReceiptVisual({
  caseKind,
  receiptNumber,
  receiptBodyType,
  body = {},
  displayMode = "full",
  ctaLabel = "Inspect receipt",
  privacyLabel = "sanitized",
  type
}) {
  const style = CASE_STYLES[caseKind] ?? CASE_STYLES.mirror;
  const copy = getSimplifiedReceiptCopy(receiptBodyType);

  if (displayMode === "compact") {
    return (
      <article className="w-full overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] text-[#11100d]">
        <div className="px-3.5 py-3" style={{ backgroundColor: style.wash }}>
          <div className="flex items-center justify-between gap-2 text-[8px] uppercase tracking-[0.14em] text-[#11100d]/38">
            <span>Receipt {receiptNumber}</span>
            <span>{type}</span>
          </div>
          <h3 className="mt-3 text-[16px] font-medium leading-5 tracking-[-0.02em]">{copy.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[#11100d]/58">{copy.summary}</p>
        </div>
        <div className="px-3.5 py-3"><Flow items={copy.flow} accent={style.accent} compact /></div>
        <div className="border-t border-[#11100d]/8 px-3.5 py-2.5 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/42">{ctaLabel}</div>
      </article>
    );
  }

  return (
    <article className="w-full bg-[#f7f1e7] text-[#11100d]">
      <div className="px-4 py-4 sm:px-6 sm:py-5" style={{ backgroundColor: style.wash }}>
        <div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/40">{type}</div>
        <p className="mt-2 max-w-3xl text-[18px] leading-7 tracking-[-0.02em] text-[#11100d]/78 sm:text-[21px] sm:leading-8">{copy.summary}</p>
      </div>
      <div className="p-4 sm:p-6">
        <MainVisual caseKind={caseKind} receiptBodyType={receiptBodyType} body={body} accent={style.accent} />
      </div>
      <div className="border-t border-[#11100d]/8 bg-[#fffaf1] px-4 py-4 sm:px-6">
        <Flow items={copy.flow} accent={style.accent} />
        <div className="mt-4 border-t border-[#11100d]/8 pt-4 text-[12px] leading-5 text-[#11100d]/70">
          <span className="mr-2 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36">Proves</span>
          {copy.proof}
        </div>
        <div className="mt-3 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/28">{privacyLabel}</div>
      </div>
    </article>
  );
}
