import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import ApiError from "../utils/errorhander";
import sendToken from "../utils/jwtToken";
import { UserRequest } from "../commonDto/user.dto";

const Signup = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    const user = new User(req.body);
    await user.save();
    return sendToken(user, 200, res);
  }
);

const login = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ApiError("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ApiError("Invalid email or password", 401));
    }
    return sendToken(user, 200, res);
  }
);

const userData = async (req: UserRequest, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "user data get successfully",
      data: req.user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

const updateUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    console.log({ body: req.body, id: req.user });

    const updatedUser = await User.findByIdAndUpdate(req.user?._id, req.body);

    if (!updatedUser) {
      return next(new ApiError("User not found", 404));
    }
    return res
      .status(200)
      .json({ success: true, message: "User updated", data: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

const deleteUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    console.log({ body: userId });
    const updatedUser = await User.findByIdAndDelete(userId, req.body);
console.log({updatedUser});

    if (!updatedUser) {
      return next(new ApiError("User not found", 404));
    }
    return res
      .status(200)
      .json({ success: true, message: "User Delete Succesfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

export { Signup, login, userData, updateUser, deleteUser };
