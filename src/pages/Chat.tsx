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
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <ChatInterface />
        </main>
      </div>
    </>
  );
};

export default Chat;
