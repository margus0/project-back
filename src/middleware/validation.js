/* eslint-disable consistent-return */
const Joi = require('joi');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
    re_password: Joi.ref('password'),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const err = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    return res.status(400).send({
      err,
    });
  }
}

module.exports = {
  validateUser,
};
