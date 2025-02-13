import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "./catchAsyncErrors";
import { UserRequest } from "../commonDto/user.dto";
import ApiError from "../utils/errorhander";
import jwt, { JwtPayload } from "jsonwebtoken";
import Roles from "../commonDto/roles.dto";
import User, { IUser } from "../models/User.model";
import { Types } from "mongoose";

const isAuthenticatedUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string = req.headers.authorization || "";
    token = token?.split(" ")[1];
    if (!token) {
      return next(new ApiError("Please Login to access this resouce", 401));
    }
    ``;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    console.log({ decodedData });

    let user = await User.findById(decodedData.id);
    if(user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

// middleware to authorize user with specific roles

const authorizeRoles = (...roles: Roles[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError("Please Login to access this resouce", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
