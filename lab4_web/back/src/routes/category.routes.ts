import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { categoryController } from '../controllers/category.controller'
import { setRoleMiddleware } from '../middlewares/roles.middleware'
import { UserRoles } from '../entities/user.entity'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { CreateCategoryDto } from '../dtos/create-category.dto'

const router = Router()

router.get('/all', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.post(
  '/',
  [setRoleMiddleware(UserRoles.ADMIN), authMiddleware, validationMiddleware(CreateCategoryDto)],
  categoryController.createCategory,
)
router.put(
  '/:id',
  [setRoleMiddleware(UserRoles.ADMIN), authMiddleware, validationMiddleware(CreateCategoryDto)],
  categoryController.updateCategory,
)
router.delete('/:id', [setRoleMiddleware(UserRoles.ADMIN), authMiddleware], categoryController.deleteCategory)

export default router
