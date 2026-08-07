import { records } from "./records";

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
    layout: "split",
    display: "productSplit",
    images: [
      {
        src: "/overview/bad-day-receipt-hero.jpg",
        alt: "Bad Day Receipt live product showing the paperwork system, selected emotional charges, and Human Condition POS receipt machine.",
        role: "primary",
        position: "center center",
      },
      {
        src: "/overview/bad-day-receipt-artifact.jpg",
        alt: "Bad Day Receipt live product showing the Human Condition POS machine and a fully printed thermal-style receipt artifact.",
        role: "secondary",
        position: "center center",
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
    "Emotional Receipt Machine",
    "Three Valid Endings",
    "Carry Forward and Interaction Budget",
    "Validated One Thing Mode",
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
      name: "Emotional Receipt Machine",
      format: "interactive artifact",
      status: "ready",
      claim:
        "Proves a vague emotional judgment can become a bounded, physical-feeling artifact without pretending the output is diagnosis or objective measurement.",
      proof:
        "The shipped product supports emotional receipt composition, custom charges and credits, five paper systems, deterministic printer states, totals and verdicts, image export, local drafts and history, interrupted-print recovery, offline support, reduced motion, and browser accessibility coverage.",
      contents: [
        "custom charges",
        "custom credits",
        "5 receipt papers",
        "printer states",
        "totals and verdicts",
        "image export",
        "local drafts",
        "interrupted-print recovery",
        "offline support",
        "reduced motion",
      ],
      visualAssets: [
        {
          src: "/overview/bad-day-receipt-artifact.jpg",
          alt: "Human Condition POS machine with the completed Bad Day Receipt printed beneath it.",
        },
      ],
      artifacts: [],
    },
    {
      id: "three-valid-endings",
      testId: "bad-day-receipt-three-endings",
      name: "Three Valid Endings",
      format: "closure architecture",
      status: "ready",
      claim:
        "Proves the product treats completion as a user-controlled decision instead of silently converting recognition into another required workflow.",
      proof:
        "After print completion, Keep Receipt confirms a private local archive write, Let It Go confirms local deletion with a bounded Undo window, and Carry One Thing Forward preserves the receipt while creating separate temporary task context.",
      contents: [
        "print complete",
        "keep receipt",
        "let it go",
        "bounded undo",
        "carry one thing forward",
        "separate task context",
      ],
      visualAssets: [
        {
          src: "/overview/bad-day-receipt-endings.jpg",
          alt: "Bad Day Receipt completed state showing the user-controlled ending decision after the day has been documented.",
        },
      ],
      artifacts: [],
    },
    {
      id: "carry-forward-interaction-budget",
      testId: "bad-day-receipt-carry-forward",
      name: "Carry Forward and Interaction Budget",
      format: "adaptive interaction model",
      status: "ready",
      claim:
        "Proves adaptation is based on support the person explicitly asks for rather than covert emotional inference.",
      proof:
        "The user can request one step at a time, fewer decisions, protected progress, or deferred optional work. Those declared needs become deterministic presentation rules rather than model-inferred psychological conclusions.",
      contents: [
        "one step at a time",
        "fewer decisions",
        "protect my progress",
        "defer optional work",
        "preview adaptation",
        "user authorized",
        "temporary",
        "reversible",
      ],
      visualAssets: [
        {
          src: "/overview/bad-day-receipt-carry-forward.jpg",
          alt: "Bad Day Receipt Carry Forward designation state asking what is still asking something from the user.",
        },
      ],
      artifacts: [],
    },
    {
      id: "validated-one-thing-mode",
      testId: "bad-day-receipt-one-thing-mode",
      name: "Validated One Thing Mode",
      format: "constrained AI runtime",
      status: "ready",
      claim:
        "Proves generative AI can propose task structure without controlling the interface or performing irreversible actions.",
      proof:
        "GPT-5.6 returns a strict TaskPlan using only read, choice, compose, checklist, and review steps. The application validates the plan, rejects malformed output, keeps actions and layout application-owned, and falls back to a manual one-task workspace when assisted compilation fails.",
      contents: [
        "GPT-5.6",
        "Structured Outputs",
        "5 typed step kinds",
        "application validator",
        "fixed React renderers",
        "no model-generated HTML",
        "no automatic external actions",
        "manual fallback",
      ],
      visualAssets: [],
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
