import { Request, Response } from "express"
import StockItem from "../models/StockItem"
import { filterDocumentsToObjects } from "../utils/filterUtils"

export const getItemsController = async (req: Request, res: Response) => {
  const items = await StockItem.find()

  if (items) {
    const filtered = filterDocumentsToObjects(items)
    res.json(filtered)
  }

  res.status(500).end()
}
