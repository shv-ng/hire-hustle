import os

from sqlmodel import SQLModel, Session, create_engine

from dotenv import load_dotenv

_ = load_dotenv()

postgres_url = os.getenv("POSTGRES_URL")
if postgres_url is None:
    raise ValueError("POSTGRES_URL is not set")

engine = create_engine(postgres_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(bind=engine)


def get_session():
    with Session(engine) as session:
        yield session
