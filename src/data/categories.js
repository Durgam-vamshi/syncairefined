import { AGENTS } from "./agents.js";

export const CATEGORY_META = [
  { key: "All", label: "All Agents", icon: "🧭", color: "#7C6CFF", desc: "Full catalog across every workflow and team." },
  { key: "Research", label: "Research", icon: "🔬", color: "#6C5CE7", desc: "Synthesis, citations, and signal discovery." },
  { key: "Development", label: "Development", icon: "⚡", color: "#00B894", desc: "Build, refactor, test, and ship faster." },
  { key: "Data", label: "Data", icon: "📊", color: "#E17055", desc: "Transform, query, and visualize data." },
  { key: "Creative", label: "Creative", icon: "🎨", color: "#FD79A8", desc: "Generate assets, visuals, and content." },
  { key: "Productivity", label: "Productivity", icon: "📋", color: "#FDCB6E", desc: "Automate the work that slows teams down." },
  { key: "Security", label: "Security", icon: "🛡️", color: "#D63031", desc: "Compliance, scanning, and protection workflows." },
  { key: "Marketing", label: "Marketing", icon: "✍️", color: "#FF9FF3", desc: "Content, campaigns, and distribution." },
  { key: "Finance", label: "Finance", icon: "💹", color: "#2ED573", desc: "Portfolio analysis and market signals." },
  { key: "Sales", label: "Sales", icon: "📈", color: "#FF6B6B", desc: "Prospecting, scoring, and outreach." },
  { key: "Education", label: "Education", icon: "🎓", color: "#1DD1A1", desc: "Learning paths and knowledge checks." },
  { key: "DevOps", label: "DevOps", icon: "☁️", color: "#5F27CD", desc: "Infra automation and ops monitoring." },
];

export const CATEGORY_CARDS = CATEGORY_META.map((category) => ({
  ...category,
  count: category.key === "All"
    ? AGENTS.length
    : AGENTS.filter(agent => agent.category === category.key).length,
}));
