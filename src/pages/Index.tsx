
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PracticeCard from "@/components/PracticeCard";
import FeatureCard from "@/components/FeatureCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MicIcon, BarChart2Icon, Sparkles, MessageCircle, GlobeIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-logenia-50 dark:from-background dark:to-logenia-900/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Speak English with <span className="text-logenia-600">confidence</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your real-time communication coach for non-native English speakers and professionals working in international teams.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="bg-logenia-500 hover:bg-logenia-600">
                    <Link to="/practice">Start Practice</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/resources">Explore Resources</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-8 -right-8 bg-logenia-100 dark:bg-logenia-900/20 rounded-full w-40 h-40 blur-3xl" />
                  <div className="absolute -bottom-8 -left-8 bg-accent/10 rounded-full w-40 h-40 blur-3xl" />
                  <div className="relative z-10 glass-card rounded-xl overflow-hidden p-6 animate-float">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <div className="bg-logenia-500 rounded-full p-1.5">
                          <MicIcon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">Recording in Progress</span>
                      </div>
                      <div className="rounded-full bg-red-500 h-3 w-3 animate-pulse-gentle" />
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="bg-logenia-100 dark:bg-logenia-800/30 rounded-lg p-3 text-sm">
                        "I think our team should focus on... <span className="text-red-500">um</span>... improving customer experience."
                      </div>
                      <div className="border border-dashed border-logenia-300 dark:border-logenia-700 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Suggestion:</div>
                        <div className="text-sm">
                          "I believe our team should prioritize improving the customer experience."
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-logenia-50 dark:bg-logenia-900/20 p-3 text-sm border border-logenia-100 dark:border-logenia-800/50">
                      <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                        <GlobeIcon className="h-3.5 w-3.5" />
                        <span>Cultural Tip: Japanese Business Context</span>
                      </div>
                      Consider being more indirect and using modal phrases like "Perhaps we could consider..."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Why Logenia AI?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform helps you improve your English communication skills with personalized feedback and cultural context.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<MicIcon className="h-5 w-5" />}
                title="Real-time Coaching"
                description="Get instant feedback on pronunciation, filler words, and clarity as you speak."
              />
              <FeatureCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Cultural Context"
                description="Learn how to adapt your speech for different cultural expectations and business contexts."
              />
              <FeatureCard
                icon={<BarChart2Icon className="h-5 w-5" />}
                title="Progress Tracking"
                description="Monitor your improvement over time with detailed analytics and benchmarks."
              />
              <FeatureCard
                icon={<MessageCircle className="h-5 w-5" />}
                title="Suggested Phrases"
                description="Never get stuck in conversation with our suggested follow-up phrases when you need them."
              />
            </div>
          </div>
        </section>
        
        {/* Practice Cards Section */}
        <section className="py-16 bg-logenia-50 dark:bg-logenia-900/10">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Practice Exercises</h2>
                <p className="text-muted-foreground">
                  Build your skills with targeted speech exercises
                </p>
              </div>
              <Button variant="outline" className="hidden md:flex">
                View All Exercises
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PracticeCard
                title="Business Meeting Introduction"
                description="Practice introducing yourself and your role in a professional meeting context."
                duration="5-10 min"
                participants="Solo"
                region="Global"
                level="Beginner"
                href="/practice/business-intro"
              />
              <PracticeCard
                title="Presenting Project Updates"
                description="Learn to clearly communicate project status, challenges, and next steps to stakeholders."
                duration="10-15 min"
                participants="Solo"
                region="North America"
                level="Intermediate"
                href="/practice/project-updates"
              />
              <PracticeCard
                title="Negotiation Scenarios"
                description="Practice the art of business negotiation with appropriate assertiveness and politeness."
                duration="15-20 min"
                participants="Partner"
                region="Global"
                level="Advanced"
                href="/practice/negotiation"
              />
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button variant="outline">View All Exercises</Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="rounded-xl bg-gradient-to-r from-logenia-500 to-accent text-white p-8 md:p-12 shadow-xl">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your communication skills?</h2>
                <p className="text-lg opacity-90">
                  Start practicing today and see improvement in your English communication confidence within weeks.
                </p>
                <Button asChild size="lg" className="bg-white text-logenia-600 hover:bg-logenia-50">
                  <Link to="/practice">Start Free Practice Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
