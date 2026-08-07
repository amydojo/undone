import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MirrorReceiptVisual from "./receipt-visuals/MirrorReceiptVisual";
import MetaAirtableReceiptVisual from "./receipt-visuals/MetaAirtableReceiptVisual";
import MultiBrandRetentionReceiptVisual from "./receipt-visuals/MultiBrandRetentionReceiptVisual";
import SnipReceiptVisual from "./receipt-visuals/SnipReceiptVisual";
import SmoothMdReceiptVisual from "./receipt-visuals/SmoothMdReceiptVisual";
import InterfaceBehaviorLabReceiptVisual from "./receipt-visuals/InterfaceBehaviorLabReceiptVisual";
import { getSimplifiedReceiptCopy } from "./receipt-visuals/SimplifiedCaseReceiptVisual";
import { getMirrorReceiptVisual } from "../../data/mirrorReceiptVisuals";
import { getMetaAirtableReceiptVisual } from "../../data/metaAirtableReceiptVisuals";
import { getMultiBrandRetentionReceiptVisual } from "../../data/multiBrandRetentionReceiptVisuals";
import { getSnipReceiptVisual } from "../../data/snipReceiptVisuals";
import { getSmoothMdReceiptVisual } from "../../data/smoothMdReceiptVisuals";
import { getInterfaceBehaviorLabReceiptVisual } from "../../data/interfaceBehaviorLabReceiptVisuals";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";
import { useOverlayBehavior } from "./useOverlayBehavior";

function formatIndex(index, total) {
  const width = Math.max(2, String(total).length);
  return String(index + 1).padStart(width, "0");
}

function getAssetKey(asset, index) {
  return asset.kind === "component" ? asset.componentKey : asset.src || `visual-asset-${index}`;
}

function getComponentAsset(asset) {
  if (asset?.kind !== "component") return null;

  const lookups = [
    [getInterfaceBehaviorLabReceiptVisual, "behavior"],
    [getSmoothMdReceiptVisual, "smooth"],
    [getMultiBrandRetentionReceiptVisual, "multi"],
    [getSnipReceiptVisual, "snip"],
    [getMirrorReceiptVisual, "mirror"],
    [getMetaAirtableReceiptVisual, "meta"]
  ];

  for (const [lookup, renderer] of lookups) {
    const definition = lookup(asset.componentKey);
    if (definition) return { definition, renderer };
  }

  return null;
}

function getComponentViewerMaxWidth(renderer) {
  if (renderer === "behavior" || renderer === "snip") return "max-w-[980px]";
  if (renderer === "smooth") return "max-w-[960px]";
  if (renderer === "multi" || renderer === "meta") return "max-w-[940px]";
  return "max-w-[760px]";
}

function getComponentAccentColor(renderer) {
  const colors = {
    behavior: "#69dcff",
    smooth: "#c8ff62",
    multi: "#ffd1a1",
    snip: "#8be2ff",
    meta: "#b6f3d4",
    mirror: "#c7b2ff"
  };
  return colors[renderer] ?? "#d8c7ae";
}

function getRendererLabel(renderer) {
  const labels = {
    behavior: "INTERACTION LAB",
    smooth: "SMOOTH MD",
    multi: "RETENTION",
    snip: "SNIP",
    meta: "CAMPAIGN INTELLIGENCE",
    mirror: "MIRROR"
  };
  return labels[renderer] ?? "RECEIPT";
}

function getCompactPrivacyLabel(label) {
  return label?.toLowerCase() === "sanitized reconstruction" ? "sanitized" : label;
}

function getVisibleTitle(componentAsset, fallback) {
  if (!componentAsset) return fallback;
  if (componentAsset.renderer === "behavior") return componentAsset.definition.title;
  return getSimplifiedReceiptCopy(componentAsset.definition.receiptBodyType).title;
}

function getComponentRenderer(renderer) {
  if (renderer === "behavior") return InterfaceBehaviorLabReceiptVisual;
  if (renderer === "snip") return SnipReceiptVisual;
  if (renderer === "smooth") return SmoothMdReceiptVisual;
  if (renderer === "multi") return MultiBrandRetentionReceiptVisual;
  if (renderer === "meta") return MetaAirtableReceiptVisual;
  return MirrorReceiptVisual;
}

