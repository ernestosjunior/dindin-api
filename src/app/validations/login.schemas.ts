import joi from './joi'

export const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})
