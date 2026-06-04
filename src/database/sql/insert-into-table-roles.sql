-- Run once manually after app starts and creates the roles table

INSERT INTO roles (name) VALUES
  ('superadmin'),
  ('admin'),
  ('user')
ON CONFLICT (name) DO NOTHING;