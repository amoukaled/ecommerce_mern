import { createStyles, withStyles, makeStyles } from "@material-ui/core"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import TableFooter from "@material-ui/core/TableFooter"
import TableRow from "@material-ui/core/TableRow"
import InvoiceItemRow from "./InvoiceItemRow"
import { InvoiceItem } from "../models/Invoice"
import green from "@material-ui/core/colors/green"
import grey from "@material-ui/core/colors/grey"

export interface InvoiceTableProps {
  items: InvoiceItem[]
}

const StyledTableCell = withStyles((theme) => {
  return createStyles({
    head: {
      backgroundColor: grey[700],
      color: theme.palette.common.white,
      fontSize: 14,
    },
    body: {
      fontSize: 14,
    },
    footer: {
      backgroundColor: grey[300],
      color: theme.palette.common.black,
      fontSize: 14,
    },
  })
})(TableCell)

const useStyles = makeStyles((theme) => {
  return {
    table: {
      maxWidth: 800,
      [theme.breakpoints.down("md")]: {
        overflowX: "scroll",
      },
    },
    green: {
      color: green[800],
      fontWeight: "bold",
    },
  }
})

export default function InvoiceTable(props: InvoiceTableProps) {
  const classes = useStyles()

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="center">Currency</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
            <StyledTableCell align="center">Price/1pc</StyledTableCell>
            <StyledTableCell align="center">Total Price</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.items.map((item) => {
            return <InvoiceItemRow item={item} key={item._id} />
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell align="center">-</StyledTableCell>
            <StyledTableCell align="center">-</StyledTableCell>
            <StyledTableCell align="center">-</StyledTableCell>
            <StyledTableCell align="center">-</StyledTableCell>
            <StyledTableCell align="center">-</StyledTableCell>
            <StyledTableCell className={classes.green} align="center">
              {props.items.reduce<number>((prevNum, currentItem) => {
                return prevNum + currentItem.getTotalPrice()
              }, 0)}
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
