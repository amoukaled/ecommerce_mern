import { Router } from "express"
import { ensureAdmin, ensureAuthenticated } from "../config/passport"
import { createItem, getItems, patchItem, deleteItem, getItemById } from '../controllers/adminController'

const router = Router()

// /api/admin

// Create item /items/create POST
router.post("/items/create",ensureAuthenticated, ensureAdmin, createItem)

// Read items /items GET
router.get("/items",ensureAuthenticated, ensureAdmin, getItems)

// Read one item /items/:id GET
router.get("/items/:id",ensureAuthenticated, ensureAdmin, getItemById)

// Update item /items/:id PATCH
router.patch("/items/:id",ensureAuthenticated, ensureAdmin, patchItem)

// Delete item /items/:id DELETE
router.delete("/items/:id",ensureAuthenticated, ensureAdmin, deleteItem)

export default router
