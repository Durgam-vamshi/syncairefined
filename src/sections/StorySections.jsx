import { useEffect, useMemo, useRef, useState } from "react";
import { AGENTS, STACKS } from "../data";
import { CompactCard, StackCard } from "../components/cards";
import "../../main.css"

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
          </div>
        </div>
      </div>

      <div className=
      
      "story-section story-learn"
      
      
      ref={el => (storySectionRefs.current[1] = el)}>
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
          
          
            </div>
          </div>
        </div>
      </div>

      <div className="story-section story-knowledge " ref={el => (storySectionRefs.current[3] = el)}>
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

          


              </div>
              <div className="education-notes">
              
              
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


               


            


             



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
