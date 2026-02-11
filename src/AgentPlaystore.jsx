import { useState, useEffect, useRef } from "react";

// --- ENRICHED DATA ---
const AGENTS = [
  { id: 1, name: "ResearchBot Pro", tagline: "Deep web research & synthesis", category: "Research", rating: 4.9, users: "12.4k", icon: "🔬", color: "#6C5CE7", featured: true, new: false, trending: true, price: "Free", author: "DeepMind Labs",
    solves: "Eliminates hours of manual research by crawling, extracting, and synthesizing information across hundreds of sources in minutes.",
    capabilities: ["Web crawling", "Source synthesis", "Citation generation", "Fact verification", "Trend detection"],
    useCases: ["Market research analysts", "Academic researchers", "Journalists on deadline", "Due diligence teams"],
    pairsWith: ["TranslatePro", "DocParser", "ChartForge"] },
  { id: 2, name: "CodeWeaver", tagline: "Full-stack code generation & refactoring", category: "Development", rating: 4.8, users: "31.2k", icon: "⚡", color: "#00B894", featured: true, new: false, trending: true, price: "$12/mo", author: "Synthex",
    solves: "Turns rough specs into production code. Refactors legacy systems without breaking existing tests.",
    capabilities: ["Code generation", "Refactoring", "Migration", "Documentation", "Code review"],
    useCases: ["Solo developers shipping fast", "Teams modernizing legacy code", "Startups building MVPs"],
    pairsWith: ["TestPilot", "Debugger X", "APIForge"] },
  { id: 3, name: "DataForge", tagline: "Transform messy data into structured insights", category: "Data", rating: 4.7, users: "8.9k", icon: "📊", color: "#E17055", featured: false, new: true, trending: false, price: "Free", author: "Parsec AI",
    solves: "Takes chaotic CSVs, JSONs, and spreadsheets and normalizes them into clean, queryable datasets.",
    capabilities: ["Schema detection", "Data cleaning", "Format conversion", "Anomaly flagging", "Batch processing"],
    useCases: ["Data engineers with messy imports", "Analysts unifying data sources", "Ops teams fixing pipeline breaks"],
    pairsWith: ["QueryMaster", "ChartForge", "DocParser"] },
  { id: 4, name: "PixelMind", tagline: "Generate & edit production-ready visuals", category: "Creative", rating: 4.6, users: "22.1k", icon: "🎨", color: "#FD79A8", featured: true, new: false, trending: true, price: "$8/mo", author: "ArtStack",
    solves: "Bridges the gap between idea and visual asset. Generates, edits, and iterates on images without needing a designer.",
    capabilities: ["Image generation", "Style transfer", "Background removal", "Batch resizing", "Brand consistency"],
    useCases: ["Marketing teams needing assets fast", "Indie devs creating game art", "Content creators on tight schedules"],
    pairsWith: ["ContentEngine", "DesignSystem AI", "MailCraft"] },
  { id: 5, name: "LegalEagle", tagline: "Contract review & legal document drafting", category: "Legal", rating: 4.5, users: "5.3k", icon: "⚖️", color: "#636E72", featured: false, new: false, trending: false, price: "$20/mo", author: "JurisAI",
    solves: "Catches risky clauses, flags missing terms, and drafts standard agreements in minutes instead of billable hours.",
    capabilities: ["Clause extraction", "Risk scoring", "Template drafting", "Compliance checks", "Redline comparison"],
    useCases: ["Startup founders reviewing contracts", "Legal ops teams scaling reviews", "Procurement departments"],
    pairsWith: ["DocParser", "MailCraft", "MeetingMind"] },
  { id: 6, name: "MailCraft", tagline: "Smart email composition & inbox triage", category: "Productivity", rating: 4.4, users: "45.6k", icon: "✉️", color: "#0984E3", featured: false, new: false, trending: true, price: "Free", author: "FlowState",
    solves: "Writes contextual replies, prioritizes your inbox by urgency, and drafts outreach that actually gets opened.",
    capabilities: ["Smart replies", "Priority sorting", "Template generation", "Tone adjustment", "Follow-up scheduling"],
    useCases: ["Executives drowning in email", "Sales reps doing outreach", "Support teams triaging tickets"],
    pairsWith: ["SalesOracle", "MeetingMind", "SlackPilot"] },
  { id: 7, name: "VoiceClone Studio", tagline: "Real-time voice synthesis & adaptation", category: "Audio", rating: 4.8, users: "9.7k", icon: "🎙️", color: "#A29BFE", featured: true, new: true, trending: true, price: "$15/mo", author: "SonicAI",
    solves: "Creates natural-sounding voiceovers and audio content without recording sessions or professional studios.",
    capabilities: ["Voice cloning", "Real-time synthesis", "Multi-language dub", "Emotion control", "Audio post-processing"],
    useCases: ["Podcasters scaling content", "E-learning creators", "Game developers needing character voices"],
    pairsWith: ["ContentEngine", "TranslatePro", "TutorBot"] },
  { id: 8, name: "QueryMaster", tagline: "Natural language to SQL with schema awareness", category: "Data", rating: 4.3, users: "14.8k", icon: "🗄️", color: "#00CEC9", featured: false, new: false, trending: false, price: "Free", author: "TableTech",
    solves: "Lets anyone ask questions of a database in plain English. Understands your schema and writes optimized queries.",
    capabilities: ["NL-to-SQL", "Schema mapping", "Query optimization", "Result explanation", "Join suggestion"],
    useCases: ["Product managers pulling metrics", "Analysts without SQL skills", "Data teams reducing ticket load"],
    pairsWith: ["DataForge", "ChartForge", "DocParser"] },
  { id: 9, name: "MeetingMind", tagline: "Live transcription, summaries & action items", category: "Productivity", rating: 4.7, users: "28.3k", icon: "📋", color: "#FDCB6E", featured: false, new: false, trending: true, price: "$6/mo", author: "Clarity AI",
    solves: "Turns meetings from time sinks into searchable records with clear owners and next steps.",
    capabilities: ["Live transcription", "Summary generation", "Action extraction", "Decision logging", "Speaker tagging"],
    useCases: ["PMs running standups", "Execs in back-to-back calls", "Remote teams needing async recaps"],
    pairsWith: ["SlackPilot", "MailCraft", "Scheduler AI"] },
  { id: 10, name: "SecuritySentinel", tagline: "Continuous vulnerability scanning & patching", category: "Security", rating: 4.9, users: "6.1k", icon: "🛡️", color: "#D63031", featured: true, new: false, trending: false, price: "$25/mo", author: "FortressAI",
    solves: "Monitors your infrastructure 24/7 for vulnerabilities and generates patch recommendations before exploits happen.",
    capabilities: ["Vuln scanning", "Patch generation", "Threat modeling", "Compliance mapping", "Incident alerting"],
    useCases: ["Security teams with large surface areas", "DevOps managing cloud infra", "CTOs needing compliance proof"],
    pairsWith: ["InfraWatch", "TestPilot", "APIForge"] },
  { id: 11, name: "TranslatePro", tagline: "Context-aware translation across 95 languages", category: "Language", rating: 4.6, users: "19.4k", icon: "🌐", color: "#74B9FF", featured: false, new: false, trending: false, price: "Free", author: "LinguaNet",
    solves: "Goes beyond word-for-word translation — preserves idiom, tone, and cultural nuance across languages.",
    capabilities: ["Context translation", "Tone preservation", "Glossary enforcement", "Batch translation", "Quality scoring"],
    useCases: ["Localization teams", "Global customer support", "Researchers reading foreign papers"],
    pairsWith: ["ResearchBot Pro", "ContentEngine", "VoiceClone Studio"] },
  { id: 12, name: "DesignSystem AI", tagline: "Auto-generate consistent component libraries", category: "Design", rating: 4.5, users: "7.8k", icon: "🧩", color: "#E84393", featured: false, new: true, trending: false, price: "$10/mo", author: "ComponentLab",
    solves: "Generates and maintains a living design system — tokens, components, and documentation that stays in sync.",
    capabilities: ["Token generation", "Component creation", "Doc generation", "Consistency auditing", "Figma sync"],
    useCases: ["Design teams scaling systems", "Startups building from scratch", "Agencies managing multiple brands"],
    pairsWith: ["PixelMind", "CodeWeaver", "APIForge"] },
  { id: 13, name: "FinanceBot", tagline: "Portfolio analysis & market signal detection", category: "Finance", rating: 4.4, users: "11.2k", icon: "💹", color: "#2ED573", featured: false, new: false, trending: true, price: "$18/mo", author: "AlphaStack",
    solves: "Surfaces actionable market signals from noise. Analyzes holdings, detects patterns, and flags risk exposure.",
    capabilities: ["Portfolio analysis", "Signal detection", "Risk scoring", "Sector mapping", "Alert generation"],
    useCases: ["Individual investors tracking portfolios", "Analysts monitoring sectors", "Finance teams doing reporting"],
    pairsWith: ["DataForge", "ChartForge", "ResearchBot Pro"] },
  { id: 14, name: "DocParser", tagline: "Extract structured data from any document", category: "Data", rating: 4.7, users: "16.5k", icon: "📄", color: "#FF6348", featured: false, new: false, trending: false, price: "Free", author: "Parsec AI",
    solves: "Reads PDFs, scans, images, and forms — extracts tables, fields, and entities into structured output.",
    capabilities: ["OCR extraction", "Table detection", "Entity recognition", "Form parsing", "Batch processing"],
    useCases: ["Ops teams digitizing paperwork", "Legal teams processing filings", "Finance teams handling invoices"],
    pairsWith: ["DataForge", "LegalEagle", "QueryMaster"] },
  { id: 15, name: "TestPilot", tagline: "Auto-generate test suites from codebases", category: "Development", rating: 4.3, users: "4.2k", allAccess: true, icon: "🧪", color: "#7BED9F", featured: false, new: true, trending: false, price: "$9/mo", author: "QualityForge",
    solves: "Reads your codebase and generates comprehensive test suites — unit, integration, and edge cases you'd miss.",
    capabilities: ["Test generation", "Coverage analysis", "Edge case detection", "Regression testing", "CI integration"],
    useCases: ["Teams with low test coverage", "Developers shipping faster", "QA engineers automating suites"],
    pairsWith: ["CodeWeaver", "Debugger X", "SecuritySentinel"] },
  { id: 16, name: "ContentEngine", tagline: "Blog posts, social copy & content calendars", category: "Marketing", rating: 4.6, users: "33.7k", icon: "✍️", color: "#FF9FF3", featured: true, new: false, trending: true, price: "Free", author: "NarrativeAI",
    solves: "Turns ideas into publish-ready content. Maintains brand voice across channels and formats.",
    capabilities: ["Long-form writing", "Social copy", "Calendar planning", "SEO optimization", "Voice matching"],
    useCases: ["Marketing teams scaling output", "Solopreneurs building presence", "Agencies managing multiple clients"],
    pairsWith: ["PixelMind", "MailCraft", "TranslatePro"] },
  { id: 17, name: "APIForge", tagline: "Design, mock & document APIs from specs", category: "Development", rating: 4.5, users: "8.4k", icon: "🔗", color: "#48DBFB", featured: false, new: false, trending: false, price: "$7/mo", author: "Synthex",
    solves: "Goes from API sketch to documented, mocked, and testable endpoints — before writing implementation code.",
    capabilities: ["Spec generation", "Mock servers", "Doc generation", "Schema validation", "Versioning"],
    useCases: ["Backend teams designing APIs", "Frontend devs needing mocks", "Platform teams managing contracts"],
    pairsWith: ["CodeWeaver", "TestPilot", "DesignSystem AI"] },
  { id: 18, name: "SalesOracle", tagline: "Lead scoring, outreach & pipeline forecasting", category: "Sales", rating: 4.4, users: "10.9k", icon: "📈", color: "#FF6B6B", featured: false, new: false, trending: true, price: "$14/mo", author: "DealFlow AI",
    solves: "Prioritizes your pipeline by win probability and generates personalized outreach that converts.",
    capabilities: ["Lead scoring", "Outreach generation", "Pipeline forecasting", "Win analysis", "CRM enrichment"],
    useCases: ["SDRs managing large pipelines", "Sales managers forecasting", "Founders doing their own sales"],
    pairsWith: ["CRMLink", "MailCraft", "MeetingMind"] },
  { id: 19, name: "InfraWatch", tagline: "Cloud resource optimization & cost alerts", category: "DevOps", rating: 4.8, users: "7.1k", icon: "☁️", color: "#5F27CD", featured: false, new: true, trending: false, price: "$22/mo", author: "CloudPilot",
    solves: "Finds wasted cloud spend, right-sizes resources, and alerts you before bills spike.",
    capabilities: ["Cost analysis", "Resource right-sizing", "Anomaly detection", "Budget alerts", "Multi-cloud support"],
    useCases: ["DevOps teams managing AWS/GCP", "CTOs controlling cloud costs", "Platform teams optimizing infra"],
    pairsWith: ["SecuritySentinel", "TestPilot", "Debugger X"] },
  { id: 20, name: "TutorBot", tagline: "Adaptive learning paths & knowledge checks", category: "Education", rating: 4.7, users: "41.3k", icon: "🎓", color: "#1DD1A1", featured: true, new: false, trending: true, price: "Free", author: "LearnPath",
    solves: "Creates personalized curricula that adapt to how you learn, filling gaps and reinforcing weak spots.",
    capabilities: ["Adaptive paths", "Knowledge testing", "Gap analysis", "Progress tracking", "Content generation"],
    useCases: ["Self-taught developers", "Students preparing for exams", "Teams onboarding new hires"],
    pairsWith: ["ResearchBot Pro", "VoiceClone Studio", "ContentEngine"] },
  { id: 21, name: "Scheduler AI", tagline: "Calendar optimization & smart scheduling", category: "Productivity", rating: 4.3, users: "25.6k", icon: "📅", color: "#F368E0", featured: false, new: false, trending: false, price: "Free", author: "FlowState",
    solves: "Eliminates scheduling ping-pong. Finds optimal meeting times, protects focus blocks, and prevents burnout.",
    capabilities: ["Calendar optimization", "Focus time protection", "Time zone handling", "Conflict resolution", "Meeting scoring"],
    useCases: ["Managers with packed calendars", "Remote teams across time zones", "Freelancers juggling clients"],
    pairsWith: ["MeetingMind", "MailCraft", "SlackPilot"] },
  { id: 22, name: "ImageDescribe", tagline: "Detailed image analysis & alt-text generation", category: "Accessibility", rating: 4.5, users: "3.8k", icon: "👁️", color: "#EE5A24", featured: false, new: true, trending: false, price: "Free", author: "VisionStack",
    solves: "Makes visual content accessible by generating accurate, nuanced descriptions for screen readers and search engines.",
    capabilities: ["Alt-text generation", "Scene description", "Object detection", "Color analysis", "Context inference"],
    useCases: ["Web teams meeting WCAG standards", "Content managers handling media", "E-commerce with product images"],
    pairsWith: ["PixelMind", "ContentEngine", "DesignSystem AI"] },
  { id: 23, name: "PromptSmith", tagline: "Craft, test & version control prompts", category: "AI Tools", rating: 4.8, users: "18.9k", icon: "🔧", color: "#B33771", featured: true, new: false, trending: true, price: "$5/mo", author: "MetaPrompt",
    solves: "Turns prompt engineering from guesswork into a repeatable process with versioning, testing, and rollback.",
    capabilities: ["Prompt authoring", "A/B testing", "Version control", "Performance scoring", "Template library"],
    useCases: ["AI engineers optimizing prompts", "Product teams building AI features", "Researchers testing hypotheses"],
    pairsWith: ["CodeWeaver", "ResearchBot Pro", "TutorBot"] },
  { id: 24, name: "ChartForge", tagline: "Data visualization from natural language", category: "Data", rating: 4.6, users: "12.7k", icon: "📉", color: "#6AB04C", featured: false, new: false, trending: false, price: "Free", author: "Parsec AI",
    solves: "Describe the chart you want in words and get publication-ready visualizations. No design or coding needed.",
    capabilities: ["Chart generation", "Style customization", "Data binding", "Export formats", "Interactive mode"],
    useCases: ["Analysts building reports", "PMs preparing board decks", "Data journalists telling stories"],
    pairsWith: ["DataForge", "QueryMaster", "ContentEngine"] },
  { id: 25, name: "CRMLink", tagline: "Unified customer view across all channels", category: "Sales", rating: 4.4, users: "9.3k", icon: "🤝", color: "#22A6B3", featured: false, new: false, trending: false, price: "$16/mo", author: "DealFlow AI",
    solves: "Merges fragmented customer data into a single timeline — every touchpoint, every channel, one view.",
    capabilities: ["Data unification", "Timeline building", "Enrichment", "Dedup", "Cross-channel tracking"],
    useCases: ["Sales teams needing full context", "Customer success managers", "Revenue ops building reports"],
    pairsWith: ["SalesOracle", "MailCraft", "MeetingMind"] },
  { id: 26, name: "Debugger X", tagline: "Automated bug detection & fix suggestions", category: "Development", rating: 4.7, users: "15.1k", icon: "🐛", color: "#F9CA24", featured: false, new: false, trending: true, price: "$11/mo", author: "Synthex",
    solves: "Finds bugs before your users do. Scans code for logic errors, race conditions, and edge cases with fix suggestions.",
    capabilities: ["Bug detection", "Fix suggestion", "Root cause analysis", "Pattern matching", "CI integration"],
    useCases: ["Teams debugging production issues", "Developers reviewing PRs", "QA engineers triaging bugs"],
    pairsWith: ["CodeWeaver", "TestPilot", "SecuritySentinel"] },
  { id: 27, name: "ResumeForge", tagline: "ATS-optimized resume building & review", category: "Career", rating: 4.5, users: "20.4k", icon: "📝", color: "#686DE0", featured: false, new: false, trending: false, price: "Free", author: "HireReady",
    solves: "Gets resumes past ATS filters and in front of humans. Tailors content to specific job descriptions.",
    capabilities: ["ATS optimization", "Keyword matching", "Format suggestions", "Tailoring", "Score prediction"],
    useCases: ["Job seekers applying at scale", "Career changers repositioning", "Recruiters coaching candidates"],
    pairsWith: ["ContentEngine", "MailCraft", "ResearchBot Pro"] },
  { id: 28, name: "SlackPilot", tagline: "Smart thread summaries & channel insights", category: "Productivity", rating: 4.6, users: "13.6k", icon: "💬", color: "#4A154B", featured: false, new: true, trending: true, price: "$4/mo", author: "FlowState",
    solves: "Tames noisy Slack workspaces. Surfaces what matters, summarizes long threads, and tracks decisions.",
    capabilities: ["Thread summarization", "Channel digests", "Decision tracking", "Priority filtering", "Search enhancement"],
    useCases: ["Remote teams in Slack-heavy orgs", "Managers tracking cross-team threads", "New hires catching up"],
    pairsWith: ["MeetingMind", "MailCraft", "Scheduler AI"] },
];

