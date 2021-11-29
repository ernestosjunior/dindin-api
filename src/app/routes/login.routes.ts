import { Router } from 'express'
import { loginControllers } from '../../app/controllers'

const loginRoutes: Router = Router()

loginRoutes.post('/login', loginControllers.login)

export default loginRoutes
