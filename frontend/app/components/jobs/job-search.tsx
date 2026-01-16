import { Search } from "lucide-react"
import { Input } from "../ui/input"

interface JobSearchProps {
  value: string
  onChange: (value: string) => void
}
export function JobSearch({ value, onChange }: JobSearchProps) {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 max-w-sm"
      />
    </div>
  )
}
