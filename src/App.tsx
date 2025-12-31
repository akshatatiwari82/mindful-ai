import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// --- COMPONENT IMPORTS ---
import Navbar from "./components/Navbar"; 

// --- PAGE IMPORTS ---
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood"; 
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// 1️⃣ Create a Layout Component
// This wrapper ensures the Navbar is always visible and handles spacing
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with high z-index to stay on top of animations */}
      <div className="z-50 relative"> 
        <Navbar />
      </div>
      
      {/* This <Outlet /> is where the pages (Home, Chat, Mood) will appear */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 2️⃣ Wrap your pages inside the MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mood" element={<Mood />} />
              {/* Add other pages here that need the Navbar */}
            </Route>

            {/* Pages WITHOUT Navbar (like 404) can go outside */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
