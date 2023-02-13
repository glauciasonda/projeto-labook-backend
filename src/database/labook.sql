-- Active: 1676060235924@@127.0.0.1@3306
CREATE TABLE users (
    id STRING PRIMARY KEY UNIQUE NOT NULL, 
    name STRING NOT NULL, 
    email STRING NOT NULL,
    password STRING NOT NULL, 
    role STRING, 
    create_at STRING NOT NULL 
);

CREATE TABLE posts (
    id STRING PRIMARY KEY UNIQUE NOT NULL, 
    creator_id STRING NOT NULL, 
    content STRING NOT NULL, 
    likes INTEGER, 
    dislikes INTEGER, 
    created_at STRING NOT NULL,  
    update_at STRING,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes ( 
    user_id STRING  NOT NULL, 
    post_id STRING  NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

