import React from "react";
import { cx } from "../../utils/cx";

export default function MetricPill({ metric, dark = false, className }) {
  return (
    <div className={cx("min-w-0 px-[14px] py-3 text-center", className)}>
      <div className={cx("text-[20px] font-medium leading-none tracking-[-0.03em] lg:text-[24px]", dark ? "text-[#f7f1e7]" : "text-[#11100d]")}>{metric.value}</div>
      <div className={cx("mt-2 text-[9px] uppercase tracking-[0.14em]", dark ? "text-[#f7f1e7]/46" : "text-[#11100d]/42")}>{metric.label}</div>
    </div>
  );
}
