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
};
