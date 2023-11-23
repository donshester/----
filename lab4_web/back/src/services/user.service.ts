import bcrypt from 'bcrypt'
import { AppDataSource } from '../dataSource'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserTransformer } from '../responses/user.response'
import { plainToClass } from 'class-transformer'
import { ApiError } from '../exceptions/api.exception'
import { validate } from 'class-validator'
import { UpdateUserDto } from '../dtos/update-user.dto'

export class UserService {
  private readonly userRepository = AppDataSource.getRepository(User)

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }

  async createUser(userData: CreateUserDto) {
    const { password, phoneNumber, ...other } = userData
    const hashedPassword = await this.hashPassword(password)

    if (phoneNumber) {
      const existingUser = await this.userRepository.findOne({
        where: { phoneNumber: phoneNumber, email: userData.email },
      })
      if (existingUser) {
        throw new ApiError('Phone number is already registered', 409)
      }
    }

    const user = this.userRepository.create({
      ...other,
      password: hashedPassword,
    })

    const createdUser = await this.userRepository.save(user)

    return plainToClass(UserTransformer, createdUser)
  }

  async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneOrFail({ where: { id: userId } })

      const updatedUser = Object.assign(existingUser, userData)

      if (userData.password) {
        updatedUser.password = await this.hashPassword(userData.password)
      }
      return this.userRepository.save(updatedUser)
    } catch (error) {
      throw new ApiError('User not found or unable to update.', 404)
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id: userId } })
      await this.userRepository.remove(user)
    } catch (error) {
      console.log(error)
      throw new ApiError('User not found or unable to delete.', 404)
    }
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id: id })
    if (!user) {
      throw new ApiError('User not found', 404)
    }
    return user
  }
}

export const userService = new UserService()
