import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { profile } from "../../data/profile";
import { cx } from "../../utils/cx";

export default function ProfileStrip({ className }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cx("", className)}>
      {/* Identity + action row */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[12px] font-medium text-[#11100d]/68">{profile.name}</span>
          <span className="text-[#11100d]/18" aria-hidden="true">·</span>
          <span className="text-[11px] text-[#11100d]/38">Design Technologist</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={profile.resumeHref}
            aria-label="Open resume"
            className="inline-flex h-8 items-center justify-center rounded-full bg-[#11100d] px-3.5 text-[9px] uppercase tracking-[0.14em] text-[#f7f1e7]"
          >
            résumé
          </a>
          <a
            href={`mailto:${profile.contact}`}
            className="inline-flex h-8 items-center justify-center rounded-full border border-[#11100d]/10 px-3.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/58"
          >
            contact
          </a>
          <button
            type="button"
            aria-label={expanded ? "Hide details" : "Show details"}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#11100d]/10 px-3.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/58"
          >
            details
            <ChevronDown className={cx("h-3 w-3 transition-transform", expanded && "rotate-180")} />
          </button>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="mt-4 grid gap-5 rounded-[14px] border border-[#11100d]/6 bg-[#f7f1e7]/60 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Summary</div>
            <p className="text-[12px] leading-[1.65] text-[#11100d]/56">{profile.oneSentence}</p>
          </div>
          <div>
            <div className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Role fit</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.roleFits.map((item) => (
                <span key={item} className="rounded-full border border-[#11100d]/8 px-2 py-0.5 text-[9px] text-[#11100d]/52">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Tool fluency</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.toolFluency.map((item) => (
                <span key={item} className="rounded-full border border-[#11100d]/8 bg-[#fffaf1]/70 px-2 py-0.5 text-[9px] text-[#11100d]/52">{item}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
