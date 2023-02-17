import { PostDatabase } from "../database/PostDataBase"
import { PostDTO, PostInputDTO, PostOutputDTO } from "../dto/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Post  } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostLikeDTO } from "../Types"


export class PostBusiness {
    constructor (
        private postDTO: PostDTO,
        private postDataBase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManage: TokenManager

    ) {}

    public getPosts = async (input: string | undefined ) => {

        const allPosts: Post[] = await this.postDataBase.getPosts(input)

        const output: PostOutputDTO[] = allPosts.map((post) => {
            return this.postDTO.createPostOutPutDTO(post) 
        })

        return (output)
        
    }

    public createPost = async (input: PostInputDTO) => {
        const { content, token } = input

        const payload = this.tokenManage.getPayload(token)
        if( payload === null ){
            throw new BadRequestError("Invalid Token")
        }
                
        const postId = this.idGenerator.generate()
        const newPost = new Post(
                            postId,
                            payload.userId,
                            null, 
                            null, 
                            input.content,
                            0,
                            0,
                            new Date().toISOString(),
                            new Date().toISOString()
        )
        await this.postDataBase.createPost(newPost)
    }
    
    public like = async (postLike: PostLikeDTO) => {
        
        return "cheguie no business"

    }


}