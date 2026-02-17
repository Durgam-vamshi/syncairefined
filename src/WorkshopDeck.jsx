import "./WorkshopDeck.css";

const slides = [
  {
    id: "01",
    layout: "hero",
    kicker: "Title and Vision",
    title: "The AI Engineering Roadmap: Navigating the Orchestration Shift",
    subtitle: "A Technical Workshop for CS Students",
    meta: "Presented by Manikanta Sakhamuri, IITG Alumnus",
    body: "A compact workshop that moves students from AI hype to orchestration literacy.",
    points: [
      "Focus: system design over tool chasing.",
      "Format: short briefings + hands-on mapping.",
    ],
    sideNote: {
      title: "Core Deliverables",
      items: ["Technical filter", "7-level roadmap", "MarketStream case study"],
    },
    right: {
      type: "signal",
      stamp: "[WORKSHOP_SIGNAL]",
      status: "ACTIVE",
      metrics: ["Filter", "Roadmap", "Case"],
      items: [
        { title: "Navigation", body: "Signal vs noise filter." },
        { title: "Practice", body: "MarketStream system map." },
        { title: "Career", body: "Architect mindset." },
      ],
    },
  },
  {
    id: "02",
    layout: "problem",
    kicker: "The Problem",
    title: "Technical Substance vs. Information Overload",
    body: "Model noise hides the engineering signal.",
    points: [
      "Daily benchmarks ≠ durable skills.",
      "Students need a technical filter.",
    ],
    sideNote: {
      title: "Impact",
      items: ["Placement relevance", "Institution differentiation", "Industry alignment"],
    },
    right: {
      type: "noise",
      bars: [18, 42, 65, 34, 78, 52, 92, 37, 61, 44, 70],
      lensTitle: "Filter Lens",
      lensItems: ["Separate research from infra", "Spot orchestration gaps"],
      highlight: "Filter the noise to reveal the system.",
    },
  },
  {
    id: "03",
    layout: "filter",
    kicker: "Workshop Objective",
    title: "Developing a Technical Filter",
    body: "A three-layer filter keeps decisions grounded.",
    points: [
      "Research → Infrastructure → Applications.",
      "Orchestration is the leverage layer.",
    ],
    sideNote: {
      title: "Outputs",
      items: ["Filter worksheet", "Decision heuristics", "Roadmap sheet"],
    },
    right: {
      type: "filter",
      columns: [
        {
          title: "Research",
          items: ["Models", "Benchmarks", "Capabilities"],
        },
        {
          title: "Infrastructure",
          items: ["RAG", "LangChain", "Orchestration"],
        },
        {
          title: "Applications",
          items: ["Products", "Workflows", "Adoption"],
        },
      ],
    },
  },
  {
    id: "04",
    layout: "framework",
    kicker: "Core Framework",
    title: "From Static Data to Autonomous Systems",
    body: "Seven levels from documentation to autonomous systems.",
    points: [
      "Maps a vertical across maturity levels.",
      "Shows when reliability becomes the bottleneck.",
    ],
    sideNote: {
      title: "Tooling Lens",
      items: ["RAG", "LangChain/LangGraph", "Evals + guardrails"],
    },
    right: {
      type: "timeline",
      items: [
        "Documentation",
        "RAG search",
        "Prompt workflows",
        "Tool agents",
        "Multi-agent swarms",
        "Reliability layer",
        "Production orchestration",
      ],
    },
  },
  {
    id: "05",
    layout: "case",
    kicker: "Vertical Case Study",
    title: "Grounding Theory in Business Logic",
    body: "MarketStream anchors theory in a live marketplace.",
    points: [
      "One vertical, three tracks.",
      "Real-world tradeoffs and risk.",
    ],
    sideNote: {
      title: "Artifacts",
      items: ["Agent roles", "Risk points", "Feedback loops"],
    },
    right: {
      type: "map",
      center: "MarketStream Core",
      left: ["Policy Engine", "Fraud Signals", "Enforcement"],
      right: ["Pricing Logic", "Catalog Quality", "Dispute Mediation"],
      caption: "Marketplace system map",
    },
  },
  {
    id: "06",
    layout: "shift",
    kicker: "Industry Shift",
    title: "The Evolving Role of the Software Engineer",
    body: "Coding is baseline; orchestration is advantage.",
    points: [
      "Engineers manage non-determinism.",
      "Architecture is the differentiator.",
    ],
    sideNote: {
      title: "Architect Moves",
      items: ["Define IO + evals", "Set tool boundaries", "Design fallbacks"],
    },
    right: {
      type: "compare",
      before: ["Prompting focus", "Single model demos", "Manual checks"],
      after: ["Orchestration mindset", "Multi-agent systems", "Evaluation harnesses"],
      quote: "Orchestration beats prompts.",
    },
  },
  {
    id: "07",
    layout: "readiness",
    kicker: "Production Readiness",
    title: "Beyond the Prototype",
    body: "Production readiness is the line that matters.",
    points: [
      "Reliability beats demos.",
      "Evals + telemetry are mandatory.",
    ],
    sideNote: {
      title: "Production Checks",
      items: ["Telemetry", "Evals", "Guardrails"],
    },
    right: {
      type: "checklist",
      checks: ["Telemetry", "Evals", "Guardrails", "Rollback"],
      risks: ["Drift", "Latency", "Compliance"],
    },
  },
  {
    id: "08",
    layout: "method",
    kicker: "Hands-On Methodology",
    title: "Active Design and System Mapping",
    body: "Teams design, map, and critique systems.",
    points: [
      "Track-based team work.",
      "Deliverables are portfolio-ready.",
    ],
    sideNote: {
      title: "Flow",
      items: ["Briefing", "Team mapping", "Critique"],
    },
    right: {
      type: "flow",
      steps: ["Briefing", "Mapping", "Critique"],
      pods: ["Trust and Safety", "Merchant Success", "Dispute Resolution"],
    },
  },
  {
    id: "09",
    layout: "impact",
    kicker: "Impact on Students",
    title: "Building the Architect Mindset",
    body: "Students leave with durable artifacts.",
    points: [
      "Blueprints outlast model cycles.",
      "Portfolio proof of system design.",
    ],
    sideNote: {
      title: "Takeaways",
      items: ["System map", "Reliability checklist", "Self-study roadmap"],
    },
    right: {
      type: "impact",
      stats: [
        { label: "Tracks", value: "03" },
        { label: "Levels", value: "07" },
        { label: "Artifacts", value: "21" },
      ],
      artifacts: ["System map + roles", "Reliability checklist", "Orchestration blueprint"],
    },
  },
  {
    id: "10",
    layout: "strategic",
    kicker: "Strategic Value",
    title: "Technical Leadership and Institutional Growth",
    body: "Institutional value: brand, faculty readiness, talent pipeline.",
    points: [
      "Positions the college as an AI leader.",
      "Creates a talent flywheel.",
    ],
    sideNote: {
      title: "Institution Outcomes",
      items: ["Curriculum signal", "Faculty development", "Talent branding"],
    },
    right: {
      type: "institution",
      outcomes: [
        { title: "Brand Equity", body: "Stand out in agentic AI training." },
        { title: "Faculty Development", body: "FDP sessions for academic staff." },
        { title: "Talent Branding", body: "Direct pipeline to top CS talent." },
      ],
      next: "Next: schedule the cohort and align faculty lead.",
    },
  },
];

