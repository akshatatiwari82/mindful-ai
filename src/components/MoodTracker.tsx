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
    { value: "great", label: "Great", icon: <Sun className="w-8 h-8" />, color: "bg-green-100 text-green-600 border-green-200" },
    { value: "good", label: "Good", icon: <Smile className="w-8 h-8" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
    { value: "okay", label: "Okay", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-100 text-blue-600 border-blue-200" },
    { value: "low", label: "Low", icon: <Meh className="w-8 h-8" />, color: "bg-amber-100 text-amber-600 border-amber-200" },
    { value: "struggling", label: "Struggling", icon: <Frown className="w-8 h-8" />, color: "bg-rose-100 text-rose-600 border-rose-200" },
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
    // Changed 'pt-24' to 'py-10' to fix the huge gap at the top
    <div className="max-w-3xl mx-auto p-4 space-y-8 py-10 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Daily Check-in</h1>
        <p className="text-gray-500">How are you feeling right now?</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-6">
        {/* Mood Selection */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500" /> Select Mood
        </h2>
        
        {/* Fixed grid columns to prevent shifting */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMood(option.value)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
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

        {/* Energy Slider */}
        <div className="mb-6">
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

        {/* Note Area */}
        <div className="mb-6">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)..."
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none resize-none bg-white"
            rows={3}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!selectedMood || isSaving}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
            !selectedMood || isSaving
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 shadow-lg"
          }`}
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Check-in"}
        </button>
      </div>

      {/* History List */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-500" /> Recent Entries
        </h3>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${['good', 'great'].includes(entry.mood) ? 'bg-green-400' : 'bg-orange-400'}`} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold capitalize text-gray-700">{entry.mood}</span>
                  <span className="text-xs text-gray-400">• {entry.date}</span>
                </div>
                {entry.note && <p className="text-xs text-gray-500 mt-1">{entry.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
