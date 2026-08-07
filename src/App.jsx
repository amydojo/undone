import React from "react";
import UndonePortfolioV10 from "./components/portfolio/UndonePortfolio";
import MensWellnessLeadPageSprint from "./components/services/MensWellnessLeadPageSprint";
import { installTypeArchiveRecord } from "./data/typeArchiveRecord";
import { installInterfaceBehaviorLabPolish } from "./data/interfaceBehaviorLabPolish";

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

  installTypeArchiveRecord({ prioritize: initialWorkspaceSlug === "type-archive" });
  installInterfaceBehaviorLabPolish();

  if (isLegacyTypeArchiveRoute) {
    window.history.replaceState(null, "", "/?case=type-archive");
  }

  return <UndonePortfolioV10 initialWorkspaceSlug={initialWorkspaceSlug} />;
}
