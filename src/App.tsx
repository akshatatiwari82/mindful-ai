import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// --- COMPONENT IMPORTS ---
import Navbar from "./components/Navbar"; // 👈 Make sure this path is correct for your project

// --- PAGE IMPORTS ---
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood"; 
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          
          {/* ✅ Global Navbar placed here. 
             It will appear on every page defined in Routes below.
          */}
          <Navbar />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
