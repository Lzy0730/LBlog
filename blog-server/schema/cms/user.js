const Joi = require('joi');
const id = Joi.number().required()
const isEnable = Joi.number().valid(0, 1).required()
const nickname = Joi.string().required()
const avatar = Joi.string().required()
const username = Joi.string().required()
const password = Joi.string().required()
const newPassword = Joi.string().required()
const pageNum = Joi.number().required()
const pageSize = Joi.number().required()

module.exports = {
  login: (req, res, next) => {
    const schema = Joi.object({ username, password })
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  queryUsers: (req, res, next) => {
    const schema = Joi.object({ pageNum, pageSize })
    const { error } = schema.validate(req.query);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updateUser: (req, res, next) => {
    const schema = Joi.object({ id, nickname, avatar }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  updatePassword: (req, res, next) => {
    const schema = Joi.object({ id, newPassword, password }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  enableUser: (req, res, next) => {
    const schema = Joi.object({ id, isEnable }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  },
  deleteUser: (req, res, next) => {
    const schema = Joi.object({ id }).unknown()
    const { error } = schema.validate(req.body);
    if (error) {
      return res.customSend(null, 400, error.details[0].message);
    } else {
      next()
    }
  }
}

