import { useContext, useEffect, useState } from "react"
import { CartContext } from "../Contexts/CartContext"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core"
import { UserAddress } from "../models/Invoice"
import { getUserAddress } from "../api/auth"
import CartTable from "./CartTable"
import Button from "@material-ui/core/Button"
import AddressInfo from "../shared/AddressInfo"
import EmptyCart from "./EmptyCart"
import LoadingComp from "../shared/LoadingComp"

const useStyles = makeStyles((theme) => {
  return {
    margin: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        overflowX: "hidden",
      },
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
    },
    gutter: {
      marginTop: theme.spacing(2),
    },
    infoCont: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
      },
    },
  }
})

export default function Cart() {
  const { items: cartItems, checkout } = useContext(CartContext)!
  const classes = useStyles()
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null)
  const histroy = useHistory()
  const [isLoading, setIsloading] = useState<boolean>(false)

  useEffect(() => {
    getUserAddress().then((data) => {
      if (data) {
        setUserAddress(data)
      }
    })
  }, [])

  const checkoutCb = async () => {
    try {
      setIsloading(true)
      await checkout((id) => {
        histroy.push(`/invoices/${id}`)
      })
    } catch (e) {
      setIsloading(false)
      window.alert(e.message)
    }
  }

  return !isLoading ? (
    <div>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className={classes.grid}>
          <div className={classes.margin}>
            <CartTable />
            <Button
              className={classes.gutter}
              variant="contained"
              color="primary"
              onClick={checkoutCb}
            >
              Checkout
            </Button>
          </div>
          <div className={classes.infoCont}>
            <AddressInfo info={userAddress} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <LoadingComp />
  )
}
