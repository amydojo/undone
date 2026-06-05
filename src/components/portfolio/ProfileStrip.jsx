import React, { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import { cx } from "../../utils/cx";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";

const positioning = "I turn messy business and product problems into clear systems, interfaces, and proof-backed execution.";
const focus = "Design systems · AI prototyping · workflow logic · proof artifacts";
const tools = "Figma · React · Airtable · Storybook · Playwright · OpenAI · Replit";

export default function ProfileStrip({ className }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const resumeHref = resolvePublicSrc(profile.resumeHref);

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) return;
      await navigator.clipboard.writeText(profile.contact);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

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
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
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
            className="inline-flex h-8 items-center rounded-full border border-[#11100d]/10 px-3.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/58"
          >
            details
          </button>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="mt-4 border border-[#11100d]/8 bg-[#f7f1e7]/60 px-4 py-3">
          <div className="grid gap-4 lg:grid-cols-[1.12fr_0.86fr_1fr]">
            <div className="border-b border-[#11100d]/8 pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
              <div className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Positioning</div>
              <p className="text-[12px] leading-[1.6] text-[#11100d]/62">{positioning}</p>
            </div>

            <div className="border-b border-[#11100d]/8 pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
              <div className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Email</div>
              <a href={`mailto:${profile.contact}`} className="text-[12px] leading-5 text-[#11100d]/62 transition hover:text-[#11100d]">
                {profile.contact}
              </a>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/42 transition hover:text-[#11100d]"
                >
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <div className="mb-1.5 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Focus</div>
                <p className="text-[11px] leading-5 text-[#11100d]/54">{focus}</p>
              </div>
              <div>
                <div className="mb-1.5 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Tools</div>
                <p className="text-[11px] leading-5 text-[#11100d]/54">{tools}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
