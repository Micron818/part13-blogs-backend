DROP TABLE blogs;

CREATE TABLE blogs (
    id serial NOT NULL,
    title varchar NOT NULL,
    author varchar NULL,
    url varchar NULL,
    likes int4 NULL DEFAULT 0,
    CONSTRAINT blogs_pk PRIMARY KEY (id)
);

INSERT INTO
    blogs (title, author, url, likes)
VALUES
    ('On let vs const', 'Dan Abramov', 'url1', 0);

INSERT INTO
    blogs (title, author, url, likes)
VALUES
    (
        'Gaps in sequences in PostgreSQL',
        'Laurenz Albe',
        'url2',
        0
    );

commit;