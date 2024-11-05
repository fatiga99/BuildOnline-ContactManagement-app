import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../interfaces/IJwtPayload';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded; 
        next();
        return;
    } 
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};