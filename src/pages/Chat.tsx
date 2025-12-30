import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import { Helmet } from "react-helmet-async";

const Chat = () => {
  return (
    <>
      <Helmet>
        {/* I updated the title to match your University App goal */}
        <title>Mindful AI</title>
        <meta name="description" content="Powered by Azure OpenAI." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-8">
          {/* This component will handle all the logic inside */}
          <ChatInterface />
        </main>
      </div>
    </>
  );
};

export default Chat;
