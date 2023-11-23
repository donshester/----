import { AppDataSource } from '../dataSource'
import { Category } from '../entities/category.entity'
import { ApiError } from '../exceptions/api.exception'
export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category)

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id: id })
    if (!category) {
      throw new ApiError('Category not found', 404)
    }
    return category
  }

  async createCategory(name: string): Promise<Category> {
    const newCategory = this.categoryRepository.create({ name })
    return this.categoryRepository.save(newCategory)
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    const category = await this.getCategoryById(id)
    category.name = name
    return this.categoryRepository.save(category)
  }

  async deleteCategory(id: string): Promise<void> {
    await this.getCategoryById(id)
    await this.categoryRepository.delete(id)
  }
}

export const categoryService = new CategoryService()
