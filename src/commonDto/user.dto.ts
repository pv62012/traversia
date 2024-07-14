import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User.model";

interface UserRequest extends Request {
    user: IUser | null;
}

const wrapMiddleware = (middleware: (req: UserRequest, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return middleware(req as UserRequest, res, next);
    };
  };
export { UserRequest, wrapMiddleware };