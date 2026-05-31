import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { profile } from "../../data/profile";
import { cx } from "../../utils/cx";

export default function ProfileStrip({ className }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={cx("rounded-[20px] border border-[#11100d]/8 bg-[#fffaf1]/44 p-4 lg:p-5", className)} aria-label="Profile strip">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">More about Amy</div>
          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#11100d]/66">{profile.positioning}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={profile.resumeHref}
            aria-label="Open resume"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#11100d] px-4 text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]"
          >
            résumé
          </a>
          <a
            href={`mailto:${profile.contact}`}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#11100d]/10 px-4 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/66"
          >
            contact
          </a>
          <button
            type="button"
            aria-label={expanded ? "Hide more about Amy" : "Show more about Amy"}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-4 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/66"
          >
            details
            <ChevronDown className={cx("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 grid gap-4 border-t border-[#11100d]/10 pt-4 lg:grid-cols-[1.15fr_1fr_1fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">Summary</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#11100d]/64">{profile.oneSentence}</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">Role fit</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.roleFits.map((item) => (
                <span key={item} className="rounded-full border border-[#11100d]/10 px-2.5 py-1 text-[10px] text-[#11100d]/62">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">Tool fluency</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.toolFluency.map((item) => (
                <span key={item} className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7]/60 px-2.5 py-1 text-[10px] text-[#11100d]/62">{item}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
