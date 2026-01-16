import { deleteJob } from "@/lib/api";
import { useState } from "react";

export default function useDeleteJob() {
  const [isDeleting, setIsDeleting] = useState(false);

  const submitDeleteJob = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteJob(id);
      return { success: true };
    } catch (err) {
      console.error("Failed to delete job:", err);
      return { success: false, error: err };
    } finally {
      setIsDeleting(false);
    }
  };

  return { submitDeleteJob, isDeleting };
}