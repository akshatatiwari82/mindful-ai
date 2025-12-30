import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, RotateCcw, Check, Wind, BookOpen, Moon, Sparkles, Heart, Mic } from "lucide-react";

// --- EXERCISE DATA STORE ---
const exercisesData = {
  "box-breathing": {
    color: "bg-blue-50 text-blue-700",
    icon: <Wind className="w-6 h-6" />,
    steps: [
      { text: "Breathe In...", sub: "Fill your lungs slowly (4s)" },
      { text: "Hold...", sub: "Keep the air inside (4s)" },
      { text: "Breathe Out...", sub: "Release slowly (4s)" },
      { text: "Hold Empty...", sub: "Stay calm (4s)" }
    ]
  },
  grounding: {
    color: "bg-purple-50 text-purple-700",
    icon: <Sparkles className="w-6 h-6" />,
    steps: [
      { text: "Look around you.", sub: "Find 5 things you can SEE." },
      { text: "Touch something.", sub: "Find 4 things you can FEEL." },
      { text: "Listen carefully.", sub: "Find 3 things you can HEAR." },
      { text: "Focus on scent.", sub: "Find 2 things you can SMELL." },
      { text: "Focus on taste.", sub: "Find 1 thing you can TASTE." }
    ]
  },
  "loving-kindness": {
    color: "bg-pink-50 text-pink-700",
    icon: <Heart className="w-6 h-6" />,
    steps: [
      { text: "Picture yourself.", sub: "Say: May I be happy and safe." },
      { text: "Picture a loved one.", sub: "Say: May you be happy and safe." },
      { text: "Picture a neutral person.", sub: "Say: May you be peaceful." },
      { text: "Picture a difficult person.", sub: "Say: May you be free from anger." }
    ]
  },
  "cbt-reframing": {
    color: "bg-emerald-50 text-emerald-700",
    icon: <BookOpen className="w-6 h-6" />,
    hasInput: true,
    steps: [
      { text: "Negative Thought", sub: "What is upsetting you right now?", inputPlaceholder: "I feel like I failed..." },
      { text: "Evidence Check", sub: "Is this 100% true? What proof do you have against it?", inputPlaceholder: "I actually did well on..." },
      { text: "Reframe", sub: "What is a kinder, more realistic way to see this?", inputPlaceholder: "I am learning and improving..." }
    ]
  },
  pmr: {
    color: "bg-indigo-50 text-indigo-700",
    icon: <Moon className="w-6 h-6" />,
    steps: [
      { text: "Clench your Hands", sub: "Squeeze tight for 5 seconds..." },
      { text: "Release Hands", sub: "Feel the tension leave your fingers." },
      { text: "Squeeze Shoulders", sub: "Lift shoulders to ears tightly..." },
      { text: "Drop Shoulders", sub: "Let them fall completely loose." },
      { text: "Tighten Legs", sub: "Flex your thighs and calves..." },
      { text: "Release Legs", sub: "Feel your legs sink into the chair." }
    ]
  }
};

const StepBasedExercise = ({ exerciseType, onBack }: { exerciseType: string, onBack: () => void }) => {
  const data = exercisesData[exerciseType as keyof typeof exercisesData] || exercisesData["grounding"];
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

  const handleInputChange = (val: string) => {
    const newInputs = [...userInputs];
    newInputs[currentStep] = val;
    setUserInputs(newInputs);
  };

  if (completed) {
    return (
      <Card className="p-8 text-center animate-in zoom-in-95 bg-white shadow-xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Session Complete</h2>
        <Button onClick={onBack} className="mt-4 bg-slate-900 text-white">Done</Button>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-xl bg-white border-none min-h-[400px] flex flex-col">
      {/* HEADER */}
      <div className={`p-6 ${data.color} flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">{data.icon}</div>
          <span className="font-bold opacity-90">Step {currentStep + 1}/{data.steps.length}</span>
        </div>
        
        {/* VOICE COMMAND BUTTON (Visual Only for now) */}
        <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30" title="Voice Command Active">
           <Mic className="w-4 h-4" />
        </div>
      </div>

      <Progress value={progress} className="h-1" />

      {/* CONTENT */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in" key={currentStep}>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{data.steps[currentStep].text}</h2>
            <p className="text-xl text-slate-500">{data.steps[currentStep].sub}</p>
          </div>

          {/* INPUT FOR CBT */}
          {data.hasInput && (
            <textarea
              className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-slate-400 outline-none resize-none bg-slate-50"
              rows={4}
              placeholder={data.steps[currentStep].inputPlaceholder}
              value={userInputs[currentStep]}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
          )}
        </div>

        <div className="flex justify-end pt-8">
          <Button size="lg" onClick={handleNext} className="px-8 text-lg bg-slate-900 text-white hover:bg-black">
            {currentStep === data.steps.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StepBasedExercise;
