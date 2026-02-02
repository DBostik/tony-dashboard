import { useState, useEffect } from 'react'
import { Activity, Clock, Cpu, Zap } from 'lucide-react'
import { db } from '../lib/firebase'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'

export default function AgentHive() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const q = query(collection(db, 'subagent_logs'), orderBy('timestamp', 'desc'), limit(50))
    const unsub = onSnapshot(q, (snapshot) => {
      setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

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
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Actions</div>
            <div className="text-xl font-mono text-white">{logs.length}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Last Activity</div>
            <div className="text-xl font-mono text-green-400">{logs[0]?.time || '--:--'}</div>
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
              {logs.map((log) => (
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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      log.status === 'success' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {log.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                    No activity logs found. Waiting for first sub-agent run...
                  </td>
                </tr>
              )}
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
