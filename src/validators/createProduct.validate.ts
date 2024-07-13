import { Joi } from "express-validation";

const createProductValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    qt: Joi.number(),
    price: Joi.number(),
    description: Joi.string(),
  }),
};

export default createProductValidation;
