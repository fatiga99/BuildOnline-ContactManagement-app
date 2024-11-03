import { JwtPayload } from './interfaces/IJwtPayload'; 
import { Request } from 'express';

//I can extend Request for user to implement JwtPayload my interface
declare module 'express' {
    export interface Request {
        user?: JwtPayload;
    }
}
