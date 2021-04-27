import { Document, Schema, model, Model, Types } from "mongoose"
import validator from "validator"
import PasswordUtils from "../utils/passwordUtils"
import { AddressDocument, AddressSchema } from "./Address"

// Roles
export enum Role {
  user = "USER",
  admin = "ADMIN",
}

export type UserDocument = Document & {
  email: string
  hash: string
  salt: string
  role: string
  invoices: Types.ObjectId[]
  address: AddressDocument
}

export interface UserModel extends Model<UserDocument> {
  login: (
    this: UserModel,
    email: string,
    password: string
  ) => Promise<UserDocument>
  findByEmail: (this: UserModel, email: string) => Promise<UserDocument | null>
}

const UserSchema = new Schema<UserDocument, UserModel>({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an email."],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email."],
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  invoices: {
    type: [Types.ObjectId],
    ref: "Invoice",
    // type" [InvoiceSchema]
    required: true,
  },
})

// Statics
UserSchema.statics.login = async function (
  this: UserModel,
  email: string,
  password: string
): Promise<UserDocument> {
  const record = await this.findOne({ email: email.toLocaleLowerCase() })

  if (record) {
    const isAuth: boolean = PasswordUtils.validPassword(
      password,
      record.hash,
      record.salt
    )

    if (isAuth) {
      return record
    }

    throw new TypeError("Incorrect password.")
  }

  throw new TypeError("Email doesn't exist.")
}

UserSchema.statics.findByEmail = async function (
  this: UserModel,
  email: string
): Promise<UserDocument | null> {
  const record = await this.findOne({ email: email.toLocaleLowerCase() })
  return record
}

const User = model<UserDocument, UserModel>("User", UserSchema)

export default User
