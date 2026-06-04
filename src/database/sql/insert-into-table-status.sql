-- Run once manually after app starts and creates the roles table
INSERT INTO
    status (name)
VALUES
    ('pending'),
    ('accepted'),
    ('rejected');