-- Create mood_entries table
CREATE TABLE public.mood_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('great', 'good', 'okay', 'low', 'struggling')),
  energy INTEGER NOT NULL CHECK (energy >= 1 AND energy <= 10),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies for mood_entries
CREATE POLICY "Users can view their own mood entries"
ON public.mood_entries FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood entries"
ON public.mood_entries FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood entries"
ON public.mood_entries FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mood entries"
ON public.mood_entries FOR DELETE
USING (auth.uid() = user_id);

-- Create exercise_sessions table
CREATE TABLE public.exercise_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  exercise_type TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.exercise_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for exercise_sessions
CREATE POLICY "Users can view their own exercise sessions"
ON public.exercise_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exercise sessions"
ON public.exercise_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_mood_entries_user_date ON public.mood_entries(user_id, created_at DESC);
CREATE INDEX idx_exercise_sessions_user ON public.exercise_sessions(user_id, completed_at DESC);