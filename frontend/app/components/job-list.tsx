import { useState } from "react";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import type { Job } from "@/types";
import { useNavigate } from "react-router";

const MOCK_JOBS: Job[] = [
  { id: "1", companyName: "Google", role: "Frontend Engineer", status: "applied", dateApplied: "2023-10-01" },
  { id: "2", companyName: "Meta", role: "Product Designer", status: "interviewing", dateApplied: "2023-10-05" },
];
export function JobList() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  return <div className="space-y-4">
    <Input
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="max-w-sm"
    />
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_JOBS.map((job) => (
            <TableRow
              key={job.id} onClick={() => { navigate(`/jobs/${job.id}`) }}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{job.companyName}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell className="capitalize">{job.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  </div>;
}
