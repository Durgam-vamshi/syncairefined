export function HeroSection({ aaEnabled, onOpenAA }) {
  return (
    <div className="hero-section">
      <div className="hero-glow" /><div className="hero-glow-2" />
      <div className="hero-aa-glow" />
      <div className="hero-content-wrap">
        <div className="hero-left">
          <div className="hero-title">Speedrun Your AI Transformation.</div>
          <div className="hero-subtitle">Converge organizational capabilities with agentic possibilities. Deployment begins on Day 1.</div>
          <div className="hero-narrative">
            Most enterprises spend months in discovery phases trying to predict their needs. We skip the speculation. We converge your existing organizational capabilities with agentic possibilities immediately.
          </div>
          <div className="hero-actions">
            <button className="hero-cta" onClick={() => onOpenAA()}>Start All-Access ($1,000/mo)</button>
            <button className="hero-cta hero-cta-secondary">Book a Briefing</button>
            <div className="hero-status-badge">[KNOWLEDGE_TRANSFER: ACTIVE_PROTOCOL]</div>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-value">284</div><div className="hero-stat-label">Agents</div></div>
            <div className="hero-stat"><div className="hero-stat-value">67</div><div className="hero-stat-label">Stacks</div></div>
            <div className="hero-stat"><div className="hero-stat-value">42</div><div className="hero-stat-label">Integrations</div></div>
            <div className="hero-stat"><div className="hero-stat-value">128k</div><div className="hero-stat-label">Active Users</div></div>
          </div>
        </div>
        <div className="hero-aa-card" onClick={() => onOpenAA()}>
          <div className="hero-aa-card-glow" />
          <div className="hero-aa-icon">◆</div>
          <div className="hero-aa-label">All-Access</div>
          <div className="hero-aa-desc">{aaEnabled ? "All-Access is active across the full library and reference stacks." : "Immediate access to the entire library. Start using now, learn what fits, then decide what to harden."}</div>
          <div className="hero-aa-price">{aaEnabled ? "Active" : "$1,000 /mo"}</div>
          <div className="hero-aa-cta">{aaEnabled ? "◆ Enabled" : "Enable All-Access →"}</div>
        </div>
      </div>
    </div>
  );
}
