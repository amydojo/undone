import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function SprintLinkCard({ compact = false }) {
  return (
    <a
      href="/mens-wellness-lead-page-sprint"
      aria-label="Open Men’s Wellness Sprint one-page consult offer"
      className={`group flex w-full items-center gap-3 rounded-[16px] border border-[#315f8e]/18 bg-[#fffaf1]/72 text-left text-[#11100d] transition hover:border-[#315f8e]/36 hover:bg-[#fffaf1] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315f8e]/24 ${
        compact ? "min-h-[68px] px-4 py-3.5" : "min-h-[72px] px-4 py-4"
      }`}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full border border-[#315f8e]/22 bg-[#6e9fff] shadow-[0_0_0_3px_rgba(110,159,255,0.1)]"
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <h3 className={`${compact ? "text-[14px]" : "text-[15px]"} leading-5 tracking-[-0.015em]`}>
          Men’s Wellness Sprint
        </h3>
        <p className="mt-0.5 text-[10px] tracking-[0.01em] text-[#11100d]/48">
          One-page consult offer
        </p>
      </div>

      <span className="flex shrink-0 items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-[#315f8e]/72">
        Open
        <ArrowUpRight
          className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
