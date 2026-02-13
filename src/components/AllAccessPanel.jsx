import { AGENTS, INTEGRATIONS, STACKS } from "../data";

export function AllAccessPanel({ open, onClose, contextStack, enabled, onEnable }) {
  if (!open) return null;
  return (
    <>
      <div className="aa-overlay" onClick={onClose} />
      <div className="aa-panel">
        <div className="aa-panel-inner">
          <div className="aa-panel-hdr">
            <div className="aa-panel-hdr-l">
              <div className="aa-panel-icn">◆</div>
              <div>
                <div className="aa-panel-ttl">All-Access</div>
                <div className="aa-panel-sts">
                  {enabled
                    ? <span className="aa-sts-on"><span className="aa-dot aa-dot-on aa-dot-inline" />Enabled</span>
                    : <span className="aa-sts-off"><span className="aa-dot aa-dot-off aa-dot-inline" />Not enabled</span>}
                </div>
              </div>
            </div>
            <button className="aa-close" onClick={onClose}>✕</button>
          </div>
          {contextStack && !enabled && (
            <div className="aa-ctx">
              <span className="aa-ctx-icn">{contextStack.icon}</span>
              <span>Executing <strong>{contextStack.name}</strong> requires All-Access.</span>
            </div>
          )}
          <div className="aa-sec">
            <div className="aa-sec-lbl">Execution capabilities</div>
            <div className="aa-caps">
              {[
                ["Execute reference stacks", "Run pre-configured stacks without full custom configuration"],
                ["Default integrations", "Apply operational assumptions and reference integrations automatically"],
                ["Parallel execution", "Run agents and tools concurrently across stacks"],
                ["Immediate assembly", "Assemble and execute capability stacks without setup delay"],
              ].map(([t, d]) => (
                <div className="aa-cap" key={t}>
                  <span className="aa-cap-arr">▸</span>
                  <div><div className="aa-cap-t">{t}</div><div className="aa-cap-d">{d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="aa-cost">
            <span className="aa-cost-amt">$1,000</span>
            <span className="aa-cost-per">/ month</span>
            <div className="aa-cost-note">Fixed, predictable monthly cost. No per-execution fees.</div>
          </div>
          <div className="aa-acts">
            {enabled ? (
              <div className="aa-en-state">
                <div className="aa-en-badge">◆ All-Access enabled</div>
                <div className="aa-en-msg">Full execution permissions are active across all reference stacks and agents.</div>
              </div>
            ) : (
              <button className="aa-pri-btn" onClick={onEnable}><span className="aa-pri-btn-icon">◆</span> Unlock All-Access</button>
            )}
            <button className="aa-sec-btn" onClick={onClose}>{enabled ? "Return to browsing" : "View enabled capabilities"}</button>
          </div>
          <div className="aa-panel-ft">
            <div className="aa-ft-stat"><span className="aa-ft-val">{STACKS.length}</span><span className="aa-ft-lbl">Reference stacks</span></div>
            <div className="aa-ft-stat"><span className="aa-ft-val">{AGENTS.length}</span><span className="aa-ft-lbl">Agents included</span></div>
            <div className="aa-ft-stat"><span className="aa-ft-val">{INTEGRATIONS.length}</span><span className="aa-ft-lbl">Default integrations</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
