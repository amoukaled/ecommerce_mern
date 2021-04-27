import { Router } from "express"
import { ensureAuthenticated, ensureUnAuthenticated } from "../config/passport"
import UserController from "../controllers/userController"

const router = Router()

// /api/user

// Auth Routes
// /login POST
router.post(
  "/login",
  ensureUnAuthenticated,
  UserController.loginUser,
  (req: any, res) => {
    const id = req.user?._id
    res.status(200).json({ id })
  }
)

// /register POST
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

// /logout GET
router.get("/logout", ensureAuthenticated, UserController.logoutUser)

// Invoice Routes
// /invoice POST
router.post("/invoice/create", ensureAuthenticated, UserController.postInvoice)

// /invoice/:id Get
router.get("/invoice/:id", ensureAuthenticated, UserController.getInvoice)

// /invoices
router.get("/invoices", ensureAuthenticated, UserController.getAllUserInvoices)

// verify session
router.get("/verify", UserController.verifyUserSession)

// address
router.get("/address", ensureAuthenticated, UserController.getUserAddress)

// export
export default router
