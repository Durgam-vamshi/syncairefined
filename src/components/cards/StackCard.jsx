import { AGENTS } from "../../data";
import { getAccentVars } from "../../utils/accent.js";

export function StackCard({ stack, aaEnabled, onAAClick }) {
  const stackAgents = stack.agents.map(id => AGENTS.find(a => a.id === id)).filter(Boolean);
  return (
    <div className="stack-card" style={getAccentVars(stack.color)}>
      <div className="stack-card-header">
        <div className="stack-card-icon">
          <span>{stack.icon}</span>
        </div>
        <div className="stack-card-meta">
          {stack.allAccess && <span className="aa-badge">◆ All-Access</span>}
          <span className="stack-card-count">{stack.agents.length} agents</span>
        </div>
      </div>
      <div className="stack-card-name">{stack.name}</div>
      <div className="stack-card-desc">{stack.description}</div>
      <div className="stack-card-solves">{stack.solves}</div>
      <div className="stack-card-agents">
        {stackAgents.map(a => (
          <span key={a.id} className="stack-agent-pill" style={getAccentVars(a.color)}>
            {a.icon} {a.name}
          </span>
        ))}
      </div>
      <div className="stack-card-usecases">
        {stack.useCases.map(u => <span key={u} className="stack-usecase">→ {u}</span>)}
      </div>
      <div className="stack-card-footer">
        <span className="stack-card-users">{stack.users} using this stack</span>
        {stack.allAccess && onAAClick && (
          <button className={`aa-run ${aaEnabled ? "aa-run-active" : ""}`}
            onClick={e => { e.stopPropagation(); onAAClick(stack); }}>
            <span className="aa-run-diamond">◆</span>
            {aaEnabled ? "Execute" : "Run with All-Access"}
          </button>
        )}
      </div>
    </div>
  );
}
