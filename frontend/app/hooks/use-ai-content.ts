import { getAIContent } from "@/lib/api";
import type { AIOutput } from "@/types"; // Assuming AIOutput type is defined
import { useEffect, useState } from "react";

// Define a type for the processed AI content
interface ProcessedAIContent {
  coverLetter: string | null;
  keywords: string[] | null;
  referralMessage: string | null;
}

export default function useAIContent(jobId: number) {
  const [aiContent, setAiContent] = useState<ProcessedAIContent>({
    coverLetter: null,
    keywords: null,
    referralMessage: null,
  });
  const [isLoadingAI, setIsLoadingAI] = useState(true);
  const [errorAI, setErrorAI] = useState<string | null>(null);

  const fetchAIContent = async () => {
    setIsLoadingAI(true);
    setErrorAI(null);
    try {
      const response = await getAIContent(jobId);
      const rawAIOutputs: AIOutput[] = response.data;

      const processed: ProcessedAIContent = {
        coverLetter: null,
        keywords: null,
        referralMessage: null,
      };

      rawAIOutputs.forEach((output) => {
        if (output.content_type === "cover_letter") {
          processed.coverLetter = output.generated_text;
        } else if (output.content_type === "keywords") {
          // Assuming keywords are returned as a string, e.g., "- keyword1\n- keyword2"
          processed.keywords = output.generated_text.split('\n').filter(s => s.trim().startsWith('-')).map(s => s.trim().substring(1).trim());
        } else if (output.content_type === "referral_message") {
          processed.referralMessage = output.generated_text;
        }
      });
      setAiContent(processed);
    } catch (err) {
      if (err instanceof Error) {
        setErrorAI(err.message || "Failed to fetch AI content");
      } else {
        setErrorAI("Failed to fetch AI content");
      }
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchAIContent();
    }
  }, [jobId]);

  return { aiContent, isLoadingAI, errorAI, fetchAIContent };
}
