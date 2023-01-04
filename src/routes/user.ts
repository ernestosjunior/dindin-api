import { FastifyInstance } from 'fastify'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import status from 'http-status'
import { prisma } from '../config/prisma'
import { authenticate } from '../plugins/authenticate'
import { User } from '@prisma/client'

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (req, res) => {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUserBody.parse(req.body)

    try {
      const hash = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({
        data: { name, email, password: hash },
      })
      const { password: userPassword, ...dataUser } = user

      res.status(status.CREATED).send(dataUser)
    } catch (error) {
      res.status(status.BAD_REQUEST).send()
    }
  })

  fastify.get('/users', { onRequest: [authenticate] }, async (req, res) => {
    try {
      const user: User | null = await prisma.user.findUnique({
        where: { id: req.user.sub },
      })

      if (!user) res.status(status.BAD_REQUEST).send('User not found.')

      const { password: userPassword, ...dataUser } = user as User

      res.status(status.OK).send(dataUser)
    } catch (error) {
      res.status(status.BAD_REQUEST).send()
    }
  })
}
