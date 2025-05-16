
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePracticeStats } from "@/hooks/use-practice-stats";
import { useState, useEffect } from "react";

// Types for chart data
interface ChartDataPoint {
  name: string;
  clarity: number;
  pacing: number;
  fillerWords: number;
}

const ProgressCharts = () => {
  const { stats } = usePracticeStats();
  const [weeklyData, setWeeklyData] = useState<ChartDataPoint[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Generate data based on practice stats
    // For a real app, this would come from an API or calculated from session history
    generateChartData();
  }, [stats.totalSessions]);

  const generateChartData = () => {
    // Generate weekly data based on stats
    // This is a simplified version that creates data points that show improvement
    // based on the user's total sessions and practice time
    
    // Base values that grow with number of sessions
    const baseClarity = 50 + Math.min(stats.totalSessions * 2, 30);
    const basePacing = 55 + Math.min(stats.totalSessions * 1.5, 25);
    const baseFillerWords = Math.max(20 - stats.totalSessions, 5);
    
    // Weekly progress (showing gradual improvement through the week)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const newWeeklyData = days.map((day, index) => {
      const improvement = index * (stats.level / 10);
      return {
        name: day,
        clarity: Math.min(baseClarity + improvement, 100),
        pacing: Math.min(basePacing + improvement, 100),
        fillerWords: Math.max(baseFillerWords - improvement * 0.5, 0)
      };
    });
    
    // Monthly progress (showing improvement over weeks)
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const newMonthlyData = weeks.map((week, index) => {
      const improvement = index * (stats.level / 5);
      return {
        name: week,
        clarity: Math.min(baseClarity + improvement * 2, 100),
        pacing: Math.min(basePacing + improvement * 2, 100),
        fillerWords: Math.max(baseFillerWords - improvement, 0)
      };
    });
    
    setWeeklyData(newWeeklyData);
    setMonthlyData(newMonthlyData);
  };

  return (
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
  );
};

export default ProgressCharts;
