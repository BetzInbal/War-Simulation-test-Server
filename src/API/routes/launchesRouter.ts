import { Request, Response } from "express";
import { loginUserDTO, newUserDTO } from "../../types/DTOs/GeneralsDto";
import { createUser, userLogin } from "../services/authService";
import { getLaunchesService } from "../services/launchesService";





export const getArry = async (req: any, res: Response) => {
    try {
        const result = await getLaunchesService(req.user)
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