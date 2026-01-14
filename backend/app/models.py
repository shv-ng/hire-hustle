from datetime import datetime
import enum
from sqlmodel import Field, SQLModel


class JobStatus(str, enum.Enum):
    # Discovery Phase
    WISHLIST = "wishlist"  # Interesting jobs you haven't applied to yet
    DRAFTING = "drafting"  # You're currently tailoring your resume/cold mail

    # Active Phase
    APPLIED = "applied"  # Form submitted/Email sent
    FOLLOW_UP = "follow_up"  # You sent a follow-up email after 1 week

    # Interview Phase
    SCREENING = "screening"  # Initial HR call
    TECHNICAL = "technical"  # Coding rounds/Assignments
    FINAL_ROUND = "final"  # Management/Culture fit rounds

    # Outcome Phase
    OFFER = "offer"  # The goal!
    REJECTED = "rejected"  # No longer in the process
    GHOSTED = "ghosted"  # (Real-world scenario) They never replied


class ContentType(str, enum.Enum):
    ColdMail = "cold_mail"
    ResumeEdit = "resume_edit"
    ReferralMessage = "referral_message"
    CoverLetter = "cover_letter"


class JobBase(SQLModel):
    company_name: str | None
    position: str | None
    url: str | None
    description: str | None
    status: JobStatus = Field(default=JobStatus.WISHLIST)


class JobCreate(JobBase):
    pass


class JobUpdate(SQLModel):
    company_name: str | None = None
    position: str | None = None
    url: str | None = None
    description: str | None = None
    status: JobStatus | None = None


class Job(JobBase, table=True):
    id: int | None = Field(primary_key=True, default=None)
    created_at: datetime = Field(default_factory=datetime.now)
    applied_at: datetime | None = None


class AIOutput(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    job_id: int = Field(foreign_key="job.id")
    content_type: ContentType
    generated_text: str
    created_at: datetime = Field(default_factory=datetime.now)
