import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import knexInstance from '../../app/database'
import { User } from '../../app/database/interfaces'
import { userSchemas } from '../validations'

export async function createUser(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body

  try {
    const { error } = userSchemas.createUser.validate(req.body)

    if (error) {
      return res.status(400).json({ success: false, error })
    }

    const users = await knexInstance<User>('users').select().where({ email })

    if (users.length) {
      return res
        .status(400)
        .json({ success: false, error: 'E-mail already registered.' })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await knexInstance<User>('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashPassword,
      })
      .returning(['id', 'first_name', 'last_name', 'email'])

    if (!users.length) {
      return res
        .status(400)
        .json({ success: false, error: 'Failed to register user.' })
    }

    return res.status(200).json({ success: true, data: user })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
