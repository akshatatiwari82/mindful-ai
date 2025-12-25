import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Uncomment if using login redirect
import { TrendingUp, Calendar, Smile, Meh, Frown, Heart, Zap, Cloud, Sun, Loader2 } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth"; // Commented out to prevent crash
// import { supabase } from "@/integrations/supabase/client"; // Commented out to prevent crash

// --- TYPES ---
type Mood = "great" | "good" | "okay" | "low" | "struggling";

interface MoodEntry {
  id: string;
  mood: Mood;
  note: string | null;
  energy: number;
  created_at: string;
}

interface Insight {
  type: string;
  title: string;
  message: string;
}

const moodOptions = [
  { value: "great", label: "Great", icon: <Sun className="w-8 h-8" />, color: "bg-green-100 text-green-600 border-green-200" },
  { value: "good", label: "Good", icon: <Smile className="w-8 h-8" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { value: "okay", label: "Okay", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { value: "low", label: "Low", icon: <Meh className="w-8 h-8" />, color: "bg-amber-100 text-amber-600 border-amber-200" },
  { value: "struggling", label: "Struggling", icon: <Frown className="w-8 h-8" />, color: "bg-rose-100 text-rose-600 border-rose-200" },
];

const MoodTracker = () => {
  // const { user, loading: authLoading } = useAuth(); // Commented out to prevent crash
  // const navigate = useNavigate();

  // --- STATE ---
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const [energy, setEnergy] = useState(5);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- INITIAL LOAD (Simulated) ---
  useEffect(() => {
    // Simulate fetching data so screen isn't empty
    setIsLoading(true);
    setTimeout(() => {
        setEntries([
            { id: "1", mood: "good", note: "Code is finally working!", energy: 8, created_at: new Date().toDateString() }
        ]);
        setIsLoading(false);
    }, 1000);
  }, []);

  // --- HANDLERS ---
  const handleSaveMood = async () => {
    if (!selectedMood) return;
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create Entry Locally
    const newEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: selectedMood as Mood,
        note: note,
        energy: energy,
        created_at: new Date().toDateString(),
    };

    setEntries([newEntry, ...entries]); // Update UI immediately
    generateInsight(selectedMood); // Generate local insight
    
    // Reset Form
    setSelectedMood(null);
    setNote("");
    setEnergy(5);
    setIsSaving(false);
    
    alert("Mood logged! (This is running in Offline Mode)");
  };

  const generateInsight = (mood: Mood) => {
    let message = "";
    if (mood === "low" || mood === "struggling") message = "It seems tough right now. Try the Breathing Exercise in the Exercises tab.";
    else if (mood === "great") message = "Awesome! Hold onto this feeling.";
    else message = "Stay balanced and keep tracking.";
    
    setInsights([{ type: "suggestion", title: "New Insight", message }]);
  };

  // --- UI RENDER (Using standard HTML div/button instead of Card/Button) ---
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          How are you feeling?
        </h1>
        <p className="text-gray-500">
          Track your emotional journey • AI-powered insights
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        
        {/* MOOD SELECTION */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500" />
          Select Your Mood
        </h2>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMood(option.value as Mood)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                selectedMood === option.value
                  ? `${option.color} border-current shadow-md`
                  : "bg-white border-gray-200 hover:border-purple-200"
              }`}
            >
              {option.icon}
              <span className="text-xs font-medium hidden sm:block">{option.label}</span>
            </button>
          ))}
        </div>

        {/* ENERGY LEVEL */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
            <Zap className="w-4 h-4 text-yellow-500" />
            Energy Level: {energy}/10
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

        {/* NOTE INPUT */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Add a note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's contributing to how you feel today?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            rows={3}
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSaveMood}
          disabled={!selectedMood || isSaving}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
            !selectedMood || isSaving
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 shadow-lg"
          }`}
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Today's Check-in"}
        </button>
      </div>

      {/* WEEKLY & INSIGHTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* RECENT ENTRIES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" /> Recent Entries
            </h2>
            {isLoading ? (
                <div className="flex justify-center py-4"><Loader2 className="animate-spin text-purple-500"/></div>
            ) : (
                <div className="space-y-3">
                    {entries.map((entry) => (
                        <div key={entry.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className={`w-3 h-3 rounded-full ${entry.mood === 'good' || entry.mood === 'great' ? 'bg-green-400' : 'bg-red-400'}`} />
                            <div>
                                <p className="text-sm font-medium capitalize">{entry.mood}</p>
                                <p className="text-xs text-gray-400">{entry.created_at}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* AI INSIGHTS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" /> AI Insights
            </h2>
            {insights.length > 0 ? (
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                    <p className="text-purple-800 font-medium text-sm">
                        {insights[0].message}
                    </p>
                </div>
            ) : (
                <div className="text-center text-gray-400 py-8 bg-gray-50 rounded-xl border border-dashed">
                    Log a mood to see insights
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
