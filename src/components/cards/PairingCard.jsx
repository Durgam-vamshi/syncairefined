import { getAccentVars } from "../../utils/accent.js";

export function PairingCard({ agent1, agent2 }) {
  return (
    <div className="pairing-card">
      <div className="pairing-agents">
        <div className="pairing-agent">
          <span className="pairing-icon" style={getAccentVars(agent1.color)}>{agent1.icon}</span>
          <span className="pairing-name">{agent1.name}</span>
        </div>
        <span className="pairing-plus">+</span>
        <div className="pairing-agent">
          <span className="pairing-icon" style={getAccentVars(agent2.color)}>{agent2.icon}</span>
          <span className="pairing-name">{agent2.name}</span>
        </div>
      </div>
      <div className="pairing-why">
        {agent1.name.split(" ")[0]} handles {agent1.capabilities[0].toLowerCase()}, {agent2.name.split(" ")[0]} handles {agent2.capabilities[0].toLowerCase()}
      </div>
    </div>
  );
}
