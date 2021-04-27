import React, { useContext, useState } from "react"
import { makeStyles } from "@material-ui/core"
import { AuthContext } from "../Contexts/AuthContext"
import { cities, City, countries, Country } from "../models/Invoice"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import validator from "validator"
import AddressSelect from "./AddressSelect"

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
    regContainer: {
      margin: "2rem",
      backgroundColor: theme.palette.primary.light,
      width: "100%",
    },
    error: {
      color: theme.palette.error.main,
    },
    row: {
      display: "flex",
      alignItems: "center",
      margin: `${theme.spacing(1)}px 0`,
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    insideRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      margin: `${theme.spacing(1)}px 0`,
    },
    textMargin: {
      margin: `0 ${theme.spacing(1)}px`,
    },
  }
})

export default function Resgiter() {
  // styles
  const classes = useStyles()

  // context
  const { register } = useContext(AuthContext)!

  // email and pass state
  const [email, setEmail] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")

  // Errors
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [registerErr, setRegisterErr] = useState<string>("")

  // Address
  const [city, setCity] = useState<City>("Beirut")
  const [country, setCountry] = useState<Country>("Lebanon")
  const [street, setStreet] = useState<string>("")
  const [building, setBuilding] = useState<string>("")
  const [floor, setFloor] = useState<string>("")

  // Address errors
  const [streetError, setStreetError] = useState<boolean>(false)
  const [buildingError, setBuildingError] = useState<boolean>(false)
  const [floorError, setFloorError] = useState<boolean>(false)

  const validatePassword = () => {
    setPasswordError(
      password1 === "" ||
        password2 === "" ||
        password1 !== password2 ||
        password1.length < 6
    )
  }
  const validateEmail = () => {
    setEmailError(!validator.isEmail(email))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    validateEmail()
    validatePassword()
    valdiateAddress()

    if (
      validator.isEmail(email) &&
      password1 === password2 &&
      password1.length > 5 &&
      password2.length > 5 &&
      street.length > 1 &&
      building.length > 1 &&
      floor.length > 1
    ) {
      try {
        await register(email, password1, {
          country,
          city,
          street,
          building,
          floor,
        })
      } catch (e) {
        setRegisterErr(e.message)
      }
    }
  }

  const valdiateAddress = () => {
    if (street.length < 2) {
      setStreetError(true)
    } else {
      setStreetError(false)
    }

    if (building.length < 2) {
      setBuildingError(true)
    } else {
      setBuildingError(false)
    }

    if (floor.length < 2) {
      setFloorError(true)
    } else {
      setFloorError(false)
    }
  }

  return (
    <Card variant="elevation" className={classes.regContainer}>
      <CardContent>
        <Typography variant="h6">Register</Typography>

        <Typography variant="body2" className={classes.error}>
          {registerErr}
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
            onChange={(e) => setPassword1(e.target.value)}
            label="Password (6 characters or more)"
            color="primary"
            required
            type="password"
            fullWidth
            error={passwordError}
          />
          <TextField
            variant="outlined"
            className={classes.field}
            onChange={(e) => setPassword2(e.target.value)}
            label="Re-enter password"
            color="primary"
            required
            type="password"
            fullWidth
            error={passwordError}
          />

          {/* Address */}
          <Typography variant="h6">Address</Typography>
          <div className={classes.row}>
            <div className={classes.insideRow}>
              <Typography variant="body1" className={classes.textMargin}>
                Country:
              </Typography>

              <AddressSelect
                country={country}
                changeCallback={(count: any) => {
                  setCountry(count)
                }}
                values={countries}
              />
            </div>

            <div className={classes.insideRow}>
              <Typography variant="body1" className={classes.textMargin}>
                City:
              </Typography>

              <AddressSelect
                country={city}
                changeCallback={(cit: any) => {
                  setCity(cit)
                }}
                values={cities}
              />
            </div>
          </div>

          <TextField
            variant="outlined"
            className={classes.field}
            onChange={(e) => setStreet(e.target.value)}
            label="Street"
            color="primary"
            required
            fullWidth
            error={streetError}
          />
          <TextField
            variant="outlined"
            className={classes.field}
            onChange={(e) => setBuilding(e.target.value)}
            label="Building"
            color="primary"
            required
            fullWidth
            error={buildingError}
          />
          <TextField
            variant="outlined"
            className={classes.field}
            onChange={(e) => setFloor(e.target.value)}
            label="Floor"
            color="primary"
            required
            fullWidth
            error={floorError}
          />

          <CardActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Register
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
