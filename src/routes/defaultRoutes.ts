import { Router } from "express"
import { getItemsController } from "../controllers/defaultController"

const router = Router()

router.get("/items", getItemsController)

export default router
