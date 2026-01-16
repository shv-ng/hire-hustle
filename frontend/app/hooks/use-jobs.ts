import { getJobs } from "@/lib/api";
import type { Job } from "@/types";
import { useEffect, useState } from "react";


export default function useJobs() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await getJobs();
      setJobs(response.data);
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
    fetchJobs();
  }, []);
  return { jobs, isLoading, error, fetchJobs }
}
