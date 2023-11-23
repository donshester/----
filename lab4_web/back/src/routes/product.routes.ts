import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { CreateProductDto } from '../dtos/create-product.dto'
import { setRoleMiddleware } from '../middlewares/roles.middleware'
import { UserRoles } from '../entities/user.entity'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { UuidDto } from '../dtos/manufacturer.dto'

const router = Router()
const productController = new ProductController()

router.get('/', productController.getAllProducts)
router.get('/:id', authMiddleware, validationMiddleware(undefined, UuidDto), productController.getProductById)
router.post(
  '/',
  setRoleMiddleware(UserRoles.ADMIN),
  authMiddleware,
  validationMiddleware(CreateProductDto),
  productController.createProduct,
)
router.put(
  '/:id',
  setRoleMiddleware(UserRoles.ADMIN),
  authMiddleware,
  validationMiddleware(CreateProductDto, UuidDto),
  productController.updateProduct,
)
router.delete(
  '/:id',
  setRoleMiddleware(UserRoles.ADMIN),
  authMiddleware,
  validationMiddleware(undefined, UuidDto),
  productController.deleteProduct,
)

export default router
