
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface PracticeCardProps {
  title: string;
  description: string;
  duration: string;
  participants: string;
  region: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  href: string;
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

const PracticeCard = ({
  title,
  description,
  duration,
  participants,
  region,
  level,
  href,
}: PracticeCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={`${getLevelColor(level)}`}>{level}</Badge>
        </div>
        <CardDescription className="line-clamp-2 text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4 text-base text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>{region}</span>
          </div>
        </div>
        <Button asChild className="w-full bg-fluent-primary hover:bg-fluent-600 text-base py-5">
          <Link to={href}>Start Practice</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PracticeCard;
