import { Invoice } from "../models/Invoice"
import { makeStyles } from "@material-ui/core"
import { format } from "date-fns"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import green from "@material-ui/core/colors/green"
import { currencyFormatter } from "../utils/currencyUtils"
import { useHistory } from "react-router-dom"

interface InvoiceCardProps {
  invoice: Invoice
}

const useStyles = makeStyles((theme) => {
  return {
    card: {
      cursor: "pointer",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      margin: `${theme.spacing(1)}px 0`,
    },
    title: {
      fontWeight: "bold",
    },
    stat: {
      color: green[700],
    },
  }
})

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Card
      variant="elevation"
      className={classes.card}
      onClick={() => {
        history.push(`/invoices/${invoice._id}`)
      }}
    >
      <CardContent>
        <div className={classes.row}>
          <Typography variant="body1" className={classes.title}>
            Invoiced at:
          </Typography>

          <Typography variant="body1" className={classes.stat}>
            {format(new Date(invoice.createdAt), "dd/MM/yyyy")}
          </Typography>
        </div>

        <div className={classes.row}>
          <Typography className={classes.title}>Items:</Typography>

          <Typography className={classes.stat}>
            {invoice.items.length}
          </Typography>
        </div>

        <div className={classes.row}>
          <Typography className={classes.title}>Total:</Typography>

          <Typography className={classes.stat}>
            {currencyFormatter(invoice.items[0].currency).format(
              invoice.getBill()
            )}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}
