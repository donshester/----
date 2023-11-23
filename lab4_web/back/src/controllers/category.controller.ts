import { categoryService } from '../services/category.service'
import { Request, Response, NextFunction } from 'express'
import { CreateCategoryDto } from '../dtos/create-category.dto'

export class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await categoryService.getAllCategories()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const category = await categoryService.getCategoryById(id)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dto: CreateCategoryDto = req.body
    try {
      const newCategory = await categoryService.createCategory(dto.name)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const dto: CreateCategoryDto = req.body
    try {
      const updatedCategory = await categoryService.updateCategory(id, dto.name)
      res.json(updatedCategory)
    } catch (error) {
      next(error)
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      await categoryService.deleteCategory(id)
      res.json({ message: 'Category deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export const categoryController = new CategoryController()
