import React, { useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";

export default function TopBar() {
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!contactOpen) return undefined;

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setContactOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setContactOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard?.writeText(profile.contact);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function ContactButton({ className }) {
    return (
      <button
        type="button"
        aria-label="Open contact panel"
        aria-expanded={contactOpen}
        onClick={() => setContactOpen((open) => !open)}
        className={className}
      >
        contact
      </button>
    );
  }

  return (
      <header ref={rootRef} className="relative flex flex-col gap-3 border-b border-[#11100d]/10 bg-[#f7f1e7]/88 px-4 py-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:px-6">
      {/* Identity: mobile = stacked + actions right; desktop = inline */}
      <div className="flex items-start justify-between gap-3 lg:items-center">
        <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-3">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#11100d]">
            <span className="h-2 w-2 rounded-full bg-[#11100d]" />
            <span>Amy Do</span>
          </div>
          <span className="pl-5 text-[9px] text-[#11100d]/36 lg:pl-0">Design Technologist</span>
        </div>
        {/* Mobile-only: résumé + contact always visible */}
        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
            className="inline-flex h-8 items-center rounded-full bg-[#11100d] px-3 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]"
          >
            résumé
          </a>
          <ContactButton className="inline-flex h-8 items-center rounded-full border border-[#11100d]/10 px-3 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/54" />
        </div>
      </div>

      {/* Desktop right: résumé · contact */}
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" aria-label="Open resume" className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36 transition hover:text-[#11100d]">résumé</a>
        <span className="text-[#11100d]/14" aria-hidden="true">·</span>
        <ContactButton className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36 transition hover:text-[#11100d]" />
      </div>

      {contactOpen && (
        <div className="z-40 rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4 text-[#11100d] shadow-[0_14px_36px_rgba(17,16,13,0.1)] lg:absolute lg:right-6 lg:top-[calc(100%-6px)] lg:w-[300px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[13px] font-medium leading-5">Amy Do</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">
                Design Technologist
              </div>
            </div>
            <button
              type="button"
              aria-label="Close contact panel"
              onClick={() => setContactOpen(false)}
              className="rounded-full border border-[#11100d]/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/44 transition hover:text-[#11100d]"
            >
              close
            </button>
          </div>

          <p className="mt-3 text-[11px] leading-5 text-[#11100d]/52">
            Available for design technologist and creative systems roles.
          </p>

          <div className="mt-4">
            <div className="mb-1.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/34">Email</div>
            <a
              href={`mailto:${profile.contact}`}
              className="block rounded-[12px] border border-[#11100d]/8 bg-[#f7f1e7] px-3 py-2 text-[12px] text-[#11100d]/68 transition hover:text-[#11100d]"
            >
              {profile.contact}
            </a>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#11100d] px-3.5 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
            <a
              href={profile.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full border border-[#11100d]/10 px-3.5 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/58"
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
