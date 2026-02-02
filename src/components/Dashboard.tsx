import { Activity, Brain, Calendar, Zap, ArrowLeft } from 'lucide-react'
import StatusCard from './StatusCard'
import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Dashboard({ setTab, setSelectedFile, setSelectedCategory }: { 
  setTab: (tab: any) => void, 
  setSelectedFile: (file: any) => void,
  setSelectedCategory: (cat: string) => void
}) {
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'brain'), (snapshot) => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])
  return (
    <div className="container mx-auto px-4 py-8">
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
            <button 
              onClick={() => {
                const file = files.find(f => f.title === 'MEMORY.md')
                if (file) {
                  setSelectedFile(file)
                  setSelectedCategory('CORE')
                }
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors flex items-center justify-between group"
            >
              <span>📝 MEMORY.md</span>
              <ArrowLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 rotate-180 transition-opacity" />
            </button>
            <button 
              onClick={() => {
                const file = files.find(f => f.title === 'SOUL.md')
                if (file) {
                  setSelectedFile(file)
                  setSelectedCategory('CORE')
                }
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors flex items-center justify-between group"
            >
              <span>😊 SOUL.md</span>
              <ArrowLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 rotate-180 transition-opacity" />
            </button>
            <button 
              onClick={() => {
                const file = files.find(f => f.title === 'USER.md')
                if (file) {
                  setSelectedFile(file)
                  setSelectedCategory('CORE')
                }
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors flex items-center justify-between group"
            >
              <span>👤 USER.md</span>
              <ArrowLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 rotate-180 transition-opacity" />
            </button>
            <button 
              onClick={() => {
                const file = files.find(f => f.title === 'IDENTITY.md')
                if (file) {
                  setSelectedFile(file)
                  setSelectedCategory('CORE')
                }
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 text-sm transition-colors flex items-center justify-between group"
            >
              <span>🎯 IDENTITY.md</span>
              <ArrowLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 rotate-180 transition-opacity" />
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
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm text-white">Refine Morning & EOD Briefs</p>
                <p className="text-xs text-slate-500">Customize tone, accountability, and auto-sync to brain.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
