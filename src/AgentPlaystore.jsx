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

const CATEGORY_META = [
  { key: "All", label: "All Agents", icon: "🧭", color: "#7C6CFF", desc: "Full catalog across every workflow and team." },
  { key: "Research", label: "Research", icon: "🔬", color: "#6C5CE7", desc: "Synthesis, citations, and signal discovery." },
  { key: "Development", label: "Development", icon: "⚡", color: "#00B894", desc: "Build, refactor, test, and ship faster." },
  { key: "Data", label: "Data", icon: "📊", color: "#E17055", desc: "Transform, query, and visualize data." },
  { key: "Creative", label: "Creative", icon: "🎨", color: "#FD79A8", desc: "Generate assets, visuals, and content." },
  { key: "Productivity", label: "Productivity", icon: "📋", color: "#FDCB6E", desc: "Automate the work that slows teams down." },
  { key: "Security", label: "Security", icon: "🛡️", color: "#D63031", desc: "Compliance, scanning, and protection workflows." },
  { key: "Marketing", label: "Marketing", icon: "✍️", color: "#FF9FF3", desc: "Content, campaigns, and distribution." },
  { key: "Finance", label: "Finance", icon: "💹", color: "#2ED573", desc: "Portfolio analysis and market signals." },
  { key: "Sales", label: "Sales", icon: "📈", color: "#FF6B6B", desc: "Prospecting, scoring, and outreach." },
  { key: "Education", label: "Education", icon: "🎓", color: "#1DD1A1", desc: "Learning paths and knowledge checks." },
  { key: "DevOps", label: "DevOps", icon: "☁️", color: "#5F27CD", desc: "Infra automation and ops monitoring." },
];

const CATEGORY_CARDS = CATEGORY_META.map((category) => ({
  ...category,
  count: category.key === "All"
    ? AGENTS.length
    : AGENTS.filter(agent => agent.category === category.key).length,
}));

