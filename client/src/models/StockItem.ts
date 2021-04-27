export interface IStockItem {
  _id: string
  title: string
  price: number
  currency: string
  category: Category
  quantity: number
  discount: number
  image: string
  demand: number
}

export class StockItem implements IStockItem {
  _id: string
  title: string
  price: number
  currency: string
  category: Category
  quantity: number
  discount: number
  image: string
  demand: number

  constructor(item: IStockItem) {
    this._id = item._id
    this.title = item.title
    this.price = item.price
    this.currency = item.currency
    this.category = item.category
    this.quantity = item.quantity
    this.discount = item.discount
    this.image = item.image
    this.demand = item.demand
  }

  getDiscountedPrice = function (this: StockItem) {
    const rate = this.discount > 0 ? this.discount / 100 : 0
    const discountAmount = this.price * rate
    const discountPrice = this.price - discountAmount
    return discountPrice
  }

  getTotalPrice = function (this: StockItem) {
    const total = this.getDiscountedPrice() * this.demand
    return total
  }
}

export type Category =
  | "Mobiles"
  | "Computers"
  | "Appliances"
  | "Electronics"
  | "All"
export const categories: Category[] = [
  "All",
  "Mobiles",
  "Computers",
  "Appliances",
  "Electronics",
]
