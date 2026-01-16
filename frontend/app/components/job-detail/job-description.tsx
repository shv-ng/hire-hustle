import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";

interface JobDescriptionProps {
  description: string;
  characterLimit: number;
}

export function JobDescription({ description, characterLimit }: JobDescriptionProps) {
  const [showFull, setShowFull] = useState(false);
  const isLong = description.length > characterLimit
  const displayText = showFull || !isLong ?
    description.trim() : `${description.trim().substring(0, characterLimit)}...`
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Job Description
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground max-h-96 overflow-y-auto whitespace-pre-wrap">
        <div className="relative">
          <div className="whitespace-pre-wrap leading-relaxed">
            {displayText}
          </div>
          {isLong && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="mt-2 text-xs font-semibold text-primary hover:underline block"
            >
              {showFull ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
