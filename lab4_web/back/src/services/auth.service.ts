import { AppDataSource } from '../dataSource'
import { User } from '../entities/user.entity'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { LoginUserDto } from '../dtos/login-user.dto'
import { ApiError } from '../exceptions/api.exception'

export class AuthService {
  private readonly userRepository = AppDataSource.getRepository(User)

  async login(dto: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ login: dto.login })

    if (!user) {
      throw new ApiError('Invalid login or password', 401)
    }

    if (!(await compare(dto.password, user.password))) {
      throw new ApiError('Invalid login or password', 401)
    }

    const expiresIn = dto.rememberMe ? '7d' : '1h'

    return this.generateToken(user, expiresIn)
  }

  private generateToken(user: User, expiresIn: string): string {
    const payload = {
      userId: user.id,
      login: user.login,
    }

    const token = sign(payload, process.env.JWT_SECRET as string, { expiresIn })
    return token
  }
}

export const authService = new AuthService()
