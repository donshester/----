import { NextFunction, Response, Request } from 'express'
import { ApiError } from '../exceptions/api.exception'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message, code: err.status })
  } else {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
