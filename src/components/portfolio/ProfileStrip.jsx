import React from "react";
import { profile } from "../../data/profile";

export default function ProfileStrip() {
  return (
    <section className="mt-5 grid gap-3 rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/58 p-5 lg:grid-cols-[1.2fr_1fr_1fr_180px]" aria-label="Profile strip">
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
    </section>
  );
}
