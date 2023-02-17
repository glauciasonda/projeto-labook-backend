
import express from "express"
import {PostController} from "../controller/PostController"
import { PostDTO } from "../dto/PostDTO"
import { PostDatabase } from "../database/PostDataBase" 
import { PostBusiness } from "../business/PostBusiness"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const postRouter = express.Router()

const postController = new PostController(
    new PostDTO(),
    new PostBusiness(
        new PostDTO(),
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost) 