import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { Brain, Lock } from 'lucide-react'

export default function Login() {
  const handleLogin = async () => {
    try {
      // Use redirect on mobile/tablets, popup on desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed. Check console for details.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center space-y-6 backdrop-blur-sm">
        
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center relative group">
            <Brain className="w-8 h-8 text-orange-500 relative z-10" />
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/30 transition-all"></div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Tony Dashboard</h1>
          <p className="text-slate-400 text-sm">Restricted Access • Mission Control</p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 px-4 rounded-xl transition-all transform active:scale-95"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <Lock className="w-3 h-3" />
          <span>Authorized Personnel Only (Dave & Tony)</span>
        </div>
      </div>
    </div>
  )
}
