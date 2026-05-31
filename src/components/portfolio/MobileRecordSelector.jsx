import React, { useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import { filters } from "../../data/records";
import { cx } from "../../utils/cx";

export default function MobileRecordSelector({
  recordsList,
  activeRecord,
  setActiveRecord,
  activeFilter,
  setActiveFilter,
  isOpen,
  setIsOpen,
}) {
  // Close sheet on Escape
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function selectRecord(record) {
    setActiveRecord(record);
    setIsOpen(false);
  }

  return (
    <>
      {/* Compact selector bar */}
      <div className="border-b border-[#11100d]/10 bg-[#f0eadf]/80 px-4 py-3 lg:hidden">
        <button
          type="button"
          aria-label="Open record selector"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between gap-3 rounded-[14px] border border-[#11100d]/12 bg-[#fffaf1]/70 px-4 py-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            <AccentDot record={activeRecord} size="h-2.5 w-2.5 shrink-0" />
            <div className="min-w-0 text-left">
              <div className="truncate text-[11px] font-medium tracking-[-0.01em] text-[#11100d]">
                {activeRecord.title}
              </div>
              <div className="truncate text-[9px] uppercase tracking-[0.14em] text-[#11100d]/48">
                {activeRecord.status} / {activeRecord.category}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/40">
              {activeRecord.id}
            </span>
            <ChevronDown className="h-4 w-4 text-[#11100d]/40" />
          </div>
        </button>
      </div>

      {/* Bottom sheet overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Record selector"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#11100d]/40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 flex max-h-[82vh] flex-col overflow-hidden rounded-t-[24px] bg-[#f7f1e7] shadow-[0_-8px_40px_rgba(17,16,13,0.18)]">
            {/* Handle + header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-[#11100d]/14 absolute left-1/2 top-3 -translate-x-1/2" />
              <div className="text-[9px] uppercase tracking-[0.22em] text-[#11100d]/42 mt-1">
                Records
              </div>
              <button
                type="button"
                aria-label="Close record selector"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-[#11100d]/12 bg-[#fffaf1] p-1.5 text-[#11100d]/60"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-1.5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-label={`Filter by ${filter}`}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cx(
                    "shrink-0 rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] transition",
                    activeFilter === filter
                      ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]"
                      : "border-[#11100d]/10 text-[#11100d]/44"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Record rows */}
            <div className="overflow-y-auto px-4 pb-6">
              {recordsList.length > 0 ? (
                <div className="space-y-2">
                  {recordsList.map((record) => {
                    const active = activeRecord.slug === record.slug;
                    return (
                      <button
                        key={record.slug}
                        type="button"
                        aria-label={`Select ${record.title}`}
                        onClick={() => selectRecord(record)}
                        className={cx(
                          "flex w-full items-center gap-3 rounded-[16px] border px-4 py-3 text-left transition",
                          active
                            ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]"
                            : "border-[#11100d]/10 bg-[#fffaf1]/60 text-[#11100d]"
                        )}
                      >
                        <AccentDot record={record} size="h-2.5 w-2.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div
                            className={cx(
                              "truncate text-sm leading-5",
                              active ? "text-[#f7f1e7]" : "text-[#11100d]"
                            )}
                          >
                            {record.title}
                          </div>
                          <div
                            className={cx(
                              "truncate text-[9px] uppercase tracking-[0.12em]",
                              active ? "text-[#f7f1e7]/50" : "text-[#11100d]/42"
                            )}
                          >
                            {record.type} / {record.category}
                          </div>
                        </div>
                        <span
                          className={cx(
                            "shrink-0 text-[9px] uppercase tracking-[0.14em]",
                            active ? "text-[#f7f1e7]/50" : "text-[#11100d]/38"
                          )}
                        >
                          {record.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1]/55 p-4 text-sm text-[#11100d]/58">
                  No matching records.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
