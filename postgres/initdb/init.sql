-- CREATE USER api_user WITH PASSWORD 'api_password';
GRANT ALL PRIVILEGES ON DATABASE annonycomments TO api_user;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS migrations (
    id uuid DEFAULT uuid_generate_v4(),
    file_name varchar(255) NOT NULL,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE migrations ADD CONSTRAINT migrations_pk PRIMARY KEY (id);