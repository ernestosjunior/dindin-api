import { Router } from 'express'
import { registerControllers } from '../controllers'
import auth from '../middlewares/auth'

const registerRoutes: Router = Router()

registerRoutes.use(auth)
registerRoutes.post('/new', registerControllers.createRegister)

export default registerRoutes
