CREATE TABLE comments (
    id uuid DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    commentable VARCHAR(255) NOT NULL,
    commentable_id uuid NOT NULL,
    body VARCHAR(255),
    date_created timestamp DEFAULT CURRENT_TIMESTAMP,
    date_modified timestamp DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE comments ADD CONSTRAINT comments_pk PRIMARY KEY (id);