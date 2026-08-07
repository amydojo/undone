import React from "react";
import SimplifiedCaseReceiptVisual from "./SimplifiedCaseReceiptVisual";
import BadDayReceiptVisual from "./BadDayReceiptVisual";

const BAD_DAY_BODY_TYPES = new Set([
  "receiptMachine",
  "threeEndings",
  "carryForward",
  "oneThingMode",
]);

export default function MirrorReceiptVisual(props) {
  if (BAD_DAY_BODY_TYPES.has(props.receiptBodyType)) {
    return <BadDayReceiptVisual {...props} />;
  }

  return <SimplifiedCaseReceiptVisual caseKind="mirror" {...props} />;
}
