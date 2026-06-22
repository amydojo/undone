import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Clock3,
  Focus,
  ShieldCheck,
} from "lucide-react";
import { profile } from "../../data/profile";

const IMAGE_ROOT = "/images/dr-vigor";
const SAMPLE_URL = "https://drvigor.figma.site/";
const AIRTABLE_FORM_URL = "https://airtable.com/appVPAbeMM2QMwGc9/pag1dxAMhh0NlxUkm/form";
const AIRTABLE_EMBED_URL = "https://airtable.com/embed/appVPAbeMM2QMwGc9/pag1dxAMhh0NlxUkm/form";
const CONTACT_SUBJECT = "Men’s Wellness Lead Page Sprint — Page Outline";
const CONTACT_BODY = [
  "Hi Amy,",
  "",
  "I’m interested in a page outline for a men’s wellness offer.",
  "",
  "Service / offer:",
  "Current website:",
  "Booking link:",
  "",
  "A little context:",
].join("\n");
const CONTACT_URL = `mailto:${profile.contact}?subject=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`;

const landingPathPoints = [
  "One offer, not your whole site",
  "One clear CTA, not five competing choices",
  "One consult path built around prospect questions",
];

const problemPoints = [
  {
    number: "01",
    title: "Too vague",
    copy: "The service is listed, but the process, qualification steps, labs, pricing, or next action are unclear.",
  },
  {
    number: "02",
    title: "Too aggressive",
    copy: "The messaging leans on hype instead of trust, privacy, provider guidance, and patient education.",
  },
  {
    number: "03",
    title: "Too buried",
    copy: "Prospects are sent to a general homepage or service menu instead of a focused page for the exact offer they clicked on.",
  },
];

const sampleProof = [
  "Clear offer positioning",
  "Simple process explanation",
  "Biomarker specificity",
  "Provider-guided framing",
  "Focused request / booking path",
  "Compliance-aware copy",
];

const deliverables = [
  "A dedicated page for one service or offer",
  "Clear service positioning",
  "Process section that explains what happens next",
  "Trust and provider / credentials section",
  "FAQ that handles common hesitation",
  "Booking or inquiry CTA",
  "Mobile-first layout for ad and social traffic",
  "Basic SEO title and meta description",
  "Temporary URL or launch handoff guidance",
  "One revision round",
];

const justificationPoints = [
  {
    icon: CircleDollarSign,
    title: "Lower commitment",
    copy: "A focused $500 sprint instead of committing to a full website rebuild.",
  },
  {
    icon: Clock3,
    title: "Clear timing",
    copy: "The page outline comes first, and the build timeline is confirmed before work starts.",
  },
  {
    icon: Focus,
    title: "One-offer focus",
    copy: "The page stays centered on the service, prospect questions, and next action.",
  },
];

const existingSitePoints = [
  "Works with your existing website",
  "Can link to your current booking flow",
  "Built around one service, not your entire menu",
];

const conversionCards = [
  {
    number: "01",
    title: "Offer clarity",
    image: `${IMAGE_ROOT}/dr-vigor-desktop-hero.png`,
    mobileImage: `${IMAGE_ROOT}/dr-vigor-mobile-hero.png`,
    alt: "Dr. Vigor performance panel hero explaining the offer and request path.",
    copy: "The visitor quickly understands what the offer is, why it exists, and what to do next.",
    imageClass: "object-cover object-[center_63%]",
  },
  {
    number: "02",
    title: "Process clarity",
    image: `${IMAGE_ROOT}/dr-vigor-desktop-full.png`,
    mobileImage: `${IMAGE_ROOT}/dr-vigor-mobile-full.png`,
    alt: "Dr. Vigor landing page process sections explaining how the performance panel works.",
    copy: "The page explains the steps before the visitor has to ask basic questions.",
    imageClass: "object-cover object-[center_27%]",
  },
  {
    number: "03",
    title: "Conversion path",
    image: `${IMAGE_ROOT}/dr-vigor-desktop-booking.png`,
    mobileImage: `${IMAGE_ROOT}/dr-vigor-mobile-booking.png`,
    alt: "Dr. Vigor booking section with a focused appointment and payment path.",
    copy: "The inquiry or booking section keeps the next action focused and easy to complete.",
    imageClass: "object-contain object-center",
  },
];

