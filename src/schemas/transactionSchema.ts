import Joi from "joi";

const transactionSchema = Joi.object({
  marketing_id: Joi.number().integer().required().messages({
    "number.base": "Marketing ID must be a number.",
    "number.integer": "Marketing ID must be a number.",
    "any.required": "Marketing ID is required.",
  }),
  cargo_fee: Joi.number().integer().min(0).required().messages({
    "number.base": "Cargo fee must be a number.",
    "number.integer": "Cargo fee must be a number.",
    "number.min": "Cargo fee must be must be a greater than zero.",
    "any.required": "Cargo fee is required.",
  }),

  total_balance: Joi.number().integer().min(0).required().messages({
    "number.base": "Total balance must be a number.",
    "number.integer": "Total balance must be a number.",
    "number.min": "Total balance must be must be a greater than zero.",
    "any.required": "Total balance is required.",
  }),

  user_id: Joi.number().allow(null).messages({
    "number.base": "User ID must be a number",
  }),
});

export default transactionSchema;
