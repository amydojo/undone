import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatMetadataLabel } from "../../utils/caseMetadata";
import { useOverlayBehavior } from "./useOverlayBehavior";
import CaseLinks from "./CaseLinks";

const SECTIONS = [
  { id: "overview", label: "overview" },
  { id: "problem", label: "problem" },
  { id: "built", label: "what I built" },
  { id: "choices", label: "key choices" },
  { id: "result", label: "result" },
];

const CASE_DETAILS = {
  "interface-behavior-lab": {
    sidebarType: "Interaction design",
    sidebarScope: "Six adaptive controls and a live test lab",
    built: [
      "Intent makes the consequence clear before you commit.",
      "Pressure and Ethical add friction when an action deserves more care.",
      "Breathing, Magnetic, and Reversible show progress, offer assistance, and keep recovery close.",
    ],
    resultIntro: "The result is a working design system, not a concept deck.",
    result: [
      "Six live controls you can try in the browser.",
      "46 Figma variants and 95 variables keep the system reusable.",
      "Every experimental behavior still has a clear conventional path.",
    ],
  },
  "type-archive": {
    sidebarType: "Typography tool",
    sidebarScope: "Recommendations, comparison, and saved reasoning",
    built: [
      "Turn plain language into a small set of useful design signals.",
      "Recommend fonts for display, interface, and metadata jobs.",
      "Compare options side by side, then save the reasoning, licensing, and CSS with the final choice.",
    ],
    resultIntro: "The result is a font tool that remembers why a choice was made.",
    result: [
      "81 fonts organized for real decisions instead of endless browsing.",
      "Four comparison contexts keep candidates on equal footing.",
      "Decision receipts make handoff and revisiting a choice much easier.",
    ],
  },
};

function sectionDomId(slug, sectionId) {
  return `${slug}-flagship-${sectionId}`;
}

function scrollToSection(slug, sectionId) {
  const node = document.getElementById(sectionDomId(slug, sectionId));
  if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLabel({ children }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">
      {children}
    </div>
  );
}

