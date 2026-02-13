import { getAccentVars } from "../../utils/accent.js";

export function CategoryCard({ category }) {
  return (
    <div className="category-card" style={getAccentVars(category.color)}>
      <div className="category-card-top">
        <span className="category-card-icon">{category.icon}</span>
        <span className="category-card-count">{category.count} agents</span>
      </div>
      <div className="category-card-title">{category.label}</div>
      <div className="category-card-desc">{category.desc}</div>
      <div className="category-card-cta">Browse →</div>
    </div>
  );
}
