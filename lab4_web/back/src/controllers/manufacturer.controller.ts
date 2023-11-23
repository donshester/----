import { NextFunction, Request, Response } from 'express'
import { manufacturerService } from '../services/manufacturer.service'
import { ApiError } from '../exceptions/api.exception'
import { CreateManufacturerDto } from '../dtos/create-manufacturer.dto'
import { UpdateManufacturerDto } from '../dtos/update-manufacturer.dto'

export class ManufacturersController {
  async getAllManufacturers(req: Request, res: Response): Promise<void> {
    const manufacturers = await manufacturerService.getAllManufacturers()
    res.json(manufacturers)
  }

  async getManufacturerById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const manufacturer = await manufacturerService.getManufacturerById(id)

      if (manufacturer) {
        res.json(manufacturer)
      } else {
        throw new ApiError('Manufacturer not found', 404)
      }
    } catch (error) {
      next(error)
    }
  }

  async createManufacturer(req: Request, res: Response): Promise<void> {
    const createManufacturerDto: CreateManufacturerDto = req.body
    const newManufacturer = await manufacturerService.createManufacturer(createManufacturerDto)
    res.status(201).json(newManufacturer)
  }

  async updateManufacturer(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const dto: UpdateManufacturerDto = req.body
    try {
      const updatedManufacturer = await manufacturerService.updateManufacturer(id, dto)

      if (updatedManufacturer) {
        res.json(updatedManufacturer)
      } else {
        throw new ApiError('Manufacturer not found', 404)
      }
    } catch (error) {
      next(error)
    }
  }

  async deleteManufacturer(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const existingManufacturer = await manufacturerService.getManufacturerById(id)
    try {
      if (!existingManufacturer) {
        throw new ApiError('Manufacturer not found', 404)
      }
      await manufacturerService.deleteManufacturer(id)
      res.json({ message: 'Manufacturer deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}
export const manufacturerController = new ManufacturersController()
