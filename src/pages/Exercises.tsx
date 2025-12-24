import Navigation from "@/components/Navigation";
import ExercisesSection from "@/components/ExercisesSection";
import { Helmet } from "react-helmet-async";

const Exercises = () => {
  return (
    <>
      <Helmet>
        <title>Self-Care Exercises & Mindfulness | MindfulAI</title>
        <meta name="description" content="Practice breathing exercises, meditation, and grounding techniques. Build daily mindfulness habits for better mental wellness." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <ExercisesSection />
        </main>
      </div>
    </>
  );
};

export default Exercises;
