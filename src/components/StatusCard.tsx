import { useState, useEffect } from 'react'
import { Cpu, Database, Zap } from 'lucide-react'
import { db } from '../lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

export default function StatusCard() {
  const [status, setStatus] = useState<any>(null)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'status', 'current'), (doc) => {
      if (doc.exists()) {
        setStatus(doc.data())
      }
    })
    return () => unsub()
  }, [])

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
            <span className="text-white font-medium">{status?.mainModel || 'Connecting...'}</span>
          </div>
        </div>

        {/* Uptime */}
        <div>
          <p className="text-sm text-slate-400 mb-1">System Uptime</p>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium">{status?.uptime || '---'}</span>
          </div>
        </div>

        {/* Sync Status */}
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-slate-400">Sync:</span>
          <span className="text-slate-300">{status ? 'LIVE' : 'WAITING'}</span>
        </div>
      </div>
    </div>
  )
}
