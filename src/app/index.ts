import express, { Express, json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(json())
app.use(routes)

export default app
