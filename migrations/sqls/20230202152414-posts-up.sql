/* Replace with your SQL commands */

CREATE SEQUENCE IF NOT EXISTS post_id_seq;

-- Table Definition
CREATE TABLE "public"."posts" (
    "id" int4 NOT NULL DEFAULT nextval('post_id_seq'::regclass),
    "name" varchar NOT NULL,
    "age" varchar NOT NULL,
    PRIMARY KEY ("id")
);