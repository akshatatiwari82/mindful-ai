import { useState } from "react";
import StepBasedExercise from "./StepBasedExercise"; 
import { useLanguage } from "../LanguageContext"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Brain, Heart, Sparkles, Timer, Play, ChevronLeft, BookOpen, Moon } from "lucide-react";

const Exercises = () => { 
  const { language, setLanguage, t } = useLanguage();
  const [isStarted, setIsStarted] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>("box-breathing");

  const exercisesList = [
    {
      id: "box-breathing",
      title: t.exercises.boxBreathing.title,
      description: t.exercises.boxBreathing.desc,
      duration: t.exercises.boxBreathing.duration,
      icon: <Wind className="w-6 h-6" />,
      tutorial: t.exercises.boxBreathing.tutorial
    },
    {
      id: "grounding",
      title: t.exercises.grounding.title,
      description: t.exercises.grounding.desc,
      duration: t.exercises.grounding.duration,
      icon: <Sparkles className="w-6 h-6" />,
      tutorial: t.exercises.grounding.tutorial
    },
    {
      id: "loving-kindness",
      title: t.exercises.lovingKindness.title,
      description: t.exercises.lovingKindness.desc,
      duration: t.exercises.lovingKindness.duration,
      icon: <Heart className="w-6 h-6" />,
      tutorial: t.exercises.lovingKindness.tutorial
    },
    {
      id: "cbt-reframing",
      title: t.exercises.cbt.title,
      description: t.exercises.cbt.desc,
      duration: t.exercises.cbt.duration,
      icon: <BookOpen className="w-6 h-6" />,
      tutorial: t.exercises.cbt.tutorial
    },
    {
      id: "pmr",
      title: t.exercises.pmr.title,
      description: t.exercises.pmr.desc,
      duration: t.exercises.pmr.duration,
      icon: <Moon className="w-6 h-6" />,
      tutorial: t.exercises.pmr.tutorial
    }
  ];

  const currentExerciseData = exercisesList.find((e) => e.id === selectedExercise);

  return (
    // UNIFIED LAYOUT: max-w-5xl ensures it matches Home/Mood pages
    <div className="max-w-5xl mx-auto space-y-8 pb-12 px-4 animate-in fade-in duration-500">
      
      {/* LANGUAGE SWITCHER */}
      <div className="flex justify-end pt-4">
        <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full border border-slate-200 flex gap-1">
          <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>ENG</button>
          <button onClick={() => setLanguage('hi')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'hi' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>हिंदी</button>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-slate-800">{t.dashboard.title}</h1>
        <p className="text-slate-500">{t.dashboard.subtitle}</p>
      </div>

      {/* EXERCISE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercisesList.map((ex) => (
          <Card 
            key={ex.id} 
            className={`p-5 cursor-pointer transition-all hover:shadow-lg ${selectedExercise === ex.id ? 'border-2 border-emerald-500 bg-emerald-50/50' : 'border-transparent bg-white shadow-sm hover:border-emerald-200'}`} 
            onClick={() => { setSelectedExercise(ex.id); setIsStarted(false); }}
          >
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-xl text-emerald-600 shadow-sm border border-emerald-100">{ex.icon}</div>
              <div>
                <h3 className="font-bold text-slate-800">{ex.title}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-2 line-clamp-1">{ex.description}</p>
                <div className="flex items-center text-xs text-slate-400 font-medium">
                  <Timer className="w-3 h-3 mr-1"/> {ex.duration}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ACTIVE AREA */}
      <div className="mt-8">
        {isStarted && selectedExercise ? (
          // --- PLAYER MODE ---
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <Button variant="ghost" onClick={() => setIsStarted(false)} className="mb-4 hover:bg-emerald-50 text-slate-600">
              <ChevronLeft className="w-4 h-4 mr-2" /> {t.dashboard.back}
            </Button>
            
            <StepBasedExercise exerciseType={selectedExercise} onBack={() => setIsStarted(false)} />
          </div>
        ) : (
          // --- TUTORIAL / PREVIEW MODE ---
          <Card className="p-8 text-center border-none shadow-xl bg-white/80 backdrop-blur-md">
             <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
               {currentExerciseData?.icon}
             </div>
             <h2 className="text-2xl font-bold mb-4 text-slate-800">{currentExerciseData?.title}</h2>
             
             {currentExerciseData?.tutorial && (
               <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto">
                 <h4 className="font-semibold flex items-center gap-2 mb-4 text-slate-700">
                   <Sparkles className="w-4 h-4 text-emerald-500" /> {t.dashboard.howTo}
                 </h4>
                 <ul className="space-y-3">
                   {currentExerciseData.tutorial.map((step, i) => (
                     <li key={i} className="flex gap-3 text-sm text-slate-600">
                       <span className="font-bold text-emerald-700 bg-emerald-100 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">{i+1}</span>
                       {step}
                     </li>
                   ))}
                 </ul>
               </div>
             )}

             <Button size="lg" className="px-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setIsStarted(true)}>
               <Play className="mr-2 w-5 h-5" /> {t.dashboard.startBtn}
             </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Exercises;
