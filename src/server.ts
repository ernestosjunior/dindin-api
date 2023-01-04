import Fastify from 'fastify'
import * as dotenv from 'dotenv'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { userRoutes, authRoutes, categoryRoutes, releaseRoutes } from './routes'

dotenv.config()

async function start() {
  const fastify = Fastify({ logger: true })
  const port: number = (process.env.PORT && Number(process.env.PORT)) || 3333

  await fastify.register(cors, { origin: true })
  await fastify.register(jwt, { secret: process.env.JWT_SECRET! })
  await fastify.register(userRoutes)
  await fastify.register(authRoutes)
  await fastify.register(categoryRoutes)
  await fastify.register(releaseRoutes)

  try {
    await fastify.listen({ port })
  } catch (err) {
    fastify.log.error(err)
  }
}

start()
