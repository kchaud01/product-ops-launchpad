'use client'

import React, { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  Plus,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  ArrowLeft,
  Activity,
  Terminal,
  RotateCcw,
  Users,
  Wrench,
  BookOpen,
  HelpCircle
} from 'lucide-react'

// CLEARLY DEFINED CROSS-FUNCTIONAL EXPECTATION SCHEMAS
interface PodContract {
  roleName: string
  clearExpectation: string
  primaryTools: string
  whenToHandoff: string
}

interface PlaybookStep {
  stepNumber: string
  whatToDo: string
  toolToUse: string
}

interface PillarConfig {
  name: string
  businessGoal: string
  systemsOwned: string
  icon: any
  bg: string
  border: string
  text: string
  accentColor: string
  informationInputs: string // Layer 1: Core Information Sources
  automatedAssets: string   // Layer 2: Automated Tools Built
  alertTriggers: string     // Layer 3: Our Customer Promise & Alert Triggers
  teamRoles: {
    Sales: PodContract
    AccountManagement: PodContract
    Product: PodContract
    Technology: PodContract
  }
  stepByStepPlaybook: PlaybookStep[]
}

const LAHZO_BUSINESS_MATRIX: PillarConfig[] = [
  {
    name: "Dealership Inventory Sync",
    businessGoal: "Make sure the cars, boats, or RVs listed on the dealership's website perfectly match what our AI Sales Agents talk about in real-time.",
    systemsOwned: "Automated vehicle price & detail checkers, dealership system integrations.",
    icon: Terminal,
    bg: "bg-indigo-50/70",
    border: "border-indigo-200/50",
    text: "text-indigo-700",
    accentColor: "indigo",
    informationInputs: "Live vehicle lists, prices, and features updating directly from the dealership's inventory systems.",
    automatedAssets: "An automated background checker that scans for missing vehicle details and alerts us before a customer notices.",
    alertTriggers: "Send an automatic emergency ticket to engineering if a car's price or description disappears during an active customer chat.",
    teamRoles: {
      Sales: {
        roleName: "Ad & Campaign Setup",
        clearExpectation: "Double-check that the vehicles featured in our active Facebook/Google ads match the client's current physical inventory specials.",
        primaryTools: "Lahzo Campaign Creator, Facebook Ad Manager",
        whenToHandoff: "When launching a new promotional package or entering new inventory categories into the active ad queue."
      },
      AccountManagement: {
        roleName: "Onboarding Coordinator",
        clearExpectation: "Collect the tech setup files and inventory access credentials from the dealership's IT lead during initial client setup.",
        primaryTools: "Client Onboarding Dashboard, Dealership CRM Portals (VinSolutions, CDK)",
        whenToHandoff: "Immediately during week one of client onboarding, or if the dealer changes their internal inventory system."
      },
      Product: {
        roleName: "AI Knowledge Manager",
        clearExpectation: "Structure the incoming inventory information so our AI agents can read details perfectly without hallucinating details.",
        primaryTools: "Lahzo Core Prompts Management Workspace",
        whenToHandoff: "When updating how the AI references specific vehicle options, trims, or localized package details."
      },
      Technology: {
        roleName: "Integration Systems Guard",
        clearExpectation: "Build stable data connections and monitor them to ensure dealer systems communicate smoothly with our servers.",
        primaryTools: "Lahzo Integration Monitor, Automated Field Matcher",
        whenToHandoff: "When the system detects a change in the dealership's data format or an active integration link drops."
      }
    },
    stepByStepPlaybook: [
      { stepNumber: "Step 1: Check Connection Status", whatToDo: "Open the client profile and review the latest communication records to pinpoint where the update failed.", toolToUse: "Integration Status Console" },
      { stepNumber: "Step 2: Map Missing Fields", whatToDo: "Verify if the dealership changed their vehicle field names (e.g., changing 'Cost' to 'Retail Price') and update our platform labels to match.", toolToUse: "Lahzo Field Matcher Panel" },
      { stepNumber: "Step 3: Update AI Memory", whatToDo: "Force a refresh of the AI's vehicle database to immediately provide the agent with the updated pricing details.", toolToUse: "AI Content Refresh Tool" }
    ]
  },
  {
    name: "Hot Lead Handoff & Routing",
    businessGoal: "Eliminate dropped leads during late-night automated chats by ensuring every verified appointment goes straight to the dealership's team.",
    systemsOwned: "Appointment dispatch hooks, customer notification loops, dealership CRM lead injectors.",
    icon: Zap,
    bg: "bg-amber-50/70",
    border: "border-amber-200/50",
    text: "text-amber-700",
    accentColor: "amber",
    informationInputs: "Customer conversation logs, appointment booking details, and dealership CRM delivery receipt confirmations.",
    automatedAssets: "An automated emergency system that texts, emails, and alerts the right team member until someone confirms receipt.",
    alertTriggers: "Trigger an immediate red-flag notification if a hot customer appointment fails to push into a dealership's CRM system within 3 minutes.",
    teamRoles: {
      Sales: {
        roleName: "Lead Quality Evaluator",
        clearExpectation: "Regularly audit ongoing chat logs to ensure our automated conversational setups accurately lock in qualified appointment bookings.",
        primaryTools: "Lahzo Conversation Playback Monitor",
        whenToHandoff: "Weekly during account optimization sweeps, or if an automated chat handles a high-value buyer inquiry poorly."
      },
      AccountManagement: {
        roleName: "Dealer Success Advisor",
        clearExpectation: "Monitor how quickly the dealership's floor staff responds to the automated lead alerts we dispatch to them.",
        primaryTools: "HubSpot CRM, Lahzo Account Health Scores",
        whenToHandoff: "During regular monthly client reviews, or if a dealer reports they aren't seeing appointments show up on their calendar."
      },
      Product: {
        roleName: "Conversational Goal Designer",
        clearExpectation: "Refine our booking conversation templates to naturally guide customers toward scheduling on-site visits.",
        primaryTools: "Dialogue Workflow Mapping Tool",
        whenToHandoff: "When launching a brand new dealership vertical market (such as Powersports or Marine networks)."
      },
      Technology: {
        roleName: "Messaging Network Guard",
        clearExpectation: "Keep lead delivery lines open and maintain alternative text and email alert fallback routing channels.",
        primaryTools: "Database Message Queues, Twilio API Tracker",
        whenToHandoff: "If a major mobile carrier drop occurs or a third-party CRM system goes down for maintenance."
      }
    },
    stepByStepPlaybook: [
      { stepNumber: "Step 1: Verify the Booking Details", whatToDo: "Review the chat history to verify the customer provided a complete name, phone number, and targeted vehicle interest.", toolToUse: "Lahzo Customer Chat Log" },
      { stepNumber: "Step 2: Trigger Manual Delivery", whatToDo: "Click the manual bypass button to push the customer details straight to the backup email and text distribution list.", toolToUse: "Lead Dispatch Override Panel" },
      { stepNumber: "Step 3: Alert Account Team", whatToDo: "Log a connection task so the assigned Account Manager can notify the dealership's software administrator about the CRM blockage.", toolToUse: "Internal Support Desk" }
    ]
  },
  {
    name: "Customer Request & New Vertical Filtering",
    businessGoal: "Route incoming feature requests down two clear paths: a fast-tracked pipeline for established industries, and a white-glove discovery process for brand-new industry verticals.",
    systemsOwned: "Feature intake submission forms, vertical readiness filters, cross-functional discovery playbooks.",
    icon: Layers,
    bg: "bg-violet-50/70",
    border: "border-violet-200/50",
    text: "text-violet-700",
    accentColor: "violet",
    informationInputs: "Incoming client requests, account history metrics, and industry classification details.",
    automatedAssets: "An intelligent sorting checklist that filters new requests to prevent unverified custom requests from disrupting core engineering sprints.",
    alertTriggers: "Flag an immediate operational review if a custom request for a brand-new industry vertical is assigned directly to an engineer without a pre-flight Product evaluation.",
    teamRoles: {
      Sales: {
        roleName: "Deal Alignment Gatekeeper",
        clearExpectation: "For known verticals, sell standard configurations. For net-new verticals, clear custom features with Product before promising them to close a deal.",
        primaryTools: "Lahzo Pricing Sheet, Deal Ingestion Portal",
        whenToHandoff: "When a high-value prospect in a brand-new industry vertical requires custom functionality to sign a contract."
      },
      AccountManagement: {
        roleName: "Client Request Clarifier",
        clearExpectation: "For known verticals, map requests to existing platform documentation. For net-new verticals, serve as the high-touch coordinator gathering specialized business logic.",
        primaryTools: "Lahzo Central Feedback Dashboard, Notion Playbooks",
        whenToHandoff: "When a request cannot be solved using current features and needs to be triaged for the product roadmap."
      },
      Product: {
        roleName: "Intake & Discovery Lead",
        clearExpectation: "For known verticals, prioritize requests against the existing roadmap. For net-new verticals, lead high-touch discovery workshops to map out the foundational product rules.",
        primaryTools: "Productboard, Organizational Alignment Framework",
        whenToHandoff: "When custom vertical logic has been verified, scoped, and is ready for technical implementation."
      },
      Technology: {
        roleName: "Technical Feasibility Critic",
        clearExpectation: "For known verticals, deploy configurations via pre-built code systems. For net-new verticals, run architectural reviews to flag core data pipeline or infrastructure risks.",
        primaryTools: "Jira Architecture Desk, Systems Mapping Blueprint",
        whenToHandoff: "When a new vertical's custom integration needs structural review before core development cycles begin."
      }
    },
    stepByStepPlaybook: [
      { stepNumber: "Step 1: Check Industry Label", whatToDo: "Look up the client's industry classification to check if it falls under an established playbook or a brand-new industry sector.", toolToUse: "Lahzo Account Registry" },
      { stepNumber: "Step 2: Check Feature Matching", whatToDo: "Review current technical documents to determine if the request can be answered using existing systems or if it requires a brand-new setup.", toolToUse: "Lahzo Capability Library" },
      { stepNumber: "Step 3: Route to Target Path", whatToDo: "Send standard requests to the product backlog loop, or route net-new requests to the high-touch, cross-functional discovery group.", toolToUse: "Productboard Intake Gateway" }
    ]
  },
  {
    name: "Closed-Loop Performance Attribution",
    businessGoal: "Trace exactly which Facebook or Google ad originally brought in a customer who ended up buying a vehicle from the dealership.",
    systemsOwned: "Online marketing tracking tags, ad campaign parameters, and sales matching databases.",
    icon: LayoutDashboard,
    bg: "bg-blue-50/70",
    border: "border-blue-200/50",
    text: "text-blue-700",
    accentColor: "blue",
    informationInputs: "Click tracking logs, campaign names, and completed purchase logs from the dealer's sales records.",
    automatedAssets: "An automated script that links active website chats to the specific ad campaign the user clicked.",
    alertTriggers: "Send an alert to the account team if user campaign details fail to attach to their active chat session logs.",
    teamRoles: {
      Sales: {
        roleName: "Ad Performance Adjuster",
        clearExpectation: "Adjust marketing budgets to focus on the ad campaigns generating actual vehicle sales rather than simple clicks.",
        primaryTools: "Facebook Ads Manager, Google Analytics",
        whenToHandoff: "Weekly when adjusting campaign budgets or launching new vehicle promo designs."
      },
      AccountManagement: {
        roleName: "ROI Report Presenter",
        clearExpectation: "Match monthly closed sales lists with the original ad campaigns to show the dealership exactly how much revenue our system generated for them.",
        primaryTools: "Lahzo Revenue Dashboard, Microsoft Excel",
        whenToHandoff: "Prior to monthly client performance calls or quarterly business review meetings."
      },
      Product: {
        roleName: "Marketing Data Architect",
        clearExpectation: "Maintain stable parameters in our chat windows so ad tracking data successfully passes down the funnel.",
        primaryTools: "Google Tag Manager, Segment Console",
        whenToHandoff: "When deploying updates to our main website chat widgets or integrating new tracking software."
      },
      Technology: {
        roleName: "Database Matcher Engine",
        clearExpectation: "Run automated match jobs that connect CRM buyers to website click histories without creating duplicate logs.",
        primaryTools: "PostgreSQL Database Engine, Snowflake Data Console",
        whenToHandoff: "When standard nightly matching scripts report high error rates or duplicate contacts."
      }
    },
    stepByStepPlaybook: [
      { stepNumber: "Step 1: Check Tracking Codes", whatToDo: "Test the dealership's active campaign links to confirm they include the required tracking tags.", toolToUse: "Google Tag Assistant" },
      { stepNumber: "Step 2: Inspect Chat Session", whatToDo: "Check if the active database is correctly receiving campaign data from the customer's web browser.", toolToUse: "Session State Console" },
      { stepNumber: "Step 3: Run Database Matcher", whatToDo: "Trigger a manual attribution matching run to link outstanding sales records to campaign clicks.", toolToUse: "Attribution Sync Panel" }
    ]
  },
  {
    name: "AI Conversational Guardrails",
    businessGoal: "Ensure our AI sales agents remain extremely professional, follow local advertising laws, and steer conversations toward vehicle sales.",
    systemsOwned: "AI response safety filters, dialogue checks, and conversation prompt libraries.",
    icon: Sparkles,
    bg: "bg-emerald-50/70",
    border: "border-emerald-200/50",
    text: "text-emerald-700",
    accentColor: "emerald",
    informationInputs: "Active customer chat logs, AI compliance scores, and dealer-specific script requirements.",
    automatedAssets: "A built-in safety checker that blocks the AI from replying if it detects a response that goes off-topic or mentions incorrect prices.",
    alertTriggers: "Trigger a notification to the product team if the AI attempts to send a price estimate that differs from the live inventory system.",
    teamRoles: {
      Sales: {
        roleName: "Script & Deal Configurator",
        clearExpectation: "Identify custom promotional scripts or regional financing offers that need to be fed into the AI's training context.",
        primaryTools: "Lahzo Script Manager",
        whenToHandoff: "When the dealer launches a seasonal promotion or special discount rate program."
      },
      AccountManagement: {
        roleName: "Compliance & Tone Inspector",
        clearExpectation: "Review past chat logs to ensure the AI's tone, wording, and disclosures perfectly match the dealership's brand requirements.",
        primaryTools: "Lahzo Quality Review Portal",
        whenToHandoff: "When onboarding a new dealer client or addressing feedback from a dealership general manager."
      },
      Product: {
        roleName: "AI Instructions Owner",
        clearExpectation: "Refine prompt libraries and safety rules so the AI answers customer questions accurately without going off track.",
        primaryTools: "Lahzo Prompt Workspace",
        whenToHandoff: "When updating prompt guidelines for specific vehicle categories or financing programs."
      },
      Technology: {
        roleName: "Safety Pipeline Monitor",
        clearExpectation: "Optimize database speed and keep response check scripts running quickly to prevent lag during active chats.",
        primaryTools: "Lahzo Safety Guardrail Console",
        whenToHandoff: "When latency metrics show delays in safety validation or when model endpoints fail to respond."
      }
    },
    stepByStepPlaybook: [
      { stepNumber: "Step 1: Isolate the Chat Log", whatToDo: "Retrieve the specific customer conversation that triggered a safety alert or compliance flag.", toolToUse: "Guardrail Incident Logs" },
      { stepNumber: "Step 2: Adjust Prompt Settings", whatToDo: "Refine prompt parameters in the training sandbox to handle the customer's unique scenario cleanly.", toolToUse: "Prompt Testing Sandbox" },
      { stepNumber: "Step 3: Run Safety Verification", whatToDo: "Test the updated instructions against a batch of historical conversations to ensure nothing else was broken.", toolToUse: "Regression Test Suite" }
    ]
  },
  {
    name: "Client Zero-Churn Compliance",
    businessGoal: "Perform automated pre-launch checks and continuously monitor live accounts to ensure the system is completely stable and dealer staff are active.",
    systemsOwned: "System uptime checkers, account performance monitors, and pre-launch setup checkers.",
    icon: ShieldCheck,
    bg: "bg-rose-50/70",
    border: "border-rose-200/50",
    text: "text-rose-700",
    accentColor: "rose",
    informationInputs: "Server performance metrics, account setup completeness logs, and customer health parameters.",
    automatedAssets: "A pre-flight checklist app that scans active integrations and confirms everything is stable before a client goes live.",
    alertTriggers: "Send an immediate priority ticket if a live dealership's lead-delivery connection drops or goes offline for more than 5 minutes.",
    teamRoles: {
      Sales: {
        roleName: "Pre-Launch Validator",
        clearExpectation: "Ensure a new client meets all technological and system requirements before signing the final sales contract.",
        primaryTools: "Lahzo Pre-Launch Readiness App",
        whenToHandoff: "When moving a deal from the final proposal stage into active operational onboarding."
      },
      AccountManagement: {
        roleName: "Dealer Retention Monitor",
        clearExpectation: "Monitor account performance indicators and coordinate immediate action if a dealership's staff stops responding to hot lead alerts.",
        primaryTools: "Gainsight Account Suite, Account Status Console",
        whenToHandoff: "Daily during routine status audits, or if an account's health rating drops below standards."
      },
      Product: {
        roleName: "Release Quality Manager",
        clearExpectation: "Establish strict criteria for new software feature deployments to ensure we never disrupt active dealer systems.",
        primaryTools: "Product Release Registry",
        whenToHandoff: "When preparing to push a major software update from staging to live production."
      },
      Technology: {
        roleName: "Resilience System Engineer",
        clearExpectation: "Run continuous server checks and emergency simulation scripts to prove the entire system stands up under heavy loads.",
        primaryTools: "Lahzo Chaos Console, Automated Status Checkers",
        whenToHandoff: "During scheduled system upgrades, server maintenance windows, or platform security audits."
      }
    },
    stepByStepPlaybook: [
      { stepNumber: "Step 1: Run Pre-Flight Checklist", whatToDo: "Trigger the automated setup checks to ensure active connections, data lines, and phone numbers are green.", toolToUse: "Onboarding Launch Suite" },
      { stepNumber: "Step 2: Audit Communication Lines", whatToDo: "Test the speed and reliability of the dealership's text and email lines under heavy traffic simulations.", toolToUse: "API Speed Test Panel" },
      { stepNumber: "Step 3: Approve Live Setup", whatToDo: "Approve the dealer client to go fully live once every checklist item compiles cleanly with a green pass.", toolToUse: "Client Status Portal" }
    ]
  }
]

