import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/errorhander";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, any>;
  path?: string;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ApiError(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue as Object)} Entered`;
    err = new ApiError(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web Token is invalid, Try again";
    err = new ApiError(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is Expired, Try again";
    err = new ApiError(message, 400);
  }

  res.status(err.statusCode as number).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
