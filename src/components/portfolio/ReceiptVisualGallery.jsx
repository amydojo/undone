import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MirrorReceiptVisual from "./receipt-visuals/MirrorReceiptVisual";
import MetaAirtableReceiptVisual from "./receipt-visuals/MetaAirtableReceiptVisual";
import MultiBrandRetentionReceiptVisual from "./receipt-visuals/MultiBrandRetentionReceiptVisual";
import SnipReceiptVisual from "./receipt-visuals/SnipReceiptVisual";
import SmoothMdReceiptVisual from "./receipt-visuals/SmoothMdReceiptVisual";
import { getMirrorReceiptVisual } from "../../data/mirrorReceiptVisuals";
import { getMetaAirtableReceiptVisual } from "../../data/metaAirtableReceiptVisuals";
import { getMultiBrandRetentionReceiptVisual } from "../../data/multiBrandRetentionReceiptVisuals";
import { getSnipReceiptVisual } from "../../data/snipReceiptVisuals";
import { getSmoothMdReceiptVisual } from "../../data/smoothMdReceiptVisuals";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";

function formatIndex(index, total) {
  const width = Math.max(2, String(total).length);
  return String(index + 1).padStart(width, "0");
}

function getAssetKey(asset, index) {
  return asset.kind === "component" ? asset.componentKey : asset.src || `visual-asset-${index}`;
}

function getComponentAsset(asset) {
  if (asset.kind !== "component") return null;

  const smoothDefinition = getSmoothMdReceiptVisual(asset.componentKey);
  if (smoothDefinition) return { definition: smoothDefinition, renderer: "smooth" };

  const multiDefinition = getMultiBrandRetentionReceiptVisual(asset.componentKey);
  if (multiDefinition) return { definition: multiDefinition, renderer: "multi" };

  const snipDefinition = getSnipReceiptVisual(asset.componentKey);
  if (snipDefinition) return { definition: snipDefinition, renderer: "snip" };

  const mirrorDefinition = getMirrorReceiptVisual(asset.componentKey);
  if (mirrorDefinition) return { definition: mirrorDefinition, renderer: "mirror" };

  const metaDefinition = getMetaAirtableReceiptVisual(asset.componentKey);
  if (metaDefinition) return { definition: metaDefinition, renderer: "meta" };

  return null;
}

function getComponentViewerMaxWidth(renderer) {
  if (renderer === "snip") return "max-w-[980px]";
  if (renderer === "smooth") return "max-w-[960px]";
  if (renderer === "multi") return "max-w-[940px]";
  if (renderer === "meta") return "max-w-[940px]";
  return "max-w-[760px]";
}

function getComponentAccentColor(renderer) {
  if (renderer === "smooth") return "#c8ff62";
  if (renderer === "multi") return "#ffd1a1";
  if (renderer === "snip") return "#8be2ff";
  if (renderer === "meta") return "#b6f3d4";
  if (renderer === "mirror") return "#c7b2ff";
  return "#d8c7ae";
}

function getCompactPrivacyLabel(label) {
  return label?.toLowerCase() === "sanitized reconstruction" ? "sanitized" : label;
}

function getAssetDefinition(asset) {
  return getComponentAsset(asset)?.definition ?? null;
}

function isComponentAsset(asset) {
  return Boolean(getAssetDefinition(asset));
}

