import { Schema, Document } from "mongoose"

// TODO double check
export type InvoiceItemDocument = Document & {
  itemId: string
  quantity: number
  discount: number
  price: number
  currency: string
}

export const InvoiceItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "StockItem",
    },
    discount: {
      type: Number,
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
    quantity: {
      type: Number,
    },
  },
  { _id: false }
)
