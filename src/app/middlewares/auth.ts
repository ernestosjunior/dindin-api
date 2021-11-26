import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import knexInstance from '../database'
import { User } from '../database/interfaces'

const apiKey = process.env.API_KEY!

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ success: false, error: 'Token is required.' })
  }

  try {
    const token = authorization.replace('Bearer', '').trim()

    const verifiedToken: any = jwt.verify(token, apiKey)

    const user = await knexInstance<User>('users')
      .select()
      .where({ id: verifiedToken.id })
      .first()

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found.' })
    }

    const { password, ...restUser } = user

    req.user = restUser

    next()
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
}

export default auth
