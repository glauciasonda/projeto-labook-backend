export interface PostDB {
    post_id: string, 
    creator_id: string, 
    content: string, 
    likes: number,
    dislikes: number, 
    post_created_at: string, 
    post_update_at: string
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

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface UserDB {
    user_id: string, 
    name: string, 
    email: string,
    password: string, 
    role: USER_ROLES,     
    user_created_at: string 
}

export interface TokenPayload {
    userId: string,
	name: string,
    role: USER_ROLES
}

export interface OutputToken {
    message: string,
    token: string
}

export interface PostLikeDTO {
    user_id: string,
    post_id: string,
    like: number
}