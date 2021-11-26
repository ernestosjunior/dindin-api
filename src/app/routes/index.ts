import { Router } from 'express'
import userRoutes from './user.routes'
import loginRoutes from './login.routes'
import registerRoutes from './register.routes'

const routes: Router = Router()

routes.use(loginRoutes)
routes.use('/user', userRoutes)
routes.use('/register', registerRoutes)

export default routes
