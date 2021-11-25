import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginSchemas } from '../validations'
import knexInstance from '../database'
import { User } from '../database/interfaces'

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const { error } = loginSchemas.login.validate(req.body)

    if (error) {
      return res.status(400).json({ success: false, error })
    }

    const user = await knexInstance<User>('users')
      .select()
      .where({ email })
      .first()

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found.' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid credentials.' })
    }
    const apiKey = process.env.API_KEY!
    const token = await jwt.sign({ id: user.id }, apiKey, { expiresIn: '1d' })

    const { password: bdPassword, ...restUser } = user

    return res
      .status(200)
      .json({ success: true, data: { user: restUser, token } })
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