function SlideRight({ slide }) {
  if (!slide.right) return null;
  const { type } = slide.right;

  if (type === "signal") {
    return (
      <div className="deck-signal">
        <div className="deck-signal-head">
          <div className="deck-signal-stamp">{slide.right.stamp}</div>
          <div className="deck-signal-status">{slide.right.status}</div>
        </div>
        <div className="deck-signal-visual">
          <div className="deck-orbit">
            <span className="deck-orbit-node deck-orbit-node-main" />
            <span className="deck-orbit-node deck-orbit-node-a" />
            <span className="deck-orbit-node deck-orbit-node-b" />
          </div>
          <div className="deck-signal-bars">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="deck-signal-grid">
          {slide.right.items.map((item) => (
            <div key={item.title} className="deck-signal-card">
              <div className="deck-signal-title">{item.title}</div>
              <div className="deck-signal-body">{item.body}</div>
            </div>
          ))}
        </div>
        <div className="deck-signal-metrics">
          {slide.right.metrics.map((metric) => (
            <span key={metric} className="deck-signal-chip">{metric}</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "noise") {
    return (
      <div className="deck-noise">
        <div className="deck-noise-chart">
          {slide.right.bars.map((bar, index) => (
            <span key={`bar-${index}`} className="deck-noise-bar" style={{ height: `${bar}%` }} />
          ))}
          <svg className="deck-noise-line" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="0,30 10,18 20,26 32,10 44,24 58,8 70,20 82,12 94,24 100,18" />
          </svg>
        </div>
        <div className="deck-noise-panel">
          <div className="deck-noise-title">{slide.right.lensTitle}</div>
          <ul>
            {slide.right.lensItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="deck-noise-footer">{slide.right.highlight}</div>
      </div>
    );
  }

  if (type === "filter") {
    return (
      <div className="deck-filter-visual">
        <div className="deck-filter-triad">
          <span className="deck-triad-node deck-triad-node-a">R</span>
          <span className="deck-triad-node deck-triad-node-b">I</span>
          <span className="deck-triad-node deck-triad-node-c">A</span>
          <span className="deck-triad-line deck-triad-line-ab" />
          <span className="deck-triad-line deck-triad-line-bc" />
          <span className="deck-triad-line deck-triad-line-ca" />
        </div>
        <div className="deck-filter-grid">
          {slide.right.columns.map((column) => (
            <div key={column.title} className="deck-filter-col">
              <div className="deck-filter-title">{column.title}</div>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "timeline") {
    return (
      <div className="deck-timeline">
        <div className="deck-timeline-rail">
          <span className="deck-rail-dot" />
          <span className="deck-rail-dot" />
          <span className="deck-rail-dot" />
          <span className="deck-rail-dot" />
          <span className="deck-rail-dot" />
          <span className="deck-rail-dot" />
          <span className="deck-rail-dot" />
        </div>
        {slide.right.items.map((item, index) => (
          <div key={item} className="deck-timeline-item">
            <div className="deck-timeline-index">{String(index + 1).padStart(2, "0")}</div>
            <div className="deck-timeline-body">{item}</div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "map") {
    return (
      <div className="deck-map">
        <div className="deck-map-lines" aria-hidden="true">
          <span className="deck-map-line deck-map-line-1" />
          <span className="deck-map-line deck-map-line-2" />
          <span className="deck-map-line deck-map-line-3" />
        </div>
        <div className="deck-map-col">
          {slide.right.left.map((item) => (
            <div key={item} className="deck-map-node">{item}</div>
          ))}
        </div>
        <div className="deck-map-center">
          <div className="deck-map-core">{slide.right.center}</div>
          <div className="deck-map-caption">{slide.right.caption}</div>
        </div>
        <div className="deck-map-col">
          {slide.right.right.map((item) => (
            <div key={item} className="deck-map-node">{item}</div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "compare") {
    return (
      <div className="deck-compare">
        <div className="deck-compare-col">
          <div className="deck-compare-title">Before</div>
          <ul>
            {slide.right.before.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="deck-compare-col deck-compare-col--accent">
          <div className="deck-compare-title">After</div>
          <ul>
            {slide.right.after.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="deck-compare-arrow" aria-hidden="true" />
        <div className="deck-compare-quote">{slide.right.quote}</div>
      </div>
    );
  }

  if (type === "checklist") {
    return (
      <div className="deck-checklist">
        <div className="deck-check-visual" aria-hidden="true">
          <span className="deck-check-box" />
          <span className="deck-check-box" />
          <span className="deck-check-box" />
          <span className="deck-check-box" />
          <span className="deck-check-box" />
          <span className="deck-check-box" />
        </div>
        <div className="deck-checklist-title">Production Checks</div>
        <div className="deck-checklist-grid">
          {slide.right.checks.map((item) => (
            <div key={item} className="deck-checklist-item">{item}</div>
          ))}
        </div>
        <div className="deck-risk">
          <div className="deck-risk-title">Risk Signals</div>
          <div className="deck-risk-grid">
            {slide.right.risks.map((item) => (
              <div key={item} className="deck-risk-item">{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "flow") {
    return (
      <div className="deck-flow">
        <div className="deck-flow-track" aria-hidden="true">
          <span className="deck-flow-node" />
          <span className="deck-flow-node" />
          <span className="deck-flow-node" />
          <span className="deck-flow-node" />
        </div>
        <div className="deck-flow-steps">
          {slide.right.steps.map((step, index) => (
            <div key={step} className="deck-flow-step">
              <div className="deck-flow-index">Phase {String(index + 1).padStart(2, "0")}</div>
              <div className="deck-flow-title">{step}</div>
            </div>
          ))}
        </div>
        <div className="deck-flow-pods">
          {slide.right.pods.map((pod) => (
            <div key={pod} className="deck-flow-pod">{pod}</div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "impact") {
    return (
      <div className="deck-impact">
        <div className="deck-impact-ring" aria-hidden="true" />
        <div className="deck-impact-stats">
          {slide.right.stats.map((stat) => (
            <div key={stat.label} className="deck-impact-stat">
              <div className="deck-impact-value">{stat.value}</div>
              <div className="deck-impact-label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="deck-impact-artifacts">
          <div className="deck-impact-title">Portfolio Artifacts</div>
          <ul>
            {slide.right.artifacts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (type === "institution") {
    return (
      <div className="deck-institution">
        <div className="deck-institution-skyline" aria-hidden="true">
          <span className="deck-skyline-bar" />
          <span className="deck-skyline-bar" />
          <span className="deck-skyline-bar" />
          <span className="deck-skyline-bar" />
          <span className="deck-skyline-bar" />
        </div>
        <div className="deck-institution-grid">
          {slide.right.outcomes.map((item) => (
            <div key={item.title} className="deck-institution-card">
              <div className="deck-institution-title">{item.title}</div>
              <div className="deck-institution-body">{item.body}</div>
            </div>
          ))}
        </div>
        <div className="deck-institution-bar">{slide.right.next}</div>
      </div>
    );
  }

  return null;
}

export default function WorkshopDeck() {
  return (
    <div className="workshop-deck">
      <div className="deck-slides">
        {slides.map((slide, index) => (
          <section key={slide.id} className={`deck-slide deck-slide-${slide.layout}`}>
            <div className="deck-slide-header">
              <div className="deck-slide-number">
                Slide {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
              <div className="deck-slide-kicker">{slide.kicker}</div>
            </div>
            <div className={`deck-slide-grid deck-slide-grid-${slide.layout}`}>
              <div className="deck-left">
                <div className="deck-kicker">{slide.kicker}</div>
                <h2 className="deck-title">{slide.title}</h2>
                {slide.subtitle && <div className="deck-subtitle">{slide.subtitle}</div>}
                {slide.meta && <div className="deck-meta">{slide.meta}</div>}
                {slide.body && <p className="deck-body">{slide.body}</p>}
                {slide.points && (
                  <div className="deck-points">
                    {slide.points.map((point) => (
                      <div key={point} className="deck-point">{point}</div>
                    ))}
                  </div>
                )}
                {slide.sideNote && (
                  <div className="deck-panel">
                    <div className="deck-panel-title">{slide.sideNote.title}</div>
                    <ul className="deck-panel-list">
                      {slide.sideNote.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="deck-right">
                <SlideRight slide={slide} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
