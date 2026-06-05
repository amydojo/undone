import React from "react";
import { cx } from "../../utils/cx";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";

function getSplitGridClass(slug) {
  if (slug === "snip-provider-pipeline") {
    return "grid-cols-[minmax(0,1.55fr)_minmax(0,0.78fr)]";
  }

  return "grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]";
}

function getDisplay(visual, slug) {
  if (visual.display) return visual.display;

  if (slug === "smooth-md-growth-os") return "brandSplit";
  if (slug === "mirror") return "productSingle";
  if (slug === "snip-provider-pipeline") return "publishedSplit";

  return visual.layout === "single" ? "productSingle" : "split";
}

function getSplitThreshold(display) {
  if (display === "brandSplit") return 720;
  if (display === "publishedSplit") return 860;
  return 760;
}

function getSideBySideHeight(display, width) {
  if (!width) return undefined;

  if (display === "brandSplit") {
    return Math.round(Math.min(560, Math.max(500, width * 0.7)));
  }

  if (display === "publishedSplit") {
    return Math.round(Math.min(460, Math.max(380, width * 0.48)));
  }

  return Math.round(Math.min(500, Math.max(380, width * 0.56)));
}

function getImageFrameClass({ layout, role, isSideBySide, display }) {
  if (layout === "single") {
    return "aspect-[1.08/1] sm:aspect-[1.28/1] lg:aspect-[1.42/1] xl:aspect-[1.5/1]";
  }

  if (isSideBySide) {
    return "h-full";
  }

  if (display === "brandSplit") {
    return role === "primary"
      ? "aspect-[0.78/1] sm:aspect-[0.86/1] lg:aspect-[0.9/1]"
      : "aspect-[1.05/1] sm:aspect-[1.16/1] lg:aspect-[1.28/1]";
  }

  if (display === "publishedSplit") {
    return role === "primary"
      ? "aspect-[1.38/1] sm:aspect-[1.5/1] lg:aspect-[1.58/1]"
      : "aspect-[0.74/1] sm:aspect-[0.9/1] lg:aspect-[1.12/1]";
  }

  return "aspect-[1.15/1]";
}

function getDefaultPosition({ role, display }) {
  if (display === "brandSplit") {
    return "center top";
  }

  if (display === "publishedSplit") {
    return role === "primary" ? "left top" : "center top";
  }

  if (display === "productSingle") {
    return "center 38%";
  }

  return "center top";
}

function getImageStyle(image, visual) {
  return {
    objectFit: image.fit ?? visual.fit ?? "cover",
    objectPosition:
      image.position ??
      visual.position ??
      getDefaultPosition({
        role: image.role,
        display: visual.display,
      }),
  };
}

function useElementWidth(active) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(null);

  React.useLayoutEffect(() => {
    if (!active) {
      setWidth(null);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const updateWidth = () => {
      setWidth(Math.round(node.getBoundingClientRect().width));
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width));
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return [ref, width];
}

export default function OverviewVisualPlate({ visual, slug, variant = "canvas" }) {
  const hasVisual = Boolean(visual?.images?.length);
  const [compositionRef, compositionWidth] = useElementWidth(hasVisual);

  if (!hasVisual) return null;

  const isCanvas = variant === "canvas";
  const layout = visual.layout ?? (visual.images.length > 1 ? "split" : "single");
  const display = getDisplay({ ...visual, layout }, slug);
  const sortedImages = [...visual.images].sort((a, b) => {
    if (a.role === b.role) return 0;
    return a.role === "primary" ? -1 : 1;
  });
  const isSplit = layout === "split" && sortedImages.length > 1;
  const isSideBySide =
    isSplit && compositionWidth !== null && compositionWidth >= getSplitThreshold(display);
  const sideBySideHeight = isSideBySide ? getSideBySideHeight(display, compositionWidth) : undefined;

  return (
    <section className={isCanvas ? "border-t border-[#11100d]/8 px-5 py-10 xl:px-10 xl:py-14" : ""}>
      <div className="overflow-hidden rounded-[18px] border border-[#11100d]/10 bg-[#fffdf8] lg:rounded-[20px]">
        {visual.label && (
          <div className="px-4 pt-4 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/36 sm:px-5 sm:pt-5 lg:px-6 lg:pt-6">
            {visual.label}
          </div>
        )}
        <div
          ref={compositionRef}
          className={cx(
            "mx-3 mt-3 grid min-w-0 overflow-hidden bg-white sm:mx-4 sm:mt-4 lg:mx-5",
            isSideBySide
              ? cx("gap-4", getSplitGridClass(slug))
              : cx("grid-cols-1", isSplit ? "gap-3 sm:gap-4" : "")
          )}
          style={sideBySideHeight ? { height: `${sideBySideHeight}px` } : undefined}
        >
          {sortedImages.map((image) => (
            <figure
              key={image.src}
              className={cx(
                "min-w-0 overflow-hidden",
                getImageFrameClass({ layout, role: image.role, isSideBySide, display })
              )}
            >
              <img
                src={resolvePublicSrc(image.src)}
                alt={image.alt ?? ""}
                loading="lazy"
                className="h-full w-full"
                style={getImageStyle(image, { ...visual, layout, display, isSideBySide })}
              />
            </figure>
          ))}
        </div>
        {visual.caption && (
          <p className="px-4 pb-4 pt-3 text-[12px] leading-5 text-[#11100d]/50 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
            {visual.caption}
          </p>
        )}
      </div>
    </section>
  );
}
