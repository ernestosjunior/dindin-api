import { Request, Response } from 'express'
import knexInstance from '../database'
import { Register } from '../database/interfaces'
import { registerSchemas } from '../validations'

export const createRegister = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { type, value, date, category, description } = req.body
  const { id: user_id } = req.user

  try {
    const { error } = registerSchemas.createRegister.validate(req.body)

    if (error) {
      return res.status(400).json({ success: false, error })
    }

    const register = await knexInstance<Register>('registers')
      .insert({
        user_id,
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

export const updateRegister = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { type, value, date, category, description } = req.body
  const { id } = req.params
  const { id: user_id } = req.user

  try {
    const { error } = registerSchemas.updateRegister.validate(req.params)

    if (error) {
      return res.status(400).json({ success: false, error })
    }

    const register = await knexInstance<Register>('registers')
      .select()
      .where({ id: Number(id), user_id })
      .first()

    if (!register) {
      return res.status(400).json({
        success: false,
        error: 'Register not found or does not belong to the user.',
      })
    }

    const registerUpdated = await knexInstance<Register>('registers')
      .update({
        type,
        value,
        date,
        category,
        description,
      })
      .returning('*')

    if (!registerUpdated.length) {
      return res
        .status(400)
        .json({ success: false, error: 'Failed to update register.' })
    }

    return res.status(200).json({ success: true, data: registerUpdated })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

export const deleteRegister = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params
  const { id: user_id } = req.user

  try {
    const register = await knexInstance<Register>('registers')
      .select()
      .where({ id: Number(id), user_id })
      .first()

    if (!register) {
      return res.status(400).json({
        success: false,
        error: 'Register not found or does not belong to the user.',
      })
    }

    const deletedRegister = await knexInstance<Register>('registers')
      .where({ id: Number(id) })
      .del()
      .returning(['id', 'type', 'value', 'category', 'description'])

    if (!deletedRegister.length) {
      return res
        .status(400)
        .json({ success: false, error: 'Failed to delete register.' })
    }

    return res.status(200).json({ success: true, data: deletedRegister })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
