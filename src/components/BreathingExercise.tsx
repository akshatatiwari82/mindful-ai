import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useLanguage } from "../LanguageContext"; // Ensure this path is correct

export default function BreathingExercise() {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(4);
  const [phase, setPhase] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold

  // Dynamic labels from context
  const labels = [
    t.exercises.boxBreathing.phases.inhale,
    t.exercises.boxBreathing.phases.hold,
    t.exercises.boxBreathing.phases.exhale,
    t.exercises.boxBreathing.phases.hold
  ];

  useEffect(() => {
    let timer: any;
    if (isActive) {
      timer = setInterval(() => {
        setCount((prev) => {
          if (prev === 1) {
            // When count hits 1, next tick resets count and changes phase
            setPhase((p) => (p + 1) % 4);
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const reset = () => {
    setIsActive(false);
    setCount(4);
    setPhase(0);
  };

  return (
    <div className="text-center py-10">
      {/* Visual Circle */}
      <div className="relative w-64 h-64 mx-auto flex items-center justify-center mb-8">
        {/* Outer Ring */}
        <div className={`absolute inset-0 rounded-full border-4 border-primary/20 transition-all duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`} />
        
        {/* Animated Inner Circle */}
        <div 
          className={`w-56 h-56 rounded-full bg-primary/10 flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out
          ${isActive && phase === 0 ? 'scale-110 bg-primary/20' : ''} 
          ${isActive && phase === 2 ? 'scale-75 bg-primary/5' : ''}
          ${!isActive ? 'scale-100' : ''}
          `}
        >
          <span className="text-6xl font-bold text-primary font-display">{count}</span>
          <span className="text-lg font-medium text-muted-foreground mt-2 uppercase tracking-widest">
            {labels[phase]}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => setIsActive(!isActive)} 
          variant="hero" 
          size="lg"
          className="w-32"
        >
          {isActive ? <Pause className="mr-2 w-5 h-5" /> : <Play className="mr-2 w-5 h-5" />}
          {isActive ? "Pause" : (t.dashboard.startBtn || "Start")}
        </Button>
        
        <Button variant="outline" size="lg" onClick={reset}>
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>
    </div>
  );
}