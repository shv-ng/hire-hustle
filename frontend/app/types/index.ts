export interface Job {
  id: number
  company: string | null
  role: string | null
  url: string | null
  description: string | null
  status: JobStatus
  created_at: string
  applied_at: string | null
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
  status?: JobStatus
}

export interface JobUpdate {
  company?: string
  role?: string
  url?: string
  description?: string
  status?: JobStatus
}

export enum ContentType {
  COVER_LETTER = "cover_letter",
  KEYWORDS = "keywords",
  REFERRAL_MESSAGE = "referral_message",
}

export interface AIOutput {
  id: number
  job_id: number
  content_type: ContentType
  generated_text: string
  created_at: string
}
