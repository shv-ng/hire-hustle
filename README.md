# Hire Hustle

A job application tracker with AI integration to streamline your job search process. This application helps you keep track of all your job applications and automatically generates personalized AI content like cover letters, keywords for ATS, and referral messages based on the job description.

## Features

-   **Job Tracking:** Add, view, edit, and delete job applications.
-   **Application Status:** Track the status of each application (e.g., Wishlist, Applied, Interviewing, Offer, Rejected).
-   **AI Content Generation:** Automatically generate:
    -   **Cover Letters:** Tailored to the job description.
    -   **Keywords:** Optimized for Applicant Tracking Systems (ATS).
    -   **Referral Messages:** Personalized for networking.
-   **Responsive Design:** User-friendly interface built with React and Tailwind CSS.

## Tech Stack

**Frontend:**
-   **React:** A JavaScript library for building user interfaces.
-   **React Router:** For navigation and routing within the application.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **ShadCN UI:** Reusable UI components built with Tailwind CSS and Radix UI.
-   **Axios:** Promise-based HTTP client for the browser and Node.js.
-   **Sonner:** Toast notifications.

**Backend:**
-   **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.8+.
-   **SQLModel:** A library for interacting with SQL databases, designed to be easy to use and compatible with Pydantic and SQLAlchemy.
-   **PostgreSQL:** A powerful, open-source relational database system.
-   **python-dotenv:** For managing environment variables.
-   **BackgroundTasks:** FastAPI's built-in tool for running tasks in the background.
-   **google-genai:** For AI content generation (currently placeholder content for faster development).

## Local Development Setup

Follow these steps to set up the project locally.

### Prerequisites

-   Python 3.12+
-   Node.js 20+ and npm
-   Docker (optional, but recommended for PostgreSQL)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hirehustle.git
cd hirehustle
```

### 2. Set up PostgreSQL with Docker

Create a `docker-compose.yaml` file in the project root with the following content:

```yaml
version: '3.8'
services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: hirehustle_db
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

Then, start the PostgreSQL container:

```bash
docker-compose up -d db
```

### 3. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Create a `.env` file in the `backend` directory with your PostgreSQL connection string:

```
POSTGRES_URL="postgresql://user:password@localhost:5432/hirehustle_db"
```

Install dependencies using `uv` (or `pip` if `uv` is not installed):

```bash
uv pip install -e .
# Or if using pip
# pip install -e .
```

Run the backend application:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be running at `http://localhost:8000`.

### 4. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

Create a `.env` file in the `frontend` directory:

```
VITE_BACKEND_URL="http://localhost:8000"
```

Install dependencies:

```bash
npm install
```

Run the frontend application:

```bash
npm run dev
```

The frontend application will be running at `http://localhost:3000` (or another port as indicated by Vite).

## Deployment

### Backend (Render)

1.  **Sign up for Render:** Go to [Render.com](https://render.com/) and create an account.
2.  **Create a new Web Service:** Connect your GitHub repository.
3.  **Configuration:**
    -   **Root Directory:** `backend`
    -   **Build Command:** `uv pip install --system` (assuming `uv` is installed globally on Render environment, otherwise `pip install -r requirements.txt` if you generate one)
    -   **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
    -   **Environment Variables:** Add `POSTGRES_URL` pointing to your Render PostgreSQL instance.
4.  **Database:** Link a PostgreSQL database on Render to your web service.

### Frontend (Vercel)

1.  **Sign up for Vercel:** Go to [Vercel.com](https://vercel.com/) and create an account.
2.  **Import Your Project:** Connect your GitHub repository.
3.  **Configuration:**
    -   **Root Directory:** `frontend`
    -   **Build Command:** `npm run build`
    -   **Output Directory:** `build` (or as configured in `vite.config.ts`)
    -   **Environment Variables:** Add `VITE_BACKEND_URL` pointing to your deployed Render backend service URL.

## Future Enhancements

-   Replace placeholder AI content generation with actual calls to a large language model.
-   Implement user authentication.
-   Add more advanced job filtering and sorting options.
-   Integrate with job boards for easier application.

---

Feel free to contribute, open issues, or suggest new features!
