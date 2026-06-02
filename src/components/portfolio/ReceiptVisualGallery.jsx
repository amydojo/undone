import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MirrorReceiptVisual from "./receipt-visuals/MirrorReceiptVisual";
import { getMirrorReceiptVisual } from "../../data/mirrorReceiptVisuals";
import { getMetaAirtableReceiptVisual } from "../../data/metaAirtableReceiptVisuals";

function resolvePublicSrc(src) {
  if (!src.startsWith("/")) return src;

  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return src;

  return `${base.replace(/\/$/, "")}${src}`;
}

function formatIndex(index, total) {
  const width = Math.max(2, String(total).length);
  return String(index + 1).padStart(width, "0");
}

function getAssetKey(asset, index) {
  return asset.kind === "component" ? asset.componentKey : asset.src || `visual-asset-${index}`;
}

function getAssetDefinition(asset) {
  if (asset.kind !== "component") return null;
  return getMirrorReceiptVisual(asset.componentKey) ?? getMetaAirtableReceiptVisual(asset.componentKey);
}

export default function ReceiptVisualGallery({
  visualAssets,
  receiptName = "Selected receipt",
  receiptFormat = "visual proof",
  variant = "desktop"
}) {
  const [failedSrcs, setFailedSrcs] = useState(() => new Set());
  const [activeIndex, setActiveIndex] = useState(null);

  const assets = useMemo(
    () =>
      (visualAssets ?? []).filter(
        (asset) =>
          asset &&
          ((asset.kind === "component" && Boolean(getAssetDefinition(asset))) ||
            (typeof asset.src === "string" && asset.src.trim().length > 0))
      ),
    [visualAssets]
  );

  const visibleAssets = assets.filter((asset) => asset.kind === "component" || !failedSrcs.has(asset.src));

  const isMobile = variant === "mobile";
  const activeAsset = activeIndex === null ? null : visibleAssets[activeIndex];
  const featuredAsset = visibleAssets[0];
  const activeLabel = activeIndex === null ? null : `${formatIndex(activeIndex, visibleAssets.length)} / ${formatIndex(visibleAssets.length - 1, visibleAssets.length)}`;

  useEffect(() => {
    if (!activeAsset) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowLeft" && visibleAssets.length > 1) {
        showPrevious();
      }
      if (event.key === "ArrowRight" && visibleAssets.length > 1) {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeAsset, visibleAssets.length]);

  useEffect(() => {
    if (activeIndex !== null && activeIndex >= visibleAssets.length) {
      setActiveIndex(null);
    }
  }, [activeIndex, visibleAssets.length]);

  if (visibleAssets.length === 0) return null;

  function getAssetCaption(asset) {
    return asset.caption ?? getAssetDefinition(asset)?.claim ?? "";
  }

  function getAssetLabel(asset) {
    return asset.alt ?? getAssetDefinition(asset)?.title ?? getAssetCaption(asset) ?? "receipt visual";
  }

  function renderAsset(asset, mode) {
    const definition = getAssetDefinition(asset);

    if (definition) {
      return (
        <div className={mode === "viewer" ? "w-full max-w-[760px]" : "w-full"}>
          <MirrorReceiptVisual {...definition} />
        </div>
      );
    }

    return (
      <img
        src={resolvePublicSrc(asset.src)}
        alt={asset.alt ?? ""}
        loading={mode === "viewer" ? undefined : "lazy"}
        onError={() => {
          hideBrokenImage(asset.src);
          if (mode === "viewer") setActiveIndex(null);
        }}
        className={
          mode === "viewer"
            ? "max-h-[66vh] w-full object-contain sm:max-h-[78vh]"
            : mode === "mobile"
              ? "h-full w-full object-contain"
              : "h-full w-full object-cover"
        }
      />
    );
  }

  function hideBrokenImage(src) {
    setFailedSrcs((current) => {
      const next = new Set(current);
      next.add(src);
      return next;
    });
  }

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current - 1 + visibleAssets.length) % visibleAssets.length;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current + 1) % visibleAssets.length;
    });
  }

  return (
    <div className="mt-4">
      <div className="mb-2 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/28">
        Visual proof
      </div>

      {isMobile ? (
        <div className="flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {visibleAssets.map((asset, index) => (
            <figure
              key={getAssetKey(asset, index)}
              className="min-w-[82%] snap-start overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7]"
            >
              <button
                type="button"
                aria-label={`Inspect proof ${formatIndex(index, visibleAssets.length)} of ${formatIndex(visibleAssets.length - 1, visibleAssets.length)}: ${getAssetLabel(asset)}`}
                onClick={() => setActiveIndex(index)}
                className={
                  getAssetDefinition(asset)
                    ? "flex h-[360px] w-full items-start justify-center overflow-auto bg-[#11100d]/5 p-2 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
                    : "block h-[360px] w-full overflow-hidden bg-[#11100d]/5 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
                }
              >
                {renderAsset(asset, "mobile")}
              </button>
              <div className="border-t border-[#11100d]/8 px-3 py-2.5">
                <div className="mb-1.5 text-[10px] tabular-nums tracking-[0.08em] text-[#11100d]/38">
                  {formatIndex(index, visibleAssets.length)} / {formatIndex(visibleAssets.length - 1, visibleAssets.length)}
                </div>
                {getAssetCaption(asset) && (
                  <figcaption className="text-[11px] leading-5 text-[#11100d]/54">
                    {getAssetCaption(asset)}
                  </figcaption>
                )}
              </div>
            </figure>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7]">
        <figure className="overflow-hidden">
          <button
            type="button"
            aria-label={`View proof set: ${getAssetLabel(featuredAsset)}`}
            onClick={() => setActiveIndex(0)}
            className={getAssetDefinition(featuredAsset)
              ? "flex h-[200px] w-full items-start justify-center overflow-hidden bg-[#11100d]/5 p-2 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
              : "block h-[200px] w-full overflow-hidden bg-[#11100d]/5 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
            }
          >
            {renderAsset(featuredAsset, "desktop")}
          </button>
          {getAssetCaption(featuredAsset) && (
            <figcaption className="px-3 py-2.5 text-[11px] leading-5 text-[#11100d]/54">
              {getAssetCaption(featuredAsset)}
            </figcaption>
          )}
        </figure>
        <div className="flex items-center justify-between gap-3 border-t border-[#11100d]/8 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#11100d]/40">
              {visibleAssets.length} visual {visibleAssets.length === 1 ? "asset" : "assets"}
            </span>
            {visibleAssets.length > 1 && (
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {visibleAssets.slice(0, 5).map((asset, index) => (
                  <span
                    key={getAssetKey(asset, index)}
                    className="h-1.5 w-1.5 rounded-full bg-[#11100d]/20"
                    style={{ opacity: 0.9 - index * 0.1 }}
                  />
                ))}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="shrink-0 rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/56 transition hover:bg-[#f7f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/25"
          >
            View proof set
          </button>
        </div>
      </div>
      )}

      {activeAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#11100d]/88 px-3 py-4 sm:px-5 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${receiptName} proof set viewer`}
        >
          <button
            type="button"
            aria-label="Close proof set viewer"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#fffaf1]/20 bg-[#fffaf1] text-[#11100d] shadow-sm transition hover:bg-[#f7f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf1]/80"
          >
            <X className="h-4 w-4" />
          </button>

          {visibleAssets.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#fffaf1]/20 bg-[#fffaf1] text-[#11100d] shadow-sm transition hover:bg-[#f7f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf1]/80 sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <figure className="flex max-h-[90vh] w-full max-w-[90vw] flex-col overflow-hidden rounded-[18px] border border-[#fffaf1]/18 bg-[#fffaf1] shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#11100d]/8 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium leading-5 text-[#11100d]">
                  {receiptName}
                </div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">
                  {receiptFormat}
                </div>
              </div>
              {activeLabel && (
                <div className="shrink-0 rounded-full border border-[#11100d]/10 bg-[#f7f1e7] px-2.5 py-1 text-[10px] tabular-nums tracking-[0.08em] text-[#11100d]/48">
                  {activeLabel}
                </div>
              )}
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center bg-[#11100d]/5 p-3 sm:p-4">
              <div className="flex max-h-[66vh] w-full justify-center overflow-auto sm:max-h-[78vh]">
                {renderAsset(activeAsset, "viewer")}
              </div>
            </div>
            {getAssetCaption(activeAsset) && (
              <figcaption className="border-t border-[#11100d]/8 px-4 py-3 text-[12px] leading-5 text-[#11100d]/62 sm:px-5">
                {getAssetCaption(activeAsset)}
              </figcaption>
            )}
            {visibleAssets.length > 1 && (
              <div className="flex items-center justify-between border-t border-[#11100d]/8 px-3 py-2 sm:hidden">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="inline-flex h-9 items-center gap-1 rounded-full border border-[#11100d]/10 px-3 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/62"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="inline-flex h-9 items-center gap-1 rounded-full border border-[#11100d]/10 px-3 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/62"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </figure>

          {visibleAssets.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={showNext}
              className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#fffaf1]/20 bg-[#fffaf1] text-[#11100d] shadow-sm transition hover:bg-[#f7f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf1]/80 sm:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