const STACKS = [
  { id: 101, name: "Full-Stack Dev Kit", description: "CodeWeaver + TestPilot + APIForge + Debugger X", agents: [2, 15, 17, 26], icon: "🏗️", color: "#00B894", users: "4.2k", allAccess: true,
    solves: "Everything a developer needs from spec to shipped feature — generation, testing, API design, and debugging in one flow.",
    useCases: ["Solo devs building full products", "Small teams without dedicated QA"] },
  { id: 102, name: "Content Studio", description: "ContentEngine + PixelMind + MailCraft", agents: [16, 4, 6], icon: "🎬", color: "#E84393", users: "6.8k", allAccess: true,
    solves: "Write, design, and distribute content without switching between six different tools.",
    useCases: ["Marketing teams of one", "Content agencies scaling output"] },
  { id: 103, name: "Data Pipeline", description: "DocParser + QueryMaster + DataForge + ChartForge", agents: [14, 8, 3, 24], icon: "🔄", color: "#0984E3", users: "3.1k", allAccess: true,
    solves: "From raw documents to polished dashboards — ingest, clean, query, and visualize without writing ETL code.",
    useCases: ["Data teams reducing pipeline time", "Analysts building self-serve reports"] },
  { id: 104, name: "Sales Machine", description: "SalesOracle + CRMLink + MailCraft + MeetingMind", agents: [18, 25, 6, 9], icon: "🚀", color: "#FF6B6B", users: "2.9k", allAccess: true,
    solves: "Score leads, unify customer data, craft outreach, and capture meeting notes — the full sales motion automated.",
    useCases: ["SDR teams at startups", "Account executives managing enterprise deals"] },
  { id: 105, name: "Security Suite", description: "SecuritySentinel + InfraWatch + TestPilot", agents: [10, 19, 15], icon: "🔒", color: "#D63031", users: "1.7k", allAccess: true,
    solves: "Continuous security posture — scan for vulnerabilities, monitor infrastructure, and ensure test coverage.",
    useCases: ["Security teams at scale", "Startups preparing for SOC2"] },
  { id: 106, name: "Researcher's Toolkit", description: "ResearchBot Pro + TranslatePro + DocParser", agents: [1, 11, 14], icon: "📚", color: "#6C5CE7", users: "5.4k", allAccess: true,
    solves: "Research across languages and document formats. Crawl, translate, extract, and synthesize from any source.",
    useCases: ["Academic researchers", "Competitive intelligence teams"] },
];

