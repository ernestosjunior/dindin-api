import { Router } from 'express'
import { loginControllers } from '../../app/controllers'

const loginRoutes: Router = Router()

loginRoutes.post('/signin', loginControllers.login)

export default loginRoutes
