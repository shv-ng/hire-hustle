import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from "./ui/select";
import { JobStatus, type JobCreate } from "@/types";
import useCreateJob from "@/hooks/use-create-job";
import { toast } from "sonner";

interface AddJobDialogProps {
  onJobAdded: () => void;
}

export function AddJobDialog({ onJobAdded }: AddJobDialogProps) {
  const [open, setOpen] = useState(false);
  const { submitJob, isCreating } = useCreateJob();

  const [formData, setFormData] = useState<JobCreate>({
    company: "",
    role: "",
    url: "",
    description: "",
    status: JobStatus.WISHLIST,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: JobStatus) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await submitJob(formData);

    if (result.success) {
      toast.success("Job Added!");
      setOpen(false);
      setFormData({ company: "", role: "", url: "", description: "", status: JobStatus.WISHLIST });
      onJobAdded(); // Call this to refresh the job list
    } else {
      toast.error("Could not save the job. Please try again.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button size="lg">Add Job</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90h]">
        <DialogHeader>
          <DialogTitle>
            Add New Job
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
              className="min-h-[100px] max-h-[200px]"
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating ? "Saving..." : "Save Job"}
          </Button>
        </form>
      </DialogContent>
    </Dialog >
  )
}
