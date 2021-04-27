import { useContext } from "react"
import { createStyles, makeStyles, withStyles } from "@material-ui/core"
import { CartContext } from "../Contexts/CartContext"
import CartItem from "../models/CartItem"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import DeleteIcon from "@material-ui/icons/Delete"
import green from "@material-ui/core/colors/green"
import orange from "@material-ui/core/colors/orange"
import red from "@material-ui/core/colors/red"

interface CartItemCardProps {
  item: CartItem
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

export default function CartItemRow({ item }: CartItemCardProps) {
  const classes = useStyles()
  const { removeItem } = useContext(CartContext)!

  return (
    <StyledTableRow key={item._id}>
      <TableCell>{item.title}</TableCell>

      <TableCell align="center">{item.currency}</TableCell>

      <TableCell align="center" className={classes.green}>
        {item.price}
      </TableCell>

      <TableCell align="center">{item.demand}</TableCell>

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

      <TableCell>
        <DeleteIcon
          className={classes.deleteButton}
          onClick={() => {
            removeItem(item._id)
          }}
        />
      </TableCell>
    </StyledTableRow>
  )
}
