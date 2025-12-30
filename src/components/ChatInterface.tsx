import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, AlertCircle } from "lucide-react";

// The Connection to your Supabase Backend
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatInterface = () => {
  // --- STATE ---
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm here to listen and support you. How are you feeling today? Remember, this is a safe space, and our conversation is end-to-end encrypted. 💚" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- AUTO SCROLL ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- SEND LOGIC ---
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      // Handle Streaming Response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      
      // Add a placeholder message for the AI
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          
          // Basic stream parsing (Adjust based on your exact Azure return format)
          assistantContent += chunk;

          setMessages((prev) => {
            const newMsgs = [...prev];
            // Update the very last message (which is the AI's)
            newMsgs[newMsgs.length - 1].content = assistantContent; 
            return newMsgs;
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "Sorry, I am having trouble connecting to the server right now." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // This div calculates height automatically to fit your screen (100vh - header space)
    <div className="flex flex-col h-[calc(100vh-10rem)] w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="bg-emerald-600 p-4 text-white flex items-center gap-3 shadow-md z-10">
        <div className="bg-white/20 p-2 rounded-full">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-semibold text-sm md:text-base">Saarthi AI Live</h2>
          <p className="text-xs text-emerald-100">Renaissance University</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar Icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
              msg.role === 'assistant' ? 'bg-white text-emerald-600 border border-slate-100' : 'bg-emerald-600 text-white'
            }`}>
              {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
            </div>
            
            {/* Chat Bubble */}
            <div className={`p-3 md:p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-white text-emerald-600 border border-slate-100 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-slate-500 text-sm shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 z-10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2 relative"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 p-3 pl-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-5 transition-colors flex items-center justify-center shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
