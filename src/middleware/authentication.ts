import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("here in auth token")
        const authorizationHeader = req.headers.authorization
        console.log("authhhhh is", authorizationHeader)
        if(authorizationHeader){
            const token = authorizationHeader.split(' ')[1] 
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
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