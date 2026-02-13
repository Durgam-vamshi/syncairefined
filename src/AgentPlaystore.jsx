import { useState, useEffect, useRef } from "react";
import "./AgentPlaystore.css";
import { AllAccessPanel, HoverDetail } from "./components";
import { useCardHover } from "./hooks/useCardHover";
import { CategoryPills, ClosingSection, HeroSection, StorySections } from "./sections";
// --- Main App ---
export default function AgentPlaystore() {
  const [aaPanel, setAAPanel] = useState({ open: false, stack: null });
  const [aaEnabled, setAAEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);
  const storySectionRefs = useRef([]);
  const scrollRafRef = useRef(null);
  const scrolledRef = useRef(false);
  const { hoverData, onEnter, onLeave } = useCardHover();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const h = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const next = el.scrollTop > 320;
        if (scrolledRef.current !== next) {
          scrolledRef.current = next;
          setScrolled(next);
        }
      });
    };
    el.addEventListener("scroll", h, { passive: true });
    return () => {
      el.removeEventListener("scroll", h);
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const nodes = storySectionRefs.current.filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.seen = "true";
          }
        });
      },
      { root, threshold: 0.2 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const openAA = (stack = null) => setAAPanel({ open: true, stack });
  const closeAA = () => setAAPanel({ open: false, stack: null });
  const enableAA = () => { setAAEnabled(true); setTimeout(closeAA, 600); };
  const handleStackAA = (stack) => aaEnabled ? null : openAA(stack);

  return (
    <>
      <div className="app-container">
        <div className="main-area">
          <div className="topbar">
            <div className="topbar-inner">
              <div className="topbar-left">
                <div className="topbar-logo">
                  <span className="topbar-logo-icon">◈</span>
                  <span className="topbar-logo-text">SyncAI Technologies</span>
                </div>
              </div>
              <div className="topbar-right">
                <div className="aa-topbar" onClick={() => openAA()}>
                  <span className="aa-topbar-star" aria-hidden="true">✶</span>
                  <span className="aa-topbar-label">All-Access</span>
                  <span className="aa-topbar-sep">·</span>
                  <span className="aa-topbar-sub">$1,000/mo</span>
                </div>
                <button className="topbar-link topbar-link-primary">Enterprise Integration</button>
                <button className="topbar-link">AI Workshops/Training</button>
                <button className="topbar-link topbar-link-contact">Contact</button>
              </div>
            </div>
          </div>

          <div className="scroll-area" ref={mainRef}>
            {/* STICKY ALL-ACCESS BAR */}
            {!aaEnabled && (
              <div className={`aa-sticky-bar ${scrolled ? "aa-sticky-bar-show" : ""}`} onClick={() => openAA()}>
                <div className="aa-sticky-inner">
                  <span className="aa-sticky-diamond">◆</span>
                  <span className="aa-sticky-text"><strong>All-Access</strong> — Immediate access to every agent. Learn by deploying, not guessing.</span>
                  <span className="aa-sticky-price">$1,000/mo</span>
                  <span className="aa-sticky-cta">Start All-Access →</span>
                </div>
              </div>
            )}
            <div className="home-content">

              <HeroSection aaEnabled={aaEnabled} onOpenAA={openAA} />
              <CategoryPills />
              <StorySections onEnter={onEnter} onLeave={onLeave} aaEnabled={aaEnabled} onStackAA={handleStackAA} storySectionRefs={storySectionRefs} />
              <ClosingSection onOpenAA={openAA} />
              <footer className="site-footer">
                <div className="site-footer-brand">SyncAI Technologies</div>
                <div className="site-footer-details">
                  <div className="site-footer-line">📍 Address: 2nd Floor, SBR CV Towers, 203, Madhapur, Hyderabad, Telangana 500081, India 📍</div>
                  <div className="site-footer-line">email: <a href="mailto:contact@syncai.company">contact@syncai.company</a></div>
                  <div className="site-footer-line">phone: 8309832821</div>
                  <div className="site-footer-line">website: <a href="https://syncai.company">https://syncai.company</a></div>
                </div>
              </footer>

            </div>
          </div>
        </div>

        {/* ALL-ACCESS PANEL */}
        <AllAccessPanel open={aaPanel.open} onClose={closeAA} contextStack={aaPanel.stack} enabled={aaEnabled} onEnable={enableAA} />

        {/* GLOBAL HOVER DETAIL */}
        <HoverDetail agent={hoverData.agent} position={hoverData.position} visible={hoverData.visible} />
      </div>
    </>
  );
}
