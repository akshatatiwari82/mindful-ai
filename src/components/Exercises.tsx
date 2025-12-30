import { useState } from "react";
import BodyScan from "./BodyScan";
import BreathingExercise from "./BreathingExercise";
import StepBasedExercise from "./StepBasedExercise"; // Import the new Universal Player
import { LanguageProvider, useLanguage } from "../LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Brain, Heart, Sparkles, Timer, Play, ChevronLeft } from "lucide-react";

const ExercisesContent = () => {
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
      id: "body-scan",
      title: t.exercises.bodyScan.title,
      description: t.exercises.bodyScan.desc,
      duration: t.exercises.bodyScan.duration,
      icon: <Brain className="w-6 h-6" />,
      tutorial: t.exercises.bodyScan.tutorial
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
    }
  ];

  const currentExerciseData = exercisesList.find((e) => e.id === selectedExercise);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 px-4">
      
      {/* LANGUAGE SWITCHER */}
      <div className="flex justify-end pt-4">
        <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full border border-slate-200 flex gap-1">
          <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-primary text-white' : 'text-slate-500'}`}>ENG</button>
          <button onClick={() => setLanguage('hi')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'hi' ? 'bg-primary text-white' : 'text-slate-500'}`}>हिंदी</button>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{t.dashboard.title}</h1>
        <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
      </div>

      {/* EXERCISE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercisesList.map((ex) => (
          <Card 
            key={ex.id} 
            className={`p-5 cursor-pointer transition-all hover:shadow-lg ${selectedExercise === ex.id ? 'border-2 border-primary bg-primary/5' : 'border-transparent glass-card'}`} 
            onClick={() => { setSelectedExercise(ex.id); setIsStarted(false); }}
          >
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-xl text-primary shadow-sm">{ex.icon}</div>
              <div>
                <h3 className="font-bold text-foreground">{ex.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Timer className="w-3 h-3 mr-1"/> {ex.duration}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="mt-8">
        {isStarted ? (
          // --- ACTIVE MODE ---
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <Button variant="ghost" onClick={() => setIsStarted(false)} className="mb-4">
              <ChevronLeft className="w-4 h-4 mr-2" /> {t.dashboard.back}
            </Button>
            
            {/* 1. Body Scan */}
            {selectedExercise === "body-scan" && <BodyScan onBack={() => setIsStarted(false)} />}
            
            {/* 2. Box Breathing */}
            {selectedExercise === "box-breathing" && (
              <Card className="bg-white/90 p-6 shadow-xl">
                 <BreathingExercise />
              </Card>
            )}

            {/* 3. Grounding (Uses Universal Player) */}
            {selectedExercise === "grounding" && (
              <StepBasedExercise exerciseType="grounding" onBack={() => setIsStarted(false)} />
            )}

            {/* 4. Loving Kindness (Uses Universal Player) */}
            {selectedExercise === "loving-kindness" && (
              <StepBasedExercise exerciseType="lovingKindness" onBack={() => setIsStarted(false)} />
            )}
          </div>
        ) : (
          // --- PREVIEW / TUTORIAL MODE ---
          <Card className="p-8 text-center border-none shadow-xl bg-white/60 backdrop-blur-md">
             <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
               {currentExerciseData?.icon}
             </div>
             <h2 className="text-2xl font-bold mb-4">{currentExerciseData?.title}</h2>
             
             {currentExerciseData?.tutorial && (
               <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto">
                 <h4 className="font-semibold flex items-center gap-2 mb-4 text-primary">
                   <Sparkles className="w-4 h-4" /> {t.dashboard.howTo}
                 </h4>
                 <ul className="space-y-3">
                   {currentExerciseData.tutorial.map((step, i) => (
                     <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                       <span className="font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">{i+1}</span>
                       {step}
                     </li>
                   ))}
                 </ul>
               </div>
             )}

             <Button size="lg" className="px-8" onClick={() => setIsStarted(true)}>
               <Play className="mr-2 w-5 h-5" /> {t.dashboard.startBtn}
             </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

const ExercisesSection = () => (
  <LanguageProvider>
    <ExercisesContent />
  </LanguageProvider>
);

export default ExercisesSection;
