import React from "react";
import { Dot, Label } from "./EvidencePrimitives";
import { CASE_STYLES } from "./receiptEvidenceConfig";

export default function MirrorEvidenceVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "stateMatrix") {
    const field = body?.weatherField ?? {};
    return (
      <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
          {["Mood", "Sleep", "Clarity", "Context"].map((label, index) => (
            <div key={label}>
              <div className="flex items-center justify-between text-[10px] text-[#11100d]/58">
                <span>{label}</span>
                <span>{["tender", "thin", "foggy", "dense"][index]}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-[#11100d]/8">
                <div className="h-full rounded-full" style={{ width: `${38 + index * 10}%`, backgroundColor: accent }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[18px] p-5 text-[#fffaf1]" style={{ backgroundColor: CASE_STYLES.mirror.dark }}>
          <Label dark>Body Weather</Label>
          <div className="mt-7 text-[42px] leading-none tracking-[-0.04em]">{field.state ?? "Frayed"}</div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.12em]" style={{ color: accent }}>
            {field.confidence ?? "medium confidence"}
          </div>
          <p className="mt-5 max-w-md text-[14px] leading-6 text-[#fffaf1]/74">
            {field.interpretation ?? "Today may feel mentally dense."}
          </p>
          <div className="mt-6 border-t border-[#fffaf1]/12 pt-4 text-[13px] text-[#fffaf1]/84">
            {field.nextMove ?? "Reduce one input."}
          </div>
        </div>
      </div>
    );
  }

  if (receiptBodyType === "coverageMatrix") {
    const states = [
      { name: "Settled", signal: "low tension / stable clarity", response: "maintain rhythm", dark: false },
      { name: "Frayed", signal: "high tension / low clarity", response: "reduce input load", dark: true },
      { name: "Drifting", signal: "low mood / low clarity", response: "offer one anchor", dark: false },
      { name: "Restoring", signal: "sleep or context improving", response: "protect calm", dark: true },
      { name: "Compressed", signal: "high tension / usable energy", response: "narrow choices", dark: false },
      { name: "Clear", signal: "sharp clarity / low tension", response: "support focus", dark: true }
    ];

    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {states.map((state, index) => (
          <div
            key={state.name}
            className="min-h-[148px] rounded-[16px] border border-[#11100d]/9 p-3.5"
            style={{
              background: state.dark ? "linear-gradient(145deg, #19171f, #2a2440)" : "linear-gradient(145deg, #fffaf1, #eee8ff)",
              color: state.dark ? "#fffaf1" : "#11100d"
            }}
          >
            <div className="text-[8px] uppercase tracking-[0.13em] opacity-45">state {String(index + 1).padStart(2, "0")}</div>
            <div className="mt-5 text-[18px] font-medium">{state.name}</div>
            <div className="mt-2 text-[10px] leading-4 opacity-62">{state.signal}</div>
            <div className="mt-4 border-t border-current/10 pt-2 text-[10px] font-medium" style={{ color: state.dark ? accent : "#51405f" }}>
              {state.response}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "logicMap") {
    const resolver = body?.resolver?.[0] ?? { state: "Frayed", rule: "high tension + low clarity", nextMove: "lower input load" };
    const steps = [
      {
        label: "Signals",
        content: (
          <div className="space-y-1.5 text-[13px] text-[#11100d]/72">
            <div>sleep low</div>
            <div>clarity low</div>
            <div>tension high</div>
          </div>
        )
      },
      {
        label: "State",
        dark: true,
        content: (
          <>
            <div className="text-[30px] leading-none">{resolver.state}</div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.1em]" style={{ color: accent }}>medium confidence</div>
            <div className="mt-2 text-[11px] text-[#fffaf1]/58">{resolver.rule}</div>
          </>
        )
      },
      {
        label: "Explanation",
        content: <div className="text-[15px] leading-6 text-[#11100d]/76">“Today may feel mentally dense.”</div>
      },
      {
        label: "Next move",
        content: <div className="text-[16px] leading-6 text-[#11100d]/82">{resolver.nextMove}</div>
      }
    ];

    return (
      <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1.1fr_auto_1fr] md:items-stretch">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index > 0 && <div className="flex items-center justify-center py-1 text-[18px] text-[#11100d]/28 md:py-0">→</div>}
            <div
              className={`rounded-[16px] border p-4 ${step.dark ? "border-transparent text-[#fffaf1]" : "border-[#11100d]/10 bg-[#fffaf1]"}`}
              style={step.dark ? { backgroundColor: CASE_STYLES.mirror.dark } : undefined}
            >
              <Label dark={step.dark}>{step.label}</Label>
              <div className="mt-4">{step.content}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  const cases = [
    { scenario: "Conflicting signals", input: "bright mood + broken sleep", guardrail: "mixed read", result: "avoids overconfidence" },
    { scenario: "Low confidence", input: "partial check-in", guardrail: "still taking shape", result: "no hard label" },
    { scenario: "No history", input: "first check-in", guardrail: "no similarity claim", result: "no invented pattern" },
    { scenario: "Sensitive language", input: "high tension + low mood", guardrail: "descriptive copy", result: "no clinical claim" }
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {cases.map((item) => (
        <div key={item.scenario} className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3.5">
          <div className="text-[11px] font-medium text-[#11100d]">{item.scenario}</div>
          <div className="mt-3 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/38">Risk input</div>
          <div className="mt-1 text-[11px] leading-4 text-[#11100d]/66">{item.input}</div>
          <div className="mt-3 border-t border-[#11100d]/8 pt-3 text-[10px] text-[#11100d]/60">{item.guardrail}</div>
          <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-[#11100d]/72"><Dot color={accent} />{item.result}</div>
        </div>
      ))}
    </div>
  );
}
