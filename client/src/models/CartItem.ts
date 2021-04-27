import { IStockItem, Category } from "./StockItem"

export interface ICartItem extends IStockItem {
  dto: (this: ICartItem) => { itemId: string; quantity: number }
  getDiscountedPrice: (this: ICartItem) => number
  getTotalPrice: (this: ICartItem) => number
}

export default class CartItem implements ICartItem {
  constructor(
    public _id: string,
    public title: string,
    public price: number,
    public currency: string,
    public category: Category,
    public quantity: number,
    public discount: number,
    public image: string,
    public demand: number
  ) {}

  getDiscountedPrice = function (this: CartItem) {
    const rate = this.discount > 0 ? this.discount / 100 : 0
    const discountAmount = this.price * rate
    const discountPrice = this.price - discountAmount
    return discountPrice
  }

  getTotalPrice = function (this: CartItem) {
    const total = this.getDiscountedPrice() * this.demand
    return total
  }

  dto = function (this: CartItem) {
    return {
      itemId: this._id,
      quantity: this.demand,
    }
  }
}