const bestFitOffers = [
  "TRT consultation",
  "Men’s hormone health consult",
  "ED treatment inquiry",
  "Weight loss program consult",
  "Hair restoration consult",
  "Longevity / performance panel",
  "IV therapy performance recovery",
  "Functional medicine consult",
  "Urology men’s health service",
];

const pageAnatomy = [
  ["01", "Clear hero and consult CTA"],
  ["02", "Who the service is for"],
  ["03", "What the consult or service includes"],
  ["04", "How the process works"],
  ["05", "Trust, provider, and privacy signals"],
  ["06", "FAQ for hesitation and qualification questions"],
  ["07", "Final inquiry or booking CTA"],
];

const sprintSteps = [
  "Submit the form with the service, current site, and booking link",
  "I review the service, current site, and booking path",
  "I send a simple page outline first",
  "If it is a fit, we move into the $500 page sprint",
  "The build timeline is confirmed before work starts",
];

function updateMetaTag(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function updatePropertyMetaTag(property, content) {
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function usePageMetadata() {
  useEffect(() => {
    const title = "Men’s Wellness Lead Page Sprint | Undone Design";
    const description =
      "One-page consult landing pages for TRT, hormone health, ED, weight loss, hair restoration, and men’s wellness clinics.";
    const previousTitle = document.title;
    const previousDescription = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";

    document.title = title;
    updateMetaTag("description", description);
    updatePropertyMetaTag("og:title", title);
    updatePropertyMetaTag("og:description", description);
    updatePropertyMetaTag("og:type", "website");
    updatePropertyMetaTag("og:url", window.location.href);
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    const hadCanonical = Boolean(canonical);
    const previousCanonical = canonical?.getAttribute("href") ?? "";
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/mens-wellness-lead-page-sprint/`);

    return () => {
      document.title = previousTitle;
      updateMetaTag("description", previousDescription);
      if (hadCanonical) canonical.setAttribute("href", previousCanonical);
      else canonical.remove();
    };
  }, []);
}

function SectionIntro({ eyebrow, title, copy, dark = false, className = "", children = null }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-[0.62fr_1.38fr] lg:gap-12 ${className}`}>
      <p className={`text-[10px] uppercase tracking-[0.2em] ${dark ? "text-white/40" : "text-[#111820]/42"}`}>
        {eyebrow}
      </p>
      <div>
        <h2
          className={`max-w-[820px] text-[35px] leading-[1.04] tracking-[-0.042em] sm:text-[48px] lg:text-[58px] ${
            dark ? "text-white" : "text-[#111820]"
          }`}
        >
          {title}
        </h2>
        {copy ? (
          <p
            className={`mt-6 max-w-[740px] text-[16px] leading-7 sm:text-[18px] sm:leading-8 ${
              dark ? "text-white/58" : "text-[#111820]/60"
            }`}
          >
            {copy}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

function BrowserFrame({ children, label = "Dr. Vigor sample page", className = "", dark = false }) {
  return (
    <figure
      className={`overflow-hidden rounded-[16px] border ${
        dark ? "border-white/12 bg-[#080d13]" : "border-[#111820]/10 bg-white"
      } shadow-[0_28px_80px_rgba(19,37,59,0.12)] ${className}`}
    >
      <div
        className={`flex h-10 items-center gap-1.5 border-b px-4 ${
          dark ? "border-white/10 bg-[#111820]" : "border-[#111820]/8 bg-[#f7f9fb]"
        }`}
        aria-hidden="true"
      >
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/18" : "bg-[#111820]/12"}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/18" : "bg-[#111820]/12"}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/18" : "bg-[#111820]/12"}`} />
        <span className={`ml-3 text-[8px] uppercase tracking-[0.16em] ${dark ? "text-white/30" : "text-[#111820]/28"}`}>
          {label}
        </span>
      </div>
      {children}
    </figure>
  );
}

function PrimaryCta({ className = "" }) {
  return (
    <a
      href="#request-outline"
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#111820] px-7 text-[14px] font-medium tracking-[-0.01em] text-white transition hover:bg-[#1e4f84] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6e9fff] focus-visible:ring-offset-2 ${className}`}
    >
      Request a Page Outline
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

function SampleCta({ className = "" }) {
  return (
    <a
      href={SAMPLE_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-current px-7 text-[14px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${className}`}
    >
      View Sample Page
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

export default function MensWellnessLeadPageSprint() {
  usePageMetadata();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f7f8] font-sans text-[#111820] selection:bg-[#b9d1ef]">
      <header className="border-b border-[#111820]/8 bg-[#f5f7f8]/94 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
          <a
            href="/"
            className="group inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#111820]/48 transition hover:text-[#111820] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111820]/20"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Undone Design
          </a>
          <a
            href="#request-outline"
            className="inline-flex min-h-11 items-center rounded-full border border-[#111820]/12 bg-white/60 px-4 text-[10px] uppercase tracking-[0.13em] text-[#111820]/64 transition hover:border-[#111820]/30 hover:text-[#111820] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111820]/20"
          >
            Request outline
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:px-12 lg:pb-40 lg:pt-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_72%_18%,rgba(111,159,255,0.16),transparent_37%),linear-gradient(rgba(17,24,32,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,32,0.025)_1px,transparent_1px)] [background-size:auto,52px_52px,52px_52px]" />
          <div className="relative mx-auto max-w-[1344px]">
            <div className="max-w-[1050px]">
              <p className="mb-7 text-[10px] uppercase tracking-[0.22em] text-[#1e4f84]">
                Men’s Wellness Lead Page Sprint
              </p>
              <h1 className="max-w-[980px] text-[48px] leading-[0.98] tracking-[-0.055em] sm:text-[72px] lg:text-[92px]">
                Focused lead pages for men’s wellness clinics.
              </h1>
              <p className="mt-8 max-w-[900px] text-[19px] leading-8 text-[#111820]/68 sm:text-[22px] sm:leading-9">
                One clear page for one high-value service, built to help prospects understand the offer, trust the process, and request a consult.
              </p>
              <p className="mt-5 max-w-[760px] border-l-2 border-[#6e9fff] pl-5 text-[16px] leading-7 text-[#111820]/60">
                Built for TRT, hormone health, ED, weight loss, hair restoration, and performance wellness clinics.
              </p>
              <div className="mt-9 flex flex-col gap-3 pb-1 sm:flex-row">
                <PrimaryCta />
                <SampleCta className="border-[#111820]/14 bg-white/70 text-[#111820]/70 hover:border-[#111820]/30 hover:text-[#111820]" />
              </div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.13em] text-[#111820]/40">
                $500 founding sprint · Outline first · Build timeline confirmed after review
              </p>
            </div>

            <div className="relative mt-16 sm:mt-24 lg:mt-28 lg:pr-[15%]">
              <BrowserFrame className="relative z-10">
                <div className="relative aspect-[1.36/1] overflow-hidden bg-[#050505] sm:aspect-[1.78/1]">
                  <img
                    src={`${IMAGE_ROOT}/dr-vigor-desktop-hero.png`}
                    alt="Desktop Dr. Vigor sample page hero for a provider-guided performance panel."
                    width="2880"
                    height="5712"
                    fetchpriority="high"
                    className="absolute left-0 top-0 h-auto w-full -translate-y-[46.5%] object-contain"
                  />
                </div>
              </BrowserFrame>
              <div className="relative z-20 mx-auto -mt-10 w-[62%] min-w-[210px] max-w-[310px] sm:absolute sm:-bottom-14 sm:right-0 sm:mt-0 sm:w-[25%]">
                <div className="overflow-hidden rounded-[30px] border-[6px] border-[#111820] bg-[#111820] p-1 shadow-[0_30px_70px_rgba(17,24,32,0.24)]">
                  <img
                    src={`${IMAGE_ROOT}/dr-vigor-mobile-hero.png`}
                    alt="Mobile Dr. Vigor sample page hero with a clear performance panel call to action."
                    width="780"
                    height="1892"
                    className="h-auto w-full rounded-[22px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#111820]/8 bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro
              eyebrow="Why this matters"
              title="Your clinic may already have traffic. The problem is where that traffic lands."
              copy="If visitors click from Google, Meta, email, or social and land on a general website page, they often have to figure out the offer themselves. A lead page gives one service a dedicated path: clear explanation, process, trust signals, FAQs, and one next step."
            />
            <div className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-[#111820]/10 bg-[#111820]/10 md:grid-cols-3 lg:mt-20">
              {landingPathPoints.map((point, index) => (
                <div key={point} className="min-h-[150px] bg-[#fbfcfd] p-6 sm:p-8">
                  <span className="text-[9px] tracking-[0.16em] text-[#1e4f84]">0{index + 1}</span>
                  <p className="mt-12 max-w-[300px] text-[18px] leading-6 tracking-[-0.025em] text-[#111820]/76">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#edf2f6] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro eyebrow="Where pages lose people" title="Most men’s wellness pages lose people in one of three ways." />
            <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
              {problemPoints.map((point) => (
                <article key={point.title} className="rounded-[16px] border border-[#111820]/9 bg-white/72 p-7 sm:p-8">
                  <p className="text-[10px] tracking-[0.18em] text-[#1e4f84]">{point.number}</p>
                  <h3 className="mt-14 text-[28px] tracking-[-0.035em]">{point.title}</h3>
                  <p className="mt-4 text-[16px] leading-7 text-[#111820]/60">{point.copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 border-l-2 border-[#6e9fff] pl-5 text-[18px] leading-7 tracking-[-0.02em] text-[#111820]/72">
              The page does not need to be bigger. It needs to be clearer.
            </p>
          </div>
        </section>

        <section className="bg-[#101a26] px-5 py-20 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro
              eyebrow="Sample page"
              title="Sample Page: Dr. Vigor Performance Panel"
              copy="This sample performance panel page shows how a men’s wellness offer can feel clinical, premium, and easy to understand without relying on vague wellness claims or aggressive supplement-style language."
              dark
            />

            <div className="mt-12 grid gap-2 border-y border-white/10 py-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {sampleProof.map((item) => (
                <div key={item} className="flex items-center gap-3 py-2 text-[15px] leading-6 text-white/66">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#79a7ff]" strokeWidth={1.8} aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-14 grid items-start gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_300px]">
              <BrowserFrame label="Full desktop page" dark>
                <div className="scrollbar-portfolio h-[500px] overflow-y-auto bg-white sm:h-[820px]">
                  <img
                    src={`${IMAGE_ROOT}/dr-vigor-desktop-full.png`}
                    alt="Full desktop Dr. Vigor performance panel landing page concept."
                    width="2880"
                    height="8520"
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
              </BrowserFrame>
              <div className="mx-auto w-[78%] max-w-[300px] lg:w-full">
                <div className="overflow-hidden rounded-[32px] border-[7px] border-[#05080c] bg-[#05080c] p-1 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                  <div className="scrollbar-portfolio h-[540px] overflow-y-auto rounded-[23px] bg-white sm:h-[730px]">
                    <img
                      src={`${IMAGE_ROOT}/dr-vigor-mobile-full.png`}
                      alt="Full mobile Dr. Vigor performance panel landing page concept."
                      width="780"
                      height="10024"
                      loading="lazy"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
                <p className="mt-5 text-center text-[9px] uppercase tracking-[0.16em] text-white/34">
                  Scrollable mobile page
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
              <img
                src={`${IMAGE_ROOT}/dr-vigor-white-blue-logo.png`}
                alt="Dr. Vigor sample concept logo."
                width="258"
                height="56"
                loading="lazy"
                className="h-auto w-[128px]"
              />
              <p className="max-w-[690px] text-[16px] leading-7 text-white/64 sm:text-right sm:text-[17px]">
                This is the kind of focused page a clinic could send traffic to from ads, email, or social instead of sending prospects to a general homepage.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#111820]/8 bg-[#dfeafb] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="mx-auto flex max-w-[1344px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#1e4f84]">See the approach in context</p>
              <p className="mt-2 max-w-[680px] text-[17px] leading-7 text-[#111820]/68">
                Review the full Dr. Vigor concept from offer explanation through the request path.
              </p>
            </div>
            <a
              href={SAMPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 self-start rounded-full bg-[#111820] px-7 text-[14px] font-medium text-white transition hover:bg-[#1e4f84] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111820]/30 focus-visible:ring-offset-2 sm:self-auto"
            >
              See the live sample
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="border-b border-[#111820]/8 bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1344px]">
            <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div className="lg:sticky lg:top-10 lg:self-start">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1e4f84]">What’s included</p>
                <h2 className="mt-6 max-w-[590px] text-[42px] leading-[1.02] tracking-[-0.045em] sm:text-[60px]">
                  What your clinic gets in one focused sprint
                </h2>
                <p className="mt-7 max-w-[520px] text-[17px] leading-7 text-[#111820]/62">
                  Everything is built around one offer, one audience, and one next step.
                </p>
                <div className="mt-9 pb-2">
                  <PrimaryCta />
                </div>
              </div>
              <div>
                <ul className="border-t border-[#111820]/12">
                  {deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex min-h-[66px] items-center gap-4 border-b border-[#111820]/10 py-4 text-[16px] leading-6 text-[#111820]/72"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#1e4f84]" strokeWidth={1.6} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 rounded-[12px] bg-[#edf2f6] px-5 py-4 text-[15px] leading-6 text-[#111820]/60">
                  Best for one high-value offer. Not a full website rebuild. Not a 30-page brand project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f7f8] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro
              eyebrow="Why it can make sense"
              title="Built to be easy to justify."
              copy="For many men’s wellness clinics, one qualified consult can be worth more than the cost of the page. The goal is not to redesign your entire brand. The goal is to give one offer a cleaner page that helps visitors understand it and take the next step."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20">
              {justificationPoints.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-[16px] border border-[#111820]/9 bg-white p-7">
                  <Icon className="h-5 w-5 text-[#1e4f84]" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-14 text-[22px] tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-[16px] leading-7 text-[#111820]/58">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#111820]/8 bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro
              eyebrow="Keep what already works"
              title="You do not need a full website rebuild."
              copy="This is for clinics that already have a service worth promoting, but need a clearer page to send traffic to. One offer. One page. One next step."
            />
            <div className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-[#111820]/10 bg-[#111820]/10 md:grid-cols-3 lg:mt-20">
              {existingSitePoints.map((point, index) => (
                <div key={point} className="min-h-[160px] bg-[#fbfcfd] p-7 sm:p-8">
                  <span className="text-[9px] tracking-[0.16em] text-[#1e4f84]">0{index + 1}</span>
                  <p className="mt-12 max-w-[300px] text-[18px] leading-7 tracking-[-0.02em] text-[#111820]/74">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#111820]/8 bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro eyebrow="What the page makes clear" title="Built around the parts that make a consult feel clear." />
            <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
              {conversionCards.map((card) => (
                <article key={card.title} className="rounded-[18px] border border-[#111820]/9 bg-[#f8fafb] p-2.5 sm:p-3">
                  <div className="flex aspect-[0.92/1] items-center justify-center overflow-hidden rounded-[12px] border border-[#111820]/8 bg-white sm:aspect-[1.04/1]">
                    <picture className="flex h-full w-full items-center justify-center">
                      <source media="(max-width: 639px)" srcSet={card.mobileImage} />
                      <img
                        src={card.image}
                        alt={card.alt}
                        loading="lazy"
                        className={`h-full w-full ${card.imageClass}`}
                      />
                    </picture>
                  </div>
                  <div className="px-2 pb-3 pt-6 sm:px-3">
                    <span className="text-[9px] tracking-[0.16em] text-[#1e4f84]">{card.number}</span>
                    <h3 className="mt-8 text-[24px] tracking-[-0.035em]">{card.title}</h3>
                    <p className="mt-3 text-[16px] leading-7 text-[#111820]/60">{card.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#edf2f6] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro eyebrow="Best fit" title="Best fit for clinics promoting one high-value offer." />
            <div className="mt-14 grid border-t border-[#111820]/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {bestFitOffers.map((offer, index) => (
                <div
                  key={offer}
                  className={`flex min-h-[86px] items-center gap-5 border-b border-[#111820]/10 py-5 text-[16px] leading-6 text-[#111820]/68 sm:px-6 ${
                    index % 2 === 0 ? "sm:border-r sm:pl-0 sm:pr-6" : "sm:pl-6 sm:pr-0"
                  } ${index % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"} ${
                    index % 3 === 0
                      ? "lg:pl-0 lg:pr-6"
                      : index % 3 === 1
                        ? "lg:px-6"
                        : "lg:pl-6 lg:pr-0"
                  }`}
                >
                  <span className="w-4 shrink-0 text-[9px] tabular-nums tracking-[0.15em] text-[#1e4f84]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{offer}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-[780px] text-[17px] leading-7 text-[#111820]/62">
              If the service is valuable but the current page feels vague, buried, or hard to act on, this sprint is a fit.
            </p>
          </div>
        </section>

        <section className="bg-[#111820] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro
              eyebrow="The page structure"
              title="The repeatable structure"
              copy="A defined page sequence keeps the strategy focused and the build fast. The structure repeats; the offer, proof, questions, and clinic voice do not."
              dark
            />
            <ol className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {pageAnatomy.map(([number, item], index) => (
                <li
                  key={item}
                  className={`min-h-[132px] bg-[#111820] p-5 sm:min-h-[180px] sm:p-7 ${
                    index === pageAnatomy.length - 1 ? "lg:col-span-2" : ""
                  }`}
                >
                  <span className="text-[9px] tracking-[0.18em] text-[#79a7ff]">{number}</span>
                  <p className="mt-10 max-w-[270px] text-[17px] leading-6 tracking-[-0.02em] text-white/78 sm:mt-16 sm:text-[18px]">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro
              eyebrow="How it works"
              title="What happens next"
              copy="Start with the service and booking path you already have. I’ll review them and send a simple outline before any build work starts."
            />
            <ol className="mt-14 border-t border-[#111820]/12 lg:mt-20">
              {sprintSteps.map((step, index) => (
                <li
                  key={step}
                  className="grid gap-4 border-b border-[#111820]/10 py-6 sm:grid-cols-[72px_1fr] sm:items-center sm:py-7"
                >
                  <span className="text-[10px] tracking-[0.16em] text-[#1e4f84]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-[17px] leading-7 tracking-[-0.02em] text-[#111820]/72 sm:text-[19px]">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-3 rounded-[14px] border border-[#1e4f84]/16 bg-[#f4f8fc] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[15px] font-medium leading-6 text-[#111820]/72">First outline: 1–2 business days after I receive the request.</p>
                <p className="mt-2 max-w-[720px] text-[14px] leading-6 text-[#111820]/58">
                  The full page build starts after the offer, content, and next step are confirmed.
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#1e4f84]">$500 · one page · one revision</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#111820]/8 bg-[#f5f7f8] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto flex max-w-[1100px] gap-5 rounded-[16px] border border-[#1e4f84]/16 bg-white p-6 sm:gap-7 sm:p-8">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1e4f84]" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h2 className="text-[18px] tracking-[-0.025em] text-[#111820]">Compliance-aware by default.</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#111820]/60 sm:text-[16px]">
                This service focuses on page structure, design, and marketing clarity. Health-related claims should be reviewed by the clinic’s licensed medical and legal/compliance teams. The page should not promise diagnosis, treatment outcomes, or guaranteed results.
              </p>
            </div>
          </div>
        </section>

        <section
          id="request-outline"
          className="scroll-mt-6 bg-[#dfeafb] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
        >
          <div className="mx-auto max-w-[1344px]">
            <SectionIntro
              eyebrow="Request"
              title="Request a Page Outline"
              copy="Send your service, current website, and booking link. I’ll review the offer and send back a simple page outline showing how I’d structure a clearer consult page before you commit."
            >
              <p className="mt-7 text-[13px] font-medium uppercase tracking-[0.13em] text-[#1e4f84]">
                Takes about 60 seconds. No call required.
              </p>
              <p className="mt-3 max-w-[740px] text-[15px] leading-7 text-[#111820]/58">
                You do not need polished copy or final assets. A current website and one service to clarify is enough.
              </p>
            </SectionIntro>

            <div className="mt-14 grid items-start gap-7 lg:mt-20 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-9">
              <aside className="rounded-[24px] border border-[#111820]/10 bg-white/74 p-7 shadow-[0_24px_70px_rgba(35,62,91,0.08)] sm:p-9 lg:sticky lg:top-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#1e4f84]">What I review</p>
                <h3 className="mt-5 text-[30px] leading-[1.05] tracking-[-0.04em] text-[#111820]">
                  What I’ll use this for
                </h3>
                <p className="mt-5 text-[16px] leading-7 text-[#111820]/62">
                  Your answers help me identify the strongest page angle, the missing trust signals, and the clearest next step for the offer.
                </p>

                <ul className="mt-8 border-t border-[#111820]/10">
                  {["Clinic site", "Service to promote", "Booking path", "Current page issue"].map((item) => (
                    <li
                      key={item}
                      className="flex min-h-[58px] items-center gap-3 border-b border-[#111820]/9 py-3 text-[15px] text-[#111820]/70"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dfeafb] text-[#1e4f84]">
                        <Check className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 rounded-[12px] bg-[#f1f5f8] px-4 py-3 text-[14px] leading-6 text-[#111820]/58">
                  No long sales call required.
                </p>
              </aside>

              <div className="overflow-hidden rounded-[24px] border border-[#111820]/10 bg-[#fbfcfd] shadow-[0_28px_80px_rgba(35,62,91,0.1)]">
                <div className="flex min-h-[48px] items-center justify-between border-b border-[#111820]/8 bg-white px-5 sm:px-6">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#111820]/48">Project intake</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#1e4f84]">60 sec</span>
                </div>
                <iframe
                  src={AIRTABLE_EMBED_URL}
                  width="100%"
                  title="Request a Page Outline Airtable form"
                  loading="lazy"
                  className="block h-[1200px] w-full border-0 bg-transparent sm:h-[1120px] lg:h-[1100px]"
                />
                <div className="border-t border-[#111820]/8 bg-white px-5 py-6 sm:px-6">
                  <p className="text-[14px] leading-6 text-[#111820]/52">Having trouble with the embedded form?</p>
                  <a
                    href={AIRTABLE_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-[#1e4f84] transition hover:text-[#111820] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e4f84]/28"
                  >
                    Open the form in a new tab
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <p className="mt-4 text-[14px] leading-6 text-[#111820]/48">
                    Prefer email?{" "}
                    <a
                      href={CONTACT_URL}
                      className="font-medium text-[#111820]/70 underline decoration-[#111820]/22 underline-offset-4 transition hover:text-[#111820]"
                    >
                      Send the details directly.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#111820] px-5 py-8 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/34">Undone Design · Amy Do</p>
          <a href={`mailto:${profile.contact}`} className="text-[11px] text-white/48 transition hover:text-white">
            {profile.contact}
          </a>
        </div>
      </footer>
    </div>
  );
}
