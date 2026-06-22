import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import OrientationHint from "./OrientationHint";
import { filters } from "../../data/records";
import { formatMetadataLabel } from "../../utils/caseMetadata";
import { cx } from "../../utils/cx";
import SprintLinkCard from "./SprintLinkCard";

const FILE_SETTLE_MOTION = {
  duration: 0.16,
  ease: [0.22, 1, 0.36, 1],
};

const FILE_PRESS_MOTION = {
  duration: 0.06,
  ease: [0.22, 1, 0.36, 1],
};

const FILE_STAMP_MOTION = {
  duration: 0.1,
  ease: [0.22, 1, 0.36, 1],
};

const FILE_STAMP_EXIT_MOTION = {
  duration: 0.06,
  ease: [0.22, 1, 0.36, 1],
};

const FILE_STAMP_VARIANTS = {
  initial: (prefersReducedMotion) =>
    prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0, y: 1 },
  animate: (prefersReducedMotion) => ({
    ...(prefersReducedMotion ? {} : { height: "auto", y: 0 }),
    opacity: 1,
    transition: prefersReducedMotion ? { duration: 0.04 } : FILE_STAMP_MOTION,
  }),
  exit: (prefersReducedMotion) => ({
    ...(prefersReducedMotion ? {} : { height: 0, y: 1 }),
    opacity: 0,
    transition: prefersReducedMotion ? { duration: 0.04 } : FILE_STAMP_EXIT_MOTION,
  }),
};

export default function RecordRail({
  recordsList,
  activeRecord,
  setActiveRecord,
  openWorkspace,
  activeFilter,
  setActiveFilter,
  caseNumbers,
  orientationHintVisible,
  onOrientationDismiss,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [pressedSlug, setPressedSlug] = React.useState(null);

  return (
    <aside className="scrollbar-portfolio relative border-r border-[#11100d]/10 bg-[#f0eadf]/68 p-4 lg:h-full lg:overflow-y-auto" aria-label="Record rail">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-[0.22em] text-[#11100d]/42">Cases</div>
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5" aria-label="Record filters">
        {filters.map((filter) => {
          const filterLabel = formatMetadataLabel(filter);
          return (
          <button
            key={filter}
            type="button"
            aria-label={`Filter cases by ${filterLabel}`}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={cx(
              "rounded-full border px-3 py-1.5 text-[10px] tracking-[0.01em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/22 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0eadf]",
              activeFilter === filter
                ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]"
                : "border-[#11100d]/10 text-[#11100d]/44 hover:border-[#11100d]/24 hover:text-[#11100d]"
            )}
          >
            {filterLabel}
          </button>
          );
        })}
      </div>

      <OrientationHint
        visible={orientationHintVisible}
        onDismiss={onOrientationDismiss}
      />

      <div className="space-y-2">
        {recordsList.length > 0 ? (
          recordsList.map((record) => {
            const active = activeRecord.slug === record.slug;
            const pressed = pressedSlug === record.slug;
            const caseNumber = caseNumbers?.get(record.slug) ?? record.id;
            return (
              <motion.button
                key={record.slug}
                type="button"
                data-testid={`case-record-${record.slug}`}
                aria-label={`Select ${record.title}`}
                onClick={() => {
                  onOrientationDismiss();
                  setActiveRecord(record);
                }}
                onDoubleClick={() => openWorkspace(record)}
                initial={false}
                animate={
                  prefersReducedMotion
                    ? {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotateZ: 0,
                        zIndex: active ? 3 : 1,
                        opacity: 1,
                        boxShadow: "0 0px 0px rgba(17, 16, 13, 0)",
                      }
                    : {
                        x: 0,
                        y: pressed ? (active ? 0 : 1) : active ? -1 : 0,
                        scale: pressed ? (active ? 0.999 : 0.998) : active ? 1.001 : 1,
                        rotateZ: 0,
                        zIndex: active ? 3 : 1,
                        opacity: pressed && !active ? 0.98 : 1,
                        boxShadow: active
                          ? "0 10px 22px rgba(17, 16, 13, 0.09)"
                          : "0 0px 0px rgba(17, 16, 13, 0)",
                      }
                }
                transition={prefersReducedMotion ? { duration: 0 } : pressed ? FILE_PRESS_MOTION : FILE_SETTLE_MOTION}
                onPointerDown={() => setPressedSlug(record.slug)}
                onPointerUp={() => setPressedSlug(null)}
                onPointerCancel={() => setPressedSlug(null)}
                onPointerLeave={(event) => {
                  if (event.buttons > 0) setPressedSlug(null);
                }}
                className={cx(
                  "group relative w-full transform-gpu rounded-[22px] border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0eadf]",
                  active ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7] focus-visible:ring-[#11100d]/35" : "border-[#11100d]/10 bg-[#fffaf1]/50 text-[#11100d] hover:border-[#11100d]/24 hover:bg-[#fffaf1] focus-visible:ring-[#11100d]/24"
                )}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className={cx("text-[9px] uppercase tracking-[0.2em]", active ? "text-[#f7f1e7]/46" : "text-[#11100d]/40")}>{caseNumber}</span>
                  <AccentDot record={record} size="h-2.5 w-2.5" />
                </div>
                <div className="text-[20px] leading-[1.04] tracking-[-0.03em]">{record.title}</div>
                <div className={cx("mt-2 text-[10px] tracking-[0.01em]", active ? "text-[#f7f1e7]/46" : "text-[#11100d]/46")}>{formatMetadataLabel(record.status)} / {formatMetadataLabel(record.type)}</div>
                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.span
                      key="selected-case-stamp"
                      aria-hidden="true"
                      custom={prefersReducedMotion}
                      variants={FILE_STAMP_VARIANTS}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="mt-4 flex w-full items-center justify-between overflow-hidden rounded-full border border-[#f7f1e7]/20 px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/62"
                    >
                      selected case <ArrowUpRight className="h-3 w-3" />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            );
          })
        ) : (
          <div className="rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1]/55 p-4 text-sm leading-6 text-[#11100d]/58">No matching records.</div>
        )}
      </div>

      <div className="mt-8 border-t border-[#11100d]/10 pt-4">
        <div className="mb-3 text-[8px] uppercase tracking-[0.2em] text-[#11100d]/34">
          Service offer
        </div>
        <SprintLinkCard />
      </div>
    </aside>
  );
}
