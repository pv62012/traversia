import express from "express";
import { validate } from "express-validation";
import {
  loginValidation,
  UserRegistrationValidator,
  userUpdateValidation,
} from "../validators";
import {
  deleteUser,
  login,
  Signup,
  updateUser,
  userData,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth";
import Roles from "../commonDto/roles.dto";

var router = express.Router();

//User Registration
router.route("/signup").post(validate(UserRegistrationValidator), Signup);

router.route("/login").post(validate(loginValidation), login);

router
  .route("/")
  .put(isAuthenticatedUser, validate(userUpdateValidation), updateUser);

router.route("/me").get(isAuthenticatedUser, userData);

router
  .route("/:userId")
  .delete(isAuthenticatedUser, authorizeRoles(Roles.ADMIN), deleteUser);

export default router;
