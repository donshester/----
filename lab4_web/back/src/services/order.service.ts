import { ApiError } from '../exceptions/api.exception'
import { AppDataSource } from '../dataSource'
import { User } from '../entities/user.entity'
import { Order } from '../entities/order.entity'
import { Product } from '../entities/product.entity'
import { CreateOrderDto } from '../dtos/create-order.dto'
import { OrderProduct } from '../entities/order-product.entity'

export class OrderService {
  private readonly userRepository = AppDataSource.getRepository(User)
  private readonly orderRepository = AppDataSource.getRepository(Order)
  private readonly orderProductRepository = AppDataSource.getRepository(OrderProduct)
  private readonly productRepository = AppDataSource.getRepository(Product)

  async createOrder(user: User, orderDto: CreateOrderDto): Promise<Order> {
    const orderProducts: OrderProduct[] = []

    for (const productInOrder of orderDto.products) {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .where('product.id = :id', { id: productInOrder.productId })
        .addSelect('product.quantity')
        .getOne()
      if (!product || product.quantity < productInOrder.quantity) {
        throw new ApiError('Invalid product or insufficient quantity', 400)
      }
      product.quantity -= productInOrder.quantity
      await this.productRepository.save(product)
      const orderProduct = this.orderProductRepository.create({ quantity: productInOrder.quantity, product: product })
      orderProducts.push(orderProduct)
    }
    console.log(orderProducts)
    const order = new Order()

    order.user = user

    order.products = orderProducts
    return await this.orderRepository.save(order)
  }

  async getUserOrders(user: User): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        where: { user: { id: user.id } },
        relations: {
          products: { product: { manufacturer: true } },
        },
        order: { createdAt: 'DESC' },
      })

      return orders
    } catch (error) {
      throw new ApiError('Failed to fetch user orders', 500)
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const allOrders = await this.orderRepository.find({
        order: { createdAt: 'DESC' },
        relations: ['user', 'products', 'products.product', 'products.product.manufacturer'],
      })

      return allOrders
    } catch (error) {
      throw new ApiError('Failed to fetch all orders', 500)
    }
  }
}

export const orderService = new OrderService()
