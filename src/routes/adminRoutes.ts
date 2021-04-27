import { Router } from "express"
import { ensureAdmin, ensureAuthenticated } from "../config/passport"
import AdminController from '../controllers/adminController'

const router = Router()

// /api/admin

router.post("/items/create",ensureAuthenticated, ensureAdmin, AdminController.createItem)

router.get("/items",ensureAuthenticated, ensureAdmin, AdminController.getItems)

router.get("/items/:id",ensureAuthenticated, ensureAdmin, AdminController.getItemById)

router.patch("/items/:id",ensureAuthenticated, ensureAdmin, AdminController.patchItem)

router.delete("/items/:id",ensureAuthenticated, ensureAdmin, AdminController.deleteItem)

export default router
