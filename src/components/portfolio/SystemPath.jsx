import React from "react";
import { cx } from "../../utils/cx";

export default function SystemPath({ record, dark = false, className }) {
  return (
    <div className={cx("min-w-0", className)}>
      <div className={cx("mb-3 text-[10px] uppercase tracking-[0.15em]", dark ? "text-[#f7f1e7]/38" : "text-[#11100d]/38")}>
        system path
      </div>
      <div className="space-y-2 md:hidden">
        {record.path.map((step, index) => (
          <div key={step} className="relative flex items-center gap-3 pl-7">
            {index < record.path.length - 1 ? (
              <span className={cx("absolute left-[7px] top-5 h-6 w-px", dark ? "bg-[#f7f1e7]/16" : "bg-[#11100d]/12")} aria-hidden="true" />
            ) : null}
            <span className={cx("absolute left-0 top-1.5 text-[9px] uppercase tracking-[0.14em]", dark ? "text-[#f7f1e7]/42" : "text-[#11100d]/42")}>{String(index + 1).padStart(2, "0")}</span>
            <span className={cx("text-[12px] uppercase tracking-[0.12em]", dark ? "text-[#f7f1e7]/70" : "text-[#11100d]/68")}>{step}</span>
          </div>
        ))}
      </div>
      <div className="hidden flex-wrap items-center gap-x-3 gap-y-2 md:flex">
        {record.path.map((step, index) => (
          <React.Fragment key={step}>
            <span className={cx("text-[11px] uppercase tracking-[0.13em]", dark ? "text-[#f7f1e7]/68" : "text-[#11100d]/66")}>{step}</span>
            {index < record.path.length - 1 ? <span className={cx("select-none text-[13px]", dark ? "text-[#f7f1e7]/30" : "text-[#11100d]/32")}>→</span> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
