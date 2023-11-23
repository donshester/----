import { Request, Response, NextFunction } from 'express'
import { CreateOrderDto } from '../dtos/create-order.dto'
import { orderService } from '../services/order.service'
import { userService } from '../services/user.service'

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.userId
    const dto: CreateOrderDto = req.body
    try {
      const user = await userService.findUserById(userId)
      const newOrder = await orderService.createOrder(user, dto)
      const productsInOrder = newOrder.products.map((productInOrder) => ({
        id: productInOrder.product.id,
        name: productInOrder.product.name,
        price: productInOrder.product.price,
        unit: productInOrder.product.unit,
        quantity: productInOrder.quantity,
      }))
      res.status(201).json({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        products: productsInOrder,
        orderId: newOrder.id,
        createdAt: newOrder.createdAt,
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserOrderHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.userId

    try {
      const user = await userService.findUserById(userId)
      const orderHistory = await orderService.getUserOrders(user)

      const modifiedOrderHistory = orderHistory.map((order) => ({
        id: order.id,
        createdAt: order.createdAt,
        products: order.products.map((productInOrder) => ({
          id: productInOrder.id,
          quantity: productInOrder.quantity,
          product: {
            id: productInOrder.product.id,
            name: productInOrder.product.name,
            unit: productInOrder.product.unit,
            price: productInOrder.product.price,
            manufacturer: {
              id: productInOrder.product.manufacturer.id,
              name: productInOrder.product.manufacturer.name,
              country: productInOrder.product.manufacturer.country,
              foundationDate: productInOrder.product.manufacturer.foundationDate,
            },
          },
        })),
      }))

      res.json(modifiedOrderHistory)
    } catch (error) {
      next(error)
    }
  }
  async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allOrders = await orderService.getAllOrders()
      res.json(allOrders)
    } catch (error) {
      next(error)
    }
  }
}

export const orderController = new OrderController()
