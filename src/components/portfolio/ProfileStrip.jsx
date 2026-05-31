import React from "react";
import { profile } from "../../data/profile";

export default function ProfileStrip() {
  return (
    <section className="mt-5 grid gap-3 rounded-[32px] border border-[#11100d]/10 bg-[#fffaf1]/58 p-4 lg:grid-cols-[1.15fr_0.85fr_0.85fr_180px] lg:p-5" aria-label="Profile strip">
      <div>
        <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">who amy is</div>
        <p className="max-w-xl text-base leading-7 tracking-[-0.012em] text-[#11100d]/68">{profile.intro}</p>
      </div>

      <div>
        <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">looking for</div>
        <div className="flex flex-wrap gap-2">
          {profile.lookingFor.map((item) => (
            <span key={item} className="rounded-full border border-[#11100d]/10 px-3 py-2 text-[10px] uppercase tracking-[0.13em] text-[#11100d]/58">{item}</span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">current focus</div>
        <div className="grid gap-2">
          {profile.currentFocus.map((item) => (
            <div key={item} className="text-sm leading-5 text-[#11100d]/62">→ {item}</div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3">
        <div>
          <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">contact</div>
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
    </section>
  );
}
