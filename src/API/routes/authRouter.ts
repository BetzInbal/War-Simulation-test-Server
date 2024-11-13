import { Request, Response } from "express";
import { loginUserDTO, newUserDTO } from "../../types/DTOs/GeneralsDto";
import { createUser, userLogin } from "../services/authService";



export const register = async (req: Request<{}, {}, newUserDTO>, res: Response) => {
    try {
        await createUser(req.body)
        res.status(201).send()
    } catch (error) {
        //console.log(error);
        res.status(400).json(error as string);
    }

}

export const login = async (req: Request<{}, {}, loginUserDTO>, res: Response) => {
    try {
        const result = await userLogin(req.body)
        res.json(result).status(200)

    } catch (error) {
        //console.log(error);
        res.status(400).json(error);
    }

}

/*
export const getUser = async (req:ReqWithBody, res:Response)=> {
try {        
const user = await getUserService((req as any).user.user_id)        
res.json(user).status(200)
 
} catch (error) {
console.log(error);
res.json(error as string).sendStatus(400);       
}
}
*/