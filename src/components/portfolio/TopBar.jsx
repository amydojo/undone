import React from "react";
import { profile } from "../../data/profile";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";

export default function TopBar({ onHomeReset }) {
  const resumeHref = resolvePublicSrc(profile.resumeHref);

  return (
    <header className="relative flex flex-col gap-3 border-b border-[#11100d]/10 bg-[#f7f1e7]/88 px-4 py-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:px-6">
      {/* Identity: mobile = stacked + actions right; desktop = inline */}
      <div className="flex items-start justify-between gap-3 lg:items-center">
        <button
          type="button"
          aria-label="Reset portfolio to overview"
          onClick={onHomeReset}
          className="flex min-h-11 min-w-0 flex-col justify-center gap-0.5 rounded-[6px] text-left transition hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/25 sm:flex-row sm:items-baseline sm:gap-2.5 lg:min-h-0"
        >
          <span className="text-[13px] font-medium leading-none text-[#11100d]/82">Amy Do</span>
          <span className="text-[10px] leading-none text-[#11100d]/44">Design Technologist</span>
        </button>
        {/* Mobile-only: résumé + contact always visible */}
        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
            className="inline-flex h-11 items-center rounded-full bg-[#11100d] px-4 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]"
          >
            résumé
          </a>
          <a
            href={`mailto:${profile.contact}`}
            className="inline-flex h-11 items-center rounded-full border border-[#11100d]/10 px-4 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/54"
          >
            contact
          </a>
        </div>
      </div>

      {/* Desktop right: résumé · contact */}
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <a href={resumeHref} target="_blank" rel="noopener noreferrer" aria-label="Open resume" className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36 transition hover:text-[#11100d]">résumé</a>
        <span className="text-[#11100d]/14" aria-hidden="true">·</span>
        <a href={`mailto:${profile.contact}`} className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36 transition hover:text-[#11100d]">contact</a>
      </div>
    </header>
  );
}
