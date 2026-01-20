import { JobList } from "@/components/job-list";
import type { Route } from "./+types/home";
import { AddJobDialog } from "@/components/add-job-dialog";
import { PageHeader } from "@/components/layout/page-header";
import useJobs from "@/hooks/use-jobs";
import { Briefcase } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hire Hustle - Job Application Tracker" },
    { name: "description", content: "Track your job applications with ease" },
  ];
}

export default function Home() {
  const { jobs, isLoading, error, fetchJobs } = useJobs();

  return (
    <main className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <PageHeader
              title="Hire Hustle"
              description="Your personal job application tracker"
            />
          </div>
        </div>
        <AddJobDialog onJobAdded={fetchJobs} />
      </div>

      {!isLoading && !error && jobs.length === 0 ? (
        <div className="text-center py-20">
          <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No jobs yet</h3>
          <p className="text-muted-foreground mb-6">Start tracking your job applications</p>
          <AddJobDialog onJobAdded={fetchJobs} />
        </div>
      ) : (
        <JobList jobs={jobs} isLoading={isLoading} error={error} />
      )}
    </main>
  );
}
