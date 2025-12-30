import Navigation from "@/components/Navigation";
import MoodTracker from "@/components/MoodTracker";
import { Helmet } from "react-helmet-async";

const Mood = () => {
  return (
    <>
      <Helmet>
        <title>Mood & Mental Health Tracker | MindfulAI</title>
        <meta name="description" content="Track your daily mood and mental health patterns. Get AI-powered insights using Azure Cognitive Services to understand your emotional journey." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <MoodTracker />
        </main>
      </div>
    </>
  );
};

export default Mood;
