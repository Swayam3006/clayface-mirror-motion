import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Remove badge
      const badge = document.getElementById("lovable-badge");
      if (badge) badge.remove();

      // Remove close button
      const closeBtn = document.getElementById("lovable-badge-close");
      if (closeBtn) closeBtn.remove();

      // Remove the script tag itself
      const scripts = document.querySelectorAll("script[src*='gpteng.co/lovable.js']");
      scripts.forEach((s) => s.remove());
    }, 500); // check every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
