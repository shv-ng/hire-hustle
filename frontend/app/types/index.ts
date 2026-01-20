export interface Job {
  id: number
  company: string
  role: string
  url: string
  description: string
  status: string
  created_at: string
  applied_at: string | null
  notes?: string
}

export enum JobStatus {
  WISHLIST = "wishlist",
  DRAFTING = "drafting",
  APPLIED = "applied",
  FOLLOW_UP = "follow_up",
  SCREENING = "screening",
  TECHNICAL = "technical",
  FINAL_ROUND = "final",
  OFFER = "offer",
  REJECTED = "rejected",
  GHOSTED = "ghosted",
}

export interface JobCreate {
  company: string
  role: string
  url?: string
  description?: string
  status?: string
  notes?: string
}

export interface JobUpdate {
  company?: string
  role?: string
  url?: string
  description?: string
  status?: string
  notes?: string
}
