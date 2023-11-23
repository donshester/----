import express from 'express'

import { manufacturerController } from '../controllers/manufacturer.controller'
import { validationMiddleware } from '../middlewares/validation.middleware'
import { UuidDto } from '../dtos/manufacturer.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRoles } from '../entities/user.entity'
import { CreateManufacturerDto } from '../dtos/create-manufacturer.dto'
import { setRoleMiddleware } from '../middlewares/roles.middleware'
import { UpdateManufacturerDto } from '../dtos/update-manufacturer.dto'

const router = express.Router()

router.get('/all', manufacturerController.getAllManufacturers)
router.get('/:id', authMiddleware, validationMiddleware(undefined, UuidDto), manufacturerController.getManufacturerById)
router.post(
  '/',
  setRoleMiddleware(UserRoles.ADMIN),
  authMiddleware,
  validationMiddleware(CreateManufacturerDto),
  manufacturerController.createManufacturer,
)
router.put(
  '/:id',
  setRoleMiddleware(UserRoles.ADMIN),
  authMiddleware,
  validationMiddleware(UpdateManufacturerDto, UuidDto),
  manufacturerController.updateManufacturer,
)
router.delete(
  '/:id',
  setRoleMiddleware(UserRoles.ADMIN),
  authMiddleware,
  validationMiddleware(undefined, UuidDto),
  manufacturerController.deleteManufacturer,
)

export default router
