import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import { Helmet } from "react-helmet-async";

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>AI Emotional Support | MindfulAI</title>
        <meta 
          name="description" 
          content="Private, encrypted conversations powered by Azure OpenAI." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-8">
          {/* All the complex code (inputs, buttons, messages) is inside this component */}
          <ChatInterface />
        </main>
      </div>
    </>
  );
};

export default Chat;
