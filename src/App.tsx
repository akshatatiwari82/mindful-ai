import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { UserCog, Heart, Activity, Brain, MessageSquare, Phone, Home } from "lucide-react";

// PAGE IMPORTS
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import MoodTracker from "./pages/MoodTracker"; // Updated to match your file name
import Login from "./pages/Login"; // Updated to match your file name
import NotFound from "./pages/NotFound";

// Placeholders for pages you might not have created yet
// If you get errors, comment these out until you create the files:
import Exercises from "./pages/Exercises"; 
import Emergency from "./pages/Emergency";
import TherapistPortal from "./components/TherapistPortal";

const queryClient = new QueryClient();

// --- UNIFIED NAVBAR ---
const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Hide Navbar on Login page (so it looks clean like your screenshot)
  if (location.pathname === "/login") return null;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800 hover:opacity-80 transition-opacity">
          <Brain className="w-8 h-8 text-emerald-600" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 hidden sm:block">
            MindfulAI
          </span>
        </Link>

        {/* CENTRAL NAVIGATION */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/') ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link to="/chat" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/chat') ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>
            <MessageSquare className="w-4 h-4" /> Chat
          </Link>
          <Link to="/mood-tracker" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/mood-tracker') ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>
            <Heart className="w-4 h-4" /> Mood Tracker
          </Link>
          {/* Uncomment these when you create the pages */}
          {/* <Link to="/exercises" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/exercises') ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}>
            <Activity className="w-4 h-4" /> Exercises
          </Link>
          <Link to="/emergency" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/emergency') ? "bg-red-600 text-white shadow-md" : "text-gray-600 hover:bg-red-50 hover:text-red-700"}`}>
            <Phone className="w-4 h-4" /> Emergency
          </Link>
          */}
        </div>

        {/* THERAPIST BUTTON */}
        <div>
          <Link to="/therapist" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${isActive('/therapist') ? "bg-slate-800 text-white border-slate-800 shadow-md" : "bg-white text-slate-500 border-gray-200 hover:border-slate-300 hover:text-slate-800"}`}>
            <UserCog className="w-4 h-4" />
            <span className="hidden lg:inline">Therapist</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          {/* Main Content Area */}
          <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-emerald-50/50 to-white">
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* YOUR NEW ROUTES */}
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mood-tracker" element={<MoodTracker />} />
              
              {/* Placeholder Routes (Create these files later or comment them out) */}
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/therapist" element={<TherapistPortal />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
