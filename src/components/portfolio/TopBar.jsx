import React from "react";
import { Search } from "lucide-react";
import { profile } from "../../data/profile";

export default function TopBar({ search, setSearch, searchInputRef }) {
  return (
      <header className="grid grid-cols-1 gap-3 border-b border-[#11100d]/10 bg-[#f7f1e7]/88 px-4 py-4 backdrop-blur-xl lg:grid-cols-[300px_1fr_auto] lg:px-6">
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
            aria-label="Open resume"
            className="inline-flex h-8 items-center rounded-full bg-[#11100d] px-3 text-[9px] uppercase tracking-[0.13em] text-[#f7f1e7]"
          >
            résumé
          </a>
          <a
            href={`mailto:${profile.contact}`}
            aria-label="Send email"
            className="inline-flex h-8 items-center rounded-full border border-[#11100d]/10 px-3 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/54"
          >
            contact
          </a>
        </div>
      </div>

      <label className="flex min-w-0 items-center gap-3 rounded-full border border-[#11100d]/10 bg-[#fffaf1]/74 px-4 py-2">
        <Search className="h-4 w-4 text-[#11100d]/34" />
        <input
          ref={searchInputRef}
          data-archive-search
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="search systems, tools, receipts"
          aria-label="Search systems, tools, and receipts"
          className="w-full bg-transparent text-sm text-[#11100d] outline-none placeholder:text-[#11100d]/34"
        />
        <span className="hidden rounded-full border border-[#11100d]/10 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/36 sm:block">/</span>
      </label>

      {/* Desktop right: résumé · contact */}
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <a href={profile.resumeHref} aria-label="Open resume" className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36 transition hover:text-[#11100d]">résumé</a>
        <span className="text-[#11100d]/14" aria-hidden="true">·</span>
        <a href={`mailto:${profile.contact}`} aria-label="Send email" className="text-[9px] uppercase tracking-[0.13em] text-[#11100d]/36 transition hover:text-[#11100d]">contact</a>
      </div>
    </header>
  );
}
