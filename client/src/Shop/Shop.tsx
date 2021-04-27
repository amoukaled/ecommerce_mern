import { useContext, useEffect, useState } from "react"
import { fetchItems } from "../api/items"
import { makeStyles } from "@material-ui/core"
import { ItemsContext } from "../Contexts/ItemsContext"
import Masonry from "react-masonry-css"
import LoadingComp from "../shared/LoadingComp"
import SearchItems from "../App/SearchItems"
import ItemCard from "./ItemCard"
import grey from "@material-ui/core/colors/grey"

const useStyles = makeStyles((theme) => {
  return {
    search: {
      backgroundColor: grey[400],
      padding: theme.spacing(1),
    },
    masonry: {
      padding: theme.spacing(1),
    },
  }
})

const breakpoints = {
  default: 6,
  1250: 5,
  1010: 4,
  800: 3,
  600: 2,
  400: 1,
}

export default function Shop() {
  const classes = useStyles()
  const { filteredItems, setContextItems } = useContext(ItemsContext)!
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchItems().then((data) => {
      if (data) {
        setContextItems(data)
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <div>
      {!isLoading ? (
        <>
          <div className={classes.search}>
            <SearchItems />
          </div>
          <Masonry
            breakpointCols={breakpoints}
            className={`my-masonry-grid ${classes.masonry}`}
            columnClassName="my-masonry-grid_column"
          >
            {filteredItems.map((item) => {
              return (
                <div key={item._id}>
                  <ItemCard item={item} key={item._id} />
                </div>
              )
            })}
          </Masonry>
        </>
      ) : (
        <LoadingComp />
      )}
    </div>
  )
}
