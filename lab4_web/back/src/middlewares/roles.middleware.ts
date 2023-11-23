import { NextFunction, Request, Response } from 'express'
import { UserRoles } from '../entities/user.entity'

export const setRoleMiddleware = (requiredRole?: UserRoles) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.role = requiredRole
    next()
  }
}
