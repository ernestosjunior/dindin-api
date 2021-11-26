import { Router } from 'express'
import { userControllers } from '../../app/controllers'
import auth from '../middlewares/auth'

const userRoutes: Router = Router()

userRoutes.post('/new', userControllers.createUser)

userRoutes.use(auth)
userRoutes.patch('/update', userControllers.updateUser)
userRoutes.post('/password', userControllers.updatePassword)
userRoutes.delete('/delete', userControllers.deleteUser)

export default userRoutes
