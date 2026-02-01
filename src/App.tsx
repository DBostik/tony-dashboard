import { useState } from 'react'
import { Brain, Server, FileText, BarChart3 } from 'lucide-react'
import Dashboard from './components/Dashboard'
import SecondBrain from './components/SecondBrain'
import Automation from './components/Automation'

type Tab = 'dashboard' | 'brain' | 'automation' | 'logs'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-white">Tony Dashboard</h1>
                <p className="text-sm text-slate-400">Mission Control for Dave & Tony</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="text-slate-400">MODEL</div>
                <div className="text-white font-medium">gemini-3-flash-preview</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-slate-400">UPTIME</div>
                <div className="text-white font-medium">2 days, 7 hours</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">CONNECTED</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Live Status
            </button>
            <button
              onClick={() => setActiveTab('brain')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'brain'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Brain className="w-4 h-4" />
              Second Brain
            </button>
            <button
              onClick={() => setActiveTab('automation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'automation'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Server className="w-4 h-4" />
              Automation
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'logs'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              System Logs
            </button>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <main>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'brain' && <SecondBrain />}
        {activeTab === 'automation' && <Automation />}
        {activeTab === 'logs' && (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">System Logs</h2>
              <p className="text-slate-400">Coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
