import { Cpu, Database, Zap } from 'lucide-react'

export default function StatusCard() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Cpu className="w-5 h-5 text-orange-400" />
        <h2 className="text-lg font-semibold text-white">System Status</h2>
      </div>
      
      <div className="space-y-4">
        {/* Current Model */}
        <div>
          <p className="text-sm text-slate-400 mb-1">Current Model</p>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-white font-medium">Gemini 3 Flash</span>
          </div>
        </div>

        {/* Context Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Context Usage</span>
            <span className="text-sm text-slate-300">48k / 1.0m (5%)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div>
          </div>
        </div>

        {/* Claude Quota */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Claude Quota</span>
            <span className="text-sm text-yellow-400">91% (resets Wed)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '91%' }}></div>
          </div>
        </div>

        {/* Last Compaction */}
        <div className="flex items-center gap-2 text-sm">
          <Database className="w-4 h-4 text-blue-400" />
          <span className="text-slate-400">Last compaction:</span>
          <span className="text-slate-300">2 hours ago</span>
        </div>
      </div>
    </div>
  )
}
