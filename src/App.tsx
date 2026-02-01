import { Activity, Brain, Calendar, Zap } from 'lucide-react'
import StatusCard from './components/StatusCard'

function App() {
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
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* System Status Card */}
          <StatusCard />

          {/* Quick Stats */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Quick Stats</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-400">Sessions Active</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Messages Today</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
            </div>
          </div>

          {/* Memory Quick Access */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Memory Files</h2>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors">
                📝 MEMORY.md
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors">
                😊 SOUL.md
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors">
                👤 USER.md
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors">
                🎯 IDENTITY.md
              </button>
            </div>
          </div>

          {/* Goals Tracker */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 col-span-full lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Revenue Goals</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Current Monthly Revenue</span>
                  <span className="text-sm font-semibold text-white">~$4,150</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Target: $10,000/month by end of 2026</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Sustain Target</span>
                  <span className="text-sm font-semibold text-white">$6,700</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Gap: ~$2,550/month</p>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-semibold text-white">Due Today</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                <div>
                  <p className="text-sm text-white">Answer 3 accountability questions</p>
                  <p className="text-xs text-slate-500">Pricing check, content outline, ChatGPT follow-up</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
