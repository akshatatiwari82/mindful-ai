import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// --- FIX: Use the '@' alias for a safer import ---
// If your file is named 'navbar.tsx' (lowercase), change this to "@/components/navbar"
import Navbar from "@/components/NavBar";

import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood"; 
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="z-50 relative"> 
        <Navbar />
      </div>
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
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mood" element={<Mood />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
