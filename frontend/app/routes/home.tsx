import { JobList } from "@/components/job-list";
import type { Route } from "./+types/home";
import { AddJobDialog } from "@/components/add-job-dialog";
import { PageHeader } from "@/components/layout/page-header";
import useJobs from "@/hooks/use-jobs";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hire Hustle" },
    { name: "description", content: "A job application tracker with AI integrated" },
  ];
}

export default function Home() {
  const { jobs, isLoading, error, fetchJobs } = useJobs();
  return <main className="container mx-auto py-10 px-4">
    <div className="flex justify-between items-center mb-8">
      <PageHeader
        title="Hire Hustle"
        description="A job application tracker with AI integrated"
      />
      <AddJobDialog onJobAdded={fetchJobs} />
    </div>
    <div>
      <JobList jobs={jobs} isLoading={isLoading} error={error} />
    </div>
  </main>
}
