import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Activity, Shield, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen gradient-hero flex items-center pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span>Your privacy is our priority • End-to-End Encrypted</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your Mental Health,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Understood
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Experience early mental health detection with AI that truly listens. 
            Track your emotions, practice self-care, and find support — all in one safe space.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/chat">
              <Button variant="hero" size="xl">
                <MessageCircle className="w-5 h-5" />
                Start Talking to AI
              </Button>
            </Link>
            <Link to="/mood">
              <Button variant="glass" size="xl">
                <Activity className="w-5 h-5" />
                Track My Mood
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="AI Emotional Support"
              description="Powered by Microsoft Azure AI for empathetic, understanding conversations"
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6" />}
              title="Mood Analytics"
              description="Track patterns and get insights using Azure Cognitive Services"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Guided Exercises"
              description="Breathing, meditation, and mindfulness practices for daily wellness"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="glass-card rounded-2xl p-6 text-left hover:shadow-card transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 rounded-xl gradient-calm flex items-center justify-center text-primary-foreground mb-4">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default HeroSection;
