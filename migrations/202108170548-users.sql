CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4(),
    ip VARCHAR(255),
    consentString VARCHAR(255),
    token VARCHAR(255),
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    date_modified timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ADD CONSTRAINT users_pk PRIMARY KEY (id);