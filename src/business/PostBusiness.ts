import { PostDatabase } from "../database/PostDataBase"
import { PostDTO, PostOutputDTO } from "../dto/PostDTO"
import { Post  } from "../models/Post"


export class PostBusiness {
    constructor (
        private postDTO: PostDTO,
        private postDataBase: PostDatabase

    ) {}

    public getPosts = async (input: string | undefined ) => {

        const allPosts: Post[] = await this.postDataBase.getPosts(input)

        const output: PostOutputDTO[] = allPosts.map((post) => {
            return this.postDTO.createPostOutPutDTO(post) 
        })

        return (output)
        
    }
}