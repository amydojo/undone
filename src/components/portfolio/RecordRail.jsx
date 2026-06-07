import React from "react";
import { ArrowUpRight } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import { filters } from "../../data/records";
import { formatMetadataLabel } from "../../utils/caseMetadata";
import { cx } from "../../utils/cx";

export default function RecordRail({ recordsList, activeRecord, setActiveRecord, openWorkspace, activeFilter, setActiveFilter, caseNumbers }) {
  return (
    <aside className="scrollbar-portfolio border-r border-[#11100d]/10 bg-[#f0eadf]/68 p-4 lg:h-full lg:overflow-y-auto" aria-label="Record rail">
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
              "rounded-full border px-3 py-1.5 text-[10px] tracking-[0.01em] transition",
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

      <div className="space-y-2">
        {recordsList.length > 0 ? (
          recordsList.map((record) => {
            const active = activeRecord.slug === record.slug;
            const caseNumber = caseNumbers?.get(record.slug) ?? record.id;
            return (
              <button
                key={record.slug}
                type="button"
                data-testid={`case-record-${record.slug}`}
                aria-label={`Select ${record.title}`}
                onClick={() => setActiveRecord(record)}
                onDoubleClick={() => openWorkspace(record)}
                className={cx(
                  "group w-full rounded-[22px] border p-4 text-left transition",
                  active ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]" : "border-[#11100d]/10 bg-[#fffaf1]/50 text-[#11100d] hover:border-[#11100d]/24 hover:bg-[#fffaf1]"
                )}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className={cx("text-[9px] uppercase tracking-[0.2em]", active ? "text-[#f7f1e7]/46" : "text-[#11100d]/40")}>{caseNumber}</span>
                  <AccentDot record={record} size="h-2.5 w-2.5" />
                </div>
                <div className="text-[20px] leading-[1.04] tracking-[-0.03em]">{record.title}</div>
                <div className={cx("mt-2 text-[10px] tracking-[0.01em]", active ? "text-[#f7f1e7]/46" : "text-[#11100d]/46")}>{formatMetadataLabel(record.status)} / {formatMetadataLabel(record.type)}</div>
                {active ? (
                  <span
                    aria-hidden="true"
                    className="mt-4 flex w-full items-center justify-between rounded-full border border-[#f7f1e7]/20 px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]/62"
                  >
                    selected case <ArrowUpRight className="h-3 w-3" />
                  </span>
                ) : null}
              </button>
            );
          })
        ) : (
          <div className="rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1]/55 p-4 text-sm leading-6 text-[#11100d]/58">No matching records.</div>
        )}
      </div>
    </aside>
  );
}
