import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import { MessageCircle, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; 

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MindfulAI | Your Mental Health, Understood</title>
        <meta name="description" content="AI-powered emotional support and mood tracking." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-teal-50/40 via-white to-white">
        <Navigation />
        
        {/* Main Hero Section */}
        <main className="container mx-auto px-4 pt-32 pb-16 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* 1. The Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 font-display">
            Your Mental Health, <br className="hidden md:block" />
            {/* The Gradient Text Effect */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-orange-400">
              Understood
            </span>
          </h1>

          {/* 2. The Subtext */}
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience early mental health detection with AI that truly listens. 
            Track your emotions, practice self-care, and find support — all in one safe space.
          </p>

          {/* 3. The Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            
            {/* Primary Button (Teal) */}
            <Link to="/chat">
              <button className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-medium text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                Start Talking to AI
              </button>
            </Link>

            {/* Secondary Button (Outline) */}
            <button className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto">
              <Activity className="w-5 h-5 text-teal-600" />
              Track My Mood
            </button>
          </div>

          {/* Optional: Trust Badges / Extra visual element from your screenshot style */}
          <div className="mt-16 pt-8 border-t border-slate-100 w-full max-w-md mx-auto">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-4">
              Trusted & Secure
            </p>
            <div className="flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
               {/* Placeholders for logos if you have them */}
               <div className="h-8 w-24 bg-slate-200 rounded animate-pulse"></div>
               <div className="h-8 w-24 bg-slate-200 rounded animate-pulse"></div>
               <div className="h-8 w-24 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default Index;
