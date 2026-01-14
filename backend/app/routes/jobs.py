from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models import Job, JobCreate, JobUpdate


router = APIRouter(prefix="/job", tags=["jobs"])


@router.post("/", response_model=Job)
async def create_job(job_input: JobCreate, session: Session = Depends(get_session)):
    db_job = Job.model_validate(job_input)

    session.add(db_job)
    session.commit()
    session.refresh(db_job)
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


@router.put("/", response_model=Job)
async def update_job(
    job_id: int, job_data: JobUpdate, session: Session = Depends(get_session)
):
    db_job = session.get(Job, job_id)
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")

    new_data = job_data.model_dump(exclude_unset=True)
    for key, value in new_data.items():
        setattr(db_job, key, value)

    session.add(db_job)
    session.commit()
    session.refresh(db_job)
    return db_job


@router.delete("/{job_id}")
async def delete_job(job_id: int, session: Session = Depends(get_session)):
    job = session.get(Job, job_id)
    if job:
        session.delete(job)
        session.commit()
    return {"message": "Job deleted"}
