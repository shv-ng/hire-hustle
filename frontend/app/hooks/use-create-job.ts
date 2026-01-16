import { createJob } from "@/lib/api";
import type { JobCreate } from "@/types";
import { useState } from "react";

export default function useCreateJob() {
  const [isCreating, setIsCreating] = useState(false);

  const submitJob = async (data: JobCreate) => {
    setIsCreating(true);
    try {
      const response = await createJob(data);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err };
    } finally {
      setIsCreating(false);
    }
  };

  return { submitJob, isCreating };
}
