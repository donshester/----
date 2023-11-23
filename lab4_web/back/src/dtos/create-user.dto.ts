import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator'
import { User } from '../entities/user.entity'
import { IsUnique } from '../validators/email.validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string

  @IsNotEmpty()
  @IsString()
  @IsUnique(User, 'login')
  login: string

  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User, 'email')
  email: string

  @IsPhoneNumber()
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string

  @IsNotEmpty()
  @IsString()
  password: string
}
