
import { useState } from "react";
import { AnswerProcessor } from "@/components/AnswerProcessor";

const AnswerProcessorDemo = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question] = useState("Tell me about your experience with public speaking.");

  const handleSubmit = async (answer: string) => {
    setIsProcessing(true);
    console.log("Submitted answer:", answer);
    
    // Simulate processing
    setTimeout(() => {
      setAnswer(answer);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Answer Processor Demo</h1>
      
      <AnswerProcessor
        question={question}
        answer={answer}
        isProcessing={isProcessing}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AnswerProcessorDemo;
