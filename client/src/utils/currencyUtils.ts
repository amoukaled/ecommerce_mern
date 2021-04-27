export const currencyFormatter = (currency: string) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  })
