
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface PracticeSession {
  id: number;
  title: string;
  date: string;
  duration: string;
  improvement: string;
  positive: boolean;
}

// Mock data for practice history
const practiceHistory = [
  { 
    id: 1, 
    title: 'Business Meeting Introduction', 
    date: 'May 15, 2025', 
    duration: '4:23',
    improvement: '+12%',
    positive: true
  },
  { 
    id: 2, 
    title: 'Project Status Update', 
    date: 'May 14, 2025', 
    duration: '6:45',
    improvement: '+8%',
    positive: true
  },
  { 
    id: 3, 
    title: 'Customer Negotiation', 
    date: 'May 12, 2025', 
    duration: '8:15',
    improvement: '-3%',
    positive: false
  },
  { 
    id: 4, 
    title: 'Team Introduction', 
    date: 'May 10, 2025', 
    duration: '3:55',
    improvement: '+5%',
    positive: true
  },
];

const PracticeHistory = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Practice Sessions</CardTitle>
        <CardDescription>
          Your speech practice history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {practiceHistory.map((session) => (
            <div key={session.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex flex-col gap-1">
                <h4 className="font-medium">{session.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {session.date}
                  </span>
                  <span>{session.duration}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Badge 
                  className={
                    session.positive 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }
                >
                  {session.positive ? (
                    <ArrowUpIcon className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3.5 w-3.5 mr-1" />
                  )}
                  {session.improvement}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeHistory;
