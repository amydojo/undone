import React from "react";
import { cx } from "../../utils/cx";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";

const LIVE_HERO_BY_SLUG = {
  "interface-behavior-lab": {
    src: "/overview/interface-behavior-lab-current-hero.svg",
    alt: "Current Interface Behavior Lab landing composition showing the project thesis and revealed Intent specimen together.",
    position: "center center",
  },
  "type-archive": {
    src: "/overview/type-archive-live.png",
    alt: "Type Archive decision receipt showing the final typography system and the signals preserved with the choice.",
    position: "center center",
  },
};

function resolveVisual(visual, slug) {
  const hero = LIVE_HERO_BY_SLUG[slug];
  if (!hero) return visual;

  return {
    ...visual,
    layout: "single",
    display: "caseHeroSingle",
    images: [
      {
        ...hero,
        role: "primary",
        fit: "cover",
      },
    ],
  };
}

function getSplitGridClass(slug) {
  if (slug === "interface-behavior-lab") return "grid-cols-[minmax(0,1.62fr)_minmax(0,0.72fr)]";
  if (slug === "type-archive") return "grid-cols-[minmax(0,1.38fr)_minmax(0,0.82fr)]";
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
  if (display === "behaviorSplit") return 820;
  if (display === "typeArchiveSplit") return 820;
  if (display === "brandSplit") return 720;
  if (display === "publishedSplit") return 860;
  return 760;
}

function getSideBySideHeight(display, width) {
  if (!width) return undefined;
  if (display === "behaviorSplit") return Math.round(Math.min(500, Math.max(390, width * 0.48)));
  if (display === "typeArchiveSplit") return Math.round(Math.min(500, Math.max(400, width * 0.5)));

  if (display === "brandSplit") {
    return Math.round(Math.min(560, Math.max(500, width * 0.7)));
  }

  if (display === "publishedSplit") {
    return Math.round(Math.min(460, Math.max(380, width * 0.48)));
  }

  return Math.round(Math.min(500, Math.max(380, width * 0.56)));
}

function getImageFrameClass({ layout, role, isSideBySide, display, seamless }) {
  if (seamless && layout === "single") return "aspect-[1.6/1]";
  if (display === "caseHeroSingle") return "aspect-[1.6/1]";
  if (display === "behaviorSplit" && !isSideBySide) return role === "primary" ? "aspect-[1.95/1]" : "aspect-[1.55/1]";
  if (display === "typeArchiveSplit" && !isSideBySide) return role === "primary" ? "aspect-[1.7/1]" : "aspect-[1.5/1]";
  if (layout === "single") {
    return "aspect-[1.08/1] sm:aspect-[1.28/1] lg:aspect-[1.42/1] xl:aspect-[1.5/1]";
  }

  if (isSideBySide) return "h-full";

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
  if (display === "caseHeroSingle") return "center center";
  if (display === "behaviorSplit") return role === "primary" ? "center 46%" : "center 34%";
  if (display === "typeArchiveSplit") return role === "primary" ? "center 52%" : "center 44%";
  if (display === "brandSplit") return "center top";
  if (display === "publishedSplit") return role === "primary" ? "left top" : "center top";
  if (display === "productSingle") return "center 38%";
  return "center top";
}

