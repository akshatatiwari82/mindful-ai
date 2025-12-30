import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import { UserCog, Heart, Activity, Brain } from "lucide-react";

// 1. IMPORT THE LANGUAGE PROVIDER
import { LanguageProvider } from "./LanguageContext"; 

// PAGE IMPORTS
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood";
import Exercises from "./pages/Exercises";
import Emergency from "./pages/Emergency";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TherapistPortal from "./components/TherapistPortal"; // Added Therapist Portal

const queryClient = new QueryClient();

// --- NAVBAR COMPONENT (Added for the Therapist Button) ---
const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Hide Navbar on Auth page if desired
  if (location.pathname === "/auth") return null;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LEFT: Logo & Student Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800 hover:opacity-80 transition-opacity">
            <Brain className="w-8 h-8 text-purple-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 hidden sm:block">
              MindfulAI
            </span>
          </Link>

          <div className="flex gap-1 bg-gray-100/50 p-1 rounded-full">
            <Link 
              to="/mood" 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive('/mood') ? "bg-white text-purple-700 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Heart className="w-4 h-4" /> Tracker
            </Link>
            <Link 
              to="/exercises" 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive('/exercises') ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Activity className="w-4 h-4" /> Exercises
            </Link>
          </div>
        </div>

        {/* RIGHT: Therapist Login Button */}
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

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* 2. WRAP THE APP WITH LANGUAGE PROVIDER HERE */}
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {/* Added Navbar here so it shows on all pages */}
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/mood" element={<Mood />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/emergency" element={<Emergency />} />
                {/* Added Therapist Route */}
                <Route path="/therapist" element={<TherapistPortal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
