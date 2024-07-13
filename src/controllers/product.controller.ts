import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import ApiError from "../utils/errorhander";

const getAll = async (req: any, res: Response) => {
  try {
    const data = await Product.find();
    return res.status(200).json({
      success: true,
      message: "product get successfully",
      data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

const createProduct = async (req: any, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

const updateProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return next(new ApiError("Please provide a product id", 404));
    }
    const product = await Product.findByIdAndUpdate(productId, req.body);
    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return next(new ApiError("Please provide a product id", 404));
    }
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return next(new ApiError("Product not found", 404));
    }
    return res.status(201).json({
      success: true,
      message: "Product delete successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Something went wrong" });
  }
};

export { getAll, createProduct, updateProduct, deleteProduct };
