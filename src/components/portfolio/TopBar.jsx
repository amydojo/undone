import React from "react";
import { Search } from "lucide-react";
import { cx } from "../../utils/cx";

export default function TopBar({ search, setSearch, mode, setMode, searchInputRef }) {
  return (
    <header className="grid grid-cols-1 gap-3 border-b border-[#11100d]/10 bg-[#f7f1e7]/88 px-4 py-4 backdrop-blur-xl lg:grid-cols-[300px_1fr_320px] lg:px-6">
      <div className="flex items-center justify-between lg:justify-start lg:gap-4">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#11100d]">
          <span className="h-2 w-2 rounded-full bg-[#11100d]" />
          <span>Amy Do</span>
        </div>
        <span className="rounded-full border border-[#11100d]/10 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/48">v10</span>
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

      <div className="hidden lg:grid lg:grid-cols-2 gap-2 rounded-full border border-[#11100d]/10 bg-[#fffaf1]/70 p-1" role="group" aria-label="View mode selector">
        {[
          ["overview", "overview"],
          ["proof", "proof mode"]
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-label={`Switch to ${label}`}
            aria-pressed={mode === value}
            onClick={() => setMode(value)}
            className={cx(
              "rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.16em] transition",
              mode === value ? "bg-[#11100d] text-[#f7f1e7]" : "text-[#11100d]/46 hover:text-[#11100d]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
