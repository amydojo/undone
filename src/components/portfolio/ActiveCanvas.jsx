import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import MetricPill from "../ui/MetricPill";
import SystemPath from "./SystemPath";
import ProfileStrip from "./ProfileStrip";
import { profile } from "../../data/profile";

export default function ActiveCanvas({ record, mode, openWorkspace }) {
  return (
    <main className="min-h-[calc(100vh-73px)] overflow-hidden bg-[#f7f1e7] p-4 lg:p-6">
      <section className="grid min-h-full grid-rows-[auto_auto_1fr_auto] rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/44 p-4 shadow-[0_30px_120px_rgba(17,16,13,0.06)] lg:p-8">

        {/* Identity hero */}
        <div className="mb-6 rounded-[22px] border border-[#11100d]/8 bg-[#f7f1e7]/60 p-5">
          <div className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#11100d]/36">Amy Do</div>
          <p className="mb-2 text-[15px] font-medium leading-6 tracking-[-0.015em] text-[#11100d]">{profile.positioning}</p>
          <p className="max-w-2xl text-sm leading-6 text-[#11100d]/58">{profile.oneSentence}</p>
        </div>

        {/* Active case header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-[#11100d]/44">
            <Layers className="h-3.5 w-3.5" />
            <span>Currently inspecting</span>
            <span className="hidden h-px w-8 bg-[#11100d]/14 sm:block" />
            <span className="hidden sm:block">active case file</span>
          </div>
          <button
            type="button"
            aria-label={`Open ${record.title} case file`}
            onClick={() => openWorkspace(record)}
            className="flex items-center gap-2 rounded-full bg-[#11100d] px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#f7f1e7] transition hover:scale-[1.02]"
          >
            open case file <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${record.slug}-${mode}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 py-10 xl:grid-cols-[1fr_360px] xl:items-end"
          >
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {[record.category, record.timeline, record.status].map((item) => (
                  <span key={item} className="rounded-full border border-[#11100d]/10 bg-[#f7f1e7]/72 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#11100d]/44">{item}</span>
                ))}
              </div>
              <h1 className="max-w-4xl text-[36px] font-normal leading-[1.0] tracking-[-0.04em] text-[#11100d] sm:text-[48px] xl:text-[70px]">
                {mode === "proof" ? record.title : record.thesis}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 tracking-[-0.012em] text-[#11100d]/64">{mode === "proof" ? record.oneLine : record.system}</p>
            </div>

            <div className="grid gap-3">
              {record.metrics.map((metric) => <MetricPill key={metric.label} metric={metric} />)}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <SystemPath record={record} />
          <div className="rounded-[28px] bg-[#11100d] p-5 text-[#f7f1e7]">
            <div className="mb-6 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#f7f1e7]/40">
              <span>Decision logic</span>
              <AccentDot record={record} size="h-2.5 w-2.5" />
            </div>
            <div className="space-y-4">
              {record.decisions.slice(0, 2).map((decision) => (
                <div key={decision.label}>
                  <div className="mb-1 text-[9px] uppercase tracking-[0.16em] text-[#f7f1e7]/32">{decision.label}</div>
                  <p className="text-sm leading-6 text-[#f7f1e7]/68">{decision.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProfileStrip />
      </section>
    </main>
  );
}
