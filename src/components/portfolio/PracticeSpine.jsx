import React from "react";

export default function PracticeSpine() {
  return (
    <section
      aria-label="Practice focus"
      className="border-b border-[#11100d]/10 bg-[#fffaf1]/42"
    >
      <div className="grid gap-2 px-4 py-3 lg:grid-cols-[112px_minmax(0,1fr)_auto] lg:items-center lg:gap-5 lg:px-6">
        <div className="text-[8px] uppercase tracking-[0.2em] text-[#11100d]/36">
          Practice spine
        </div>

        <p className="max-w-[760px] text-[12px] leading-[1.5] tracking-[-0.01em] text-[#11100d]/68 lg:text-[13px]">
          Psychology, interaction design, and code for software that stays humane under pressure.
        </p>

        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 lg:justify-end">
          <span className="text-[8px] uppercase tracking-[0.15em] text-[#11100d]/34">
            Emerging specialization
          </span>
          <span className="text-[11px] font-medium tracking-[-0.01em] text-[#11100d]/78">
            Affective interface engineering
          </span>
        </div>
      </div>
    </section>
  );
}
