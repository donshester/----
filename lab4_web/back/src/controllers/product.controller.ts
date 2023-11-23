import { NextFunction, Request, Response } from 'express'
import { CreateProductDto } from '../dtos/create-product.dto'
import { productService } from '../services/product.service'
import { ApiError } from '../exceptions/api.exception'
import { categoryService } from '../services/category.service'
import { manufacturerService } from '../services/manufacturer.service'

export class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sortBy = req.query.sortBy as string | undefined
      const search = req.query.search as string | undefined

      const allowedSortByValues = ['name', 'price']
      if (sortBy && !allowedSortByValues.includes(sortBy)) {
        throw new ApiError('Incorrect sortBy parameter', 400)
      }

      const products = await productService.getAllProducts(sortBy, search)
      res.json(products)
    } catch (error) {
      next(error)
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const product = await productService.getProductById(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dto: CreateProductDto = req.body
    try {
      const manufacturer = await manufacturerService.getManufacturerById(dto.manufacturerId)
      const category = await categoryService.getCategoryById(dto.categoryId)

      const newProduct = await productService.createProduct(dto, manufacturer, category)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const dto: CreateProductDto = req.body
    try {
      const updatedProduct = await productService.updateProduct(id, dto)
      res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      await productService.deleteProduct(id)
      res.json({ message: 'Product deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}
