import { Schema, Document } from "mongoose"

export type AddressDocument = Document & {
  country: string
  city: string
  street: string
  building: string
  floor: string
}

export const AddressSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)
