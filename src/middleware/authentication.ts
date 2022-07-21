import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if(authorizationHeader){
            const token = authorizationHeader.split(' ')[1]
            console.log("token is",token)
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
            console.log("decoded is ", decoded)
            if(decoded) {
                next();
            }else {
                throw 'exception';
            }
        }
        else{
            throw 'exception';
        }
        
    } catch (error) {
        res.status(401).send("Error 401: Unauthorized")
    }
}

export default verifyAuthToken;