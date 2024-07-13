import { Request } from "express";
import { IUser } from "../models/User.model";

interface UserRequest extends Request {
    user: IUser;
}

export { UserRequest };