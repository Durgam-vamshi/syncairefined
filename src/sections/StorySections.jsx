import { useEffect, useMemo, useRef, useState } from "react";
import { AGENTS, STACKS } from "../data";
import { CompactCard, StackCard } from "../components/cards";

export function StorySections({ onEnter, onLeave, aaEnabled, onStackAA, storySectionRefs }) {
  const stackExample = STACKS.find(s => s.name === "Full-Stack Dev Kit") || STACKS[0];
  const experimentalAgents = AGENTS.filter(a => a.new).slice(0, 3);
  const mostPopular = [...AGENTS].sort((a, b) => parseFloat(b.users) - parseFloat(a.users)).slice(0, 3);
  const enterpriseReadyAgents = [...AGENTS].filter(a => a.rating >= 4.7).slice(0, 3);
  const stabilizeAgents = AGENTS.filter(a => ["Security", "DevOps", "Data"].includes(a.category)).slice(0, 6);
  const liveUsageEvents = useMemo(() => ([
    "[DEPLOYED] ResearchBot Pro",
    "[ACTIVE] 45 users",
    "[FLAGGED] DataForge",
    "[OPTIMIZED] Scheduler AI",
    "[DEPLOYED] CodeWeaver",
    "[QUEUED] TestPilot",
    "[ACTIVE] MailCraft",
    "[FLAGGED] InfraWatch",
    "[DEPLOYED] ContentEngine",
    "[ACTIVE] MeetingMind",
    "[OPTIMIZED] QueryMaster",
    "[QUEUED] SecuritySentinel",
  ]), []);
  const crateAgents = useMemo(() => {
    const prioritized = AGENTS.filter(a => a.new || a.trending);
    const seen = new Set();
    const combined = [...prioritized, ...AGENTS].filter((agent) => {
      if (seen.has(agent.id)) return false;
      seen.add(agent.id);
      return true;
    });
    return combined.slice(0, 20);
  }, []);
  const stackTabs = useMemo(() => {
    const findStack = (name) => STACKS.find(s => s.name === name);
    return [
      { key: "OPS", label: "OPS", stack: findStack("Data Pipeline") || findStack("Security Suite") },
      { key: "DEV", label: "DEV", stack: findStack("Full-Stack Dev Kit") },
      { key: "CREATIVE", label: "CREATIVE", stack: findStack("Content Studio") },
      { key: "SALES", label: "SALES", stack: findStack("Sales Machine") },
    ].filter(tab => tab.stack);
  }, []);
  const [activeStackTab, setActiveStackTab] = useState(0);
  const activeStack = stackTabs[activeStackTab]?.stack;
  useEffect(() => {
    if (!stackTabs.length) return undefined;
    const intervalId = setInterval(() => {
      setActiveStackTab(prev => (prev + 1) % stackTabs.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [stackTabs.length]);

  const crateRef = useRef(null);
  const crateDragging = useRef(false);
  const crateStartX = useRef(0);
  const crateScrollLeft = useRef(0);
  const handleCratePointerDown = (event) => {
    if (!crateRef.current) return;
    crateDragging.current = true;
    crateStartX.current = event.clientX;
    crateScrollLeft.current = crateRef.current.scrollLeft;
    crateRef.current.classList.add("is-dragging");
    if (crateRef.current.setPointerCapture) {
      crateRef.current.setPointerCapture(event.pointerId);
    }
  };
  const handleCratePointerMove = (event) => {
    if (!crateDragging.current || !crateRef.current) return;
    event.preventDefault();
    const walk = event.clientX - crateStartX.current;
    crateRef.current.scrollLeft = crateScrollLeft.current - walk;
  };
  const handleCratePointerEnd = (event) => {
    if (!crateRef.current || !crateDragging.current) return;
    crateDragging.current = false;
    crateRef.current.classList.remove("is-dragging");
    if (crateRef.current.releasePointerCapture) {
      crateRef.current.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="narrative-sections">
      <div className="story-section story-start" ref={el => (storySectionRefs.current[0] = el)} data-seen="true">
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">Access Over Abstraction</div>
              <div className="narrative-title">Get the complete toolkit on Day 1, not a roadmap.</div>
              <div className="narrative-body">
                You cannot articulate your requirements in a meeting room. You find them in production. That is why we don't start with a roadmap; we start with access. We give you the keys to the entire library immediately so you can see what actually fits.
              </div>
              <div className="narrative-pills">
                <span className="narrative-pill">Keys to the library</span>
                <span className="narrative-pill">Production first</span>
                <span className="narrative-pill">Access over abstraction</span>
              </div>
            </div>
          </div>
          <div className="story-shelves">
            <div className="narrative-shelf-stack">
              <div className="grid-2 elevated-visuals">
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>◆</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-featured">ALL-ACCESS</span>
                    </div>
                  </div>
                  <div className="medium-card-name">All-Access Pass.</div>
                  <div className="medium-card-tagline">Your key to the full agent library from day one.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Full catalog</span>
                    <span className="capability-dot">Immediate use</span>
                    <span className="capability-dot">Usage window</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">ACCESS</span>
                    <span className="medium-card-rating">◆ Key</span>
                    <span className="medium-card-price">$1,000/mo</span>
                  </div>
                  <div className="medium-card-author">enterprise subscription</div>
                </div>
                {stackExample && (
                  <StackCard stack={stackExample} aaEnabled={aaEnabled} onAAClick={onStackAA} />
                )}
              </div>
              <div className="live-ticker" aria-label="Live usage ticker">
                <div className="live-ticker-track">
                  {liveUsageEvents.concat(liveUsageEvents).map((event, index) => (
                    <span key={`${event}-${index}`} className="live-ticker-item">{event}</span>
                  ))}
                </div>
              </div>
              <div className="text-banner">Warehouse crate: drag to browse new arrivals.</div>
              <div
                className="crate-scroll"
                ref={crateRef}
                onPointerDown={handleCratePointerDown}
                onPointerMove={handleCratePointerMove}
                onPointerUp={handleCratePointerEnd}
                onPointerLeave={handleCratePointerEnd}
                onPointerCancel={handleCratePointerEnd}
              >
                <div className="crate-grid">
                  {crateAgents.map(agent => (
                    <div key={agent.id} className="crate-card">
                      <div className="crate-card-kicker">[AGNT-{String(agent.id).padStart(3, "0")}]</div>
                      <div className="crate-card-name">{agent.name}</div>
                      <div className="crate-card-meta">{agent.category} | {agent.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-learn" ref={el => (storySectionRefs.current[1] = el)}>
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">Friction as Signal</div>
              <div className="narrative-title">Start Imperfect. Optimize Later.</div>
              <div className="narrative-body">
                We provide 100+ agents because we expect you to ignore most of them. The friction you feel is data. The agents your team doesn't use tell us as much as the ones they do.
              </div>
              <div className="narrative-callout">
                <div className="narrative-callout-icon">◆</div>
                <div>While your team explores, our Usage Sensemaking layer tracks adoption patterns. We identify the winning workflows that no one could have guessed beforehand.</div>
              </div>
              <div className="narrative-timeline">
                <div className="narrative-chip"><strong>Heatmap</strong> Adoption vs abandonment</div>
                <div className="narrative-chip"><strong>Signals</strong> Friction and intent</div>
                <div className="narrative-chip"><strong>Winners</strong> Repeatable workflows</div>
                <div className="narrative-chip"><strong>Readiness</strong> What to harden next</div>
              </div>
            </div>
          </div>
          <div className="story-shelves">
            <div className="narrative-shelf-stack">
              <div className="text-banner">Experimental shelf: beta tools in the wild.</div>
              <div className="grid-3 elevated-shelf">
                {experimentalAgents.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
              </div>
              <div className="text-banner">Stack viewer: cycle through ops, dev, creative, sales.</div>
              <div className="stack-tabs" role="tablist" aria-label="Stack tabs">
                {stackTabs.map((tab, index) => (
                  <button
                    key={tab.key}
                    type="button"
                    className={`stack-tab ${index === activeStackTab ? "is-active" : ""}`}
                    onClick={() => setActiveStackTab(index)}
                    role="tab"
                    aria-selected={index === activeStackTab}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="stack-tab-panel">
                {activeStack && (
                  <StackCard stack={activeStack} aaEnabled={aaEnabled} onAAClick={onStackAA} />
                )}
              </div>
              <div className="grid-2 elevated-shelf elevated-visuals">
                <div className="stack-card">
                  <div className="stack-card-header">
                    <div className="stack-card-icon">
                      <span>📡</span>
                    </div>
                    <div className="stack-card-meta">
                      <span className="stack-card-count">Sensemaking</span>
                    </div>
                  </div>
                  <div className="stack-card-name">Sensemaking Dashboard</div>
                  <div className="stack-card-desc">Heatmap of agent activity across teams and workflows.</div>
                  <div className="stack-card-solves">High adoption vs. abandonment at a glance.</div>
                  <div className="stack-card-agents">
                    <span className="stack-agent-pill">Adoption heatmap</span>
                    <span className="stack-agent-pill">Abandonment signal</span>
                    <span className="stack-agent-pill">Workflow winners</span>
                  </div>
                  <div className="stack-card-usecases">
                    <span className="stack-usecase">→ High adoption</span>
                    <span className="stack-usecase">→ Abandonment risk</span>
                    <span className="stack-usecase">→ Winning flows</span>
                  </div>
                  <div className="stack-card-footer">
                    <span className="stack-card-users">Live usage insights</span>
                  </div>
                </div>
                <div className="collection-card">
                  <div className="collection-card-stripe" />
                  <div className="collection-card-body">
                    <div className="collection-card-name">Usage Heatmap</div>
                    <div className="collection-card-desc">Visual map of agent activity by team and workflow.</div>
                    <div className="collection-card-meta">
                      <span>Live view</span>
                      <span className="collection-card-curator">Usage layer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-banner">We watched 500 deployments. These 3 agents survived.</div>
              <div className="grid-3">
                {mostPopular.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-stabilize" ref={el => (storySectionRefs.current[2] = el)}>
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">From Experiments to Infrastructure</div>
              <div className="narrative-title">Don't build a custom fortress, before knowing what you need.</div>
              <div className="narrative-body">
                Once the real needs emerge from usage, we step in. We take the workflows that stuck and harden them into bespoke, enterprise-grade systems.
              </div>
              <div className="narrative-list">
                <div className="narrative-list-item">All-Access ($1k/mo): The learning window</div>
                <div className="narrative-list-item">Custom Development: The optional hardening phase</div>
                <div className="narrative-list-item">Data decides what becomes infrastructure</div>
              </div>
            </div>
          </div>
          <div className="story-shelves">
            <div className="narrative-shelf-stack">
              <div className="grid-2">
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>🛠️</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-new">LOCKED</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Tune and harden.</div>
                  <div className="medium-card-tagline">Prompt reliability, output formats, and guardrails locked.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">QA gates</span>
                    <span className="capability-dot">Output schema</span>
                    <span className="capability-dot">Guardrails</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">STABILIZE</span>
                    <span className="medium-card-rating">★ Phase 2</span>
                    <span className="medium-card-price">Locked</span>
                  </div>
                  <div className="medium-card-author">by reliability ops</div>
                </div>
                <div className="collection-card">
                  <div className="collection-card-stripe" />
                  <div className="collection-card-body">
                    <div className="collection-card-name">Guardrails pack</div>
                    <div className="collection-card-desc">Prompt QA, monitoring, and rollback ready.</div>
                    <div className="collection-card-meta">
                      <span>Phase 2 kit</span>
                      <span className="collection-card-curator">Platform team</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-banner">Only what survives guardrails graduates.</div>
              <div className="grid-3">
                {enterpriseReadyAgents.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
              </div>
              <div className="text-banner">Stabilization shelf: hardened candidates in queue.</div>
              <div className="grid-3 elevated-shelf">
                {stabilizeAgents.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-knowledge" ref={el => (storySectionRefs.current[3] = el)}>
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">The Knowledge Transfer Protocol</div>
              <div className="narrative-title">Active Education and Training in Enterprise AI.</div>
              <div className="narrative-body">
                Hardware is cheap; intuition is expensive. We do not leave behind black boxes. Deep-dive modules and executive sessions are core deliverables so your team owns the logic, not just the output.
              </div>
              <div className="narrative-list">
                <div className="narrative-list-item">Education modules mapped to your workflows</div>
                <div className="narrative-list-item">Training labs plus executive sessions</div>
                <div className="narrative-list-item">Capability transfer documented and retained</div>
              </div>
            </div>
          </div>
          <div className="story-shelves">
            <div className="narrative-shelf-stack">
              <div className="grid-2 knowledge-grid">
                <div className="syllabus-card">
                  <div className="syllabus-title">[ACTIVE_SYLLABUS]</div>
                  <div className="syllabus-table">
                    <div className="syllabus-row">
                      <span className="syllabus-code">01_GOVERNANCE</span>
                      <span className="syllabus-desc">// Executive AI Guardrails</span>
                    </div>
                    <div className="syllabus-row">
                      <span className="syllabus-code">02_PROMPTING</span>
                      <span className="syllabus-desc">// Domain-Specific Logic Transfer</span>
                    </div>
                    <div className="syllabus-row">
                      <span className="syllabus-code">03_ARCHITECTURE</span>
                      <span className="syllabus-desc">// Maintaining In-House Agentic Stacks</span>
                    </div>
                  </div>
                </div>
                <div className="speaker-dossier">
                  <div className="speaker-photo" />
                  <div className="speaker-body">
                    <div className="speaker-title">[PRINCIPAL_LECTURER: <span>NAME</span>]</div>
                    <div className="speaker-meta">
                      <div className="speaker-meta-item">[KEYNOTE] Enterprise AI Summits</div>
                      <div className="speaker-meta-item">[WORKSHOP] Executive AI Leadership Series</div>
                      <div className="speaker-meta-item">[ADVISORY] Fortune 500 AI Council</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="education-notes">
                <div className="education-note">
                  <div className="education-note-title">[EXEC_SESSION]</div>
                  <div className="education-note-body">Board-level governance, risk posture, and AI leadership alignment.</div>
                </div>
                <div className="education-note">
                  <div className="education-note-title">[TEAM_LABS]</div>
                  <div className="education-note-body">Hands-on prompts, evaluation drills, and workflow instrumentation.</div>
                </div>
              </div>
              <div className="education-shelf">
                <div className="education-shelf-title">[TRAINING_LABS]</div>
                <div className="education-shelf-grid">
                  <div className="education-card">
                    <div className="education-card-kicker">LAB_01</div>
                    <div className="education-card-name">Agent Ops Workshop</div>
                    <div className="education-card-meta">Deployment drills + failure modes.</div>
                  </div>
                  <div className="education-card">
                    <div className="education-card-kicker">LAB_02</div>
                    <div className="education-card-name">Prompt Reliability Clinic</div>
                    <div className="education-card-meta">Evaluation harness + scoring playbook.</div>
                  </div>
                  <div className="education-card">
                    <div className="education-card-kicker">LAB_03</div>
                    <div className="education-card-name">Stack Ownership Lab</div>
                    <div className="education-card-meta">Infra handoff + internal runbooks.</div>
                  </div>
                </div>
              </div>
              <div className="education-ledger">
                <div className="education-ledger-title">[CAPABILITY_TRANSFER_LEDGER]</div>
                <div className="education-ledger-row">
                  <span className="education-ledger-key">Ownership</span>
                  <span className="education-ledger-value">Core prompts + evaluation suite</span>
                </div>
                <div className="education-ledger-row">
                  <span className="education-ledger-key">Governance</span>
                  <span className="education-ledger-value">Risk guardrails + escalation paths</span>
                </div>
                <div className="education-ledger-row">
                  <span className="education-ledger-key">Enablement</span>
                  <span className="education-ledger-value">Trainer notes + internal certification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-bespoke" ref={el => (storySectionRefs.current[4] = el)}>
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">Organic Integration</div>
              <div className="narrative-title">Build in-house competence instead of permanent reliance.</div>
              <div className="narrative-body">
                This is what organic integration looks like. No top-down mandates--just a network of teams using the tools that actually fit their work style. We help you build in-house competence, not permanent reliance on us.
              </div>
              <div className="narrative-pills">
                <span className="narrative-pill">Organic adoption</span>
                <span className="narrative-pill">In-house competence</span>
                <span className="narrative-pill">No dependency</span>
              </div>
            </div>
          </div>
          <div className="story-shelves">
            <div className="narrative-shelf-stack">
              <div className="featured-mixed">
                <div className="large-card">
                  <div className="large-card-glow" />
                  <div className="large-card-content">
                    <div className="large-card-top">
                      <div className="large-card-icon">
                        <span>⦿</span>
                      </div>
                      <div className="large-card-badges">
                        <span className="badge-featured">VISION</span>
                        <span className="badge-trending-lg">NETWORK</span>
                      </div>
                    </div>
                    <div className="large-card-name">The Node Graph.</div>
                    <div className="large-card-tagline">The Integrated Enterprise: Real people connected to proven tools.</div>
                    <div className="large-card-solves">Organic adoption creates a network of teams and agents that grows with real usage.</div>
                    <div className="large-card-capabilities">
                      <span className="capability-chip">People nodes</span>
                      <span className="capability-chip">Agent nodes</span>
                      <span className="capability-chip">Workflow edges</span>
                    </div>
                    <div className="large-card-meta">
                      <span className="large-card-category">INTEGRATED</span>
                      <span className="large-card-rating">Networked</span>
                      <span className="large-card-users">Real teams</span>
                      <span className="large-card-price">Live</span>
                    </div>
                    <div className="large-card-author">by adoption map</div>
                    <button className="large-card-btn">See the network →</button>
                  </div>
                </div>
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>🏗️</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-new">OWNED</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Ownership transfer.</div>
                  <div className="medium-card-tagline">Systems live in your infra with docs and handoff.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Your code</span>
                    <span className="capability-dot">Your models</span>
                    <span className="capability-dot">Your infra</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">OWNERSHIP</span>
                    <span className="medium-card-rating">★ Handoff</span>
                    <span className="medium-card-price">Yours</span>
                  </div>
                  <div className="medium-card-author">by platform team</div>
                </div>
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>◆</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-trending">◆</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Internal capability.</div>
                  <div className="medium-card-tagline">A platform your teams extend without us.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Internal builders</span>
                    <span className="capability-dot">Playbooks</span>
                    <span className="capability-dot">Long-term</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">OUTCOME</span>
                    <span className="medium-card-rating">★ Durable</span>
                    <span className="medium-card-price">Owned</span>
                  </div>
                  <div className="medium-card-author">by your teams</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
