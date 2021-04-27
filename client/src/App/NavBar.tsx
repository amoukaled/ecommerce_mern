import { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../Contexts/AuthContext"
import { makeStyles, Theme } from "@material-ui/core"
import { CartContext } from "../Contexts/CartContext"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme: Theme) => {
  return {
    appbar: {
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
    },
    link: {
      "&:hover": { color: theme.palette.secondary.main },
      textDecoration: "none",
      margin: theme.spacing(1),
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    button: {
      backgroundColor: theme.palette.primary.light,
    },
    cart: {
      fill: theme.palette.text.secondary,
    },
    brand: {
      textDecoration: "none",
    },
  }
})

export default function NavBar() {
  const classes = useStyles()

  const { logout, uid } = useContext(AuthContext)!
  const isLogged = uid !== null ? true : false
  const history = useHistory()
  const { items } = useContext(CartContext)!

  return (
    <AppBar elevation={1} className={classes.appbar} position="static">
      <Toolbar className={classes.toolbar}>
        <Link draggable={false} to="/" className={classes.brand}>
          <Typography variant="h5">E-Commerce</Typography>
        </Link>

        <Link to="/" draggable={false} className={classes.link}>
          <Typography className={classes.link}>Shop</Typography>
        </Link>

        <Link to="/invoices" draggable={false} className={classes.link}>
          <Typography className={classes.link}>Invoices</Typography>
        </Link>

        {isLogged ? (
          <>
            <IconButton onClick={() => history.push("/cart")}>
              <Badge badgeContent={items.length} color="secondary">
                <ShoppingCartRoundedIcon className={classes.cart} />
              </Badge>
            </IconButton>
            <Button
              className={classes.button}
              startIcon={<ExitToAppIcon />}
              variant="contained"
              disableElevation
              onClick={async () => await logout()}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            disableElevation
            onClick={() => history.push("/login")}
          >
            Login/Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
