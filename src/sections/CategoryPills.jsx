const CATEGORIES = ["All", "Research", "Development", "Data", "Creative", "Productivity", "Security", "Marketing", "Finance", "Sales", "Education", "DevOps"];

export function CategoryPills() {
  return (
    <div className="category-pills">
      {CATEGORIES.map(c => (
        <div key={c} className="category-pill">{c}</div>
      ))}
    </div>
  );
}
