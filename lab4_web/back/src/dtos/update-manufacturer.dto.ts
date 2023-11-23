import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateManufacturerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country: string

  @IsOptional()
  @IsDateString()
  @IsOptional()
  foundationDate?: Date
}
