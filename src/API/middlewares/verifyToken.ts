import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";


export default (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers['authorization']
        
        if(!token)
            {res.status(400)
                .json({ERR:"MAST BE TOKEN   "})
                return
            }
            const payload = jwt.verify(token,process.env.SECRET!);
            (req as any).user = payload
            next()
    } catch (error) {
        res.status(400)
        .json(
            (error as JsonWebTokenError)
        )  
    }

}