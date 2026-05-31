import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import AccentDot from "../ui/AccentDot";
import MetricPill from "../ui/MetricPill";
import SystemPath from "./SystemPath";
import ProfileStrip from "./ProfileStrip";
import OverviewArtifact from "./OverviewArtifact";

export default function ActiveCanvas({ record, mode, openWorkspace }) {
  const overviewDecisions = record.decisions.filter((decision) => ["constraint", "move"].includes(decision.label));

  return (
    <main className="min-h-[calc(100vh-73px)] overflow-hidden bg-[#f7f1e7] p-4 lg:p-6">
      <section className="min-h-full rounded-[28px] border border-[#11100d]/10 bg-[#fffaf1]/44 px-5 py-6 shadow-[0_30px_120px_rgba(17,16,13,0.06)] lg:px-10 lg:py-10">
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
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#11100d] px-5 text-[10px] uppercase tracking-[0.16em] text-[#f7f1e7] transition hover:scale-[1.02]"
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
            className="space-y-8 py-8 lg:space-y-12 lg:py-10"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-[#11100d]/42">
                {[record.category, record.timeline, record.status].map((item, index) => (
                  <React.Fragment key={item}>
                    {index > 0 ? <span className="h-1 w-1 rounded-full bg-[#11100d]/18" aria-hidden="true" /> : null}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </div>
              <h1 className="mt-4 max-w-5xl text-[40px] font-normal leading-[1.02] tracking-[-0.04em] text-[#11100d] xl:text-[72px]">
                {mode === "proof" ? record.title : record.thesis}
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-[1.65] text-[#11100d]/66">{mode === "proof" ? record.oneLine : record.system}</p>
            </div>

            <OverviewArtifact record={record} onOpenWorkspace={openWorkspace} />

            <section>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">Proof signals</div>
              <div className="mt-3 grid overflow-hidden rounded-[20px] border border-[#11100d]/10 bg-[#fffaf1] md:grid-cols-3 md:divide-x md:divide-[#11100d]/10">
                {record.metrics.map((metric) => <MetricPill key={metric.label} metric={metric} className="border-b border-[#11100d]/10 last:border-b-0 md:border-b-0" />)}
              </div>
            </section>

            <section className="grid gap-8 xl:grid-cols-[minmax(0,620px)_1fr] xl:items-start">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#11100d]/38">System summary</div>
                <p className="mt-4 max-w-[620px] text-base leading-[1.65] text-[#11100d]/68">{record.signal}</p>
                <p className="mt-4 max-w-[620px] text-base leading-[1.65] text-[#11100d]/60">{record.system}</p>
              </div>
              <SystemPath record={record} className="xl:pt-1" />
            </section>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end">
              <div />
              <div className="rounded-[24px] bg-[#11100d] p-5 text-[#f7f1e7] lg:p-6">
                <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-[#f7f1e7]/40">
                  <span>Decision logic</span>
                  <AccentDot record={record} size="h-2.5 w-2.5" />
                </div>
                <div className="space-y-4">
                  {overviewDecisions.map((decision) => (
                    <div key={decision.label}>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/34">{decision.label}</div>
                      <p className="mt-2 text-[14px] leading-6 text-[#f7f1e7]/72">{decision.body}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openWorkspace(record)}
                  className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#f7f1e7]/62 transition hover:text-[#f7f1e7]"
                >
                  view full decision logic
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <ProfileStrip className="mt-8 lg:mt-12" />
      </section>
    </main>
  );
}