const SECTION_META = {
  featured: { headline: "Featured & Trending", rationale: "The most popular agents currently in use." },
  trending: { headline: "Trending Now", rationale: "The agents gaining the most momentum this week — installs, stars, and chatter." },
  stacks: { headline: "Popular Stacks", rationale: "Pre-assembled agent combinations that teams actually use together." },
  newArrivals: { headline: "Experimental", rationale: "Beta agents designed to test specific workflows." },
  collections: { headline: "Curated Collections", rationale: "Themed bundles assembled by editors and the community around real workflows." },
  free: { headline: "Free to Use", rationale: "Fully functional agents with no subscription. Start building now." },
  integrations: { headline: "Connect Your Tools", rationale: "Find agents that plug into the tools already running your workflow." },
  topRated: { headline: "Top Rated", rationale: "Consistently rated highest by the community over the last 90 days." },
  developers: { headline: "For Developers", rationale: "Code generation, testing, debugging, and deployment — the builder's shelf." },
  editorsPick: { headline: "Editor's Pick", rationale: "Agents that surprised us this month — unexpected quality in unexpected categories." },
  data: { headline: "Data & Analytics", rationale: "Parse, transform, query, and visualize. The full data lifecycle in agent form." },
  productivity: { headline: "Enterprise Ready", rationale: "Agents that commonly graduate to custom development." },
  popular: { headline: "Community Favorites", rationale: "Agents with high engagement scores." },
  teamStacks: { headline: "Stacks for Teams", rationale: "Multi-agent setups designed for collaborative, cross-functional workflows." },
  recentlyUpdated: { headline: "Recently Updated", rationale: "Fresh releases shipped this week — new features, fixes, and improvements." },
  communityPicks: { headline: "Community Picks", rationale: "Top-voted by Playstore users. The crowd's favorites, not ours." },
  security: { headline: "Security & Compliance", rationale: "Enterprise-grade agents for teams where trust, auditability, and uptime matter." },
  explore: { headline: "Keep Exploring", rationale: "The catalog doesn't end here. More agents, more stacks, more possibilities." },
  pairsWell: { headline: "Pairs Well Together", rationale: "Agents that get better when used alongside each other." },
  risingStar: { headline: "Rising Stars", rationale: "Low user count, high ratings. Early bets that could become essentials." },
  allAccessStacks: { headline: "All-Access Reference Stacks", rationale: "Pre-configured capability stacks available for immediate execution with All-Access." },
  categories: { headline: "Browse Categories", rationale: "Jump into the parts of the catalog aligned with your workflows." },
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
          <span className="compact-card-price" style={{ color: agent.price === "Free" ? "var(--accent-cool)" : "var(--text-tertiary)" }}>{agent.price}</span>
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
        <span className="medium-card-price" style={{ color: agent.price === "Free" ? "var(--accent-cool)" : "var(--text-tertiary)" }}>{agent.price}</span>
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
          <span className="large-card-price" style={{ color: agent.price === "Free" ? "var(--accent-cool)" : "var(--text-tertiary)" }}>{agent.price}</span>
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

function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <div className="category-card-top">
        <span className="category-card-icon" style={{ background: category.color + "22", color: category.color }}>{category.icon}</span>
        <span className="category-card-count">{category.count} agents</span>
      </div>
      <div className="category-card-title">{category.label}</div>
      <div className="category-card-desc">{category.desc}</div>
      <div className="category-card-cta">Browse →</div>
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

  const featured = AGENTS.filter(a => a.featured);
  const newAgents = AGENTS.filter(a => a.new);
  const dataAgents = AGENTS.filter(a => a.category === "Data");
  const productivityAgents = AGENTS.filter(a => a.category === "Productivity");
  const mostPopular = [...AGENTS].sort((a, b) => parseFloat(b.users) - parseFloat(a.users)).slice(0, 8);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Sora:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg-primary); }
        h1, h2, h3 { color: #ffffff; }
        ::selection { background: rgba(255, 255, 255, 0.18); color: #ffffff; }

        :root {
          --bg-primary: #050505;
          --bg-secondary: #0b0b0b;
          --bg-card: rgba(18, 18, 18, 0.72);
          --bg-card-hover: rgba(24, 24, 24, 0.82);
          --bg-elevated: rgba(22, 22, 22, 0.8);
          --border-subtle: rgba(255, 255, 255, 0.08);
          --border-medium: rgba(255, 255, 255, 0.18);
          --text-primary: #ffffff;
          --text-secondary: #a1a1aa;
          --text-tertiary: rgba(255, 255, 255, 0.55);
          --accent-primary: #f5f5f5;
          --accent-glow: rgba(255, 255, 255, 0.25);
          --accent-warm: #d4d4d8;
          --accent-cool: #bdbdbd;
          --accent-danger: #e5e7eb;
          --glass-bg: rgba(18, 18, 18, 0.74);
          --glass-bg-strong: rgba(24, 24, 24, 0.86);
          --glass-border: linear-gradient(135deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.04));
          --glass-border-soft: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03));
          --glass-highlight: rgba(255, 255, 255, 0.12);
          --aa: #ffffff;
          --aa-dim: rgba(255, 255, 255, 0.6);
          --aa-bg: rgba(255, 255, 255, 0.06);
          --aa-border: rgba(255, 255, 255, 0.3);
          --font-display: 'Space Grotesk', sans-serif;
          --font-body: 'Sora', sans-serif;
          --font-mono: 'Space Mono', monospace;
          --topbar-height: 64px;
        }

        #root {
          width: 100vw; height: 100vh; overflow: hidden;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-body);
          display: flex;
        }
        .app-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          background: transparent;
        }
        .app-container::before,
        .app-container::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }
        .app-container::before {
          background: radial-gradient(circle at 20% -15%, rgba(255, 255, 255, 0.08), transparent 60%);
        }
        .app-container::after {
          background: radial-gradient(circle at 85% 0%, rgba(255, 255, 255, 0.06), transparent 55%);
          opacity: 0.4;
        }
        .app-container > * { position: relative; z-index: 1; }

        /* ===== MAIN ===== */
        .main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        /* ===== TOPBAR ===== */
        .topbar {
          height: var(--topbar-height); min-height: var(--topbar-height);
          border-bottom: 1px solid var(--border-subtle);
          display: flex; align-items: center;
          padding: 0 24px; gap: 16px;
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(14px);
          position: relative;
          z-index: 50;
        }
        .topbar::before {
          content: "";
          position: absolute;
          inset: -60px 0 -40px 0;
          background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.18), transparent 70%);
          filter: blur(24px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
        }
        .topbar-inner {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          display: flex; align-items: center; gap: 16px;
          min-width: 0;
          position: relative;
          z-index: 1;
        }
        .topbar-left { display: flex; align-items: center; gap: 18px; min-width: 0; }
        .topbar-logo { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .topbar-logo-icon { color: var(--accent-primary); font-size: 16px; }
        .topbar-logo-text { font-family: var(--font-display); font-size: 16px; letter-spacing: -0.02em; font-weight: 600; color: var(--text-primary); }
        .topbar-nav { display: flex; align-items: center; gap: 6px; }
        .topbar-nav-item {
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary); font-size: 12.5px; cursor: pointer;
          padding: 6px 10px; border-radius: 8px; transition: all 0.15s;
          font-family: var(--font-body); font-weight: 500; letter-spacing: -0.01em;
        }
        .topbar-nav-item:hover { border-color: var(--border-subtle); color: var(--text-primary); background: rgba(255,255,255,0.08); }
        .topbar-nav-primary {
          color: #050505;
          border-color: transparent;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-cool));
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.18);
        }
        .topbar-nav-primary:hover { border-color: var(--accent-primary); }
        .topbar-search { flex: 1; max-width: 460px; position: relative; }
        .topbar-search input {
          width: 100%; height: 38px; border-radius: 10px; border: 1px solid var(--border-subtle);
          background: rgba(18,18,18,0.78);
          color: var(--text-primary); padding: 0 14px 0 34px;
          font-size: 12.5px; font-family: var(--font-body); outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .topbar-search input::placeholder { color: var(--text-tertiary); }
        .topbar-search input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px var(--accent-glow); background: rgba(24,24,24,0.92); }
        .topbar-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); font-size: 13px; }
        .topbar-right { display: flex; align-items: center; gap: 10px; }
        .topbar-pill {
          display: flex; align-items: center; gap: 5px; padding: 5px 12px;
          border-radius: 10px; background: rgba(18,18,18,0.78); border: 1px solid var(--border-subtle);
          font-size: 12px; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .topbar-pill:hover { border-color: var(--border-medium); color: var(--text-primary); background: rgba(255,255,255,0.1); }
        .topbar-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(18,18,18,0.85);
          border: 1px solid var(--border-subtle);
          display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* ===== SCROLL ===== */
        .scroll-area { flex: 1; overflow-y: auto; overflow-x: hidden; scroll-behavior: auto; }
        .scroll-area::-webkit-scrollbar { width: 5px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
        .scroll-area :is(
          .hero-section,
          .closing-section,
          .hero-aa-card,
          .shelf-container,
          .story-section,
          .narrative-mini,
          .narrative-callout,
          .compact-card,
          .medium-card,
          .large-card,
          .stack-card,
          .collection-card,
          .integration-card,
          .pairing-card,
          .category-card,
          .highlight-banner
        ) {
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 16px 32px rgba(0,0,0,0.35);
        }
        .scroll-area :is(
          .compact-card:hover,
          .medium-card:hover,
          .large-card:hover,
          .stack-card:hover,
          .collection-card:hover,
          .integration-card:hover,
          .pairing-card:hover,
          .category-card:hover,
          .hero-aa-card:hover
        ) {
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 20px 38px rgba(0,0,0,0.42);
        }
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
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; padding: 28px 32px; min-height: 150px;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 60px rgba(0,0,0,0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          isolation: isolate;
        }
        .hero-section::before {
          content: "";
          position: absolute;
          top: -220px; left: -140px;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 65%);
          opacity: 0.55;
          filter: blur(8px);
          pointer-events: none;
          z-index: 0;
        }
        .hero-glow,
        .hero-glow-2,
        .hero-aa-glow {
          opacity: 0.35;
          filter: blur(10px);
          z-index: 0;
        }
        .hero-glow { position: absolute; top: -80px; right: -40px; width: 260px; height: 260px; background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 70%); pointer-events: none; }
        .hero-glow-2 { position: absolute; bottom: -90px; left: 18%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255, 255, 255, 0.12), transparent 70%); pointer-events: none; }
        .hero-title { font-family: var(--font-display); font-size: 40px; line-height: 1.04; margin-bottom: 10px; position: relative; letter-spacing: -0.03em; font-weight: 600; color: var(--text-primary); text-shadow: 0 0 18px rgba(255, 255, 255, 0.12); }
        .hero-title em { font-style: normal; color: var(--accent-primary); }
        .hero-subtitle { font-size: 14px; color: var(--text-secondary); line-height: 1.6; max-width: 520px; position: relative; }
        .hero-narrative { font-size: 12.5px; color: var(--text-secondary); line-height: 1.6; max-width: 560px; margin-top: 8px; position: relative; }
        .hero-actions { display: flex; gap: 10px; margin-top: 10px; position: relative; }
        .hero-cta {
          padding: 8px 14px; border-radius: 10px; border: 1px solid transparent;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-cool));
          color: #050505; font-size: 12.5px; font-weight: 600;
          font-family: var(--font-body); cursor: pointer; transition: all 0.15s; white-space: nowrap;
          box-shadow: 0 10px 24px rgba(255, 255, 255, 0.16);
        }
        .hero-cta:hover { opacity: 0.9; }
        .hero-cta-secondary {
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          box-shadow: none;
        }
        .hero-cta-secondary:hover { background: rgba(255,255,255,0.08); opacity: 1; }
        .hero-stats { display: flex; gap: 18px; margin-top: 14px; position: relative; }
        .hero-stat-value { font-size: 17px; font-weight: 600; color: var(--text-primary); font-variant-numeric: tabular-nums; }
        .hero-stat-label { font-size: 9.5px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 2px; opacity: 0.8; font-weight: 600; }

        /* ===== CLOSING ===== */
        .closing-section {
          position: relative; border-radius: 16px; overflow: hidden;
          padding: 26px 32px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 60px rgba(0,0,0,0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          isolation: isolate;
        }
        .closing-section::before {
          content: "";
          position: absolute;
          top: -180px; right: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 70%);
          opacity: 0.5;
          filter: blur(10px);
          pointer-events: none;
        }
        .closing-content { display: flex; align-items: center; justify-content: space-between; gap: 20px; position: relative; z-index: 1; }
        .closing-left { max-width: 520px; }
        .closing-title { font-family: var(--font-display); font-size: 30px; letter-spacing: -0.02em; color: var(--text-primary); font-weight: 600; text-shadow: 0 0 12px rgba(255,255,255,0.12); }
        .closing-subtitle { font-size: 13px; color: var(--text-secondary); margin-top: 6px; line-height: 1.5; }
        .closing-right { display: flex; gap: 12px; flex-wrap: wrap; }
        .closing-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 9px 16px; border-radius: 10px; border: 1px solid transparent;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-cool));
          color: #050505; font-size: 12.5px; font-weight: 600;
          font-family: var(--font-body); cursor: pointer; transition: opacity 0.15s; white-space: nowrap;
          box-shadow: 0 10px 24px rgba(255,255,255,0.16);
        }
        .closing-btn:hover { opacity: 0.9; }
        .closing-btn-secondary {
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          box-shadow: none;
        }
        .closing-btn-secondary:hover { background: rgba(255,255,255,0.08); opacity: 1; }
        .hero-stat-label,
        .narrative-kicker,
        .narrative-chip,
        .section-context-sub,
        .hover-detail-label,
        .aa-sec-lbl,
        .stack-card-count,
        .category-card-count {
          font-family: var(--font-body);
        }

        /* ===== SECTIONS ===== */
        .section { display: flex; flex-direction: column; gap: 14px; }
        .section-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
        .section-title { font-family: var(--font-display); font-size: 21px; letter-spacing: -0.02em; line-height: 1.2; font-weight: 600; color: var(--text-primary); text-shadow: 0 0 12px rgba(255,255,255,0.12); }
        .section-rationale { font-size: 12.5px; color: var(--text-secondary); margin-top: 3px; line-height: 1.4; max-width: 560px; }
        .section-see-all {
          background: none; border: none; color: var(--accent-primary); font-size: 12px;
          font-family: var(--font-body); font-weight: 600; cursor: pointer; padding: 4px 0; transition: opacity 0.15s; white-space: nowrap; flex-shrink: 0; margin-top: 4px;
          letter-spacing: 0.02em;
        }
        .section-see-all:hover { opacity: 0.7; }
        .section-context { display: flex; flex-direction: column; gap: 2px; margin-top: 2px; }
        .section-context-title { font-family: var(--font-display); font-size: 34px; color: var(--text-primary); letter-spacing: -0.02em; line-height: 1.12; font-weight: 600; }
        .section-context-sub { font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; }
        .hero-subtitle,
        .section-rationale,
        .medium-card-tagline,
        .large-card-tagline,
        .large-card-solves,
        .stack-card-desc,
        .stack-card-solves,
        .collection-card-desc,
        .pairing-why,
        .category-card-desc,
        .hover-detail-solves,
        .hover-detail-usecase,
        .narrative-body,
        .narrative-mini-body,
        .narrative-callout,
        .narrative-step,
        .narrative-list-item,
        .narrative-chip,
        .narrative-pill,
        .narrative-stat,
        .hero-stat-label,
        .aa-cap-d,
        .aa-cost-note,
        .aa-en-msg,
        .hero-aa-desc,
        .highlight-banner-desc,
        .aa-sticky-text,
        .compact-card-tagline,
        .stack-usecase,
        .stack-card-users,
        .medium-card-author,
        .large-card-author,
        .collection-card-meta,
        .integration-card-count,
        .category-card-count,
        .hover-detail-author {
          font-weight: 300;
        }
        .shelf-stack { display: flex; flex-direction: column; gap: 14px; }
        .shelf-container {
          position: relative;
          padding: 18px 18px 22px;
          border-radius: 14px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 50px rgba(0,0,0,0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex; flex-direction: column; gap: 20px;
        }

        /* ===== NARRATIVE SECTIONS ===== */
        .narrative-sections { display: flex; flex-direction: column; gap: 28px; }
        .story-section {
          position: relative;
          border-radius: 14px;
          padding: 18px;
          border: 1px solid transparent;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 50px rgba(0,0,0,0.45);
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .story-section.story-start { --story-accent: #f5f5f5; --story-accent-weak: rgba(255, 255, 255, 0.12); --story-accent-border: rgba(255, 255, 255, 0.35); border-top: 1px solid var(--story-accent); }
        .story-section.story-learn { --story-accent: #d4d4d8; --story-accent-weak: rgba(212, 212, 216, 0.12); --story-accent-border: rgba(212, 212, 216, 0.35); border-top: 1px solid var(--story-accent); }
        .story-section.story-stabilize { --story-accent: #a1a1aa; --story-accent-weak: rgba(161, 161, 170, 0.14); --story-accent-border: rgba(161, 161, 170, 0.35); border-top: 1px solid var(--story-accent); }
        .story-section.story-bespoke { --story-accent: #e5e7eb; --story-accent-weak: rgba(229, 231, 235, 0.12); --story-accent-border: rgba(229, 231, 235, 0.35); border-top: 1px solid var(--story-accent); }
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
          position: relative;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 20px 40px rgba(0,0,0,0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          overflow: hidden;
        }
        .narrative-mini::before {
          content: "";
          position: absolute;
          inset: -40% 20% 40% -20%;
          background: radial-gradient(circle, var(--story-accent-weak), transparent 65%);
          opacity: 0.6;
        }
        .narrative-mini::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% 15%, rgba(255,255,255,0.08), transparent 45%);
          opacity: 0.4;
        }
        .narrative-mini > * { position: relative; z-index: 1; }
        .narrative-mini.emphasis {
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            linear-gradient(135deg, var(--story-accent-border), rgba(255,255,255,0.02)) border-box;
          border: 1px solid transparent;
        }
        .narrative-mini-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .narrative-mini-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: var(--story-accent-weak); color: var(--story-accent);
          font-size: 13px; box-shadow: inset 0 0 0 1px var(--story-accent-border);
        }
        .narrative-mini-kicker {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em;
          color: var(--text-tertiary); font-weight: 600;
        }
        .narrative-mini-title { font-size: 14px; font-weight: 600; margin-bottom: 6px; letter-spacing: -0.01em; color: var(--text-primary); }
        .narrative-mini-body { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
        .narrative-mini-visual { display: flex; align-items: flex-end; gap: 6px; height: 34px; margin-top: 10px; }
        .narrative-mini-bar {
          width: 7px; border-radius: 6px;
          background: linear-gradient(180deg, var(--story-accent), rgba(255,255,255,0));
          opacity: 0.9;
        }
        .narrative-orbit { display: flex; align-items: center; gap: 6px; margin-top: 10px; }
        .narrative-orbit-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--story-accent);
        }
        .narrative-orbit-line {
          height: 1px; flex: 1; background: linear-gradient(90deg, var(--story-accent), transparent);
        }
        .narrative-stat-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        .narrative-stat {
          padding: 6px 8px; border-radius: 8px;
          background: rgba(18,18,18,0.85);
          border: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-secondary);
        }
        .narrative-callout {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 14px; border-radius: 12px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border-soft) border-box;
          border: 1px solid transparent;
          color: var(--text-secondary); font-size: 12.5px; line-height: 1.5;
          position: relative; overflow: hidden;
        }
        .narrative-callout::before {
          content: "";
          position: absolute;
          inset: -60% -20% 40% 30%;
          background: radial-gradient(circle, var(--story-accent-weak), transparent 60%);
          opacity: 0.5;
        }
        .narrative-callout > * { position: relative; z-index: 1; }
        .narrative-callout-icon {
          width: 26px; height: 26px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: var(--story-accent-weak); color: var(--story-accent);
          font-size: 12px; flex-shrink: 0;
        }
        .narrative-callout strong { color: var(--text-primary); font-weight: 600; }
        .narrative-steps { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; }
        .narrative-step { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-secondary); }
        .narrative-step-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--story-accent); flex-shrink: 0; }
        .narrative-kicker {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em;
          color: var(--text-tertiary); font-weight: 600;
        }
        .narrative-title {
          font-family: var(--font-display);
          font-size: 28px;
          line-height: 1.12;
          letter-spacing: -0.02em;
          font-weight: 600;
          text-shadow: 0 0 12px rgba(255,255,255,0.12);
        }
        .narrative-body {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 520px;
        }
        .narrative-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .narrative-pill {
          font-size: 11px; color: var(--text-secondary);
          background: rgba(18,18,18,0.85); border: 1px solid var(--border-subtle);
          border-radius: 8px; padding: 4px 10px; letter-spacing: 0.03em;
        }
        .narrative-timeline {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px; margin-top: 4px;
        }
        .narrative-chip {
          background: rgba(18,18,18,0.85); border: 1px solid var(--border-subtle);
          border-radius: 8px; padding: 8px 10px;
          font-size: 11px; color: var(--text-secondary); line-height: 1.4;
        }
        .narrative-chip strong { color: var(--text-primary); font-weight: 600; }
        .narrative-list { display: flex; flex-direction: column; gap: 6px; }
        .narrative-list-item { font-size: 12px; color: var(--text-secondary); display: flex; gap: 8px; align-items: center; }
        .narrative-list-item::before { content: ">"; color: var(--accent-primary); }
        .text-banner {
          display: flex; align-items: center; justify-content: center;
          padding: 10px 14px; border-radius: 12px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border-soft) border-box;
          border: 1px solid transparent;
          font-size: 12px; color: var(--text-primary); letter-spacing: 0.02em; text-align: center;
        }

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
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; border-radius: 14px;
          cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s; position: relative;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 20px 40px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .compact-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-2px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 26px 50px rgba(0,0,0,0.5);
        }
        .compact-card-icon {
          width: 38px; height: 38px; border-radius: 9px; display: flex; align-items: center;
          justify-content: center; font-size: 17px; flex-shrink: 0; border: 1px solid;
        }
        .compact-card-info { min-width: 0; flex: 1; }
        .compact-card-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .compact-card-tagline { font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
        .compact-card-meta { display: flex; gap: 7px; margin-top: 3px; font-size: 10.5px; }
        .compact-card-rating { color: var(--accent-warm); }
        .compact-card-users { color: var(--text-tertiary); }
        .compact-card-price { font-weight: 600; }

        /* ===== MEDIUM CARD ===== */
        .medium-card {
          padding: 16px; background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; border-radius: 16px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex; flex-direction: column; gap: 5px; min-width: 210px; scroll-snap-align: start;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 50px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .medium-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-3px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 28px 60px rgba(0,0,0,0.5);
        }
        .medium-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .medium-card-icon {
          width: 44px; height: 44px; border-radius: 11px; display: flex; align-items: center;
          justify-content: center; font-size: 20px; border: 1px solid;
        }
        .medium-card-badges { display: flex; gap: 4px; }
        .medium-card-name { font-size: 14.5px; font-weight: 600; margin-top: 3px; }
        .medium-card-tagline { font-size: 12px; color: var(--text-secondary); line-height: 1.35; }
        .medium-card-capabilities { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
        .capability-dot {
          font-size: 10px; padding: 3px 8px; border-radius: 4px; white-space: nowrap;
          font-family: var(--font-body); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;
        }
        .medium-card-footer { display: flex; align-items: center; gap: 7px; margin-top: auto; padding-top: 5px; }
        .medium-card-category {
          font-size: 10px; padding: 2px 7px; border-radius: 5px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .medium-card-rating { font-size: 11px; color: var(--accent-warm); }
        .medium-card-price { font-size: 11px; font-weight: 600; margin-left: auto; }
        .medium-card-author { font-size: 10.5px; color: var(--text-tertiary); }

        /* ===== LARGE CARD ===== */
        .large-card {
          position: relative; padding: 24px; background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; border-radius: 18px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          overflow: hidden; min-width: 340px; scroll-snap-align: start;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 30px 70px rgba(0,0,0,0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .large-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-3px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 34px 80px rgba(0,0,0,0.55);
        }
        .large-card-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0.08; }
        .large-card-content { position: relative; display: flex; flex-direction: column; gap: 6px; }
        .large-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .large-card-icon {
          width: 52px; height: 52px; border-radius: 13px; display: flex; align-items: center;
          justify-content: center; font-size: 24px;
        }
        .large-card-badges { display: flex; gap: 5px; flex-wrap: wrap; justify-content: flex-end; }
        .large-card-name { font-family: var(--font-display); font-size: 21px; margin-top: 3px; font-weight: 600; letter-spacing: -0.02em; }
        .large-card-tagline { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
        .large-card-solves { font-size: 12px; color: var(--text-secondary); line-height: 1.45; margin-top: 2px; }
        .large-card-capabilities { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
        .capability-chip {
          font-size: 10px; padding: 4px 10px; border-radius: 4px; border: 1px solid; white-space: nowrap;
          font-family: var(--font-body); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;
        }
        .large-card-meta { display: flex; align-items: center; gap: 9px; margin-top: 4px; flex-wrap: wrap; }
        .large-card-category {
          font-size: 10.5px; padding: 3px 9px; border-radius: 5px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid;
        }
        .large-card-rating { font-size: 12px; color: var(--accent-warm); }
        .large-card-users { font-size: 11.5px; color: var(--text-tertiary); }
        .large-card-price { font-size: 12.5px; font-weight: 700; }
        .large-card-author { font-size: 11.5px; color: var(--text-tertiary); }
        .large-card-btn {
          margin-top: 6px; padding: 8px 18px; border-radius: 6px; border: 1px solid var(--border-subtle);
          color: white; font-size: 12px; font-weight: 600; font-family: var(--font-body);
          cursor: pointer; align-self: flex-start; transition: opacity 0.15s, transform 0.1s;
          letter-spacing: 0.01em; box-shadow: none;
        }
        .large-card-btn:hover { opacity: 0.85; transform: translateY(-1px); }

        /* ===== STACK CARD ===== */
        .stack-card {
          padding: 16px; background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; border-radius: 16px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex; flex-direction: column; gap: 6px; min-width: 280px; scroll-snap-align: start;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 50px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .stack-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-3px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 28px 60px rgba(0,0,0,0.5);
        }
        .stack-card-header { display: flex; justify-content: space-between; align-items: center; }
        .stack-card-icon {
          width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center;
          justify-content: center; font-size: 19px; border: 1px solid;
        }
        .stack-card-count { font-size: 10.5px; color: var(--text-tertiary); background: var(--bg-elevated); padding: 2px 7px; border-radius: 5px; }
        .stack-card-name { font-size: 15px; font-weight: 600; }
        .stack-card-desc { font-size: 11.5px; color: var(--text-secondary); line-height: 1.35; }
        .stack-card-solves { font-size: 11.5px; color: var(--text-secondary); line-height: 1.4; margin-top: 2px; font-style: normal; }
        .stack-card-agents { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
        .stack-agent-pill { font-size: 10.5px; padding: 2px 7px; border-radius: 5px; border: 1px solid; white-space: nowrap; }
        .stack-card-usecases { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; }
        .stack-usecase { font-size: 10.5px; color: var(--text-tertiary); }
        .stack-card-footer { margin-top: auto; padding-top: 5px; }
        .stack-card-users { font-size: 10.5px; color: var(--text-tertiary); }

        /* ===== COLLECTION CARD ===== */
        .collection-card {
          overflow: hidden; background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; border-radius: 16px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          min-width: 230px; scroll-snap-align: start;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 22px 46px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .collection-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-3px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 26px 54px rgba(0,0,0,0.5);
        }
        .collection-card-stripe { height: 5px; }
        .collection-card-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 4px; }
        .collection-card-name { font-size: 14px; font-weight: 600; }
        .collection-card-desc { font-size: 12px; color: var(--text-secondary); }
        .collection-card-meta { display: flex; justify-content: space-between; margin-top: 5px; font-size: 10.5px; color: var(--text-tertiary); }
        .collection-card-curator { font-style: normal; font-weight: 500; }

        /* ===== INTEGRATION CARD ===== */
        .integration-card {
          display: flex; flex-direction: column; align-items: center; gap: 7px;
          padding: 16px 10px; background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; border-radius: 14px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          text-align: center; min-width: 115px; scroll-snap-align: start;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 20px 40px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .integration-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-3px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 48px rgba(0,0,0,0.5);
        }
        .integration-card-icon {
          width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center;
          justify-content: center; font-size: 19px; border: 1px solid;
        }
        .integration-card-name { font-size: 12.5px; font-weight: 600; }
        .integration-card-count { font-size: 10.5px; color: var(--text-tertiary); }

        /* ===== PAIRING CARD ===== */
        .pairing-card {
          padding: 14px 16px; background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent; border-radius: 14px; cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          min-width: 260px; scroll-snap-align: start;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 22px 46px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .pairing-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-2px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 26px 54px rgba(0,0,0,0.5);
        }
        .pairing-agents { display: flex; align-items: center; gap: 10px; }
        .pairing-agent { display: flex; align-items: center; gap: 6px; }
        .pairing-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; }
        .pairing-name { font-size: 12.5px; font-weight: 600; white-space: nowrap; }
        .pairing-plus { font-size: 16px; color: var(--text-tertiary); font-weight: 300; }
        .pairing-why { font-size: 11px; color: var(--text-secondary); margin-top: 8px; line-height: 1.35; }

        /* ===== BADGES ===== */
        .badge-new { font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 6px; background: rgba(18,18,18,0.85); color: var(--accent-primary); border: 1px solid rgba(255,255,255,0.4); letter-spacing: 0.04em; text-transform: uppercase; }
        .badge-trending { font-size: 11px; }
        .badge-trending-lg { font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 6px; background: rgba(18,18,18,0.85); color: var(--accent-cool); border: 1px solid rgba(255,255,255,0.4); letter-spacing: 0.04em; text-transform: uppercase; }
        .badge-featured { font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 6px; background: rgba(18,18,18,0.85); color: var(--accent-warm); border: 1px solid rgba(255,255,255,0.4); letter-spacing: 0.04em; text-transform: uppercase; }

        /* ===== FEATURED MIXED ===== */
        .featured-mixed { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 12px; }
        .featured-mixed > :first-child { grid-row: 1 / 3; }

        /* ===== DIVIDER ===== */
        .section-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); margin: 4px 0; }

        /* ===== CATEGORY PILLS ===== */
        .category-pills { display: flex; gap: 7px; flex-wrap: wrap; }
        .category-pill {
          padding: 6px 14px; border-radius: 10px; background: rgba(18,18,18,0.78);
          border: 1px solid var(--border-subtle); font-size: 12px; color: var(--text-secondary);
          cursor: pointer; transition: all 0.15s; white-space: nowrap; letter-spacing: -0.01em;
        }
        .category-pill:hover { border-color: var(--border-medium); color: var(--text-primary); background: rgba(24,24,24,0.9); box-shadow: none; }

        /* ===== CATEGORY CARDS ===== */
        .category-card {
          padding: 14px; border-radius: 14px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent;
          display: flex; flex-direction: column; gap: 8px;
          cursor: pointer; transition: background 0.15s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 22px 46px rgba(0,0,0,0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .category-card:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) padding-box,
            var(--glass-border) border-box;
          transform: translateY(-3px);
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 26px 54px rgba(0,0,0,0.5);
        }
        .category-card-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .category-card-icon {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; font-size: 16px;
        }
        .category-card-count { font-size: 11px; color: var(--text-tertiary); }
        .category-card-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
        .category-card-desc { font-size: 11.5px; color: var(--text-secondary); line-height: 1.45; }
        .category-card-cta { font-size: 11px; font-weight: 600; color: var(--accent-primary); margin-top: 2px; letter-spacing: 0.02em; }

        /* ===== HIGHLIGHT BANNER ===== */
        .highlight-banner {
          display: flex; align-items: center; gap: 16px; padding: 18px 22px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box !important;
          border: 1px solid transparent;
          border-radius: 16px; cursor: pointer; transition: border-color 0.2s; position: relative; overflow: hidden;
          box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 50px rgba(0,0,0,0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .highlight-banner > * { position: relative; z-index: 1; }
        .highlight-banner:hover { border-color: var(--accent-primary); }
        .highlight-banner-icon { font-size: 28px; flex-shrink: 0; }
        .highlight-banner-text { flex: 1; }
        .highlight-banner-title { font-family: var(--font-display); font-size: 18px; color: var(--text-primary); letter-spacing: -0.02em; font-weight: 600; }
        .highlight-banner-desc { font-size: 12.5px; color: var(--text-secondary); margin-top: 2px; }
        .highlight-banner-cta {
          padding: 7px 16px; border-radius: 6px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-cool)) !important;
          color: #050505 !important; font-size: 12px; font-weight: 600; border: none; cursor: pointer; white-space: nowrap;
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.18);
        }

        /* ===== HOVER DETAIL PANEL ===== */
        .hover-detail {
          position: fixed; z-index: 1000; width: 320px;
          background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box,
            var(--glass-border) border-box;
          border: 1px solid transparent;
          border-radius: 14px; padding: 18px; box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 50px rgba(0,0,0,0.45);
          pointer-events: none; transition: opacity 0.2s ease;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
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
          background: rgba(255, 255, 255, 0.12); color: var(--accent-primary); border: 1px solid rgba(255, 255, 255, 0.25);
        }

        /* ===== RESPONSIVE ===== */
        /* ALL-ACCESS TOPBAR — PROMINENT */
        .aa-topbar { display: flex; align-items: center; gap: 7px; padding: 6px 16px; border-radius: 10px; background: rgba(18,18,18,0.85); border: 1px solid var(--aa-border); cursor: pointer; transition: all 0.25s; white-space: nowrap; box-shadow: inset 0 1px 0 rgba(255,255,255,0.08); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
        .aa-topbar:hover { border-color: rgba(255,255,255,0.35); background: rgba(24,24,24,0.9); }
        .aa-topbar-diamond { color: var(--aa); font-size: 12px; }
        .aa-topbar-label { font-size: 12px; font-weight: 600; color: var(--aa); letter-spacing: 0.02em; }
        .aa-topbar-sep { color: var(--aa-border); font-size: 12px; }
        .aa-topbar-sub { font-size: 11px; color: var(--aa-dim); font-weight: 500; }
        .aa-topbar-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--aa); flex-shrink: 0; opacity: 0.6; }

        /* HERO ALL-ACCESS CARD */
        .hero-content-wrap { display: flex; gap: 24px; align-items: stretch; position: relative; z-index: 1; }
        .hero-left { flex: 1; }
        .hero-aa-glow { position: absolute; top: -30px; right: 20px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%); pointer-events: none; }
        .hero-aa-card { position: relative; width: 240px; min-width: 240px; padding: 22px 20px; border-radius: 14px; background: linear-gradient(180deg, var(--glass-bg-strong), var(--glass-bg)) padding-box, var(--glass-border) border-box; border: 1px solid transparent; cursor: pointer; transition: all 0.3s; overflow: hidden; display: flex; flex-direction: column; gap: 6px; box-shadow: inset 0 1px 0 var(--glass-highlight), 0 24px 50px rgba(0,0,0,0.45); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .hero-aa-card:hover { transform: translateY(-2px); box-shadow: inset 0 1px 0 var(--glass-highlight), 0 28px 60px rgba(0,0,0,0.55); }
        .hero-aa-card-glow { position: absolute; top: -30px; left: -30px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%); pointer-events: none; }
        .hero-aa-icon { color: var(--aa); font-size: 22px; position: relative; }
        .hero-aa-label { font-family: var(--font-display); font-size: 20px; color: var(--text-primary); position: relative; letter-spacing: -0.02em; font-weight: 600; }
        .hero-aa-desc { font-size: 11.5px; color: var(--text-secondary); line-height: 1.45; position: relative; flex: 1; }
        .hero-aa-price { font-size: 18px; font-weight: 700; color: var(--text-primary); position: relative; margin-top: 4px; font-variant-numeric: tabular-nums; }
        .hero-aa-cta { padding: 8px 0; border-radius: 10px; background: rgba(18,18,18,0.85); color: #fff; font-size: 12px; font-weight: 600; text-align: center; position: relative; transition: opacity .15s; letter-spacing: 0.02em; margin-top: 4px; border: 1px solid rgba(255,255,255,0.2); }
        .hero-aa-card:hover .hero-aa-cta { opacity: .9; }

        /* STICKY ALL-ACCESS BAR */
        .aa-sticky-bar { position: sticky; top: 0; z-index: 40; opacity: 0; transform: translateY(-100%); transition: all 0.35s cubic-bezier(.4,0,.2,1); pointer-events: none; }
        .aa-sticky-bar-show { opacity: 1; transform: translateY(0); pointer-events: all; }
        .aa-sticky-inner { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 9px 20px; background: rgba(12,12,12,0.9); border-bottom: 1px solid var(--border-subtle); backdrop-filter: blur(12px); cursor: pointer; transition: background .2s; box-shadow: none; }
        .aa-sticky-inner:hover { background: rgba(20,20,20,0.92); }
        .aa-sticky-diamond { color: var(--aa); font-size: 12px; }
        .aa-sticky-text { font-size: 12.5px; color: var(--text-secondary); }
        .aa-sticky-text strong { color: var(--text-primary); font-weight: 700; }
        .aa-sticky-price { font-size: 12.5px; font-weight: 700; color: var(--text-primary); margin-left: 4px; }
        .aa-sticky-cta { padding: 4px 14px; border-radius: 10px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-cool)); color: #050505; font-size: 11px; font-weight: 600; margin-left: 8px; transition: opacity .15s; letter-spacing: 0.02em; box-shadow: 0 6px 16px rgba(255,255,255,0.18); }
        .aa-sticky-inner:hover .aa-sticky-cta { opacity: .9; }
        /* AA CARD BADGE */
        .aa-badge { font-size: 9.5px; font-weight: 600; padding: 2px 7px; border-radius: 6px; background: rgba(18,18,18,0.85); color: var(--text-primary); border: 1px solid rgba(255,255,255,0.2); letter-spacing: 0.04em; white-space: nowrap; text-transform: uppercase; }
        /* AA STACK RUN BUTTON */
        .aa-run { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 8px; background: rgba(18,18,18,0.85); border: 1px solid rgba(255,255,255,0.2); color: var(--text-primary); font-size: 10.5px; font-weight: 600; font-family: var(--font-body); cursor: pointer; transition: all .15s; white-space: nowrap; letter-spacing: 0.02em; }
        .aa-run:hover { background: rgba(24,24,24,0.9); border-color: rgba(255,255,255,0.35); }
        .aa-run-active { background: var(--accent-primary); color: #050505; border-color: var(--accent-primary); box-shadow: 0 6px 14px rgba(255,255,255,0.2); }
        .aa-run-active:hover { opacity: .9; }
        .aa-run-diamond { font-size: 8px; }
        /* AA PANEL */
        .aa-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 2000; backdrop-filter: blur(6px); animation: aaFade .2s ease; }
        .aa-panel { position: fixed; top: 0; right: 0; width: 420px; height: 100vh; background: rgba(10,10,10,0.9); border-left: 1px solid var(--border-subtle); z-index: 2001; animation: aaSlide .25s ease; overflow-y: auto; box-shadow: -20px 0 50px rgba(0,0,0,0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .aa-panel::-webkit-scrollbar { width: 4px; } .aa-panel::-webkit-scrollbar-thumb { background: var(--border-subtle); border-radius: 2px; }
        @keyframes aaFade { from { opacity:0; } to { opacity:1; } }
        @keyframes aaSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .aa-panel-inner { padding: 28px 24px 40px; }
        .aa-panel-hdr { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .aa-panel-hdr-l { display: flex; align-items: center; gap: 12px; }
        .aa-panel-icn { width: 42px; height: 42px; border-radius: 10px; background: rgba(18,18,18,0.85); border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: var(--text-primary); font-size: 18px; }
        .aa-panel-ttl { font-family: var(--font-display); font-size: 20px; color: var(--text-primary); letter-spacing: -0.02em; font-weight: 600; }
        .aa-panel-sts { margin-top: 2px; display: flex; align-items: center; gap: 6px; font-size: 12px; }
        .aa-sts-on { color: var(--aa); } .aa-sts-off { color: var(--text-tertiary); }
        .aa-dot { width: 6px; height: 6px; border-radius: 50%; }
        .aa-dot-on { background: var(--aa); }
        .aa-dot-off { background: var(--text-tertiary); }
        .aa-close { background: none; border: none; color: var(--text-tertiary); font-size: 16px; cursor: pointer; padding: 4px; }
        .aa-close:hover { color: var(--text-primary); }
        .aa-ctx { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: rgba(18,18,18,0.85); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; margin-bottom: 20px; font-size: 12.5px; color: var(--text-primary); line-height: 1.4; }
        .aa-ctx-icn { font-size: 18px; flex-shrink: 0; }
        .aa-sec { margin-bottom: 24px; }
        .aa-sec-lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--text-tertiary); margin-bottom: 12px; }
        .aa-caps { display: flex; flex-direction: column; gap: 10px; }
        .aa-cap { display: flex; gap: 10px; align-items: flex-start; }
        .aa-cap-arr { color: var(--aa); font-size: 10px; margin-top: 4px; flex-shrink: 0; }
        .aa-cap-t { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .aa-cap-d { font-size: 12px; color: var(--text-tertiary); line-height: 1.4; margin-top: 1px; }
        .aa-cost { padding: 20px 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); margin-bottom: 24px; display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap; }
        .aa-cost-amt { font-family: var(--font-display); font-size: 36px; color: var(--text-primary); letter-spacing: -0.02em; }
        .aa-cost-per { font-size: 15px; color: var(--text-secondary); }
        .aa-cost-note { width: 100%; font-size: 12px; color: var(--text-secondary); margin-top: 6px; }
        .aa-acts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .aa-pri-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; border-radius: 10px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-cool)); color: #050505; font-size: 13px; font-weight: 600; font-family: var(--font-body); border: none; cursor: pointer; transition: opacity .15s; letter-spacing: 0.02em; box-shadow: 0 10px 24px rgba(255,255,255,0.18); }
        .aa-pri-btn:hover { opacity: .9; }
        .aa-sec-btn { width: 100%; padding: 10px; border-radius: 10px; background: rgba(18,18,18,0.85); border: 1px solid rgba(255,255,255,0.2); color: var(--text-secondary); font-size: 12.5px; font-family: var(--font-body); cursor: pointer; transition: all .15s; letter-spacing: 0.02em; }
        .aa-sec-btn:hover { border-color: rgba(255,255,255,0.35); color: var(--text-primary); }
        .aa-en-state { text-align: center; padding: 16px; background: rgba(18,18,18,0.85); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; }
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
          .closing-content { flex-direction: column; align-items: flex-start; }
          .closing-right { width: 100%; }
          .closing-btn { width: 100%; }
          .story-section { padding: 14px; border-radius: 8px; }
          .shelf-container { padding: 14px; border-radius: 8px; }
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
                  <span className="aa-sticky-text"><strong>All-Access</strong> — Immediate access to every agent. Learn by deploying, not guessing.</span>
                  <span className="aa-sticky-price">$1,000/mo</span>
                  <span className="aa-sticky-cta">Start All-Access →</span>
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
                    <div className="hero-title">Speedrun Your AI Transformation.</div>
                    <div className="hero-subtitle">We are enterprise integration consultants who believe the best way to plan is to deploy.</div>
                    <div className="hero-narrative">
                      Most enterprises spend months in discovery phases trying to predict their needs. We skip the speculation. We converge your existing organizational capabilities with agentic possibilities immediately.
                    </div>
                    <div className="hero-actions">
                      <button className="hero-cta" onClick={() => openAA()}>Start All-Access ($1,000/mo)</button>
                      <button className="hero-cta hero-cta-secondary">Book a Briefing</button>
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
                    <div className="hero-aa-desc">{aaEnabled ? "All-Access is active across the full library and reference stacks." : "Immediate access to the entire library. Start using now, learn what fits, then decide what to harden."}</div>
                    <div className="hero-aa-price">{aaEnabled ? "Active" : "$1,000 /mo"}</div>
                    <div className="hero-aa-cta">{aaEnabled ? "◆ Enabled" : "Enable All-Access →"}</div>
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
                      <div className="narrative-shelf-stack" style={{ "--accent": "var(--story-accent)" }}>
                        <div className="featured-mixed">
                          <div className="large-card">
                            <div className="large-card-glow" style={{ background: "radial-gradient(ellipse at 30% 20%, var(--story-accent-weak), transparent 70%)" }} />
                            <div className="large-card-content">
                              <div className="large-card-top">
                                <div className="large-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent), var(--story-accent-weak))" }}>
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
                                <span className="capability-chip" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Highest installs</span>
                                <span className="capability-chip" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Most reused</span>
                                <span className="capability-chip" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Proven outcomes</span>
                              </div>
                              <div className="large-card-meta">
                                <span className="large-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>TOP PICKS</span>
                                <span className="large-card-rating">High adoption</span>
                                <span className="large-card-users">Live usage</span>
                                <span className="large-card-price" style={{ color: "var(--story-accent)" }}>Active</span>
                              </div>
                              <div className="large-card-author">by adoption signals</div>
                              <button className="large-card-btn" style={{ background: "var(--story-accent)" }}>Browse top picks →</button>
                            </div>
                          </div>
                          <div className="medium-card">
                            <div className="medium-card-header">
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>🧾</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-new">OPS</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Operations Stack.</div>
                            <div className="medium-card-tagline">Invoice Parser, Logistics Coordinator, Shift Scheduler.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Finance</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Logistics</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Scheduling</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>OPERATIONS</span>
                              <span className="medium-card-rating">★ In use</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Active</span>
                            </div>
                            <div className="medium-card-author">by ops teams</div>
                          </div>
                          <div className="medium-card">
                            <div className="medium-card-header">
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>🎨</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-trending">◆</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Creative Suite.</div>
                            <div className="medium-card-tagline">Asset Generator, Brand Voice Tuner, Layout Assistant.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Assets</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Brand voice</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Layouts</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>CREATIVE</span>
                              <span className="medium-card-rating">★ In use</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Active</span>
                            </div>
                            <div className="medium-card-author">by creative teams</div>
                          </div>
                        </div>
                        <div className="grid-3">
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🧰</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Library access</div>
                              <div className="compact-card-tagline">Every agent available day one</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Immediate</span>
                                <span className="compact-card-users">Full catalog</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Unlocked</span>
                              </div>
                            </div>
                          </div>
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🔐</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Default access</div>
                              <div className="compact-card-tagline">Roles and scopes prewired</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Safe</span>
                                <span className="compact-card-users">Scoped</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Ready</span>
                              </div>
                            </div>
                          </div>
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🧾</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Usage trace</div>
                              <div className="compact-card-tagline">Every action is visible</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Trace</span>
                                <span className="compact-card-users">Signals</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Live</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-banner">100+ agents available on Day 1.</div>
                        <div className="grid-4">
                          <div className="integration-card">
                            <div className="integration-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>📈</span>
                            </div>
                            <div className="integration-card-name">Finance ops</div>
                            <div className="integration-card-count">Invoice flows</div>
                          </div>
                          <div className="integration-card">
                            <div className="integration-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🔁</span>
                            </div>
                            <div className="integration-card-name">Logistics</div>
                            <div className="integration-card-count">Routing & handoff</div>
                          </div>
                          <div className="integration-card">
                            <div className="integration-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>⏱️</span>
                            </div>
                            <div className="integration-card-name">Scheduling</div>
                            <div className="integration-card-count">Shift coverage</div>
                          </div>
                          <div className="integration-card">
                            <div className="integration-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
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
                            {STACKS.map(s => <StackCard key={s.id} stack={s} aaEnabled={aaEnabled} onAAClick={handleStackAA} />)}
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
                      <div className="narrative-shelf-stack" style={{ "--accent": "var(--story-accent)" }}>
                        <div className="grid-2">
                          <div className="stack-card">
                            <div className="stack-card-header">
                              <div className="stack-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                                <span>📡</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span className="stack-card-count">Sensemaking</span>
                              </div>
                            </div>
                            <div className="stack-card-name">Sensemaking Dashboard</div>
                            <div className="stack-card-desc">Heatmap of agent activity across teams and workflows.</div>
                            <div className="stack-card-solves">High adoption vs. abandonment at a glance.</div>
                            <div className="stack-card-agents">
                              <span className="stack-agent-pill" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Adoption heatmap</span>
                              <span className="stack-agent-pill" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Abandonment signal</span>
                              <span className="stack-agent-pill" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Workflow winners</span>
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
                            <div className="collection-card-stripe" style={{ background: "linear-gradient(135deg, var(--story-accent), var(--story-accent-weak))" }} />
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
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>★</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-trending">★</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Community Favorites.</div>
                            <div className="medium-card-tagline">Agents with the highest engagement and repeat use.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Engagement</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Retention</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Outcomes</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>FAVORITES</span>
                              <span className="medium-card-rating">★ High</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Active</span>
                            </div>
                            <div className="medium-card-author">by community signals</div>
                          </div>
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🧪</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Experimental shelf</div>
                              <div className="compact-card-tagline">Beta agents testing new workflows</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Beta</span>
                                <span className="compact-card-users">In trials</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Exploring</span>
                              </div>
                            </div>
                          </div>
                          <div className="integration-card">
                            <div className="integration-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>📊</span>
                            </div>
                            <div className="integration-card-name">Adoption signals</div>
                            <div className="integration-card-count">Engagement score</div>
                          </div>
                        </div>
                        <div className="grid-2">
                          <div className="pairing-card" style={{ "--accent-primary": "var(--story-accent)" }}>
                            <div className="pairing-agents">
                              <div className="pairing-agent">
                                <span className="pairing-icon" style={{ background: "var(--story-accent-weak)" }}>🧑‍💼</span>
                                <span className="pairing-name">Team Lead</span>
                              </div>
                              <span className="pairing-plus">+</span>
                              <div className="pairing-agent">
                                <span className="pairing-icon" style={{ background: "var(--story-accent-weak)" }}>📈</span>
                                <span className="pairing-name">Usage Signals</span>
                              </div>
                            </div>
                            <div className="pairing-why">
                              People show intent; signals reveal what to harden next.
                            </div>
                          </div>
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🗺️</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Adoption heatmap</div>
                              <div className="compact-card-tagline">Daily usage by team</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Live</span>
                                <span className="compact-card-users">Signals</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Live</span>
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
                      <div className="narrative-shelf-stack" style={{ "--accent": "var(--story-accent)" }}>
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
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>🛠️</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-new">LOCKED</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Tune and harden.</div>
                            <div className="medium-card-tagline">Prompt reliability, output formats, and guardrails locked.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>QA gates</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Output schema</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Guardrails</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>STABILIZE</span>
                              <span className="medium-card-rating">★ Phase 2</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Locked</span>
                            </div>
                            <div className="medium-card-author">by reliability ops</div>
                          </div>
                          <div className="medium-card">
                            <div className="medium-card-header">
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>🔁</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-trending">↻</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Workflow consistency.</div>
                            <div className="medium-card-tagline">Standardize handoffs and ensure the same outcome each run.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Handoff specs</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Quality checks</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Run templates</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>NORMALIZE</span>
                              <span className="medium-card-rating">★ Phase 2</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Repeatable</span>
                            </div>
                            <div className="medium-card-author">by workflow owners</div>
                          </div>
                          <div className="medium-card">
                            <div className="medium-card-header">
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>🔗</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-trending">◆</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Integration depth.</div>
                            <div className="medium-card-tagline">Connectors extend into org systems and data pipelines.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>SSO roles</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Data pipelines</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Ops hooks</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>DEEPEN</span>
                              <span className="medium-card-rating">★ Phase 2</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Embedded</span>
                            </div>
                            <div className="medium-card-author">by systems team</div>
                          </div>
                        </div>
                        <div className="grid-2">
                          <div className="stack-card">
                            <div className="stack-card-header">
                              <div className="stack-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                                <span>♻️</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span className="stack-card-count">3 steps</span>
                              </div>
                            </div>
                            <div className="stack-card-name">Stabilization loop</div>
                            <div className="stack-card-desc">Tune agents, normalize workflows, then deepen integrations.</div>
                            <div className="stack-card-solves">Repeat until systems are stable.</div>
                            <div className="stack-card-agents">
                              <span className="stack-agent-pill" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Tune</span>
                              <span className="stack-agent-pill" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Normalize</span>
                              <span className="stack-agent-pill" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Deepen</span>
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
                            <div className="collection-card-stripe" style={{ background: "linear-gradient(135deg, var(--story-accent), var(--story-accent-weak))" }} />
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
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>✅</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Prompt QA</div>
                              <div className="compact-card-tagline">Quality checks per run</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Passed</span>
                                <span className="compact-card-users">Checks</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Ready</span>
                              </div>
                            </div>
                          </div>
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>📦</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Run templates</div>
                              <div className="compact-card-tagline">Repeatable job specs</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Stable</span>
                                <span className="compact-card-users">Templates</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Shared</span>
                              </div>
                            </div>
                          </div>
                          <div className="integration-card">
                            <div className="integration-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
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
                      <div className="narrative-shelf-stack" style={{ "--accent": "var(--story-accent)" }}>
                        <div className="featured-mixed">
                          <div className="large-card">
                            <div className="large-card-glow" style={{ background: "radial-gradient(ellipse at 30% 20%, var(--story-accent-weak), transparent 70%)" }} />
                            <div className="large-card-content">
                              <div className="large-card-top">
                                <div className="large-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent), var(--story-accent-weak))" }}>
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
                                <span className="capability-chip" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>People nodes</span>
                                <span className="capability-chip" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Agent nodes</span>
                                <span className="capability-chip" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>Workflow edges</span>
                              </div>
                              <div className="large-card-meta">
                                <span className="large-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)", borderColor: "var(--story-accent-border)" }}>INTEGRATED</span>
                                <span className="large-card-rating">Networked</span>
                                <span className="large-card-users">Real teams</span>
                                <span className="large-card-price" style={{ color: "var(--story-accent)" }}>Live</span>
                              </div>
                              <div className="large-card-author">by adoption map</div>
                              <button className="large-card-btn" style={{ background: "var(--story-accent)" }}>See the network →</button>
                            </div>
                          </div>
                          <div className="medium-card">
                            <div className="medium-card-header">
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>🏗️</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-new">OWNED</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Ownership transfer.</div>
                            <div className="medium-card-tagline">Systems live in your infra with docs and handoff.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Your code</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Your models</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Your infra</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>OWNERSHIP</span>
                              <span className="medium-card-rating">★ Handoff</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Yours</span>
                            </div>
                            <div className="medium-card-author">by platform team</div>
                          </div>
                          <div className="medium-card">
                            <div className="medium-card-header">
                              <div className="medium-card-icon" style={{ background: "linear-gradient(135deg, var(--story-accent-weak), transparent)", borderColor: "var(--story-accent-border)" }}>
                                <span>🌱</span>
                              </div>
                              <div className="medium-card-badges">
                                <span className="badge-trending">↑</span>
                              </div>
                            </div>
                            <div className="medium-card-name">Capability shift.</div>
                            <div className="medium-card-tagline">From usage to independence across teams.</div>
                            <div className="medium-card-capabilities">
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Internal builders</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Playbooks</span>
                              <span className="capability-dot" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>Extension path</span>
                            </div>
                            <div className="medium-card-footer">
                              <span className="medium-card-category" style={{ background: "var(--story-accent-weak)", color: "var(--story-accent)" }}>CAPABILITY</span>
                              <span className="medium-card-rating">★ Durable</span>
                              <span className="medium-card-price" style={{ color: "var(--story-accent)" }}>Independent</span>
                            </div>
                            <div className="medium-card-author">by enablement</div>
                          </div>
                        </div>
                        <div className="text-banner">Marketing found the Copy Agent. HR found the Policy Agent. We just provided the platform.</div>
                        <div className="grid-2">
                          <div className="collection-card">
                            <div className="collection-card-stripe" style={{ background: "linear-gradient(135deg, var(--story-accent), var(--story-accent-weak))" }} />
                            <div className="collection-card-body">
                              <div className="collection-card-name">Internal platform</div>
                              <div className="collection-card-desc">A durable capability teams can extend and maintain.</div>
                              <div className="collection-card-meta">
                                <span>Long-term</span>
                                <span className="collection-card-curator">Your org</span>
                              </div>
                            </div>
                          </div>
                          <div className="pairing-card" style={{ "--accent-primary": "var(--story-accent)" }}>
                            <div className="pairing-agents">
                              <div className="pairing-agent">
                                <span className="pairing-icon" style={{ background: "var(--story-accent-weak)" }}>🧱</span>
                                <span className="pairing-name">Your stack</span>
                              </div>
                              <span className="pairing-plus">+</span>
                              <div className="pairing-agent">
                                <span className="pairing-icon" style={{ background: "var(--story-accent-weak)" }}>✨</span>
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
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🧩</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Custom workflows</div>
                              <div className="compact-card-tagline">Built around your ops</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Tailored</span>
                                <span className="compact-card-users">Org fit</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Aligned</span>
                              </div>
                            </div>
                          </div>
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🛡️</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Production grade</div>
                              <div className="compact-card-tagline">Hardened for scale</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Reliable</span>
                                <span className="compact-card-users">Ops-ready</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Stable</span>
                              </div>
                            </div>
                          </div>
                          <div className="compact-card">
                            <div className="compact-card-icon" style={{ background: "var(--story-accent-weak)", borderColor: "var(--story-accent-border)" }}>
                              <span>🏷️</span>
                            </div>
                            <div className="compact-card-info">
                              <div className="compact-card-name">Built on your stack</div>
                              <div className="compact-card-tagline">Your infra + models</div>
                              <div className="compact-card-meta">
                                <span className="compact-card-rating">★ Yours</span>
                                <span className="compact-card-users">In-house</span>
                                <span className="compact-card-price" style={{ color: "var(--story-accent)" }}>Owned</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="closing-section">
                <div className="closing-content">
                  <div className="closing-left">
                    <div className="closing-title">Ready to Speedrun?</div>
                    <div className="closing-subtitle">Stop guessing. Start using.</div>
                  </div>
                  <div className="closing-right">
                    <button className="closing-btn" onClick={() => openAA()}>Get All-Access ($1,000/mo)</button>
                    <button className="closing-btn closing-btn-secondary">Contact Us</button>
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
