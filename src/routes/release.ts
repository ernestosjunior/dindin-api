import { FastifyInstance } from 'fastify'
import { prisma } from '../config/prisma'
import status from 'http-status'
import { authenticate } from '../plugins/authenticate'
import * as z from 'zod'

export async function releaseRoutes(fastify: FastifyInstance) {
  fastify.post('/release', { onRequest: [authenticate] }, async (req, res) => {
    const createReleaseBody = z.object({
      date: z.string(),
      description: z.string(),
      categoryId: z.string(),
      value: z.number().nonnegative(),
    })

    const { date, description, categoryId, value } = createReleaseBody.parse(
      req.body
    )

    try {
      const release = await prisma.release.create({
        data: {
          date,
          description,
          value,
          category: { connect: { id: categoryId } },
          user: { connect: { id: req.user.sub } },
        },
      })

      return res.status(status.CREATED).send(release)
    } catch (error: any) {
      return res.status(status.BAD_REQUEST).send(error.message)
    }
  })
  fastify.get('/release', { onRequest: [authenticate] }, async (req, res) => {
    try {
      const releases = await prisma.release.findMany({
        where: { userId: req.user.sub },
      })

      return res.status(status.OK).send(releases)
    } catch (error: any) {
      return res.status(status.BAD_REQUEST).send(error.message)
    }
  })
}
