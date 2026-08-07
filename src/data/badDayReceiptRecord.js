import { records } from "./records";
import { mirrorReceiptVisuals } from "./mirrorReceiptVisuals";
import { badDayReceiptVisuals } from "./badDayReceiptVisuals";

Object.assign(mirrorReceiptVisuals, badDayReceiptVisuals);

export const badDayReceiptRecord = {
  id: "02",
  slug: "bad-day-receipt",
  title: "Bad Day Receipt",
  displayTitle: "Bad Day Receipt",
  featured: true,
  filters: ["product", "interaction"],
  headline: "The day has been itemized.",
  category: "affective interaction",
  type: "coded emotional utility",
  status: "live",
  timeline: "2026",
  accent: "#d94b3d",
  oneLine:
    "I designed and built an emotional documentation machine that turns invisible effort into a physical-feeling receipt, then gives the user three valid endings: keep it, let it go, or carry one remaining obligation into a temporary minimum-necessary interface.",
  overviewVisual: {
    label: "EMOTIONAL DOCUMENTATION MACHINE",
    caption:
      "A difficult day becomes an inspectable receipt, then ends on the user's terms instead of forcing another task, score, or recovery ritual.",
    layout: "single",
    display: "productSingle",
    images: [
      {
        src: "/overview/bad-day-receipt-hero.jpg",
        alt: "Bad Day Receipt live product showing the paperwork system, selected emotional charges, and Human Condition POS receipt machine.",
        role: "primary",
        position: "center center",
        fit: "contain",
      },
    ],
  },
  role: "Product designer, creative technologist, and interaction systems designer",
  tools: [
    "Figma",
    "React",
    "TypeScript",
    "Vite",
    "GPT-5.6",
    "OpenAI Responses API",
    "Playwright",
    "Vercel",
  ],
  hiringTranslation:
    "This case demonstrates affective product strategy, unusual interaction metaphors, local-first state design, accessibility and recovery thinking, constrained AI architecture, typed rendering, validation boundaries, responsive implementation, and production verification.",
  links: [
    { label: "Launch live product", href: "https://bad-day-receipt.vercel.app", primary: true },
    { label: "View GitHub", href: "https://github.com/amydojo/bad-day-receipt" },
  ],
  metrics: [
    { value: "5", label: "receipt paper systems" },
    { value: "3", label: "valid endings" },
    { value: "5", label: "typed AI step kinds" },
  ],
  path: [
    "document",
    "itemize",
    "print",
    "choose ending",
    "declare support",
    "finish one thing",
  ],
  signal:
    "A difficult day can require real attention, emotional labor, decisions, and recovery while leaving almost no visible evidence behind. The next interface usually behaves as though none of that happened.",
  system:
    "Bad Day Receipt turns invisible effort into a bounded artifact first. A completed receipt is independently valid. From there, the user can keep it, let it go, or explicitly carry one remaining obligation into One Thing Mode, where GPT-5.6 proposes a constrained task plan and the application validates and renders it through fixed, typed components.",
  owned: [
    "product thesis and emotional framing",
    "receipt interaction model",
    "Three Valid Endings architecture",
    "Minimum Necessary Interface concept",
    "Interaction Budget model",
    "constrained AI product boundary",
    "visual and interaction direction",
    "React implementation and production verification",
  ],
  nextProof: [
    "Receipt Machine",
    "Three Valid Endings",
    "Carry Forward",
    "One Thing Mode",
  ],
  decisions: [
    {
      label: "constraint",
      body:
        "The product deals with emotionally loaded self-reporting, but it should not diagnose the user, estimate distress, detect emotion, or turn a difficult day into another optimization score.",
    },
    {
      label: "move",
      body:
        "Borrow the authority and physicality of a receipt to document what the day required, then make closure explicit: keep the artifact, release it, or deliberately carry one remaining obligation forward.",
    },
    {
      label: "tradeoff",
      body:
        "The AI path is intentionally narrower than a chatbot. The model proposes structure, while the application owns validation, layout, persistence, filenames, actions, recovery, and exit controls.",
    },
    {
      label: "principle",
      body:
        "A completed receipt is already a valid ending. Recognition does not need to become productivity before it counts.",
    },
  ],
  receipts: [
    {
      id: "emotional-receipt-machine",
      testId: "bad-day-receipt-machine",
      name: "Receipt Machine",
      format: "artifact system",
      status: "ready",
      claim: "Turns invisible effort into a bounded artifact without diagnosis.",
      proof: "Five paper systems, deterministic printer states, local history, recovery, export, and offline behavior.",
      contents: ["5 paper systems", "printer states", "local history", "recovery"],
      visualAssets: [
        {
          kind: "component",
          componentKey: "bad-day-receipt-machine",
        },
      ],
      artifacts: [],
    },
    {
      id: "three-valid-endings",
      testId: "bad-day-receipt-three-endings",
      name: "Three Valid Endings",
      format: "closure model",
      status: "ready",
      claim: "Completion stays valid before any next action.",
      proof: "Keep, Let Go, and Carry Forward are equal outcomes after the receipt is complete.",
      contents: ["keep", "let go", "carry forward"],
      visualAssets: [
        {
          kind: "component",
          componentKey: "bad-day-three-valid-endings",
        },
      ],
      artifacts: [],
    },
    {
      id: "carry-forward-interaction-budget",
      testId: "bad-day-receipt-carry-forward",
      name: "Carry Forward",
      format: "adaptive path",
      status: "ready",
      claim: "Adaptation follows declared support, not inferred emotion.",
      proof: "One obligation moves forward with user-selected support rules that remain temporary and reversible.",
      contents: ["one thing", "declared support", "temporary", "reversible"],
      visualAssets: [
        {
          kind: "component",
          componentKey: "bad-day-carry-forward",
        },
      ],
      artifacts: [],
    },
    {
      id: "validated-one-thing-mode",
      testId: "bad-day-receipt-one-thing-mode",
      name: "One Thing Mode",
      format: "validated AI runtime",
      status: "ready",
      claim: "AI proposes structure while the application controls the interface and actions.",
      proof: "GPT-5.6 is limited to five typed step kinds that must pass application validation before rendering.",
      contents: ["5 typed steps", "strict schema", "fixed React", "no auto actions"],
      visualAssets: [
        {
          kind: "component",
          componentKey: "bad-day-one-thing-mode",
        },
      ],
      artifacts: [],
    },
  ],
};

function renumberRecords() {
  records.forEach((record, index) => {
    record.id = String(index + 1).padStart(2, "0");
  });
}

export function installBadDayReceiptRecord({ prioritize = false } = {}) {
  const currentIndex = records.findIndex((record) => record.slug === badDayReceiptRecord.slug);
  const targetIndex = prioritize ? 0 : Math.min(1, records.length);

  if (currentIndex === targetIndex) return;
  if (currentIndex >= 0) records.splice(currentIndex, 1);

  records.splice(targetIndex, 0, badDayReceiptRecord);
  renumberRecords();
}