const COLLECTIONS = [
  { id: 201, name: "Weekend Builders", description: "Ship a side project in 48 hours", count: 8, color: "#FDCB6E", curator: "Agent Playstore Team" },
  { id: 202, name: "Zero to Production", description: "Everything you need from idea to deploy", count: 12, color: "#6C5CE7", curator: "DevOps Weekly" },
  { id: 203, name: "Solopreneur Essentials", description: "Run your business with AI teammates", count: 10, color: "#00B894", curator: "IndieHacker AI" },
  { id: 204, name: "The Creative's Stack", description: "Design, write, and ship visual content", count: 7, color: "#E84393", curator: "Agent Playstore Team" },
  { id: 205, name: "Enterprise Ready", description: "Security-first agents for teams of 100+", count: 9, color: "#636E72", curator: "TechCrunch AI" },
];

const INTEGRATIONS = [
  { id: 301, name: "Slack", icon: "💬", color: "#4A154B", agents: 24 },
  { id: 302, name: "GitHub", icon: "🐙", color: "#24292E", agents: 18 },
  { id: 303, name: "Notion", icon: "📓", color: "#191919", agents: 15 },
  { id: 304, name: "Google Workspace", icon: "🟡", color: "#4285F4", agents: 31 },
  { id: 305, name: "Figma", icon: "🎨", color: "#A259FF", agents: 9 },
  { id: 306, name: "Jira", icon: "📋", color: "#0052CC", agents: 21 },
  { id: 307, name: "Salesforce", icon: "☁️", color: "#00A1E0", agents: 14 },
  { id: 308, name: "Linear", icon: "🔷", color: "#5E6AD2", agents: 12 },
  { id: 309, name: "Vercel", icon: "▲", color: "#171717", agents: 8 },
  { id: 310, name: "AWS", icon: "🔶", color: "#FF9900", agents: 27 },
];

const SECTION_META = {
  featured: { headline: "Featured Agents", rationale: "Hand-picked by the Playstore team for quality, polish, and impact." },
  trending: { headline: "Trending Now", rationale: "The agents gaining the most momentum this week — installs, stars, and chatter." },
  stacks: { headline: "Popular Stacks", rationale: "Pre-assembled agent combinations that teams actually use together." },
  newArrivals: { headline: "New Arrivals", rationale: "Just landed. Fresh capabilities that haven't been discovered yet." },
  collections: { headline: "Curated Collections", rationale: "Themed bundles assembled by editors and the community around real workflows." },
  free: { headline: "Free to Use", rationale: "Fully functional agents with no subscription. Start building now." },
  integrations: { headline: "Connect Your Tools", rationale: "Find agents that plug into the tools already running your workflow." },
  topRated: { headline: "Top Rated", rationale: "Consistently rated highest by the community over the last 90 days." },
  developers: { headline: "For Developers", rationale: "Code generation, testing, debugging, and deployment — the builder's shelf." },
  editorsPick: { headline: "Editor's Pick", rationale: "Agents that surprised us this month — unexpected quality in unexpected categories." },
  data: { headline: "Data & Analytics", rationale: "Parse, transform, query, and visualize. The full data lifecycle in agent form." },
  productivity: { headline: "Productivity & Workflow", rationale: "Automate the tasks that eat your day — email, scheduling, meetings, Slack." },
  popular: { headline: "Most Popular", rationale: "Highest active user counts across the platform. What everyone else is using." },
  teamStacks: { headline: "Stacks for Teams", rationale: "Multi-agent setups designed for collaborative, cross-functional workflows." },
  recentlyUpdated: { headline: "Recently Updated", rationale: "Fresh releases shipped this week — new features, fixes, and improvements." },
  communityPicks: { headline: "Community Picks", rationale: "Top-voted by Playstore users. The crowd's favorites, not ours." },
  security: { headline: "Security & Compliance", rationale: "Enterprise-grade agents for teams where trust, auditability, and uptime matter." },
  explore: { headline: "Keep Exploring", rationale: "The catalog doesn't end here. More agents, more stacks, more possibilities." },
  pairsWell: { headline: "Pairs Well Together", rationale: "Agents that get better when used alongside each other." },
  risingStar: { headline: "Rising Stars", rationale: "Low user count, high ratings. Early bets that could become essentials." },
  allAccessStacks: { headline: "All-Access Reference Stacks", rationale: "Pre-configured capability stacks available for immediate execution with All-Access." },
};

// --- ALL-ACCESS PANEL ---
function AllAccessPanel({ open, onClose, contextStack, enabled, onEnable }) {
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
                    ? <span className="aa-sts-on"><span className="aa-dot aa-dot-on" style={{display:'inline-block',marginRight:6}} />Enabled</span>
                    : <span className="aa-sts-off"><span className="aa-dot aa-dot-off" style={{display:'inline-block',marginRight:6}} />Not enabled</span>}
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
              <button className="aa-pri-btn" onClick={onEnable}><span style={{fontSize:11}}>◆</span> Unlock All-Access</button>
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

// --- HOVER DETAIL PANEL ---
function HoverDetail({ agent, position, visible }) {
  if (!visible || !agent) return null;
  return (
    <div className="hover-detail" style={{ top: position.top, left: position.left, opacity: visible ? 1 : 0 }}>
      <div className="hover-detail-header">
        <span className="hover-detail-icon" style={{ background: agent.color + "22" }}>{agent.icon}</span>
        <div>
          <div className="hover-detail-name">{agent.name}</div>
          <div className="hover-detail-author">by {agent.author}</div>
        </div>
      </div>
      <div className="hover-detail-solves">{agent.solves}</div>
      <div className="hover-detail-section">
        <div className="hover-detail-label">Capabilities</div>
        <div className="hover-detail-pills">
          {agent.capabilities.map(c => (
            <span key={c} className="hover-detail-pill" style={{ background: agent.color + "15", color: agent.color, borderColor: agent.color + "30" }}>{c}</span>
          ))}
        </div>
      </div>
      <div className="hover-detail-section">
        <div className="hover-detail-label">Best for</div>
        <div className="hover-detail-usecases">
          {agent.useCases.map(u => <div key={u} className="hover-detail-usecase">→ {u}</div>)}
        </div>
      </div>
      <div className="hover-detail-section">
        <div className="hover-detail-label">Pairs with</div>
        <div className="hover-detail-pairs">
          {agent.pairsWith.map(p => <span key={p} className="hover-detail-pair">{p}</span>)}
        </div>
      </div>
    </div>
  );
}

// --- CARD COMPONENTS WITH HOVER ---

function useCardHover() {
  const [hoverData, setHoverData] = useState({ agent: null, position: { top: 0, left: 0 }, visible: false });
  const timeoutRef = useRef(null);
  const cardRef = useRef(null);

  const onEnter = (agent, e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;
      const left = spaceRight > 340 ? rect.right + 8 : rect.left - 340;
      const top = Math.min(rect.top, window.innerHeight - 380);
      setHoverData({ agent, position: { top, left }, visible: true });
    }, 420);
  };

  const onLeave = () => {
    clearTimeout(timeoutRef.current);
    setHoverData(prev => ({ ...prev, visible: false }));
  };

  return { hoverData, onEnter, onLeave, cardRef };
}

function CompactCard({ agent, onHoverEnter, onHoverLeave }) {
  return (
    <div className="compact-card" style={{ "--accent": agent.color }}
      onMouseEnter={e => onHoverEnter(agent, e)} onMouseLeave={onHoverLeave}>
      <div className="compact-card-icon" style={{ background: agent.color + "18", borderColor: agent.color + "35" }}>
        <span>{agent.icon}</span>
      </div>
      <div className="compact-card-info">
        <div className="compact-card-name">{agent.name}</div>
        <div className="compact-card-tagline">{agent.tagline}</div>
        <div className="compact-card-meta">
          <span className="compact-card-rating">★ {agent.rating}</span>
          <span className="compact-card-users">{agent.users}</span>
          <span className="compact-card-price" style={{ color: agent.price === "Free" ? "#1DD1A1" : "#A29BFE" }}>{agent.price}</span>
        </div>
      </div>
      {agent.new && <span className="badge-new">NEW</span>}
      {agent.trending && !agent.new && <span className="badge-trending">🔥</span>}
    </div>
  );
}

function MediumCard({ agent, onHoverEnter, onHoverLeave }) {
  return (
    <div className="medium-card" style={{ "--accent": agent.color }}
      onMouseEnter={e => onHoverEnter(agent, e)} onMouseLeave={onHoverLeave}>
      <div className="medium-card-header">
        <div className="medium-card-icon" style={{ background: `linear-gradient(135deg, ${agent.color}28, ${agent.color}0A)`, borderColor: agent.color + "40" }}>
          <span>{agent.icon}</span>
        </div>
        <div className="medium-card-badges">
          {agent.new && <span className="badge-new">NEW</span>}
          {agent.trending && <span className="badge-trending">🔥</span>}
        </div>
      </div>
      <div className="medium-card-name">{agent.name}</div>
      <div className="medium-card-tagline">{agent.tagline}</div>
      <div className="medium-card-capabilities">
        {agent.capabilities.slice(0, 3).map(c => (
          <span key={c} className="capability-dot" style={{ background: agent.color + "22", color: agent.color }}>{c}</span>
        ))}
      </div>
      <div className="medium-card-footer">
        <span className="medium-card-category" style={{ background: agent.color + "18", color: agent.color }}>{agent.category}</span>
        <span className="medium-card-rating">★ {agent.rating}</span>
        <span className="medium-card-price" style={{ color: agent.price === "Free" ? "#1DD1A1" : "#A29BFE" }}>{agent.price}</span>
      </div>
      <div className="medium-card-author">by {agent.author}</div>
    </div>
  );
}

function LargeCard({ agent, onHoverEnter, onHoverLeave }) {
  return (
    <div className="large-card" style={{ "--accent": agent.color }}
      onMouseEnter={e => onHoverEnter(agent, e)} onMouseLeave={onHoverLeave}>
      <div className="large-card-glow" style={{ background: `radial-gradient(ellipse at 30% 20%, ${agent.color}25, transparent 70%)` }} />
      <div className="large-card-content">
        <div className="large-card-top">
          <div className="large-card-icon" style={{ background: `linear-gradient(135deg, ${agent.color}, ${agent.color}77)` }}>
            <span>{agent.icon}</span>
          </div>
          <div className="large-card-badges">
            {agent.new && <span className="badge-new">NEW</span>}
            {agent.trending && <span className="badge-trending-lg">TRENDING</span>}
            <span className="badge-featured">⭐ FEATURED</span>
          </div>
        </div>
        <div className="large-card-name">{agent.name}</div>
        <div className="large-card-tagline">{agent.tagline}</div>
        <div className="large-card-solves">{agent.solves}</div>
        <div className="large-card-capabilities">
          {agent.capabilities.map(c => (
            <span key={c} className="capability-chip" style={{ background: agent.color + "15", color: agent.color, borderColor: agent.color + "30" }}>{c}</span>
          ))}
        </div>
        <div className="large-card-meta">
          <span className="large-card-category" style={{ background: agent.color + "18", color: agent.color, borderColor: agent.color + "35" }}>{agent.category}</span>
          <span className="large-card-rating">★ {agent.rating}</span>
          <span className="large-card-users">{agent.users} users</span>
          <span className="large-card-price" style={{ color: agent.price === "Free" ? "#1DD1A1" : "#A29BFE" }}>{agent.price}</span>
        </div>
        <div className="large-card-author">by {agent.author}</div>
        <button className="large-card-btn" style={{ background: agent.color }}>Explore Agent →</button>
      </div>
    </div>
  );
}

