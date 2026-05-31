import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { profile } from "../../data/profile";
import { cx } from "../../utils/cx";

export default function ProfileStrip() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mt-5 rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/58 p-5" aria-label="Profile strip">
      {/* Mobile compact identity */}
      <div className="lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Amy Do</div>
            <p className="text-[13px] font-medium leading-5 tracking-[-0.01em] text-[#11100d]">
              {profile.positioning}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <a
              href={profile.resumeHref}
              aria-label="Open resume"
              className="inline-flex items-center justify-center rounded-full bg-[#11100d] px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-[#f7f1e7] transition active:scale-[0.98]"
            >
              résumé
            </a>
            <a
              href={`mailto:${profile.contact}`}
              className="inline-flex items-center justify-center rounded-full border border-[#11100d]/12 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/60 transition active:scale-[0.98]"
            >
              contact
            </a>
          </div>
        </div>

        {/* Collapsible details */}
        <button
          type="button"
          aria-label={expanded ? "Hide more about Amy" : "Show more about Amy"}
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex w-full items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/44"
        >
          more about Amy
          <ChevronDown className={cx("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
        </button>

        {expanded && (
          <div className="mt-3 space-y-3 border-t border-[#11100d]/10 pt-3">
            <div>
              <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Role fit</div>
              <div className="flex flex-wrap gap-1.5">
                {profile.roleFits.map((item) => (
                  <span key={item} className="rounded-full border border-[#11100d]/10 px-3 py-1.5 text-[10px] text-[#11100d]/62">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Tool fluency</div>
              <div className="flex flex-wrap gap-1.5">
                {profile.toolFluency.map((item) => (
                  <span key={item} className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7]/60 px-3 py-1.5 text-[10px] text-[#11100d]/62">{item}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop full layout */}
      <div className="hidden lg:grid lg:grid-cols-[1.2fr_1fr_1fr_180px] lg:gap-3">
        {/* Identity */}
        <div>
          <div className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Amy Do</div>
          <p className="mb-3 text-[13px] font-medium leading-5 tracking-[-0.01em] text-[#11100d]">{profile.positioning}</p>
          <p className="max-w-xl text-sm leading-6 text-[#11100d]/60">{profile.oneSentence}</p>
        </div>

        {/* Role fit */}
        <div>
          <div className="mb-3 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Role fit</div>
          <div className="flex flex-wrap gap-1.5">
            {profile.roleFits.map((item) => (
              <span key={item} className="rounded-full border border-[#11100d]/10 px-3 py-1.5 text-[10px] text-[#11100d]/62">{item}</span>
            ))}
          </div>
        </div>

        {/* Tool fluency */}
        <div>
          <div className="mb-3 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Tool fluency</div>
          <div className="flex flex-wrap gap-1.5">
            {profile.toolFluency.map((item) => (
              <span key={item} className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7]/60 px-3 py-1.5 text-[10px] text-[#11100d]/62">{item}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col justify-between gap-3">
          <div>
            <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">Contact</div>
            <a href={`mailto:${profile.contact}`} className="text-sm text-[#11100d]/70 underline decoration-[#11100d]/20 underline-offset-4 hover:text-[#11100d]">{profile.contact}</a>
          </div>
          <a
            href={profile.resumeHref}
            aria-label="Open resume"
            className="inline-flex items-center justify-center rounded-full bg-[#11100d] px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#f7f1e7] transition hover:scale-[1.02]"
          >
            résumé
          </a>
        </div>
      </div>
    </section>
  );
}
