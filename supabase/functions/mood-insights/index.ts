import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get user's mood entries from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: moodEntries, error: moodError } = await supabase
      .from("mood_entries")
      .select("*")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false });

    if (moodError) {
      console.error("Error fetching mood entries:", moodError);
      throw new Error("Failed to fetch mood data");
    }

    if (!moodEntries || moodEntries.length === 0) {
      return new Response(
        JSON.stringify({
          insights: [
            {
              type: "info",
              title: "Start tracking",
              message: "Log your first mood entry to get personalized insights!",
            },
          ],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call AI for insights
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const moodSummary = moodEntries.map((e) => ({
      date: e.created_at,
      mood: e.mood,
      energy: e.energy,
      note: e.note || "",
    }));

    console.log("Generating insights for", moodEntries.length, "mood entries");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a mental health AI analyst. Analyze mood tracking data and provide 2-3 actionable, supportive insights. Format as JSON array with objects containing: type (pattern/suggestion/encouragement), title (short), message (1-2 sentences). Be warm, encouraging, and evidence-based. Focus on patterns and gentle suggestions.`,
          },
          {
            role: "user",
            content: `Analyze this mood data from the last 30 days and provide insights:\n${JSON.stringify(moodSummary, null, 2)}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errorText);
      
      // Return default insights on error
      return new Response(
        JSON.stringify({
          insights: [
            {
              type: "pattern",
              title: "Tracking progress",
              message: `You've logged ${moodEntries.length} entries. Keep it up!`,
            },
          ],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "[]";
    
    // Parse JSON from AI response
    let insights;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      insights = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      console.error("Failed to parse AI insights:", content);
      insights = [
        {
          type: "pattern",
          title: "Data analyzed",
          message: `Based on ${moodEntries.length} entries, you're making progress in understanding your emotional patterns.`,
        },
      ];
    }

    return new Response(
      JSON.stringify({ insights }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Mood insights error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
