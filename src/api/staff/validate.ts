import * as Joi from "joi";

export default {
  staffLogin: {
    payload: Joi.object({
      user_id: Joi.string().required(),
      password: Joi.string().required(),
      domain: Joi.string().optional(),
    }),
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  },
};
