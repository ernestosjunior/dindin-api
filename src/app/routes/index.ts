import { Router, Request, Response } from 'express'
import userRoutes from './user.routes'
import loginRoutes from './login.routes'
import registerRoutes from './register.routes'

const routes: Router = Router()

routes.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    success: true,
    message: {
      name: 'dindin-api',
      version: '1.0.0',

      author: 'Ernesto Junior <ernesto.sjunior@hotmail.com>',
    },
  })
})

routes.use(loginRoutes)
routes.use('/user', userRoutes)
routes.use('/register', registerRoutes)

export default routes
