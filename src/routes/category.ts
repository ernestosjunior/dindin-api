import { FastifyInstance } from 'fastify'
import { authenticate } from '../plugins/authenticate'
import * as z from 'zod'
import { prisma } from '../config/prisma'
import status from 'http-status'

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post('/category', { onRequest: [authenticate] }, async (req, res) => {
    const createCategoryBody = z.object({ title: z.string() })

    const { title } = createCategoryBody.parse(req.body)

    try {
      const category = await prisma.category.create({
        data: { title, user: { connect: { id: req.user.sub } } },
      })
      return res.status(status.CREATED).send(category)
    } catch (error: any) {
      return res.status(status.BAD_REQUEST).send(error.message)
    }
  })

  fastify.get('/category', { onRequest: [authenticate] }, async (req, res) => {
    try {
      const categories = await prisma.category.findMany({
        where: { userId: req.user.sub },
      })
      return res.status(status.OK).send(categories)
    } catch (error: any) {
      return res.status(status.BAD_REQUEST).send(error.message)
    }
  })
}
