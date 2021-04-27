import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles((theme) => {
  return {
    margin: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  }
})

export default function LoadingComp() {
  const classes = useStyles()
  return (
    <div className={classes.margin}>
      <Typography variant="h6">Loading..</Typography>
      <CircularProgress />
    </div>
  )
}
