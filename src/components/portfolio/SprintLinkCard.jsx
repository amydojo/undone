import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function SprintLinkCard({ compact = false }) {
  return (
    <a
      href="/mens-wellness-lead-page-sprint"
      className={`group block border border-[#315f8e]/16 bg-[#eaf1f7] text-[#11100d] transition hover:border-[#315f8e]/32 hover:bg-[#e3edf5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315f8e]/28 ${
        compact ? "rounded-[16px] p-4" : "rounded-[22px] p-4"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[8px] uppercase tracking-[0.18em] text-[#315f8e]">Service sprint</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-[#315f8e]/54 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
      <h3 className={`${compact ? "mt-3 text-[15px]" : "mt-5 text-[18px]"} leading-tight tracking-[-0.025em]`}>
        Men’s Wellness Lead Page Sprint
      </h3>
      <p className="mt-2 text-[10px] leading-[1.55] text-[#11100d]/50">
        A focused landing page offer for TRT, hormone health, ED, weight loss, and performance clinics that need clearer consult paths.
      </p>
      <span className="mt-4 inline-flex text-[9px] uppercase tracking-[0.14em] text-[#315f8e]">View sprint</span>
    </a>
  );
}
