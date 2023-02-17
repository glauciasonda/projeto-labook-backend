import { UserDataBase } from "../database/UserDataBase";
import { UserDTO, UserInputDTO, UserLoginDTO } from "../dto/UserDTO";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { User } from "../models/User";
import { OutputToken, TokenPayload } from "../Types";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";

export class UserBusiness {
    constructor(
        private userDTO: UserDTO,
        private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager

    ){ }

    public signUp = async(input: UserInputDTO) => {

        const userId = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(input.password)
        const user: User = this.userDTO.toUserModel(input, userId, hashedPassword)

        await this.userDataBase.signUp(user)
        
        const tokenPayload: TokenPayload = {
            userId: user.getUserId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token: string = this.tokenManager.createToken(tokenPayload)
        
        const outputToken: OutputToken = {
            message: "User created!!",
            token: token
        }
        
        return outputToken
    }

    public login = async (input: UserLoginDTO) => {

        const  userLogin: User | undefined = await this.userDataBase.getUserByEmail(input.email)

        if(!userLogin){
            throw new NotFoundError("User not found")
        }
        
        const passwordHash = await this.hashManager.compare(input.password, userLogin.getPassword())
        if(!passwordHash){
            throw new BadRequestError("email or password incorrect")
        }
                
        const tokenPayload: TokenPayload = {
            userId: userLogin.getUserId(),
            name: userLogin.getName(),
            role: userLogin.getRole()
        }

        const token: string = this.tokenManager.createToken(tokenPayload)
        
        const outputToken: OutputToken = {
            message: "User Ok!!",
            token: token
        }
        
        return outputToken 
        
    }    

}