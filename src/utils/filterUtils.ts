import { InvoiceDocument } from "../models/Invoice"
import { StockItemDocument } from "../models/StockItem"

export const filterDocumentsToObjects = (documents: StockItemDocument[]) => {
  return documents.map((doc) => {
    const filter = doc.toObject()
    delete filter.__v
    return filter
  })
}

export const filterDocumentToObject = (document: StockItemDocument) => {
  const filtered = document.toObject()
  delete filtered.__v
  return filtered
}

export const filterInvoicesToObjects = (invoices: InvoiceDocument[]) => {
  return invoices.map((inv: any) => {
    const filter = inv.toObject()

    filter.items.forEach((item: any) => {
      delete item.item.__v
      delete item.item.price
      delete item.item.currency
      delete item.item.quantity
      delete item.item.discount
    })

    delete filter.__v
    delete filter.updatedAt
    filter.createdAt = filter.createdAt.getTime()
    return filter
  })
}

export const filterInvoiceToObject = (invoice: InvoiceDocument & any) => {
  const filter = invoice.toObject()

  filter.items.forEach((item: any) => {
    delete item.item.__v
    delete item.item.price
    delete item.item.currency
    delete item.item.quantity
    delete item.item.discount
    delete item.item.image
    item.title = item.item.title
    delete item.item.title
    item._id = item.item._id
    delete item.item._id
    item.category = item.item.category
    delete item.item.category
    delete item.item
  })

  delete filter.__v
  delete filter.updatedAt
  filter.createdAt = filter.createdAt.getTime()
  return filter
}
