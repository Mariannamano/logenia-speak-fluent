
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Rooms from "./pages/Rooms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme
  useTheme();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
