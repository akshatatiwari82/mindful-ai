import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, RotateCcw, Check, Play, Pause, BookOpen, Moon, Sparkles, Heart } from "lucide-react";

// --- EXERCISE DATA STORE ---
const exercisesData = {
  // 1. GROUNDING (5-4-3-2-1)
  grounding: {
    color: "bg-purple-50 text-purple-700",
    icon: <Sparkles className="w-6 h-6" />,
    steps: [
      { text: "Take a deep breath. Look around.", sub: "Prepare to observe your environment." },
      { text: "Find 5 things you can SEE.", sub: "Name them silently or out loud." },
      { text: "Find 4 things you can FEEL.", sub: "The texture of your shirt, the table, etc." },
      { text: "Find 3 things you can HEAR.", sub: "Focus on distant or close sounds." },
      { text: "Find 2 things you can SMELL.", sub: "Or recall your favorite scents." },
      { text: "Find 1 thing you can TASTE.", sub: "Take a sip of water or notice the taste in your mouth." }
    ]
  },
  
  // 2. LOVING KINDNESS
  lovingKindness: {
    color: "bg-pink-50 text-pink-700",
    icon: <Heart className="w-6 h-6" />,
    steps: [
      { text: "Sit comfortably and close your eyes.", sub: "Take three deep breaths." },
      { text: "Think of yourself.", sub: "Repeat: 'May I be happy. May I be safe.'" },
      { text: "Think of someone you love.", sub: "Repeat: 'May you be happy. May you be safe.'" },
      { text: "Think of a neutral person.", sub: "Someone you saw today but don't know well." },
      { text: "Think of a difficult person.", sub: "Send them peace to free yourself from anger." },
      { text: "Expand to the whole world.", sub: "May all beings be happy and free from suffering." }
    ]
  },

  // 3. CBT REFRAMING (New!)
  cbt: {
    color: "bg-emerald-50 text-emerald-700",
    icon: <BookOpen className="w-6 h-6" />,
    hasInput: true, // Special flag for text inputs
    steps: [
      { text: "Identify the Situation", sub: "What happened that upset you?", inputPlaceholder: "E.g., I made a mistake in class." },
      { text: "Identify the Negative Thought", sub: "What did you tell yourself?", inputPlaceholder: "E.g., 'I am stupid and everyone laughed.'" },
      { text: "Challenge the Thought", sub: "Is this 100% true? What is the evidence?", inputPlaceholder: "E.g., Everyone makes mistakes. No one actually laughed." },
      { text: "Alternative Perspective", sub: "What is a kinder way to view this?", inputPlaceholder: "E.g., I am learning. Mistakes help me grow." }
    ]
  },

  // 4. PROGRESSIVE MUSCLE RELAXATION (New!)
  pmr: {
    color: "bg-indigo-50 text-indigo-700",
    icon: <Moon className="w-6 h-6" />,
    steps: [
      { text: "Find a comfortable position.", sub: "Lie down or sit back. Close your eyes." },
      { text: "Focus on your HANDS.", sub: "Clench fists tight for 5s... then release." },
      { text: "Focus on your SHOULDERS.", sub: "Raise to ears for 5s... then drop them completely." },
      { text: "Focus on your FACE.", sub: "Scrunch nose/eyes for 5s... then smooth it out." },
      { text: "Focus on your LEGS.", sub: "Squeeze thighs for 5s... then let them go limp." },
      { text: "Full Body Scan.", sub: "Notice how heavy and relaxed your body feels now." }
    ]
  }
};

interface StepBasedExerciseProps {
  exerciseType: "grounding" | "lovingKindness" | "cbt" | "pmr" | string;
  onBack: () => void;
}

const StepBasedExercise = ({ exerciseType, onBack }: StepBasedExerciseProps) => {
  // Safe check: If the type doesn't exist, default to grounding
  const data = exercisesData[exerciseType as keyof typeof exercisesData] || exercisesData.grounding;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [userInputs, setUserInputs] = useState<string[]>(new Array(data.steps.length).fill(""));

  const progress = ((currentStep + 1) / data.steps.length) * 100;

  const handleNext = () => {
    if (currentStep < data.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCompleted(false);
    setUserInputs(new Array(data.steps.length).fill(""));
  };

  const handleInputChange = (val: string) => {
    const newInputs = [...userInputs];
    newInputs[currentStep] = val;
    setUserInputs(newInputs);
  };

  if (completed) {
    return (
      <Card className="p-8 text-center animate-in zoom-in-95 bg-white/90 shadow-xl border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Session Complete</h2>
        <p className="text-muted-foreground mb-8">You've taken a moment for yourself. Great job.</p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="w-4 h-4 mr-2" /> Restart
          </Button>
          <Button onClick={onBack}>
            Done
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-xl bg-white border-none">
      {/* HEADER */}
      <div className={`p-6 ${data.color} flex justify-between items-center transition-colors`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            {data.icon}
          </div>
          <span className="font-bold text-lg uppercase tracking-wide opacity-90">Step {currentStep + 1}/{data.steps.length}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-white/20 text-current">
           <span className="sr-only">Close</span>
           <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* PROGRESS BAR */}
      <Progress value={progress} className="h-1 rounded-none bg-slate-100" />

      {/* CONTENT AREA */}
      <div className="p-8 min-h-[300px] flex flex-col justify-between">
        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in" key={currentStep}>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 leading-tight">
              {data.steps[currentStep].text}
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              {data.steps[currentStep].sub}
            </p>
          </div>

          {/* INPUT FIELD (Only for CBT) */}
          {data.hasInput && (
            <textarea
              className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-emerald-400 focus:ring-0 outline-none text-slate-700 resize-none bg-slate-50 transition-all"
              rows={4}
              placeholder={data.steps[currentStep].inputPlaceholder || "Write here..."}
              value={userInputs[currentStep]}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-end pt-8">
          <Button 
            size="lg" 
            onClick={handleNext} 
            className="pl-8 pr-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {currentStep === data.steps.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StepBasedExercise;
