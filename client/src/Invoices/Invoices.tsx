import { useEffect, useState } from "react"
import { getAllInvoices } from "../api/invoices"
import { Invoice } from "../models/Invoice"
import InvoiceCard from "./InvoiceCard"
import Typography from "@material-ui/core/Typography"
import Masonry from "react-masonry-css"
import { makeStyles } from "@material-ui/core"
import LoadingComp from "../shared/LoadingComp"

const breakpoints = {
  default: 5,
  1200: 4,
  980: 3,
  730: 2,
  500: 1,
}

const useStyles = makeStyles((theme) => {
  return {
    margin: {
      margin: theme.spacing(2),
    },
  }
})

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const classes = useStyles()

  useEffect(() => {
    getAllInvoices().then((data) => {
      if (data) {
        setInvoices(data)
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <div className={classes.margin}>
      {!isLoading ? (
        invoices.length > 0 ? (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {invoices.map((inv) => (
              <InvoiceCard key={inv._id} invoice={inv} />
            ))}
          </Masonry>
        ) : (
          <Typography variant="h6">No invoices</Typography>
        )
      ) : (
        <LoadingComp />
      )}
    </div>
  )
}
