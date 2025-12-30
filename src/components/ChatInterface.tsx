import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Shield, AlertCircle } from "lucide-react";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ⚠️ MAKE SURE THESE ENV VARIABLES ARE SET IN YOUR .env FILE
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatInterface = () => {
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Saarthi, your university assistant. How can I help you navigate campus today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Replaces useToast
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Sending Messages
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    let assistantContent = "";

    try {
      // Prepare messages for API (strip IDs and timestamps)
      const chatMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!response.ok) throw new Error("Failed to connect to Saarthi AI");
      if (!response.body) throw new Error("No response body");

      // Streaming Logic
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = (Date.now() + 1).toString();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // This splits the stream by newlines to handle SSE format
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const jsonStr = line.slice(6); // Remove "data: " prefix
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              
              if (content) {
                assistantContent += content;
                setMessages((prev) => {
                  const lastMsg = prev[prev.length - 1];
                  // If the last message is the current AI response, update it
                  if (lastMsg.role === "assistant" && lastMsg.id === assistantId) {
                    return prev.map((m, i) =>
                      i === prev.length - 1 ? { ...m, content: assistantContent } : m
                    );
                  }
                  // Otherwise, add the new AI message bubble
                  return [
                    ...prev,
                    {
                      id: assistantId,
                      role: "assistant",
                      content: assistantContent,
                      timestamp: new Date(),
                    },
                  ];
                });
              }
            } catch (e) {
              console.error("Error parsing JSON chunk", e);
            }
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError("Connection failed. Please check your internet or API keys.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // Main Container - Adjusted to fit inside a page or sidebar
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 font-sans">
      
      {/* Header */}
      <div className="bg-blue-600 p-4 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">Saarthi AI</h2>
            <p className="text-xs text-blue-100 opacity-90">Renaissance University Bot</p>
          </div>
        </div>
        <Shield className="w-5 h-5 text-blue-200" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "assistant" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
              }`}
            >
              {message.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                message.role === "assistant"
                  ? "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  : "bg-blue-600 text-white rounded-br-none"
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <span className={`text-[10px] block mt-1 ${
                  message.role === "assistant" ? "text-gray-400" : "text-blue-200"
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm ml-10">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Saarthi is typing...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 mx-4">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-end gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about attendance, exams, etc..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none max-h-32 min-h-[24px] py-2 px-2 outline-none text-gray-700 placeholder:text-gray-400"
            rows={1}
            style={{ minHeight: "44px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          AI generated responses can be inaccurate.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
