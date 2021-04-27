import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core"
import green from "@material-ui/core/colors/green"
import grey from "@material-ui/core/colors/grey"

const useStyles = makeStyles((theme) => {
  return {
    margin: {
      margin: theme.spacing(2),
      backgroundColor: grey[400],
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-around",
      [theme.breakpoints.down("md")]: {
        margin: 0,
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
      },
    },
    title: {
      fontWeight: "bold",
    },
    info: {
      color: green[900],
    },
  }
})

export default function DeliveredStatus({ delivered }: { delivered: boolean }) {
  const classes = useStyles()
  return (
    <Card className={classes.margin}>
      <Typography variant="body1" className={classes.title}>
        Delivery status:
      </Typography>
      <Typography variant="body1" className={classes.info}>
        {delivered ? " Delivered" : " Shipping"}
      </Typography>
    </Card>
  )
}
