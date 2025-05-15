
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface RoomCardProps {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;
  participants: number;
  imageUrl?: string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Intermediate":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Advanced":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const RoomCard = ({
  id,
  title,
  description,
  level,
  category,
  duration,
  participants,
  imageUrl,
}: RoomCardProps) => {
  return (
    <Card className="fluent-card card-hover overflow-hidden">
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105" 
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={`${getLevelColor(level)} whitespace-nowrap`}>{level}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
          <Badge variant="outline">{category}</Badge>
          <Badge variant="outline">{duration}</Badge>
          <Badge variant="outline">{participants} participant{participants !== 1 ? 's' : ''}</Badge>
        </div>
        
        <Button 
          asChild 
          className="w-full bg-fluent-primary hover:bg-fluent-600 text-white"
        >
          <Link to={`/practice?category=${id}`}>Enter Room</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
