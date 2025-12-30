import { useState } from "react";
import { Heart, Zap, Calendar, Smile, Meh, Frown, Cloud, Sun, Save } from "lucide-react";

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [energy, setEnergy] = useState(5);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([
    { id: 1, mood: "good", energy: 8, note: "Had a productive day!", date: "Today, 10:00 AM" }
  ]);

  const moodOptions = [
    { value: "great", label: "Great", icon: <Sun className="w-8 h-8" />, color: "bg-green-100 text-green-600 border-green-200" },
    { value: "good", label: "Good", icon: <Smile className="w-8 h-8" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
    { value: "okay", label: "Okay", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-100 text-blue-600 border-blue-200" },
    { value: "low", label: "Low", icon: <Meh className="w-8 h-8" />, color: "bg-amber-100 text-amber-600 border-amber-200" },
    { value: "struggling", label: "Struggling", icon: <Frown className="w-8 h-8" />, color: "bg-rose-100 text-rose-600 border-rose-200" },
  ];

  const handleSave = () => {
    if (!selectedMood) return;
    const newEntry = {
      id: Date.now(),
      mood: selectedMood,
      energy,
      note,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setEntries([newEntry, ...entries]);
    setSelectedMood(null);
    setNote("");
    alert("Mood Logged!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 animate-in fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Daily Check-in</h1>
        <p className="text-gray-500">Track your mood and energy levels</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        {/* Mood Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-500" /> How are you feeling?
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                  selectedMood === option.value ? `${option.color} border-current scale-105` : "border-transparent hover:bg-gray-50"
                }`}
              >
                {option.icon}
                <span className="text-xs font-medium mt-1 hidden sm:block">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy/Work Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" /> Energy & Work Capacity
          </h2>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Low Energy</span>
            <span className="font-bold text-purple-600">{energy}/10</span>
            <span>High Energy</span>
          </div>
        </div>

        {/* Note Section */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional: What's on your mind?"
          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={3}
        />

        <button
          onClick={handleSave}
          disabled={!selectedMood}
          className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Entry
        </button>
      </div>

      {/* History */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-700 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Recent History
        </h3>
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${['good','great'].includes(entry.mood) ? 'bg-green-500' : 'bg-orange-500'}`} />
              <div>
                <p className="font-medium capitalize text-gray-800">{entry.mood}</p>
                <p className="text-xs text-gray-400">{entry.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <Zap className="w-3 h-3 text-yellow-600" /> Energy: {entry.energy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mood;
