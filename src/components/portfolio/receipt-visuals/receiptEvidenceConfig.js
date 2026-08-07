export const CASE_STYLES = {
  mirror: { accent: "#c7b2ff", wash: "#eee8ff", dark: "#17151c" },
  smooth: { accent: "#c8ff62", wash: "#eff7df", dark: "#171913" },
  meta: { accent: "#b6f3d4", wash: "#e8f7f0", dark: "#14201a" },
  snip: { accent: "#8be2ff", wash: "#e5f7fb", dark: "#142027" },
  multi: { accent: "#ffd1a1", wash: "#fbefe1", dark: "#241c16" }
};

const COPY = {
  logicMap: {
    title: "Interpretation Trace",
    summary: "Mirror explains its reading before suggesting an action.",
    flow: ["low sleep + low clarity", "Frayed", "mentally dense", "reduce input"],
    proof: "The product makes its reasoning visible before giving guidance."
  },
  stateMatrix: {
    title: "Check-In Experience",
    summary: "Four quiet signals become one readable state and next move.",
    flow: ["mood + sleep + clarity + context", "Frayed", "reduce one input"],
    proof: "Self-report becomes useful reflection without diagnosing the user."
  },
  coverageMatrix: {
    title: "Body Weather States",
    summary: "Each state connects a signal pattern to a different interface response.",
    flow: ["high tension + low clarity", "Frayed", "reduce input"],
    proof: "Mirror changes its response based on the pattern behind the state."
  },
  qaConsole: {
    title: "Edge Case Tests",
    summary: "Uncertain and sensitive states use explicit product guardrails.",
    flow: ["partial check-in", "uncertain language", "no hard label"],
    proof: "Mirror handles uncertainty without overclaiming or diagnosing."
  },
  brandSystemMap: {
    title: "Clinic Growth System",
    summary: "One operating loop connected brand, demand, clinic follow-up, and retention.",
    flow: ["campaign", "lead", "consult", "treatment", "retention"],
    proof: "Marketing decisions were connected to patient and revenue outcomes."
  },
  lifecycleJourneyMap: {
    title: "Patient Routing",
    summary: "Each patient state triggered a different message, owner, or next step.",
    flow: ["not booked after 2 days", "follow-up", "reactivation"],
    proof: "Booking and treatment state changed who followed up and what happened next."
  },
  instagramRebuildProof: {
    title: "Public Brand Rebuild",
    summary: "A generic medspa presence became clear skin and laser authority.",
    flow: ["generic profile", "service proof", "93 contacts"],
    proof: "Service clarity and visual proof changed how the clinic was perceived."
  },
  campaignToolkitSystem: {
    title: "Campaign Kit",
    summary: "Reusable launch parts connected offer, creative, capture, and follow-up.",
    flow: ["offer", "creative", "lead capture", "follow-up"],
    proof: "Campaigns became reusable systems rather than isolated graphics."
  },
  airtableSchemaMap: {
    title: "Shared Lead Record",
    summary: "Campaign context and patient outcome lived on one record.",
    flow: ["Meta lead", "booked", "arrived", "revenue confidence"],
    proof: "One record connected acquisition evidence to downstream patient outcomes."
  },
  campaignFormulaSheet: {
    title: "Campaign Read",
    summary: "Platform metrics were interpreted through downstream patient behavior.",
    flow: ["acceptable CPL", "weak booking", "repair follow-up"],
    proof: "Booking behavior changed the decision that platform metrics alone suggested."
  },
  attributionTrace: {
    title: "Campaign to Revenue",
    summary: "Source, outcome, and confidence stayed connected through the trace.",
    flow: ["Meta campaign", "arrived", "revenue", "confidence"],
    proof: "Attribution uncertainty was labeled before revenue informed a campaign decision."
  },
  decisionQueueConsole: {
    title: "Decision Case",
    summary: "One campaign read ended with one operational next move.",
    flow: ["good traffic", "weak booking", "repair nurture"],
    proof: "The system converted mixed evidence into a specific operational action."
  },
  providerPullTrace: {
    title: "Provider Source Record",
    summary: "Public provider data became one normalized publishing record.",
    flow: ["NPPES record", "normalize fields", "publishing queue"],
    proof: "Provider data entered production in a consistent, reviewable structure."
  },
  imageSourcingPipeline: {
    title: "Image Source Check",
    summary: "Source confidence and image quality determined the publishing route.",
    flow: ["source candidate", "crop check", "approved portrait"],
    proof: "Image selection used visible quality and source-confidence checks."
  },
  faceValidationGate: {
    title: "Face Validation",
    summary: "One portrait passed five measurable publishing gates.",
    flow: ["portrait candidate", "5 checks", "approved asset"],
    proof: "Provider imagery passed measurable gates before entering the publishing set."
  },
  assetHandoffMap: {
    title: "Publish-Ready Package",
    summary: "Data, imagery, and validation resolved into one final folder.",
    flow: ["profile data", "approved image", "validated folder"],
    proof: "The pipeline produced a complete publishing artifact, not only scraped data."
  },
  lifecycleFlowMap: {
    title: "Multi Brand Lifecycle",
    summary: "Patient state, brand, and service determined the message path.",
    flow: ["new patient", "brand + service", "welcome path"],
    proof: "Relationship stage changed which follow-up sequence the patient entered."
  },
  mailchimpRoutingMap: {
    title: "Message Router",
    summary: "Who they were and what they needed determined what they received.",
    flow: ["Smooth MD + Microneedling + New", "welcome + consult"],
    proof: "Segmentation rules produced a specific message path instead of a generic blast."
  },
  followUpTimingRules: {
    title: "Follow-Up Timing",
    summary: "The message changed as time and patient status changed.",
    flow: ["Day 0 welcome", "Day 2 follow-up", "Day 21 reactivate"],
    proof: "Timing and status determined whether the system nurtured, suppressed, or reactivated."
  },
  emailProductionSystem: {
    title: "Email Production Kit",
    summary: "Shared structure supported distinct brand voices and reliable inbox behavior.",
    flow: ["shared frame", "brand voice", "reliable send"],
    proof: "Reusable modules let multiple brands ship consistently without becoming identical."
  }
};

const FALLBACK = {
  title: "System Proof",
  summary: "One artifact shows how the system works.",
  flow: [],
  proof: "The case is supported by a concrete evidence object."
};

export function getSimplifiedReceiptCopy(receiptBodyType) {
  return COPY[receiptBodyType] ?? FALLBACK;
}
