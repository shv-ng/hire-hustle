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

