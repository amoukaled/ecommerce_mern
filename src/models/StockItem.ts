import { Schema, Document, model, Model } from "mongoose"

export type StockItemDocument = Document & {
  title: string
  price: number
  currency: string
  category: string
  quantity: number
  discount: number
  image: string
}

export interface StockItemModel extends Model<StockItemDocument> {}

const StockItemSchema = new Schema<StockItemDocument, StockItemModel>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})

const StockItem = model<StockItemDocument, StockItemModel>(
  "StockItem",
  StockItemSchema
)

export default StockItem
