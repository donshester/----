import { ApiError } from '../exceptions/api.exception'
import { CreateProductDto } from '../dtos/create-product.dto'
import { Product } from '../entities/product.entity'
import { AppDataSource } from '../dataSource'
import { UpdateProductDto } from '../dtos/update-product.dto'
import { Manufacturer } from '../entities/manufacturer.entity'
import { Category } from '../entities/category.entity'

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product)

  async getAllProducts(sortBy?: string, search?: string): Promise<Product[]> {
    let queryBuilder = this.productRepository.createQueryBuilder('product')

    if (sortBy) {
      queryBuilder = queryBuilder.orderBy(`product.${sortBy}`)
    }

    if (search) {
      queryBuilder = queryBuilder.where('product.name ILIKE :search', { search: `%${search}%` })
    }
    queryBuilder.andWhere('product.quantity > 0').leftJoinAndSelect('product.category', 'category')
    return await queryBuilder.getMany()
  }

  async getProductById(id: string) {
    return this.productRepository.findOne({ where: { id: id }, relations: { category: true, manufacturer: true } })
  }

  async createProduct(dto: CreateProductDto, manufacturer: Manufacturer, category: Category): Promise<Product> {
    const newProduct = this.productRepository.create({
      name: dto.name,
      price: dto.price,
      unit: dto.unit,
      quantity: dto.quantity,
      manufacturer: manufacturer,
      category: category,
    })

    return this.productRepository.save(newProduct)
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({ id: id })

    if (!existingProduct) {
      throw new ApiError('Product not found', 404)
    }

    const updatedProduct = this.productRepository.merge(existingProduct, dto)

    return await this.productRepository.save(updatedProduct)
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id)

    if (result.affected === 0) {
      throw new ApiError('Product not found', 404)
    }
  }
}

export const productService = new ProductService()