export default function HumanAccessibleLaunchpad() {
  const [appMode, setAppMode] = useState<'overview' | 'pillar-detail'>('overview')
  const [activePillarName, setActivePillarName] = useState<string>(LAHZO_BUSINESS_MATRIX[0].name)
  const [selectedPodView, setSelectedPodView] = useState<'Sales' | 'AccountManagement' | 'Product' | 'Technology'>('Product')
  const [activeTab, setActiveTab] = useState<'matrix' | 'playbook'>('matrix')
  const [systemLogs, setSystemLogs] = useState<string[]>([])

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    setSystemLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 6)])
  }

  useEffect(() => {
    addLog("Lahzo Operational Hub initialized.")
    addLog("Cross-functional team alignment matrices loaded successfully.")
  }, [])

  const currentPillar = LAHZO_BUSINESS_MATRIX.find(p => p.name === activePillarName) || LAHZO_BUSINESS_MATRIX[0]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f4f0] text-[#1b1c20] font-sans">
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        
        {/* UPPER CONSOLE BAR */}
        <header className="h-16 border-b border-black/10 bg-[#f5f4f0]/80 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#8a8d94] font-bold">Lahzo Workspace /</span>
            <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
              {appMode === 'overview' ? 'Core Arenas List' : 'Team Accountability Matrix'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5c5f66] bg-white border border-black/10 px-4 py-1.5 rounded-full font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span>Company-Wide View</span>
          </div>
        </header>

        {/* VIEW ROUTER CONTAINER */}
        <div className="flex-1 overflow-y-auto py-10">
          
          {/* PRIMARY WORKSPACE OVERVIEW VIEW */}
          {appMode === 'overview' && (
            <div className="w-full max-w-[94%] mx-auto px-6 flex flex-col gap-10 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 mx-auto font-mono uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Central Operations Hub</span>
                </div>
                <h2 className="text-4xl font-serif font-black tracking-tight text-[#1b1c20] leading-none">
                  Lahzo Product Operations Framework
                </h2>
                <p className="text-sm text-[#5c5f66]">
                  Select one of our core operational arenas below to see who owns what, view step-by-step team checklists, and browse the official templates and software tools assigned to each department.
                </p>
              </div>

              {/* Arenas Selector Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                {LAHZO_BUSINESS_MATRIX.map((pillar) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.name}
                      onClick={() => {
                        setActivePillarName(pillar.name)
                        setAppMode('pillar-detail')
                        addLog(`Opened team playbook matrix layer for: ${pillar.name}`)
                      }}
                      className="bg-white border border-[#d8d6cc] p-6 rounded-2xl text-left flex flex-col justify-between min-h-[260px] hover:border-[#1b1c20]/40 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex flex-col gap-4">
                        <div className={`w-10 h-10 rounded-xl ${pillar.bg} border ${pillar.border} flex items-center justify-center ${pillar.text} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-lg font-serif font-black text-[#1b1c20] tracking-tight group-hover:text-blue-600 transition-colors">{pillar.name}</h3>
                          <p className="text-xs text-[#5c5f66] mt-2 leading-relaxed">{pillar.businessGoal}</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-3 border-t border-[#ecebe4] flex flex-col gap-1 font-mono text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-[#8a8d94] font-bold uppercase">Emergency Trigger:</span>
                          <span className="text-rose-700 font-bold max-w-[220px] truncate">{pillar.alertTriggers}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Status Feed Console Box */}
              <div className="bg-white border border-[#d8d6cc] p-6 rounded-2xl flex flex-col gap-3 mt-4">
                <span className="text-xs text-[#8a8d94] font-bold uppercase tracking-wider font-mono flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> Recent Workspace Updates
                </span>
                <div className="bg-[#1b1c20] text-emerald-400 p-4 rounded-xl font-mono text-[11px] flex flex-col gap-1 shadow-inner">
                  {systemLogs.map((log, index) => <div key={index}>{log}</div>)}
                </div>
              </div>
            </div>
          )}

          {/* SECONDARY VIEWPORT: DETAIL OPERATING MATRIX INTERFACE */}
          {appMode === 'pillar-detail' && (
            <div className="w-full max-w-[94%] mx-auto px-6 flex flex-col gap-6 animate-in fade-in duration-200">
              
              {/* Back & Breadcrumb Bar */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAppMode('overview')}
                  className="p-2.5 border border-black/10 rounded-xl bg-white text-[#1b1c20] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full">
                    Active Operational Workspace
                  </span>
                  <h2 className="text-2xl font-serif font-black text-[#1b1c20] tracking-tight mt-0.5">{currentPillar.name}</h2>
                </div>
              </div>

              {/* THE THREE LOGICAL CORE BUSINESS FOUNDATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#1b1c20] text-white p-5 rounded-2xl shadow-sm font-sans text-xs">
                <div className="p-4 border border-white/5 rounded-xl bg-white/[0.03]">
                  <span className="text-blue-400 font-mono font-bold uppercase tracking-widest text-[10px] block mb-1">1. Key Information Inputs</span>
                  <p className="text-white/80 leading-relaxed text-[11px]">{currentPillar.informationInputs}</p>
                </div>
                <div className="p-4 border border-white/5 rounded-xl bg-white/[0.03]">
                  <span className="text-amber-400 font-mono font-bold uppercase tracking-widest text-[10px] block mb-1">2. Tools & Automations We Built</span>
                  <p className="text-white/80 leading-relaxed text-[11px]">{currentPillar.automatedAssets}</p>
                </div>
                <div className="p-4 border border-white/5 rounded-xl bg-white/[0.03]">
                  <span className="text-rose-400 font-mono font-bold uppercase tracking-widest text-[10px] block mb-1">3. Our Guarantee & Alert Triggers</span>
                  <p className="text-white/80 leading-relaxed text-[11px]">{currentPillar.alertTriggers}</p>
                </div>
              </div>

              {/* MAIN INTERACTIVE WORKSPACE DRAWER PANEL */}
              <div className="bg-white border border-[#d8d6cc] rounded-2xl shadow-sm overflow-hidden flex flex-col">
                
                {/* Mode Selector Tabs */}
                <div className="flex border-b border-[#ecebe4] bg-[#fbfbfa] px-6 py-2 justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setActiveTab('matrix'); addLog("Switched visual mode to Team Roles & Expectations Matrix."); }}
                      className={`px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${
                        activeTab === 'matrix' ? 'bg-[#1b1c20] text-white shadow-sm' : 'text-[#5c5f66] hover:bg-black/5'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5 inline mr-1.5" /> Interactive Team Roles Map
                    </button>
                    <button
                      onClick={() => { setActiveTab('playbook'); addLog("Switched visual mode to Standardized Processes Playbook."); }}
                      className={`px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${
                        activeTab === 'playbook' ? 'bg-[#1b1c20] text-white shadow-sm' : 'text-[#5c5f66] hover:bg-black/5'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 inline mr-1.5" /> Standard Processes & Tool Guides
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-[#8a8d94] font-bold uppercase hidden md:inline">
                    Scope: {currentPillar.systemsOwned}
                  </span>
                </div>

                {/* TAB WINDOW 1: TEAM CROSS-FUNCTIONAL CLICKABLE MATRIX ENGINE */}
                {activeTab === 'matrix' && (
                  <div className="p-6 md:p-8 flex flex-col gap-6 animate-in fade-in duration-100">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-base font-serif font-black text-[#1b1c20]">Interactive Department Responsibility Matrix</h3>
                      <p className="text-xs text-[#5c5f66]">Click on any department card below to immediately show what is expected of that group, the software tool they own, and when to pass work to the next pod.</p>
                    </div>

                    {/* Click map layout */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { id: 'Product', label: 'Product Management Team', styling: 'border-indigo-500 text-indigo-900 bg-indigo-50/40' },
                        { id: 'Technology', label: 'Engineering & Tech Pod', styling: 'border-emerald-500 text-emerald-900 bg-emerald-50/40' },
                        { id: 'AccountManagement', label: 'Account Management / CS', styling: 'border-violet-500 text-violet-900 bg-violet-50/40' },
                        { id: 'Sales', label: 'Sales Operations Team', styling: 'border-amber-500 text-amber-900 bg-amber-50/40' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setSelectedPodView(item.id as any); addLog(`Selected department info view card: ${item.id}`); }}
                          className={`p-5 border-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between min-h-[100px] ${
                            selectedPodView === item.id 
                              ? `${item.styling} shadow-md scale-[1.01]` 
                              : 'border-[#d8d6cc] bg-white hover:border-black/20'
                          }`}
                        >
                          <span className="text-xs font-serif font-black leading-tight">{item.label}</span>
                          <span className="text-[9px] font-mono uppercase text-[#8a8d94] font-bold tracking-wider mt-2">Click to select view</span>
                        </button>
                      ))}
                    </div>

                    {/* Accountability expansion card */}
                    <div className="p-5 bg-[#fbfbfa] border border-[#d8d6cc] rounded-xl flex flex-col gap-4">
                      <div className="flex items-center gap-2 border-b border-[#ecebe4] pb-2 text-xs font-mono font-bold text-[#1b1c20]">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Accountability Card: {selectedPodView.replace(/([A-Z])/g, ' $1').trim()} Department</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 border border-[#ecebe4] rounded-lg flex flex-col gap-1">
                          <span className="text-[9px] font-mono uppercase text-[#8a8d94] font-bold">Assigned Workspace Role</span>
                          <span className="text-sm font-serif font-black text-[#1b1c20]">{currentPillar.teamRoles[selectedPodView].roleName}</span>
                        </div>
                        <div className="bg-white p-4 border border-[#ecebe4] rounded-lg flex flex-col gap-1 md:col-span-2">
                          <span className="text-[9px] font-mono uppercase text-[#8a8d94] font-bold">What is Expected of Your Team</span>
                          <span className="text-xs text-[#4e515a] leading-relaxed font-sans">{currentPillar.teamRoles[selectedPodView].clearExpectation}</span>
                        </div>
                        <div className="bg-white p-4 border border-[#ecebe4] rounded-lg flex flex-col gap-1">
                          <span className="text-[9px] font-mono uppercase text-[#8a8d94] font-bold">Primary Software Tool to Open</span>
                          <span className="text-xs font-mono text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100 mt-1 max-w-fit">{currentPillar.teamRoles[selectedPodView].primaryTools}</span>
                        </div>
                        <div className="bg-white p-4 border border-[#ecebe4] rounded-lg flex flex-col gap-1 md:col-span-2">
                          <span className="text-[9px] font-mono uppercase text-[#8a8d94] font-bold">When to Hand Off This Process to Someone Else</span>
                          <span className="text-xs text-[#1b1c20] font-sans font-semibold mt-1">{currentPillar.teamRoles[selectedPodView].whenToHandoff}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB WINDOW 2: RUNBOOK SEQUENCES FOR CENTRAL STANDARDIZED PROCESSES */}
                {activeTab === 'playbook' && (
                  <div className="p-6 md:p-8 flex flex-col gap-6 animate-in fade-in duration-100">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-base font-serif font-black text-[#1b1c20]">Standardized Issue Playbook</h3>
                      <p className="text-xs text-[#5c5f66]">Follow these step-by-step instructions to troubleshoot anomalies or update system details without interrupting development sprints.</p>
                    </div>

                    <div className="border border-[#d8d6cc] rounded-xl overflow-hidden bg-white">
                      <table className="w-full text-left text-xs border-collapse font-sans">
                        <thead>
                          <tr className="bg-[#fbfbfa] border-b border-[#d8d6cc] text-[10px] font-bold text-[#8a8d94] uppercase tracking-wider font-mono">
                            <th className="py-3 px-6 w-[20%]">Sequence Step</th>
                            <th className="py-3 px-6 w-[60%]">Action Plan & Checklist Required</th>
                            <th className="py-3 px-6 w-[20%]">Software Platform Home</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ecebe4]">
                          {currentPillar.stepByStepPlaybook.map((item, index) => (
                            <tr key={index} className="hover:bg-[#fbfbfa]/50 transition-colors">
                              <td className="py-4 px-6 font-mono font-bold text-[#1b1c20]">{item.stepNumber}</td>
                              <td className="py-4 px-6 text-[#4e515a] leading-relaxed font-sans">{item.whatToDo}</td>
                              <td className="py-4 px-6">
                                <span className="px-2 py-1 border border-blue-100 bg-blue-50 text-blue-700 font-mono text-[10px] font-bold rounded">
                                  {item.toolToUse}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Help Block Sheet for Fast Cross-Functional Adoption */}
                    <div className="p-5 bg-amber-50/40 border border-amber-200/60 rounded-xl flex items-start gap-3.5">
                      <HelpCircle className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-serif font-black text-amber-900">How other teams use this shared portal workspace:</span>
                        <p className="text-xs text-amber-800 font-sans leading-relaxed">
                          When an active customer integration fails or a lead delivery route breaks, any Account Manager or Sales Operations representative can open this portal to immediately trace who owns the fix, learn which software application to open, and read the exact process steps needed to remediate the block without sending chaotic, unstructured direct messages into Engineering's Slack space.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
