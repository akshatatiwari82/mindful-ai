import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation"; // Ensure this path is correct
import { Button } from "@/components/ui/button"; // Ensure shadcn button is installed
import { Card } from "@/components/ui/card"; // Ensure shadcn card is installed
import { Send, User, Bot, Loader2, Shield } from "lucide-react";

// Backend URL (Make sure your .env has VITE_SUPABASE_URL)
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface Message {
  role: 'user' | 'assistant'; // Changed 'ai' to 'assistant' to match Azure standards
  content: string;
}

const Chat = () => {
  // --- STATE MANAGEMENT ---
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Saarthi. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- HANDLER FUNCTIONS ---
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send to your Supabase/Azure Backend
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to connect");

      // Handle Streaming Response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      
      // Temporary placeholder for streaming message
      setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // Note: You might need deeper parsing logic here depending on your exact backend format
          // This assumes the backend sends raw text chunks or simple data
          assistantContent += chunk;
          
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].content = assistantContent; // Update last message
            return newMsgs;
          });
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. HELMET / SEO SECTION (From Code 1) */}
      <Helmet>
        <title>Saarthi AI | Renaissance University</title>
        <meta name="description" content="Your AI assistant for Renaissance University. Ask about exams, syllabus, and campus life." />
      </Helmet>

      {/* 2. PAGE LAYOUT (From Code 1) */}
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-8 flex-1 flex flex-col">
          
          {/* 3. CHAT INTERFACE (From Code 2) */}
          <div className="max-w-4xl mx-auto w-full h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
            
            <Card className="flex-1 bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col rounded-2xl">
              
              {/* Header/Banner inside Chat */}
              <div className="bg-emerald-600 p-4 flex items-center gap-3 text-white">
                 <div className="bg-white/20 p-2 rounded-full">
                    <Bot className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <h2 className="font-semibold">Saarthi AI</h2>
                    <p className="text-xs text-emerald-100">Always here to help</p>
                 </div>
              </div>

              {/* MESSAGES AREA */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'assistant' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    
                    {/* Bubble */}
                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Loading State */}
                {isLoading && (
