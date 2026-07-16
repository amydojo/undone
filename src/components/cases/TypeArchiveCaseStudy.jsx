import React from "react";
import { ArrowLeft, ArrowUpRight, Check, CircleAlert } from "lucide-react";

const METRICS = [
  ["81", "canonical type records"],
  ["14", "documented design signals"],
  ["4", "controlled comparison contexts"],
  ["10", "evidence-bounded proof receipts"],
];

const SYSTEM_STEPS = [
  {
    number: "01",
    title: "Interpret the brief",
    body: "Start with plain-language intent. The system maps words to a controlled signal vocabulary without claiming the brief has one objectively correct reading.",
  },
  {
    number: "02",
    title: "Score roles separately",
    body: "Display, interface, and metadata have different jobs. Each role uses different suitability rules, contributions, and penalties.",
  },
  {
    number: "03",
    title: "Expose the evidence",
    body: "Every recommendation shows signal overlap, role fit, penalties, access, licensing, and official sources instead of hiding the result behind a confidence badge.",
  },
  {
    number: "04",
    title: "Hold comparison variables still",
    body: "Specimen text, size, measure, line height, and theme stay synchronized across display, interface, body, and metadata contexts.",
  },
  {
    number: "05",
    title: "Recover without restarting",
    body: "A designer can reject one role, inspect the replacement, and preserve the rest of the system. The rejected choice remains part of the evidence trail.",
  },
  {
    number: "06",
    title: "Preserve the decision",
    body: "The final receipt stores the brief, signals, selected roles, rationale, licensing, tradeoffs, rejected candidates, sources, and CSS.",
  },
];

const DECISIONS = [
  {
    title: "Deterministic by choice",
    body: "The same brief and settings produce the same result. That makes the recommendation reproducible, testable, and easier to challenge than an opaque generated answer.",
  },
  {
    title: "Contextual, not universal",
    body: "Signal alignment describes fit to the current brief and role. It is not statistical confidence and it does not claim one typeface is objectively better.",
  },
  {
    title: "Licensing is product information",
    body: "Access type, license category, and official source are visible during discovery and decision making, not buried in a footnote after selection.",
  },
  {
    title: "Recovery is part of trust",
    body: "Weak recommendations are expected. The product supports rejection, role-level regeneration, comparison, restoration, and a record of what changed.",
  },
];

const PROOFS = [
  {
    title: "Type DNA model",
    kind: "Decision model",
    image: "/proof/type-archive/type-dna-model.svg",
    body: "Shows how a brief becomes documented signals, separate role scores, visible contributions, visible penalties, and inspectable recommendations.",
  },
  {
    title: "Controlled comparison",
    kind: "Evaluation interface",
    image: "/proof/type-archive/controlled-comparison.svg",
    body: "Shows up to three candidates under synchronized display, interface, body, and metadata conditions.",
  },
  {
    title: "Responsible substitution",
    kind: "Replacement logic",
    image: "/proof/type-archive/responsible-substitution.svg",
    body: "Shows what an alternative preserves, what changes, where licensing differs, and where the substitution may fail.",
  },
  {
    title: "Decision receipt",
    kind: "Proof artifact",
    image: "/proof/type-archive/decision-receipt.svg",
    body: "Shows the final rationale, licensing, rejected candidates, sources, CSS, and explicit limits on what the system can claim.",
  },
];

function Eyebrow({ children }) {
  return <div className="text-[10px] uppercase tracking-[0.19em] text-[#11100d]/38">{children}</div>;
}

function SectionHeader({ label, title, body }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-10">
      <Eyebrow>{label}</Eyebrow>
      <div>
        <h2 className="text-[36px] leading-[1.03] tracking-[-0.035em] text-[#11100d] sm:text-[46px] lg:text-[56px]">
          {title}
        </h2>
        {body ? <p className="mt-5 max-w-[660px] text-[16px] leading-[1.7] text-[#11100d]/62">{body}</p> : null}
      </div>
    </div>
  );
}

