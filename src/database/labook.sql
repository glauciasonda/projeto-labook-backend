-- Active: 1676060235924@@127.0.0.1@3306
CREATE TABLE users (
    user_id STRING PRIMARY KEY UNIQUE NOT NULL, 
    name STRING NOT NULL, 
    email STRING NOT NULL,
    password STRING NOT NULL, 
    role STRING, 
    user_created_at STRING NOT NULL 
);

SELECT * FROM users;


INSERT INTO users VALUES ("001", "GLAUCIA", "glauciasonda@gmail.com", "123", "normal", "today");


CREATE TABLE posts (
    post_id STRING PRIMARY KEY UNIQUE NOT NULL, 
    creator_id STRING NOT NULL, 
    content STRING NOT NULL, 
    likes INTEGER, 
    dislikes INTEGER, 
    post_created_at STRING NOT NULL,  
    post_update_at STRING,
    FOREIGN KEY (creator_id) REFERENCES users(user_id)
);

SELECT * from posts;

INSERT INTO posts 
    VALUES (
             "uma uuid v4",
             "1",
             "Projeto Labook",
             10,
             2,
             "023-01-20T12:11:47:000Z",  
             "2023-01-20T12:11:47:000Z" 
            );

CREATE TABLE likes_dislikes ( 
    user_id STRING  NOT NULL, 
    post_id STRING  NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

