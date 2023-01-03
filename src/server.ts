import Fastify from 'fastify'
import * as dotenv from 'dotenv'
import cors from '@fastify/cors'

dotenv.config()

async function start() {
  const fastify = Fastify({ logger: true })
  const port: number = (process.env.PORT && Number(process.env.PORT)) || 3333

  await fastify.register(cors, { origin: true })

  try {
    await fastify.listen({ port })
  } catch (err) {
    fastify.log.error(err)
  }
}

start()
