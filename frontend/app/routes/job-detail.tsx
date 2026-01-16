import { JobDescription } from "@/components/job-detail/job-description";
import { JobHeader } from "@/components/job-detail/job-header";
import { JobKeywords } from "@/components/job-detail/job-keywords";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useJob from "@/hooks/use-job";
import useDeleteJob from "@/hooks/use-delete-job";
import useAIContent from "@/hooks/use-ai-content"; // Import useAIContent
import { PencilIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { EditJobDialog } from "@/components/edit-job-dialog";
import { ContentType } from "@/types"; // Import ContentType

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { job, isLoading, error, fetchJob } = useJob(Number(id));
  const { submitDeleteJob, isDeleting } = useDeleteJob();
  const { aiContent, isLoadingAI, errorAI } = useAIContent(Number(id)); // Use the AI content hook

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text); toast("Copied to clipboard");
  };

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

  if (isLoading) return <div className="text-center py-10">Loading job details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!job) return <div className="text-center py-10">Job not found.</div>;

  const getAIContentForTab = (contentType: ContentType) => {
    if (isLoadingAI) return "Generating AI content...";
    if (errorAI) return "Error generating AI content.";

    switch (contentType) {
      case ContentType.COVER_LETTER:
        return aiContent.coverLetter || "No cover letter generated yet.";
      case ContentType.KEYWORDS:
        return aiContent.keywords ? aiContent.keywords.join(", ") : "No keywords generated yet.";
      case ContentType.REFERRAL_MESSAGE:
        return aiContent.referralMessage || "No referral message generated yet.";
      default:
        return "Content type not recognized.";
    }
  };

  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex justify-between items-center">
        <JobHeader
          company={job.company || "N/A"}
          role={job.role || "N/A"}
          status={job.status || "N/A"}
          appliedDate={job.applied_at || "N/A"}
          onBack={() => navigate(-1)}
        />
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
                <PencilIcon className="h-4 w-4 mr-2" /> Edit Job
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDeleteJob} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : <><Trash2 className="h-4 w-4 mr-2" /> Delete Job</>}
            </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <JobDescription description={job.description || "No description available."} characterLimit={500} />
        </div>
        <div className="lg:col-span-2">
          {isLoadingAI ? (
            <div className="text-center py-4">Generating keywords...</div>
          ) : errorAI ? (
            <div className="text-center py-4 text-red-500">Error fetching keywords: {errorAI}</div>
          ) : (
            <JobKeywords keywords={aiContent.keywords || []} />
          )}
          <Tabs defaultValue={ContentType.COVER_LETTER} className="w-full my-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={ContentType.COVER_LETTER}>Cover Letter</TabsTrigger>
              <TabsTrigger value={ContentType.KEYWORDS}>Keywords</TabsTrigger>
              <TabsTrigger value={ContentType.REFERRAL_MESSAGE}>Referral</TabsTrigger>
            </TabsList>

            {[
              { id: ContentType.COVER_LETTER, title: "Cover Letter", content: aiContent.coverLetter },
              { id: ContentType.KEYWORDS, title: "Keywords", content: aiContent.keywords?.join("\n") },
              { id: ContentType.REFERRAL_MESSAGE, title: "Referral Request", content: aiContent.referralMessage },
            ].map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">{tab.title}</CardTitle>
                    {tab.content && (
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(tab.content as string)}>
                            <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-md bg-muted/30 min-h-[300px] whitespace-pre-wrap leading-relaxed">
                      {isLoadingAI ? "Generating AI content..." : errorAI ? "Error generating AI content." : tab.content || "No content generated yet."}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
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
}
export default JobDetail
