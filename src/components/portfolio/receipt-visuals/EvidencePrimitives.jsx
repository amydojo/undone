import React from "react";

export function Dot({ color, className = "h-1.5 w-1.5" }) {
  return <span className={`${className} shrink-0 rounded-full`} style={{ backgroundColor: color }} aria-hidden="true" />;
}

export function Label({ children, dark = false }) {
  return (
    <div className={`text-[9px] uppercase tracking-[0.14em] ${dark ? "text-[#fffaf1]/42" : "text-[#11100d]/40"}`}>
      {children}
    </div>
  );
}

export function Flow({ items, accent, compact = false }) {
  if (!items?.length) return null;

  return (
    <div className={`flex min-w-0 flex-wrap items-center ${compact ? "gap-x-1.5 gap-y-1" : "gap-x-2.5 gap-y-1.5"}`}>
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          {index > 0 && <span className={`${compact ? "text-[9px]" : "text-[12px]"} text-[#11100d]/28`}>→</span>}
          <span className={`${compact ? "text-[9px]" : "text-[11px] sm:text-[12px]"} leading-4 text-[#11100d]/66`}>
            {item}
          </span>
        </React.Fragment>
      ))}
      <Dot color={accent} />
    </div>
  );
}

export function SanitizedPortrait({ mode = "source", accent }) {
  const rejected = mode === "rejected";
  const approved = mode === "approved";
  const cropped = mode === "crop";

  return (
    <div className="relative aspect-square overflow-hidden rounded-[12px] border border-[#11100d]/8 bg-gradient-to-br from-[#dff4fa] via-[#bad4df] to-[#7897a5]">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "linear-gradient(#ffffff55 1px, transparent 1px), linear-gradient(90deg, #ffffff55 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      {rejected ? (
        <>
          <div className="absolute inset-[22%] grid place-items-center rounded-[18px] border border-white/60 bg-white/22">
            <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/75 text-[18px] font-semibold text-white">LOGO</div>
          </div>
          <div className="absolute left-[12%] right-[12%] top-1/2 h-[3px] -rotate-12 bg-[#d47770]" />
        </>
      ) : (
        <>
          <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#eef6f7]/88 ${cropped || approved ? "top-[15%] h-[34%] w-[34%]" : "top-[19%] h-[27%] w-[27%]"}`} />
          <div className={`absolute left-1/2 -translate-x-1/2 rounded-t-[48%] bg-[#d9e8eb]/84 ${cropped || approved ? "bottom-[-5%] h-[56%] w-[72%]" : "bottom-[4%] h-[48%] w-[58%]"}`} />
          {mode === "source" && (
            <div className="absolute inset-[13%] rounded-[10px] border-2 border-white/80">
              <span className="absolute -top-5 left-0 text-[8px] uppercase tracking-[0.12em] text-white">crop candidate</span>
            </div>
          )}
          {(cropped || approved) && <div className="absolute inset-[8%] rounded-[10px] border border-white/78" />}
          {approved && (
            <div className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-[13px] font-bold text-[#142027]" style={{ backgroundColor: accent }}>
              ✓
            </div>
          )}
        </>
      )}
    </div>
  );
}
