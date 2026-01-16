import { Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

interface JobKeywordsProps {
  keywords: string[]
}

export function JobKeywords({ keywords }: JobKeywordsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          Target Keywords
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {keywords.map(kw => (
          <Badge key={kw} variant="secondary" className="bg-primary/10 text-primary border-none">
            {kw}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
