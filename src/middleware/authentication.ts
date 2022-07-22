import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
            if (decoded) {
                next();
            } else {
                throw 'exception';
            }
        } else {
            throw 'exception';
        }
    } catch (error) {
        res.status(401).send('Error 401: Unauthorized');
    }
};

//check user id
export const authorizationToken = (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);
    try {
        const authorizationHeader = req.headers.authorization;

        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];

            const verified: JwtPayload = jwt.verify(
                token,
                process.env.TOKEN_SECRET as string
            ) as JwtPayload;

            if ((verified.id as number) === userId || (verified.user.id as number) === userId) {
                next();
            } else {
                throw 'exception';
            }
        } else {
            throw 'exception';
        }
    } catch (error) {
        res.status(401).send('Error 401: Unauthorized');
    }
};
