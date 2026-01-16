
import { getJob } from "@/lib/api";
import type { Job } from "@/types";
import { useEffect, useState } from "react";


export default function useJob(id: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = async () => {
    try {
      setIsLoading(true);
      const response = await getJob(id);
      setJob(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchJob();
  }, []);
  return { job, isLoading, error, fetchJob }
}