function ActionLink({ href, children, primary = false }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={
        primary
          ? "inline-flex min-h-11 items-center gap-2 rounded-full bg-[#11100d] px-5 text-[10px] uppercase tracking-[0.15em] text-[#fffaf1] transition hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/30 focus-visible:ring-offset-2"
          : "inline-flex min-h-11 items-center gap-2 rounded-full border border-[#11100d]/14 bg-[#fffaf1] px-5 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/68 transition hover:border-[#11100d]/30 hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/20 focus-visible:ring-offset-2"
      }
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

export default function TypeArchiveCaseStudy() {
  return (
    <main className="min-h-screen bg-[#0b0b09] text-[#11100d]">
      <div className="mx-auto min-h-screen max-w-[1720px] bg-[#f7f1e7]">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[#11100d]/10 bg-[#f7f1e7]/94 px-4 py-3 backdrop-blur sm:px-6 lg:px-10">
          <a
            href="/?case=type-archive"
            className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/56 transition hover:text-[#11100d]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Portfolio
          </a>
          <div className="hidden text-[10px] uppercase tracking-[0.15em] text-[#11100d]/34 sm:block">
            Type Archive / Case 02
          </div>
          <a
            href="https://type-archive.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#11100d] px-4 text-[10px] uppercase tracking-[0.15em] text-[#fffaf1]"
          >
            Launch product <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </header>

        <section className="relative overflow-hidden border-b border-[#11100d]/10 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24 lg:pt-20 xl:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 78% 20%, rgba(255,106,61,0.16), transparent 28%), linear-gradient(rgba(17,16,13,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(17,16,13,0.025) 1px, transparent 1px)",
              backgroundSize: "auto, 42px 42px, 42px 42px",
            }}
          />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(360px,0.72fr)] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#11100d]/38">
                <span>Type Archive</span>
                <span className="h-1 w-1 rounded-full bg-[#ff6a3d]" />
                <span>Decision support</span>
                <span className="h-1 w-1 rounded-full bg-[#11100d]/20" />
                <span>2026</span>
              </div>
              <h1 className="mt-7 max-w-[980px] text-[56px] leading-[0.94] tracking-[-0.052em] text-[#11100d] sm:text-[76px] lg:text-[92px] xl:text-[108px]">
                A font list became a decision system.
              </h1>
              <p className="mt-7 max-w-[760px] text-[18px] leading-[1.65] text-[#11100d]/64 sm:text-[21px]">
                I rebuilt a curated typography archive into a transparent product for discovering candidates, comparing them under controlled conditions, recovering from weak recommendations, and preserving the reasoning behind a final type system.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                <ActionLink href="https://type-archive.vercel.app" primary>
                  Launch product
                </ActionLink>
                <ActionLink href="https://type-archive.vercel.app/proof-receipts.html">Inspect proof</ActionLink>
                <ActionLink href="https://github.com/amydojo/type-archive">View GitHub</ActionLink>
              </div>
            </div>

            <aside className="overflow-hidden rounded-[24px] border border-[#11100d]/12 bg-[#fffaf1] shadow-[0_30px_90px_rgba(17,16,13,0.08)]">
              <div className="flex items-center justify-between border-b border-[#11100d]/8 px-5 py-4">
                <Eyebrow>Decision 0048</Eyebrow>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6a3d]" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/36">Selected system</div>
                <div className="mt-4 text-[27px] leading-[1.08] tracking-[-0.03em]">Instrument Serif</div>
                <div className="mt-2 text-[19px] text-[#11100d]/70">Instrument Sans</div>
                <div className="mt-1 font-mono text-[13px] text-[#11100d]/48">IBM Plex Mono</div>
                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[#11100d]/8 bg-[#11100d]/8">
                  {[
                    ["Precise", "92"],
                    ["Human", "84"],
                    ["Clinical", "79"],
                    ["Quiet", "71"],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#fffaf1] px-4 py-3">
                      <div className="text-[20px] tracking-[-0.02em]">{value}</div>
                      <div className="mt-1 text-[9px] uppercase tracking-[0.13em] text-[#11100d]/34">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2 text-[12px] leading-5 text-[#11100d]/56">
                  <div className="flex items-start gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[#ff6a3d]" /> Licensing visible</div>
                  <div className="flex items-start gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[#ff6a3d]" /> Tradeoffs preserved</div>
                  <div className="flex items-start gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[#ff6a3d]" /> CSS ready</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid border-b border-[#11100d]/10 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map(([value, label], index) => (
            <div key={label} className={`px-5 py-6 sm:px-7 lg:px-9 ${index > 0 ? "border-t border-[#11100d]/10 sm:border-t-0 sm:border-l" : ""}`}>
              <div className="text-[38px] leading-none tracking-[-0.04em]">{value}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40">{label}</div>
            </div>
          ))}
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <SectionHeader
            label="01 / The problem"
            title="Discovery was not the hard part."
            body="A large font list can help someone browse. It does not help them translate a vague brief into functional roles, compare candidates consistently, check what they can legally use, recover when a recommendation feels wrong, or explain the final choice to another person."
          />

          <div className="mt-12 grid overflow-hidden rounded-[20px] border border-[#11100d]/10 lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-10">
              <Eyebrow>Before</Eyebrow>
              <div className="mt-6 divide-y divide-[#11100d]/8">
                {[
                  "Browse a large collection",
                  "Judge candidates in inconsistent layouts",
                  "Treat licensing as a later problem",
                  "Lose the reasoning after selection",
                  "Restart when one role feels wrong",
                ].map((item) => (
                  <div key={item} className="py-3 text-[15px] leading-6 text-[#11100d]/58">{item}</div>
                ))}
              </div>
            </div>
            <div className="border-t border-[#11100d]/10 bg-[#fffaf1] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <Eyebrow>After</Eyebrow>
              <div className="mt-6 divide-y divide-[#11100d]/8">
                {[
                  "Discover by role, signal, access, and source",
                  "Compare under synchronized conditions",
                  "See licensing during the decision",
                  "Keep contributions, penalties, and tradeoffs visible",
                  "Reject one role without destroying the system",
                ].map((item) => (
                  <div key={item} className="py-3 text-[15px] leading-6 text-[#11100d]/72">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#11100d]/10 bg-[#11100d] px-5 py-16 text-[#fffaf1] sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-10">
            <div className="text-[10px] uppercase tracking-[0.19em] text-[#fffaf1]/38">02 / System model</div>
            <div>
              <h2 className="text-[36px] leading-[1.03] tracking-[-0.035em] sm:text-[46px] lg:text-[56px]">Discover. Decide. Defend.</h2>
              <p className="mt-5 max-w-[660px] text-[16px] leading-[1.7] text-[#fffaf1]/58">
                The product is organized around the full decision, not the moment a font card looks appealing.
              </p>
            </div>
          </div>

          <div className="mt-12 divide-y divide-[#fffaf1]/10 border-y border-[#fffaf1]/10">
            {SYSTEM_STEPS.map((step) => (
              <div key={step.number} className="grid gap-4 py-6 sm:grid-cols-[64px_240px_minmax(0,1fr)] sm:items-start sm:gap-6 lg:py-7">
                <div className="font-mono text-[11px] tracking-[0.1em] text-[#fffaf1]/30">{step.number}</div>
                <div className="text-[15px] uppercase tracking-[0.09em] text-[#fffaf1]/82">{step.title}</div>
                <p className="max-w-[690px] text-[14px] leading-[1.7] text-[#fffaf1]/54">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <SectionHeader
            label="03 / Product surfaces"
            title="The interface makes the model inspectable."
            body="The strongest design move was not visual. It was keeping the reasoning close to the action, so a designer can inspect, reject, compare, restore, and explain rather than passively accept a recommendation."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
            <figure className="overflow-hidden rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1] p-3 sm:p-4">
              <img src="/overview/type-archive-system.svg" alt="Type Archive decision system overview" className="h-full w-full rounded-[14px] object-contain" />
            </figure>
            <figure className="overflow-hidden rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1] p-3 sm:p-4">
              <img src="/overview/type-archive-receipt.svg" alt="Type Archive decision receipt overview" className="h-full w-full rounded-[14px] object-contain" />
            </figure>
          </div>
        </section>

        <section className="border-y border-[#11100d]/10 bg-[#fffaf1] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <SectionHeader
            label="04 / Design decisions"
            title="Trust came from visible limits."
            body="The system becomes more credible when it says what it knows, how it reached a result, and where judgment still belongs to the designer."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[#11100d]/10 bg-[#11100d]/10 md:grid-cols-2">
            {DECISIONS.map((decision, index) => (
              <article key={decision.title} className="bg-[#f7f1e7] p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#11100d]/28">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-2 w-2 rounded-full bg-[#ff6a3d]" />
                </div>
                <h3 className="mt-6 text-[24px] leading-[1.1] tracking-[-0.025em]">{decision.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#11100d]/58">{decision.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <SectionHeader
            label="05 / Proof receipts"
            title="Every major claim points to an object."
            body="The case is organized around inspectable evidence instead of screenshots followed by unsupported conclusions."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PROOFS.map((proof) => (
              <article key={proof.title} className="overflow-hidden rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1]">
                <div className="aspect-[1.45/1] overflow-hidden border-b border-[#11100d]/8 bg-white p-3 sm:p-4">
                  <img src={proof.image} alt="" className="h-full w-full object-contain" />
                </div>
                <div className="p-6 sm:p-7">
                  <Eyebrow>{proof.kind}</Eyebrow>
                  <h3 className="mt-4 text-[25px] leading-[1.08] tracking-[-0.025em]">{proof.title}</h3>
                  <p className="mt-4 text-[14px] leading-[1.7] text-[#11100d]/58">{proof.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#11100d]/10 bg-[#efe7da] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <SectionHeader
            label="06 / Engineering contract"
            title="Transparency had to exist in the code too."
            body="A product cannot claim inspectable reasoning while its data, tests, privacy rules, and release boundaries remain vague."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Data and model",
                lines: ["Canonical schema v2", "Migration and validation scripts", "Deterministic role scoring", "Visible contributions and penalties"],
              },
              {
                title: "Product quality",
                lines: ["Playwright interaction specifications", "axe-core accessibility scans", "Responsive and reduced-motion coverage", "Explicit performance budgets"],
              },
              {
                title: "Evidence and privacy",
                lines: ["Event-specific analytics allowlists", "Free-text briefs excluded from analytics", "E0 to E3 evidence levels", "Research templates separated from findings"],
              },
            ].map((group) => (
              <div key={group.title} className="rounded-[20px] border border-[#11100d]/10 bg-[#f7f1e7] p-6 sm:p-7">
                <h3 className="text-[20px] tracking-[-0.02em]">{group.title}</h3>
                <div className="mt-5 space-y-3">
                  {group.lines.map((line) => (
                    <div key={line} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#11100d]/58">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff6a3d]" />
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-5 sm:p-6">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#ff6a3d]" />
            <p className="max-w-[920px] text-[13px] leading-[1.7] text-[#11100d]/62">
              Honest boundary: the repository contains the current validation, browser, accessibility, performance, research, and portfolio contracts. GitHub Actions has also failed before runner startup, so the latest browser suite is not described as green. Human usability and market outcomes remain unearned until real sessions and usage support them.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <SectionHeader
            label="07 / Outcome"
            title="The result is not a better font picker."
            body="It is a clearer way to make, inspect, challenge, and communicate a typography decision. The product turns subjective judgment into structured evidence without pretending the evidence can replace taste."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-[22px] bg-[#11100d] p-7 text-[#fffaf1] sm:p-10">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#fffaf1]/34">Design technologist proof</div>
              <p className="mt-6 max-w-[780px] text-[25px] leading-[1.35] tracking-[-0.025em] text-[#fffaf1]/88 sm:text-[32px]">
                I identified where human judgment became messy, modeled the ambiguity, built an interface around the model, exposed its reasoning, defined the quality contracts, and shipped the working product.
              </p>
            </div>
            <div className="rounded-[22px] border border-[#11100d]/10 bg-[#fffaf1] p-7 sm:p-8">
              <Eyebrow>Role</Eyebrow>
              <p className="mt-4 text-[15px] leading-7 text-[#11100d]/68">Product design, design technology, curation, research system, and front-end implementation.</p>
              <Eyebrow>Built with</Eyebrow>
              <p className="mt-4 text-[15px] leading-7 text-[#11100d]/68">JavaScript, Node.js, JSON, Playwright, axe-core, GitHub Actions, and Vercel.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-2.5">
            <ActionLink href="https://type-archive.vercel.app" primary>Launch Type Archive</ActionLink>
            <ActionLink href="https://type-archive.vercel.app/case-study.html">Product case study</ActionLink>
            <ActionLink href="https://type-archive.vercel.app/methodology.html">Methodology</ActionLink>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-[#11100d]/10 px-5 py-8 text-[11px] text-[#11100d]/42 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 xl:px-16">
          <div>Amy Do / Undone / Type Archive</div>
          <a href="/?case=type-archive" className="inline-flex items-center gap-2 hover:text-[#11100d]">
            Back to portfolio <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </footer>
      </div>
    </main>
  );
}
