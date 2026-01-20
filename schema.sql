CREATE TYPE jobstatus AS ENUM (
  'wishlist', 'drafting', 'applied', 'follow_up', 'screening', 
  'technical', 'final', 'offer', 'rejected', 'ghosted'
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  company VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  url VARCHAR,
  description TEXT,
  status jobstatus DEFAULT 'wishlist',
  created_at TIMESTAMP DEFAULT NOW(),
  applied_at TIMESTAMP,
  notes TEXT
);
