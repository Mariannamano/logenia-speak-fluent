import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RoomCard from "@/components/rooms/RoomCard";
import CharacterGuide from "@/components/guide/CharacterGuide";

const Index = () => {
  const featuredRooms = [
    {
      id: "professional",
      title: "Work & Professional Communication",
      description: "Practice workplace moments that require clear, confident speaking and reduce filler words.",
      level: "Intermediate" as const,
      category: "Professional",
      duration: "10-15 min",
      participants: 1,
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "storytelling",
      title: "Self-Expression & Storytelling",
      description: "Learn to share your personal stories and experiences with clarity and confidence.",
      level: "Beginner" as const,
      category: "Personal",
      duration: "10-15 min",
      participants: 1,
      imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "opinions",
      title: "Opinions & Debate",
      description: "Practice expressing your views clearly and respectfully while avoiding filler words.",
      level: "Intermediate" as const,
      category: "Discussion",
      duration: "15-20 min",
      participants: 1,
      imageUrl: "https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "presenting",
      title: "Public Speaking & Presenting",
      description: "Build confidence in formal presentation settings with clear, filler-free communication.",
      level: "Advanced" as const,
      category: "Presentation",
      duration: "15-20 min",
      participants: 1,
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "cross-cultural",
      title: "Cross-Cultural Communication",
      description: "Learn to adapt your communication style for international business contexts.",
      level: "Intermediate" as const,
      category: "Cultural",
      duration: "15-20 min",
      participants: 1,
      imageUrl: "https://images.unsplash.com/photo-1559132137-f168ae6b3d26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "casual",
      title: "Casual Conversations",
      description: "Perfect everyday interactions with natural, confident speech patterns.",
      level: "Beginner" as const,
      category: "Daily Life",
      duration: "10-15 min",
      participants: 1,
      imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "startup",
      title: "Startup-Specific Scenarios",
      description: "Practice pitches, investor meetings, and team presentations for the startup context.",
      level: "Advanced" as const,
      category: "Business",
      duration: "15-20 min",
      participants: 1,
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-fluent-50 dark:from-background dark:to-fluent-900/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  Practice languages in a <span className="text-fluent-primary">cozy</span> environment
                </h1>

                <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  Fluent Lounge helps you build confidence and fluency through guided conversations in a warm, supportive space.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <Link to="/practice" className="bg-fluent-primary hover:bg-fluent-600 text-white px-4 py-2 rounded-md font-medium text-center">
                    Enter Practice Room
                  </Link>
                  <Link to="/resources" className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium text-center">
                    Explore Resources
                  </Link>
                </div>
              </div>

              <div className="flex-1 flex justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-8 -right-8 bg-fluent-accent1/20 rounded-full w-40 h-40 blur-3xl" />
                  <div className="absolute -bottom-8 -left-8 bg-fluent-accent2/20 rounded-full w-40 h-40 blur-3xl" />
                  <div className="relative z-10 glass-card rounded-xl overflow-hidden p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <div className="bg-fluent-primary rounded-full p-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" x2="12" y1="19" y2="22" />
                          </svg>
                        </div>
                        <span className="font-medium">Practice Session</span>
                      </div>
                      <div className="rounded-full bg-red-500 h-3 w-3 animate-pulse-gentle" />
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="bg-fluent-50 dark:bg-fluent-900/20 rounded-lg p-3 text-sm">
                        "I would like to order a coffee and... <span className="text-red-500">um</span>... a croissant, please."
                      </div>
                      <div className="border border-dashed border-fluent-200 dark:border-fluent-700/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Try saying:</div>
                        <div className="text-sm">
                          "I would like to order a coffee and a croissant, please."
                        </div>
                      </div>
                    </div>

                    <div className="bg-fluent-accent2/20 rounded-lg p-3 text-sm border border-fluent-accent2/30">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">🦉</span>
                        <span className="font-medium">Professor Hoot says:</span>
                      </div>
                      <p>
                        Great job! Try to avoid filler words like "um" for more confident speech. You're making progress!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white dark:bg-fluent-900/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How Fluent Lounge Works</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Our platform helps you build real conversational fluency through a simple, effective process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-fluent-100 dark:bg-fluent-800/30 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-fluent-primary"
                  >
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                    <path d="M12 7c1.5 0 2.5-1.5 2.5-1.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">1. Choose a Theme</h3>
                <p className="text-muted-foreground">
                  Select from our library of conversation topics and practice scenarios tailored to your interests and skill level.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-fluent-100 dark:bg-fluent-800/30 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-fluent-primary"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">2. Practice Speaking</h3>
                <p className="text-muted-foreground">
                  Engage in guided conversations with our AI assistant, which provides prompts and listens to your responses.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-fluent-100 dark:bg-fluent-800/30 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-fluent-primary"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">3. Get Feedback</h3>
                <p className="text-muted-foreground">
                  Receive gentle, supportive feedback on your pronunciation, fluency, and vocabulary with suggestions for improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Rooms Section */}
        <section className="py-16 bg-fluent-50 dark:bg-fluent-900/10">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Practice Rooms</h2>
                <p className="text-muted-foreground">
                  Join these practice rooms to improve your speaking skills
                </p>
              </div>
              <Link to="/practice" className="hidden md:flex border-fluent-primary text-fluent-primary px-4 py-2 rounded-md border font-medium">
                View All Rooms
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRooms.map((room) => (
                <div key={room.id}>
                  <RoomCard {...room} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link to="/practice" className="border-fluent-primary text-fluent-primary px-4 py-2 rounded-md border font-medium inline-block">
                View All Rooms
              </Link>
            </div>
          </div>
        </section>

        {/* Character Guide Demo Section */}
        <section className="py-16 bg-white dark:bg-fluent-900/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold">Meet Your Learning Guide</h2>
                <p className="text-lg text-muted-foreground">
                  Our friendly character guides provide encouragement, tips, and cultural insights to enhance your learning journey.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="bg-fluent-100 dark:bg-fluent-800/30 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-fluent-primary"
                      >
                        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                        <path d="M21 8V5a2 2 0 0 0-2-2H8" />
                        <path d="M3 16v3a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3" />
                        <path d="M16 3v3a2 2 0 0 0 2 2h3" />
                        <path d="M3 12a2 2 0 0 0 2-2V7" />
                        <path d="M14 12a2 2 0 0 1-2-2V7" />
                        <path d="M10 12a2 2 0 0 0 2-2V9" />
                        <path d="M21 12a2 2 0 0 1-2-2V9" />
                        <rect width="18" height="12" x="3" y="4" rx="2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Cultural Context</h3>
                      <p className="text-sm text-muted-foreground">Learn cultural nuances and appropriate expressions for different situations.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="bg-fluent-100 dark:bg-fluent-800/30 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-fluent-primary"
                      >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Personalized Tips</h3>
                      <p className="text-sm text-muted-foreground">Get helpful suggestions tailored to your specific learning challenges.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="bg-fluent-100 dark:bg-fluent-800/30 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-fluent-primary"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Positive Encouragement</h3>
                      <p className="text-sm text-muted-foreground">Stay motivated with gentle encouragement and celebration of your progress.</p>
                    </div>
                  </div>
                </div>

                <Link to="/practice" className="bg-fluent-primary hover:bg-fluent-600 text-white px-4 py-2 rounded-md font-medium inline-block">
                  Start Practicing Now
                </Link>
              </div>

              <div className="lg:w-1/2">
                <CharacterGuide
                  character="owl"
                  tip="When learning a new language, try to practice a little bit every day rather than cramming once a week."
                  encouragement="Remember, making mistakes is an essential part of the learning process!"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-fluent-50 dark:bg-fluent-900/10">
          <div className="container px-4 md:px-6">
            <div className="rounded-xl bg-gradient-to-r from-fluent-primary to-fluent-accent1 text-white p-8 md:p-12 shadow-xl">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to become fluent?</h2>
                <p className="text-lg opacity-90">
                  Join our cozy learning community today and take your language skills to the next level.
                </p>
                <Link to="/practice" className="bg-white hover:bg-fluent-50 text-fluent-primary px-6 py-3 rounded-md font-medium inline-block">
                  Start Your First Lesson
                </Link>
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
