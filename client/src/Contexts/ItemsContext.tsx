import { createContext, useEffect, useState } from "react"
import { Category, StockItem } from "../models/StockItem"

export const ItemsContext = createContext<IItemsContext | null>(null)

export interface IItemsContext {
  filteredItems: StockItem[]
  searchCategory: Category
  setContextItems: (items: StockItem[]) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  setSearchFields: (cat: Category, text: string) => void
}

const ItemsProvider = (props: any) => {
  const [items, setItems] = useState<StockItem[]>([])
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([])
  const [searchCategory, setSearchCategory] = useState<Category>("All")
  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    if (searchCategory === "All") {
      if (searchText === "") {
        setFilteredItems(items)
      } else {
        const newItems = items.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredItems(newItems)
      }
    } else {
      if (searchText === "") {
        const newItems = items.filter(
          (item: StockItem) => item.category === searchCategory
        )
        setFilteredItems(newItems)
      } else {
        const newItems = items.filter((item: StockItem) => {
          if (
            item.category === searchCategory &&
            item.title.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return true
          }

          return false
        })

        setFilteredItems(newItems)
      }
    }
  }, [searchCategory, items, searchText])

  const setContextItems = (items: StockItem[]) => {
    setItems(items)
  }

  const setSearchFields = (cat: Category, text: string) => {
    setSearchCategory(cat)
    setSearchText(text)
  }

  const incrementItem = (id: string) => {
    const index = items.findIndex((item) => item._id === id)
    if (index !== null || undefined) {
      const newItems = items.slice()
      const item = newItems[index]
      if (item) {
        if (item.demand < item.quantity) {
          item.demand++
          setItems(newItems)
        }
      }
    }
  }

  const decrementItem = (id: string) => {
    const index = items.findIndex((item) => item._id === id)
    if (index !== null || undefined) {
      const newItems = items.slice()
      const item = newItems[index]
      if (item) {
        if (item.demand > 1) {
          item.demand--
          setItems(newItems)
        }
      }
    }
  }

  return (
    <ItemsContext.Provider
      value={{
        filteredItems,
        setContextItems,
        incrementItem,
        decrementItem,
        searchCategory,
        setSearchFields,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  )
}

export default ItemsProvider
