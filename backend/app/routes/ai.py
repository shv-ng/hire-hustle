
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.database import get_session
from app.models import Job
from app.services.ai_service import generate_job_assets


router=APIRouter(prefix="/ai", tags=["AI"])

@router.post("/generate/{job_id}")
async def generate(job_id: int,session: Session=Depends(get_session)):
    job=session.get(Job,job_id)
    if not job:
        raise HTTPException(status_code=404,detail="Job not found")
    
    my_bio = "Fullstack Developer student, good at FastAPI and PostgreSQL."
    mail=generate_job_assets(job.description,my_bio,"cold_mail")
    return mail

