import { NextFunction, Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

export function validationMiddleware<T extends object, T1 extends object>(
  dtoBodyClass?: new () => T,
  dtoParamsClass?: new () => T1,
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let validationErrors: string[] = []

    if (req.body && dtoBodyClass) {
      const dtoBodyInstance = plainToInstance(dtoBodyClass, req.body)
      const errorsBody = await validate(dtoBodyInstance)

      if (errorsBody.length > 0) {
        validationErrors.push(...errorsBody.flatMap(formatError))
      }
    }

    if (req.params && dtoParamsClass) {
      const dtoParamsInstance = plainToInstance(dtoParamsClass, req.params)
      const errorsParams = await validate(dtoParamsInstance)

      if (errorsParams.length > 0) {
        validationErrors.push(...errorsParams.flatMap(formatError))
      }
    }

    if (validationErrors.length > 0) {
      res.status(400).json({ status: 400, message: 'Request validation error', errors: validationErrors })
    } else {
      next()
    }
  }
}

function formatError(error: ValidationError) {
  const constraints = error.constraints || {}
  return Object.values(constraints)
}
