
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models import Job, AIOutput


router=APIRouter(prefix="/jobs", tags=["AI"])

@router.get("/{job_id}/ai-content", response_model=list[AIOutput])
async def get_ai_content_for_job(job_id: int, session: Session = Depends(get_session)):
    job = session.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    ai_outputs = session.exec(select(AIOutput).where(AIOutput.job_id == job_id)).all()
    return ai_outputs

