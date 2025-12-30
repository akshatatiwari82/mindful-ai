import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Activity, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative py-20 px-4 md:px-6 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent"></div>
        
        <div className="container max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 animate-fade-in-up">
            <Shield className="mr-2 h-4 w-4" />
            Your privacy is our priority • End-to-End Encrypted
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Your Mental Health, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Understood
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
            Experience early mental health detection with AI that truly listens. Track your emotions, practice self-care, and find support — all in one safe space.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/chat">
              <Button size="lg" className="h-12 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                <Brain className="mr-2 h-5 w-5" /> Start Talking to AI
              </Button>
            </Link>
            <Link to="/mood">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-2 border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 text-slate-700 rounded-full">
                <Activity className="mr-2 h-5 w-5" /> Track My Mood
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-20 bg-white/50 border-t border-slate-100">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Psychologist</h3>
              <p className="text-slate-500">Chat with an empathetic AI trained to understand anxiety, stress, and depression patterns.</p>
            </div>
            
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Daily Tracking</h3>
              <p className="text-slate-500">Log your mood and energy levels to visualize your mental health journey over time.</p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Calming Exercises</h3>
              <p className="text-slate-500">Access guided breathing, meditation, and CBT tools whenever you feel overwhelmed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
