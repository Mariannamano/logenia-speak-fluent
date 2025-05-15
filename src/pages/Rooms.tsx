
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RoomCard from "@/components/rooms/RoomCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - in a real app this would come from Supabase
const mockRooms = [
  {
    id: "1",
    title: "Ordering at a Café",
    description: "Practice common phrases used when ordering drinks and food.",
    level: "Beginner",
    category: "Daily Life",
    duration: "15 min",
    participants: 1,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Travel Talk",
    description: "Learn how to ask for directions and discuss travel plans.",
    level: "Intermediate",
    category: "Travel",
    duration: "20 min",
    participants: 2,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Job Interview Preparation",
    description: "Practice answering common interview questions in English.",
    level: "Advanced",
    category: "Professional",
    duration: "30 min",
    participants: 2,
    imageUrl: "/placeholder.svg"
  }
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, this would be a Supabase query
    const fetchRooms = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setRooms(mockRooms);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch rooms');
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Practice Rooms</h1>
            <p className="text-lg text-muted-foreground">
              Choose a room to start practicing your language skills
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-[320px] animate-pulse">
                  <AspectRatio ratio={16/9} className="bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted rounded w-4/5"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                className="bg-fluent-primary text-white px-4 py-2 rounded"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} {...room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No rooms available yet</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for new practice opportunities
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rooms;
