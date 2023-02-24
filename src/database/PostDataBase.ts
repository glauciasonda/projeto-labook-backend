import { PostDB, PostUserDB, LikeDB } from "../Types"
import { BaseDatabase } from "./BaseDataBase"
import { Post } from "../models/Post"
import { Like } from "../models/Like"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"
    public static TABLE_LIKES = "likes_dislikes"

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
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)

    }

    public getLike = async (postId: string, userId: string) => {
        let like: Like | undefined
        const [ likeDB ]: LikeDB[] = await BaseDatabase
                                    .connection(PostDatabase.TABLE_LIKES)
                                    .where("post_id", "=", `${postId}`)
                                    .andWhere("user_id", "=", `${userId}`)
        if (likeDB){
            like = new Like(
                likeDB.user_id,
                likeDB.post_id,
                likeDB.like
            )
        }
        return like
    }

    public createLike = async (like: Like) => {
        const likeDB: LikeDB = {
            user_id: like.getUserId(),
            post_id: like.getPostId(),
            like: like.getLike()
        }
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES)
            .insert(likeDB)
    }

    public updateLike = async (like: Like) => {
        const likeDB: LikeDB = {
            user_id: like.getUserId(),
            post_id: like.getPostId(),
            like: like.getLike()
        }
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES)
        .update(likeDB)
        .where("post_id", "=", `${likeDB.post_id}`)
        .andWhere("user_id", "=", `${likeDB.user_id}`)
    }

    public delteLike = async(postId: string) => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES)
        .del()
        .where("post_id", "=", `${postId}`)
    }

    public updatePostLike = async (post: Post) => {
        const postDB: PostDB = {
            post_id: post.getPostId(), 
            creator_id: post.getCreatorId(), 
            content: post.getContent(), 
            likes: post.getLikes(),
            dislikes: post.getDislikes(), 
            post_created_at: post.getPostCreatedAt(), 
            post_update_at: post.getPostUpdatedAt()
        } 
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(postDB)
        .where("post_id", "=", `${postDB.post_id}`)
        
    }

    public deletePost = async (postId: string) => {
        await BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .del()
                .where("post_id", "=", `${postId}`)
         
        await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .del()
                .where("post_id", "=", `${postId}`)
    }
    
}