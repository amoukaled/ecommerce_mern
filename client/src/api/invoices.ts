import { IInvoice, Invoice } from "../models/Invoice"

export const checkoutApi = async (
  items: { itemId: string; quantity: number }[],
  onSuccess: (id: string) => void
) => {
  const json = JSON.stringify({ items })
  const res = await fetch("/api/user/invoice/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
  })

  if (res.status === 201) {
    const body = await res.json()
    onSuccess(body.id)
  } else {
    throw new Error("Something went wrong.")
  }
}

export const getAllInvoices = async () => {
  const res = await fetch("/api/user/invoices", { method: "GET" })
  if (res.status === 200) {
    const body: IInvoice[] = await res.json()
    return body.map((item) => new Invoice(item))
  }
  return null
}

export const getInvoice = async (id: string) => {
  const res = await fetch(`/api/user/invoice/${id}`, { method: "GET" })

  if (res.status === 200) {
    const body = await res.json()
    return new Invoice(body)
  }

  return null
}
