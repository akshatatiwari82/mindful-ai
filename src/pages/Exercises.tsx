import { useState } from "react";
import { Wind, Anchor, Brain, Play, Pause, Clock } from "lucide-react";

const Exercises = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const exercises = [
    {
      id: 1,
      title: "Box Breathing",
      category: "Anxiety Relief",
      duration: "4 min",
      description: "Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Proven to lower cortisol.",
      icon: <Wind className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-100"
    },
    {
      id: 2,
      title: "5-4-3-2-1 Grounding",
      category: "Panic Attack",
      duration: "5 min",
      description: "Acknowledge 5 things you see, 4 you feel, 3 you hear...",
      icon: <Anchor className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-100"
    },
    {
      id: 3,
      title: "Cognitive Reframing",
      category: "CBT Therapy",
      duration: "10 min",
      description: "Identify a negative thought and challenge it with evidence.",
      icon: <Brain className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-100"
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
          <div key={ex.id} className={`p-6 rounded-2xl border ${ex.color} transition-all hover:shadow-md`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">{ex.icon}</div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white px-2 py-1 rounded-lg">
                {ex.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">{ex.title}</h3>
            <p className="text-sm text-gray-600 mb-6">{ex.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                <Clock className="w-3 h-3" /> {ex.duration}
              </span>
              <button
                onClick={() => setActiveId(activeId === ex.id ? null : ex.id)}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-black transition-colors"
              >
                {activeId === ex.id ? <><Pause className="w-4 h-4"/> Pause</> : <><Play className="w-4 h-4"/> Start</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
