import { createContext, useState } from "react"
import { checkoutApi } from "../api/invoices"
import CartItem from "../models/CartItem"

export interface ICart {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  clearItems: () => void
  checkout: (successCb: (id: string) => void) => Promise<void>
}

export const CartContext = createContext<ICart | null>(null)

// TODO use reducer
const CartProvider = (props: any) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    const newItems = items.slice()
    newItems.push(item)
    setItems(newItems)
  }

  const removeItem = (itemId: string) => {
    const newItems = items.filter((item) => item._id !== itemId)
    setItems(newItems)
  }

  const clearItems = () => {
    setItems([])
  }

  const checkout = async (successCb: (id:string) => void) => {
    const dto = items.map((item) => item.dto())
    await checkoutApi(dto, (id: string) => {
      clearItems()
      successCb(id)
    })
  }

  return (
    <CartContext.Provider
      value={{ items: items, addItem, removeItem, clearItems, checkout }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
