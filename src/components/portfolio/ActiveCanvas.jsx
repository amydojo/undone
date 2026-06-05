import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import MetricPill from "../ui/MetricPill";
import ProfileStrip from "./ProfileStrip";
import OverviewArtifact from "./OverviewArtifact";

const DECODER_LINES = {
  mirror: 'mood, sleep, clarity, and context → readable product states.',
  'smooth-md-growth-os': 'scattered clinic marketing → reusable service, CRM, and campaign logic.',
  'meta-airtable-dashboard': 'ad spend → booking behavior → revenue-informed decisions.',
  'snip-provider-pipeline': 'provider records → validated profiles → handoff folders.',
  'guardrail-hr': '22 questions. one risk score. clearer next steps.',
  'multi-brand-retention': 'brand, service, and status → the right follow-up path.',
};

export default function ActiveCanvas({ record, mode, openWorkspace }) {
  return (
    <main className="min-h-[calc(100vh-73px)] overflow-x-hidden bg-[#f7f1e7] p-4 lg:p-6">
      <section className="w-full min-w-0 overflow-hidden rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/44 shadow-[0_30px_120px_rgba(17,16,13,0.06)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${record.slug}-${mode}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── BEAT 01 · HERO ──────────────────────────────────── */}
            <div className="flex min-h-[54vh] flex-col px-5 py-6 xl:min-h-[62vh] xl:px-10 xl:py-8">
              <div className="flex items-center justify-between gap-4">
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
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#11100d] px-5 text-[10px] uppercase tracking-[0.16em] text-[#f7f1e7] transition hover:scale-[1.02]"
                >
                  open case file <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex-1" />

              <div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/40">
                  {[record.category, record.timeline, record.status].map((item, index) => (
                    <React.Fragment key={item}>
                      {index > 0 ? <span className="h-1 w-1 rounded-full bg-[#11100d]/18" aria-hidden="true" /> : null}
                      <span>{item}</span>
                    </React.Fragment>
                  ))}
                </div>
                <h1 className="mt-5 w-full max-w-[880px] text-[44px] font-normal leading-[1.00] tracking-[-0.035em] text-[#11100d] [text-wrap:balance] lg:text-[56px] xl:text-[72px]">
                  {record.headline ?? record.title}
                </h1>
                {DECODER_LINES[record.slug] && (
                  <p className="mt-4 max-w-[640px] text-[22px] leading-[1.3] tracking-[-0.02em] text-[#11100d]/76 lg:text-[26px]">
                    {DECODER_LINES[record.slug]}
                  </p>
                )}
                <p className="mt-3 max-w-[500px] text-[14px] leading-[1.6] text-[#11100d]/38">
                  {record.oneLine}
                </p>
              </div>
            </div>

            {/* ── BEAT 02 · PROOF LEDGER ──────────────────────────── */}
            <div className="border-t border-[#11100d]/8 px-5 pb-12 pt-10 xl:px-10 xl:pb-16 xl:pt-14">
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">Proof signals</div>
              <div className="mt-6 grid grid-cols-3 divide-x divide-[#11100d]/10">
                {record.metrics.map((metric) => (
                  <MetricPill key={metric.label} metric={metric} />
                ))}
              </div>
            </div>

            {/* ── BEAT 03 · SYSTEM OBJECT ─────────────────────────── */}
            <div className="border-t border-[#11100d]/8 px-5 pb-12 pt-10 xl:px-10 xl:pb-16 xl:pt-14">
              <div className="mb-7 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">System object</div>
              <OverviewArtifact record={record} />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="border-t border-[#11100d]/8 px-5 py-5 xl:px-10 xl:py-6">
          <ProfileStrip />
        </div>
      </section>
    </main>
  );
}
