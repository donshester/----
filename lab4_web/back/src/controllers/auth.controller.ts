import { NextFunction, Request, Response } from 'express'
import { authService } from '../services/auth.service'
import { LoginUserDto } from '../dtos/login-user.dto'

export class AuthController {
  async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: LoginUserDto = req.body
      const token = await authService.login(dto)

      const rememberMe = dto.rememberMe
      const maxAge = rememberMe ? 604800000 : 3600000

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: maxAge,
        sameSite: 'lax',
      })

      res.status(200).json({
        status: 200,
        message: 'Login successful',
      })
    } catch (error) {
      next(error)
    }
  }

  logoutUser(req: Request, res: Response): void {
    res.clearCookie('token')
    delete req.user
    res.status(200).json({ message: 'Logout successful' })
  }
}

export const authController = new AuthController()
