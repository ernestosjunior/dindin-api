import joi from './joi'

export const createRegister = joi.object({
  type: joi.number().required(),
  value: joi.number().required(),
  date: joi.string().required(),
  category: joi.string().required(),
  description: joi.string(),
})
