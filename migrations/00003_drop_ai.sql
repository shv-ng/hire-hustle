-- +goose Up
-- +goose StatementBegin
DROP TABLE IF EXISTS ai_content CASCADE;
DROP TYPE IF EXISTS contenttype;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- Recreate if needed
-- +goose StatementEnd
