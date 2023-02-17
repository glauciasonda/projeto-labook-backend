import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"

export interface PostInputDTO {
     content: string, 
     token: string 
}

export interface UserCreator{
    creatorId: string, 
    name: string,
    email: string
}

export interface PostOutputDTO {
    id: string, 
    content: string, 
    likes: number,
    deslikes: number, 
    createdAt: string, 
    updatedAt: string,
    creator: UserCreator
}


export class PostDTO {

    public createPostOutPutDTO(post: Post): PostOutputDTO {
        const userCreator: UserCreator = { 
            creatorId: post.getCreatorId(),
            name: post.getNameCreator(),
            email: post.getEmailCreator()
        }
        const dto: PostOutputDTO =  {
            id: post.getPostId(), 
            content: post.getContent(),
            likes: post.getLikes(),
            deslikes: post.getDislikes(),
            createdAt: post.getPostCreatedAt(),
            updatedAt: post.getPostUpdatedAt(),
            creator: userCreator
        } 
        return dto
        
    } 

    public createPostInputDTO(
        content: unknown,
        token: unknown
    ): PostInputDTO {

        if (typeof content !== "string"){
            throw new BadRequestError("content deve ser string")
        }

        if (typeof token !== "string"){
            throw new BadRequestError("Token Null")
        } 
        const dto: PostInputDTO = {
            content: content,
            token: token
        }
        return dto  

    }
}