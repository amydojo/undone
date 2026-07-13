import React from "react";
import { Analytics } from "@vercel/analytics/react";
import UndonePortfolioV10 from "./components/portfolio/UndonePortfolio";
import MensWellnessLeadPageSprint from "./components/services/MensWellnessLeadPageSprint";

export default function App() {
  if (window.location.pathname.replace(/\/+$/, "").endsWith("/mens-wellness-lead-page-sprint")) {
    return (
      <>
        <MensWellnessLeadPageSprint />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <UndonePortfolioV10 />
      <Analytics />
    </>
  );
}
