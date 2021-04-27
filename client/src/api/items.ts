import { IStockItem, StockItem } from "../models/StockItem"

export const fetchItems = async (): Promise<StockItem[] | null> => {
  try {
    const res = await fetch("/api/items")
    const json: IStockItem[] = await res.json()
    if (json) {
      json.forEach((item: any) => (item.demand = 1))
      const stock = json.map((item: IStockItem) => new StockItem(item))
      return stock
    }
    return null
  } catch (_) {
    return null
  }
}
