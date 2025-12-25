import { useState } from "react";
import { Wind, Brain, Anchor, Play, Pause, Clock } from "lucide-react";

const exercises = [
  {
    id: 1,
    category: "Somatic",
    title: "5-4-3-2-1 Grounding",
    duration: "2 min",
    description: "A powerful technique to stop panic attacks by engaging your five senses.",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    icon: <Anchor className="w-6 h-6" />
  },
  {
    id: 2,
    category: "Breathing",
    title: "Box Breathing",
    duration: "4 min",
    description: "Inhale (4s), Hold (4s), Exhale (4s), Hold (4s). Used to reset the nervous system.",
    color: "bg-green-50 text-green-600 border-green-200",
    icon: <Wind className="w-6 h-6" />
  },
  {
    id: 3,
    category: "CBT",
    title: "Thought Challenge",
    duration: "5 min",
    description: "Identify a negative thought and write down three facts that prove it wrong.",
    color: "bg-purple-50 text-purple-600 border-purple-200",
    icon: <Brain className="w-6 h-6" />
  }
];

const Exercises = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Psychological Tools</h1>
        <p className="text-gray-500 mt-2">Clinical techniques to regulate your nervous system.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${exercise.color}`}>{exercise.icon}</div>
              <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{exercise.category}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.title}</h3>
            <p className="text-sm text-gray-500 mb-6">{exercise.description}</p>

            <button 
              onClick={() => setActiveId(activeId === exercise.id ? null : exercise.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold w-full justify-center transition-colors ${
                activeId === exercise.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {activeId === exercise.id ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