export default function ReceiptVisualGallery({
  visualAssets,
  receiptName = "Selected receipt",
  receiptFormat = "visual proof",
  receiptTestId,
  variant = "desktop",
  resetSignal
}) {
  const [failedSrcs, setFailedSrcs] = useState(() => new Set());
  const [activeIndex, setActiveIndex] = useState(null);
  const overlayRef = useRef(null);
  const closeButtonRef = useRef(null);

  const assets = useMemo(
    () =>
      (visualAssets ?? []).filter((asset) => {
        if (!asset) return false;
        if (asset.kind === "component") return Boolean(getComponentAsset(asset));
        return typeof asset.src === "string" && asset.src.trim().length > 0;
      }),
    [visualAssets]
  );

  const visibleAssets = assets.filter((asset) => asset.kind === "component" || !failedSrcs.has(asset.src));
  const isMobile = variant === "mobile";
  const featuredAsset = visibleAssets[0];
  const isComponentSet = visibleAssets.length > 0 && visibleAssets.every((asset) => asset.kind === "component");
  const activeAsset = activeIndex === null ? null : visibleAssets[activeIndex];
  const activeComponentAsset = activeAsset ? getComponentAsset(activeAsset) : null;
  const activeVisibleTitle = getVisibleTitle(activeComponentAsset, receiptName);
  const activeModalMaxWidth = activeComponentAsset ? getComponentViewerMaxWidth(activeComponentAsset.renderer) : "max-w-[90vw]";
  const activeAccentColor = activeComponentAsset?.definition?.accentColor ?? getComponentAccentColor(activeComponentAsset?.renderer);
  const activeReceiptReference = activeComponentAsset?.definition?.receiptNumber
    ? `${activeComponentAsset.definition.receiptNumber} / ${getRendererLabel(activeComponentAsset.renderer)}`
    : "RECEIPT";

  const closeModal = useCallback(() => setActiveIndex(null), []);

  useOverlayBehavior({
    active: Boolean(activeAsset),
    overlayRef,
    initialFocusRef: closeButtonRef,
    onClose: closeModal
  });

  useEffect(() => {
    if (!activeAsset) return undefined;
    function handleKeyDown(event) {
      if (event.key === "ArrowLeft" && visibleAssets.length > 1) showPrevious();
      if (event.key === "ArrowRight" && visibleAssets.length > 1) showNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeAsset, visibleAssets.length]);

  useEffect(() => {
    if (activeIndex !== null && activeIndex >= visibleAssets.length) setActiveIndex(null);
  }, [activeIndex, visibleAssets.length]);

  useEffect(() => setActiveIndex(null), [resetSignal]);

  if (visibleAssets.length === 0) return null;

  function showPrevious() {
    setActiveIndex((current) => (current === null ? null : (current - 1 + visibleAssets.length) % visibleAssets.length));
  }

  function showNext() {
    setActiveIndex((current) => (current === null ? null : (current + 1) % visibleAssets.length));
  }

  function hideBrokenImage(src) {
    setFailedSrcs((current) => new Set([...current, src]));
  }

  function getAssetCaption(asset) {
    return asset.caption ?? getComponentAsset(asset)?.definition?.claim ?? "";
  }

  function getAssetLabel(asset) {
    const componentAsset = getComponentAsset(asset);
    return asset.alt ?? getVisibleTitle(componentAsset, getAssetCaption(asset) || "receipt visual");
  }

  function renderAsset(asset, mode) {
    const componentAsset = getComponentAsset(asset);
    if (componentAsset) {
      const Component = getComponentRenderer(componentAsset.renderer);
      const definition = componentAsset.definition;
      const compactMode = mode !== "viewer";
      return (
        <div className={mode === "viewer" ? `w-full ${getComponentViewerMaxWidth(componentAsset.renderer)}` : "w-full"}>
          <Component
            {...definition}
            privacyLabel={compactMode ? getCompactPrivacyLabel(definition.privacyLabel ?? "sanitized reconstruction") : definition.privacyLabel}
            displayMode={compactMode ? "compact" : "full"}
            ctaLabel={compactMode && isMobile ? "Inspect" : "Inspect receipt"}
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
        className={mode === "viewer" ? "max-h-[78vh] w-full object-contain" : mode === "mobile" ? "h-full w-full object-contain" : "h-full w-full object-cover"}
      />
    );
  }

  const activeCaption = activeAsset ? getAssetCaption(activeAsset) : "";
  const shouldShowActiveCaption = Boolean(activeCaption && !activeComponentAsset?.definition?.receiptBodyType);

  const activeModal = activeAsset ? (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] isolate flex items-start justify-center overflow-hidden overscroll-contain bg-[#11100d]/88 px-3 py-4 sm:items-center sm:px-5 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${activeVisibleTitle} receipt viewer`}
      tabIndex={-1}
      onClick={closeModal}
    >
      {visibleAssets.length > 1 && (
        <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); showPrevious(); }} className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#fffaf1]/20 bg-[#fffaf1] text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf1]/80 sm:inline-flex">
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      <figure data-testid="receipt-modal" onClick={(event) => event.stopPropagation()} className={`relative flex max-h-[calc(100dvh-2rem)] w-full ${activeModalMaxWidth} flex-col overflow-hidden rounded-[8px] border border-[#fffaf1]/22 bg-[#fffaf1] sm:max-h-[90vh]`}>
        <header className="flex shrink-0 items-start justify-between gap-3 bg-[#fffaf1] px-3.5 py-2.5 sm:px-5 sm:py-3">
          <div className="min-w-0 pr-1">
            <div className="text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38"><span className="tabular-nums">{activeReceiptReference}</span></div>
            <div data-testid="receipt-modal-title" className="mt-1 line-clamp-2 text-[15px] font-medium leading-5 text-[#11100d] sm:text-[16px]">{activeVisibleTitle}</div>
          </div>
          <button ref={closeButtonRef} type="button" data-testid="receipt-modal-close" aria-label={`Close ${activeVisibleTitle}`} onClick={closeModal} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]/64 hover:bg-[#f0eadf] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/25 lg:h-9 lg:w-9">
            <X className="h-[15px] w-[15px]" />
          </button>
        </header>
        <div className="h-px shrink-0" style={{ backgroundColor: activeAccentColor, opacity: 0.72 }} aria-hidden="true" />
        <div className={activeComponentAsset ? "scrollbar-portfolio min-h-0 flex-1 overflow-y-auto bg-[#fffaf1]" : "scrollbar-portfolio flex min-h-0 flex-1 items-center justify-center overflow-y-auto bg-[#f7f1e7] p-3 sm:p-4"}>
          <div className={activeComponentAsset ? "w-full min-w-0" : "flex w-full justify-center"}>{renderAsset(activeAsset, "viewer")}</div>
        </div>
        {shouldShowActiveCaption && <figcaption className="border-t border-[#11100d]/8 px-4 py-3 text-[12px] leading-5 text-[#11100d]/62">{activeCaption}</figcaption>}
        {visibleAssets.length > 1 && (
          <div className="flex items-center justify-between border-t border-[#11100d]/8 px-3 py-2 sm:hidden">
            <button type="button" onClick={showPrevious} className="inline-flex h-11 items-center gap-1 rounded-full border border-[#11100d]/10 px-3.5 text-[10px] uppercase tracking-[0.1em] text-[#11100d]/62"><ChevronLeft className="h-3.5 w-3.5" />Prev</button>
            <button type="button" onClick={showNext} className="inline-flex h-11 items-center gap-1 rounded-full border border-[#11100d]/10 px-3.5 text-[10px] uppercase tracking-[0.1em] text-[#11100d]/62">Next<ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        )}
      </figure>

      {visibleAssets.length > 1 && (
        <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); showNext(); }} className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#fffaf1]/20 bg-[#fffaf1] text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf1]/80 sm:inline-flex">
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  ) : null;

  return (
    <div data-testid="receipt-visual-gallery" className={isComponentSet ? "" : "mt-4"}>
      {!isComponentSet && <div className="mb-2 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/28">Visual proof</div>}

      {isComponentSet ? (
        <button type="button" data-testid={receiptTestId ? `receipt-card-${receiptTestId}` : undefined} aria-label={`Inspect receipt: ${getAssetLabel(featuredAsset)}`} onClick={() => setActiveIndex(0)} className="block w-full text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35">
          {renderAsset(featuredAsset, "desktop")}
        </button>
      ) : isMobile ? (
        <div className="flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {visibleAssets.map((asset, index) => (
            <figure key={getAssetKey(asset, index)} className="min-w-[82%] snap-start overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7]">
              <button type="button" onClick={() => setActiveIndex(index)} className="block h-[360px] w-full overflow-hidden bg-[#11100d]/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35">{renderAsset(asset, "mobile")}</button>
              {getAssetCaption(asset) && <figcaption className="border-t border-[#11100d]/8 px-3 py-2.5 text-[11px] leading-5 text-[#11100d]/54">{getAssetCaption(asset)}</figcaption>}
            </figure>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7]">
          <button type="button" onClick={() => setActiveIndex(0)} className="block h-[200px] w-full overflow-hidden bg-[#11100d]/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/35">{renderAsset(featuredAsset, "desktop")}</button>
          <div className="flex items-center justify-between border-t border-[#11100d]/8 px-3 py-2.5">
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#11100d]/40">{visibleAssets.length} visual {visibleAssets.length === 1 ? "asset" : "assets"}</span>
            <button type="button" onClick={() => setActiveIndex(0)} className="rounded-full border border-[#11100d]/10 bg-[#fffaf1] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#11100d]/56">View proof set</button>
          </div>
        </div>
      )}

      {activeModal && typeof document !== "undefined" ? createPortal(activeModal, document.body) : activeModal}
    </div>
  );
}
