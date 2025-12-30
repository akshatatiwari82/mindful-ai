import { useState, useEffect } from "react";
import { Wind, Anchor, Brain, Play, Pause, Clock } from "lucide-react";

const Exercises = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  // --- LOGIC FOR BREATHING ANIMATION ---
  const [breathPhase, setBreathPhase] = useState("Ready");
  
  useEffect(() => {
    let interval: any;
    if (activeId === 1) { // If Box Breathing is active
      const phases = ["Inhale (4s)", "Hold (4s)", "Exhale (4s)", "Hold (4s)"];
      let i = 0;
      setBreathPhase(phases[0]);
      interval = setInterval(() => {
        i = (i + 1) % 4;
        setBreathPhase(phases[i]);
      }, 4000); // Change every 4 seconds
    } else {
      setBreathPhase("Ready");
    }
    return () => clearInterval(interval);
  }, [activeId]);

  // --- EXERCISE DATA ---
  const exercises = [
    {
      id: 1,
      title: "Box Breathing",
      category: "Anxiety Relief",
      duration: "4 min",
      description: "Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Proven to lower cortisol.",
      icon: <Wind className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-100",
      // THE WORKING PART
      content: (
        <div className="mt-4 p-6 bg-blue-100/50 rounded-xl text-center space-y-4 animate-in fade-in">
          <div className="text-2xl font-bold text-blue-800 transition-all duration-500 transform scale-105">
            {breathPhase}
          </div>
          <div className="text-xs text-blue-500 uppercase tracking-widest">Follow the text</div>
        </div>
      )
    },
    {
      id: 2,
      title: "5-4-3-2-1 Grounding",
      category: "Panic Attack",
      duration: "5 min",
      description: "Acknowledge 5 things you see, 4 you feel, 3 you hear...",
      icon: <Anchor className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-100",
      // THE WORKING PART
      content: (
        <div className="mt-4 space-y-2 animate-in fade-in">
          {["5 things you see", "4 things you feel", "3 things you hear", "2 things you smell", "1 thing you taste"].map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-100 shadow-sm">
              <input type="checkbox" className="w-5 h-5 accent-purple-600 cursor-pointer" />
              <span className="text-sm font-medium text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 3,
      title: "Cognitive Reframing",
      category: "CBT Therapy",
      duration: "10 min",
      description: "Identify a negative thought and challenge it with evidence.",
      icon: <Brain className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-100",
      // THE WORKING PART
      content: (
        <div className="mt-4 space-y-3 animate-in fade-in">
          <textarea placeholder="1. What is the negative thought?" className="w-full p-3 text-sm rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" rows={2} />
          <textarea placeholder="2. What is the evidence against it?" className="w-full p-3 text-sm rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" rows={2} />
          <button onClick={() => alert("Reframing Saved to Journal!")} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold transition-colors">
            Save Thought
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-in fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mental Exercises</h1>
        <p className="text-gray-500">Clinical tools for immediate relief</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {exercises.map((ex) => (
          <div key={ex.id} className={`p-6 rounded-2xl border ${ex.color} transition-all hover:shadow-md flex flex-col`}>
            {/* CARD HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">{ex.icon}</div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white px-2 py-1 rounded-lg">
                {ex.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">{ex.title}</h3>
            <p className="text-sm text-gray-600 mb-6">{ex.description}</p>
            
            {/* FOOTER BUTTONS */}
            <div className="flex items-center justify-between mt-auto">
              <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                <Clock className="w-3 h-3" /> {ex.duration}
              </span>
              <button
                onClick={() => setActiveId(activeId === ex.id ? null : ex.id)}
                className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 transition-colors ${
                  activeId === ex.id 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                {activeId === ex.id ? <><Pause className="w-4 h-4"/> End Session</> : <><Play className="w-4 h-4"/> Start</>}
              </button>
            </div>

            {/* DYNAMIC CONTENT AREA (Shows when 'Start' is clicked) */}
            {activeId === ex.id && (
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                {ex.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
