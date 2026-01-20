import { JobDescription } from "@/components/job-detail/job-description";
import { JobHeader } from "@/components/job-detail/job-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useJob from "@/hooks/use-job";
import useDeleteJob from "@/hooks/use-delete-job";
import { PencilIcon, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { EditJobDialog } from "@/components/edit-job-dialog";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { job, isLoading, error, fetchJob } = useJob(Number(id));
  const { submitDeleteJob, isDeleting } = useDeleteJob();

  const handleDeleteJob = async () => {
    if (!job?.id) return;

    if (window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      const result = await submitDeleteJob(job.id);
      if (result.success) {
        toast.success("Job deleted successfully!");
        navigate("/");
      } else {
        toast.error("Failed to delete job. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">Error: {error}</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="text-center py-10">
          <p className="text-lg">Job not found.</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-10 px-4 max-w-5xl">
      <JobHeader
        company={job.company || "N/A"}
        role={job.role || "N/A"}
        status={job.status || "wishlist"}
        appliedDate={job.applied_at || "Not applied"}
        onBack={() => navigate("/")}
      />

      <div className="flex gap-3 mb-8">
        <Button
          variant="outline"
          onClick={() => setIsEditDialogOpen(true)}
          className="flex-1"
        >
          <PencilIcon className="h-4 w-4 mr-2" /> Edit Job
        </Button>
        {job.url && (
          <Button
            variant="outline"
            onClick={() => window.open(job.url, '_blank')}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" /> View Posting
          </Button>
        )}
        <Button
          variant="destructive"
          onClick={handleDeleteJob}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : <><Trash2 className="h-4 w-4 mr-2" /> Delete</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {job.description && (
          <JobDescription
            description={job.description}
            characterLimit={600}
          />
        )}

        {job.notes && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {job.notes}
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Created</span>
              <span className="text-sm text-muted-foreground">
                {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
            {job.applied_at && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium">Applied</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(job.applied_at).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Status</span>
              <span className="text-sm text-muted-foreground capitalize">
                {job.status.replace('_', ' ')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {job && (
        <EditJobDialog
          job={job}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onJobUpdated={fetchJob}
        />
      )}
    </main>
  );
};

export default JobDetail;
