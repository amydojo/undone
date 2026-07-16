import { records } from "./records";

export const typeArchiveRecord = {
  id: "02",
  slug: "type-archive",
  title: "Type Archive",
  displayTitle: "Type Archive",
  featured: true,
  filters: ["product", "interaction"],
  headline: "A font list became a decision system.",
  category: "decision support",
  type: "coded research product",
  status: "live",
  timeline: "2026",
  accent: "#ff6a3d",
  caseStudyHref: "/work/type-archive",
  oneLine:
    "I rebuilt a curated font index into a transparent, license-aware product that helps designers discover candidates, compare them fairly, recover from weak recommendations, and preserve the reasoning behind a final type system.",
  overviewVisual: {
    label: "TRANSPARENT DECISION SYSTEM",
    caption:
      "A vague brief becomes visible signals, role-specific recommendations, controlled comparison, and a restorable decision receipt.",
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
  role: "Product designer, design technologist, and research system designer",
  tools: ["JavaScript", "Node.js", "JSON", "Playwright", "axe-core", "GitHub Actions", "Vercel"],
  hiringTranslation:
    "This case demonstrates product modeling, transparent recommendation logic, schema design, interaction architecture, responsible data curation, accessibility specifications, performance constraints, and production deployment.",
  links: [
    { label: "Read full case study", href: "/work/type-archive", primary: true },
    { label: "Launch Type Archive", href: "https://type-archive.vercel.app" },
    { label: "Inspect proof receipts", href: "https://type-archive.vercel.app/proof-receipts.html" },
    { label: "View GitHub", href: "https://github.com/amydojo/type-archive" },
  ],
  metrics: [
    { value: "81", label: "canonical type records" },
    { value: "14", label: "documented signals" },
    { value: "10", label: "evidence receipts" },
  ],
  path: ["brief", "signals", "role scoring", "comparison", "recovery", "decision receipt"],
  signal:
    "Finding fonts was not the hardest part. The harder work was translating vague intent into functional roles, comparing candidates under the same conditions, checking access and licensing, recovering from a weak recommendation, and explaining why the final system made sense.",
  system:
    "Type Archive keeps intent, role fit, licensing, comparison, rejected options, and final rationale inside one inspectable workflow. Recommendations are deterministic and bounded by documented curation metadata rather than presented as objective taste.",
  owned: [
    "product model",
    "canonical data schema",
    "signal vocabulary",
    "role-specific recommendation logic",
    "comparison architecture",
    "decision receipt",
    "research boundaries",
    "browser and accessibility specifications",
  ],
  nextProof: [
    "Type DNA Recommendation Model",
    "Controlled Comparison Instrument",
    "Responsible Substitution System",
    "Decision Receipt and Verification Contract",
  ],
  decisions: [
    {
      label: "constraint",
      body:
        "Typography judgment is contextual, licensing changes what can responsibly be recommended, and a numerical score can easily imply false certainty.",
    },
    {
      label: "move",
      body:
        "Use a controlled signal vocabulary, score display, interface, and metadata roles separately, and expose contributions, penalties, sources, and licensing beside every recommendation.",
    },
    {
      label: "tradeoff",
      body:
        "A deterministic model is less magical than a generative answer, but it is reproducible, inspectable, testable, and easier to challenge when the result is weak.",
    },
    {
      label: "principle",
      body:
        "The product should structure judgment without pretending to replace it. The reasoning is more valuable than the recommendation alone.",
    },
  ],
  receipts: [
    {
      id: "type-dna-model",
      testId: "type-archive-type-dna-model",
      name: "Type DNA Recommendation Model",
      format: "decision model",
      status: "ready",
      claim:
        "Proves the recommendations come from a documented, role-specific system rather than an opaque generated answer.",
      proof:
        "A 14-signal vocabulary, canonical v2 records, separate display, interface, and metadata scoring, visible contributions, visible penalties, and role-level rejection recovery are present in the product and repository.",
      contents: [
        "14 design signals",
        "81 canonical records",
        "display role",
        "interface role",
        "metadata role",
        "visible contributions",
        "visible penalties",
        "role rejection",
      ],
      visualAssets: [
        {
          src: "/proof/type-archive/type-dna-model.svg",
          alt: "Type DNA model showing signal interpretation, separate role scoring, contributions, penalties, and recommendation evidence.",
          caption:
            "The model separates contextual fit from universal quality and exposes the evidence behind each role recommendation.",
        },
      ],
      artifacts: [],
    },
    {
      id: "controlled-comparison",
      testId: "type-archive-controlled-comparison",
      name: "Controlled Comparison Instrument",
      format: "evaluation interface",
      status: "ready",
      claim:
        "Proves candidates can be evaluated while surrounding variables remain consistent.",
      proof:
        "Display, interface, body, and metadata contexts synchronize specimen text, size, measure, line height, and theme across up to three candidates.",
      contents: [
        "4 contexts",
        "shared specimen text",
        "shared size",
        "shared measure",
        "shared line height",
        "shared theme",
        "three-candidate queue",
      ],
      visualAssets: [
        {
          src: "/proof/type-archive/controlled-comparison.svg",
          alt: "Controlled typography comparison showing three candidates under synchronized display, interface, body, and metadata settings.",
          caption:
            "The interface holds the evaluation conditions still so differences belong to the candidates rather than the surrounding layout.",
        },
      ],
      artifacts: [],
    },
    {
      id: "responsible-substitution",
      testId: "type-archive-responsible-substitution",
      name: "Responsible Substitution System",
      format: "replacement logic",
      status: "ready",
      claim:
        "Proves a premium reference can be translated into accessible alternatives without claiming an exact duplicate.",
      proof:
        "Each substitution states what is preserved, what changes, licensing differences, role fit, and situations where the replacement may fail.",
      contents: [
        "premium reference",
        "accessible alternatives",
        "preserved traits",
        "changed traits",
        "license visibility",
        "failure cases",
        "no exact-dupe claims",
      ],
      visualAssets: [
        {
          src: "/proof/type-archive/responsible-substitution.svg",
          alt: "Responsible font substitution comparison showing preserved traits, changed traits, licensing, and failure cases.",
          caption:
            "Substitution is framed as a documented tradeoff, not a promise that different typefaces are interchangeable.",
        },
      ],
      artifacts: [],
    },
    {
      id: "decision-receipt-contract",
      testId: "type-archive-decision-receipt-contract",
      name: "Decision Receipt and Verification Contract",
      format: "proof and engineering artifact",
      status: "ready",
      claim:
        "Proves the final system preserves its rationale and that product claims are separated from unearned research outcomes.",
      proof:
        "The receipt stores the brief, interpreted signals, selected roles, role evidence, licensing, tradeoffs, rejected candidates, sources, and CSS. Repository contracts cover data, model, browser, accessibility, privacy, performance, research, and portfolio checks.",
      contents: [
        "brief",
        "signal evidence",
        "role rationale",
        "licensing",
        "tradeoffs",
        "rejected candidates",
        "official sources",
        "CSS",
        "evidence boundaries",
      ],
      visualAssets: [
        {
          src: "/proof/type-archive/decision-receipt.svg",
          alt: "Typography Decision Receipt and engineering verification contract with evidence levels and unearned outcome boundaries.",
          caption:
            "The product preserves the decision trail and explicitly distinguishes implemented proof from human outcomes that have not yet been earned.",
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

export function installTypeArchiveRecord({ prioritize = false } = {}) {
  const currentIndex = records.findIndex((record) => record.slug === typeArchiveRecord.slug);
  const targetIndex = prioritize ? 0 : Math.min(1, records.length);

  if (currentIndex === targetIndex) return;
  if (currentIndex >= 0) records.splice(currentIndex, 1);

  records.splice(targetIndex, 0, typeArchiveRecord);
  renumberRecords();
}
