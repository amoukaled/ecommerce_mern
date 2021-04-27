import { NextFunction, Request, Response } from "express"
import passport from "passport"
import { registerErrorHandler } from "../errorHandlers/authHandler"
import Invoice from "../models/Invoice"
import StockItem from "../models/StockItem"
import User, { Role } from "../models/User"
import {
  filterInvoicesToObjects,
  filterInvoiceToObject,
} from "../utils/filterUtils"
import { Types } from "mongoose"
import PasswordUtils from "../utils/passwordUtils"


namespace UserController {
  // Auth
  export const loginUser = passport.authenticate("local")

  export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, address } = req.body

      const hashSalt = PasswordUtils.genPassword(password)

      await User.create({ 
        email,
        hash: hashSalt.hash,
        salt: hashSalt.salt,
        role: Role.user,
        invoices: [],
        address: {
          country: address.country,
          city: address.city,
          street: address.street,
          building: address.building,
          floor: address.floor,
        }
      })
      
      next()
    } catch (err) {
      const errors = registerErrorHandler(err)
      res.status(400).send(errors)
    }
  }

  export const logoutUser = async (req: Request, res: Response) => {
    req.logout()
    res.end()
  }

  // Invoices

  // To post an invoice:
  export const postInvoice = async (req: Request, res: Response) => {
    try {
      // user ID && items
      const userId = req.user
      const items: { itemId: string; quantity: number }[] = req.body.items

      if (userId && items) {
        // extracting the ids
        const ids = items.map((item) => {
          return item.itemId
        })

        // Get all the item docs
        const stockItems = await StockItem.find({ _id: { $in: ids } })

        // Getting the invoices
        const invoiceItems = await Promise.all(
          stockItems.map(async (stockItem) => {
            // Getting the user quantity
            const quantity = items.find(
              (item) => item.itemId === stockItem._id.toString()
            )?.quantity

            if (quantity) {
              // Checking the stock for the neccessary quantity
              if (stockItem.quantity >= quantity) {
                // decrementing the stock and saving aferwards
                stockItem.quantity = stockItem.quantity - quantity
                await stockItem.save()

                // returning the invoice item
                return {
                  item: stockItem._id,
                  discount: stockItem.discount,
                  price: stockItem.price,
                  currency: stockItem.currency,
                  quantity: quantity,
                }
              }
            }
            return null
          })
        )

        // Removing null items
        const filteredInvoices = invoiceItems.filter((item) => item !== null)

        // Getting the user
        const user = await User.findById(userId)

        // Creating the invoice
        // TODO reverse the quantities ifn case of an error
        const invoice = await Invoice.create({
          to: userId,
          items: filteredInvoices,
          delivered: false,
          address: user!!.address
        })
        // const user = await User.findById(userId)
        user?.invoices.push(invoice._id)
        await user?.save()
        res.status(201).json({id: invoice._id})
      } else {
      if (!items){
        res.status(400).end()
      }
        
        res.status(401).end()
      }
    } catch (e) {
      console.log(e)
      res.status(400).end()
    }
  }

  export const getInvoice = async (req: Request, res: Response) => {
    const invId = req.params.id
    const userId = req.user

    if (userId && invId) {
      const user = await User.findById(userId)

      if (user) {
        if (user.invoices.includes(Types.ObjectId(invId))) {
          const invoice = await Invoice.findById(invId).populate("items.item")
          
          if (invoice) {
            const filter = filterInvoiceToObject(invoice)
            res.json(filter)
          }
        } else {
          res.status(403).end()
        }
      }
    }
    res.status(404).end()
  }

  export const getAllUserInvoices = async (req: Request, res: Response) => {
    const userId = req.user

    if (userId) {
      const invoices = await Invoice.find({ to: userId }).populate("items.item")
      const filtered = filterInvoicesToObjects(invoices)
      res.json(filtered)
    }

    res.status(400).end()
  }

  export const verifyUserSession = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const id = req.user
      res.status(200).json({ id })
    } else {
      res.status(200).json({ id: null })
    }
  }

  export const getUserAddress = async (req: Request, res: Response)=>{
    const id = req.user

    if (id) {
      const user = await User.findById(id)
      if (user){
        const address = user.address
        res.json({address})
      }
    }
    res.status(400).end()
  }
}

export default UserController