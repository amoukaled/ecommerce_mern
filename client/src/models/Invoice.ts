import { Category } from "./StockItem"

export interface UserAddress {
  country: Country
  city: City
  street: string
  building: string
  floor: string
}

export type Country = "Lebanon"

export const countries: Country[] = ["Lebanon"]

export type City = "Beirut" | "Tripoli" | "Tyre" | "Sidon"

export const cities: City[] = ["Beirut", "Tripoli", "Tyre", "Sidon"]

export interface IInvoice {
  createdAt: number
  _id: string
  to: string
  items: IInvoiceItem[]
  address: UserAddress
  delivered: boolean
}

export interface IInvoiceItem {
  currency: string
  discount: number
  price: number
  quantity: number
  category: Category
  title: string
  _id: string
}

export class InvoiceItem implements IInvoiceItem {
  currency: string
  discount: number
  price: number
  quantity: number
  category: Category
  title: string
  _id: string

  constructor(item: IInvoiceItem) {
    this.currency = item.currency
    this.discount = item.discount
    this.price = item.price
    this.quantity = item.quantity
    this.category = item.category
    this.title = item.title
    this._id = item._id
  }

  getDiscountedPrice = function (this: InvoiceItem) {
    const rate = this.discount > 0 ? this.discount / 100 : 0
    const discountAmount = this.price * rate
    const discountedPrice = this.price - discountAmount
    return discountedPrice
  }

  getTotalPrice = function (this: InvoiceItem) {
    const total = this.getDiscountedPrice() * this.quantity
    return total
  }
}

export class Invoice implements IInvoice {
  createdAt: number
  _id: string
  to: string
  items: InvoiceItem[]
  address: UserAddress
  delivered: boolean

  constructor(item: IInvoice) {
    this.createdAt = item.createdAt
    this._id = item._id
    this.to = item.to
    this.delivered = item.delivered
    this.address = item.address
    this.items = item.items.map((itm) => new InvoiceItem(itm))
  }

  ///
  getBill = function (this: Invoice) {
    return this.items.reduce<number>((prev, curr) => {
      return prev + curr.getTotalPrice()
    }, 0)
  }
}
