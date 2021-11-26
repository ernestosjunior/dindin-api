import joi from './joi'

export const createRegister = joi.object({
  type: joi.number().required(),
  value: joi.number().required(),
  date: joi.date().required(),
  category: joi.string().required(),
  description: joi.string(),
})
