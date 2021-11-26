import { Request, Response } from 'express'
import knexInstance from '../database'
import { Register } from '../database/interfaces'
import { registerSchemas } from '../validations'

export const createRegister = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { type, value, date, category, description } = req.body
  const { id } = req.user

  try {
    const { error } = registerSchemas.createRegister.validate(req.body)

    if (error) {
      return res.status(400).json({ success: false, error })
    }

    const register = await knexInstance<Register>('registers')
      .insert({
        user_id: id,
        type,
        value,
        date,
        category,
        description,
      })
      .returning('*')

    if (!register.length) {
      return res
        .status(400)
        .json({ success: false, error: 'Failed to create register.' })
    }

    return res.status(200).json({ success: true, data: register })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
