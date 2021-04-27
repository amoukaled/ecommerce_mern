import { Request, Response } from "express"
import StockItem, { StockItemDocument } from "../models/StockItem"
import {
  filterDocumentsToObjects,
  filterDocumentToObject,
} from "../utils/filterUtils"

namespace AdminController {
  export const getItems = async (req: Request, res: Response) => {
    try {
      const items = await StockItem.find()
      const filteredItems = filterDocumentsToObjects(items)

      res.json(filteredItems)
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  }

  export const createItem = async (req: Request, res: Response) => {
    try {
      const item = req.body.item
      await StockItem.create(item)
      res.status(201).end()
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  }

  export const patchItem = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const item: StockItemDocument = req.body.item
      const changes: any = {}

      if (item.title) changes.title = item.title

      if (item.price) changes.price = item.price

      if (item.currency) changes.currency = item.currency

      if (item.category) changes.category = item.category

      await StockItem.findOneAndUpdate(
        { _id: id },
        { $set: changes },
        {
          useFindAndModify: false,
        }
      )
      res.status(200).end()
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  }

  export const getItemById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id

      const item = await StockItem.findById(id)

      if (item) {
        const filtered = filterDocumentToObject(item)
        res.json(filtered)
      } else {
        res.status(404).end()
      }
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  }

  export const deleteItem = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      await StockItem.findOneAndDelete({ _id: id })
      res.status(200).end()
    } catch (e) {
      console.log(e)
      res.status(500).end()
    }
  }
}

export default AdminController
