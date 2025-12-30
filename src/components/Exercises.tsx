import { useState } from "react";
import { Wind, Brain, Anchor, Play, Pause, Clock } from "lucide-react";

const exercises = [
  { id: 1, category: "Panic Relief", title: "5-4-3-2-1 Grounding", duration: "2 min", description: "Engage 5 senses to stop a panic attack immediately.", color: "bg-blue-50 text-blue-600", icon: <Anchor className="w-6 h-6" /> },
  { id: 2, category: "Clinical Breathwork", title: "Box Breathing", duration: "4 min", description: "Standard technique to lower cortisol levels.", color: "bg-green-50 text-green-600", icon: <Wind className="w-6 h-6" /> },
  { id: 3, category: "CBT Therapy", title: "Cognitive Reframing", duration: "5 min", description: "Challenge negative thoughts with evidence.", color: "bg-purple-50 text-purple-600", icon: <Brain className="w-6 h-6" /> }
];

const Exercises = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-in fade-in">
      <h1 className="text-3xl font-bold text-gray-800">Clinical Tools</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {exercises.map((ex) => (
          <div key={ex.id} className="bg-white border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between mb-4">
              <div className={`p-3 rounded-xl ${ex.color}`}>{ex.icon}</div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{ex.category}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{ex.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{ex.description}</p>
            <button onClick={() => setActiveId(activeId === ex.id ? null : ex.id)} className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium flex items-center justify-center gap-2">
              {activeId === ex.id ? <><Pause className="w-4 h-4"/> Pause Session</> : <><Play className="w-4 h-4"/> Start Session</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Exercises;
