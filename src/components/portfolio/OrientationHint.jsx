import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cx } from "../../utils/cx";

const COPY_BY_VARIANT = {
  desktop: {
    eyebrow: "Start here",
    title: "Choose a case file.",
    detail: "Then open receipts on the right.",
  },
  mobile: {
    eyebrow: "Case switcher",
    title: "Switch files here.",
    detail: "Receipts are in the next tab.",
  },
};

export default function OrientationHint({ variant = "desktop", visible, onDismiss }) {
  const prefersReducedMotion = useReducedMotion();
  const copy = COPY_BY_VARIANT[variant] ?? COPY_BY_VARIANT.desktop;
  const isMobile = variant === "mobile";

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.aside
          data-testid={`orientation-hint-${variant}`}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: isMobile ? 0 : -4, y: isMobile ? 4 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: isMobile ? 0 : -4, y: isMobile ? 4 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0.08 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={cx(
            isMobile
              ? "absolute left-4 top-[66px] z-40 w-[280px] rounded-[8px] border border-[#11100d]/22 bg-[#fffaf1] px-3 py-2 shadow-[0_10px_24px_rgba(17,16,13,0.12)]"
              : "absolute left-6 top-[136px] z-20 w-[272px] rounded-[8px] border border-[#11100d]/35 bg-[#fffaf1] px-3.5 py-3 shadow-[0_12px_28px_rgba(17,16,13,0.16)]"
          )}
        >
          <span
            className={cx(
              "pointer-events-none absolute",
              isMobile
                ? "-top-3 left-8 h-3 w-px bg-[#11100d]/58 shadow-[0_0_0_1px_rgba(247,241,231,0.72)]"
                : "-bottom-3 left-8 h-3 w-px bg-[#11100d]/70 shadow-[0_0_0_1px_rgba(247,241,231,0.72)]"
            )}
            aria-hidden="true"
          />
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p
                className={cx(
                  "text-[9px] uppercase leading-none tracking-[0.18em]",
                  isMobile ? "text-[#11100d]/38" : "text-[#11100d]/46"
                )}
              >
                {copy.eyebrow}
              </p>
              <p
                className={cx(
                  "mt-1.5 font-medium leading-[1.3]",
                  isMobile ? "text-[12px] text-[#11100d]/78" : "text-[13px] text-[#11100d]/88"
                )}
              >
                {copy.title}
              </p>
              <p
                className={cx(
                  "leading-[1.4]",
                  isMobile ? "mt-0.5 text-[10px] text-[#11100d]/48" : "mt-1 text-[11px] text-[#11100d]/58"
                )}
              >
                {copy.detail}
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss orientation hint"
              onClick={onDismiss}
              className={cx(
                "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2",
                isMobile
                  ? "text-[#11100d]/36 hover:bg-[#11100d]/5 hover:text-[#11100d]/62 focus-visible:ring-[#11100d]/20"
                  : "text-[#11100d]/38 hover:bg-[#11100d]/5 hover:text-[#11100d]/68 focus-visible:ring-[#11100d]/24"
              )}
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
