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

  if (!type && !value && !date && !category && !description) {
    return res.status(400).json({
      success: false,
      error: 'It is necessary to send at least one field.',
    })
  }

  try {
    const updateBody = registerSchemas.updateRegister.validate(req.params)

    const updateParams = registerSchemas.updateRegisterParams.validate(
      req.params,
    )

    if (updateBody.error) {
      return res.status(400).json({ success: false, error: updateBody.error })
    }

    if (updateParams.error) {
      return res.status(400).json({ success: false, error: updateParams.error })
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
    const { error } = registerSchemas.deleteRegister.validate(req.params)

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

export const getAllRegisters = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id: user_id } = req.user

  try {
    const registers = await knexInstance<Register>('registers')
      .select()
      .where({ user_id })

    return res.status(200).json({ success: true, data: registers })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

export const getRegister = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params
  const { id: user_id } = req.user

  try {
    const { error } = registerSchemas.getRegister.validate(req.params)

    if (error) {
      return res.status(400).json({ success: false, error })
    }

    const register = await knexInstance<Register>('registers')
      .select()
      .where({ id: Number(id), user_id })

    if (!register) {
      return res.status(400).json({
        success: false,
        error: 'Register not found or does not belong to the user.',
      })
    }

    return res.status(200).json({ success: true, data: register })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
