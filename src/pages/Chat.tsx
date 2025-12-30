import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import { Helmet } from "react-helmet-async";

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>AI Emotional Support | MindfulAI</title>
      </Helmet>
      
      {/* Background matches your home page */}
      <div className="min-h-screen bg-gradient-to-b from-teal-50/50 via-white to-white font-sans selection:bg-teal-100">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-8">
          <ChatInterface />
        </main>
      </div>
    </>
  );
};

export default Chat;
