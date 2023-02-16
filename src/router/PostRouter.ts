
import express from "express"
import {PostController} from "../controller/PostController"
import { PostDTO } from "../dto/PostDTO"
import { PostDatabase } from "../database/PostDataBase" 
import { PostBusiness } from "../business/PostBusiness"

export const postRouter = express.Router()

const postController = new PostController(
    new PostDTO(),
    new PostBusiness(
        new PostDTO(),
        new PostDatabase()
    )
)

postRouter.get("/", postController.getPosts) 