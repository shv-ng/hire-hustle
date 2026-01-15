import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Copy, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const job = {
    company: "Google",
    role: "Frontend Engineer",
    status: "Interviewing",
    appliedDate: "2024-03-20",
    jd: `About Simplilearn Founded in 2010 and based in Plano, Texas, and Bangalore, India, Simplilearn, a Blackstone portfolio company, is a global leader in digital upskilling, enabling learners across the globe with access to world-class training to individuals and businesses worldwide. Simplilearn offers 1,500+ live classes each month across 150+ countries, impacting over 8 million learners globally. The programs are designed and delivered with world-renowned universities, top corporations, and leading industry bodies via live online classes featuring top industry practitioners, sought-after trainers, and global leaders. From college students and early career professionals to managers, executives, small businesses, and big corporations, Simplilearns role-based, skill-focused, industry-recognized, and globally relevant training programs are ideal upskilling solutions for diverse career or business goals. Roles & Responsibilities: Working as a junior Software Engineer focusing on Next.js and React. Should be eager to learn new tools & technologies, specifically AI-powered development. Use AI tools like ChatGPT and v0 to accelerate the development of components and logic. Collaborate with the team to build web applications with 100% matching design from Figma. Ensure all web pages are responsive and maintain high visual fidelity across different screen sizes. Write clean, maintainable code using Tailwind CSS and modern React hooks. Debug and resolve frontend issues to ensure a smooth and pixel-perfect user experience. Stay up-to-date with the latest features in Next.js (App Router) and React. Desired Skills Bachelor's/Master's Degree in Computer Science or related field. Basic understanding of Next.js and React fundamentals. Experience (or high interest) in using AI tools like v0 and ChatGPT to build UI faster. Strong attention to detail to ensure code output matches Figma designs exactly. Should have a basic understanding of database systems (SQL, NoSQL, JSON). Knowledge of Tailwind CSS or modern styling libraries is a plus. Should be a great team player with a problem-solving mindset. Role: Full Stack Developer Industry Type: Education / Training Department: Engineering - Software & QA Employment Type: Full Time, Permanent Role Category: Software Development Education UG: B.Tech/B.E. in Any Specialization Key Skills Skills highlighted with ‘‘ are preferred keyskills NextjsSQL FigmaNoSQLReact.Js`, keywords: ["React", "TypeScript", "Performance", "System Design"], coverLetter: "Dear Hiring Manager, I am thrilled to apply...", coldMail: "Hi [Name], I recently applied for...", referralMsg: "Hey [Name], I saw an opening at Google..."
  };

  const JD_LIMIT = 500;
  const isLongJD = job.jd.length > JD_LIMIT
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text); toast("Copied to clipboard");
  };
  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 -ml-2 text-muted-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            {job.company}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-xl text-muted-foreground">
              {job.role}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {job.appliedDate}
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1 uppercase tracking-wider">
          {job.status}
        </Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground max-h-96 overflow-y-auto whitespace-pre-wrap">
              <div className="relative">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {show || !isLongJD ? job.jd.trim() : `${job.jd.trim().substring(0, JD_LIMIT)}...`}
                </div>

                {isLongJD && (
                  <button
                    onClick={() => setShow(!show)}
                    className="mt-2 text-xs font-semibold text-primary hover:underline block"
                  >
                    {show ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Target Keywords
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {job.keywords.map(kw => (
                <Badge key={kw} variant="secondary" className="bg-primary/10 text-primary border-none"> {kw}
                </Badge>))}
            </CardContent>
          </Card>
          <Tabs defaultValue="cover-letter" className="w-full my-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
              <TabsTrigger value="cold-mail">Cold Mail</TabsTrigger>
              <TabsTrigger value="referral">Referral</TabsTrigger>
            </TabsList>

            {[
              { id: "cover-letter", title: "Cover Letter", content: job.coverLetter },
              { id: "cold-mail", title: "Cold Mail Script", content: job.coldMail },
              { id: "referral", title: "Referral Request", content: job.referralMsg },
            ].map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">{tab.title}</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(tab.content)}>
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-md bg-muted/30 min-h-[300px] whitespace-pre-wrap leading-relaxed">
                      {tab.content}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </main>


  );
}
export default JobDetail
