import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Heart, Activity, UserCog, Brain } from "lucide-react";
import MoodTracker from "./components/MoodTracker"; 
import Exercises from "./components/Exercises";
import TherapistPortal from "./components/TherapistPortal"; 

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- LEFT SIDE: LOGO & STUDENT LINKS --- */}
        <div className="flex items-center gap-8">
          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800 hover:opacity-80 transition-opacity">
            <Brain className="w-8 h-8 text-purple-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 hidden sm:block">
              MindfulAI
            </span>
          </Link>

          {/* 2. Main Navigation (Tracker & Exercises) */}
          <div className="flex gap-1 bg-gray-100/50 p-1 rounded-full">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive('/') 
                  ? "bg-white text-purple-700 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Heart className="w-4 h-4" /> Tracker
            </Link>
            <Link 
              to="/exercises" 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive('/exercises') 
                  ? "bg-white text-blue-700 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Activity className="w-4 h-4" /> Exercises
            </Link>
          </div>
        </div>

        {/* --- RIGHT SIDE: THERAPIST LOGIN --- */}
        <div>
          <Link 
            to="/therapist" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
              isActive('/therapist') 
                ? "bg-slate-800 text-white border-slate-800 shadow-md" 
                : "bg-white text-slate-500 border-gray-200 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span className="hidden md:inline">Therapist Login</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

// --- MAIN APP ROUTING ---
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
        <Navbar />
        <main className="py-8 animate-in fade-in duration-500">
          <Routes>
            {/* The "/" path is the Home Page (Student Tracker) */}
            <Route path="/" element={<MoodTracker />} />
            
            {/* The "/exercises" path is the Exercises Page */}
            <Route path="/exercises" element={<Exercises />} />
            
            {/* The "/therapist" path is the Portal (Only visible when button is clicked) */}
            <Route path="/therapist" element={<TherapistPortal />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
