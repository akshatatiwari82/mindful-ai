import Navigation from "@/components/Navigation";
import EmergencyHelp from "@/components/EmergencyHelp";
import { Helmet } from "react-helmet-async";

const Emergency = () => {
  return (
    <>
      <Helmet>
        <title>Emergency Mental Health Help | MindfulAI</title>
        <meta name="description" content="Get immediate mental health support. Access crisis hotlines, text support, and emergency resources. You're not alone." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <EmergencyHelp />
        </main>
      </div>
    </>
  );
};

export default Emergency;
