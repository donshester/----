import { CreateUserDto } from '../dtos/create-user.dto'
import { userService } from '../services/user.service'
import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { UserTransformer } from '../responses/user.response'
import { UpdateUserDto } from '../dtos/update-user.dto'

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserDto = req.body
      const createdUser = await userService.createUser(userData)

      res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: createdUser,
      })
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.userId
      const userData: UpdateUserDto = req.body

      const updatedUser = await userService.updateUser(userId, userData)

      res.status(204).json({
        status: 204,
        message: 'User updated successfully',
        data: updatedUser,
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.userId
      await userService.deleteUser(userId)
      res.clearCookie('token')
      res.status(200).json({
        status: 200,
        message: 'User deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId
      const me = await userService.findUserById(userId)
      const userResponse = plainToClass(UserTransformer, me)
      res.status(200).json({
        status: 200,
        message: 'User found',
        data: userResponse,
      })
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()
