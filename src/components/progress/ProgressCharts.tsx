
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const ProgressCharts = () => {
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
