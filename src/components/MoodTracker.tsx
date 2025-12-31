import { useState } from "react";
import { 
  Calendar, 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  Zap, 
  Cloud, 
  Sun, 
  Loader2
} from "lucide-react";

const MoodTracker = () => {
  // State Management
  const [selectedMood, setSelectedMood] = useState(null);
  const [energy, setEnergy] = useState(5);
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock Data (Local state only)
  const [entries, setEntries] = useState([
    { id: 1, mood: "good", energy: 7, note: "Feeling optimistic!", date: "Just now" }
  ]);

  const moodOptions = [
    { value: "great", label: "Great", icon: <Sun className="w-8 h-8" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200 ring-emerald-500" },
    { value: "good", label: "Good", icon: <Smile className="w-8 h-8" />, color: "bg-teal-100 text-teal-600 border-teal-200 ring-teal-500" },
    { value: "okay", label: "Okay", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-100 text-blue-600 border-blue-200 ring-blue-500" },
    { value: "low", label: "Low", icon: <Meh className="w-8 h-8" />, color: "bg-orange-100 text-orange-600 border-orange-200 ring-orange-500" },
    { value: "struggling", label: "Struggling", icon: <Frown className="w-8 h-8" />, color: "bg-red-100 text-red-600 border-red-200 ring-red-500" },
  ];

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate a network delay for better UX
    setTimeout(() => {
      try {
        // Update local UI state directly
        setEntries([
          { 
            id: Date.now(), 
            mood: selectedMood || "okay", 
            energy, 
            note, 
            date: new Date().toLocaleTimeString() 
          }, 
          ...entries
        ]);

        // Reset Form
        setSelectedMood(null);
        setNote("");
        setEnergy(5);
        alert("Mood saved successfully!");

      } catch (error) {
        console.error("Error saving mood:", error);
        alert("Failed to save entry.");
      } finally {
        setIsSaving(false);
      }
    }, 600); 
  };

  return (
    // Used py-12 to give it space from your Navbar, similar to the Home page spacing
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 animate-in fade-in duration-500">
      
      {/* HEADER SECTION - Matches Home Page Typography */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Daily Check-in
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Track your emotions, practice self-care, and find support in one safe space.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8">
        {/* Mood Selection */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-500 fill-emerald-500" /> Select Mood
        </h2>
        
        <div className="grid grid-cols-5 gap-4 mb-8">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMood(option.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 group ${
                selectedMood === option.value
                  ? `${option.color} border-current shadow-lg scale-105`
                  : "bg-gray-50 border-transparent hover:bg-gray-100 hover:scale-105"
              }`}
            >
              <div className={`transition-transform duration-200 ${selectedMood === option.value ? 'scale-110' : 'group-hover:scale-110'}`}>
                {option.icon}
              </div>
              <span className="text-sm font-semibold mt-3 hidden sm:block">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Energy Slider - Updated to Green Theme */}
        <div className="mb-8">
          <label className="flex justify-between text-base font-semibold text-gray-700 mb-4">
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500"/> Energy Level
            </span>
            <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{energy}/10</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-700"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
            <span>Low Energy</span>
            <span>High Energy</span>
          </div>
        </div>

        {/* Note Area */}
        <div className="mb-8">
          <label className="block text-base font-semibold text-gray-700 mb-3">Add a Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How are you feeling today?"
            className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none bg-gray-50 text-gray-700 placeholder-gray-400 transition-all"
            rows={4}
          />
        </div>

        {/* Save Button - Updated to MindfulAI Green */}
        <button
          onClick={handleSave}
          disabled={!selectedMood || isSaving}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform flex items-center justify-center gap-2 ${
            !selectedMood || isSaving
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5"
          }`}
        >
          {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : "Save Daily Check-in"}
        </button>
      </div>

      {/* History List */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-emerald-600" /> Recent Entries
        </h3>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald-100 transition-colors">
              <div className={`w-4 h-4 rounded-full flex-shrink-0 shadow-sm ${['good', 'great'].includes(entry.mood) ? 'bg-emerald-400' : 'bg-orange-400'}`} />
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold capitalize text-gray-800">{entry.mood}</span>
                  <span className="text-sm text-gray-400">• {entry.date}</span>
                </div>
                {entry.note && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{entry.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
