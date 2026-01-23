-- +goose Up
-- +goose StatementBegin
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'jobstatus') THEN
        CREATE TYPE jobstatus AS ENUM (
            'wishlist', 'drafting', 'applied', 'follow_up', 'screening', 
            'technical', 'final', 'offer', 'rejected', 'ghosted'
        );
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  company VARCHAR,
  role VARCHAR,
  url VARCHAR UNIQUE,
  description TEXT,
  status jobstatus DEFAULT 'wishlist',
  created_at TIMESTAMP DEFAULT NOW(),
  applied_at TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS jobs;
-- +goose StatementEnd
