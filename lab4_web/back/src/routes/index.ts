import express from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import manufacturerRoutes from './manufacturer.routes'
import categoryRoutes from './category.routes'
import productRoutes from './product.routes'
import orderRoutes from './order.routes'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/manufacturers', manufacturerRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)

export default router
