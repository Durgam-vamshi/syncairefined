import { getAccentVars } from "../utils/accent.js";

export function HoverDetail({ agent, position, visible }) {
  if (!visible || !agent) return null;
  const accentVars = getAccentVars(agent.color);
  return (
    <div className="hover-detail" style={{ ...accentVars, top: position.top, left: position.left, opacity: visible ? 1 : 0 }}>
      <div className="hover-detail-header">
        <span className="hover-detail-icon">{agent.icon}</span>
        <div>
          <div className="hover-detail-name">{agent.name}</div>
          <div className="hover-detail-author">by {agent.author}</div>
        </div>
      </div>
      <div className="hover-detail-solves">{agent.solves}</div>
      <div className="hover-detail-section">
        <div className="hover-detail-label">Capabilities</div>
        <div className="hover-detail-pills">

          {agent.capabilities.map(c => (
            <span key={c} className="hover-detail-pill">{c}</span>
          ))}
          
        </div>
      </div>
      <div className="hover-detail-section">
        <div className="hover-detail-label">Best for</div>
        <div className="hover-detail-usecases">
          {agent.useCases.map(u => <div key={u} className="hover-detail-usecase">→ {u}</div>)}
        </div>
      </div>
      <div className="hover-detail-section">
        <div className="hover-detail-label">Pairs with</div>
        <div className="hover-detail-pairs">
          {agent.pairsWith.map(p => <span key={p} className="hover-detail-pair">{p}</span>)}
        </div>
      </div>
    </div>
  );
}
