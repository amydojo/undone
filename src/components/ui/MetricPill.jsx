import React from "react";
import { cx } from "../../utils/cx";

export default function MetricPill({ metric, dark = false, className }) {
  return (
    <div className={cx("min-w-0 px-3 py-4 lg:px-4 xl:px-5 xl:py-6", className)}>
      <div className={cx("text-[36px] font-light leading-none tracking-[-0.04em] lg:text-[44px] xl:text-[60px]", dark ? "text-[#f7f1e7]" : "text-[#11100d]")}>{metric.value}</div>
      <div className={cx("mt-2.5 text-[9px] uppercase tracking-[0.10em] leading-[1.4] lg:tracking-[0.12em] xl:text-[10px]", dark ? "text-[#f7f1e7]/46" : "text-[#11100d]/38")}>{metric.label}</div>
    </div>
  );
}
