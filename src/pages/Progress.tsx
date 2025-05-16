
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BarChart2Icon, TrophyIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { usePracticeStats } from "@/hooks/use-practice-stats";
import ProgressShelf from "@/components/progress/ProgressShelf";

// Mock data for progress charts
const weeklyData = [
  { name: 'Mon', clarity: 65, pacing: 70, fillerWords: 12 },
  { name: 'Tue', clarity: 68, pacing: 72, fillerWords: 10 },
  { name: 'Wed', clarity: 72, pacing: 75, fillerWords: 8 },
  { name: 'Thu', clarity: 75, pacing: 76, fillerWords: 7 },
  { name: 'Fri', clarity: 78, pacing: 80, fillerWords: 5 },
];

const monthlyData = [
  { name: 'Week 1', clarity: 60, pacing: 65, fillerWords: 15 },
  { name: 'Week 2', clarity: 68, pacing: 70, fillerWords: 10 },
  { name: 'Week 3', clarity: 75, pacing: 78, fillerWords: 7 },
  { name: 'Week 4', clarity: 82, pacing: 85, fillerWords: 4 },
];

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

const Progress = () => {
  const { stats } = usePracticeStats();
  
  // Format total practice time
  const formatPracticeTime = (totalMinutes: number) => {
    if (totalMinutes < 60) {
      return `${totalMinutes.toFixed(1)} mins`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      return `${hours}.${minutes < 10 ? '0' : ''}${minutes} hours`;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <p className="text-muted-foreground">
              Track your communication improvement over time
            </p>
          </div>
          
          {/* Progress Shelf Component */}
          <div className="mb-8">
            <ProgressShelf 
              streak={stats.streak}
              totalSessions={stats.totalSessions}
              achievements={stats.achievements}
              level={stats.level}
              xp={stats.xp}
              nextLevelXp={stats.nextLevelXp}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Total Practice Time" 
              value={formatPracticeTime(stats.totalPracticeTime)}
              description="All time" 
              icon={<CalendarIcon className="text-logenia-500" />}
            />
            <StatCard 
              title="Overall Progress" 
              value={`${Math.min(stats.level * 5, 100)}%`}
              description="Improvement from baseline" 
              icon={<BarChart2Icon className="text-accent" />}
            />
            <StatCard 
              title="Current Streak" 
              value={`${stats.streak} days`}
              description="Keep practicing!" 
              icon={<TrophyIcon className="text-amber-500" />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Charts */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>
                  Track your improvement in key communication areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="weekly">This Week</TabsTrigger>
                      <TabsTrigger value="monthly">This Month</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-logenia-500" />
                        <span>Clarity</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-accent" />
                        <span>Pacing</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span>Filler Words</span>
                      </div>
                    </div>
                  </div>
                  
                  <TabsContent value="weekly">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Line yAxisId="left" type="monotone" dataKey="clarity" stroke="hsl(var(--logenia-500))" strokeWidth={2} />
                          <Line yAxisId="left" type="monotone" dataKey="pacing" stroke="hsl(var(--accent))" strokeWidth={2} />
                          <Line yAxisId="right" type="monotone" dataKey="fillerWords" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="monthly">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Line yAxisId="left" type="monotone" dataKey="clarity" stroke="hsl(var(--logenia-500))" strokeWidth={2} />
                          <Line yAxisId="left" type="monotone" dataKey="pacing" stroke="hsl(var(--accent))" strokeWidth={2} />
                          <Line yAxisId="right" type="monotone" dataKey="fillerWords" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Skills Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Breakdown</CardTitle>
                <CardDescription>
                  Your current proficiency levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Clarity', value: 78 },
                      { name: 'Pacing', value: 80 },
                      { name: 'Grammar', value: 85 },
                      { name: 'Vocabulary', value: 72 },
                      { name: 'Filler Words', value: 65 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--logenia-500))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Based on your last {stats.totalSessions} practice sessions
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Practice History */}
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Progress;
