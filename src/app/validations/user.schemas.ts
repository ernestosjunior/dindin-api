import joi from './joi'

export const createUser = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  repeatPassword: joi.ref('password'),
})
