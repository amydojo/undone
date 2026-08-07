import React from "react";
import { resolvePublicSrc } from "../../../utils/resolvePublicSrc";
import { Dot, Label } from "./EvidencePrimitives";

export default function SmoothEvidenceVisual({ receiptBodyType, body, accent }) {
  if (receiptBodyType === "instagramRebuildProof") {
    const before = body?.before?.images?.[0];
    const after = body?.after?.images?.[0];
    return (
      <div>
        <div className="grid grid-cols-2 gap-3">
          {[before, after].map((image, index) => (
            <div key={index} className="overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1]">
              <div className="px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[#11100d]/38">{index ? "After" : "Before"}</div>
              {image?.src ? <img src={resolvePublicSrc(image.src)} alt={image.label ?? "Instagram evidence"} className="aspect-[4/3] w-full object-cover" /> : <div className="aspect-[4/3] bg-[#11100d]/5" />}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 divide-x divide-[#11100d]/10 rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1]">
          {(body?.performanceSignals ?? []).slice(0, 3).map((item) => (
            <div key={item.label} className="p-3 text-center">
              <div className="text-[18px] font-medium">{item.value}</div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#11100d]/42">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (receiptBodyType === "campaignToolkitSystem") {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(body?.proofTiles ?? []).slice(0, 4).map((tile) => (
          <div key={tile.src} className="overflow-hidden rounded-[14px] border border-[#11100d]/10 bg-[#fffaf1]">
            <img src={resolvePublicSrc(tile.src)} alt={tile.label} className="aspect-square w-full object-cover" />
            <div className="px-2.5 py-2 text-[10px] text-[#11100d]/60">{tile.label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (receiptBodyType === "brandSystemMap") {
    const proofTile = body?.proofTiles?.[0];
    const stages = [
      ["Positioning", "skin + laser authority"],
      ["Campaign", "microneedling offer"],
      ["Lead capture", "Meta form + service intent"],
      ["Front desk", "consult owner + follow-up"],
      ["Treatment", "booking + revenue outcome"],
      ["Retention", "membership or reactivation"]
    ];

    return (
      <div className="grid gap-3 md:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-2">
          <div className="overflow-hidden rounded-[16px] border border-[#11100d]/10 bg-[#fffaf1]">
            {proofTile?.src ? (
              <img src={resolvePublicSrc(proofTile.src)} alt={proofTile.label ?? "Campaign system artifact"} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] bg-[#11100d]/5" />
            )}
            <div className="px-3 py-2 text-[10px] text-[#11100d]/58">Campaign and brand artifact</div>
          </div>
          {["Lead record / service intent captured", "Clinic handoff / consult owner named", "Outcome read / booking + revenue"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-[12px] border border-[#11100d]/10 bg-[#fffaf1] px-3 py-2.5 text-[10px] text-[#11100d]/64">
              <Dot color={accent} />{item}
            </div>
          ))}
        </div>
        <div className="rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-3.5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {stages.map(([stage, detail], index) => (
              <div key={stage} className="relative rounded-[13px] border border-[#11100d]/9 bg-[#f7f1e7] p-3">
                <div className="text-[8px] tabular-nums text-[#11100d]/34">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-2 text-[11px] font-medium text-[#11100d]">{stage}</div>
                <div className="mt-1 text-[9px] leading-4 text-[#11100d]/54">{detail}</div>
                {index < stages.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-[#11100d]/24 sm:block">→</span>}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[12px] px-3 py-3 text-[11px] font-medium" style={{ backgroundColor: accent }}>
            Treatment + retention outcomes ↺ campaign learning
          </div>
          <div className="mt-3 text-[10px] leading-4 text-[#11100d]/58">
            Microneedling offer → Meta lead → consult follow-up → booking → treatment → retention path
          </div>
        </div>
      </div>
    );
  }

  const success = ["Booked", "Arrived", "Treated", "Retention"];
  const recovery = ["Day 2 follow-up", "No response", "Day 21 reactivation"];
  return (
    <div className="rounded-[18px] border border-[#11100d]/10 bg-[#fffaf1] p-3.5 sm:p-4">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        <div className="rounded-[12px] bg-[#f7f1e7] p-3 text-center">
          <Label>Source</Label>
          <div className="mt-2 text-[12px]">Meta lead</div>
          <div className="mt-1 text-[9px] text-[#11100d]/48">Microneedling</div>
        </div>
        <span className="text-[#11100d]/24">→</span>
        <div className="rounded-[12px] bg-[#f7f1e7] p-3 text-center">
          <Label>State</Label>
          <div className="mt-2 text-[12px]">New lead</div>
        </div>
        <span className="text-[#11100d]/24">→</span>
        <div className="rounded-[12px] border border-[#11100d]/12 p-3 text-center">
          <Label>Decision</Label>
          <div className="mt-2 text-[12px] font-medium">Booked?</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[14px] border border-[#11100d]/10 p-3" style={{ backgroundColor: "#f3fadf" }}>
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-[#11100d]/44"><Dot color={accent} />Yes path</div>
          <div className="mt-3 space-y-2">
            {success.map((item, index) => (
              <div key={item} className="flex items-center gap-2 text-[11px] text-[#11100d]/72">
                <span className="w-4 text-[#11100d]/28">{index ? "↓" : ""}</span><span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-[#11100d]/8 pt-2 text-[9px] text-[#11100d]/52">Booked status suppresses acquisition nurture.</div>
        </div>
        <div className="rounded-[14px] border border-[#11100d]/10 bg-[#f7f1e7] p-3">
          <div className="text-[9px] uppercase tracking-[0.12em] text-[#11100d]/44">No path</div>
          <div className="mt-3 space-y-2">
            {recovery.map((item, index) => (
              <div key={item} className="flex items-center gap-2 text-[11px] text-[#11100d]/72">
                <span className="w-4 text-[#11100d]/28">{index ? "↓" : ""}</span><span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-[#11100d]/8 pt-2 text-[9px] text-[#11100d]/52">No-show or lost status enters a recovery route.</div>
        </div>
      </div>
    </div>
  );
}