function StackCard({ stack, aaEnabled, onAAClick }) {
  const stackAgents = stack.agents.map(id => AGENTS.find(a => a.id === id)).filter(Boolean);
  return (
    <div className="stack-card" style={{ "--accent": stack.color }}>
      <div className="stack-card-header">
        <div className="stack-card-icon" style={{ background: stack.color + "18", borderColor: stack.color + "35" }}>
          <span>{stack.icon}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {stack.allAccess && <span className="aa-badge">◆ All-Access</span>}
          <span className="stack-card-count">{stack.agents.length} agents</span>
        </div>
      </div>
      <div className="stack-card-name">{stack.name}</div>
      <div className="stack-card-desc">{stack.description}</div>
      <div className="stack-card-solves">{stack.solves}</div>
      <div className="stack-card-agents">
        {stackAgents.map(a => (
          <span key={a.id} className="stack-agent-pill" style={{ background: a.color + "18", color: a.color, borderColor: a.color + "28" }}>
            {a.icon} {a.name}
          </span>
        ))}
      </div>
      <div className="stack-card-usecases">
        {stack.useCases.map(u => <span key={u} className="stack-usecase">→ {u}</span>)}
      </div>
      <div className="stack-card-footer">
        <span className="stack-card-users">{stack.users} using this stack</span>
        {stack.allAccess && onAAClick && (
          <button className={`aa-run ${aaEnabled ? "aa-run-active" : ""}`}
            onClick={e => { e.stopPropagation(); onAAClick(stack); }}>
            <span className="aa-run-diamond">◆</span>
            {aaEnabled ? "Execute" : "Run with All-Access"}
          </button>
        )}
      </div>
    </div>
  );
}

function CollectionCard({ collection }) {
  return (
    <div className="collection-card" style={{ "--accent": collection.color }}>
      <div className="collection-card-stripe" style={{ background: `linear-gradient(135deg, ${collection.color}, ${collection.color}55)` }} />
      <div className="collection-card-body">
        <div className="collection-card-name">{collection.name}</div>
        <div className="collection-card-desc">{collection.description}</div>
        <div className="collection-card-meta">
          <span>{collection.count} agents</span>
          <span className="collection-card-curator">by {collection.curator}</span>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ integration }) {
  return (
    <div className="integration-card" style={{ "--accent": integration.color }}>
      <div className="integration-card-icon" style={{ background: integration.color + "18", borderColor: integration.color + "35" }}>
        <span>{integration.icon}</span>
      </div>
      <div className="integration-card-name">{integration.name}</div>
      <div className="integration-card-count">{integration.agents} agents</div>
    </div>
  );
}

function PairingCard({ agent1, agent2 }) {
  return (
    <div className="pairing-card">
      <div className="pairing-agents">
        <div className="pairing-agent">
          <span className="pairing-icon" style={{ background: agent1.color + "18" }}>{agent1.icon}</span>
          <span className="pairing-name">{agent1.name}</span>
        </div>
        <span className="pairing-plus">+</span>
        <div className="pairing-agent">
          <span className="pairing-icon" style={{ background: agent2.color + "18" }}>{agent2.icon}</span>
          <span className="pairing-name">{agent2.name}</span>
        </div>
      </div>
      <div className="pairing-why">
        {agent1.name.split(" ")[0]} handles {agent1.capabilities[0].toLowerCase()}, {agent2.name.split(" ")[0]} handles {agent2.capabilities[0].toLowerCase()}
      </div>
    </div>
  );
}

