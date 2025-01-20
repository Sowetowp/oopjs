import Joi from "joi";

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPasswordError = "Password must be strong. At least one upper case letter, one lower case letter, one digit, one special character, and at least 8 characters long.";

class BaseValidation {
  static validateRequest(req, res, next, schema) {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
      req.body = value;
      next();
    }

  }

  static getSharedSignupSchema() {
    return {
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .trim()
        .lowercase()
        .messages({
          "string.email": "Email must be a valid email",
          "string.empty": "Email is required",
          "any.required": "Email is a required field",
        }),
      password: Joi.string()
        .regex(strongPasswordRegex)
        .required()
        .messages({
          "string.empty": "Password is required",
          "string.pattern.base": stringPasswordError,
        }),
      firstName: Joi.string()
        .required()
        .min(3)
        .max(20)
        .trim()
        .messages({
          "string.empty": "First name is required",
          "string.min": "First name must be at least 3 characters",
          "string.max": "First name must not exceed 20 characters",
        }),
    };
  }
}

export default BaseValidation;