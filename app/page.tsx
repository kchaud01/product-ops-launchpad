'use client'

import React, { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  ListTodo,
  FileSpreadsheet,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Download,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  Info,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Activity,
  PanelLeftClose,
  PanelLeftOpen,
  Terminal,
  RotateCcw
} from 'lucide-react'

// SEED DATA
const INITIAL_PILLARS = [
  "Operating Model & Cadence Alignment",
  "Toolchain & Platform Administration",
  "Insights Synthesis & Feedback Loops",
  "Cross-Functional Enablement",
  "Governance & Compliance Frameworks"
]

const INITIAL_PHASES = [
  "Phase 1: Foundations & Ingestion",
  "Phase 2: Automated Scale",
  "Phase 3: Strategic Multiplier"
]

interface Milestone {
  id: string
  Pillar: string
  Phase: string
  Initiative: string
  Status: 'Complete' | 'In Progress' | 'Not Started'
  Impact: 'Low' | 'Medium' | 'High'
}

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    Pillar: "Operating Model & Cadence Alignment",
    Phase: "Phase 1: Foundations & Ingestion",
    Initiative: "Standardize QBR/MBR reporting templates",
    Status: "Complete",
    Impact: "High"
  },
  {
    id: 'm2',
    Pillar: "Toolchain & Platform Administration",
    Phase: "Phase 1: Foundations & Ingestion",
    Initiative: "Clean-room Productboard tag configurations",
    Status: "In Progress",
    Impact: "High"
  },
  {
    id: 'm3',
    Pillar: "Insights Synthesis & Feedback Loops",
    Phase: "Phase 2: Automated Scale",
    Initiative: "Deploy Agentic BI Ingestion Pipeline",
    Status: "In Progress",
    Impact: "High"
  }
]

