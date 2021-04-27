import { useState, useContext, useEffect } from "react"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { categories, Category } from "../models/StockItem"
import { ItemsContext } from "../Contexts/ItemsContext"
import Button from "@material-ui/core/Button"
import { makeStyles, fade } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import DownArror from "@material-ui/icons/ArrowDropDown"

const useStyles = makeStyles((theme) => {
  return {
    searchRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      width: "8rem", // or 8 rem
    },
  }
})

export default function SearchItems() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { searchCategory, setSearchFields } = useContext(ItemsContext)!
  const [searchText, setSearchText] = useState<string>("")

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    setSearchFields(searchCategory, searchText)
  }, [searchText])

  const handleMenuItemClick = (category: Category) => {
    setAnchorEl(null)
    setSearchFields(category, searchText)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.searchRow}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Button
        className={classes.button}
        variant="outlined"
        onClick={handleClickListItem}
        endIcon={<DownArror />}
      >
        {searchCategory}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {categories.map((option) => (
          <MenuItem
            key={option}
            disabled={option === searchCategory}
            selected={option === searchCategory}
            onClick={() => handleMenuItemClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
