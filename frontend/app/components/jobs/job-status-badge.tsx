import { Badge } from "../ui/badge";

interface JobStatusBadgeProps {
  status: string
  isBigger: boolean
}

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  applied: "secondary",
  interviewing: "default",
  offered: "default",
  rejected: "outline",
};

export function JobStatusBadge({ status, isBigger }: JobStatusBadgeProps) {
  const variant = STATUS_VARIANTS[status.toLowerCase()] || "outline";
  isBigger = isBigger || false

  const className = isBigger ? "text-sm px-3 py-1 uppercase tracking-wider" : "capitalize";

  return (
    <Badge variant={variant} className={className} >
      {status}
    </ Badge>
  );
}
