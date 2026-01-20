-- name: ListJobs :many
SELECT * FROM jobs;

-- name: GetJob :one
SELECT * FROM jobs WHERE id = $1;

-- name: CreateJob :one
INSERT INTO jobs (company, role, url, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- name: DeleteJob :exec
DELETE FROM jobs WHERE id = $1;

-- name: UpdateJob :one
UPDATE jobs SET company = $2, role = $3, url = $4, description = $5, status = $6 WHERE id = $1 RETURNING *;

-- name: CreateAIContent :one
INSERT INTO ai_content (job_id, content_type, generated_text) VALUES ($1, $2, $3) RETURNING *;

-- name: GetAIContent :one
SELECT * FROM ai_content WHERE job_id = $1 AND content_type = $2;

-- name: DeleteAIContent :exec
DELETE FROM ai_content WHERE job_id = $1 AND content_type = $2;

-- name: ListAIContentForJob :many
SELECT * FROM ai_content WHERE job_id = $1;

-- name: UpsertAIContent :one
INSERT INTO ai_content (job_id, content_type, generated_text)
VALUES ($1, $2, $3)
ON CONFLICT (job_id, content_type) 
DO UPDATE SET 
    generated_text = EXCLUDED.generated_text,
    created_at = NOW()
RETURNING *;