// --- Section ---
function Section({ sectionKey, children, variant = "default" }) {
  const meta = SECTION_META[sectionKey] || { headline: sectionKey, rationale: "" };
  return (
    <div className={`section section-${variant}`}>
      <div className="section-header">
        <div>
          <h2 className="section-title">{meta.headline}</h2>
          <p className="section-rationale">{meta.rationale}</p>
        </div>
        <button className="section-see-all">See all →</button>
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
}

function HorizontalShelf({ children }) {
  const ref = useRef(null);
  return (
    <div className="shelf-wrapper">
      <div className="shelf" ref={ref}>{children}</div>
    </div>
  );
}

// --- Main App ---
export default function AgentPlaystore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aaPanel, setAAPanel] = useState({ open: false, stack: null });
  const [aaEnabled, setAAEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);
  const storySectionRefs = useRef([]);
  const { hoverData, onEnter, onLeave } = useCardHover();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 320);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
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

  const featured = AGENTS.filter(a => a.featured);
  const newAgents = AGENTS.filter(a => a.new);
  const dataAgents = AGENTS.filter(a => a.category === "Data");
  const productivityAgents = AGENTS.filter(a => a.category === "Productivity");
  const mostPopular = [...AGENTS].sort((a, b) => parseFloat(b.users) - parseFloat(a.users)).slice(0, 8);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Instrument+Serif:ital@0;1&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg-primary: #09090E;
          --bg-secondary: #0E0E16;
          --bg-card: #141420;
          --bg-card-hover: #1A1A2A;
          --bg-elevated: #1C1C2C;
          --border-subtle: #1E1E30;
          --border-medium: #28283D;
          --text-primary: #E6E6F0;
          --text-secondary: #8585A0;
          --text-tertiary: #505068;
          --accent-primary: #7C6CFF;
          --accent-glow: #7C6CFF33;
          --aa: #B89A5C; --aa-dim: #B89A5C80; --aa-bg: #B89A5C14; --aa-border: #B89A5C33;
          --font-display: 'Instrument Serif', serif;
          --font-body: 'DM Sans', sans-serif;
          --topbar-height: 60px;
        }

        #root, .app-container {
          width: 100vw; height: 100vh; overflow: hidden;
          background: var(--bg-primary); color: var(--text-primary);
          font-family: var(--font-body); display: flex;
        }
        .app-container { flex-direction: column; }

        /* ===== MAIN ===== */
        .main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        /* ===== TOPBAR ===== */
        .topbar {
          height: var(--topbar-height); min-height: var(--topbar-height);
          border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center;
          padding: 0 24px; gap: 16px; background: var(--bg-secondary); z-index: 50;
        }
        .topbar-inner {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          display: flex; align-items: center; gap: 16px;
          min-width: 0;
        }
        .topbar-left { display: flex; align-items: center; gap: 18px; min-width: 0; }
        .topbar-logo { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .topbar-logo-icon { color: var(--accent-primary); font-size: 16px; }
        .topbar-logo-text { font-family: var(--font-display); font-size: 16px; letter-spacing: -0.01em; }
        .topbar-nav { display: flex; align-items: center; gap: 6px; }
        .topbar-nav-item {
          border: 1px solid transparent; background: transparent;
          color: var(--text-secondary); font-size: 12.5px; cursor: pointer;
          padding: 6px 10px; border-radius: 8px; transition: all 0.15s;
          font-family: var(--font-body);
        }
        .topbar-nav-item:hover { border-color: var(--border-medium); color: var(--text-primary); background: var(--bg-card); }
        .topbar-nav-primary { color: var(--accent-primary); border-color: #7C6CFF1A; background: #7C6CFF0D; }
        .topbar-nav-primary:hover { border-color: var(--accent-primary); }
        .topbar-search { flex: 1; max-width: 460px; position: relative; }
        .topbar-search input {
          width: 100%; height: 36px; border-radius: 9px; border: 1px solid var(--border-medium);
          background: var(--bg-card); color: var(--text-primary); padding: 0 14px 0 34px;
          font-size: 13px; font-family: var(--font-body); outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .topbar-search input::placeholder { color: var(--text-tertiary); }
        .topbar-search input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px var(--accent-glow); }
        .topbar-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); font-size: 13px; }
        .topbar-right { display: flex; align-items: center; gap: 10px; }
        .topbar-pill {
          display: flex; align-items: center; gap: 5px; padding: 5px 12px;
          border-radius: 18px; background: var(--bg-card); border: 1px solid var(--border-subtle);
          font-size: 12px; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .topbar-pill:hover { border-color: var(--accent-primary); color: var(--text-primary); }
        .topbar-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), #E84393);
          display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: pointer;
        }

        /* ===== SCROLL ===== */
        .scroll-area { flex: 1; overflow-y: auto; overflow-x: hidden; scroll-behavior: smooth; }
        .scroll-area::-webkit-scrollbar { width: 5px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
        .scroll-area::-webkit-scrollbar-thumb { background: var(--border-medium); border-radius: 3px; }
        .home-content {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          padding: 20px clamp(24px, 6vw, 96px) 140px;
          display: flex; flex-direction: column; gap: 32px;
        }

        /* ===== HERO ===== */
        .hero-section {
          position: relative; border-radius: 14px; overflow: hidden;
          background: linear-gradient(135deg, #10101C 0%, #181830 40%, #0E1520 100%);
          border: 1px solid var(--border-subtle); padding: 26px 28px; min-height: 150px;
        }
        .hero-glow { position: absolute; top: -50px; right: -40px; width: 280px; height: 280px; background: radial-gradient(circle, #7C6CFF15, transparent 70%); pointer-events: none; }
        .hero-glow-2 { position: absolute; bottom: -60px; left: 18%; width: 240px; height: 240px; background: radial-gradient(circle, #E8439315, transparent 70%); pointer-events: none; }
        .hero-title { font-family: var(--font-display); font-size: 34px; line-height: 1.12; margin-bottom: 8px; position: relative; letter-spacing: -0.02em; }
        .hero-title em { font-style: italic; color: var(--accent-primary); }
        .hero-subtitle { font-size: 13px; color: var(--text-secondary); line-height: 1.5; max-width: 520px; position: relative; }
        .hero-actions { display: flex; gap: 10px; margin-top: 10px; position: relative; }
        .hero-cta {
          padding: 7px 12px; border-radius: 8px; border: 1px solid var(--aa-border);
          background: var(--aa-bg); color: var(--aa); font-size: 12px; font-weight: 600;
          font-family: var(--font-body); cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .hero-cta:hover { border-color: var(--aa); background: #B89A5C24; }
        .hero-stats { display: flex; gap: 18px; margin-top: 14px; position: relative; }
        .hero-stat-value { font-size: 16px; font-weight: 600; color: var(--text-secondary); font-variant-numeric: tabular-nums; opacity: 0.7; }
        .hero-stat-label { font-size: 9.5px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; opacity: 0.7; }

        /* ===== SECTIONS ===== */
        .section { display: flex; flex-direction: column; gap: 14px; }
        .section-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
        .section-title { font-family: var(--font-display); font-size: 21px; letter-spacing: -0.01em; line-height: 1.2; }
        .section-rationale { font-size: 12.5px; color: var(--text-tertiary); margin-top: 3px; line-height: 1.4; max-width: 560px; }
        .section-see-all {
          background: none; border: none; color: var(--accent-primary); font-size: 12px;
          font-family: var(--font-body); cursor: pointer; padding: 4px 0; transition: opacity 0.15s; white-space: nowrap; flex-shrink: 0; margin-top: 4px;
        }
        .section-see-all:hover { opacity: 0.7; }
        .section-context { display: flex; flex-direction: column; gap: 2px; margin-top: 2px; }
        .section-context-title { font-family: var(--font-display); font-size: 34px; color: var(--text-primary); letter-spacing: -0.02em; line-height: 1.12; }
        .section-context-sub { font-size: 11.5px; color: var(--text-tertiary); }
        .shelf-stack { display: flex; flex-direction: column; gap: 14px; }
        .shelf-container {
          position: relative;
          padding: 18px 18px 22px;
          border-radius: 16px;
          background: linear-gradient(180deg, #0E0E18 0%, #0B0B12 100%);
          border: 1px solid var(--border-subtle);
          box-shadow: inset 0 8px 12px -12px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.02);
          display: flex; flex-direction: column; gap: 20px;
        }

        /* ===== NARRATIVE SECTIONS ===== */
        .narrative-sections { display: flex; flex-direction: column; gap: 28px; }
        .story-section {
          position: relative;
          border-radius: 18px;
          padding: 18px;
          border: 1px solid var(--border-subtle);
          box-shadow: inset 0 10px 16px -18px rgba(0,0,0,0.8), 0 22px 40px -36px rgba(0,0,0,0.8);
        }
        .story-section.story-start { background: linear-gradient(135deg, #0F101A, #0B0C14); }
        .story-section.story-learn { background: linear-gradient(135deg, #0E1320, #0A0D16); }
        .story-section.story-stabilize { background: linear-gradient(135deg, #0D1916, #0A0D12); }
        .story-section.story-bespoke { background: linear-gradient(135deg, #16130D, #0E0B08); }
        .story-grid {
          display: grid;
          grid-template-columns: minmax(280px, 0.34fr) minmax(0, 1fr);
          gap: 24px;
          align-items: start;
        }
        .story-narrative {
          position: sticky;
          top: calc(var(--topbar-height) + 12px);
          align-self: start;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .story-section[data-seen="true"] .story-narrative { opacity: 1; transform: translateY(0); }
        .story-shelves { display: flex; flex-direction: column; gap: 24px; }
        .narrative-block { gap: 12px; }
        .narrative-shelf-stack { display: flex; flex-direction: column; gap: 16px; }
        .narrative-shelf-grid { display: grid; gap: 12px; }
        .narrative-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .narrative-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .narrative-mini {
          padding: 14px;
          border-radius: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
        }
        .narrative-mini.emphasis {
          background: linear-gradient(160deg, #17172A, #11111D);
          border-color: #2B2B44;
        }
        .narrative-mini-kicker {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em;
          color: var(--text-tertiary); margin-bottom: 6px;
        }
        .narrative-mini-title { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
        .narrative-mini-body { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
        .narrative-stat-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        .narrative-stat {
          padding: 6px 8px; border-radius: 8px; background: #141420;
          border: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-secondary);
        }
        .narrative-callout {
          padding: 14px; border-radius: 12px;
          background: linear-gradient(135deg, rgba(124,108,255,0.12), rgba(184,154,92,0.1));
          border: 1px solid var(--aa-border);
          color: var(--text-secondary); font-size: 12.5px; line-height: 1.5;
        }
        .narrative-callout strong { color: var(--text-primary); font-weight: 600; }
        .narrative-steps { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; }
        .narrative-step { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-secondary); }
        .narrative-step-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-primary); flex-shrink: 0; }
        .narrative-kicker {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em;
          color: var(--text-tertiary);
        }
        .narrative-title {
          font-family: var(--font-display);
          font-size: 26px;
          line-height: 1.14;
          letter-spacing: -0.01em;
        }
        .narrative-body {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 520px;
        }
        .narrative-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .narrative-pill {
          font-size: 11px; color: var(--text-secondary);
          background: var(--bg-card); border: 1px solid var(--border-medium);
          border-radius: 999px; padding: 4px 10px;
        }
        .narrative-timeline {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px; margin-top: 4px;
        }
        .narrative-chip {
          background: var(--bg-card); border: 1px solid var(--border-medium);
          border-radius: 10px; padding: 8px 10px;
          font-size: 11px; color: var(--text-secondary); line-height: 1.4;
        }
        .narrative-chip strong { color: var(--text-primary); font-weight: 600; }
        .narrative-list { display: flex; flex-direction: column; gap: 6px; }
        .narrative-list-item { font-size: 12px; color: var(--text-secondary); display: flex; gap: 8px; align-items: center; }
        .narrative-list-item::before { content: ">"; color: var(--accent-primary); }

        /* ===== SHELF ===== */
        .shelf-wrapper { overflow: hidden; margin: 0 -4px; }
        .shelf {
          display: flex; gap: 12px; overflow-x: auto; padding: 4px 4px 10px;
          scroll-snap-type: x proximity; -ms-overflow-style: none; scrollbar-width: none;
        }
        .shelf::-webkit-scrollbar { display: none; }

        /* ===== GRIDS ===== */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

        /* ===== COMPACT CARD ===== */
        .compact-card {
          display: flex; align-items: center; gap: 11px; padding: 11px 13px;
          background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 11px;
          cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s; position: relative;
        }
        .compact-card:hover { background: var(--bg-card-hover); border-color: var(--accent); transform: translateY(-1px); }
        .compact-card-icon {
          width: 38px; height: 38px; border-radius: 9px; display: flex; align-items: center;
          justify-content: center; font-size: 17px; flex-shrink: 0; border: 1px solid;
        }
        .compact-card-info { min-width: 0; flex: 1; }
        .compact-card-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .compact-card-tagline { font-size: 11px; color: var(--text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
        .compact-card-meta { display: flex; gap: 7px; margin-top: 3px; font-size: 10.5px; }
        .compact-card-rating { color: #FDCB6E; }
        .compact-card-users { color: var(--text-tertiary); }
        .compact-card-price { font-weight: 600; }

        /* ===== MEDIUM CARD ===== */
        .medium-card {
          padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 12px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s;
          display: flex; flex-direction: column; gap: 5px; min-width: 210px; scroll-snap-align: start;
        }
        .medium-card:hover { background: var(--bg-card-hover); border-color: var(--accent); transform: translateY(-2px); }
        .medium-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .medium-card-icon {
          width: 44px; height: 44px; border-radius: 11px; display: flex; align-items: center;
          justify-content: center; font-size: 20px; border: 1px solid;
        }
        .medium-card-badges { display: flex; gap: 4px; }
        .medium-card-name { font-size: 14.5px; font-weight: 600; margin-top: 3px; }
        .medium-card-tagline { font-size: 12px; color: var(--text-tertiary); line-height: 1.35; }
        .medium-card-capabilities { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
        .capability-dot {
          font-size: 10px; padding: 2px 7px; border-radius: 4px; white-space: nowrap;
        }
        .medium-card-footer { display: flex; align-items: center; gap: 7px; margin-top: auto; padding-top: 5px; }
        .medium-card-category {
          font-size: 10px; padding: 2px 7px; border-radius: 5px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .medium-card-rating { font-size: 11px; color: #FDCB6E; }
        .medium-card-price { font-size: 11px; font-weight: 600; margin-left: auto; }
        .medium-card-author { font-size: 10.5px; color: var(--text-tertiary); }

        /* ===== LARGE CARD ===== */
        .large-card {
          position: relative; padding: 24px; background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 14px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s;
          overflow: hidden; min-width: 340px; scroll-snap-align: start;
        }
        .large-card:hover { background: var(--bg-card-hover); border-color: var(--accent); transform: translateY(-2px); }
        .large-card-glow { position: absolute; inset: 0; pointer-events: none; }
        .large-card-content { position: relative; display: flex; flex-direction: column; gap: 6px; }
        .large-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .large-card-icon {
          width: 52px; height: 52px; border-radius: 13px; display: flex; align-items: center;
          justify-content: center; font-size: 24px;
        }
        .large-card-badges { display: flex; gap: 5px; flex-wrap: wrap; justify-content: flex-end; }
        .large-card-name { font-family: var(--font-display); font-size: 21px; margin-top: 3px; }
        .large-card-tagline { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
        .large-card-solves { font-size: 12px; color: var(--text-tertiary); line-height: 1.45; margin-top: 2px; }
        .large-card-capabilities { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
        .capability-chip {
          font-size: 10.5px; padding: 3px 9px; border-radius: 5px; border: 1px solid; white-space: nowrap;
        }
        .large-card-meta { display: flex; align-items: center; gap: 9px; margin-top: 4px; flex-wrap: wrap; }
        .large-card-category {
          font-size: 10.5px; padding: 3px 9px; border-radius: 5px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid;
        }
        .large-card-rating { font-size: 12px; color: #FDCB6E; }
        .large-card-users { font-size: 11.5px; color: var(--text-tertiary); }
        .large-card-price { font-size: 12.5px; font-weight: 700; }
        .large-card-author { font-size: 11.5px; color: var(--text-tertiary); }
        .large-card-btn {
          margin-top: 6px; padding: 8px 18px; border-radius: 9px; border: none;
          color: white; font-size: 12.5px; font-weight: 600; font-family: var(--font-body);
          cursor: pointer; align-self: flex-start; transition: opacity 0.15s, transform 0.1s;
        }
        .large-card-btn:hover { opacity: 0.85; transform: translateY(-1px); }

        /* ===== STACK CARD ===== */
        .stack-card {
          padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 12px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s;
          display: flex; flex-direction: column; gap: 6px; min-width: 280px; scroll-snap-align: start;
        }
        .stack-card:hover { background: var(--bg-card-hover); border-color: var(--accent); transform: translateY(-2px); }
        .stack-card-header { display: flex; justify-content: space-between; align-items: center; }
        .stack-card-icon {
          width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center;
          justify-content: center; font-size: 19px; border: 1px solid;
        }
        .stack-card-count { font-size: 10.5px; color: var(--text-tertiary); background: var(--bg-elevated); padding: 2px 7px; border-radius: 5px; }
        .stack-card-name { font-size: 15px; font-weight: 600; }
        .stack-card-desc { font-size: 11.5px; color: var(--text-tertiary); line-height: 1.35; }
        .stack-card-solves { font-size: 11.5px; color: var(--text-secondary); line-height: 1.4; margin-top: 2px; font-style: italic; }
        .stack-card-agents { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
        .stack-agent-pill { font-size: 10.5px; padding: 2px 7px; border-radius: 5px; border: 1px solid; white-space: nowrap; }
        .stack-card-usecases { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; }
        .stack-usecase { font-size: 10.5px; color: var(--text-tertiary); }
        .stack-card-footer { margin-top: auto; padding-top: 5px; }
        .stack-card-users { font-size: 10.5px; color: var(--text-tertiary); }

        /* ===== COLLECTION CARD ===== */
        .collection-card {
          overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 12px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s;
          min-width: 230px; scroll-snap-align: start;
        }
        .collection-card:hover { background: var(--bg-card-hover); border-color: var(--accent); transform: translateY(-2px); }
        .collection-card-stripe { height: 5px; }
        .collection-card-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 4px; }
        .collection-card-name { font-size: 14px; font-weight: 600; }
        .collection-card-desc { font-size: 12px; color: var(--text-tertiary); }
        .collection-card-meta { display: flex; justify-content: space-between; margin-top: 5px; font-size: 10.5px; color: var(--text-tertiary); }
        .collection-card-curator { font-style: italic; }

        /* ===== INTEGRATION CARD ===== */
        .integration-card {
          display: flex; flex-direction: column; align-items: center; gap: 7px;
          padding: 16px 10px; background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 12px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s;
          text-align: center; min-width: 115px; scroll-snap-align: start;
        }
        .integration-card:hover { background: var(--bg-card-hover); border-color: var(--accent); transform: translateY(-2px); }
        .integration-card-icon {
          width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center;
          justify-content: center; font-size: 19px; border: 1px solid;
        }
        .integration-card-name { font-size: 12.5px; font-weight: 600; }
        .integration-card-count { font-size: 10.5px; color: var(--text-tertiary); }

        /* ===== PAIRING CARD ===== */
        .pairing-card {
          padding: 14px 16px; background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 12px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s;
          min-width: 260px; scroll-snap-align: start;
        }
        .pairing-card:hover { background: var(--bg-card-hover); border-color: var(--accent-primary); transform: translateY(-1px); }
        .pairing-agents { display: flex; align-items: center; gap: 10px; }
        .pairing-agent { display: flex; align-items: center; gap: 6px; }
        .pairing-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; }
        .pairing-name { font-size: 12.5px; font-weight: 600; white-space: nowrap; }
        .pairing-plus { font-size: 16px; color: var(--text-tertiary); font-weight: 300; }
        .pairing-why { font-size: 11px; color: var(--text-tertiary); margin-top: 8px; line-height: 1.35; }

        /* ===== BADGES ===== */
        .badge-new { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #1DD1A1; color: #000; letter-spacing: 0.04em; }
        .badge-trending { font-size: 11px; }
        .badge-trending-lg { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #FF6B6B1A; color: #FF6B6B; letter-spacing: 0.04em; }
        .badge-featured { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #FDCB6E1A; color: #FDCB6E; letter-spacing: 0.04em; }

        /* ===== FEATURED MIXED ===== */
        .featured-mixed { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 12px; }
        .featured-mixed > :first-child { grid-row: 1 / 3; }

        /* ===== DIVIDER ===== */
        .section-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--border-subtle), transparent); margin: 4px 0; }

        /* ===== CATEGORY PILLS ===== */
        .category-pills { display: flex; gap: 7px; flex-wrap: wrap; }
        .category-pill {
          padding: 5px 13px; border-radius: 18px; background: var(--bg-card);
          border: 1px solid var(--border-subtle); font-size: 12px; color: var(--text-secondary);
          cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .category-pill:hover { border-color: var(--accent-primary); color: var(--text-primary); background: #7C6CFF0A; }

        /* ===== HIGHLIGHT BANNER ===== */
        .highlight-banner {
          display: flex; align-items: center; gap: 16px; padding: 18px 22px;
          background: linear-gradient(135deg, #1A1A2E, #16213E); border: 1px solid var(--border-subtle);
          border-radius: 12px; cursor: pointer; transition: border-color 0.2s;
        }
        .highlight-banner:hover { border-color: var(--accent-primary); }
        .highlight-banner-icon { font-size: 28px; flex-shrink: 0; }
        .highlight-banner-text { flex: 1; }
        .highlight-banner-title { font-family: var(--font-display); font-size: 17px; font-style: italic; color: var(--accent-primary); }
        .highlight-banner-desc { font-size: 12.5px; color: var(--text-secondary); margin-top: 2px; }
        .highlight-banner-cta {
          padding: 7px 16px; border-radius: 8px; background: var(--accent-primary);
          color: white; font-size: 12px; font-weight: 600; border: none; cursor: pointer; white-space: nowrap;
        }

        /* ===== HOVER DETAIL PANEL ===== */
        .hover-detail {
          position: fixed; z-index: 1000; width: 320px;
          background: var(--bg-elevated); border: 1px solid var(--border-medium);
          border-radius: 14px; padding: 18px; box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,108,255,0.08);
          pointer-events: none; transition: opacity 0.2s ease;
          backdrop-filter: blur(12px);
        }
        .hover-detail-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .hover-detail-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .hover-detail-name { font-size: 14px; font-weight: 600; }
        .hover-detail-author { font-size: 11px; color: var(--text-tertiary); }
        .hover-detail-solves { font-size: 12px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle); }
        .hover-detail-section { margin-bottom: 10px; }
        .hover-detail-label { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-tertiary); margin-bottom: 5px; }
        .hover-detail-pills { display: flex; flex-wrap: wrap; gap: 4px; }
        .hover-detail-pill { font-size: 10.5px; padding: 2px 7px; border-radius: 4px; border: 1px solid; white-space: nowrap; }
        .hover-detail-usecases { display: flex; flex-direction: column; gap: 3px; }
        .hover-detail-usecase { font-size: 11px; color: var(--text-secondary); line-height: 1.35; }
        .hover-detail-pairs { display: flex; flex-wrap: wrap; gap: 5px; }
        .hover-detail-pair {
          font-size: 10.5px; padding: 2px 8px; border-radius: 4px;
          background: var(--accent-primary)12; color: var(--accent-primary); border: 1px solid var(--accent-glow);
        }

        /* ===== RESPONSIVE ===== */
        /* ALL-ACCESS TOPBAR — PROMINENT */
        .aa-topbar { display: flex; align-items: center; gap: 7px; padding: 6px 16px; border-radius: 20px; background: linear-gradient(135deg, rgba(124,108,255,0.1), rgba(184,154,92,0.12)); border: 1px solid var(--aa-border); cursor: pointer; transition: all 0.25s; white-space: nowrap; box-shadow: 0 0 12px rgba(124,108,255,0.12), inset 0 0 12px rgba(184,154,92,0.08); }
        .aa-topbar:hover { border-color: var(--aa); background: linear-gradient(135deg, rgba(124,108,255,0.16), rgba(184,154,92,0.18)); box-shadow: 0 0 18px rgba(124,108,255,0.18), inset 0 0 12px rgba(184,154,92,0.12); }
        .aa-topbar-diamond { color: var(--aa); font-size: 12px; filter: drop-shadow(0 0 4px var(--aa-dim)); }
        .aa-topbar-label { font-size: 12.5px; font-weight: 700; color: var(--aa); letter-spacing: .02em; }
        .aa-topbar-sep { color: var(--aa-border); font-size: 12px; }
        .aa-topbar-sub { font-size: 11px; color: var(--aa-dim); font-weight: 500; }
        .aa-topbar-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--aa); flex-shrink: 0; animation: aaPulse 2s ease infinite; box-shadow: 0 0 6px var(--aa); }
        @keyframes aaPulse { 0%,100% { opacity:.5; box-shadow: 0 0 4px var(--aa); } 50% { opacity:1; box-shadow: 0 0 10px var(--aa); } }

        /* HERO ALL-ACCESS CARD */
        .hero-content-wrap { display: flex; gap: 24px; align-items: stretch; position: relative; }
        .hero-left { flex: 1; }
        .hero-aa-glow { position: absolute; top: -30px; right: 40px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(184,154,92,0.12), transparent 70%); pointer-events: none; }
        .hero-aa-card { position: relative; width: 240px; min-width: 240px; padding: 22px 20px; border-radius: 14px; background: linear-gradient(150deg, #161626 0%, #131322 55%, #10101C 100%); border: 1px solid var(--aa-border); cursor: pointer; transition: all 0.3s; overflow: hidden; display: flex; flex-direction: column; gap: 6px; }
        .hero-aa-card:hover { border-color: var(--aa); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(124,108,255,0.12), 0 0 20px rgba(184,154,92,0.12); }
        .hero-aa-card-glow { position: absolute; top: -30px; left: -30px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(124,108,255,0.12), transparent 70%); pointer-events: none; }
        .hero-aa-icon { color: var(--aa); font-size: 22px; filter: drop-shadow(0 0 8px var(--aa-dim)); position: relative; }
        .hero-aa-label { font-family: var(--font-display); font-size: 20px; color: var(--aa); position: relative; letter-spacing: -.01em; }
        .hero-aa-desc { font-size: 11.5px; color: var(--text-secondary); line-height: 1.45; position: relative; flex: 1; }
        .hero-aa-price { font-size: 18px; font-weight: 700; color: var(--text-primary); position: relative; margin-top: 4px; font-variant-numeric: tabular-nums; }
        .hero-aa-cta { padding: 8px 0; border-radius: 8px; background: var(--aa); color: #0A0A0F; font-size: 12px; font-weight: 700; text-align: center; position: relative; transition: opacity .15s; letter-spacing: .01em; margin-top: 4px; }
        .hero-aa-card:hover .hero-aa-cta { opacity: .9; }

        /* STICKY ALL-ACCESS BAR */
        .aa-sticky-bar { position: sticky; top: 0; z-index: 40; opacity: 0; transform: translateY(-100%); transition: all 0.35s cubic-bezier(.4,0,.2,1); pointer-events: none; }
        .aa-sticky-bar-show { opacity: 1; transform: translateY(0); pointer-events: all; }
        .aa-sticky-inner { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 9px 20px; background: linear-gradient(135deg, rgba(20,20,32,0.96), rgba(16,16,28,0.96)); border-bottom: 1px solid var(--aa-border); backdrop-filter: blur(16px); cursor: pointer; transition: background .2s; }
        .aa-sticky-inner:hover { background: linear-gradient(135deg, rgba(26,26,40,0.96), rgba(20,20,34,0.96)); }
        .aa-sticky-diamond { color: var(--aa); font-size: 12px; filter: drop-shadow(0 0 6px var(--aa-dim)); }
        .aa-sticky-text { font-size: 12.5px; color: var(--text-secondary); }
        .aa-sticky-text strong { color: var(--aa); font-weight: 700; }
        .aa-sticky-price { font-size: 12.5px; font-weight: 700; color: var(--text-primary); margin-left: 4px; }
        .aa-sticky-cta { padding: 4px 14px; border-radius: 6px; background: var(--aa); color: #0A0A0F; font-size: 11px; font-weight: 700; margin-left: 8px; transition: opacity .15s; }
        .aa-sticky-inner:hover .aa-sticky-cta { opacity: .9; }
        /* AA CARD BADGE */
        .aa-badge { font-size: 9.5px; font-weight: 600; padding: 2px 7px; border-radius: 4px; background: var(--aa-bg); color: var(--aa); border: 1px solid var(--aa-border); letter-spacing: .02em; white-space: nowrap; }
        /* AA STACK RUN BUTTON */
        .aa-run { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 7px; background: var(--aa-bg); border: 1px solid var(--aa-border); color: var(--aa); font-size: 11px; font-weight: 600; font-family: var(--font-body); cursor: pointer; transition: all .15s; white-space: nowrap; }
        .aa-run:hover { background: #B89A5C24; border-color: var(--aa); }
        .aa-run-active { background: var(--aa); color: #0A0A0F; border-color: var(--aa); }
        .aa-run-active:hover { opacity: .9; }
        .aa-run-diamond { font-size: 8px; }
        /* AA PANEL */
        .aa-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 2000; backdrop-filter: blur(4px); animation: aaFade .2s ease; }
        .aa-panel { position: fixed; top: 0; right: 0; width: 420px; height: 100vh; background: var(--bg-secondary); border-left: 1px solid var(--border-subtle); z-index: 2001; animation: aaSlide .25s ease; overflow-y: auto; }
        .aa-panel::-webkit-scrollbar { width: 4px; } .aa-panel::-webkit-scrollbar-thumb { background: var(--border-medium); border-radius: 2px; }
        @keyframes aaFade { from { opacity:0; } to { opacity:1; } }
        @keyframes aaSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .aa-panel-inner { padding: 28px 24px 40px; }
        .aa-panel-hdr { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .aa-panel-hdr-l { display: flex; align-items: center; gap: 12px; }
        .aa-panel-icn { width: 42px; height: 42px; border-radius: 10px; background: var(--aa-bg); border: 1px solid var(--aa-border); display: flex; align-items: center; justify-content: center; color: var(--aa); font-size: 18px; }
        .aa-panel-ttl { font-family: var(--font-display); font-size: 22px; color: var(--text-primary); }
        .aa-panel-sts { margin-top: 2px; display: flex; align-items: center; gap: 6px; font-size: 12px; }
        .aa-sts-on { color: var(--aa); } .aa-sts-off { color: var(--text-tertiary); }
        .aa-dot { width: 6px; height: 6px; border-radius: 50%; }
        .aa-dot-on { background: var(--aa); box-shadow: 0 0 8px var(--aa-dim); }
        .aa-dot-off { background: var(--text-tertiary); }
        .aa-close { background: none; border: none; color: var(--text-tertiary); font-size: 16px; cursor: pointer; padding: 4px; }
        .aa-close:hover { color: var(--text-primary); }
        .aa-ctx { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: var(--aa-bg); border: 1px solid var(--aa-border); border-radius: 10px; margin-bottom: 20px; font-size: 12.5px; color: var(--aa); line-height: 1.4; }
        .aa-ctx-icn { font-size: 18px; flex-shrink: 0; }
        .aa-sec { margin-bottom: 24px; }
        .aa-sec-lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--text-tertiary); margin-bottom: 12px; }
        .aa-caps { display: flex; flex-direction: column; gap: 10px; }
        .aa-cap { display: flex; gap: 10px; align-items: flex-start; }
        .aa-cap-arr { color: var(--aa); font-size: 10px; margin-top: 4px; flex-shrink: 0; }
        .aa-cap-t { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .aa-cap-d { font-size: 12px; color: var(--text-tertiary); line-height: 1.4; margin-top: 1px; }
        .aa-cost { padding: 20px 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); margin-bottom: 24px; display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap; }
        .aa-cost-amt { font-family: var(--font-display); font-size: 36px; color: var(--text-primary); letter-spacing: -.02em; }
        .aa-cost-per { font-size: 15px; color: var(--text-tertiary); }
        .aa-cost-note { width: 100%; font-size: 12px; color: var(--text-tertiary); margin-top: 6px; }
        .aa-acts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .aa-pri-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; border-radius: 10px; background: var(--aa); color: #0A0A0F; font-size: 14px; font-weight: 700; font-family: var(--font-body); border: none; cursor: pointer; transition: opacity .15s; }
        .aa-pri-btn:hover { opacity: .9; }
        .aa-sec-btn { width: 100%; padding: 10px; border-radius: 10px; background: transparent; border: 1px solid var(--border-medium); color: var(--text-secondary); font-size: 13px; font-family: var(--font-body); cursor: pointer; transition: all .15s; }
        .aa-sec-btn:hover { border-color: var(--text-tertiary); color: var(--text-primary); }
        .aa-en-state { text-align: center; padding: 16px; background: var(--aa-bg); border: 1px solid var(--aa-border); border-radius: 10px; }
        .aa-en-badge { font-size: 14px; font-weight: 700; color: var(--aa); margin-bottom: 6px; }
        .aa-en-msg { font-size: 12px; color: var(--text-tertiary); line-height: 1.4; }
        .aa-panel-ft { display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid var(--border-subtle); }
        .aa-ft-stat { display: flex; flex-direction: column; align-items: center; }
        .aa-ft-val { font-size: 18px; font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums; }
        .aa-ft-lbl { font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: .06em; margin-top: 2px; }

        @media (max-width: 1200px) { .grid-4 { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 1100px) {
          .topbar-nav-item:not(.topbar-nav-primary) { display: none; }
          .story-grid { grid-template-columns: 1fr; }
          .story-narrative { position: static; opacity: 1; transform: none; }
        }
        @media (max-width: 900px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .featured-mixed { grid-template-columns: 1fr; }
          .featured-mixed > :first-child { grid-row: auto; }
          .aa-panel { width: 100%; }
          .hero-content-wrap { flex-direction: column; }
          .hero-aa-card { width: 100%; min-width: unset; }
          .story-section { padding: 14px; border-radius: 14px; }
          .shelf-container { padding: 14px; border-radius: 14px; }
          .narrative-grid-2, .narrative-grid-3 { grid-template-columns: 1fr; }
          .narrative-timeline { grid-template-columns: 1fr; }
          .topbar-pill { display: none; }
          .topbar-search { max-width: 100%; }
          .home-content { padding: 20px 24px 140px; }
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .section { animation: fadeInUp 0.45s ease both; }
        .section:nth-child(2) { animation-delay: 0.04s; }
        .section:nth-child(3) { animation-delay: 0.08s; }
        .section:nth-child(4) { animation-delay: 0.12s; }
        .section:nth-child(5) { animation-delay: 0.16s; }
      `}</style>

      <div className="app-container">
        <div className="main-area">
          <div className="topbar">
            <div className="topbar-inner">
              <div className="topbar-left">
                <div className="topbar-logo">
                  <span className="topbar-logo-icon">◈</span>
                  <span className="topbar-logo-text">Agent Playstore</span>
                </div>
                <div className="topbar-nav">
                  <button className="topbar-nav-item topbar-nav-primary">Browse Agents</button>
                  <button className="topbar-nav-item">Stacks</button>
                  <button className="topbar-nav-item">Integrations</button>
                </div>
              </div>
              <div className="topbar-search">
                <span className="topbar-search-icon">🔍</span>
                <input type="text" placeholder="Search agents, stacks, integrations..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="topbar-right">
                <div className="aa-topbar" onClick={() => openAA()}>
                  <span className="aa-topbar-diamond">◆</span>
                  <span className="aa-topbar-label">All-Access</span>
                  <span className="aa-topbar-sep">·</span>
                  <span className="aa-topbar-sub">{aaEnabled ? "Enabled" : "$1,000/mo"}</span>
                  {aaEnabled && <span className="aa-topbar-dot" />}
                </div>
                <div className="topbar-pill">🏷️ Categories</div>
                <div className="topbar-pill">🔄 Compare</div>
                <div className="topbar-pill">📦 My Stacks</div>
                <div className="topbar-avatar">👤</div>
              </div>
            </div>
          </div>

          <div className="scroll-area" ref={mainRef}>
            {/* STICKY ALL-ACCESS BAR */}
            {!aaEnabled && (
              <div className={`aa-sticky-bar ${scrolled ? "aa-sticky-bar-show" : ""}`} onClick={() => openAA()}>
                <div className="aa-sticky-inner">
                  <span className="aa-sticky-diamond">◆</span>
                  <span className="aa-sticky-text"><strong>All-Access</strong> — Execute any stack instantly. Parallel agents, default integrations, zero setup.</span>
                  <span className="aa-sticky-price">$1,000/mo</span>
                  <span className="aa-sticky-cta">Unlock →</span>
                </div>
              </div>
            )}
            <div className="home-content">

              {/* HERO */}
              <div className="hero-section">
                <div className="hero-glow" /><div className="hero-glow-2" />
                <div className="hero-aa-glow" />
                <div className="hero-content-wrap">
                  <div className="hero-left">
                    <div className="hero-title">Speedrun integration of agents into your organization.</div>
                    <div className="hero-subtitle">Browse hundreds of agents, stacks, and integrations used in real workflows</div>
                    <div className="hero-actions">
                      <button className="hero-cta" onClick={() => openAA()}>Unlock All-Access</button>
                    </div>
                    <div className="hero-stats">
                      <div className="hero-stat"><div className="hero-stat-value">284</div><div className="hero-stat-label">Agents</div></div>
                      <div className="hero-stat"><div className="hero-stat-value">67</div><div className="hero-stat-label">Stacks</div></div>
                      <div className="hero-stat"><div className="hero-stat-value">42</div><div className="hero-stat-label">Integrations</div></div>
                      <div className="hero-stat"><div className="hero-stat-value">128k</div><div className="hero-stat-label">Active Users</div></div>
                    </div>
                  </div>
                  <div className="hero-aa-card" onClick={() => openAA()}>
                    <div className="hero-aa-card-glow" />
                    <div className="hero-aa-icon">◆</div>
                    <div className="hero-aa-label">All-Access</div>
                    <div className="hero-aa-desc">{aaEnabled ? "Execution permissions active across all stacks and agents." : "Run any stack with stabilized permissions. Parallel agents. Default integrations. No setup."}</div>
                    <div className="hero-aa-price">{aaEnabled ? "Active" : "$1,000 /mo"}</div>
                    <div className="hero-aa-cta">{aaEnabled ? "◆ Enabled" : "Enable run access →"}</div>
                  </div>
                </div>
              </div>

              {/* CATEGORIES */}
              <div className="category-pills">
                {["All", "Research", "Development", "Data", "Creative", "Productivity", "Security", "Marketing", "Finance", "Sales", "Education", "DevOps"].map(c => (
                  <div key={c} className="category-pill">{c}</div>
                ))}
              </div>

              <div className="narrative-sections">
                <div className="story-section story-start" ref={el => (storySectionRefs.current[0] = el)} data-seen="true">
                  <div className="story-grid">
                    <div className="story-narrative">
                      <div className="shelf-container narrative-block">
                        <div className="narrative-kicker">Phase 0 - Start in production</div>
                        <div className="narrative-title">Start imperfect. Stabilize later.</div>
                        <div className="narrative-body">
                          Deploy a starter stack into live workflows immediately. Real usage reveals constraints,
                          readiness, and where automation creates value.
                        </div>
                        <div className="narrative-pills">
                          <span className="narrative-pill">Starter stack subscription</span>
                          <span className="narrative-pill">Live usage first</span>
                          <span className="narrative-pill">Reality over plans</span>
                        </div>
                      </div>
                    </div>
                    <div className="story-shelves">
                      <div className="shelf-container">
                        <Section sectionKey="featured">
                          <div className="featured-mixed">
                            <LargeCard agent={featured[0]} onHoverEnter={onEnter} onHoverLeave={onLeave} />
                            <MediumCard agent={featured[1]} onHoverEnter={onEnter} onHoverLeave={onLeave} />
                            <MediumCard agent={featured[2]} onHoverEnter={onEnter} onHoverLeave={onLeave} />
                          </div>
                        </Section>

                        <Section sectionKey="stacks">
                          <HorizontalShelf>
                            {STACKS.map(s => <StackCard key={s.id} stack={s} aaEnabled={aaEnabled} onAAClick={handleStackAA} />)}
                          </HorizontalShelf>
                        </Section>
                      </div>

                      <div className="narrative-shelf-stack">
                        <div className="narrative-shelf-grid narrative-grid-2">
                          <div className="narrative-mini emphasis">
                            <div className="narrative-mini-kicker">Week 1 pack</div>
                            <div className="narrative-mini-title">Starter stack in production.</div>
                            <div className="narrative-mini-body">
                              Curated agents mapped to core workflows and deployed into your environment.
                            </div>
                            <div className="narrative-stat-row">
                              <div className="narrative-stat">Curated agents</div>
                              <div className="narrative-stat">Workflow hooks</div>
                              <div className="narrative-stat">Telemetry on</div>
                            </div>
                          </div>
                          <div className="narrative-mini">
                            <div className="narrative-mini-kicker">Deployment scope</div>
                            <div className="narrative-mini-title">Wired to real workflows.</div>
                            <div className="narrative-mini-body">
                              Default integrations and permissions aligned so teams can run tasks immediately.
                            </div>
                            <div className="narrative-list">
                              <div className="narrative-list-item">Operational permissions baseline</div>
                              <div className="narrative-list-item">Run logs captured by default</div>
                              <div className="narrative-list-item">Live usage from day one</div>
                            </div>
                          </div>
                        </div>
                        <div className="narrative-callout">
                          <strong>Design goal:</strong> working systems on day one, even if imperfect. We learn by running them.
                        </div>
                      </div>

                      <div className="shelf-container">
                        <Section sectionKey="newArrivals">
                          <div className="grid-3">
                            {newAgents.map(a => <MediumCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
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
                        <div className="narrative-kicker">Weeks 1-4 - Learning window</div>
                        <div className="narrative-title">Usage teaches you what to build next.</div>
                        <div className="narrative-body">
                          Teams use the system daily. Friction and opportunity surface fast, and you get a real readiness map.
                        </div>
                        <div className="narrative-timeline">
                          <div className="narrative-chip"><strong>Week 1</strong> Adoption signals</div>
                          <div className="narrative-chip"><strong>Week 2</strong> Workflow friction</div>
                          <div className="narrative-chip"><strong>Week 3</strong> Automation value</div>
                          <div className="narrative-chip"><strong>Week 4</strong> Readiness map</div>
                        </div>
                      </div>
                    </div>
                    <div className="story-shelves">
                      <div className="narrative-shelf-stack">
                        <div className="narrative-shelf-grid narrative-grid-2">
                          <div className="narrative-mini">
                            <div className="narrative-mini-kicker">Signal telemetry</div>
                            <div className="narrative-mini-title">Where adoption concentrates.</div>
                            <div className="narrative-mini-body">
                              We measure frequency, handoff quality, and recovery to identify stable paths.
                            </div>
                            <div className="narrative-list">
                              <div className="narrative-list-item">Adoption heatmap by team</div>
                              <div className="narrative-list-item">Workflow friction and bottlenecks</div>
                              <div className="narrative-list-item">Value signals from real outcomes</div>
                            </div>
                          </div>
                          <div className="narrative-mini emphasis">
                            <div className="narrative-mini-kicker">Decision triggers</div>
                            <div className="narrative-mini-title">When to stabilize.</div>
                            <div className="narrative-mini-body">
                              Signals indicate which workflows deserve hardening and deeper integration.
                            </div>
                            <div className="narrative-steps">
                              <div className="narrative-step"><span className="narrative-step-dot" />Adoption stays consistent</div>
                              <div className="narrative-step"><span className="narrative-step-dot" />Errors trend downward</div>
                              <div className="narrative-step"><span className="narrative-step-dot" />Time saved is repeatable</div>
                            </div>
                          </div>
                        </div>
                        <div className="narrative-callout">
                          <strong>Outcome:</strong> a readiness map that shows which automations to harden next.
                        </div>
                      </div>

                      <div className="shelf-container">
                        <Section sectionKey="integrations">
                          <HorizontalShelf>
                            {INTEGRATIONS.map(i => <IntegrationCard key={i.id} integration={i} />)}
                          </HorizontalShelf>
                        </Section>

                        <Section sectionKey="popular">
                          <div className="grid-4">
                            {mostPopular.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
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
                        <div className="narrative-kicker">Stabilize + adapt</div>
                        <div className="narrative-title">Evolve what works, retire what does not.</div>
                        <div className="narrative-body">
                          We modify agents, extend open-source components, and deepen integrations based on observed reality.
                        </div>
                        <div className="narrative-list">
                          <div className="narrative-list-item">Modify and tune existing agents</div>
                          <div className="narrative-list-item">Extend open-source tooling</div>
                          <div className="narrative-list-item">Deepen internal integrations</div>
                        </div>
                      </div>
                    </div>
                    <div className="story-shelves">
                      <div className="shelf-container">
                        <Section sectionKey="productivity">
                          <div className="grid-3">
                            {productivityAgents.map(a => <CompactCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
                          </div>
                        </Section>

                        <Section sectionKey="data">
                          <HorizontalShelf>
                            {dataAgents.map(a => <MediumCard key={a.id} agent={a} onHoverEnter={onEnter} onHoverLeave={onLeave} />)}
                          </HorizontalShelf>
                        </Section>

                        <Section sectionKey="teamStacks">
                          <div className="grid-3">
                            {STACKS.map(s => <StackCard key={s.id} stack={s} aaEnabled={aaEnabled} onAAClick={handleStackAA} />)}
                          </div>
                        </Section>
                      </div>

                      <div className="narrative-shelf-stack">
                        <div className="narrative-shelf-grid narrative-grid-3">
                          <div className="narrative-mini emphasis">
                            <div className="narrative-mini-kicker">Stabilize</div>
                            <div className="narrative-mini-title">Tune and harden.</div>
                            <div className="narrative-mini-body">Prompt reliability, output formats, and guardrails get locked.</div>
                          </div>
                          <div className="narrative-mini">
                            <div className="narrative-mini-kicker">Normalize</div>
                            <div className="narrative-mini-title">Workflow consistency.</div>
                            <div className="narrative-mini-body">We standardize handoffs and ensure the same outcome each run.</div>
                          </div>
                          <div className="narrative-mini">
                            <div className="narrative-mini-kicker">Deepen</div>
                            <div className="narrative-mini-title">Integration depth.</div>
                            <div className="narrative-mini-body">Default connectors extend into org systems and data pipelines.</div>
                          </div>
                        </div>
                        <div className="narrative-callout">
                          <strong>Stabilization loop:</strong> tune agents, normalize workflows, then deepen integrations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="story-section story-bespoke" ref={el => (storySectionRefs.current[3] = el)}>
                  <div className="story-grid">
                    <div className="story-narrative">
                      <div className="shelf-container narrative-block">
                        <div className="narrative-kicker">Bespoke systems</div>
                        <div className="narrative-title">Custom agents built around how you operate.</div>
                        <div className="narrative-body">
                          Once usage is stable, we design bespoke workflows and agents tailored to your organization.
                        </div>
                        <div className="narrative-pills">
                          <span className="narrative-pill">Custom workflows</span>
                          <span className="narrative-pill">Production-grade</span>
                          <span className="narrative-pill">Built on your stack</span>
                        </div>
                      </div>
                    </div>
                    <div className="story-shelves">
                      <div className="narrative-shelf-stack">
                        <div className="narrative-shelf-grid narrative-grid-2">
                          <div className="narrative-mini emphasis">
                            <div className="narrative-mini-kicker">Custom build</div>
                            <div className="narrative-mini-title">Bespoke system outputs.</div>
                            <div className="narrative-mini-body">
                              New agents, orchestration layers, and workflows aligned to your operating model.
                            </div>
                            <div className="narrative-list">
                              <div className="narrative-list-item">Org-specific workflows</div>
                              <div className="narrative-list-item">Custom agents and tools</div>
                              <div className="narrative-list-item">Production-grade reliability</div>
                            </div>
                          </div>
                          <div className="narrative-mini">
                            <div className="narrative-mini-kicker">Ownership transfer</div>
                            <div className="narrative-mini-title">Built on your stack.</div>
                            <div className="narrative-mini-body">
                              Systems live in your infra, with documentation and handoff for long-term control.
                            </div>
                            <div className="narrative-stat-row">
                              <div className="narrative-stat">Your code</div>
                              <div className="narrative-stat">Your models</div>
                              <div className="narrative-stat">Your infra</div>
                            </div>
                          </div>
                        </div>
                        <div className="narrative-mini">
                          <div className="narrative-mini-kicker">Capability shift</div>
                          <div className="narrative-mini-title">From usage to independence.</div>
                          <div className="narrative-mini-body">
                            The system evolves into a durable internal capability that your teams can extend.
                          </div>
                        </div>
                      </div>

                      <div className="highlight-banner" style={{ background: "linear-gradient(135deg, #0A1A2E, #0A2E1A)" }}>
                        <div className="highlight-banner-icon">🔌</div>
                        <div className="highlight-banner-text">
                          <div className="highlight-banner-title" style={{ color: "#1DD1A1" }}>Publish your own agent</div>
                          <div className="highlight-banner-desc">List your agent on the Playstore. Reach 128k+ users actively building with AI.</div>
                        </div>
                        <button className="highlight-banner-cta" style={{ background: "#1DD1A1", color: "#000" }}>Get Started →</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
