import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator'
import { AppDataSource } from '../dataSource'
import { User } from '../entities/user.entity'

@ValidatorConstraint({ name: 'isUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [entityClass, property] = args.constraints

    const repository = AppDataSource.getRepository(User)

    const existingEntity = await repository.findOne({
      where: { [property]: value },
    })

    return !existingEntity
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass, property] = args.constraints

    return `${property} must be unique`
  }
}

export function IsUnique(entityClass: any, property: string) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${property} must be unique`,
        context: {
          validation: 'isUnique',
          entityClass,
          property,
        },
      },
      constraints: [entityClass, property],
      validator: IsUniqueConstraint,
    })
  }
}
