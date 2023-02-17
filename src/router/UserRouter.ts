import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDataBase } from "../database/UserDataBase"
import { UserDTO } from "../dto/UserDTO"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController(
        new UserDTO(),
        new UserBusiness(
            new UserDTO(),
            new UserDataBase(),
            new IdGenerator(),
            new HashManager(),
            new TokenManager()
            )
        )
userRouter.post("/signup", userController.signUp)
userRouter.post("/login", userController.login)
