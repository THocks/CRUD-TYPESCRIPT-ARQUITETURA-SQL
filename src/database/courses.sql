-- Active: 1682429939166@@127.0.0.1@3306

CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    lessons INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL

);




INSERT INTO courses ( name, lessons)
VALUES
( "Javascript", 5),
( "React", 10),
( "Typescript", 15),
( "NodeJs", 25);


SELECT * FROM courses