export default function CommandCenter() {
  const [appMode, setAppMode] = useState<'overview' | 'pillar-detail' | 'triage'>('overview')
  const [activePillar, setActivePillar] = useState<string | null>(null)
  
  // LIVE EVENT FEED STATE
  const [systemLogs, setSystemLogs] = useState<string[]>([])

  // MILESTONES STATE
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES)
  const [showAddForm, setShowAddForm] = useState(false)
  
  // NEW FORM STATE
  const [newPhase, setNewPhase] = useState(INITIAL_PHASES[0])
  const [newInitiative, setNewInitiative] = useState('')
  const [newStatus, setNewStatus] = useState<Milestone['Status']>('Not Started')
  const [newImpact, setNewImpact] = useState<Milestone['Impact']>('Medium')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // BI INGESTION STATE
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([])
  const [feedbackField, setFeedbackField] = useState('')
  const [riskField, setRiskField] = useState('')
  const [triagedData, setTriagedData] = useState<any[]>([])
  const [fileName, setFileName] = useState('')

  // Event Log Helper
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    setSystemLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 15)])
  }

  // Initialize event logs
  useEffect(() => {
    addLog("Product Ops Launchpad initialized.")
    addLog("SQLite mockup database posture: active.")
  }, [])

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Handle routing with telemetry
  const navigateTo = (mode: 'overview' | 'pillar-detail' | 'triage') => {
    setAppMode(mode)
    const modeNames = {
      overview: 'Master Overview',
      'pillar-detail': 'Strategic Pillar Details',
      triage: 'BI Data Ingestion Node'
    }
    addLog(`Routed to viewport: ${modeNames[mode]}`)
  }

  // Add Initiative
  const handleAddInitiative = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInitiative.trim()) return

    const selectedPillar = activePillar || INITIAL_PILLARS[0]

    const newMilestone: Milestone = {
      id: `m-${Date.now()}`,
      Pillar: selectedPillar,
      Phase: newPhase,
      Initiative: newInitiative.trim(),
      Status: newStatus,
      Impact: newImpact
    }

    setMilestones(prev => [...prev, newMilestone])
    addLog(`Milestone created: "${newInitiative.slice(0, 30)}..."`)
    setNewInitiative('')
    setShowAddForm(false)
    triggerToast("Deliverable appended to memory database.")
  }

  // Delete Milestone
  const handleDeleteMilestone = (id: string) => {
    const m = milestones.find(item => item.id === id)
    setMilestones(prev => prev.filter(item => item.id !== id))
    addLog(`Deleted milestone: "${m?.Initiative.slice(0, 25)}..."`)
    triggerToast("Initiative removed successfully.")
  }

  // Update Milestone Field
  const updateMilestone = (id: string, field: keyof Milestone, value: any) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
    const m = milestones.find(item => item.id === id)
    addLog(`Updated milestone field [${field}] for: "${m?.Initiative.slice(0, 25)}..."`)
  }

  // Reset seed data
  const handleResetLedger = () => {
    setMilestones(INITIAL_MILESTONES)
    addLog("Ledger reset to standard initial blueprints.")
    triggerToast("Memory database reset completed.")
  }

  // Client-side CSV parser
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        if (!text) return

        // Simple CSV Parser that handles basic quotes and lines
        const lines: string[] = []
        let currentLine = ''
        let inQuotes = false

        for (let i = 0; i < text.length; i++) {
          const char = text[i]
          if (char === '"') {
            inQuotes = !inQuotes
          } else if (char === '\n' && !inQuotes) {
            lines.push(currentLine.trim())
            currentLine = ''
          } else if (char === '\r') {
            // skip carriage return
          } else {
            currentLine += char
          }
        }
        if (currentLine) lines.push(currentLine.trim())

        if (lines.length < 2) {
          triggerToast("CSV is too short or malformed.")
          addLog(`Ingestion failed: ${file.name} is malformed.`)
          return
        }

        // Header extraction
        const parsedHeaders = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim())
        setCsvHeaders(parsedHeaders)
        
        // Rows extraction
        const parsedRows: Record<string, string>[] = []
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i]
          if (!line) continue

          const columns: string[] = []
          let curCol = ''
          let insideQ = false

          for (let j = 0; j < line.length; j++) {
            const char = line[j]
            if (char === '"') {
              insideQ = !insideQ
            } else if (char === ',' && !insideQ) {
              columns.push(curCol.trim())
              curCol = ''
            } else {
              curCol += char
            }
          }
          columns.push(curCol.trim())

          const rowObj: Record<string, string> = {}
          parsedHeaders.forEach((header, index) => {
            rowObj[header] = (columns[index] || '').replace(/^"|"$/g, '').trim()
          })
          parsedRows.push(rowObj)
        }

        setCsvRows(parsedRows)
        if (parsedHeaders.length > 0) {
          setFeedbackField(parsedHeaders[0])
          setRiskField(parsedHeaders[1] || parsedHeaders[0])
        }
        setTriagedData([])
        addLog(`Ingestion loaded: parsed ${parsedRows.length} feedback rows.`)
        triggerToast("CSV parsed successfully.")
      } catch (err) {
        addLog("Critical: exception during local CSV parse routine.")
        triggerToast("Failed to parse CSV.")
      }
    }
    reader.readAsText(file)
  }

  // Deterministic priority triage engine
  const executeTriage = () => {
    if (csvRows.length === 0) return

    const results = csvRows.map(row => {
      const textData = row[feedbackField] || ''
      const riskVal = (row[riskField] || '').toUpperCase()

      let component = "Operating Model & Cadence Alignment"
      let priority = "Medium"

      const lowerText = textData.toLowerCase()
      const hasBug = lowerText.includes('bug') || lowerText.includes('error') || lowerText.includes('crash') || lowerText.includes('fail')
      const hasPerf = lowerText.includes('slow') || lowerText.includes('performance') || lowerText.includes('lag') || lowerText.includes('timeout')

      if (hasBug) {
        component = "Core Experience Framework"
        priority = "Critical (Immediate Technical Routing)"
      } else if (hasPerf) {
        component = "Performance Optimization Engine"
        priority = "Important"
      }

      if (['HIGH', 'CRITICAL', 'URGENT', '1'].includes(riskVal)) {
        priority = "Critical (Immediate Technical Routing)"
      }

      return {
        "Insight Summary": textData,
        "Target Tooling Container": component,
        "Calculated Productboard Rank": priority,
        "Triage Source Configuration": "Asynchronous Import Script"
      }
    })

    setTriagedData(results)
    addLog(`Executed deterministic triage. Generated ${results.length} priority payloads.`)
    triggerToast("Deterministic triage compiled successfully.")
  }

  // Export parsed CSV
  const downloadTriageCsv = () => {
    if (triagedData.length === 0) return

    const headers = ["Insight Summary", "Target Tooling Container", "Calculated Productboard Rank", "Triage Source Configuration"]
    const csvContent = [
      headers.join(','),
      ...triagedData.map(row => 
        headers.map(h => `"${(row[h] || '').replace(/"/g, '""')}"`).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'prodops_triage_payload.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    addLog("Exported triage payload payload to local CSV download folder.")
  }

  // Calculated Stats for Overview Cards
  const totalMilestones = milestones.length
  const completedMilestones = milestones.filter(m => m.Status === 'Complete').length
  const milestonesPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0

  let triageStatusText = "Awaiting Handshake"
  let triagePercentage = 0
  if (csvRows.length > 0) {
    if (triagedData.length > 0) {
      triageStatusText = `${triagedData.length} records triaged`
      triagePercentage = 100
    } else {
      triageStatusText = `${csvRows.length} CSV rows loaded`
      triagePercentage = 50
    }
  }

  // PILLARS CONFIG & METADATA
  const PILLARS_CONFIG = [
    {
      name: "Operating Model & Cadence Alignment",
      mandate: "Drive enterprise-wide cross-functional planning and execution alignment.",
      systems: "Standardization of quarterly planning structures, continuous MBRs, and QBR reporting templates.",
      icon: Layers,
      bg: "bg-indigo-50/70",
      border: "border-indigo-200/50",
      text: "text-indigo-700",
      accentColor: "indigo",
      phaseText: "Phase 1: Foundations & Ingestion",
      checklist: [
        { label: "Standardize MBR and QBR reporting templates", done: true },
        { label: "Harmonize quarterly product-engineering sync schedules", done: false },
        { label: "Establish CPO operational handshake visibility dashboard", done: false }
      ]
    },
    {
      name: "Toolchain & Platform Administration",
      mandate: "Reduce tooling administrative friction and cognitive overhead on Product Managers.",
      systems: "Administrative architecture and custom workspace setups in Productboard and Jira.",
      icon: Terminal,
      bg: "bg-amber-50/70",
      border: "border-amber-200/50",
      text: "text-amber-700",
      accentColor: "amber",
      phaseText: "Phase 1: Foundations & Ingestion",
      checklist: [
        { label: "Clean-room Productboard tag configurations", done: true },
        { label: "Integrate Jira EPIC tracking structure mapping", done: false },
        { label: "Automate PM cognitive friction reporting tool", done: false }
      ]
    },
    {
      name: "Insights Synthesis & Feedback Loops",
      mandate: "Build client data and feedback loops to guide product teams deterministically.",
      systems: "Triage of unstandardized customer logs, feedback structures, and data clean-room ingestion.",
      icon: Sparkles,
      bg: "bg-violet-50/70",
      border: "border-violet-200/50",
      text: "text-violet-700",
      accentColor: "violet",
      phaseText: "Phase 2: Automated Scale",
      checklist: [
        { label: "Deploy Agentic BI Ingestion Pipeline", done: false },
        { label: "Build centralized customer feedback ingestion lake", done: false },
        { label: "Standardize automated priority rank algorithm models", done: false }
      ]
    },
    {
      name: "Cross-Functional Enablement",
      mandate: "Standardize onboarding assets and release notes structures across marketing, sales, and CS.",
      systems: "Release lifecycle playbooks, cross-department alignment checklists, and handoff models.",
      icon: Zap,
      bg: "bg-emerald-50/70",
      border: "border-emerald-200/50",
      text: "text-emerald-700",
      accentColor: "emerald",
      phaseText: "Phase 1: Foundations & Ingestion",
      checklist: [
        { label: "Document product release lifecycle playbooks", done: false },
        { label: "Create marketing & sales alignment checklists", done: false },
        { label: "Deploy automated PM release notes publishing pipeline", done: false }
      ]
    },
    {
      name: "Governance & Compliance Frameworks",
      mandate: "Secure operational compliance, product quality standards, and taxonomy governance across all portfolios.",
      systems: "Portfolio risk taxonomies, compliance reporting dashboards, and release gate audits.",
      icon: ShieldCheck,
      bg: "bg-rose-50/70",
      border: "border-rose-200/50",
      text: "text-rose-700",
      accentColor: "rose",
      phaseText: "Phase 1: Foundations & Ingestion",
      checklist: [
        { label: "Map portfolio risk taxonomy schemas", done: false },
        { label: "Set up compliance audit logs for release gates", done: false },
        { label: "Secure central product governance board charter", done: false }
      ]
    }
  ]

  const currentPillar = PILLARS_CONFIG.find(p => p.name === activePillar) || PILLARS_CONFIG[0]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f4f0] text-[#1b1c20] font-sans">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#1b1c20] shadow-xl rounded-2xl px-5 py-3.5 border border-black/10 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 text-white">
          <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-[#f5f4f0]">
        
        {/* TOP BAR */}
        <header className="h-16 border-b border-black/10 bg-[#f5f4f0]/80 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#8a8d94]">Workspace / launchpad /</span>
            <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold truncate max-w-[280px] md:max-w-none">
              {appMode === 'overview' && 'Master Overview'}
              {appMode === 'pillar-detail' && activePillar}
              {appMode === 'triage' && 'Ingestion Lake'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {appMode !== 'triage' ? (
              <button
                onClick={() => navigateTo('triage')}
                className="px-4 py-1.5 bg-white border border-black/10 hover:border-black/25 hover:shadow-md text-[#1b1c20] rounded-full text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                <span>Ingest Data Lake</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('overview')}
                className="px-4 py-1.5 bg-white border border-black/10 hover:border-black/25 hover:shadow-md text-[#1b1c20] rounded-full text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#1b1c20]" />
                <span>Dashboard Console</span>
              </button>
            )}
            <div className="flex items-center gap-2 text-xs text-[#5c5f66] bg-white border border-black/10 px-4 py-2 rounded-full font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>Active Sandbox Host: localhost:3001</span>
            </div>
          </div>
        </header>

        {/* CONTAINER */}
        <div className="flex-1 overflow-y-auto py-12">
          
          {/* TERMINAL 0: MASTER OVERVIEW DECK */}
          {appMode === 'overview' && (
            <div className="w-full max-w-[96%] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 animate-in fade-in duration-300">
              
              <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 mx-auto uppercase tracking-wider font-mono">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Product Operations Console</span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#1b1c20] leading-none">
                  Product Ops Launchpad
                </h2>
                <p className="text-base md:text-lg text-[#5c5f66] leading-relaxed max-w-2xl mx-auto mt-2">
                  Select a strategic capability pillar below to review structural maturity checkmarks, assess capability metrics, and update active execution ledgers.
                </p>
              </div>

              {/* Five Pillars Interactive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {PILLARS_CONFIG.map((pillar) => {
                  const pillarMilestones = milestones.filter(m => m.Pillar === pillar.name)
                  const completed = pillarMilestones.filter(m => m.Status === 'Complete').length
                  const total = pillarMilestones.length
                  const percent = total > 0 ? Math.round((completed / total) * 100) : 0
                  const Icon = pillar.icon

                  return (
                    <div
                      key={pillar.name}
                      onClick={() => {
                        setActivePillar(pillar.name)
                        navigateTo('pillar-detail')
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActivePillar(pillar.name)
                          navigateTo('pillar-detail')
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className="bg-white border border-[#d8d6cc] p-7 md:p-8 rounded-3xl text-left flex flex-col justify-between min-h-[380px] hover:border-[#1b1c20]/30 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1b1c20]/20"
                    >
                      <div className="flex flex-col gap-4">
                        <div className={`w-12 h-12 rounded-xl ${pillar.bg} border ${pillar.border} flex items-center justify-center ${pillar.text} group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-[19px] font-serif font-black text-[#1b1c20] tracking-tight leading-snug">
                            {pillar.name}
                          </h3>
                          <p className="text-[12.5px] text-[#5c5f66] mt-3.5 leading-relaxed font-sans">
                            <strong className="text-[#1b1c20] font-bold">Mandate:</strong> {pillar.mandate}
                          </p>
                          <p className="text-[12.5px] text-[#8a8d94] mt-2.5 leading-relaxed font-sans border-t border-[#ecebe4]/80 pt-2.5">
                            <strong className="text-[#5c5f66] font-bold">Systems Owned:</strong> {pillar.systems}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-2 border-t border-[#ecebe4] pt-4">
                        <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider">
                          <span className="text-[#8a8d94]">Ledger Progress</span>
                          <span className={`${pillar.text} font-bold font-mono`}>{percent}% Complete</span>
                        </div>
                        <div className="w-full bg-[#ecebe4] rounded-full h-1.5 overflow-hidden">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${
                            pillar.accentColor === 'indigo' ? 'bg-indigo-600' :
                            pillar.accentColor === 'amber' ? 'bg-amber-600' :
                            pillar.accentColor === 'violet' ? 'bg-violet-600' :
                            pillar.accentColor === 'emerald' ? 'bg-emerald-600' :
                            'bg-rose-600'
                          }`} style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-[10px] text-[#8a8d94] font-mono mt-1">
                          {completed} of {total} initiatives complete
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Central Dashboard Metrics Panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-[#d8d6cc] rounded-3xl p-8 md:p-10 shadow-sm mt-6 divide-y md:divide-y-0 md:divide-x divide-[#ecebe4]">
                
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#ecebe4] flex items-center justify-center text-[#1b1c20] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8a8d94] uppercase tracking-wider font-bold">Standard Framework</span>
                    <h4 className="text-xl font-serif font-black text-[#1b1c20] mt-0.5">5 Strategic Pillars Active</h4>
                  </div>
                </div>

                <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-8">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-700 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8a8d94] uppercase tracking-wider font-bold">Total Ledger Initiatives</span>
                    <h4 className="text-xl font-serif font-black text-[#1b1c20] mt-0.5">
                      {completedMilestones} of {totalMilestones} Completed
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-8">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8a8d94] uppercase tracking-wider font-bold">Operating Model</span>
                    <h4 className="text-xl font-serif font-black text-[#1b1c20] mt-0.5">Centralized CPO Handshake</h4>
                  </div>
                </div>

              </div>
            </div>
          )}
          
          {/* TERMINAL 1: UNIFIED STRATEGIC PILLAR DETAILS */}
          {appMode === 'pillar-detail' && (
            <div className="w-full max-w-[96%] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-8 animate-in fade-in duration-300">
              
              {/* Pillar Header Bar */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateTo('overview')}
                  className="p-3 border border-black/10 rounded-xl text-[#1b1c20] hover:bg-black/5 hover:border-black/20 transition-all cursor-pointer flex items-center justify-center shrink-0 animate-in slide-in-from-left-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full ${currentPillar.bg} ${currentPillar.text} border ${currentPillar.border}`}>
                        Active Strategic Pillar
                      </span>
                    </div>
                    <h2 className="text-3xl font-serif font-black text-[#1b1c20] tracking-tight mt-1">{currentPillar.name}</h2>
                  </div>
                  
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-[#1b1c20] hover:bg-[#1b1c20]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Log New Deliverable</span>
                  </button>
                </div>
              </div>

              {/* Dynamic locked initiative drawer */}
              {showAddForm && (
                <div className="bg-white border border-[#d8d6cc] p-8 rounded-3xl shadow-md animate-in slide-in-from-top-4 duration-300 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif font-black text-[#1b1c20] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-violet-600 animate-pulse" />
                      <span>Log Deliverable to {currentPillar.name}</span>
                    </h3>
                    <span className="text-[10px] text-[#8a8d94] font-mono bg-[#fbfbfa] border border-[#d8d6cc] px-2 py-1 rounded-lg uppercase font-bold">
                      🔒 Pillar Assignment Locked
                    </span>
                  </div>
                  <form onSubmit={handleAddInitiative} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-[#5c5f66] uppercase tracking-wider">Initiative / Deliverable Name</label>
                      <input
                        type="text"
                        value={newInitiative}
                        onChange={e => setNewInitiative(e.target.value)}
                        placeholder="Define clean roadmap templates..."
                        required
                        className="w-full text-sm p-3 rounded-xl border border-[#d8d6cc] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#fbfbfa]"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#5c5f66] uppercase tracking-wider">Strategic Pillar (Locked)</label>
                      <div className="w-full text-sm p-3 rounded-xl border border-[#ecebe4] bg-[#fbfbfa] font-semibold text-[#8a8d94] select-none">
                        {currentPillar.name}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#5c5f66] uppercase tracking-wider">Target Phase</label>
                      <select
                        value={newPhase}
                        onChange={e => setNewPhase(e.target.value)}
                        className="w-full text-sm p-3 rounded-xl border border-[#d8d6cc] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                      >
                        {INITIAL_PHASES.map(ph => (
                          <option key={ph} value={ph}>{ph}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#5c5f66] uppercase tracking-wider">Status</label>
                      <select
                        value={newStatus}
                        onChange={e => setNewStatus(e.target.value as Milestone['Status'])}
                        className="w-full text-sm p-3 rounded-xl border border-[#d8d6cc] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#5c5f66] uppercase tracking-wider">Impact Weight</label>
                      <select
                        value={newImpact}
                        onChange={e => setNewImpact(e.target.value as Milestone['Impact'])}
                        className="w-full text-sm p-3 rounded-xl border border-[#d8d6cc] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#5c5f66] border border-black/10 hover:bg-black/5 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#1b1c20] hover:bg-[#1b1c20]/90 text-white shadow-sm transition-all cursor-pointer"
                      >
                        Commit to Memory Ledger
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Unified Two-Column Details View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Column 1: Maturity Status & Metrics (Span 4) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Mandate Summary */}
                  <div className="bg-white border border-[#d8d6cc] p-6 rounded-3xl shadow-sm flex flex-col gap-3">
                    <span className="text-xs text-[#8a8d94] font-bold uppercase tracking-wider">Pillar Mandate</span>
                    <p className="text-sm text-[#4e515a] leading-relaxed font-sans">{currentPillar.mandate}</p>
                    <div className="h-[1px] bg-[#ecebe4] my-2" />
                    <span className="text-xs text-[#8a8d94] font-bold uppercase tracking-wider">Systems Owned</span>
                    <p className="text-xs text-[#5c5f66] leading-relaxed font-sans">{currentPillar.systems}</p>
                  </div>

                  {/* Automation progress */}
                  <div className="bg-white border border-[#d8d6cc] p-6 rounded-3xl shadow-sm flex flex-col gap-4">
                    <span className="text-xs text-[#8a8d94] font-bold uppercase tracking-wider">Automation Adoption Index</span>
                    {(() => {
                      const pillarMilestones = milestones.filter(m => m.Pillar === currentPillar.name)
                      const completed = pillarMilestones.filter(m => m.Status === 'Complete').length
                      const total = pillarMilestones.length
                      // Dynamic index based on actual completed initiatives
                      const dynamicIndex = total > 0 ? Math.round(7 + (completed / total) * 38) : 7
                      return (
                        <>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-4xl font-serif font-black text-[#1b1c20]">{dynamicIndex}%</span>
                            <span className="text-xs text-violet-700 font-bold uppercase tracking-wider font-mono">Targeting 45%</span>
                          </div>
                          <div className="w-full bg-[#ecebe4] rounded-full h-2.5 overflow-hidden">
                            <div className="bg-violet-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${dynamicIndex}%` }} />
                          </div>
                        </>
                      )
                    })()}
                  </div>

                  {/* Functional checkmarks checklist */}
                  <div className="bg-white border border-[#d8d6cc] p-6 rounded-3xl shadow-sm flex flex-col gap-4">
                    <span className="text-xs text-[#8a8d94] font-bold uppercase tracking-wider">Maturity Handshakes</span>
                    <div className="flex flex-col gap-3">
                      {currentPillar.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-[#4e515a] leading-relaxed">
                          <div className="mt-0.5 shrink-0">
                            {item.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-[#d8d6cc]" />
                            )}
                          </div>
                          <span className={item.done ? 'line-through text-[#8a8d94]' : ''}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Column 2: Specific pre-filtered Ledger Table (Span 8) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  
                  {/* Ledger Table Container */}
                  <div className="bg-white border border-[#d8d6cc] rounded-3xl shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-[#ecebe4] bg-[#fbfbfa] flex justify-between items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-blue-600" />
                        <span className="text-xs uppercase font-extrabold tracking-wider text-[#1b1c20] font-mono">
                          Pillar Initiatives Ledger ({milestones.filter(m => m.Pillar === currentPillar.name).length})
                        </span>
                      </div>
                      <button
                        onClick={handleResetLedger}
                        className="text-xs text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer font-mono"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset Ledger blueprints
                      </button>
                    </div>

                    <div className="overflow-x-auto w-full">
                      {milestones.filter(m => m.Pillar === currentPillar.name).length > 0 ? (
                        <table className="w-full text-left border-collapse table-fixed">
                          <thead>
                            <tr className="border-b border-[#d8d6cc] bg-[#fbfbfa] text-[10px] font-extrabold uppercase tracking-wider text-[#8a8d94]">
                              <th className="py-3 px-4 w-[38%]">Initiative / Deliverable</th>
                              <th className="py-3 px-4 w-[30%]">Target Phase</th>
                              <th className="py-3 px-4 w-[16%]">Status</th>
                              <th className="py-3 px-4 w-[12%]">Impact</th>
                              <th className="py-3 px-4 w-[4%] text-center"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#ecebe4]">
                            {milestones.filter(m => m.Pillar === currentPillar.name).map((m) => (
                              <tr key={m.id} className="hover:bg-[#f5f4f0]/20 transition-colors">
                                
                                {/* 1. Initiative Name (Textarea for wrapping) */}
                                <td className="py-3 px-4">
                                  <textarea
                                    value={m.Initiative}
                                    onChange={(e) => updateMilestone(m.id, 'Initiative', e.target.value)}
                                    rows={2}
                                    className="w-full text-xs font-semibold text-[#1b1c20] bg-transparent hover:bg-black/5 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg py-1 px-2 border-0 focus:border resize-none transition-all min-h-[3rem] align-middle"
                                  />
                                </td>

                                {/* 2. Target Phase select */}
                                <td className="py-3 px-4">
                                  <select
                                    value={m.Phase}
                                    onChange={(e) => updateMilestone(m.id, 'Phase', e.target.value)}
                                    className="w-full text-xs text-[#5c5f66] bg-transparent hover:bg-black/5 focus:bg-white rounded-lg py-1 px-2 border-0 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                                  >
                                    {INITIAL_PHASES.map((p) => (
                                      <option key={p} value={p}>{p}</option>
                                    ))}
                                  </select>
                                </td>

                                {/* 3. Status select (Styled Badge inside custom select wrapper) */}
                                <td className="py-3 px-4">
                                  <div className="relative inline-block w-full">
                                    <select
                                      value={m.Status}
                                      onChange={(e) => updateMilestone(m.id, 'Status', e.target.value)}
                                      className={`w-full text-[10px] font-bold uppercase py-1 px-2.5 rounded-full border-0 focus:ring-1 focus:ring-blue-500 text-center cursor-pointer transition-all appearance-none ${
                                        m.Status === 'Complete' 
                                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                          : m.Status === 'In Progress' 
                                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' 
                                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                      }`}
                                    >
                                      <option value="Not Started">Not Started</option>
                                      <option value="In Progress">In Progress</option>
                                      <option value="Complete">Complete</option>
                                    </select>
                                  </div>
                                </td>

                                {/* 4. Impact weight select */}
                                <td className="py-3 px-4">
                                  <select
                                    value={m.Impact}
                                    onChange={(e) => updateMilestone(m.id, 'Impact', e.target.value)}
                                    className={`w-full text-[10px] font-bold uppercase py-1 px-2 rounded-full border-0 focus:ring-1 focus:ring-blue-500 text-center cursor-pointer transition-all appearance-none ${
                                      m.Impact === 'High' 
                                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' 
                                        : m.Impact === 'Medium' 
                                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                    }`}
                                  >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                  </select>
                                </td>

                                {/* 5. Delete Action button */}
                                <td className="py-3 px-4 text-center">
                                  <button
                                    onClick={() => handleDeleteMilestone(m.id)}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-8 text-center text-sm text-[#8a8d94] font-sans">
                          No initiatives logged in this strategic pillar yet. Click "Log New Deliverable" to add one!
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TERMINAL 3: BI DATA TRIAGE NODE */}
          {appMode === 'triage' && (
            <div className="w-full max-w-[96%] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-8 animate-in fade-in duration-300">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateTo('overview')}
                  className="p-3 border border-black/10 rounded-xl text-[#1b1c20] hover:bg-black/5 hover:border-black/20 transition-all cursor-pointer flex items-center justify-center shrink-0 animate-in slide-in-from-left-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-3xl font-serif font-black text-[#1b1c20] tracking-tight">Asynchronous Clean-Room Triage Node</h2>
                  <p className="text-base text-[#5c5f66]">Drop raw feedback extractions from your pre-existing BI team. The local client engine sanitizes noise and priority-ranks items for Productboard.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Uploader Left Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  
                  {/* File Dropbox */}
                  <div className="bg-white border border-[#d8d6cc] p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
                    <span className="text-xs text-[#8a8d94] font-bold uppercase tracking-wider">File Transmit Hub</span>
                    
                    <label className="border-2 border-dashed border-[#d8d6cc] hover:border-[#1b1c20]/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-all hover:bg-[#f5f4f0]/30">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCsvUpload}
                        className="hidden"
                      />
                      <div className="w-10 h-10 rounded-full bg-[#fbfbfa] border border-[#d8d6cc] flex items-center justify-center text-[#1b1c20]">
                        <Download className="w-5 h-5 rotate-180" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#1b1c20]">
                          {fileName ? fileName : 'Upload Raw Monthly BI CSV Extract'}
                        </span>
                        <span className="text-[10px] text-[#8a8d94]">Supports Standard CSV files</span>
                      </div>
                    </label>

                    {csvRows.length > 0 && (
                      <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                        <div className="h-[1px] bg-[#ecebe4]" />
                        
                        {/* Selector 1: Narrative Field */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-[#5c5f66] uppercase tracking-wider">Map Narrative / Feedback Field</label>
                          <select
                            value={feedbackField}
                            onChange={e => setFeedbackField(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#d8d6cc] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            {csvHeaders.map(h => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                        </div>

                        {/* Selector 2: Severity field */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-[#5c5f66] uppercase tracking-wider">Map Risk / Severity Weight</label>
                          <select
                            value={riskField}
                            onChange={e => setRiskField(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#d8d6cc] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            {csvHeaders.map(h => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={executeTriage}
                          className="w-full py-3 bg-[#1b1c20] hover:bg-[#1b1c20]/90 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-sm transition-all cursor-pointer mt-2"
                        >
                          Execute Prioritized Triage
                        </button>
                      </div>
                    )}
                  </div>

                  {/* SQLite telemetry status log */}
                  <div className="bg-white border border-[#d8d6cc] p-6 rounded-3xl flex flex-col gap-4 shadow-sm flex-1">
                    <span className="text-xs text-[#8a8d94] font-bold uppercase tracking-wider">SQLite mock telemetry feed</span>
                    <div className="flex-1 bg-[#1b1c20] text-emerald-400 font-mono text-[10px] p-4 rounded-2xl overflow-y-auto max-h-[250px] flex flex-col gap-2 shadow-inner border border-black/10 select-none">
                      {systemLogs.map((log, i) => (
                        <div key={i} className="leading-relaxed whitespace-pre-wrap">{log}</div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right parsed items preview column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {triagedData.length > 0 ? (
                    <div className="bg-white border border-[#d8d6cc] rounded-3xl shadow-sm flex flex-col overflow-hidden max-h-[500px] lg:max-h-none animate-in fade-in duration-300">
                      
                      <div className="px-6 py-5 border-b border-[#ecebe4] bg-[#fbfbfa] flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" />
                          <span className="text-xs uppercase font-extrabold tracking-wider text-[#1b1c20] font-mono">Normalized Payload Matrix</span>
                        </div>
                        <button
                          onClick={downloadTriageCsv}
                          className="text-xs text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer font-mono"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export csv payload</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto w-full flex-1">
                        <table className="w-full text-left text-xs border-collapse font-mono">
                          <thead>
                            <tr className="bg-[#fbfbfa] border-b border-[#d8d6cc] text-[9px] font-bold text-[#8a8d94] uppercase tracking-wider">
                              <th className="py-2.5 px-4 w-[280px]">Insight Summary</th>
                              <th className="py-2.5 px-4 w-[200px]">Calculated Container</th>
                              <th className="py-2.5 px-4 w-[160px] text-center">Rank</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#ecebe4]">
                            {triagedData.map((row, i) => (
                              <tr key={i} className="hover:bg-[#f5f4f0]/20 transition-colors">
                                <td className="py-2.5 px-4 font-sans text-[#1b1c20] truncate max-w-[280px]">{row["Insight Summary"]}</td>
                                <td className="py-2.5 px-4 font-sans text-blue-700 font-bold">{row["Target Tooling Container"]}</td>
                                <td className="py-2.5 px-4 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase ${
                                    row["Calculated Productboard Rank"].includes('Critical') 
                                      ? 'bg-rose-100 text-rose-700' 
                                      : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {row["Calculated Productboard Rank"].includes('Critical') ? 'Critical' : 'Important'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-4 bg-[#fbfbfa] border-t border-[#ecebe4] text-xs text-[#8a8d94] tracking-wider uppercase font-semibold">
                        Compiled Triaged Output Matrix: {triagedData.length} records ready for Productboard.
                      </div>

                    </div>
                  ) : (
                    <div className="bg-white border border-[#d8d6cc] p-8 rounded-3xl flex flex-col gap-6 shadow-sm">
                      
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-serif font-black text-[#1b1c20]">Awaiting Data Ingest Handshake</h3>
                        <p className="text-sm text-[#5c5f66] font-sans">To test out the clean-room triage, drag a CSV here or drop a file in the uploader. Pre-existing BI team csv structures usually resemble the schematic layout below:</p>
                      </div>

                      <div className="overflow-hidden border border-[#d8d6cc] rounded-2xl">
                        <table className="w-full text-left text-sm border-collapse font-mono text-xs text-[#5c5f66]">
                          <thead>
                            <tr className="bg-[#fbfbfa] border-b border-[#d8d6cc] text-[10px] font-bold text-[#8a8d94] uppercase tracking-wider">
                              <th className="py-3 px-6">Enterprise_Raw_Feedback_Logs</th>
                              <th className="py-3 px-6 text-center">BI_Data_Team_Severity_Weight</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#ecebe4]">
                            <tr className="hover:bg-[#f5f4f0]/20">
                              <td className="py-3.5 px-6 font-sans text-[#1b1c20]">System timeouts when processing query runs</td>
                              <td className="py-3.5 px-6 text-center text-rose-700 font-bold uppercase text-[10px]">High</td>
                            </tr>
                            <tr className="hover:bg-[#f5f4f0]/20">
                              <td className="py-3.5 px-6 font-sans text-[#1b1c20]">Requesting a native dark mode visual override option</td>
                              <td className="py-3.5 px-6 text-center text-[#5c5f66] font-bold uppercase text-[10px]">Low</td>
                            </tr>
                            <tr className="hover:bg-[#f5f4f0]/20">
                              <td className="py-3.5 px-6 font-sans text-[#1b1c20]">Encountering fatal script syntax error when fetching metrics</td>
                              <td className="py-3.5 px-6 text-center text-rose-700 font-bold uppercase text-[10px]">Critical</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  )
}
