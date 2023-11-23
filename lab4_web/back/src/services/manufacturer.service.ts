import { Manufacturer } from '../entities/manufacturer.entity'
import { AppDataSource } from '../dataSource'
import { ApiError } from '../exceptions/api.exception'

export class ManufacturersService {
  private readonly manufacturerRepository = AppDataSource.getRepository(Manufacturer)

  async getAllManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturerRepository.find()
  }

  async getManufacturerById(id: string) {
    const manufacturer = await this.manufacturerRepository.findOneBy({ id: id })
    if (!manufacturer) {
      throw new ApiError('Category not found', 404)
    }
    return manufacturer
  }

  async createManufacturer(data: Partial<Manufacturer>): Promise<Manufacturer> {
    const newManufacturer = this.manufacturerRepository.create(data)
    return await this.manufacturerRepository.save(newManufacturer)
  }

  async updateManufacturer(id: string, data: Partial<Manufacturer>) {
    await this.manufacturerRepository.update(id, data)
    return this.manufacturerRepository.findOneBy({ id: id })
  }

  async deleteManufacturer(id: string): Promise<void> {
    await this.manufacturerRepository.delete(id)
  }
}

export const manufacturerService = new ManufacturersService()
