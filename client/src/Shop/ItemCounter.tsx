import { useContext } from "react"
import { makeStyles } from "@material-ui/core"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { StockItem } from "../models/StockItem"
import { ItemsContext } from "../Contexts/ItemsContext"
import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    decrement: {
      backgroundColor: red[500],
      textAlign: "center",
    },
    count: {
      backgroundColor: "transparent",
      textAlign: "center",
    },
    increment: {
      backgroundColor: green[700],
      textAlign: "center",
    },
  }
})

export interface ItemCounterProps {
  item: StockItem
}

export default function ItmeCounter(props: ItemCounterProps) {
  const classes = useStyles()
  const { incrementItem, decrementItem } = useContext(ItemsContext)!

  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          decrementItem(props.item._id)
        }}
        className={classes.decrement}
        variant="contained"
        disableElevation
        disabled={props.item.demand <= 1}
      >
        <Typography variant="body1">-</Typography>
      </Button>

      <Button disabled={true}>
        <Typography variant="body1">{props.item.demand}</Typography>
      </Button>

      <Button
        onClick={() => {
          incrementItem(props.item._id)
        }}
        className={classes.increment}
        variant="contained"
        disableElevation
        disabled={props.item.demand >= props.item.quantity}
      >
        <Typography variant="body1">+</Typography>
      </Button>
    </ButtonGroup>
  )
}
