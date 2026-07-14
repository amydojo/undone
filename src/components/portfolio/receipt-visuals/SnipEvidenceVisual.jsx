import React from "react";
import { Dot, SanitizedPortrait } from "./EvidencePrimitives";

export default function SnipEvidenceVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "providerPullTrace") {
    const row = body?.queue?.[0] ?? {};
    const fields = [["Name", row.candidate ?? "Provider 001"], ["Specialty", "Urology"], ["NPI", "active"], ["Location", "Target area"], ["Source", "NPPES"], ["Status", row.profileStatus ?? "ready"]];
    return (
      <div className="grid grid-cols-2 divide-x divide-y divide-[#11100d]/10 overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] sm:grid-cols-3">
        {fields.map(([label, value]) => (
          <div key={label} className="p-4">
            <div className="text-[8px] uppercase tracking-[0.12em] text-[#11100d]/38">{label}</div>
            <div className="mt-2 text-[13px] text-[#11100d]/72">{value}</div>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "imageSourcingPipeline") {
    const items = [
      { mode: "source", label: "Source image", note: "sanitized candidate" },
      { mode: "crop", label: "Detected crop", note: "face region retained" },
      { mode: "approved", label: "Approved output", note: "single face / usable crop" },
      { mode: "rejected", label: "Rejected candidate", note: "logo only / no portrait" }
    ];

    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
            <SanitizedPortrait mode={item.mode} accent={accent} />
            <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-[#11100d]/68">
              <Dot color={item.mode === "rejected" ? "#d98b83" : accent} />{item.label}
            </div>
            <div className="mt-1 text-[9px] leading-4 text-[#11100d]/46">{item.note}</div>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "faceValidationGate") {
    const checks = ["face detected", "single subject", "sufficient resolution", "usable crop", "not logo or graphic"];
    return (
      <div className="grid gap-3 md:grid-cols-[1.08fr_0.92fr]">
        <div className="relative rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-3">
          <SanitizedPortrait mode="approved" accent={accent} />
          <div className="absolute left-5 top-5 space-y-1.5">
            {["FACE FOUND", "1 SUBJECT", "CROP SAFE"].map((item) => (
              <div key={item} className="w-fit rounded-full bg-[#142027]/84 px-2 py-1 text-[8px] tracking-[0.1em] text-white">{item}</div>
            ))}
          </div>
          <div className="absolute bottom-5 right-5 rounded-full px-2.5 py-1 text-[8px] font-semibold tracking-[0.1em] text-[#142027]" style={{ backgroundColor: accent }}>APPROVED</div>
        </div>
        <div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4">
          {checks.map((check, index) => (
            <div key={check} className="flex items-center justify-between border-b border-[#11100d]/8 py-2.5 text-[12px] last:border-b-0">
              <span>{check}</span>
              <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.1em] text-[#11100d]/48">
                <Dot color={accent} />{index === 2 ? "1024 px" : "pass"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const files = ["profile.json", "headshot.jpg", "source.txt", "validation.json", "publish-ready/"];
  return (
    <div className="rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1] p-4 font-mono text-[12px] leading-7 text-[#11100d]/68">
      <div className="text-[#11100d]">/provider-name</div>
      {files.map((file) => <div key={file} className="pl-5">├─ {file}</div>)}
    </div>
  );
}
