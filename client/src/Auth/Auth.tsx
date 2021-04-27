import { makeStyles, Typography } from "@material-ui/core"
import cyan from "@material-ui/core/colors/cyan"
import pink from "@material-ui/core/colors/pink"
import Login from "./Login"
import Register from "./Register"

const useStyles = makeStyles((theme) => {
  return {
    auth: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      backgroundImage: `linear-gradient(to bottom right, ${cyan[200]} , ${pink[700]})`,
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    input: {
      display: "flex",
      flexDirection: "row",
    },
    loginInput: {
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        gridRow: "1/2",
        paddingTop: theme.spacing(2),
      },
    },
    regInput: {
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        gridRow: "3/4",
      },
    },
  }
})

export default function Auth() {
  const classes = useStyles()

  return (
    <div className={classes.auth}>
      <div className={classes.input}>
        <Login />
      </div>

      <Typography className={classes.loginInput} variant="h6">
        Login with your account
      </Typography>

      <Typography className={classes.regInput} variant="h6">
        Register to access all our services and more!
      </Typography>

      <div className={classes.input}>
        <Register />
      </div>
    </div>
  )
}