function getImageStyle(image, visual, seamless) {
  return {
    objectFit: seamless ? "cover" : image.fit ?? visual.fit ?? "cover",
    objectPosition:
      image.position ??
      visual.position ??
      getDefaultPosition({ role: image.role, display: visual.display }),
    transform: image.scale ? `scale(${image.scale})` : undefined,
    transformOrigin: image.transformOrigin ?? "center center",
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

    const updateWidth = () => setWidth(Math.round(node.getBoundingClientRect().width));
    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return [ref, width];
}

export default function OverviewVisualPlate({ visual, slug, variant = "canvas" }) {
  const resolvedVisual = resolveVisual(visual, slug);
  const hasVisual = Boolean(resolvedVisual?.images?.length);
  const [compositionRef, compositionWidth] = useElementWidth(hasVisual);

  if (!hasVisual) return null;

  const isCanvas = variant === "canvas";
  const seamless = slug === "bad-day-receipt";
  const layout = resolvedVisual.layout ?? (resolvedVisual.images.length > 1 ? "split" : "single");
  const display = getDisplay({ ...resolvedVisual, layout }, slug);
  const isFeatureCase = slug === "interface-behavior-lab" || slug === "type-archive";
  const sortedImages = [...resolvedVisual.images].sort((a, b) => {
    if (a.role === b.role) return 0;
    return a.role === "primary" ? -1 : 1;
  });
  const isSplit = layout === "split" && sortedImages.length > 1;
  const isSideBySide = isSplit && compositionWidth !== null && compositionWidth >= getSplitThreshold(display);
  const sideBySideHeight = isSideBySide ? getSideBySideHeight(display, compositionWidth) : undefined;

  const sectionClassName = cx(
    isCanvas
      ? cx(
          "border-t border-[#11100d]/8",
          isFeatureCase ? "px-5 py-10 sm:px-6 xl:px-10 xl:py-14" : "px-5 py-10 xl:px-10 xl:py-14"
        )
      : "",
    seamless && !isCanvas ? "-mx-4 sm:mx-0" : ""
  );

  return (
    <section className={sectionClassName}>
      <div
        className={cx(
          seamless || isFeatureCase
            ? "overflow-visible bg-transparent"
            : "overflow-hidden rounded-[18px] border border-[#11100d]/10 bg-[#fffdf8] lg:rounded-[20px]"
        )}
      >
        {resolvedVisual.label && (
          <div
            className={cx(
              "text-[9px] uppercase tracking-[0.18em] text-[#11100d]/36",
              seamless
                ? "px-4 sm:px-0"
                : isFeatureCase
                  ? "px-0 pb-4 sm:pb-5"
                  : "px-4 pt-4 sm:px-5 sm:pt-5 lg:px-6 lg:pt-6"
            )}
          >
            {resolvedVisual.label}
          </div>
        )}

        <div
          ref={compositionRef}
          className={cx(
            seamless
              ? "mt-3 grid min-w-0 overflow-hidden bg-transparent"
              : cx(
                  "grid min-w-0 overflow-hidden",
                  isFeatureCase
                    ? "m-0 grid-cols-1 rounded-[16px] bg-transparent lg:rounded-[20px]"
                    : "mx-3 mt-3 bg-white sm:mx-4 sm:mt-4 lg:mx-5"
                ),
            isSideBySide
              ? cx(isFeatureCase ? "gap-3 lg:gap-4" : "gap-4", getSplitGridClass(slug))
              : cx("grid-cols-1", isSplit ? "gap-3 sm:gap-4" : "")
          )}
          style={sideBySideHeight ? { height: `${sideBySideHeight}px` } : undefined}
        >
          {sortedImages.map((image) => (
            <figure
              key={image.src}
              className={cx(
                "min-w-0 overflow-hidden",
                isFeatureCase ? "rounded-[16px] bg-transparent sm:rounded-[18px] lg:rounded-[20px]" : "",
                getImageFrameClass({ layout, role: image.role, isSideBySide, display, seamless })
              )}
            >
              <img
                src={resolvePublicSrc(image.src)}
                alt={image.alt ?? ""}
                loading="lazy"
                className={cx(
                  "block h-full w-full",
                  isFeatureCase && "transition-transform duration-500 ease-out"
                )}
                style={getImageStyle(image, { ...resolvedVisual, layout, display, isSideBySide }, seamless)}
              />
            </figure>
          ))}
        </div>

        {resolvedVisual.caption && (
          <p
            className={cx(
              "text-[12px] leading-5 text-[#11100d]/50",
              seamless
                ? "px-4 pt-4 sm:px-0"
                : isFeatureCase
                  ? "m-0 max-w-[760px] px-0 pb-0 pt-4 sm:pt-5"
                  : "px-4 pb-4 pt-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
            )}
          >
            {resolvedVisual.caption}
          </p>
        )}
      </div>
    </section>
  );
}
