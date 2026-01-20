-- +goose Up
-- +goose StatementBegin
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
