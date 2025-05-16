
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SkillsBreakdownProps {
  totalSessions: number;
}

const SkillsBreakdown = ({ totalSessions }: SkillsBreakdownProps) => {
  return (
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
          Based on your last {totalSessions} practice sessions
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsBreakdown;
