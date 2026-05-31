import React from "react";
import { cx } from "../../utils/cx";

export default function SystemPath({ record, dark = false }) {
  return (
    <div className={cx("rounded-[32px] border p-4", dark ? "border-[#f7f1e7]/10 bg-[#f7f1e7]/5" : "border-[#11100d]/10 bg-[#fffaf1]/64")}>
      <div className={cx("mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]", dark ? "text-[#f7f1e7]/38" : "text-[#11100d]/38")}>
        <span>system path</span>
        <span>{record.id}</span>
      </div>
      <div className="grid gap-2 md:grid-cols-6">
        {record.path.map((step, index) => (
          <div key={step} className="relative">
            <div className={cx("grid min-h-16 place-items-center rounded-[20px] border px-2 text-center text-[10px] uppercase tracking-[0.13em]", dark ? "border-[#f7f1e7]/10 bg-[#f7f1e7]/5 text-[#f7f1e7]/62" : "border-[#11100d]/10 bg-[#f7f1e7] text-[#11100d]/62")}>{step}</div>
            {index < record.path.length - 1 ? <span className={cx("absolute left-full top-1/2 z-10 hidden h-px w-2 md:block", dark ? "bg-[#f7f1e7]/20" : "bg-[#11100d]/20")} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
