import { useState, useEffect } from 'react'
import { Brain, Server, FileText, BarChart3, Menu, X, LogOut, Activity } from 'lucide-react'
import { onAuthStateChanged, signOut, User, getRedirectResult } from 'firebase/auth'
import { auth } from './lib/firebase'
import Dashboard from './components/Dashboard'
import SecondBrain from './components/SecondBrain'
import Automation from './components/Automation'
import AgentHive from './components/AgentHive'
import Login from './components/Login'

type Tab = 'dashboard' | 'brain' | 'automation' | 'logs' | 'hive'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check for redirect results on mount
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          if (result.user.email === 'dabosti@gmail.com') {
            setUser(result.user)
          } else {
            signOut(auth)
            alert("Unauthorized access. This incident will be reported to Tony.")
          }
        }
      })
      .catch((error) => {
        console.error("Redirect error:", error)
      })

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email !== 'dabosti@gmail.com') {
        signOut(auth)
        setUser(null)
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    signOut(auth)
    setMobileMenuOpen(false)
  }

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading mission control...</div>
  }

  if (!user) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">Tony Dashboard</h1>
                <p className="text-xs text-slate-400 hidden md:block">Mission Control for {user.displayName || 'Dave'}</p>
              </div>
            </div>
            
            {/* Desktop Stats (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="text-slate-400 text-xs">MODEL</div>
                <div className="text-white font-medium">gemini-3-pro</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-slate-400 text-xs">UPTIME</div>
                <div className="text-white font-medium">2d 7h</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">ONLINE</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex gap-2 mt-4">
            <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<BarChart3 />} label="Live Status" />
            <NavButton active={activeTab === 'brain'} onClick={() => setActiveTab('brain')} icon={<Brain />} label="Second Brain" />
            <NavButton active={activeTab === 'hive'} onClick={() => setActiveTab('hive')} icon={<Activity />} label="Agent Hive" />
            <NavButton active={activeTab === 'automation'} onClick={() => setActiveTab('automation')} icon={<Server />} label="Automation" />
            <NavButton active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} icon={<FileText />} label="System Logs" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 p-4 space-y-2">
            <MobileNavButton active={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')} icon={<BarChart3 />} label="Live Status" />
            <MobileNavButton active={activeTab === 'brain'} onClick={() => handleTabChange('brain')} icon={<Brain />} label="Second Brain" />
            <MobileNavButton active={activeTab === 'hive'} onClick={() => handleTabChange('hive')} icon={<Activity />} label="Agent Hive" />
            <MobileNavButton active={activeTab === 'automation'} onClick={() => handleTabChange('automation')} icon={<Server />} label="Automation" />
            <MobileNavButton active={activeTab === 'logs'} onClick={() => handleTabChange('logs')} icon={<FileText />} label="System Logs" />
            
            {/* Mobile Stats & Logout */}
            <div className="pt-4 mt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-500 text-xs">MODEL</div>
                <div className="text-white font-medium">gemini-3-pro</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">UPTIME</div>
                <div className="text-white font-medium">2d 7h</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 mt-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Tab Content */}
      <main>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'brain' && <SecondBrain />}
        {activeTab === 'hive' && <AgentHive />}
        {activeTab === 'automation' && <Automation />}
        {activeTab === 'logs' && (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">System Logs</h2>
              <p className="text-slate-400">Coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Helper Components
interface NavButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <span className="w-4 h-4">{icon}</span>
      {label}
    </button>
  )
}

function MobileNavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:bg-slate-800'
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      {label}
    </button>
  )
}

export default App
