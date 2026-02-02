import { useState, useEffect } from 'react'
import { Clock, Cpu, CheckCircle, Plus, Zap } from 'lucide-react'
import { db } from '../lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Automation() {
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'automation'), (snapshot) => {
      setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Cron Jobs Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            Cron Jobs
          </h2>
          <button 
            onClick={() => alert('Cron Job creation coming in Phase 2!')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium active:scale-95 transition-transform"
          >
            <Plus className="w-4 h-4" />
            New Job
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
          {jobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 uppercase border-b border-slate-800">
                    <th className="px-6 py-4">Job Name</th>
                    <th className="px-6 py-4">Interval</th>
                    <th className="px-6 py-4">Model</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {jobs.map(job => (
                    <tr key={job.id} className="text-sm">
                      <td className="px-6 py-4 text-white font-medium">{job.name}</td>
                      <td className="px-6 py-4 text-slate-400">{job.interval}</td>
                      <td className="px-6 py-4 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-orange-400" />
                          {job.model}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs border border-green-500/20 uppercase font-bold">
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Clock className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No Active Cron Jobs</h3>
              <p className="text-slate-400 text-sm">Set up scheduled tasks to run automatically.</p>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-400" />
            Active Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Real Skills from OpenClaw */}
          <SkillCard 
            name="Browser (OpenClaw)" 
            description="Full browser automation. Can navigate websites, take screenshots, extract content, and interact with page elements."
            status="active"
          />
           <SkillCard 
            name="Filesystem" 
            description="Read, write, edit, and manage files in the workspace. Essential for memory and project management."
            status="active"
          />
           <SkillCard 
            name="Memory Search" 
            description="Vector-based semantic search across all memory files. Allows Tony to recall past conversations and context."
            status="active"
          />
           <SkillCard 
            name="Terminal / Exec" 
            description="Execute shell commands, manage processes, and run git operations."
            status="active"
          />
          <SkillCard 
            name="Cron" 
            description="Schedule periodic tasks and reminders. Powers the Heartbeat system."
            status="active"
          />
           <SkillCard 
            name="Web Search (Brave)" 
            description="Search the live web for real-time information and research."
            status="active"
          />
        </div>
      </section>
    </div>
  )
}

function SkillCard({ name, description, status }: { name: string, description: string, status: 'active' | 'inactive' }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-white">{name}</h3>
        {status === 'active' && (
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
            <CheckCircle className="w-3 h-3" />
            Active
          </div>
        )}
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}
