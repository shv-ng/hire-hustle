from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.routes import ai, jobs


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up")
    create_db_and_tables()

    yield


app = FastAPI(lifespan=lifespan)

app.include_router(jobs.router)
app.include_router(ai.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
