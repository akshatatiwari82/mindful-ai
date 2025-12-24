import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, VolumeX, RotateCcw, ChevronRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

// Data stored locally for easy access by the component
const bodyScanSteps = [
  { part: { en: "Toes & Feet", hi: "पैर की उंगलियां" }, instruction: { en: "Wiggle your toes and relax.", hi: "अपनी उंगलियों को हिलाएं और ढीला छोड़ें।" } },
  { part: { en: "Lower Legs", hi: "पैर का निचला हिस्सा" }, instruction: { en: "Release tightness in calves.", hi: "पिंडलियों के तनाव को छोड़ें।" } },
  { part: { en: "Thighs", hi: "जांघें" }, instruction: { en: "Let your legs feel heavy.", hi: "अपने पैरों को भारी महसूस होने दें।" } },
  { part: { en: "Belly", hi: "पेट" }, instruction: { en: "Breathe into your belly.", hi: "अपने पेट में गहरी सांस लें।" } },
  { part: { en: "Shoulders", hi: "कंधे" }, instruction: { en: "Drop your shoulders down.", hi: "अपने कंधों को नीचे गिराएं।" } },
  { part: { en: "Face & Jaw", hi: "चेहरा और जबड़ा" }, instruction: { en: "Unclench your jaw.", hi: "अपने जबड़े को ढीला करें।" } }
];

export default function BodyScan({ onBack }: { onBack?: () => void }) {
  const { language, t } = useLanguage(); // Get language from Context
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const speak = (text: string) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isFinished) {
      const step = bodyScanSteps[currentStep];
      // Speak the part and instruction in the correct language
      speak(`${step.part[language]}. ${step.instruction[language]}`);
    }
  }, [currentStep, language, isFinished]);

  return (
    <Card className="relative overflow-hidden border-none shadow-2xl bg-white/90 backdrop-blur-md">
      {/* Background Pulse Animation */}
      <div className="absolute inset-0 z-0 opacity-10 animate-pulse bg-primary rounded-full blur-3xl scale-150" />
      
      <CardHeader className="relative z-10 text-center pb-2">
        <div className="flex justify-between items-center px-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX className="text-slate-400" /> : <Volume2 className="text-primary" />}
          </Button>
          <CardTitle className="text-xl">{t.exercises.bodyScan.title}</CardTitle>
          <div className="w-10" />
        </div>
      </CardHeader>

      <CardContent className="relative z-10 text-center pb-10">
        {isFinished ? (
          <div className="py-8 animate-in zoom-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{language === 'hi' ? 'सत्र पूरा हुआ' : 'Session Complete'}</h2>
            <p className="text-muted-foreground mb-6">{language === 'hi' ? 'बहुत बढ़िया!' : 'Great job!'}</p>
            <Button onClick={onBack} className="w-full" size="lg">{t.dashboard.back}</Button>
          </div>
        ) : (
          <>
            <div className="h-40 flex flex-col justify-center mb-6">
              <h2 className="text-3xl font-bold text-primary mb-3 transition-all">
                {bodyScanSteps[currentStep].part[language]}
              </h2>
              <p className="text-lg italic text-slate-600">
                "{bodyScanSteps[currentStep].instruction[language]}"
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full py-8 text-lg shadow-lg" 
              onClick={() => currentStep < bodyScanSteps.length - 1 ? setCurrentStep(currentStep + 1) : setIsFinished(true)}
            >
              {currentStep === bodyScanSteps.length - 1 ? (language === 'hi' ? 'समाप्त' : 'Finish') : (language === 'hi' ? 'अगला' : 'Next')} 
              <ChevronRight className="ml-2" />
            </Button>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1 mt-6 rounded-full overflow-hidden">
               <div className="bg-primary h-full transition-all duration-500" style={{ width: `${((currentStep + 1) / bodyScanSteps.length) * 100}%` }} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}