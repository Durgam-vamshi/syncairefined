import { getAccentVars } from "../../utils/accent.js";

export function IntegrationCard({ integration }) {
  return (
    <div className="integration-card" style={getAccentVars(integration.color)}>
      <div className="integration-card-icon">
        <span>{integration.icon}</span>
      </div>
      <div className="integration-card-name">{integration.name}</div>
      <div className="integration-card-count">{integration.agents} agents</div>
    </div>
  );
}
