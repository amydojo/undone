import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { profile } from "../../data/profile";
import { cx } from "../../utils/cx";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";

function canWriteToClipboard() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  return Boolean(window.isSecureContext && typeof navigator.clipboard?.writeText === "function");
}

export default function ProfileStrip({ className }) {
  const [expanded, setExpanded] = useState(false);
  const [clipboardSupported, setClipboardSupported] = useState(() => canWriteToClipboard());
  const [copyStatus, setCopyStatus] = useState("idle");
  const resumeHref = resolvePublicSrc(profile.resumeHref);
  const copyButtonLabel =
    copyStatus === "copied"
      ? "Copied"
      : copyStatus === "error"
        ? "Copy failed"
        : clipboardSupported
          ? "Copy email"
          : "Copy unavailable";

  useEffect(() => {
    setClipboardSupported(canWriteToClipboard());
  }, []);

  useEffect(() => {
    if (copyStatus === "idle") return undefined;
    const timeout = window.setTimeout(() => setCopyStatus("idle"), copyStatus === "copied" ? 1600 : 2400);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  async function copyEmail() {
    if (!canWriteToClipboard()) {
      setClipboardSupported(false);
      setCopyStatus("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(profile.contact);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <div className={cx("", className)}>
      {/* Identity + action row */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-[13px] font-medium leading-none text-[#11100d]/78">{profile.name}</span>
          <span className="text-[10px] leading-none text-[#11100d]/42">Design Technologist</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#11100d] px-4 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e7] lg:h-8 lg:px-3.5 lg:tracking-[0.14em]"
          >
            résumé
          </a>
          <a
            href={`mailto:${profile.contact}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#11100d]/10 px-4 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/58 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e7] lg:h-8 lg:px-3.5 lg:tracking-[0.14em]"
          >
            contact
          </a>
          <button
            type="button"
            aria-label={expanded ? "Hide profile details" : "Show profile details"}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex h-11 items-center gap-1.5 rounded-[6px] px-3 text-[9px] uppercase tracking-[0.11em] text-[#11100d]/42 transition hover:text-[#11100d]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/20 lg:h-8 lg:px-1.5 lg:tracking-[0.12em]"
          >
            more
            <ChevronDown
              className={cx("h-3 w-3 transition-transform", expanded && "rotate-180")}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="mt-4 border border-[#11100d]/8 bg-[#f7f1e7]/60 px-4 py-3">
          <div className="grid gap-4 lg:grid-cols-[1.12fr_0.86fr_1fr]">
            <div className="border-b border-[#11100d]/8 pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
              <div className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Positioning</div>
              <p className="text-[12px] leading-[1.6] text-[#11100d]/62">{profile.detailsPositioning}</p>
            </div>

            <div className="border-b border-[#11100d]/8 pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
              <div className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Email</div>
              <a href={`mailto:${profile.contact}`} className="rounded-[3px] text-[12px] leading-5 text-[#11100d]/62 transition hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/18 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e7]">
                {profile.contact}
              </a>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  disabled={!clipboardSupported}
                  aria-label={clipboardSupported ? "Copy email address" : "Copy email unavailable; email address is visible"}
                  aria-describedby={clipboardSupported ? undefined : "profile-copy-email-support"}
                  className={cx(
                    "rounded-[3px] text-[9px] uppercase tracking-[0.13em] text-[#11100d]/42 transition hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/18 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e7]",
                    !clipboardSupported && "cursor-not-allowed text-[#11100d]/24 hover:text-[#11100d]/24"
                  )}
                >
                  <span aria-live="polite">{copyButtonLabel}</span>
                </button>
                {!clipboardSupported && (
                  <span id="profile-copy-email-support" className="sr-only">
                    Clipboard copying is unavailable in this browser. The email address is visible above.
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <div className="mb-1.5 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Focus</div>
                <p className="text-[11px] leading-5 text-[#11100d]/54">{profile.detailsFocus}</p>
              </div>
              <div>
                <div className="mb-1.5 text-[9px] uppercase tracking-[0.15em] text-[#11100d]/34">Tools</div>
                <p className="text-[11px] leading-5 text-[#11100d]/54">{profile.detailsTools}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
