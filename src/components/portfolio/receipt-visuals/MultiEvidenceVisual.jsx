import React from "react";

export default function MultiEvidenceVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "followUpTimingRules") {
    const items = ["Day 0", "Day 2", "Day 7", "Day 21"];
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((item, index) => (
          <div key={item} className="relative rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3 text-center">
            <div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/38">{item}</div>
            <div className="mt-6 text-[12px] text-[#11100d]/72">{["Welcome", "Follow-up", "Education", "Reactivate"][index]}</div>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "emailProductionSystem") {
    const modules = (body?.modules ?? []).slice(0, 5);
    return (
      <div className="mx-auto max-w-[520px] overflow-hidden rounded-[16px] border border-[#11100d]/12 bg-[#fffaf1]">
        {modules.map((item, index) => (
          <div key={item.module} className={`border-b border-[#11100d]/8 px-4 ${index === 1 ? "py-8" : "py-3"} last:border-b-0`}>
            <div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/38">{item.module}</div>
            <div className="mt-1 text-[12px] text-[#11100d]/66">{item.purpose}</div>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "mailchimpRoutingMap") {
    const examples = ["Smooth MD + Microneedling + New", "Dr. Vigor + Lab Panel + Interested", "Dr. Neo + Hair + Lapsed"];
    return (
      <div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[12px]">
          <span className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2">BRAND</span><span>+</span>
          <span className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2">SERVICE</span><span>+</span>
          <span className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2">STATE</span><span>=</span>
          <span className="rounded-full px-3 py-2" style={{ backgroundColor: accent }}>MESSAGE</span>
        </div>
        <div className="mt-5 space-y-2">
          {examples.map((example) => <div key={example} className="rounded-[12px] border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2 text-[11px] text-[#11100d]/62">{example}</div>)}
        </div>
      </div>
    );
  }

  const states = ["New", "Active", "Lapsed", "Returning"];
  return (
    <div>
      <div className="flex items-center gap-2">
        {states.map((state, index) => (
          <React.Fragment key={state}>
            {index > 0 && <span className="text-[#11100d]/24">→</span>}
            <div className="flex min-h-[72px] flex-1 items-center justify-center rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] px-2 text-center text-[12px]">{state}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-[#11100d]/56 sm:grid-cols-6">
        {["Smooth MD", "Dr. Vigor", "Dr. Neo", "Dr. Food", "Dr. Freeze", "Dr. Sculpt"].map((brand) => <div key={brand} className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-2 py-1.5">{brand}</div>)}
      </div>
    </div>
  );
}