export default function ReceiptVisualGallery({
  visualAssets,
  receiptName = "Selected receipt",
  receiptFormat = "visual proof",
  receiptTestId,
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
  const activeComponentAsset = activeAsset ? getComponentAsset(activeAsset) : null;
  const activeIsComponentAsset = Boolean(activeComponentAsset);
  const activeModalMaxWidth = activeComponentAsset ? getComponentViewerMaxWidth(activeComponentAsset.renderer) : "max-w-[90vw]";
  const activeAccentColor = activeComponentAsset?.definition?.accentColor ?? getComponentAccentColor(activeComponentAsset?.renderer);
  const featuredAsset = visibleAssets[0];
  const isComponentSet = visibleAssets.every((asset) => isComponentAsset(asset));
  const activeLabel = activeIndex === null ? null : `${formatIndex(activeIndex, visibleAssets.length)} / ${formatIndex(visibleAssets.length - 1, visibleAssets.length)}`;
  const activeReceiptReference = activeComponentAsset?.definition?.receiptNumber
    ? `Receipt ${activeComponentAsset.definition.receiptNumber}`
    : visibleAssets.length > 1 && activeLabel
      ? activeLabel
      : "Receipt";
  const activeCaption = activeAsset ? getAssetCaption(activeAsset) : "";
  const shouldShowActiveCaption = Boolean(
    activeCaption &&
      !activeComponentAsset?.definition?.receiptBodyType
  );

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
    const componentAsset = getComponentAsset(asset);
    const definition = componentAsset?.definition;

    if (definition) {
      const Component =
        componentAsset.renderer === "snip"
          ? SnipReceiptVisual
          : componentAsset.renderer === "smooth"
            ? SmoothMdReceiptVisual
          : componentAsset.renderer === "multi"
            ? MultiBrandRetentionReceiptVisual
          : componentAsset.renderer === "meta"
            ? MetaAirtableReceiptVisual
            : MirrorReceiptVisual;
      const maxWidth = getComponentViewerMaxWidth(componentAsset.renderer);
      const compactMode = mode !== "viewer";
      const ctaLabel = compactMode && isMobile ? "Inspect" : "Inspect receipt";
      const privacyLabel = compactMode
        ? getCompactPrivacyLabel(definition.privacyLabel ?? "sanitized reconstruction")
        : definition.privacyLabel;

      return (
        <div className={mode === "viewer" ? `w-full ${maxWidth}` : "w-full"}>
          <Component
            {...definition}
            privacyLabel={privacyLabel}
            displayMode={compactMode ? "compact" : "full"}
            ctaLabel={ctaLabel}
          />
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
    <div data-testid="receipt-visual-gallery" className={isComponentSet ? "" : "mt-4"}>
      {!isComponentSet && (
        <div className="mb-2 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/28">
          Visual proof
        </div>
      )}

      {isComponentSet ? (
        <button
          type="button"
          data-testid={receiptTestId ? `receipt-card-${receiptTestId}` : undefined}
          aria-label={`Inspect receipt: ${getAssetLabel(featuredAsset)}`}
          onClick={() => setActiveIndex(0)}
          className="block w-full text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
        >
          {renderAsset(featuredAsset, "desktop")}
        </button>
      ) : isMobile ? (
        <div className="flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {visibleAssets.map((asset, index) => (
            <figure
              key={getAssetKey(asset, index)}
              className="min-w-[82%] snap-start overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7]"
            >
              <button
                type="button"
                data-testid={isComponentAsset(asset) && receiptTestId ? `receipt-card-${receiptTestId}` : undefined}
                aria-label={`Inspect proof ${formatIndex(index, visibleAssets.length)} of ${formatIndex(visibleAssets.length - 1, visibleAssets.length)}: ${getAssetLabel(asset)}`}
                onClick={() => setActiveIndex(index)}
                className={
                  isComponentAsset(asset)
                    ? "block w-full bg-[#11100d]/5 p-2 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
                    : "block h-[360px] w-full overflow-hidden bg-[#11100d]/5 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
                }
              >
                {renderAsset(asset, "mobile")}
              </button>
              {!isComponentAsset(asset) && (
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
              )}
              {isComponentAsset(asset) && visibleAssets.length > 1 && (
                <div className="border-t border-[#11100d]/8 px-3 py-2 text-[10px] tabular-nums tracking-[0.08em] text-[#11100d]/38">
                  {formatIndex(index, visibleAssets.length)} / {formatIndex(visibleAssets.length - 1, visibleAssets.length)}
                </div>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7]">
        <figure className="overflow-hidden">
          <button
            type="button"
            data-testid={isComponentAsset(featuredAsset) && receiptTestId ? `receipt-card-${receiptTestId}` : undefined}
            aria-label={`View proof set: ${getAssetLabel(featuredAsset)}`}
            onClick={() => setActiveIndex(0)}
            className={isComponentAsset(featuredAsset)
              ? "block w-full bg-[#11100d]/5 p-2 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
              : "block h-[200px] w-full overflow-hidden bg-[#11100d]/5 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35"
            }
          >
            {renderAsset(featuredAsset, "desktop")}
          </button>
          {!isComponentAsset(featuredAsset) && getAssetCaption(featuredAsset) && (
            <figcaption className="px-3 py-2.5 text-[11px] leading-5 text-[#11100d]/54">
              {getAssetCaption(featuredAsset)}
            </figcaption>
          )}
        </figure>
        {!isComponentAsset(featuredAsset) && (
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
        )}
      </div>
      )}

      {activeAsset && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden bg-[#11100d]/88 px-3 py-4 sm:items-center sm:px-5 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${receiptName} proof set viewer`}
          onClick={() => setActiveIndex(null)}
        >
          {visibleAssets.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#fffaf1]/20 bg-[#fffaf1] text-[#11100d] transition hover:bg-[#f7f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf1]/80 sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <figure
            data-testid="receipt-modal"
            onClick={(event) => event.stopPropagation()}
            className={`relative flex max-h-[calc(100dvh-2rem)] w-full ${activeModalMaxWidth} flex-col overflow-hidden rounded-[8px] border border-[#fffaf1]/22 bg-[#fffaf1] sm:max-h-[90vh]`}
          >
            <header className="flex shrink-0 items-start justify-between gap-3 bg-[#fffaf1] px-3.5 py-3 sm:px-5 sm:py-3.5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">
                  <span className="tabular-nums">{activeReceiptReference}</span>
                </div>
                <div className="mt-1.5 truncate text-[13px] font-medium leading-5 text-[#11100d] sm:text-[14px]">
                  {receiptName}
                </div>
                <div className="mt-0.5 truncate text-[9px] uppercase tracking-[0.13em] text-[#11100d]/40">
                  {receiptFormat}
                </div>
              </div>
              <button
                type="button"
                data-testid="receipt-modal-close"
                aria-label="Close proof set viewer"
                onClick={() => setActiveIndex(null)}
                className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]/64 transition-colors hover:bg-[#f0eadf] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/25"
              >
                <X className="h-[15px] w-[15px]" />
              </button>
            </header>
            <div className="h-px shrink-0" style={{ backgroundColor: activeAccentColor, opacity: 0.72 }} aria-hidden="true" />

            <div className={activeIsComponentAsset ? "scrollbar-portfolio min-h-0 flex-1 overflow-y-auto bg-[#fffaf1]" : "scrollbar-portfolio flex min-h-0 flex-1 items-center justify-center overflow-y-auto bg-[#f7f1e7] p-3 sm:p-4"}>
              <div className={activeIsComponentAsset ? "w-full min-w-0" : "flex w-full justify-center pb-2 sm:pb-0"}>
                {renderAsset(activeAsset, "viewer")}
              </div>
            </div>
            {shouldShowActiveCaption && (
              <figcaption className="border-t border-[#11100d]/8 px-4 py-3 text-[12px] leading-5 text-[#11100d]/62 sm:px-5">
                {activeCaption}
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
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#fffaf1]/20 bg-[#fffaf1] text-[#11100d] transition hover:bg-[#f7f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf1]/80 sm:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
