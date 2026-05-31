import React from "react";
import { cx } from "../../utils/cx";

export default function MetricPill({ metric, dark = false }) {
  return (
    <div className={cx("rounded-full border px-3 py-2", dark ? "border-[#f7f1e7]/12 bg-[#f7f1e7]/5" : "border-[#11100d]/10 bg-[#fffaf1]/65")}>
      <div className={cx("text-[17px] font-medium leading-none tracking-[-0.025em]", dark ? "text-[#f7f1e7]" : "text-[#11100d]")}>{metric.value}</div>
      <div className={cx("mt-1 text-[9px] uppercase tracking-[0.14em]", dark ? "text-[#f7f1e7]/42" : "text-[#11100d]/42")}>{metric.label}</div>
    </div>
  );
}
