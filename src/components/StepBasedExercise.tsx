import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, VolumeX, RotateCcw, ChevronRight, CheckCircle2, Sparkles, Heart } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface StepExerciseProps {
  exerciseType: 'grounding' | 'lovingKindness'; // We can add more later
  onBack: () => void;
}

export default function StepBasedExercise({ exerciseType, onBack }: StepExerciseProps) {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Dynamically select the correct data based on the prop
  const exerciseData = t.exercises[exerciseType];
  const steps = exerciseData.tutorial; // We use the tutorial list as the exercise steps!

  // Select Icon based on type
  const Icon = exerciseType === 'grounding' ? Sparkles : Heart;
  const colorClass = exerciseType === 'grounding' ? 'text-blue-500' : 'text-pink-500';
  const bgClass = exerciseType === 'grounding' ? 'bg-blue-500' : 'bg-pink-500';

  const speak = (text: string) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isFinished && steps[currentStep]) {
      // Speak the current step
      speak(steps[currentStep]);
    }
  }, [currentStep, language, isFinished, steps]);

  return (
    <Card className="relative overflow-hidden border-none shadow-2xl bg-white/90 backdrop-blur-md min-h-[500px] flex flex-col">
      {/* Background Pulse Animation */}
      <div className={`absolute inset-0 z-0 opacity-10 animate-pulse rounded-full blur-3xl scale-150 ${bgClass}`} />
      
      <CardHeader className="relative z-10 text-center pb-2">
        <div className="flex justify-between items-center px-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX className="text-slate-400" /> : <Volume2 className={colorClass} />}
          </Button>
          <CardTitle className="text-xl flex items-center gap-2">
             <Icon className={`w-5 h-5 ${colorClass}`} /> {exerciseData.title}
          </CardTitle>
          <div className="w-10" />
        </div>
      </CardHeader>

      <CardContent className="relative z-10 text-center flex-1 flex flex-col justify-center pb-10">
        {isFinished ? (
          <div className="py-8 animate-in zoom-in">
            <CheckCircle2 className={`w-16 h-16 mx-auto mb-4 ${colorClass}`} />
            <h2 className="text-2xl font-bold mb-2">{language === 'hi' ? 'सत्र पूरा हुआ' : 'Session Complete'}</h2>
            <Button onClick={onBack} className="w-full mt-6" size="lg">{t.dashboard.back}</Button>
            <Button variant="ghost" onClick={() => { setIsFinished(false); setCurrentStep(0); }} className="mt-2">
               <RotateCcw className="w-4 h-4 mr-2" /> {language === 'hi' ? 'फिर से करें' : 'Restart'}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col justify-center mb-6">
              <div className={`w-12 h-12 rounded-full ${bgClass}/20 flex items-center justify-center mx-auto mb-6 text-xl font-bold ${colorClass}`}>
                 {currentStep + 1}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 transition-all">
                {steps[currentStep]}
              </h2>
            </div>

            <Button 
              size="lg" 
              className={`w-full py-8 text-lg shadow-lg ${bgClass} hover:opacity-90`} 
              onClick={() => currentStep < steps.length - 1 ? setCurrentStep(currentStep + 1) : setIsFinished(true)}
            >
              {currentStep === steps.length - 1 ? (language === 'hi' ? 'समाप्त' : 'Finish') : (language === 'hi' ? 'अगला' : 'Next')} 
              <ChevronRight className="ml-2" />
            </Button>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1 mt-6 rounded-full overflow-hidden">
               <div className={`h-full transition-all duration-500 ${bgClass}`} style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}