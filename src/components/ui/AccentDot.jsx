import React from "react";
import { cx } from "../../utils/cx";

export default function AccentDot({ record, size = "h-2 w-2" }) {
  return <span className={cx("rounded-full", size)} style={{ backgroundColor: record.accent }} />;
}
