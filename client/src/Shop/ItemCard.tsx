import { useContext } from "react"
import { StockItem } from "../models/StockItem"
import { currencyFormatter } from "../utils/currencyUtils"
import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import ItemCounter from "./ItemCounter"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { CartContext } from "../Contexts/CartContext"
import { AuthContext } from "../Contexts/AuthContext"
import { useHistory } from "react-router-dom"
import CartItem from "../models/CartItem"
import blue from "@material-ui/core/colors/blue"
import green from "@material-ui/core/colors/green"

const useStyles = makeStyles((theme) => {
  return {
    discountPrice: {
      textDecorationLine: "line-through",
      color: "grey",
    },
    finalPrice: {
      color: "green",
    },
    card: {
      backgroundColor: "#eee",
    },
    price: {
      display: "flex",
      justifyContent: "space-between",
    },
    cartRow: {
      marginTop: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cart: {
      cursor: "pointer",
      fill: blue[500],
    },
    checkCircle: {
      fill: green[700],
    },
  }
})

export interface ItemCardProps {
  item: StockItem
}

export default function ItemCard({ item }: ItemCardProps) {
  const classes = useStyles()
  const { items: cartItems, addItem } = useContext(CartContext)!
  const { isAuthenticated } = useContext(AuthContext)!
  const history = useHistory()

  return (
    <Card className={classes.card} elevation={2}>
      <CardHeader
        title={item.title}
        titleTypographyProps={{ noWrap: true, variant: "h6" }}
        subheader={item.category}
      />

      <CardMedia
        draggable={false}
        component="img"
        src={`data:image/png;base64,${item.image}`}
        title={item.title}
      />

      <CardContent>
        <Typography>Price/1pcs:</Typography>
        {item.discount > 0 ? (
          <div className={classes.price}>
            <Typography variant="body1" className={classes.discountPrice}>
              {currencyFormatter(item.currency).format(item.price)}
            </Typography>
            <Typography variant="body1" className={classes.finalPrice}>
              {currencyFormatter(item.currency).format(
                item.getDiscountedPrice()
              )}
            </Typography>
          </div>
        ) : (
          <Typography variant="body1" className={classes.finalPrice}>
            {currencyFormatter(item.currency).format(item.price)}
          </Typography>
        )}

        <div className={classes.cartRow}>
          {cartItems.some((cartItem) => cartItem._id === item._id) ? (
            <>
              <Typography variant="body1" className={classes.finalPrice}>
                Quantity:
                {` ${
                  cartItems.find((cartItem) => cartItem._id === item._id)
                    ?.demand ?? 1
                }`}
              </Typography>
              <CheckCircleIcon className={classes.checkCircle} />
            </>
          ) : (
            <>
              <ItemCounter item={item} />
              <AddShoppingCartIcon
                onClick={() => {
                  if (isAuthenticated()) {
                    const itemToAdd = new CartItem(
                      item._id,
                      item.title,
                      item.price,
                      item.currency,
                      item.category,
                      item.quantity,
                      item.discount,
                      item.image,
                      item.demand
                    )
                    addItem(itemToAdd)
                  } else {
                    history.push("/login")
                  }
                }}
                className={classes.cart}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
