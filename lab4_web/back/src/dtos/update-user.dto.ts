import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator'
import { IsUnique } from '../validators/email.validator'
import { User } from '../entities/user.entity'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User, 'email')
  email: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUnique(User, 'login')
  login: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string
}
