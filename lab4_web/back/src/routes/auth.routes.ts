import express from 'express'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { authController } from '../controllers/auth.controller'
import { LoginUserDto } from '../dtos/login-user.dto'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/login', validationMiddleware(LoginUserDto), authController.loginUser)
router.post('/logout', authMiddleware, authController.logoutUser)

export default router
