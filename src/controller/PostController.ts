import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDTO, PostOutputDTO } from "../dto/PostDTO"
import { BaseError } from "../errors/BaseError"
import { Post } from "../models/Post"
import { PostUserDB } from "../Types"

export class PostController{
    constructor(
        private postDTO: PostDTO, 
        private postBusiness: PostBusiness
        
    ){}
    
    public getPosts = async(req: Request, res: Response) => {
        try{
            const input = req.body.query
           
            const output: PostOutputDTO[] = await this.postBusiness.getPosts(input)

            res.status(200).send(output)

        } catch (error) {
            console.log("Erro ao executar método PostController.getPosts", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }

    }

    public createPosts = async (req: Request, res: Response) => {
        try{
            res.status(201).send()

        } catch (error) {
            console.log("Erro ao executar método PostController.createPost", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}