import { getAccentVars, getPriceVar } from "../../utils/accent.js";

export function MediumCard({ agent, onHoverEnter, onHoverLeave }) {
  return (
    <div className="medium-card" style={{ ...getAccentVars(agent.color), ...getPriceVar(agent.price) }}
      onMouseEnter={e => onHoverEnter(agent, e)} onMouseLeave={onHoverLeave}>
      <div className="medium-card-header">
        <div className="medium-card-icon">
          <span>{agent.icon}</span>
        </div>
        <div className="medium-card-badges">
          {agent.new && <span className="badge-new">NEW</span>}
          {agent.trending && <span className="badge-trending">🔥</span>}
        </div>
      </div>
      <div className="medium-card-name">{agent.name}</div>
      <div className="medium-card-tagline">{agent.tagline}</div>
      <div className="medium-card-capabilities">
        {agent.capabilities.slice(0, 3).map(c => (
          <span key={c} className="capability-dot">{c}</span>
        ))}
      </div>
      <div className="medium-card-footer">
        <span className="medium-card-category">{agent.category}</span>
        <span className="medium-card-rating">★ {agent.rating}</span>
        <span className="medium-card-price">{agent.price}</span>
      </div>
      <div className="medium-card-author">by {agent.author}</div>
    </div>
  );
}
