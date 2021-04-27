import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Fade from "@material-ui/core/Fade"
import { City, Country } from "../models/Invoice"
import DownArrow from "@material-ui/icons/ArrowDropDown"

export interface CountrySelectProps {
  changeCallback: (country: Country | City) => void
  country: Country | City
  values: Country[] | City[]
}

export default function AddressSelect({
  country,
  changeCallback,
  values,
}: CountrySelectProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (val: Country | City) => {
    setAnchorEl(null)
    changeCallback(val)
  }

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        variant="outlined"
        onClick={handleClick}
        endIcon={<DownArrow />}
      >
        {country}
      </Button>
      <Menu
        id="address-select"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {values.map((count: City | Country) => {
          return (
            <MenuItem key={count} onClick={() => handleClose(count)}>
              {count}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
