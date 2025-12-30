import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TrendingUp, Calendar, Smile, Meh, Frown, Heart, Zap, Cloud, Sun, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

const moodOptions: { value: Mood; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "great", label: "Great", icon: <Sun className="w-6 h-6" />, color: "bg-green-100 text-green-600 border-green-200" },
  { value: "good", label: "Good", icon: <Smile className="w-6 h-6" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { value: "okay", label: "Okay", icon: <Cloud className="w-6 h-6" />, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { value: "low", label: "Low", icon: <Meh className="w-6 h-6" />, color: "bg-amber-100 text-amber-600 border-amber-200" },
  { value: "struggling", label: "Struggling", icon: <Frown className="w-6 h-6" />, color: "bg-rose-100 text-rose-600 border-rose-200" },
];

const MoodTracker = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const [energy, setEnergy] = useState(5);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchEntries();
      fetchInsights();
    }
  }, [user]);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;
      setEntries((data as MoodEntry[]) || []);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInsights = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("mood-insights");
      if (error) throw error;
      setInsights(data?.insights || []);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const handleSaveMood = async () => {
    if (!selectedMood || !user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase.from("mood_entries").insert({
        user_id: user.id,
        mood: selectedMood,
        energy,
        note: note || null,
      });

      if (error) throw error;

      toast({
        title: "Mood logged!",
        description: "Your check-in has been saved.",
      });

      setSelectedMood(null);
      setNote("");
      setEnergy(5);
      fetchEntries();
      fetchInsights();
    } catch (error) {
      console.error("Error saving mood:", error);
      toast({
        title: "Error",
        description: "Failed to save your mood entry.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getMoodColor = (mood: Mood) => {
    const option = moodOptions.find((m) => m.value === mood);
    return option?.color || "";
  };

  const getWeekEntries = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1);

    return days.map((day, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toDateString();
      
      const entry = entries.find((e) => {
        const entryDate = new Date(e.created_at);
        return entryDate.toDateString() === dateStr;
      });

      return { day, entry };
    });
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          How are you feeling?
        </h1>
        <p className="text-muted-foreground">
          Track your emotional journey • AI-powered insights
        </p>
      </div>

      {/* Mood Selection */}
      <Card className="glass-card p-6 rounded-2xl">
        <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Select Your Mood
        </h2>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMood(option.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedMood === option.value
                  ? `${option.color} border-current shadow-soft`
                  : "bg-background border-border hover:border-primary/30"
              }`}
            >
              {option.icon}
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Energy Level */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <Zap className="w-4 h-4 text-accent" />
            Energy Level: {energy}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Note */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Add a note (optional)</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's contributing to how you feel today?"
            className="resize-none"
            rows={3}
          />
        </div>

        <Button
          onClick={handleSaveMood}
          disabled={!selectedMood || isSaving}
          variant="hero"
          className="w-full"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Today's Check-in"}
        </Button>
      </Card>

      {/* Weekly Overview */}
      <Card className="glass-card p-6 rounded-2xl">
        <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Your Week at a Glance
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2 mb-4">
            {getWeekEntries().map(({ day, entry }) => (
              <div key={day} className="text-center">
                <span className="text-xs text-muted-foreground">{day}</span>
                <div
                  className={`mt-2 p-3 rounded-xl ${
                    entry ? getMoodColor(entry.mood as Mood) : "bg-muted/50"
                  }`}
                >
                  {entry ? (
                    moodOptions.find((m) => m.value === entry.mood)?.icon
                  ) : (
                    <div className="w-6 h-6 mx-auto opacity-30">—</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* AI Insights */}
      <Card className="glass-card p-6 rounded-2xl">
        <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          AI Insights
        </h2>
        <div className="space-y-4">
          {insights.length > 0 ? (
            insights.map((insight, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  insight.type === "pattern"
                    ? "bg-primary/5 border-primary/10"
                    : insight.type === "suggestion"
                    ? "bg-accent/5 border-accent/10"
                    : "bg-secondary/50 border-border"
                }`}
              >
                <p className="text-sm text-foreground">
                  <strong>{insight.title}:</strong> {insight.message}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 bg-muted/50 rounded-xl text-center text-muted-foreground">
              Log your moods to unlock personalized AI insights!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MoodTracker;
