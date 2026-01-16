from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models import Job, JobCreate, JobUpdate, AIOutput, ContentType
from app.services.ai_service import generate_job_assets


router = APIRouter(prefix="/jobs", tags=["jobs"])


def _generate_ai_content_for_job(job_id: int, job_description: str, session: Session):
    """Helper to generate and save AI content for a given job."""
    for content_type in [ContentType.COVER_LETTER, ContentType.KEYWORDS, ContentType.REFERRAL_MESSAGE]:
        user_bio="Backend Engineer | Specialized in Go, Python & System Design | Ex-Software Intern @ JarNox | Ex-Android Dev Lead @ GDG VBSPU"
        generated_text = generate_job_assets(job_description,user_bio, content_type)
        ai_output = AIOutput(
            job_id=job_id,
            content_type=content_type,
            generated_text=generated_text,
        )
        session.add(ai_output)
    session.commit()


@router.post("/", response_model=Job)
async def create_job(job_input: JobCreate, background_tasks: BackgroundTasks, session: Session = Depends(get_session)):
    db_job = Job.model_validate(job_input)

    session.add(db_job)
    session.commit()
    session.refresh(db_job)

    if db_job.description:
        background_tasks.add_task(_generate_ai_content_for_job, db_job.id, db_job.description, session)

    return db_job


@router.get("/", response_model=list[Job])
async def get_jobs(session: Session = Depends(get_session)):
    jobs = session.exec(select(Job)).all()
    return jobs


@router.get("/{job_id}", response_model=Job)
async def get_job(job_id: int, session: Session = Depends(get_session)):
    job = session.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.put("/{job_id}", response_model=Job)
async def update_job(
    job_id: int, job_data: JobUpdate, background_tasks: BackgroundTasks, session: Session = Depends(get_session)
):
    db_job = session.get(Job, job_id)
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Store original values to check for changes
    original_company = db_job.company
    original_role = db_job.role
    original_description = db_job.description

    new_data = job_data.model_dump(exclude_unset=True)
    for key, value in new_data.items():
        setattr(db_job, key, value)

    session.add(db_job)
    session.commit()
    session.refresh(db_job)

    # Trigger AI generation if company, role, or description changed
    if (db_job.company != original_company or
        db_job.role != original_role or
        db_job.description != original_description) and db_job.description:
        # Clear existing AIOutput for this job first to avoid duplicates
        existing_ai_outputs = session.exec(select(AIOutput).where(AIOutput.job_id == job_id)).all()
        for output in existing_ai_outputs:
            session.delete(output)
        session.commit()
        background_tasks.add_task(_generate_ai_content_for_job, db_job.id, db_job.description, session)

    return db_job


@router.delete("/{job_id}")
async def delete_job(job_id: int, session: Session = Depends(get_session)):
    job = session.get(Job, job_id)
    if job:
        session.delete(job)
        session.commit()
    return {"message": "Job deleted"}
