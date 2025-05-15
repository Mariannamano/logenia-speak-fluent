
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="glass-card hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="h-10 w-10 rounded-lg bg-logenia-100 dark:bg-logenia-800/30 flex items-center justify-center mb-2 text-logenia-600">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
