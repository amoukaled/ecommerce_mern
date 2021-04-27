import CartIcon from "@material-ui/icons/ShoppingCartTwoTone"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
  return {
    cont: {
      margin: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fill: theme.palette.secondary.dark,
    },
  }
})

export default function EmptyCart() {
  const classes = useStyles()

  return (
    <div className={classes.cont}>
      <CartIcon className={classes.icon} fontSize="large" />
      <Typography variant="h5">Your cart is empty</Typography>
    </div>
  )
}