function NumberedList({ items }) {
  return (
    <ol className="mt-7 divide-y divide-[#11100d]/10 border-y border-[#11100d]/10">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-5 py-4 lg:py-5">
          <span className="w-8 shrink-0 pt-0.5 text-[10px] tabular-nums tracking-[0.12em] text-[#11100d]/32">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="max-w-[680px] text-[15px] leading-[1.65] text-[#11100d]/70">
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function FlagshipCaseWorkspace({ workspace, closeWorkspace }) {
  const dialogRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  const detail = CASE_DETAILS[workspace?.slug];
  const handleClose = React.useCallback(() => closeWorkspace(), [closeWorkspace]);

  useOverlayBehavior({
    active: Boolean(workspace),
    overlayRef: dialogRef,
    initialFocusRef: closeButtonRef,
    onClose: handleClose,
  });

  if (!workspace || !detail) return null;

  const headerMetadata = [
    formatMetadataLabel(workspace.category),
    workspace.timeline,
    formatMetadataLabel(workspace.status),
  ].filter(Boolean);

  const decisions = ["move", "tradeoff", "principle"]
    .map((label) => workspace.decisions.find((item) => item.label === label))
    .filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        key="flagship-case-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-50 overscroll-contain bg-[#11100d]/48 p-2.5 sm:p-3 lg:p-8"
      >
        <motion.div
          ref={dialogRef}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 210, damping: 24 }}
          className="mx-auto flex h-full w-full max-w-[1160px] flex-col overflow-hidden rounded-[24px] border border-[#11100d]/12 bg-[#f7f1e7] shadow-[0_48px_130px_rgba(17,16,13,0.28)] sm:rounded-[28px]"
          role="dialog"
          aria-modal="true"
          aria-label={`${workspace.title} case file`}
          tabIndex={-1}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#11100d]/10 px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#11100d]/38">case file</div>
              <h2 className="mt-1.5 text-[18px] font-medium leading-tight tracking-[-0.022em] text-[#11100d] lg:text-[20px]">
                {workspace.title}
              </h2>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#11100d]/44">
                {headerMetadata.map((item, index) => (
                  <React.Fragment key={item}>
                    {index > 0 && <span className="h-[3px] w-[3px] rounded-full bg-[#11100d]/20" aria-hidden="true" />}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close case file"
              onClick={handleClose}
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#11100d]/12 bg-[#fffaf1] text-[#11100d]/54 transition-colors hover:bg-[#f0eadf] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/22 lg:h-10 lg:w-10"
            >
              <X className="h-[15px] w-[15px]" />
            </button>
          </header>

          <div className="flex min-h-0 flex-1 overflow-hidden">
            <aside className="hidden w-[200px] shrink-0 flex-col border-r border-[#11100d]/10 px-5 py-7 lg:flex xl:w-[220px]">
              <nav className="sticky top-0">
                <div className="space-y-0.5">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(workspace.slug, section.id)}
                      className="block w-full rounded-[8px] px-3 py-2 text-left text-[11px] uppercase tracking-[0.12em] text-[#11100d]/48 transition-colors hover:bg-[#11100d]/5 hover:text-[#11100d]/80"
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
                <div className="mt-7 border-t border-[#11100d]/10 pt-6 text-[11px] leading-[1.55] text-[#11100d]/44">
                  <p className="font-medium text-[#11100d]/62">{detail.sidebarType}</p>
                  <p className="mt-1 text-[#11100d]/42">{detail.sidebarScope}</p>
                </div>
              </nav>
            </aside>

            <main className="scrollbar-portfolio flex-1 overflow-y-auto">
              <div className="mx-auto max-w-[940px] px-5 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
                <section id={sectionDomId(workspace.slug, "overview")} className="pb-14 lg:pb-16">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.72fr)] lg:items-end">
                    <h3 className="text-[40px] leading-[1.02] tracking-[-0.035em] text-[#11100d] sm:text-[50px] lg:text-[58px]">
                      {workspace.headline}
                    </h3>
                    <div>
                      <SectionLabel>In one line</SectionLabel>
                      <p className="mt-3 text-[15px] leading-[1.7] text-[#11100d]/66">{workspace.oneLine}</p>
                      <CaseLinks links={workspace.links} />
                    </div>
                  </div>
                  <div className="mt-9 grid border-y border-[#11100d]/12" style={{ gridTemplateColumns: `repeat(${workspace.metrics.length}, minmax(0, 1fr))` }}>
                    {workspace.metrics.map((metric, index) => (
                      <div key={metric.label} className="px-4 py-4 lg:px-6" style={index > 0 ? { borderLeft: "1px solid rgba(17,16,13,0.1)" } : undefined}>
                        <div className="text-[24px] leading-none tracking-[-0.03em] text-[#11100d] lg:text-[28px]">{metric.value}</div>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#11100d]/40">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id={sectionDomId(workspace.slug, "problem")} className="border-t border-[#11100d]/10 py-14 lg:py-16">
                  <SectionLabel>Problem</SectionLabel>
                  <p className="mt-4 max-w-[720px] text-[20px] leading-[1.5] tracking-[-0.015em] text-[#11100d]/76 lg:text-[23px]">
                    {workspace.signal}
                  </p>
                </section>

                <section id={sectionDomId(workspace.slug, "built")} className="border-t border-[#11100d]/10 py-14 lg:py-16">
                  <SectionLabel>What I built</SectionLabel>
                  <p className="mt-4 max-w-[680px] text-base leading-[1.65] text-[#11100d]/66">{workspace.system}</p>
                  <NumberedList items={detail.built} />
                </section>

                <section id={sectionDomId(workspace.slug, "choices")} className="border-t border-[#11100d]/10 py-14 lg:py-16">
                  <SectionLabel>Key choices</SectionLabel>
                  <div className="mt-7 overflow-hidden rounded-[14px] border border-[#11100d]/10">
                    {decisions.map((decision) => (
                      <div key={decision.label} className="grid grid-cols-1 border-b border-[#11100d]/10 px-5 py-5 last:border-b-0 md:grid-cols-[130px_1fr] lg:px-6">
                        <div className="mb-1.5 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38 md:mb-0 md:pt-0.5">{decision.label}</div>
                        <p className="text-[15px] leading-[1.65] text-[#11100d]/68">{decision.body}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id={sectionDomId(workspace.slug, "result")} className="border-t border-[#11100d]/10 pb-4 pt-14 lg:pt-16">
                  <SectionLabel>Result</SectionLabel>
                  <p className="mt-4 max-w-[680px] text-base leading-[1.65] text-[#11100d]/66">{detail.resultIntro}</p>
                  <NumberedList items={detail.result} />
                </section>
              </div>
            </main>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
