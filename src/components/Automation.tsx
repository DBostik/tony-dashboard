import { Clock, Play, Pause, Edit, Trash2, Cpu, CheckCircle } from 'lucide-react'

export default function Automation() {
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Cron Jobs Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            Cron Jobs
          </h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium">
            + New Job
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
          {/* Mock empty state for now */}
          <div className="p-8 text-center">
            <Clock className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white mb-1">No Active Cron Jobs</h3>
            <p className="text-slate-400 text-sm">Set up scheduled tasks to run automatically.</p>
          </div>
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
          {/* Mock Skills */}
          <SkillCard 
            name="Browser" 
            description="Control web browser for research and automation"
            status="active"
          />
           <SkillCard 
            name="Filesystem" 
            description="Read and write files in the workspace"
            status="active"
          />
           <SkillCard 
            name="Memory" 
            description="Long-term semantic memory storage and retrieval"
            status="active"
          />
        </div>
      </section>
    </div>
  )
}

function SkillCard({ name, description, status }: { name: string, description: string, status: 'active' | 'inactive' }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white">{name}</h3>
        {status === 'active' && (
          <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
            <CheckCircle className="w-3 h-3" />
            Active
          </div>
        )}
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}
