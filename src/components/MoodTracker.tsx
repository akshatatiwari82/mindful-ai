import React, { useState } from "react";
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

// Define the shape of a single Mood Entry
interface MoodEntry {
  id: number;
  mood: string;
  energy: number;
  note: string;
  date: string;
}

// Define the shape of the Mood Options for cleaner mapping
interface MoodOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const MoodTracker: React.FC = () => {
  // State Management
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [energy, setEnergy] = useState<number>(5);
  const [note, setNote] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // Mock Data (Typed as an array of MoodEntry)
  const [entries, setEntries] = useState<MoodEntry[]>([
    { id: 1, mood: "good", energy: 7, note: "Feeling optimistic!", date: "Just now" }
  ]);

  const moodOptions: MoodOption[] = [
    { value: "great", label: "Great", icon: <Sun className="w-8 h-8" />, color: "bg-teal-100 text-teal-700 border-teal-200" },
    { value: "good", label: "Good", icon: <Smile className="w-8 h-8" />, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { value: "okay", label: "Okay", icon: <Cloud className="w-8 h-8" />, color: "bg-blue-100 text-blue-700 border-blue-200" },
    { value: "low", label: "Low", icon: <Meh className="w-8 h-8" />, color: "bg-orange-100 text-orange-700 border-orange-200" },
    { value: "struggling", label: "Struggling", icon: <Frown className="w-8 h-8" />, color: "bg-red-100 text-red-700 border-red-200" },
  ];

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate a network delay for better UX
    setTimeout(() => {
      try {
        const newEntry: MoodEntry = {
          id: Date.now(),
          mood: selectedMood || "okay",
          energy,
          note,
          date: new Date().toLocaleTimeString(),
        };

        setEntries([newEntry, ...entries]);

        // Reset Form
        setSelectedMood(null);
        setNote("");
        setEnergy(5);
        alert("Mood saved successfully!");

      } catch (error) {
        console.error("Error saving mood:", error);
      } finally {
        setIsSaving(false);
      }
    }, 600); 
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Daily Check-in
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Track your emotions and patterns in a safe, private space.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-6 md:p-8">
        
        {/* Mood Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-teal-600 fill-teal-600" /> Select Mood
          </h2>
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMood === option.value
                    ? `${option.color} border-current shadow-md scale-105`
                    : "bg-gray-50 border-transparent hover:bg-gray-100 hover:scale-105"
                }`}
              >
                <div className="transform transition-transform">
                  {option.icon}
                </div>
                <span className="text-xs sm:text-sm font-bold mt-2">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Slider */}
        <div className="mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <label className="flex justify-between text-base font-bold text-gray-800 mb-4">
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500"/> Energy Level
            </span>
            <span className="text-teal-700 bg-white px-3 py-1 rounded-full border border-teal-100 shadow-sm">
              {energy}/10
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnergy(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-teal-600 hover:accent-teal-700"
          />
          <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2">
            <span>Low Energy</span>
            <span>High Energy</span>
          </div>
        </div>

        {/* Note Area */}
        <div className="mb-8">
          <label className="block text-base font-bold text-gray-800 mb-3">
            Add a Note <span className="text-gray-400 font-normal text-sm">(Optional)</span>
          </label>
          <textarea
            value={note}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none bg-gray-50 text-gray-700 placeholder-gray-400"
            rows={3}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!selectedMood || isSaving}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform flex items-center justify-center gap-2 ${
            !selectedMood || isSaving
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-teal-200 hover:-translate-y-0.5"
          }`}
        >
          {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : "Save Daily Check-in"}
        </button>
      </div>

      {/* History List */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-teal-600" /> Recent Entries
        </h3>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-100 transition-colors">
              <div className={`w-4 h-4 mt-1 sm:mt-0 rounded-full flex-shrink-0 ${['good', 'great'].includes(entry.mood) ? 'bg-emerald-400' : 'bg-orange-400'}`} />
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-base font-bold capitalize text-gray-800">{entry.mood}</span>
                  <span className="text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100">{entry.date}</span>
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
