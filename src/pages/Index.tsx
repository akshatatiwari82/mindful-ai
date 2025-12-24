import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MindfulAI - Early Mental Health Detection & AI Support</title>
        <meta name="description" content="Experience early mental health detection with AI that truly listens. Track your emotions, practice self-care, and find support with end-to-end encryption." />
      </Helmet>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Navigation />
        <HeroSection />
      </div>
    </>
  );
};

export default Index;
