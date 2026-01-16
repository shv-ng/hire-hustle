import { ArrowLeft, Calendar } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { JobStatusBadge } from "../jobs/job-status-badge"

interface JobHeaderProps {
  company: string
  role: string
  status: string
  appliedDate: string
  onBack: () => void
}

export function JobHeader({ company, role, status, appliedDate, onBack }: JobHeaderProps) {
  return (
    <>
      <Button variant="ghost" onClick={onBack} className="mb-6 -ml-2 text-muted-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            {company}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-xl text-muted-foreground">
              {role}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {appliedDate}
            </div>
          </div>
        </div>
        <JobStatusBadge isBigger={true} status={status} />
      </div>
    </>
  );
}
