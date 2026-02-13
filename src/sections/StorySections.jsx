import { AGENTS, STACKS, INTEGRATIONS, CATEGORY_CARDS } from "../data";
import { HorizontalShelf, Section } from "../components";
import { CategoryCard, CompactCard, IntegrationCard, LargeCard, MediumCard, StackCard } from "../components/cards";

export function StorySections({ onEnter, onLeave, aaEnabled, onStackAA, storySectionRefs }) {
  const featured = AGENTS.filter(a => a.featured);
  const newAgents = AGENTS.filter(a => a.new);
  const dataAgents = AGENTS.filter(a => a.category === "Data");
  const productivityAgents = AGENTS.filter(a => a.category === "Productivity");
  const mostPopular = [...AGENTS].sort((a, b) => parseFloat(b.users) - parseFloat(a.users)).slice(0, 8);

  return (
    <div className="narrative-sections">
      <div className="story-section story-start" ref={el => (storySectionRefs.current[0] = el)} data-seen="true">
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">Access Over Abstraction</div>
              <div className="narrative-title">Deployment Is Discovery.</div>
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
              <div className="featured-mixed">
                <div className="large-card">
                  <div className="large-card-glow" />
                  <div className="large-card-content">
                    <div className="large-card-top">
                      <div className="large-card-icon">
                        <span>🚀</span>
                      </div>
                      <div className="large-card-badges">
                        <span className="badge-featured">FEATURED</span>
                        <span className="badge-trending-lg">TRENDING</span>
                        <span className="badge-new">IN USE</span>
                      </div>
                    </div>
                    <div className="large-card-name">Featured & Trending.</div>
                    <div className="large-card-tagline">The most popular agents currently in use.</div>
                    <div className="large-card-solves">Proof of adoption when access is immediate and teams discover what actually fits.</div>
                    <div className="large-card-capabilities">
                      <span className="capability-chip">Highest installs</span>
                      <span className="capability-chip">Most reused</span>
                      <span className="capability-chip">Proven outcomes</span>
                    </div>
                    <div className="large-card-meta">
                      <span className="large-card-category">TOP PICKS</span>
                      <span className="large-card-rating">High adoption</span>
                      <span className="large-card-users">Live usage</span>
                      <span className="large-card-price">Active</span>
                    </div>
                    <div className="large-card-author">by adoption signals</div>
                    <button className="large-card-btn">Browse top picks →</button>
                  </div>
                </div>
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>🧾</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-new">OPS</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Operations Stack.</div>
                  <div className="medium-card-tagline">Invoice Parser, Logistics Coordinator, Shift Scheduler.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Finance</span>
                    <span className="capability-dot">Logistics</span>
                    <span className="capability-dot">Scheduling</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">OPERATIONS</span>
                    <span className="medium-card-rating">★ In use</span>
                    <span className="medium-card-price">Active</span>
                  </div>
                  <div className="medium-card-author">by ops teams</div>
                </div>
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>🎨</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-trending">◆</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Creative Suite.</div>
                  <div className="medium-card-tagline">Asset Generator, Brand Voice Tuner, Layout Assistant.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Assets</span>
                    <span className="capability-dot">Brand voice</span>
                    <span className="capability-dot">Layouts</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">CREATIVE</span>
                    <span className="medium-card-rating">★ In use</span>
                    <span className="medium-card-price">Active</span>
                  </div>
                  <div className="medium-card-author">by creative teams</div>
                </div>
              </div>
              <div className="grid-3">
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🧰</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Library access</div>
                    <div className="compact-card-tagline">Every agent available day one</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Immediate</span>
                      <span className="compact-card-users">Full catalog</span>
                      <span className="compact-card-price">Unlocked</span>
                    </div>
                  </div>
                </div>
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🔐</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Default access</div>
                    <div className="compact-card-tagline">Roles and scopes prewired</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Safe</span>
                      <span className="compact-card-users">Scoped</span>
                      <span className="compact-card-price">Ready</span>
                    </div>
                  </div>
                </div>
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🧾</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Usage trace</div>
                    <div className="compact-card-tagline">Every action is visible</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Trace</span>
                      <span className="compact-card-users">Signals</span>
                      <span className="compact-card-price">Live</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-banner">100+ agents available on Day 1.</div>
              <div className="grid-4">
                <div className="integration-card">
                  <div className="integration-card-icon">
                    <span>📈</span>
                  </div>
                  <div className="integration-card-name">Finance ops</div>
                  <div className="integration-card-count">Invoice flows</div>
                </div>
                <div className="integration-card">
                  <div className="integration-card-icon">
                    <span>🔁</span>
                  </div>
                  <div className="integration-card-name">Logistics</div>
                  <div className="integration-card-count">Routing & handoff</div>
                </div>
                <div className="integration-card">
                  <div className="integration-card-icon">
                    <span>⏱️</span>
                  </div>
                  <div className="integration-card-name">Scheduling</div>
                  <div className="integration-card-count">Shift coverage</div>
                </div>
                <div className="integration-card">
                  <div className="integration-card-icon">
                    <span>🧩</span>
                  </div>
                  <div className="integration-card-name">Creative ops</div>
                  <div className="integration-card-count">Asset pipelines</div>
                </div>
              </div>
            </div>

            <div className="shelf-container">
              <Section sectionKey="stacks">
                <HorizontalShelf>
                  {STACKS.map(s => <StackCard key={s.id} stack={s} aaEnabled={aaEnabled} onAAClick={onStackAA} />)}
                </HorizontalShelf>
              </Section>

              <Section sectionKey="integrations">
                <HorizontalShelf>
                  {INTEGRATIONS.map(i => <IntegrationCard key={i.id} integration={i} />)}
                </HorizontalShelf>
              </Section>
            </div>

            <div className="shelf-container">
              <Section sectionKey="featured">
                <div className="featured-mixed">
                  <LargeCard agent={featured[0]} onHoverEnter={onEnter} onHoverLeave={onLeave} />
                  <MediumCard agent={featured[1]} onHoverEnter={onEnter} onHoverLeave={onLeave} />
                  <MediumCard agent={featured[2]} onHoverEnter={onEnter} onHoverLeave={onLeave} />
                </div>
              </Section>

              <Section sectionKey="categories">
                <div className="grid-4">
                  {CATEGORY_CARDS.map(category => (
                    <CategoryCard key={category.key} category={category} />
                  ))}
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-learn" ref={el => (storySectionRefs.current[1] = el)}>
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">Friction as Signal</div>
              <div className="narrative-title">Start Imperfect. Stabilize Later.</div>
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
              <div className="grid-2">
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
              <div className="text-banner">Stop guessing. Watch what they use.</div>
              <div className="grid-3">
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>★</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-trending">★</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Community Favorites.</div>
                  <div className="medium-card-tagline">Agents with the highest engagement and repeat use.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Engagement</span>
                    <span className="capability-dot">Retention</span>
                    <span className="capability-dot">Outcomes</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">FAVORITES</span>
                    <span className="medium-card-rating">★ High</span>
                    <span className="medium-card-price">Active</span>
                  </div>
                  <div className="medium-card-author">by community signals</div>
                </div>
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🧪</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Experimental shelf</div>
                    <div className="compact-card-tagline">Beta agents testing new workflows</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Beta</span>
                      <span className="compact-card-users">In trials</span>
                      <span className="compact-card-price">Exploring</span>
                    </div>
                  </div>
                </div>
                <div className="integration-card">
                  <div className="integration-card-icon">
                    <span>📊</span>
                  </div>
                  <div className="integration-card-name">Adoption signals</div>
                  <div className="integration-card-count">Engagement score</div>
                </div>
              </div>
              <div className="grid-2">
                <div className="pairing-card">
                  <div className="pairing-agents">
                    <div className="pairing-agent">
                      <span className="pairing-icon">🧑‍💼</span>
                      <span className="pairing-name">Team Lead</span>
                    </div>
                    <span className="pairing-plus">+</span>
                    <div className="pairing-agent">
                      <span className="pairing-icon">📈</span>
                      <span className="pairing-name">Usage Signals</span>
                    </div>
                  </div>
                  <div className="pairing-why">
                    People show intent; signals reveal what to harden next.
                  </div>
                </div>
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🗺️</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Adoption heatmap</div>
                    <div className="compact-card-tagline">Daily usage by team</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Live</span>
                      <span className="compact-card-users">Signals</span>
                      <span className="compact-card-price">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shelf-container">
              <Section sectionKey="popular">
                <div className="grid-4">
                  {mostPopular.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
                </div>
              </Section>

              <Section sectionKey="newArrivals">
                <div className="grid-3">
                  {newAgents.map(a => <MediumCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-stabilize" ref={el => (storySectionRefs.current[2] = el)}>
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">From Experiments to Infrastructure</div>
              <div className="narrative-title">Stabilize and Adapt.</div>
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
              <div className="narrative-mini emphasis">
                <div className="narrative-mini-top">
                  <div className="narrative-mini-icon">◆</div>
                  <div className="narrative-mini-kicker">Comparison</div>
                </div>
                <div className="narrative-mini-title">Phase 1: Broad Access vs Phase 2: Deep Integration</div>
                <div className="narrative-mini-body">The first phase is the learning window. The second phase is optional hardening for proven use cases.</div>
                <div className="narrative-stat-row">
                  <span className="narrative-stat"><strong>Phase 1</strong> Broad Access</span>
                  <span className="narrative-stat"><strong>Phase 2</strong> Deep Integration</span>
                </div>
              </div>
              <div className="grid-3">
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
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>🔁</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-trending">↻</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Workflow consistency.</div>
                  <div className="medium-card-tagline">Standardize handoffs and ensure the same outcome each run.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Handoff specs</span>
                    <span className="capability-dot">Quality checks</span>
                    <span className="capability-dot">Run templates</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">NORMALIZE</span>
                    <span className="medium-card-rating">★ Phase 2</span>
                    <span className="medium-card-price">Repeatable</span>
                  </div>
                  <div className="medium-card-author">by workflow owners</div>
                </div>
                <div className="medium-card">
                  <div className="medium-card-header">
                    <div className="medium-card-icon">
                      <span>🔗</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-trending">◆</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Integration depth.</div>
                  <div className="medium-card-tagline">Connectors extend into org systems and data pipelines.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">SSO roles</span>
                    <span className="capability-dot">Data pipelines</span>
                    <span className="capability-dot">Ops hooks</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">DEEPEN</span>
                    <span className="medium-card-rating">★ Phase 2</span>
                    <span className="medium-card-price">Embedded</span>
                  </div>
                  <div className="medium-card-author">by systems team</div>
                </div>
              </div>
              <div className="grid-2">
                <div className="stack-card">
                  <div className="stack-card-header">
                    <div className="stack-card-icon">
                      <span>♻️</span>
                    </div>
                    <div className="stack-card-meta">
                      <span className="stack-card-count">3 steps</span>
                    </div>
                  </div>
                  <div className="stack-card-name">Stabilization loop</div>
                  <div className="stack-card-desc">Tune agents, normalize workflows, then deepen integrations.</div>
                  <div className="stack-card-solves">Repeat until systems are stable.</div>
                  <div className="stack-card-agents">
                    <span className="stack-agent-pill">Tune</span>
                    <span className="stack-agent-pill">Normalize</span>
                    <span className="stack-agent-pill">Deepen</span>
                  </div>
                  <div className="stack-card-usecases">
                    <span className="stack-usecase">→ Guardrails</span>
                    <span className="stack-usecase">→ Consistent outcomes</span>
                    <span className="stack-usecase">→ Embedded tooling</span>
                  </div>
                  <div className="stack-card-footer">
                    <span className="stack-card-users">Continuous hardening</span>
                  </div>
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
              <div className="text-banner">You don't build custom agents until the data says you must.</div>
              <div className="grid-3">
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>✅</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Prompt QA</div>
                    <div className="compact-card-tagline">Quality checks per run</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Passed</span>
                      <span className="compact-card-users">Checks</span>
                      <span className="compact-card-price">Ready</span>
                    </div>
                  </div>
                </div>
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>📦</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Run templates</div>
                    <div className="compact-card-tagline">Repeatable job specs</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Stable</span>
                      <span className="compact-card-users">Templates</span>
                      <span className="compact-card-price">Shared</span>
                    </div>
                  </div>
                </div>
                <div className="integration-card">
                  <div className="integration-card-icon">
                    <span>🧩</span>
                  </div>
                  <div className="integration-card-name">Ops hooks</div>
                  <div className="integration-card-count">Tooling embedded</div>
                </div>
              </div>
            </div>

            <div className="shelf-container">
              <Section sectionKey="productivity">
                <div className="grid-3">
                  {productivityAgents.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
                </div>
              </Section>

              <Section sectionKey="integrations">
                <HorizontalShelf>
                  {INTEGRATIONS.map(i => <IntegrationCard key={i.id} integration={i} />)}
                </HorizontalShelf>
              </Section>

              <Section sectionKey="data">
                <HorizontalShelf>
                  {dataAgents.map(a => <MediumCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
                </HorizontalShelf>
              </Section>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-bespoke" ref={el => (storySectionRefs.current[3] = el)}>
        <div className="story-grid">
          <div className="story-narrative">
            <div className="shelf-container narrative-block">
              <div className="narrative-kicker">Organic Integration</div>
              <div className="narrative-title">Build Capability, Not Dependency.</div>
              <div className="narrative-body">
                This is what organic integration looks like. No top-down mandates—just a network of teams using the tools that actually fit their work style. We help you build in-house competence, not permanent reliance on us.
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
                      <span>🌱</span>
                    </div>
                    <div className="medium-card-badges">
                      <span className="badge-trending">↑</span>
                    </div>
                  </div>
                  <div className="medium-card-name">Capability shift.</div>
                  <div className="medium-card-tagline">From usage to independence across teams.</div>
                  <div className="medium-card-capabilities">
                    <span className="capability-dot">Internal builders</span>
                    <span className="capability-dot">Playbooks</span>
                    <span className="capability-dot">Extension path</span>
                  </div>
                  <div className="medium-card-footer">
                    <span className="medium-card-category">CAPABILITY</span>
                    <span className="medium-card-rating">★ Durable</span>
                    <span className="medium-card-price">Independent</span>
                  </div>
                  <div className="medium-card-author">by enablement</div>
                </div>
              </div>
              <div className="text-banner">Marketing found the Copy Agent. HR found the Policy Agent. We just provided the platform.</div>
              <div className="grid-2">
                <div className="collection-card">
                  <div className="collection-card-stripe" />
                  <div className="collection-card-body">
                    <div className="collection-card-name">Internal platform</div>
                    <div className="collection-card-desc">A durable capability teams can extend and maintain.</div>
                    <div className="collection-card-meta">
                      <span>Long-term</span>
                      <span className="collection-card-curator">Your org</span>
                    </div>
                  </div>
                </div>
                <div className="pairing-card">
                  <div className="pairing-agents">
                    <div className="pairing-agent">
                      <span className="pairing-icon">🧱</span>
                      <span className="pairing-name">Your stack</span>
                    </div>
                    <span className="pairing-plus">+</span>
                    <div className="pairing-agent">
                      <span className="pairing-icon">✨</span>
                      <span className="pairing-name">Syn systems</span>
                    </div>
                  </div>
                  <div className="pairing-why">
                    We co-build, then hand over the system.
                  </div>
                </div>
              </div>
              <div className="grid-3">
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🧩</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Custom workflows</div>
                    <div className="compact-card-tagline">Built around your ops</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Tailored</span>
                      <span className="compact-card-users">Org fit</span>
                      <span className="compact-card-price">Aligned</span>
                    </div>
                  </div>
                </div>
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🛡️</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Production grade</div>
                    <div className="compact-card-tagline">Hardened for scale</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Reliable</span>
                      <span className="compact-card-users">Ops-ready</span>
                      <span className="compact-card-price">Stable</span>
                    </div>
                  </div>
                </div>
                <div className="compact-card">
                  <div className="compact-card-icon">
                    <span>🏷️</span>
                  </div>
                  <div className="compact-card-info">
                    <div className="compact-card-name">Built on your stack</div>
                    <div className="compact-card-tagline">Your infra + models</div>
                    <div className="compact-card-meta">
                      <span className="compact-card-rating">★ Yours</span>
                      <span className="compact-card-users">In-house</span>
                      <span className="compact-card-price">Owned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
