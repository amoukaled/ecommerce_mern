import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getInvoice } from "../api/invoices"
import { Invoice } from "../models/Invoice"
import LoadingComp from "../shared/LoadingComp"
import InvoiceTable from "./InvoiceTable"
import AddressInfo from "../shared/AddressInfo"
import DeliveredStatus from "./DeliveredStatus"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => {
  return {
    grid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
    },
    margin: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        overflowX: "hidden",
      },
    },
    info: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  }
})

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const classes = useStyles()

  useEffect(() => {
    getInvoice(id).then((data) => {
      if (data) {
        setInvoice(data)
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <div>
      {isLoading ? (
        <LoadingComp />
      ) : invoice !== null ? (
        <div className={classes.grid}>
          <div className={classes.margin}>
            <InvoiceTable items={invoice.items} />
          </div>
          <div className={classes.info}>
            <DeliveredStatus delivered={invoice.delivered} />
            <AddressInfo info={invoice.address} />
          </div>
        </div>
      ) : (
        <Typography>Failed to load resource</Typography>
      )}
    </div>
  )
}
