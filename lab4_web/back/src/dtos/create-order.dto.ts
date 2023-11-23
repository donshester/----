import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

class ProductInOrderDto {
  @IsNotEmpty({ each: true, message: 'Product ID is required' })
  @IsUUID()
  productId: string

  @IsNotEmpty({ each: true, message: 'Quantity is required' })
  @IsNumber()
  quantity: number
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product must be included in the order' })
  @ArrayNotEmpty({ message: 'At least one product must be included in the order' })
  @ValidateNested({ always: true, each: true })
  @Type(() => ProductInOrderDto)
  products: ProductInOrderDto[]
}
