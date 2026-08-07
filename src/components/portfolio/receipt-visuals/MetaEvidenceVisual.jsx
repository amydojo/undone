import React from "react";
import { Label } from "./EvidencePrimitives";
import { CASE_STYLES } from "./receiptEvidenceConfig";

export default function MetaEvidenceVisual({ receiptBodyType, body }) {
  if (receiptBodyType === "airtableSchemaMap") {
    const record = body?.sampleRecord ?? {};
    const fields = [["Source", record.source], ["Campaign", "Microneedling"], ["Service", record.service_interest], ["Status", record.status], ["Booked", "Yes"], ["Arrived", record.arrived], ["Revenue", "Pending"], ["Confidence", record.attribution_confidence]];
    return (
      <div className="grid grid-cols-2 divide-x divide-y divide-[#11100d]/10 overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] sm:grid-cols-4">
        {fields.map(([label, value]) => (
          <div key={label} className="p-3">
            <div className="text-[8px] uppercase tracking-[0.12em] text-[#11100d]/38">{label}</div>
            <div className="mt-2 text-[12px] text-[#11100d]/72">{value}</div>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "campaignFormulaSheet") {
    const rows = (body?.campaignRows ?? []).slice(0, 3);
    return (
      <div className="overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1]">
        <div className="grid grid-cols-[1.1fr_1fr_0.8fr] border-b border-[#11100d]/10 px-3 py-2 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/38"><span>Campaign</span><span>Signal</span><span>Action</span></div>
        {rows.map((row) => (
          <div key={row.row} className="grid grid-cols-[1.1fr_1fr_0.8fr] gap-2 border-b border-[#11100d]/8 px-3 py-3 text-[11px] last:border-b-0">
            <span>{row.row}</span><span className="text-[#11100d]/58">{row.signal}</span><span className="font-medium" style={{ color: CASE_STYLES.meta.dark }}>{row.decision}</span>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "attributionTrace") {
    const path = ["Meta campaign", "Lead record", "Booked", "Arrived", "Revenue", "Confidence"];
    return (
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {path.map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 && <span className="hidden text-[#11100d]/24 sm:block">→</span>}
              <div className="flex min-h-[72px] flex-1 items-center justify-center rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] px-2 text-center text-[11px]">{item}</div>
            </React.Fragment>
          ))}
        </div>
        <div className="mt-3 rounded-[12px] border border-dashed border-[#11100d]/16 px-3 py-2 text-[11px] text-[#11100d]/54">Missing campaign → manual review</div>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_0.72fr]">
      <div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
        <Label>Campaign</Label>
        <div className="mt-3 text-[20px]">Microneedling</div>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-[11px]"><span>CPL</span><span>acceptable</span><span>Booked rate</span><span>weak</span><span>Show rate</span><span>stable</span><span>Confidence</span><span>medium</span></div>
      </div>
      <div className="rounded-[16px] p-4 text-[#fffaf1]" style={{ backgroundColor: CASE_STYLES.meta.dark }}>
        <Label dark>Next move</Label>
        <div className="mt-8 text-[24px] leading-8">Repair follow-up</div>
        <div className="mt-4 text-[12px] leading-5 text-[#fffaf1]/60">before changing creative</div>
      </div>
    </div>
  );
}
