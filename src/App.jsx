import React from "react";
import UndonePortfolioV10 from "./components/portfolio/UndonePortfolio";
import MensWellnessLeadPageSprint from "./components/services/MensWellnessLeadPageSprint";

export default function App() {
  if (window.location.pathname.replace(/\/+$/, "").endsWith("/mens-wellness-lead-page-sprint")) {
    return <MensWellnessLeadPageSprint />;
  }

  return <UndonePortfolioV10 />;
}
