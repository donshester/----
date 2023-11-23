import express from 'express'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { CreateUserDto } from '../dtos/create-user.dto'
import { userController } from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UpdateUserDto } from '../dtos/update-user.dto'

const router = express.Router()

router.post('/create', validationMiddleware(CreateUserDto), userController.createUser)
router.get('/me', authMiddleware, userController.getMe)
router.put('/me', authMiddleware, validationMiddleware(UpdateUserDto), userController.updateUser)
router.delete('/me', authMiddleware, userController.deleteUser)
export default router
