# HireHustle - Smart Job Application Tracker

A full-stack job application tracker built to streamline my own job search process. Track applications, manage status workflows, and never lose track of opportunities again.

> **Live Demo**: [hire-hustle-eight.vercel.app/](https://hire-hustle-eight.vercel.app/) | **API**: [hire-hustle.onrender.com](https://hire-hustle.onrender.com)

## Why I Built This

During my job search, I was juggling applications across LinkedIn, company websites, and spreadsheets. I needed a centralized system to track everything - from wishlist companies to final rounds. So I built HireHustle as my daily driver.

**Real-world usage**: Currently tracking 40+ applications with automated status workflows.

## Features

- ✅ **Full Application Lifecycle** - Track jobs from wishlist → applied → screening → offer/rejected
- 🔍 **Smart Search & Filtering** - Instantly find applications by company, role, or status
- 📝 **Job Description Storage** - Paste JDs for future reference during interview prep
- 🎯 **Status Management** - 10 predefined statuses covering entire interview pipeline
- ⚡ **Fast & Responsive** - Built with modern React + Go backend
- 🎨 **Clean UI** - Dark mode interface built with Tailwind CSS + shadcn/ui

## Tech Stack

**Frontend**
- React 19 + React Router 7 (file-based routing)
- TypeScript for type safety
- Tailwind CSS + shadcn/ui components
- Axios for API calls

**Backend**
- Go 1.23 + Chi router
- PostgreSQL 16 + sqlc (type-safe SQL)
- pgx/v5 (PostgreSQL driver)
- Database migrations with goose

**DevOps**
- Docker + Docker Compose
- Deployed on Vercel (frontend) + Render (backend)

## Quick Start

### Prerequisites
- Go 1.23+
- Node.js 20+
- Docker (for PostgreSQL)

### 1. Clone & Setup Database
```bash
git clone https://github.com/yourusername/hirehustle.git
cd hirehustle

# Start PostgreSQL
docker-compose up -d
```

### 2. Backend Setup
```bash
# Create .env in root
echo 'POSTGRES_URL="postgresql://user:password@localhost:5432/hirehustle_db"' > .env

# Install dependencies & run
go mod download
go run main.go
# Backend runs on http://localhost:8080
```

### 3. Frontend Setup
```bash
cd frontend

# Create .env
echo 'VITE_BACKEND_URL="http://localhost:8080"' > .env

# Install & run
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

## Project Structure
```
hirehustle/
├── main.go              # Go backend entry point
├── jobs.go              # Job CRUD handlers
├── db/                  # sqlc generated code
├── migrations/          # Database migrations
├── frontend/
│   ├── app/
│   │   ├── routes/      # React Router pages
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # API client & utilities
│   └── vite.config.ts
└── docker-compose.yaml
```

## API Endpoints
```
GET    /jobs          # List all jobs
GET    /jobs/:id      # Get single job
POST   /jobs          # Create new job
PUT    /jobs/:id      # Update job
DELETE /jobs/:id      # Delete job
```

## What's Next

Future enhancements I'm considering:
- [ ] Add auth to make it available to multi user
- [ ] Email reminders for follow-ups
- [ ] Analytics dashboard (applications/week, response rates)
- [ ] Browser extension to quick-add jobs
- [ ] Export to CSV for backup

---

**Built with** ❤️ **during my job search journey**
