import { SECTION_META } from "../data";

export function Section({ sectionKey, children, variant = "default" }) {
  const meta = SECTION_META[sectionKey] || { headline: sectionKey, rationale: "" };
  return (
    <div className={`section section-${variant}`}>
      <div className="section-header">
        <div>
          <h2 className="section-title">{meta.headline}</h2>
          <p className="section-rationale">{meta.rationale}</p>
        </div>
        <button className="section-see-all">See all →</button>
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
}
