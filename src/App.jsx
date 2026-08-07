import React from "react";
import UndonePortfolioV10 from "./components/portfolio/UndonePortfolio";
import MensWellnessLeadPageSprint from "./components/services/MensWellnessLeadPageSprint";
import { installInterfaceBehaviorLabPolish } from "./data/interfaceBehaviorLabPolish";
import { installTypeArchiveRecord } from "./data/typeArchiveRecord";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname.endsWith("/mens-wellness-lead-page-sprint")) {
    return <MensWellnessLeadPageSprint />;
  }

  let initialWorkspaceSlug = null;

  try {
    initialWorkspaceSlug = new URLSearchParams(window.location.search).get("case");
  } catch {
    initialWorkspaceSlug = null;
  }

  const isLegacyTypeArchiveRoute = pathname.endsWith("/work/type-archive");
  if (isLegacyTypeArchiveRoute) initialWorkspaceSlug = "type-archive";

  installInterfaceBehaviorLabPolish();
  installTypeArchiveRecord({ prioritize: initialWorkspaceSlug === "type-archive" });

  if (isLegacyTypeArchiveRoute) {
    window.history.replaceState(null, "", "/?case=type-archive");
  }

  return <UndonePortfolioV10 initialWorkspaceSlug={initialWorkspaceSlug} />;
}
