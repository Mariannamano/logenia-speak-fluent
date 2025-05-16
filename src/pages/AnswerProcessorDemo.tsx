
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnswerProcessor from "@/components/AnswerProcessor";

const AnswerProcessorDemo = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Answer Processor Demo</CardTitle>
            <CardDescription>
              Record your answer to a question and receive AI feedback on your speech.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnswerProcessor />
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AnswerProcessorDemo;
