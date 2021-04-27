import { UserAddress } from "../models/Invoice"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, withStyles } from "@material-ui/core"
import grey from "@material-ui/core/colors/grey"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import LoadingComp from "./LoadingComp"

export interface AddressInfoProps {
  info: (UserAddress & any) | null
}

const useStyles = makeStyles((theme) => {
  return {
    margin: {
      margin: theme.spacing(2),
    },
    title: {
      fontWeight: "bold",
    },
  }
})

const StyledTableRow = withStyles((theme) => {
  return createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: grey[300],
      },
    },
  })
})(TableRow)

export default function AddressInfo(props: AddressInfoProps) {
  const classes = useStyles()

  return (
    <div className={classes.margin}>
      {props.info !== null ? (
        <Card>
          <CardHeader title="Address" />

          <TableContainer>
            <Table>
              <TableBody>
                {Object.keys(props.info).map((val: string) => {
                  return (
                    <StyledTableRow key={val}>
                      <TableCell>
                        <Typography variant="body1" className={classes.title}>
                          {val[0].toUpperCase() + val.substring(1)}:
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body1">
                          {props.info[val]!!}
                        </Typography>
                      </TableCell>
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      ) : (
        <LoadingComp />
      )}
    </div>
  )
}
