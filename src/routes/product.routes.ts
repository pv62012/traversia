import express from "express";
import { validate } from "express-validation";
import { createProductValidation, loginValidation, userUpdateValidation } from "../validators";

import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth";
import Roles from "../commonDto/roles.dto";
import {
  createProduct,
  deleteProduct,
  getAll,
  updateProduct,
} from "../controllers/product.controller";

var router = express.Router();

router.route("/").get(getAll);

router
  .route("/")
  .post(
    isAuthenticatedUser,
    authorizeRoles(Roles.ADMIN),
    validate(createProductValidation),
    createProduct
  );

router
  .route("/:productId")
  .put(
    isAuthenticatedUser,
    authorizeRoles(Roles.ADMIN),
    validate(createProductValidation),
    updateProduct
  );

router
  .route("/:productId")
  .delete(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), deleteProduct);

export default router;
