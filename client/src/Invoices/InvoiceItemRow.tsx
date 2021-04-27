import { createStyles, makeStyles, withStyles } from "@material-ui/core"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { InvoiceItem } from "../models/Invoice"
import green from "@material-ui/core/colors/green"
import orange from "@material-ui/core/colors/orange"
import red from "@material-ui/core/colors/red"

interface InvoiceItemProps {
  item: InvoiceItem
}

const useStyles = makeStyles((theme) => {
  return {
    center: {
      textAlign: "center",
    },
    green: {
      color: green[700],
    },
    red: {
      color: red[500],
    },
    orange: {
      color: orange[900],
    },
    finalPrice: {
      color: green[800],
      fontWeight: "bold",
    },
    deleteButton: {
      fill: red[500],
      cursor: "pointer",
    },
  }
})

const StyledTableRow = withStyles((theme) => {
  return createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
})(TableRow)

export default function InvoiceItemRow({ item }: InvoiceItemProps) {
  const classes = useStyles()

  return (
    <StyledTableRow key={item._id}>
      <TableCell>{item.title}</TableCell>

      <TableCell align="center">{item.currency}</TableCell>

      <TableCell align="center" className={classes.green}>
        {item.price}
      </TableCell>

      <TableCell align="center">{item.quantity}</TableCell>

      <TableCell
        align="center"
        className={item.discount > 0 ? classes.red : ""}
      >
        {item.discount > 0 ? `-${item.discount}%` : "-"}
      </TableCell>

      <TableCell align="center" className={classes.orange}>
        {item.getDiscountedPrice()}
      </TableCell>

      <TableCell align="center" className={classes.finalPrice}>
        {item.getTotalPrice()}
      </TableCell>
    </StyledTableRow>
  )
}
