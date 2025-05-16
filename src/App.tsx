import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Practice from "@/pages/Practice";
import Progress from "@/pages/Progress";
import Resources from "@/pages/Resources";
import Rooms from "@/pages/Rooms";
import NotFound from "@/pages/NotFound";
import AnswerProcessorDemo from "@/pages/AnswerProcessorDemo";
import { Toaster } from "@/components/ui/toaster";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/answer-processor" element={<AnswerProcessorDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
