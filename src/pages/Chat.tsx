import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import { Helmet } from "react-helmet-async";

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>AI Emotional Support Chat | MindfulAI</title>
        <meta name="description" content="Talk to our AI emotional support chatbot. Private, encrypted conversations powered by Azure OpenAI for empathetic mental health support." />
      </Helmet>
      {/* THIS IS THE KEY CHANGE: Using the same background gradient class as the Home page */}
      <div className="min-h-screen bg-gradient-to-b from-teal-50/50 via-white to-white font-sans selection:bg-teal-100">
        <Navigation />
        {/* Increased padding-top to pt-32 to match home page spacing */}
        <main className="container mx-auto px-4 pt-32 pb-8">
          <ChatInterface />
        </main>
      </div>
    </>
  );
};

export default Chat;
