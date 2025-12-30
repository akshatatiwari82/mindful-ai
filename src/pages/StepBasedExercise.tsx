import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Check, Wind, BookOpen, Moon, Sparkles, Heart, Volume2, VolumeX } from "lucide-react";

// --- EXERCISE DATA ---
const exercisesData = {
  "box-breathing": {
    color: "bg-blue-50 text-blue-700",
    icon: <Wind className="w-6 h-6" />,
    autoAdvanceSeconds: 5, 
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
    autoAdvanceSeconds: 15,
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
    autoAdvanceSeconds: 12,
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
    autoAdvanceSeconds: null, 
    steps: [
      { text: "Negative Thought", sub: "What is upsetting you right now?", inputPlaceholder: "I feel like I failed..." },
      { text: "Evidence Check", sub: "Is this 100% true? What proof do you have against it?", inputPlaceholder: "I actually did well on..." },
      { text: "Reframe", sub: "What is a kinder, more realistic way to see this?", inputPlaceholder: "I am learning and improving..." }
    ]
  },
  pmr: {
    color: "bg-indigo-50 text-indigo-700",
    icon: <Moon className="w-6 h-6" />,
    autoAdvanceSeconds: 10,
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
  
  // VOICE GUIDANCE STATE (Default: ON)
  const [isMuted, setIsMuted] = useState(false);

  const progress = ((currentStep + 1) / data.steps.length) * 100;

  // --- TTS FUNCTION ---
  const speakInstruction = (text: string, sub: string) => {
    if (isMuted) return;
    
    // Stop any previous speech
    window.speechSynthesis.cancel();

    // Create new speech
    const utterance = new SpeechSynthesisUtterance(`${text}. ${sub}`);
    utterance.rate = 0.9; // Slightly slower for relaxation
    utterance.pitch = 1;
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };

  // --- NAVIGATION LOGIC ---
  const handleNext = () => {
    if (currentStep < data.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleInputChange = (val: string) => {
    const newInputs = [...userInputs];
    newInputs[currentStep] = val;
    setUserInputs(newInputs);
  };

  // --- TRIGGER SPEECH ON STEP CHANGE ---
  useEffect(() => {
    if (!completed) {
      const step = data.steps[currentStep];
      speakInstruction(step.text, step.sub);
    }
    // Cleanup: Stop talking if user leaves component
    return () => window.speechSynthesis.cancel();
  }, [currentStep, completed, isMuted]);

  // --- AUTO ADVANCE TIMER ---
  useEffect(() => {
    let timer: any;
    if (data.autoAdvanceSeconds && !completed) {
      timer = setTimeout(() => {
        handleNext();
      }, data.autoAdvanceSeconds * 1000);
    }
    return () => clearTimeout(timer);
  }, [currentStep, completed, data.autoAdvanceSeconds]);


  // --- COMPLETED VIEW ---
  if (completed) {
    return (
      <Card className="p-8 text-center animate-in zoom-in-95 bg-white shadow-xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Session Complete</h2>
        <Button onClick={onBack} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">Done</Button>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-xl bg-white border-none min-h-[400px] flex flex-col relative">
      
      {/* HEADER */}
      <div className={`p-6 ${data.color} flex justify-between items-center transition-colors duration-500`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">{data.icon}</div>
          <span className="font-bold opacity-90">Step {currentStep + 1}/{data.steps.length}</span>
        </div>
        
        {/* MUTE/UNMUTE BUTTON */}
        <button 
          onClick={() => {
            if (!isMuted) window.speechSynthesis.cancel();
            setIsMuted(!isMuted);
          }}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-current transition-all"
          title={isMuted ? "Unmute Voice Guidance" : "Mute Voice Guidance"}
        >
           {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* AUTO ADVANCE INDICATOR */}
      <Progress value={progress} className="h-1 bg-slate-100" />
      {data.autoAdvanceSeconds && (
        <div className="h-1 w-full bg-slate-100 overflow-hidden">
          <div className="h-full bg-emerald-500/20 animate-[progress_10s_linear_infinite]" style={{ animationDuration: `${data.autoAdvanceSeconds}s` }}></div>
        </div>
      )}

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
              className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-emerald-400 outline-none resize-none bg-slate-50"
              rows={4}
              placeholder={data.steps[currentStep].inputPlaceholder}
              value={userInputs[currentStep]}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-8">
           {/* TIMER TEXT */}
           {data.autoAdvanceSeconds && (
             <span className="text-xs text-slate-400 font-mono animate-pulse">
               Auto-next in {data.autoAdvanceSeconds}s...
             </span>
           )}

           <div className="flex gap-2 ml-auto">
             <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
             <Button size="lg" onClick={handleNext} className="px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white">
               {currentStep === data.steps.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2" />
             </Button>
           </div>
        </div>
      </div>
    </Card>
  );
};

export default StepBasedExercise;
