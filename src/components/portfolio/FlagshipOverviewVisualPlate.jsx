import React from "react";
import { cx } from "../../utils/cx";
import { resolvePublicSrc } from "../../utils/resolvePublicSrc";

const HERO_BY_SLUG = {
  "interface-behavior-lab": {
    src: "/overview/interface-behavior-lab-current-hero.svg",
    alt: "Current Interface Behavior Lab landing composition showing the project thesis and revealed Intent specimen together.",
  },
  "type-archive": {
    src: "/overview/type-archive-live.png",
    alt: "Type Archive decision receipt showing the final typography system and the reasoning preserved with the choice.",
  },
};

export function isFlagshipHero(slug) {
  return Boolean(HERO_BY_SLUG[slug]);
}

export default function FlagshipOverviewVisualPlate({ visual, slug, variant = "canvas" }) {
  const hero = HERO_BY_SLUG[slug];
  if (!hero) return null;

  const isCanvas = variant === "canvas";

  return (
    <section
      className={cx(
        isCanvas ? "border-t border-[#11100d]/8 px-5 py-10 sm:px-6 xl:px-10 xl:py-14" : ""
      )}
    >
      {visual?.label && (
        <div className="pb-4 text-[9px] uppercase tracking-[0.18em] text-[#11100d]/36 sm:pb-5">
          {visual.label}
        </div>
      )}

      <figure className="aspect-[1.6/1] overflow-hidden rounded-[16px] bg-transparent sm:rounded-[18px] lg:rounded-[20px]">
        <img
          src={resolvePublicSrc(hero.src)}
          alt={hero.alt}
          loading="lazy"
          className="block h-full w-full object-cover object-center"
        />
      </figure>

      {visual?.caption && (
        <p className="m-0 max-w-[760px] pt-4 text-[12px] leading-5 text-[#11100d]/50 sm:pt-5">
          {visual.caption}
        </p>
      )}
    </section>
  );
}
