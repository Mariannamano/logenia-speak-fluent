
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface CultureTipCardProps {
  region: string;
  title: string;
  description: string;
  doTips: string[];
  dontTips: string[];
}

const CultureTipCard = ({
  region,
  title,
  description,
  doTips,
  dontTips,
}: CultureTipCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Badge className="w-fit bg-accent text-accent-foreground flex items-center gap-1 mb-1">
          <Globe className="h-3.5 w-3.5" />
          {region}
        </Badge>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h4 className="font-medium text-sm text-green-600 dark:text-green-400 mb-2">
            Do
          </h4>
          <ul className="space-y-2">
            {doTips.map((tip, index) => (
              <li key={`do-${index}`} className="text-sm flex">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-sm text-red-600 dark:text-red-400 mb-2">
            Don't
          </h4>
          <ul className="space-y-2">
            {dontTips.map((tip, index) => (
              <li key={`dont-${index}`} className="text-sm flex">
                <span className="text-red-600 dark:text-red-400 mr-2">✗</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CultureTipCard;
