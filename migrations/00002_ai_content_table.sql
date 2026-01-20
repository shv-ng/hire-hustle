-- +goose Up
-- +goose StatementBegin
CREATE TABLE ai_content (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  content_type contenttype NOT NULL,
  generated_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(job_id, content_type)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE ai_content;
-- +goose StatementEnd
