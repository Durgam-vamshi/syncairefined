import React from "react";
import { createRoot } from "react-dom/client";
import AgentPlaystore from "./AgentPlaystore.jsx";
import WorkshopDeck from "./WorkshopDeck.jsx";

const root = createRoot(document.getElementById("root"));
const params = new URLSearchParams(window.location.search);
const deckView = params.get("deck");

if (deckView === "workshop") {
  document.body.classList.add("deck-mode");
} else {
  document.body.classList.remove("deck-mode");
}

root.render(deckView === "workshop" ? <WorkshopDeck /> : <AgentPlaystore />);
