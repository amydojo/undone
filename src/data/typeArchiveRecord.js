import { records } from "./records";

export const typeArchiveRecord = {
  id: "02",
  slug: "type-archive",
  title: "Type Archive",
  displayTitle: "Type Archive",
  featured: true,
  filters: ["product", "interaction"],
  headline: "A font list became a decision system.",
  category: "typography tools",
  type: "interactive design tool",
  status: "live",
  timeline: "2026",
  accent: "#ff6a3d",
  oneLine:
    "I turned a font collection into a tool that helps designers go from a vague brief to a type system they can compare, explain, and revisit later.",
  overviewVisual: {
    label: "TRANSPARENT DECISION SYSTEM",
    caption:
      "Start with a brief, compare real options, then save the reasoning with the final type system.",
    layout: "split",
    display: "typeArchiveSplit",
    images: [
      {
        src: "/overview/type-archive-system.svg",
        alt: "Type Archive system diagram showing a brief moving through signals, role scoring, comparison, and a decision receipt.",
        role: "primary",
        position: "center center",
        fit: "contain",
      },
      {
        src: "/overview/type-archive-receipt.svg",
        alt: "Typography Decision Receipt showing selected roles, signal evidence, licensing, tradeoffs, and CSS output.",
        role: "secondary",
        position: "center center",
        fit: "contain",
      },
    ],
  },
  role: "Product designer and builder",
  tools: ["JavaScript", "Node.js", "JSON", "Playwright", "axe-core", "GitHub Actions", "Vercel"],
  hiringTranslation:
    "I turned a subjective design choice into a clear process without pretending there is one correct answer.",
  links: [
    { label: "Launch product", href: "https://type-archive.vercel.app", primary: true },
    { label: "View report", href: "https://type-archive.vercel.app/case-study.html" },
    { label: "Methodology", href: "https://type-archive.vercel.app/methodology.html" },
  ],
  metrics: [
    { value: "81", label: "fonts in the archive" },
    { value: "14", label: "design signals" },
    { value: "4", label: "comparison contexts" },
  ],
  path: ["brief", "signals", "recommend", "compare", "choose", "save why"],
  signal:
    "Choosing fonts is easy until you have to explain why they work together, compare them fairly, and make sure you can actually use them.",
  system:
    "Type Archive turns a brief into a few readable signals, recommends fonts for different jobs, lets you compare them side by side, and saves the reasoning with the final choice.",
  owned: [
    "product concept",
    "recommendation logic",
    "comparison experience",
    "decision receipt",
    "data curation",
    "accessibility",
    "build and deployment",
  ],
  nextProof: [
    "Type DNA Recommendations",
    "Side by Side Comparison",
    "Accessible Alternatives",
    "Decision Receipt",
  ],
  decisions: [
    {
      label: "constraint",
      body: "Type is subjective, and licensing can rule out a beautiful option.",
    },
    {
      label: "move",
      body: "Show the why next to every suggestion, including fit, tradeoffs, licensing, and alternatives.",
    },
    {
      label: "tradeoff",
      body: "The tool gives a consistent starting point instead of pretending it knows the one best font.",
    },
    {
      label: "principle",
      body: "Help people make the decision. Do not make it for them.",
    },
  ],
  receipts: [
    {
      id: "type-dna-model",
      testId: "type-archive-type-dna-model",
      name: "Type DNA Recommendations",
      format: "recommendation tool",
      status: "ready",
      claim:
        "A vague brief becomes a small set of font suggestions for different jobs.",
      proof:
        "The tool reads 14 design signals and recommends separate display, interface, and metadata choices, with the reasoning shown beside each one.",
      contents: [
        "14 design signals",
        "81 fonts",
        "3 roles",
        "why it fits",
        "try another",
      ],
      visualAssets: [
        { kind: "component", componentKey: "type-archive-type-dna" },
      ],
      artifacts: [],
    },
    {
      id: "controlled-comparison",
      testId: "type-archive-controlled-comparison",
      name: "Side by Side Comparison",
      format: "comparison tool",
      status: "ready",
      claim:
        "Fonts can be judged in the same layout instead of from unrelated specimens.",
      proof:
        "Up to three candidates share the same text, size, width, spacing, and theme.",
      contents: [
        "4 contexts",
        "shared text",
        "shared sizing",
        "3 fonts at once",
      ],
      visualAssets: [
        { kind: "component", componentKey: "type-archive-controlled-comparison" },
      ],
      artifacts: [],
    },
    {
      id: "responsible-substitution",
      testId: "type-archive-responsible-substitution",
      name: "Accessible Alternatives",
      format: "alternative finder",
      status: "ready",
      claim:
        "If a reference font is expensive or unavailable, the tool suggests practical alternatives without calling them exact dupes.",
      proof:
        "Each alternative explains what stays similar, what changes, and where it may fall short.",
      contents: [
        "premium reference",
        "accessible options",
        "what stays",
        "what changes",
        "licensing",
        "limitations",
      ],
      visualAssets: [
        { kind: "component", componentKey: "type-archive-responsible-substitution" },
      ],
      artifacts: [],
    },
    {
      id: "decision-receipt-contract",
      testId: "type-archive-decision-receipt-contract",
      name: "Decision Receipt",
      format: "saved decision",
      status: "ready",
      claim:
        "The final choice keeps its reasoning attached, so it is easy to revisit or hand off later.",
      proof:
        "The receipt saves the brief, chosen fonts, reasons, licensing, tradeoffs, rejected options, sources, and CSS.",
      contents: [
        "brief",
        "chosen fonts",
        "reasons",
        "licensing",
        "tradeoffs",
        "rejected options",
        "CSS",
      ],
      visualAssets: [
        { kind: "component", componentKey: "type-archive-decision-receipt" },
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

export function installTypeArchiveRecord({ prioritize = false } = {}) {
  const currentIndex = records.findIndex((record) => record.slug === typeArchiveRecord.slug);
  const targetIndex = prioritize ? 0 : Math.min(1, records.length);

  if (currentIndex === targetIndex) return;
  if (currentIndex >= 0) records.splice(currentIndex, 1);

  records.splice(targetIndex, 0, typeArchiveRecord);
  renumberRecords();
}
