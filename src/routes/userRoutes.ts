import { Router } from "express"
import { ensureAuthenticated, ensureUnAuthenticated } from "../config/passport"
import UserController from "../controllers/userController"

const router = Router()

// /api/user

// Auth Routes
router.post(
  "/login",
  ensureUnAuthenticated,
  UserController.loginUser,
  (req: any, res) => {
    const id = req.user?._id
    res.status(200).json({ id })
  }
)

//
router.post(
  "/register",
  ensureUnAuthenticated,
  UserController.registerUser,
  UserController.loginUser,
  (req: any, res) => {
    const id = req.user?._id

    res.status(200).json({ id })
  }
)

router.get("/logout", ensureAuthenticated, UserController.logoutUser)

// Invoice Routes

router.post("/invoice/create", ensureAuthenticated, UserController.postInvoice)

router.get("/invoice/:id", ensureAuthenticated, UserController.getInvoice)

router.get("/invoices", ensureAuthenticated, UserController.getAllUserInvoices)

router.get("/verify", UserController.verifyUserSession)

router.get("/address", ensureAuthenticated, UserController.getUserAddress)

// export
export default router
