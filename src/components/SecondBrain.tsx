import { useState, useEffect } from 'react'
import { Search, RotateCw, FileText, Folder, Settings, Calendar, Brain, ArrowLeft } from 'lucide-react'
import { db } from '../lib/firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

export default function SecondBrain({ initialFile, initialCategory, onFileCleared }: { 
  initialFile?: any, 
  initialCategory?: string,
  onFileCleared: () => void 
}) {
  const [files, setFiles] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState<any | null>(initialFile || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (initialFile) setSelectedFile(initialFile)
    if (initialCategory) setSelectedCategory(initialCategory)
  }, [initialFile, initialCategory])

  useEffect(() => {
    const q = query(collection(db, 'brain'), orderBy('updatedAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setFiles(docs)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const CATEGORIES = ['ALL', 'DAILY', 'CORE', 'NOTES', 'PROJECTS', 'SYSTEMS', 'AGENTS', 'ARCHIVE']

  // Mobile: If a file is selected, show content view. If null, show list view.
  const showList = !selectedFile
  const showContent = !!selectedFile

  const filteredFiles = files.filter(file => {
    // ARCHIVE logic: 
    // If category is ARCHIVE, only show in ARCHIVE.
    // If selectedCategory is NOT ARCHIVE, filter out ARCHIVE files from 'ALL' and others.
    if (selectedCategory === 'ARCHIVE') {
      return file.category === 'ARCHIVE'
    } else {
      // Don't show ARCHIVE files in other pills (including ALL)
      if (file.category === 'ARCHIVE') return false
      
      const matchesCategory = selectedCategory === 'ALL' || file.category === selectedCategory
      const matchesSearch = file.title?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    }
  })

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Sidebar (File List) */}
      <div className={`
        flex-col border-r border-slate-800 bg-slate-900/30 w-full md:w-80 transition-all duration-300
        ${showList ? 'flex' : 'hidden md:flex'}
      `}>
        
        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-800 space-y-4 shrink-0">
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
              className={`w-full text-left px-3 py-3 rounded-md mb-1 flex items-center gap-3 transition-colors ${
                selectedFile?.id === file.id
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
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-sm font-medium transition-colors">
            <RotateCw className="w-4 h-4" />
            REFRESH LIBRARY
          </button>
        </div>
      </div>

      {/* Main Content Viewer */}
      <div className={`
        flex-1 bg-slate-950 p-4 md:p-8 overflow-y-auto w-full
        ${showContent ? 'block' : 'hidden md:block'}
      `}>
        {selectedFile ? (
          <div className="max-w-4xl mx-auto">
            {/* Mobile Back Button */}
            <button 
              onClick={() => setSelectedFile(null)}
              className="md:hidden flex items-center gap-2 text-slate-400 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </button>

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 mb-1 block">{selectedFile.category}</span>
                <h1 className="text-2xl md:text-3xl font-bold text-white break-all">{selectedFile.title}</h1>
              </div>
              <div className="text-sm text-slate-500 whitespace-nowrap ml-4">
                {selectedFile.updatedAt?.toDate ? selectedFile.updatedAt.toDate().toLocaleDateString() : 'Recent'}
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono overflow-x-auto">
                  {selectedFile.content}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <Brain className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a file from the brain to view</p>
          </div>
        )}
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
