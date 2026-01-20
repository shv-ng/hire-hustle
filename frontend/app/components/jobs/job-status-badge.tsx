import { Badge } from "../ui/badge";

interface JobStatusBadgeProps {
  status: string
  isBigger?: boolean
}

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  wishlist: "outline",
  drafting: "outline",
  applied: "secondary",
  follow_up: "secondary",
  screening: "default",
  technical: "default",
  final: "default",
  offer: "default",
  rejected: "destructive",
  ghosted: "outline",
};

const STATUS_LABELS: Record<string, string> = {
  wishlist: "Wishlist",
  drafting: "Drafting",
  applied: "Applied",
  follow_up: "Follow Up",
  screening: "Screening",
  technical: "Technical",
  final: "Final Round",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
};

export function JobStatusBadge({ status, isBigger = false }: JobStatusBadgeProps) {
  const variant = STATUS_VARIANTS[status.toLowerCase()] || "outline";
  const label = STATUS_LABELS[status.toLowerCase()] || status;

  const className = isBigger
    ? "text-sm px-4 py-1.5 font-semibold"
    : "text-xs";

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
