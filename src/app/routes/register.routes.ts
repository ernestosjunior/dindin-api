import { Router } from 'express'
import { registerControllers } from '../controllers'
import auth from '../middlewares/auth'

const registerRoutes: Router = Router()

registerRoutes.use(auth)
registerRoutes.post('/new', registerControllers.createRegister)
registerRoutes.patch('/update/:id', registerControllers.updateRegister)
registerRoutes.delete('/delete/:id', registerControllers.deleteRegister)
registerRoutes.get('/', registerControllers.getAllRegisters)
registerRoutes.get('/:id', registerControllers.getRegister)

export default registerRoutes
