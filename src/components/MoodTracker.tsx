import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Uncomment if you have routing set up
import { TrendingUp, Calendar, Smile, Meh, Frown, Heart, Zap, Cloud, Sun, Loader2 } from "lucide-react";

// --- TYPES ---
type Mood = "great" | "good" | "okay" | "low" | "struggling";

interface MoodEntry {
  id: string;
  mood: Mood;
  note: string | null;
  energy: number;
  created_at: string;
}

// --- CONFIG ---
const moodOptions = [
  { value: "great", label: "Great", icon: <Sun className="w-8 h-8" />, color: "bg-green-100 text-green-600 border-green-200" },
  { value: "good", label: "Good", icon: <Smile className="w-8 h-8" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { value: "okay", label: "Okay", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { value: "low", label: "Low", icon: <Meh className="w-8 h-8" />, color: "bg-amber-100 text-amber-600 border-amber-200" },
  { value: "struggling", label: "Struggling", icon: <Frown className="w-8 h-8" />, color: "bg-rose-100 text-rose-600 border-rose-200" },
];

const MoodTracker = () => {
  // const navigate = useNavigate(); // Uncomment if using router

  // --- STATE ---
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [energy, setEnergy] = useState(5);
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [insightMessage, setInsightMessage] = useState("Log your mood to see insights!");

  // --- HANDLERS ---
  const handleSaveMood = async () => {
    if (!selectedMood) return;
    setIsSaving(true);

    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create a new entry object
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood as Mood,
      note: note,
      energy: energy,
      created_at: new Date().toLocaleTimeString(),
    };

    // Update local list of entries (Latest first)
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    
    // Generate an "AI Insight" based on the new mood
    generateInsight(selectedMood);

    // Reset Form
    setSelectedMood(null);
    setNote("");
    setEnergy(5);
    setIsSaving(false);
    
    alert("Mood Logged Successfully!");
  };

  const generateInsight = (mood: Mood) => {
    if (mood === "low" || mood === "struggling") {
      setInsightMessage("💙 It looks like you're having a tough time. Try the 'Box Breathing' exercise in the Exercises tab.");
    } else if (mood === "great" || mood === "good") {
      setInsightMessage("🌟 You're doing great! Use this energy to tackle a difficult task or help a friend.");
    } else {
      setInsightMessage("🌱 You are balanced. A short walk might be a nice way to stay grounded.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Mood Tracker</h1>
        <p className="text-gray-500">How are you feeling right now?</p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* SECTION 1: MOOD SELECTOR */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" /> Select Mood
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value as Mood)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                  selectedMood === option.value
                    ? `${option.color} border-current scale-105 shadow-md`
                    : "bg-gray-50 border-transparent hover:bg-gray-100"
                }`}
              >
                {option.icon}
                <span className="text-xs font-medium mt-1 hidden sm:block">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: SLIDER & NOTES */}
        <div className="p-6 space-y-6 bg-gray-50/50">
          
          {/* Energy Slider */}
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> Energy Level</span>
              <span className="text-gray-400">{energy}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Journaling Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Journal Note (Optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why do you feel this way? (e.g., 'Had a great lunch', 'Stressed about exams')"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none bg-white"
              rows={3}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveMood}
            disabled={!selectedMood || isSaving}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
              !selectedMood || isSaving
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/20"
            }`}
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Check-in"}
          </button>
        </div>
      </div>

      {/* INSIGHTS & HISTORY SECTION */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* AI Insight Card */}
        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100 shadow-sm">
          <h3 className="font-semibold text-purple-900 flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" /> AI Insight
          </h3>
          <p className="text-purple-700 text-sm leading-relaxed">
            {insightMessage}
          </p>
        </div>

        {/* Recent History List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-500" /> Recent Entries
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {entries.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No entries yet.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    entry.mood === 'great' || entry.mood === 'good' ? 'bg-green-400' :
                    entry.mood === 'okay' ? 'bg-blue-400' : 'bg-red-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize text-gray-700">{entry.mood}</span>
                      <span className="text-xs text-gray-400">{entry.created_at}</span>
                    </div>
                    {entry.note && <p className="text-xs text-gray-500 truncate max-w-[200px]">{entry.note}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MoodTracker;
