/**
 * App Component
 * Main application with routing, smooth scroll, and page transitions.
 */

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { TransitionProvider } from "./components/PageTransition";
import { useLenis } from "./hooks/use-lenis";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import FotosPage from "./pages/FotosPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <TransitionProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/fotos" element={<FotosPage />} />
        <Route path="/projeto/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TransitionProvider>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize Lenis smooth scroll
  useLenis();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <>
          {isLoading ? (
            <LoadingScreen onComplete={handleLoadingComplete} />
          ) : (
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          )}
        </>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
