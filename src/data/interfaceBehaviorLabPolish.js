import { records } from "./records";

export function installInterfaceBehaviorLabPolish() {
  const record = records.find((item) => item.slug === "interface-behavior-lab");
  if (!record) return;

  Object.assign(record, {
    category: "interaction design",
    type: "live design system",
    oneLine:
      "I built six button behaviors for moments when an action needs more than a tap, then turned them into a Figma system and a live web lab.",
    role: "Interaction designer and prototyper",
    hiringTranslation:
      "I took an unusual interaction idea and made it clear enough to design, build, test, and hand to someone else.",
    metrics: [
      { value: "6", label: "live controls" },
      { value: "46", label: "component variants" },
      { value: "95", label: "design variables" },
    ],
    path: ["approach", "clarify", "weigh", "commit", "resolve", "recover"],
    signal:
      "Most buttons look the same even when the stakes are completely different. Saving a draft, deleting data, and confirming a payment should not feel identical.",
    system:
      "I designed six control behaviors for different moments in an action, then built them in Figma and React so the idea could be tested instead of just described.",
    owned: [
      "interaction concept",
      "control behaviors",
      "component system",
      "motion",
      "accessibility",
      "prototype build",
    ],
    nextProof: [
      "One Action Language",
      "Six Adaptive Controls",
      "Accessible by Default",
      "Live Interaction Lab",
    ],
    decisions: [
      {
        label: "constraint",
        body: "A browser cannot truly sense pressure, gaze, or haptics, so I did not pretend it could.",
      },
      {
        label: "move",
        body: "Each control shows what is happening, what will happen next, and how to back out.",
      },
      {
        label: "tradeoff",
        body: "I chose clarity over sci fi spectacle. If an effect could mislead people about what the browser was sensing, I left it out.",
      },
      {
        label: "principle",
        body: "New behavior is only useful if people can still understand and control it.",
      },
    ],
    receipts: [
      {
        id: "action-lifecycle-model",
        testId: "interface-behavior-action-lifecycle",
        name: "One Action Language",
        format: "interaction model",
        status: "ready",
        claim:
          "The six controls cover different moments of the same action instead of acting like six unrelated effects.",
        proof:
          "The flow moves from approach to clarify, weigh, commit, resolve, and recover, with one control behavior designed for each moment.",
        contents: ["approach", "clarify", "weigh", "commit", "resolve", "recover"],
        visualAssets: [{ kind: "component", componentKey: "interface-behavior-action-lifecycle" }],
        artifacts: [],
      },
      {
        id: "adaptive-control-library",
        testId: "interface-behavior-control-library",
        name: "Six Adaptive Controls",
        format: "design system",
        status: "ready",
        claim: "The idea became a reusable component system, not a one off demo.",
        proof:
          "Six control families expand into 46 Figma variants, 95 design variables, and light, dark, and spatial modes.",
        contents: ["6 controls", "46 variants", "95 variables", "3 modes"],
        visualAssets: [{ kind: "component", componentKey: "interface-behavior-control-library" }],
        artifacts: [],
      },
      {
        id: "accessibility-contract",
        testId: "interface-behavior-accessibility",
        name: "Accessible by Default",
        format: "interaction rules",
        status: "ready",
        claim: "Every experimental behavior still works through ordinary, understandable input.",
        proof:
          "Stable targets, named states, reduced motion, alternate inputs, and clear recovery are built into the system.",
        contents: ["stable targets", "named states", "reduced motion", "alternate input", "recovery"],
        visualAssets: [{ kind: "component", componentKey: "interface-behavior-accessibility" }],
        artifacts: [],
      },
      {
        id: "coded-playground-instrumentation",
        testId: "interface-behavior-playground",
        name: "Live Interaction Lab",
        format: "working prototype",
        status: "ready",
        claim: "The controls are implemented in a browser so people can actually try them.",
        proof:
          "The live lab lets you switch modes, input types, and assistance levels to see how each control responds.",
        contents: ["light", "dark", "spatial", "input modes", "assistance", "live states"],
        visualAssets: [{ kind: "component", componentKey: "interface-behavior-playground" }],
        artifacts: [],
      },
    ],
  });

  record.overviewVisual = {
    ...record.overviewVisual,
    label: "LIVE INTERACTION SYSTEM",
    caption:
      "Six controls explore how an interface can explain intent, consequence, progress, and recovery while you act.",
  };
}
