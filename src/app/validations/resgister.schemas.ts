import joi from './joi'

export const createRegister = joi.object({
  type: joi.number().required(),
  value: joi.number().required(),
  date: joi.date().required(),
  category: joi.string().required(),
  description: joi.string(),
})

export const updateRegister = joi.object({
  type: joi.number(),
  value: joi.number(),
  date: joi.date(),
  category: joi.string(),
  description: joi.string(),
})

export const deleteRegister = joi.object({
  id: joi.number().required(),
})
