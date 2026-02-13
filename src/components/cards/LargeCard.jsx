import { getAccentVars, getPriceVar } from "../../utils/accent.js";

export function LargeCard({ agent, onHoverEnter, onHoverLeave }) {
  return (
    <div className="large-card" style={{ ...getAccentVars(agent.color), ...getPriceVar(agent.price) }}
      onMouseEnter={e => onHoverEnter(agent, e)} onMouseLeave={onHoverLeave}>
      <div className="large-card-glow" />
      <div className="large-card-content">
        <div className="large-card-top">
          <div className="large-card-icon">
            <span>{agent.icon}</span>
          </div>
          <div className="large-card-badges">
            {agent.new && <span className="badge-new">NEW</span>}
            {agent.trending && <span className="badge-trending-lg">TRENDING</span>}
            <span className="badge-featured">⭐ FEATURED</span>
          </div>
        </div>
        <div className="large-card-name">{agent.name}</div>
        <div className="large-card-tagline">{agent.tagline}</div>
        <div className="large-card-solves">{agent.solves}</div>
        <div className="large-card-capabilities">
          {agent.capabilities.map(c => (
            <span key={c} className="capability-chip">{c}</span>
          ))}
        </div>
        <div className="large-card-meta">
          <span className="large-card-category">{agent.category}</span>
          <span className="large-card-rating">★ {agent.rating}</span>
          <span className="large-card-users">{agent.users} users</span>
          <span className="large-card-price">{agent.price}</span>
        </div>
        <div className="large-card-author">by {agent.author}</div>
        <button className="large-card-btn">Explore Agent →</button>
      </div>
    </div>
  );
}
