import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().required().messages({
      "any.required": "Username is required",
      "string.empty": "Username is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password is required",
    }),
  });

  export {userSchema};