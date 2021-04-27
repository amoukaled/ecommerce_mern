import React, { useContext, useState } from "react"
import { makeStyles } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import validator from "validator"
import { AuthContext } from "../Contexts/AuthContext"

const useStyles = makeStyles((theme) => {
  return {
    login: {
      display: "flex",
      flexDirection: "column",
    },
    field: {
      display: "block",
      marginTop: 20,
      marginBottom: 20,
    },
    loginContainer: {
      margin: "2rem",
      backgroundColor: theme.palette.primary.light,
      width: "100%",
    },
    error: {
      color: theme.palette.error.main,
    },
  }
})

export default function Login() {
  const classes = useStyles()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const { login } = useContext(AuthContext)!
  const [error, setError] = useState<string>("")

  const validatePassword = () => {
    setPasswordError(password === "")
  }
  const validateEmail = () => {
    setEmailError(!validator.isEmail(email))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    validateEmail()
    validatePassword()

    if (validator.isEmail(email)) {
      try {
        await login(email, password)
      } catch (e) {
        setError(e.message)
      }
    }
  }

  return (
    <Card variant="elevation" className={classes.loginContainer}>
      <CardContent>
        <Typography variant="h6">Login</Typography>
        <Typography variant="body2" className={classes.error}>
          {error}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            className={classes.field}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            color="primary"
            required
            fullWidth
            error={emailError}
          />
          <TextField
            variant="outlined"
            className={classes.field}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            color="primary"
            required
            fullWidth
            type="password"
            error={passwordError}
          />
          <CardActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Login
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
