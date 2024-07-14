import express, { NextFunction, Request, response, Response } from "express";
import { validate } from "express-validation";
import {
  createProductValidation,
  loginValidation,
  userUpdateValidation,
} from "../validators";

import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth";
import Roles from "../commonDto/roles.dto";
import {
  createProduct,
  deleteProduct,
  getAll,
  updateProduct,
} from "../controllers/product.controller";
import { UserRequest, wrapMiddleware } from "../commonDto/user.dto";

var router = express.Router();

router.route("/").get(getAll);

router
  .route("/")
  .post(
    async (req: Request, res: Response, next: NextFunction) =>
      await isAuthenticatedUser(req as UserRequest, res, next),
    wrapMiddleware(authorizeRoles(Roles.ADMIN)),
    validate(createProductValidation),
    wrapMiddleware(createProduct)
  );

router
  .route("/:productId")
  .put(
    wrapMiddleware(isAuthenticatedUser),
    wrapMiddleware(authorizeRoles(Roles.ADMIN)),
    validate(createProductValidation),
    wrapMiddleware(updateProduct)
  );

router
  .route("/:productId")
  .delete(
    wrapMiddleware(isAuthenticatedUser),
    wrapMiddleware(authorizeRoles(Roles.ADMIN)),
    wrapMiddleware(deleteProduct)
  );

export default router;
