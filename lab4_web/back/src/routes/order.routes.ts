import { Router } from 'express'
import { setRoleMiddleware } from '../middlewares/roles.middleware'
import { UserRoles } from '../entities/user.entity'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { CreateOrderDto } from '../dtos/create-order.dto'
import { orderController } from '../controllers/order.controller'

const router = Router()
router.post(
  '/create',
  [setRoleMiddleware(UserRoles.USER), authMiddleware],
  validationMiddleware(CreateOrderDto),
  orderController.createOrder,
)
router.get('/my-orders', [setRoleMiddleware(UserRoles.USER), authMiddleware], orderController.getUserOrderHistory)
router.post('/create', [setRoleMiddleware(UserRoles.ADMIN), authMiddleware], orderController.getAllOrders)

export default router
