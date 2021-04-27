import { Schema, model, Document, Model } from "mongoose"
import { AddressDocument, AddressSchema } from "./Address"
import { InvoiceItemDocument, InvoiceItemSchema } from "./InvoiceItem"

export type InvoiceDocument = Document & {
  to: string
  items: InvoiceItemDocument[]
  address: AddressDocument
  delivered: boolean
}

export interface InvoiceModel extends Model<InvoiceDocument> {}

export const InvoiceSchema = new Schema<InvoiceDocument, InvoiceModel>(
  {
    to: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    items: [InvoiceItemSchema],
    address: {
      type: AddressSchema,
      required: true,
    },
    delivered: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

const Invoice = model<InvoiceDocument, InvoiceModel>("Invoice", InvoiceSchema)

export default Invoice
