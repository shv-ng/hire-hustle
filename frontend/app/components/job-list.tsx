import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useNavigate } from "react-router";
import { JobSearch } from "./jobs/job-search";
import { JobStatusBadge } from "./jobs/job-status-badge";
import type { Job } from "@/types";

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}

export function JobList({ jobs, isLoading, error }: JobListProps) {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const filteredJobs = jobs.filter(
    (job) =>
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.role?.toLowerCase().includes(search.toLowerCase()) ||
      job.status.toLowerCase().includes(search.toLowerCase()) ||
      job.applied_at?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="text-center py-10">Loading jobs...</div>;

  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  return (
    <div className="space-y-4">
      <JobSearch value={search} onChange={setSearch} />
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Applied</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length == 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No jobs found!
                </TableCell>
              </TableRow>
            ) :
              (
                filteredJobs.map((job) => (
                  <TableRow
                    key={job.id}
                    onClick={() => { navigate(`/jobs/${job.id}`) }}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{job.company}</TableCell>
                    <TableCell>{job.role}</TableCell>
                    <TableCell className="capitalize">
                      <JobStatusBadge status={job.status} isBigger={false} />
                    </TableCell>
                    <TableCell className="text-muted-foreground"> {job.applied_at}</TableCell>
                  </TableRow>
                )))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
