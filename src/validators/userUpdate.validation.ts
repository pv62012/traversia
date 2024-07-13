import { Joi } from "express-validation";

const userUpdateValidation = {
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
  }),
};

export default userUpdateValidation;
