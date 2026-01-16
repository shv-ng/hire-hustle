import { updateJob } from "@/lib/api";
import type { JobUpdate } from "@/types";
import { useState } from "react";

export default function useUpdateJob() {
  const [isUpdating, setIsUpdating] = useState(false);

  const submitUpdateJob = async (id: number, data: JobUpdate) => {
    setIsUpdating(true);
    try {
      const response = await updateJob(id, data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Failed to update job:", err);
      return { success: false, error: err };
    } finally {
      setIsUpdating(false);
    }
  };

  return { submitUpdateJob, isUpdating };
}