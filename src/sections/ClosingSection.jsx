export function ClosingSection({ onOpenAA }) {
  return (
    <div className="closing-section">
      <div className="closing-content">
        <div className="closing-left">
          <div className="closing-title">Ready to Speedrun?</div>
          <div className="closing-subtitle">Stop guessing. Start using.</div>
        </div>
        <div className="closing-right">
          <button className="closing-btn" onClick={() => onOpenAA()}>Get All-Access ($1,000/mo)</button>
          <button className="closing-btn closing-btn-secondary">Contact Us</button>
        </div>
      </div>
    </div>
  );
}
