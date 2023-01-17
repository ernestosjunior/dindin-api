import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/prisma'
import status from 'http-status'
import bcrypt from 'bcryptjs'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth', async (req, res) => {
    const authBody = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = authBody.parse(req.body)

    try {
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) return res.status(status.BAD_REQUEST).send('User not found.')

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword)
        return res.status(status.BAD_REQUEST).send('Invalid credentials.')

      const token = fastify.jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        { sub: user.id, expiresIn: '1d' }
      )

      const { password: userPassword, ...dataUser } = user

      return res.status(status.OK).send({ user: dataUser, token })
    } catch (error: any) {
      return res.status(status.BAD_REQUEST).send(error.message)
    }
  })
}
