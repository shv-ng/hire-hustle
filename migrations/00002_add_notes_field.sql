-- +goose Up
-- +goose StatementBegin
ALTER TABLE jobs ADD COLUMN notes TEXT;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE jobs DROP COLUMN notes;
-- +goose StatementEnd
