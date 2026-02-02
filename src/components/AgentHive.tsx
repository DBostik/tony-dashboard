import { Activity, Clock, Cpu, Zap } from 'lucide-react'

const MOCK_LOGS = [
  { id: 1, time: '2:15 PM', agent: 'Status Sync', action: 'Pushing system metrics', model: 'GLM 4.7', status: 'success', cost: '0.0004' },
  { id: 2, time: '1:00 PM', agent: 'Status Sync', action: 'Pushing system metrics', model: 'GLM 4.7', status: 'success', cost: '0.0004' },
  { id: 3, time: '12:00 PM', agent: 'Status Sync', action: 'Pushing system metrics', model: 'GLM 4.7', status: 'success', cost: '0.0004' },
]

export default function AgentHive() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="text-orange-500" />
            Agent Hive
          </h1>
          <p className="text-slate-400 mt-1">Real-time sub-agent audit logs and activity feed.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Active Workers</div>
            <div className="text-xl font-mono text-white">01</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Today's Cost</div>
            <div className="text-xl font-mono text-green-400">$0.0012</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
          <h2 className="font-semibold text-white">Live Activity Feed</h2>
          <div className="flex items-center gap-2 text-xs text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            LISTENING
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-6 py-4 font-bold">Time</th>
                <th className="px-6 py-4 font-bold">Agent</th>
                <th className="px-6 py-4 font-bold">Action Taken</th>
                <th className="px-6 py-4 font-bold">Model</th>
                <th className="px-6 py-4 font-bold">Token Cost</th>
                <th className="px-6 py-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock className="w-3.h-3 text-slate-500" />
                      {log.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-medium text-white">
                      <Zap className="w-3 h-3 text-orange-500" />
                      {log.agent}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 italic">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300 w-fit">
                      <Cpu className="w-3 h-3" />
                      {log.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-400">
                    ${log.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 text-center border-t border-slate-800 bg-slate-800/20">
          <p className="text-xs text-slate-600">
            Audit logs are retained for 30 days. All timestamps are in UTC.
          </p>
        </div>
      </div>
    </div>
  )
}
