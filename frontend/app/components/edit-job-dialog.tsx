import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from "./ui/select";
import { JobStatus, type Job, type JobUpdate } from "@/types";
import useUpdateJob from "@/hooks/use-update-job";
import { toast } from "sonner";

interface EditJobDialogProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJobUpdated: () => void;
}

export function EditJobDialog({ job, open, onOpenChange, onJobUpdated }: EditJobDialogProps) {
  const { submitUpdateJob, isUpdating } = useUpdateJob();

  const [formData, setFormData] = useState<JobUpdate>({
    company: "",
    role: "",
    url: "",
    description: "",
    status: JobStatus.WISHLIST,
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || "",
        role: job.role || "",
        url: job.url || "",
        description: job.description || "",
        status: job.status,
      });
    }
  }, [job]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: JobStatus) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!job.id) {
      toast.error("Job ID not found for update.");
      return;
    }

    const result = await submitUpdateJob(job.id, formData);

    if (result.success) {
      toast.success("Job Updated!");
      onOpenChange(false);
      onJobUpdated(); // Call this to refresh the job details
    } else {
      toast.error("Could not update the job. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90%]">
        <DialogHeader>
          <DialogTitle>
            Edit Job
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Google, Vercel, etc."
              value={formData.company || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              placeholder="Software Engineer"
              value={formData.role || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://www.google.com"
              value={formData.url || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" className="capitalize" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a status</SelectLabel>
                  {Object.values(JobStatus).map((status) => (
                    < SelectItem value={status} key={status} className="capitalize">
                      {status}
                    </SelectItem>))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Paste the JD here..."
              className="min-h-[100px]max-h-[200px]"
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Job"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
