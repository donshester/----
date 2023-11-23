import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  country: string

  @IsDateString()
  foundationDate?: Date
}
