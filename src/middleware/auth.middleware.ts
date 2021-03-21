import {verify} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {log} from "util";

const config = require('config');

export interface AuthorizedRequest extends Request {
    user: string | object;
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS')
        return next();

    try {
        const token = req.headers.authorization;

        if (!token)
            return res.status(401).json({message: "Unauthorized"});

        const parsedToken = token.split(' ')[1];
        (req as AuthorizedRequest).user = verify(parsedToken, config.get("JWT_SECRET_TOKEN"));

        return next();
    } catch (e) {
        res.status(401).json({message: "Unauthorized"});
    }
}




export default AuthMiddleware;