import { Request, Response, NextFunction, raw } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { ApiError } from '../exceptions/api.exception'
import { userService } from '../services/user.service'
import { UserRoles } from '../entities/user.entity'

declare global {
  namespace Express {
    interface Request {
      user?: any
      role?: UserRoles
    }
  }
}
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies ? req.cookies['token'] : undefined
  try {
    if (!token) {
      throw new ApiError('Unauthorized - Missing token', 401)
    }

    const decodedToken = verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.user = decodedToken

    const requiredRole = req.role as UserRoles

    if (requiredRole) {
      const user = await userService.findUserById(decodedToken.userId)

      if (!user || user.role !== requiredRole) {
        throw new ApiError('Forbidden - Insufficient permissions', 403)
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}
