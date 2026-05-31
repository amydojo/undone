import React from "react";
import { Filter } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import { filters } from "../../data/records";
import { cx } from "../../utils/cx";

export default function RecordRail({ recordsList, activeRecord, setActiveRecord, openWorkspace, activeFilter, setActiveFilter }) {
  return (
    <aside className="border-r border-[#11100d]/10 bg-[#f0eadf]/68 p-4 lg:h-[calc(100vh-73px)] lg:overflow-y-auto" aria-label="Record rail">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#11100d]/42">records</div>
        <Filter className="h-3.5 w-3.5 text-[#11100d]/34" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2" aria-label="Record filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-label={`Filter records by ${filter}`}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={cx(
              "rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] transition",
              activeFilter === filter
                ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]"
                : "border-[#11100d]/10 text-[#11100d]/44 hover:border-[#11100d]/24 hover:text-[#11100d]"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {recordsList.length > 0 ? (
          recordsList.map((record) => {
            const active = activeRecord.slug === record.slug;
            return (
              <button
                key={record.slug}
                type="button"
                aria-label={`Open ${record.title}`}
                onClick={() => setActiveRecord(record)}
                onDoubleClick={() => openWorkspace(record)}
                className={cx(
                  "group w-full rounded-[24px] border p-4 text-left transition",
                  active ? "border-[#11100d] bg-[#11100d] text-[#f7f1e7]" : "border-[#11100d]/10 bg-[#fffaf1]/50 text-[#11100d] hover:border-[#11100d]/24 hover:bg-[#fffaf1]"
                )}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className={cx("text-[10px] uppercase tracking-[0.2em]", active ? "text-[#f7f1e7]/46" : "text-[#11100d]/40")}>{record.id}</span>
                  <AccentDot record={record} size="h-2.5 w-2.5" />
                </div>
                <div className="text-[22px] leading-[1.02] tracking-[-0.035em]">{record.title}</div>
                <div className={cx("mt-3 text-[10px] uppercase tracking-[0.14em]", active ? "text-[#f7f1e7]/42" : "text-[#11100d]/42")}>{record.status} / {record.type}</div>
              </button>
            );
          })
        ) : (
          <div className="rounded-[24px] border border-[#11100d]/10 bg-[#fffaf1]/55 p-4 text-sm leading-6 text-[#11100d]/58">No matching records.</div>
        )}
      </div>
    </aside>
  );
}
