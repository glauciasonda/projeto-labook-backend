import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"

export interface PostInputDTO {
    creatorId: string | undefined, 
    content: string | undefined, 
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
    public createPostInput(
        creatorId: unknown,
        content: unknown, 
    ): PostInputDTO  {

        if(typeof creatorId !== "string") {
            throw new BadRequestError("creatorId deve ser string")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("content deve ser string")
        }

        const dto: PostInputDTO = {
            creatorId, 
            content, 
        }
        return dto
    }

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
}