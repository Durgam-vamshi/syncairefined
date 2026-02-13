import { getAccentVars, getPriceVar } from "../../utils/accent.js";

export function CompactCard({ agent, onHoverEnter, onHoverLeave }) {
  return (
    <div className="compact-card" style={{ ...getAccentVars(agent.color), ...getPriceVar(agent.price) }}
      onMouseEnter={e => onHoverEnter(agent, e)} onMouseLeave={onHoverLeave}>
      <div className="compact-card-icon">
        <span>{agent.icon}</span>
      </div>
      <div className="compact-card-info">
        <div className="compact-card-name">{agent.name}</div>
        <div className="compact-card-tagline">{agent.tagline}</div>
        <div className="compact-card-meta">
          <span className="compact-card-rating">★ {agent.rating}</span>
          <span className="compact-card-users">{agent.users}</span>
          <span className="compact-card-price">{agent.price}</span>
        </div>
      </div>
      {agent.new && <span className="badge-new">NEW</span>}
      {agent.trending && !agent.new && <span className="badge-trending">🔥</span>}
    </div>
  );
}
