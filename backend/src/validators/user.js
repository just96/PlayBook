import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required(),
});

export const validateUser = (data) => userSchema.validate(data);
