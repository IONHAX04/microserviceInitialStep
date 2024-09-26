import * as Joi from "joi";

export default {
  userLogin: {
    payload: Joi.object({
      // PAYLOAD DATA
      email: Joi.string().required(),
      password: Joi.string().required(),
      domain: Joi.string().optional(),
    }),
    // headers: Joi.object({
    //   authorization: Joi.string().required(),
    // }).unknown(),
  },
  userSignUp: {
    payload: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      domain: Joi.string().optional(),
      firstName: Joi.string().required(),
      middleName: Joi.string().optional(),
      lastName: Joi.string().required(),
      dateOfBirth: Joi.string().required(),
      mobile: Joi.number().required(),
      address: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      pincode: Joi.number().required(),
    }),
  },
};
