import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { records } from "../../data/records";
import TopBar from "./TopBar";
import RecordRail from "./RecordRail";
import ActiveCanvas from "./ActiveCanvas";
import ProofRail from "./ProofRail";
import CaseWorkspace from "./CaseWorkspace";
import MobileRecordSelector from "./MobileRecordSelector";
import MobileView from "./MobileView";

const ORIENTATION_HINT_STORAGE_KEY = "undone_seen_orientation_hint";

export default function UndonePortfolioV10() {
  const visibleRecords = useMemo(() => records.filter((record) => record.visible !== false), []);
  const defaultRecord = visibleRecords[0] ?? records[0];
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeRecordSlug, setActiveRecordSlug] = useState(defaultRecord.slug);
  const [activeReceiptId, setActiveReceiptId] = useState(defaultRecord.receipts[0]?.id ?? null);
  const [workspaceRecordSlug, setWorkspaceRecordSlug] = useState(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState("overview");
  const [resetSignal, setResetSignal] = useState(0);
  const [orientationHintVisible, setOrientationHintVisible] = useState(false);
  const orientationHintModeRef = useRef("normal");

  const dismissOrientationHint = useCallback(() => {
    setOrientationHintVisible(false);

    if (orientationHintModeRef.current !== "normal") return;

    try {
      window.localStorage.setItem(ORIENTATION_HINT_STORAGE_KEY, "true");
    } catch {
      // Persistence is optional; in-memory dismissal still works.
    }
  }, []);

  const filteredRecords = useMemo(() => {
    return visibleRecords.filter((record) => {
      const matchesFilter = activeFilter === "all" || record.category === activeFilter;
      return matchesFilter;
    });
  }, [activeFilter, visibleRecords]);

  const visibleCaseNumbers = useMemo(() => {
    return new Map(visibleRecords.map((record, index) => [record.slug, String(index + 1).padStart(2, "0")]));
  }, [visibleRecords]);

  const activeRecord = useMemo(
    () => records.find((record) => record.slug === activeRecordSlug) || defaultRecord,
    [activeRecordSlug, defaultRecord]
  );

  const workspaceRecord = useMemo(
    () => records.find((record) => record.slug === workspaceRecordSlug) || null,
    [workspaceRecordSlug]
  );

  useEffect(() => {
    let hintOverride = null;

    try {
      const hintParam = new URLSearchParams(window.location.search).get("hint");
      if (hintParam === "1") hintOverride = "force-visible";
      if (hintParam === "0") hintOverride = "force-hidden";
    } catch {
      // If URL parsing is unavailable, continue with normal first-run behavior.
    }

    orientationHintModeRef.current = hintOverride ?? "normal";

    if (hintOverride === "force-visible") {
      setOrientationHintVisible(true);
      return undefined;
    }

    if (hintOverride === "force-hidden") {
      setOrientationHintVisible(false);
      return undefined;
    }

    let hasSeenHint = false;

    try {
      hasSeenHint = window.localStorage.getItem(ORIENTATION_HINT_STORAGE_KEY) === "true";
    } catch {
      // If storage is unavailable, show the hint and fail silently.
    }

    if (hasSeenHint) return undefined;

    setOrientationHintVisible(true);
    const timeout = window.setTimeout(dismissOrientationHint, 7000);
    return () => window.clearTimeout(timeout);
  }, [dismissOrientationHint]);

  useEffect(() => {
    if (activeRecord.visible === false) return;

    if (!filteredRecords.some((record) => record.slug === activeRecord.slug)) {
      const next = filteredRecords[0] || defaultRecord;
      setActiveRecordSlug(next.slug);
    }
  }, [activeRecord.slug, activeRecord.visible, defaultRecord, filteredRecords]);

  useEffect(() => {
    if (activeRecord.receipts.length === 0) {
      setActiveReceiptId(null);
      return;
    }
    setActiveReceiptId((currentId) =>
      activeRecord.receipts.some((receipt) => receipt.id === currentId) ? currentId : activeRecord.receipts[0].id
    );
  }, [activeRecord]);

  useEffect(() => {
    function handleKeyDown(event) {
      const activeElement = document.activeElement;
      const tagName = activeElement?.tagName;
      const isTyping =
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        activeElement?.isContentEditable === true;

      if (event.key === "Escape") {
        setWorkspaceRecordSlug(null);
        dismissOrientationHint();
      }

      // Ignore modifier shortcuts to avoid conflicts with browser/system commands.
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && filteredRecords.length > 0 && !isTyping) {
        event.preventDefault();
        const currentIndex = filteredRecords.findIndex((record) => record.slug === activeRecord.slug);
        if (currentIndex === -1) return;
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const next = filteredRecords[(currentIndex + direction + filteredRecords.length) % filteredRecords.length];
        if (next) {
          dismissOrientationHint();
          setActiveRecordSlug(next.slug);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeRecord.slug, dismissOrientationHint, filteredRecords]);

  const openWorkspace = (record) => setWorkspaceRecordSlug(record.slug);

  function resetPortfolioHome() {
    const homeRecord = visibleRecords[0] ?? defaultRecord ?? records[0];
    if (!homeRecord) return;

    setActiveFilter("all");
    setActiveRecordSlug(homeRecord.slug);
    setActiveReceiptId(homeRecord.receipts[0]?.id ?? null);
    setWorkspaceRecordSlug(null);
    setMobileSheetOpen(false);
    setMobileTab("overview");
    setResetSignal((value) => value + 1);
  }

  // Derive the receipt object for child components
  const activeReceipt = useMemo(
    () => activeRecord.receipts.find((r) => r.id === activeReceiptId) ?? null,
    [activeRecord, activeReceiptId]
  );

  function handleSelectReceipt(id) {
    setActiveReceiptId(id);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0b09] font-sans text-[#11100d]">
      <div className="mx-auto min-h-screen max-w-[1720px] overflow-x-hidden bg-[#f7f1e7] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none fixed inset-0 opacity-[0.45] [background-image:radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.85),transparent_28%),linear-gradient(rgba(17,16,13,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(17,16,13,0.028)_1px,transparent_1px)] [background-size:auto,38px_38px,38px_38px]" />
        <div className="relative z-10">
          <TopBar onHomeReset={resetPortfolioHome} />

          {/* Mobile layout */}
          <MobileRecordSelector
            recordsList={filteredRecords}
            activeRecord={activeRecord}
            setActiveRecord={(record) => setActiveRecordSlug(record.slug)}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            caseNumbers={visibleCaseNumbers}
            isOpen={mobileSheetOpen}
            setIsOpen={setMobileSheetOpen}
            orientationHintVisible={orientationHintVisible}
            onOrientationDismiss={dismissOrientationHint}
          />
          <MobileView
            record={activeRecord}
            mode="overview"
            openWorkspace={openWorkspace}
            activeReceipt={activeReceipt}
            onSelectReceipt={handleSelectReceipt}
            mobileTab={mobileTab}
            setMobileTab={setMobileTab}
            resetSignal={resetSignal}
            onOrientationDismiss={dismissOrientationHint}
          />

          {/* Desktop layout */}
          <div className="hidden lg:grid lg:h-[calc(100vh-73px)] lg:grid-cols-[320px_minmax(0,1fr)_360px] lg:overflow-hidden">
            <RecordRail
              recordsList={filteredRecords}
              activeRecord={activeRecord}
              setActiveRecord={(record) => setActiveRecordSlug(record.slug)}
              openWorkspace={openWorkspace}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              caseNumbers={visibleCaseNumbers}
              orientationHintVisible={orientationHintVisible}
              onOrientationDismiss={dismissOrientationHint}
            />
            <ActiveCanvas record={activeRecord} mode="overview" openWorkspace={openWorkspace} />
            <ProofRail
              record={activeRecord}
              activeReceipt={activeReceipt}
              onSelectReceipt={handleSelectReceipt}
              resetSignal={resetSignal}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {workspaceRecord ? (
          <CaseWorkspace
            workspace={workspaceRecord}
            closeWorkspace={() => setWorkspaceRecordSlug(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
