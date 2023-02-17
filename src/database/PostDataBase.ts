import { PostDB, PostLikeDTO, PostUserDB } from "../Types"
import { BaseDatabase } from "./BaseDataBase"
import { Post } from "../models/Post"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"

    public async getPosts(q: string | undefined) {
        let result: PostUserDB[]
        if (q) {
            result = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(
                    "post_id as postId",
                    "creator_id as creatorId",
                    "content",
                    "likes",
                    "dislikes",
                    "post_created_at as postCreatedAt",
                    "post_update_at as postUpdateAt",
                    "name",
                    "email")
                .innerJoin(PostDatabase.TABLE_USERS, "creator_id", "=", "user_id")
                .where("post_id", "=", `${q}`)
        } else {
            result = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(
                    "post_id as postId",
                    "creator_id as creatorId",
                    "content",
                    "likes",
                    "dislikes",
                    "post_created_at as postCreatedAt",
                    "post_update_at as postUpdateAt",
                    "name",
                    "email")
                .innerJoin(PostDatabase.TABLE_USERS, "creator_id", "=", "user_id")
        }

        const allPosts: Post[] = result.map((item) => { 
                return new Post(
                    item.postId, 
                    item.creatorId, 
                    item.name, 
                    item.email, 
                    item.content, 
                    item.likes, 
                    item.dislikes, 
                    item.postCreatedAt,
                    item.postUpdateAt) 
        }) 
        return allPosts
    }

    public  createPost = async (post: Post) =>  {
        const postDB: PostDB = {
            post_id: post.getPostId(), 
            creator_id: post.getCreatorId(), 
            content: post.getContent(), 
            likes: post.getLikes(),
            dislikes: post.getDislikes(), 
            post_created_at: post.getPostCreatedAt(), 
            post_update_at: post.getPostUpdatedAt()
        } 
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(postDB)

    }

    public like = async (postLike: PostLikeDTO) => {
        
    }
}