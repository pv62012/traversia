import { Joi } from "express-validation";

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default loginValidation;
