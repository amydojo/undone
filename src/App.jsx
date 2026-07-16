import React from "react";
import UndonePortfolioV10 from "./components/portfolio/UndonePortfolio";
import MensWellnessLeadPageSprint from "./components/services/MensWellnessLeadPageSprint";
import { installTypeArchiveRecord } from "./data/typeArchiveRecord";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname.endsWith("/mens-wellness-lead-page-sprint")) {
    return <MensWellnessLeadPageSprint />;
  }

  let prioritizeTypeArchive = false;

  try {
    prioritizeTypeArchive = new URLSearchParams(window.location.search).get("case") === "type-archive";
  } catch {
    prioritizeTypeArchive = false;
  }

  installTypeArchiveRecord({ prioritize: prioritizeTypeArchive });
  return <UndonePortfolioV10 />;
}
