import mongoose, { Document, Model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Roles from "../commonDto/roles.dto";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Roles;
  createdAt?: Date;
  updatedAt?: Date;
  getJWTToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name."],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email."],
      unique: true,
      validate: [validator.isEmail, "Please Enter Valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minlength: [6, "Password should be greater than 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
  },
  {
    timestamps: true,
  }
);

// generate bcrypt password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT Token
UserSchema.methods.getJWTToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Compare Password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
