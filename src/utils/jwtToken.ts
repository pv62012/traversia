//Create Token and saving in cookie

import { IUser } from "../models/User.model";
import { Response } from "express";

const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = user.getJWTToken();
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
