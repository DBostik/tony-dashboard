import { useState } from 'react'
import { Search, RotateCw, FileText, Folder, Settings, Calendar, Brain } from 'lucide-react'

// Mock data for initial build
const FILES = [
  { id: '1', title: '2026-02-01.md', category: 'DAILY', date: '2026-02-01', content: '# Daily Log...' },
  { id: '2', title: 'MEMORY.md', category: 'CORE', date: '2026-02-01', content: '# Long-Term Memory...' },
  { id: '3', title: 'SOUL.md', category: 'CORE', date: '2026-01-30', content: '# SOUL.md - Who You Are...' },
  { id: '4', title: 'media-kit.md', category: 'NOTES', date: '2026-01-30', content: '# Media Kit...' },
  { id: '5', title: 'PLAN.md', category: 'PROJECTS', date: '2026-02-01', content: '# Tony Dashboard Plan...' },
]

const CATEGORIES = ['ALL', 'DAILY', 'CORE', 'NOTES', 'PROJECTS', 'SYSTEMS']

export default function SecondBrain() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState(FILES[0])

  const filteredFiles = FILES.filter(file => {
    const matchesCategory = selectedCategory === 'ALL' || file.category === selectedCategory
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-800 bg-slate-900/30 flex flex-col">
        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-800 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search brain..."
              className="w-full bg-slate-900 border border-slate-700 rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] font-bold px-2 py-1 rounded-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-bold text-slate-500 px-2 py-2">FILES</div>
          {filteredFiles.map(file => (
            <button
              key={file.id}
              onClick={() => setSelectedFile(file)}
              className={`w-full text-left px-3 py-2.5 rounded-md mb-1 flex items-center gap-3 transition-colors ${
                selectedFile.id === file.id
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {getIconForCategory(file.category)}
              <div className="truncate text-sm font-medium">{file.title}</div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-sm font-medium transition-colors">
            <RotateCw className="w-4 h-4" />
            REFRESH LIBRARY
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-blue-400 mb-1 block">{selectedFile.category}</span>
              <h1 className="text-3xl font-bold text-white">{selectedFile.title}</h1>
            </div>
            <div className="text-sm text-slate-500">{selectedFile.date}</div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-400 italic">
              (File content loading from OpenClaw API would appear here...)
            </p>
            <pre className="bg-slate-900 p-4 rounded-lg text-sm text-slate-300 mt-4">
              {selectedFile.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

function getIconForCategory(category: string) {
  switch (category) {
    case 'DAILY': return <Calendar className="w-4 h-4" />
    case 'CORE': return <Brain className="w-4 h-4" />
    case 'PROJECTS': return <Folder className="w-4 h-4" />
    case 'SYSTEMS': return <Settings className="w-4 h-4" />
    default: return <FileText className="w-4 h-4" />
  }
}
