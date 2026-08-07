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
  category: "interaction design",
  type: "interactive web product",
  status: "live",
  timeline: "2026",
  accent: "#d94b3d",
  oneLine:
    "Bad Day Receipt turns a hard day into a receipt you can keep, let go, or carry one unfinished thing forward from.",
  overviewVisual: {
    label: "BAD DAY RECEIPT",
    caption:
      "Pick what cost you energy. Print the receipt. Decide what happens next.",
    layout: "single",
    display: "productSingle",
    images: [
      {
        src: "/overview/bad-day-receipt-hero.jpg",
        alt: "Bad Day Receipt showing selected charges, the Human Condition POS, and a printed receipt.",
        role: "primary",
        position: "center center",
        fit: "contain",
      },
    ],
  },
  role: "Product designer and creative technologist",
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
    "I designed the concept, interaction, interface, AI limits, code, and production behavior.",
  links: [
    { label: "Launch product", href: "https://bad-day-receipt.vercel.app", primary: true },
    { label: "View GitHub", href: "https://github.com/amydojo/bad-day-receipt" },
  ],
  metrics: [
    { value: "5", label: "receipt styles" },
    { value: "3", label: "ways to finish" },
    { value: "5", label: "allowed AI steps" },
  ],
  path: [
    "name the cost",
    "build the receipt",
    "print it",
    "choose an ending",
    "carry one thing",
    "finish",
  ],
  signal:
    "Some days take a lot out of you and leave nothing to show for it. By night, the whole thing can collapse into one verdict: bad day.",
  system:
    "Bad Day Receipt makes those small costs visible. Once the receipt prints, you can keep it, let it go, or carry one unfinished thing into a quieter mode that helps you finish just that.",
  owned: [
    "concept and product direction",
    "interaction flow",
    "receipt system",
    "ending choices",
    "One Thing Mode",
    "AI guardrails",
    "visual design",
    "React build and testing",
  ],
  nextProof: [
    "Receipt Machine",
    "Three Ways to End",
    "Carry Forward",
    "One Thing Mode",
  ],
  decisions: [
    {
      label: "constraint",
      body:
        "It had to feel useful without acting like a therapist, diagnosis, or score.",
    },
    {
      label: "move",
      body:
        "Use the familiar language of a receipt: list what the day cost, print it, then decide what to do with it.",
    },
    {
      label: "tradeoff",
      body:
        "AI can help break down one task, but it cannot control the interface or take actions for you.",
    },
    {
      label: "principle",
      body:
        "The receipt is already enough. A hard day does not have to become a productivity exercise.",
    },
  ],
  receipts: [
    {
      id: "emotional-receipt-machine",
      testId: "bad-day-receipt-machine",
      name: "Receipt Machine",
      format: "live product",
      status: "ready",
      claim: "Turns a vague bad day into something you can see and keep.",
      proof: "Five receipt styles, custom line items, print and export, local history, and print recovery.",
      contents: ["5 receipt styles", "custom items", "print and export", "local history"],
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
      name: "Three Ways to End",
      format: "ending choice",
      status: "ready",
      claim: "After the receipt prints, you can keep it, let it go, or carry one thing forward.",
      proof: "All three choices count as a complete ending.",
      contents: ["keep", "let go", "carry one thing"],
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
      format: "optional next step",
      status: "ready",
      claim: "If one thing still matters, you can carry only that forward.",
      proof: "You choose what support you want. The product does not guess how you feel.",
      contents: ["one thing", "one step at a time", "fewer choices", "save progress"],
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
      format: "AI helper",
      status: "ready",
      claim: "AI can help break one task into a small plan without taking over.",
      proof: "It can only return five approved step types. The app checks the plan before showing it.",
      contents: ["read", "choose", "write", "check", "review"],
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
