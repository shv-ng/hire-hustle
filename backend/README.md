A. Job Tracking (CRUD)
POST /jobs: Create a new job application entry (Company, Position, JD).

GET /jobs: Fetch all jobs for your "Sheet" view.

PATCH /jobs/{job_id}: Update status (e.g., change from "Applied" to "Interview").

DELETE /jobs/{job_id}: Remove an entry.

B. AI Generation (The Logic)
POST /jobs/{job_id}/generate: The "Heavy Lifter" endpoint.

Payload: { "type": "cold_mail" | "resume" | "referral" }

Logic: 1. Fetch jd_text from the DB using job_id. 2. Send jd_text + your pre-saved Bio to OpenAI/Groq. 3. Save the response in the ai_outputs table. 4. Return the generated text.

GET /jobs/{job_id}/outputs: Retrieve all previously generated AI content for that specific job.
