export interface PostDB {
    postId: string, 
    creatorId: string, 
    content: string, 
    likes: number,
    dislikes: number, 
    postCreatedAt: string, 
    postUpdatedAt: string
}

export interface UserDB{
    userId: string,
    name: string, 
    email: string, 
    password: string
    role: string,
    userCreatedAt: string
}

export interface PostUserDB {
    postId: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    postCreatedAt: string,
    postUpdateAt: string,
    name: string,
    email: string
}