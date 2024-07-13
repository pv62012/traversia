import mongoose, { Document, Model, Schema } from "mongoose";
import validator from "validator";

export interface IProduct extends Document {
  name: string;
  qt: number;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name of product."],
    },
    qt: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
