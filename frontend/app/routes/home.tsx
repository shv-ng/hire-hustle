import { JobList } from "@/components/job-list";
import type { Route } from "./+types/home";
import { AddJobDialog } from "@/components/add-job-dialog";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hire Hustle" },
    { name: "description", content: "A job application tracker with AI integrated" },
  ];
}

export default function Home() {
  return <main className="container mx-auto py-10 px-4">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">
        Hire Hustle
      </h1>
      <AddJobDialog />
    </div>
    <div>
      <JobList />
    </div>
  </main>
}
