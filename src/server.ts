import Fastify from 'fastify'
import * as dotenv from 'dotenv'

dotenv.config()

async function start() {
  const fastify = Fastify({ logger: true })
  const port: number = (process.env.PORT && Number(process.env.PORT)) || 3333

  try {
    await fastify.listen({ port })
  } catch (err) {
    fastify.log.error(err)
  }
}

start()
