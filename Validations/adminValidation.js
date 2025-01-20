import Joi from "joi";
import BaseValidation from "./baseValidations.js";

class AdminValidation extends BaseValidation {
  static validateSignup(req, res, next) {
    const schema = Joi.object({
      ...BaseValidation.getSharedSignupSchema(),
      role: Joi.string()
        .valid("admin", "superadmin")
        .required()
        .messages({
          "any.only": "Role must be either 'admin' or 'superadmin'",
        }),
      adminCode: Joi.string()
        .required()
        .messages({
          "string.empty": "Admin code is required",
        }),
    });

    BaseValidation.validateRequest(req, res, next, schema);
  }
}

export default AdminValidation;
